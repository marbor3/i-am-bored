import React from "react";
import { render } from "@testing-library/react";
import { StateProvider } from "../state/DashboardState";
import dashboardReducer, {
  createDashboardIniitalState,
} from "../state/DashboardReducer";

const mockGeolocation = {
  getCurrentPosition: jest.fn().mockImplementation((success) =>
    Promise.resolve(
      success({
        coords: {
          latitude: 51.14,
          longitude: 17.04,
        },
      })
    )
  ),
  watchPosition: jest.fn(),
};

global.navigator.geolocation = mockGeolocation;

const renderWithContext = (component, options) =>
  render(
    <StateProvider
      reducer={dashboardReducer}
      initialState={createDashboardIniitalState(options)}
    >
      {component}
    </StateProvider>
  );

export { renderWithContext };
