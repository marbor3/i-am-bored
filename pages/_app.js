import "../styles/globals.css";
import { StateProvider } from "../src/state/DashboardState";
import dashboardReducer, {
  createDashboardIniitalState,
} from "../src/state/DashboardReducer";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider
      reducer={dashboardReducer}
      initialState={createDashboardIniitalState()}
    >
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
