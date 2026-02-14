import React, { StrictMode, Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import { appRouter } from "./router";
import { appStore } from "./utils/appStore";
import { LocationProvider } from "./utils/LocationContext";
import Shimmer from "./components/Shimmer";
import "../index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={appStore}>
      <LocationProvider>
        <Suspense fallback={<Shimmer />}>
          <RouterProvider router={appRouter} />
        </Suspense>
      </LocationProvider>
    </Provider>
  </StrictMode>,
);
