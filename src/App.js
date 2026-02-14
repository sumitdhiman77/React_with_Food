import { appRouter } from "./router";
import "../index.css";
import React, { Suspense, lazy, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

import Header from "./components/Header";
import Body from "./components/Body";
import ExploreRestaurants from "./components/ExploreRestaurants";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";

// Utils & Store
import Shimmer from "./components/Shimmer";
import { appStore } from "./utils/appStore";
import { LocationProvider } from "./utils/LocationContext";

// Lazy Loading (Optimized for performance)
const Grocery = lazy(() => import("./components/Grocery"));

/**
 * Main Layout Component
 * Wrapped in a div with min-h-screen to ensure the gray background
 * fills the page even when content is short.
 */
const App = () => {
  return (
    <div className="app-layout min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      {/* <Footer /> - Add a footer here later */}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <Provider store={appStore}>
      <LocationProvider>
        {/* Global Suspense for the entire router transitions */}
        <Suspense fallback={<Shimmer />}>
          <RouterProvider router={appRouter} />
        </Suspense>
      </LocationProvider>
    </Provider>
  </StrictMode>,
);
