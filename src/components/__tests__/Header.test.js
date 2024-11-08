import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import Header from "../Header";
import React from "react";
import { BrowserRouter, Link, useLocation } from "react-router-dom";
it("should render header component with log in button", () => {
  const atInitialLevel = null;
  renderWithProviders(
    <BrowserRouter>
      <Provider store={appStore}>
        <Header />
      </Provider>
    </BrowserRouter>,
    {
      preloadedState: {
        initialState: atInitialLevel,
      },
    }
  );
});
