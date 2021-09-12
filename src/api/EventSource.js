import fetch from "isomorphic-fetch";

const validResponse = function validResponse(response) {
  return response && response.ok;
};

export default async function getEvents(point) {
  console.log("point", point);
  const responseData = {};
  const response = await fetch(
    `https://app.ticketmaster.com/discovery/v2/events.json?geoPoint=${point}&radius=5&apikey=LMpwCfsGbAEHxuXWftLA3BGkPUfWlKZt`,
    {
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!validResponse(response)) {
    throw new Error(`${response.status}. Error when connecting to API.`);
  }

  const fetchedEvents = await response.json();

  responseData.data = {
    events: fetchedEvents._embedded.events,
  };

  return responseData;
}
