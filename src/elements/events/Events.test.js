import React from "react";
import { render } from "@testing-library/react";
import Events from "./Events";
import { renderWithContext } from "../../core/TestSetup";

describe("Elements - Events", () => {
  test("without any events theres nothing to render", async () => {
    const { queryByTestId, container } = renderWithContext(<Events />);

    expect(queryByTestId("event-list-item")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("with empty events list theres nothing to render", async () => {
    const { queryByTestId, container } = renderWithContext(
      <Events events={[]} />
    );

    expect(queryByTestId("event-list-item")).not.toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });

  test("given an array of events, it renders all events", async () => {
    const events = new Map();

    events.set("0ga2EdN7prc", {
      id: "0ga2EdN7prc",
      name: "Steve Hackett Genesis Revisited - Seconds Out & More",
      isVisible: true,
    });
    events.set("0oO71TSv4Ed", {
      id: "0oO71TSv4Ed",
      name: "Muzyka zespołu METALLICA symfonicznie",
      isVisible: true,
    });
    events.set("0oz51ozk3ob", {
      id: "0oz51ozk3ob",
      name: "Happysad",
      isVisible: true,
    });

    const { getAllByTestId, container } = renderWithContext(
      <Events events={events} />
    );

    expect(getAllByTestId("event-list-item")).toHaveLength(3);
    expect(container).toMatchSnapshot();
  });
});
