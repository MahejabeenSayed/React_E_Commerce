import "@testing-library/jest-dom";

import Cart from "./Cart";
import data from "../../public/api/sneakers.json";
import { render, screen } from "@testing-library/react";
import { render as providerRender } from "../redux/test-utils";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

const mockSneakers = data.sneakers.slice(0, 4);

jest.mock("react-redux", () => ({
  useSelector: () => mockSneakers,
  useDispatch: () => {},
}));

describe("Cart Component with data", () => {
  beforeEach(() => {});

  test("Should display 4 elements in the cart", () => {
    render(
      <BrowserRouter>
        {/* <Provider> */}
        <Cart />
        {/* </Provider> */}
      </BrowserRouter>
    );
    const linkElement = screen.getAllByTestId("cartitem");
    expect(linkElement).toHaveLength(4);
  });
});
