import { createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";
const Grocery = lazy(() => import("./components/Grocery"));
import App from "./App";
import Body from "./components/Body";
import ExploreRestaurants from "./components/ExploreRestaurants";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
const app = createBrowserRouter([
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
export default App;
