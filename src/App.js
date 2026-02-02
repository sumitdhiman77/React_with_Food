import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import Body from "./components/Body";
import ExploreRestaurants from "./components/ExploreRestaurants";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { Provider } from "react-redux";
import { LocationProvider } from "./utils/LocationContext";

import { appStore } from "./utils/appStore";
const Grocery = lazy(() => import("./components/Grocery"));
const App = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Body /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      { path: "/signIn", element: <SignIn /> },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<h1>Loading......</h1>}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/collections/:collectionId/:query/:tags/:type",
        element: <ExploreRestaurants />,
      },
      { path: "/restaurants/:resId/:query", element: <RestaurantMenu /> },
      { path: "/cart", element: <Cart /> },
    ],
    errorElement: <Error />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={appStore}>
    <LocationProvider>
      <RouterProvider router={appRouter} />
    </LocationProvider>
  </Provider>,
);

// https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.2182266&lng=76.3172673&collection=83637&tags=layout_CCS_Burger&sortBy=&filters=&type=rcv2&offset=0&page_type=null
