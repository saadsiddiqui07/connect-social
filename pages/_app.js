import "../styles/globals.css";
import { useEffect } from "react";
import reducer, { initialState } from "../context-api/reducer";
import { StateProvider } from "../context-api/StateProvider";

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // remove the server-side injected CSS
    const jsStyles = document.querySelector("#js-server-side");
    if (jsStyles) {
      jsStyles.parentElement.removeChild(jsStyles);
    }
  }, []);

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default MyApp;
