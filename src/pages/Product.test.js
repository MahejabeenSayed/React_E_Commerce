import "@testing-library/jest-dom";

import Product from "./Product";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import rootReducers from "../redux/reducer";
import { configureStore } from "@reduxjs/toolkit";

describe("Product Component", () => {
  test("renders my the product whose id is passed in header", async () => {
    const productId = "473391";

    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => import("../../public/api/sneakers.json"),
    });
    render(
      <MemoryRouter initialEntries={[`/product/${productId}`]}>
        <Provider store={configureStore({ reducer: rootReducers }, {})}>
          <Routes>
            <Route path="/product/:id" element={<Product />}></Route>
          </Routes>
        </Provider>
      </MemoryRouter>
    );

    const element = await screen.findByText(/Patta x Air/i);
    expect(element).toBeInTheDocument();
  });
});
