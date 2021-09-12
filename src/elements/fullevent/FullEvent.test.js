import React from "react";
import { render } from "@testing-library/react";
import Event from "./FullEvent";
import { renderWithContext } from "../../core/TestSetup";

describe("Elements - Event", () => {
  test("renders given event", async () => {
    const eventTitle = "Steve Hackett Genesis Revisited - Seconds Out & More";
    const { getByTestId, container } = renderWithContext(
      <Event name={eventTitle} />
    );

    expect(getByTestId("event")).toHaveTextContent(eventTitle);
    expect(container).toMatchSnapshot();
  });
});
