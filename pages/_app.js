import "../styles/globals.css";
import reducer, { initialState } from "../context-api/reducer";
import { StateProvider } from "../context-api/StateProvider";

function MyApp({ Component, pageProps }) {
  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
