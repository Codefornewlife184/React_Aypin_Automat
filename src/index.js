import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import SimpleReactLightbox from "simple-react-lightbox";
import "./i18n";
import ErrorBoundary from "./Components/common/ErrorBoundary";
import { initErrorOverlay } from "./utils/errorOverlay";
initErrorOverlay();

ReactDOM.render(
  <React.StrictMode>
    <SimpleReactLightbox>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </SimpleReactLightbox>
  </React.StrictMode>,
  document.getElementById("root")
);
