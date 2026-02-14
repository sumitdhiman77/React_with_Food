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
