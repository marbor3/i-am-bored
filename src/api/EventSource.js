import fetch from 'isomorphic-fetch';

const TICKET_MASTER_API_KEY = 'LMpwCfsGbAEHxuXWftLA3BGkPUfWlKZt';

const validResponse = function validResponse(response) {
  return response && response.ok;
};

export default async function getEvents(point, url) {
  const apiUrl = url
    ? url
    : `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${point}&radius=5&apikey=${TICKET_MASTER_API_KEY}`;
  const responseData = {};
  const response = await fetch(apiUrl, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!validResponse(response)) {
    throw new Error(`${response.status}. Error when connecting to API.`);
  }

  const fetchedEvents = await response.json();

  responseData.data = {
    events: fetchedEvents._embedded.events,
    nextPageUrl: fetchedEvents._links.next
      ? `https://app.ticketmaster.com${fetchedEvents._links.next.href}&apikey=${TICKET_MASTER_API_KEY}`
      : null,
    prevPageUrl: fetchedEvents._links.prev
      ? `https://app.ticketmaster.com${fetchedEvents._links.prev.href}&apikey=${TICKET_MASTER_API_KEY}`
      : null,
  };

  return responseData;
}
