import react, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { ACTION_TOGGLE_FAV } from '../../state/DashboardReducer';
import { useDashboardDispatch } from '../../state/DashboardState';
import styles from './Event.module.css';

export default function Event({ name, dates, description, id, isFavourite }) {
  const dispatch = useDashboardDispatch();
  const toggleFav = useCallback(() => {
    dispatch({
      type: ACTION_TOGGLE_FAV,
      payload: {
        id,
      },
    });
  }, []);
  return (
    <article className={`${styles.article} ${isFavourite ? styles['article--fav'] : null}`} data-testid="event">
      <h2>
        <button onClick={toggleFav}>{isFavourite ? 'unfav' : 'fav'}</button>
        {name}
      </h2>
      {dates ? (
        <div>
          {dates.start.localDate} {dates.start.localTime}
        </div>
      ) : null}

      <main>{description}</main>
      <Link href={`/event/${encodeURIComponent(id)}`}>more info</Link>
    </article>
  );
}
