import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "@shopify/polaris";
import { Provider as AppBridgeProvider } from "@shopify/app-bridge-react";
import "@shopify/polaris/styles.css";
import Cookies from "js-cookie";
import Routes from "./Routes";

import { StateProvider } from "./store/store";

const rootElement = document.createElement("div");
document.querySelector("body").appendChild(rootElement);

// Get 'shopOrigin' cookie
const shopOrigin = Cookies.get("shopOrigin");
// Get SHOPIFY_API_KEY' from process.env. (Look at plugins array in webpack.config.js)
const { SHOPIFY_API_KEY } = process.env;

ReactDOM.render(
  <StateProvider>
    <AppProvider>
      <BrowserRouter>
        <AppBridgeProvider
          config={{
            apiKey: SHOPIFY_API_KEY,
            shopOrigin: shopOrigin
          }}
        >
          <Routes />
        </AppBridgeProvider>
      </BrowserRouter>
    </AppProvider>
  </StateProvider>,
  rootElement
);
