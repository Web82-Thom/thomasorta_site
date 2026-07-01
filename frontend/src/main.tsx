import React from "react";
import ReactDOM from "react-dom/client";

import App from "./app/App";

import { CookieConsentProvider } from "./shared/cookie-consent";

import "./shared/styles/global.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CookieConsentProvider>
      <App />
    </CookieConsentProvider>
  </React.StrictMode>,
);