import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Header from "./components/Header";
import Body from "./components/Body";
import ExploreRestaurants from "./components/ExploreRestaurants";
import About from "./components/About";
import Contact from "./components/Contact";
import Cart from "./components/Cart";
import SignIn from "./components/SignIn";
import RestaurantMenu from "./components/RestaurantMenu";
import Error from "./components/Error";
export const appRouter = createBrowserRouter([
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
