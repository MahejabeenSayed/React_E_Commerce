// test-utils.js
import React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";
// Import your own reducer
import reducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";

function render(
  ui,
  {
    initialState,
    store = configureStore({ reducer: reducer }, initialState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    );
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from "@testing-library/react";
// override render method
export { render };
