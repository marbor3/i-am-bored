import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";
import {
  act,
  fireEvent,
  render,
  waitFor,
  waitForElementToBeRemoved,
  screen,
} from "@testing-library/react";
import Dashboard from "./Dashboard";
import * as DashboardDataSource from "./Dashboard.dataSource";
import { renderWithContext } from "../../core/TestSetup";

const firstPageOfEvents = {
  _embedded: {
    events: [
      {
        name: "Michał Wiśniewski Akustycznie Część 2 - ZAWSZE NAPRZÓD - NIGDY WSTECZ",
        type: "event",
        id: "Z698xZQpZa7ca",
        url: "https://www.ticketmaster.pl/event/micha-wisniewski-akustycznie-czesc-2-zawsze-naprzod-nigdy-wstecz-tickets/19273?language=en-us",
        images: [
          {
            ratio: "3_2",
            url: "https://s1.ticketm.net/dam/a/9f1/1a6bb854-8a12-49ae-aeed-0266907709f1_1030751_ARTIST_PAGE_3_2.jpg",
            width: 305,
            height: 203,
            fallback: false,
          },
        ],
        distance: 2.18,
        dates: {
          start: {
            localDate: "2021-09-23",
            localTime: "19:00:00",
            dateTime: "2021-09-23T17:00:00Z",
            dateTBD: false,
            dateTBA: false,
            timeTBA: false,
            noSpecificTime: false,
          },
          timezone: "Europe/Warsaw",
          status: {
            code: "onsale",
          },
          spanMultipleDays: false,
        },
        classifications: [
          {
            primary: true,
            segment: {
              id: "KZFzniwnSyZfZ7v7nJ",
              name: "Music",
            },
            genre: {
              id: "KnvZfZ7vAeA",
              name: "Rock",
            },
            subGenre: {
              id: "KZazBEonSMnZfZ7v6F1",
              name: "Pop",
            },
            family: false,
          },
        ],
      },
      {
        name: "Eivor",
        type: "event",
        id: "Z698xZQpZa73S",
        url: "https://www.ticketmaster.pl/event/eivor-tickets/17587?language=en-us",
        images: [
          {
            ratio: "4_3",
            url: "https://s1.ticketm.net/dam/a/1cc/d479a69e-c90d-431a-8c23-50125ef921cc_1421841_CUSTOM.jpg",
            width: 305,
            height: 225,
            fallback: false,
          },
        ],
        distance: 2.18,
        units: "MILES",
        dates: {
          start: {
            localDate: "2021-11-04",
            dateTBD: false,
            dateTBA: false,
            timeTBA: true,
            noSpecificTime: false,
          },
          timezone: "Europe/Warsaw",
          status: {
            code: "onsale",
          },
          spanMultipleDays: false,
        },
        classifications: [
          {
            primary: true,
            segment: {
              id: "KZFzniwnSyZfZ7v7nJ",
              name: "Music",
            },
            genre: {
              id: "KnvZfZ7vAvv",
              name: "Alternative",
            },
            subGenre: {
              id: "KZazBEonSMnZfZ7vAvn",
              name: "Alternative Rock",
            },
            family: false,
          },
        ],
      },
      {
        name: "PUNKY REGGAE live 2021: Farben Lehre + Sexbomba + Zenek Kupatasa",
        type: "event",
        id: "Z698xZQpZaA8K",
        url: "https://www.ticketmaster.pl/event/punky-reggae-live-2021-farben-lehre--sexbomba--zenek-kupatasa-tickets/21523?language=en-us",
        images: [
          {
            ratio: "3_2",
            url: "https://s1.ticketm.net/dam/a/8cd/545c6409-a818-4912-8952-063351c228cd_1482951_RETINA_PORTRAIT_3_2.jpg",
            width: 640,
            height: 427,
            fallback: false,
          },
        ],
        distance: 2.24,
        units: "MILES",
        dates: {
          access: {
            startDateTime: "2021-09-18T18:00:00Z",
            startApproximate: false,
            endApproximate: false,
          },
          start: {
            localDate: "2021-09-18",
            localTime: "19:00:00",
            dateTime: "2021-09-18T17:00:00Z",
            dateTBD: false,
            dateTBA: false,
            timeTBA: false,
            noSpecificTime: false,
          },
          timezone: "Europe/Warsaw",
          status: {
            code: "onsale",
          },
          spanMultipleDays: false,
        },
        classifications: [
          {
            primary: true,
            segment: {
              id: "KZFzniwnSyZfZ7v7nJ",
              name: "Music",
            },
            genre: {
              id: "KnvZfZ7vAeA",
              name: "Rock",
            },
            subGenre: {
              id: "KZazBEonSMnZfZ7v6F1",
              name: "Pop",
            },
            family: false,
          },
          {
            primary: false,
            segment: {
              id: "KZFzniwnSyZfZ7v7nJ",
              name: "Music",
            },
            genre: {
              id: "KnvZfZ7vAeA",
              name: "Rock",
            },
            subGenre: {
              id: "KZazBEonSMnZfZ7v6F1",
              name: "Pop",
            },
            family: false,
          },
        ],
      },
    ],
  },
  _links: {
    first: {
      href: "/discovery/v2/events.json?radius=5&geoPoint=u3h4gy4z&page=0&size=20",
    },
    self: {
      href: "/discovery/v2/events.json?radius=5&geoPoint=u3h4gy4z",
    },
    next: {
      href: "/discovery/v2/events.json?radius=5&geoPoint=u3h4gy4z&page=1&size=20",
    },
    last: {
      href: "/discovery/v2/events.json?radius=5&geoPoint=u3h4gy4z&page=1&size=20",
    },
  },
  page: {
    size: 20,
    totalElements: 32,
    totalPages: 2,
    number: 0,
  },
};

beforeAll(() => {
  server.listen();
});
afterAll(() => {
  server.close();
});

const server = setupServer(
  rest.get(
    "https://app.ticketmaster.com/discovery/v2/events.json",
    (req, res, ctx) => {
      const result = firstPageOfEvents;

      return res(ctx.json(result));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Components - Dashboard", () => {
  test("renders Dashboard", async () => {
    let renderedComponent;

    act(() => {
      renderedComponent = renderWithContext(<Dashboard />);
    });

    await waitFor(() => screen.getAllByTestId("event"));

    expect(screen.getAllByTestId("event")).toHaveLength(3);
    expect(screen.getAllByTestId("event")[0]).toHaveTextContent(
      "Michał Wiśniewski Akustycznie Część 2 - ZAWSZE NAPRZÓD - NIGDY WSTECZ"
    );

    const { container } = renderedComponent;
    expect(container).toMatchSnapshot();
  });
});
