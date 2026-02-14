import "../index.css";
import React, { Suspense, lazy, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";

// Static Component Imports
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

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signIn", element: <SignIn /> },
      {
        path: "/grocery",
        element: (
          <Suspense
            fallback={
              <h1 className="p-10 text-center">Loading Grocery Store...</h1>
            }
          >
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/collections/:collectionId/:query/:tags/:type",
        element: <ExploreRestaurants />,
      },
      { path: "/restaurants/:name/:query", element: <RestaurantMenu /> },
      { path: "/cart", element: <Cart /> },
    ],
  },
]);

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
