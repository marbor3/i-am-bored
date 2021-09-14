import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import Geohash from 'latlon-geohash';
import getEvents from '../../api/EventSource';
import useCancellablePromise from '../../hooks/UseCancelablePromise';
import { ACTION_FETCH_EVENTS } from '../../state/DashboardReducer';
import { useDashboardContext } from '../../state/DashboardState';

// TODO move to a better place
export function getLocation(showPosition) {
  return new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
}

export default function useEventsDataSource(page) {
  const router = useRouter();
  const { cancellablePromise } = useCancellablePromise();
  const [{ events, nextPageUrl, prevPageUrl }, dispatch] = useDashboardContext();

  useEffect(() => {
    async function fetchData() {
      const position = await getLocation();
      const geohash = Geohash.encode(position?.coords.latitude, position?.coords.longitude, 8); // 8 is max for Ticketmaster

      cancellablePromise(getEvents(geohash))
        .then(({ data }) => {
          dispatch({
            type: ACTION_FETCH_EVENTS,
            payload: {
              events: data.events,
              nextPageUrl: data.nextPageUrl,
            },
          });
        })
        .catch(() => {});
    }

    fetchData();
  }, []);

  const nextPage = useCallback(
    function () {
      async function fetchData() {
        cancellablePromise(getEvents(null, nextPageUrl))
          .then(({ data }) => {
            dispatch({
              type: ACTION_FETCH_EVENTS,
              payload: {
                events: data.events,
                prevPageUrl: data.prevPageUrl,
                nextPageUrl: data.nextPageUrl,
              },
            });
          })
          .catch(() => {});
      }

      fetchData();
    },
    [nextPageUrl]
  );

  const prevPage = useCallback(
    function () {
      async function fetchData() {
        cancellablePromise(getEvents(null, prevPageUrl))
          .then(({ data }) => {
            dispatch({
              type: ACTION_FETCH_EVENTS,
              payload: {
                events: data.events,
                prevPageUrl: data.prevPageUrl,
                nextPageUrl: data.nextPageUrl,
              },
            });
          })
          .catch(() => {});
      }

      fetchData();
    },
    [prevPageUrl]
  );

  return [events, !!nextPageUrl, nextPage, !!prevPageUrl, prevPage];
}
