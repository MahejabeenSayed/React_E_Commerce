import "@testing-library/jest-dom";

import Navbar from "./Navbar";
import { fireEvent, render, screen } from "../redux/test-utils";

describe("Home Component", () => {
  test("renders my shop heading", () => {
    render(<Navbar />, { initialState: {} });
    const linkElement = screen.getByText(/my shop/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("On click of about us page, should display about us page", () => {
    render(<Navbar />, { initialState: {} });
    const about_btn = screen.getByText(/about/i);
    fireEvent.click(about_btn);
    expect(window.location.pathname).toBe("/about");
  });

  test("On click of product page, should display products page", () => {
    render(<Navbar />, { initialState: {} });
    const products_btn = screen.getByText(/product/i);
    fireEvent.click(products_btn);
    expect(window.location.pathname).toBe("/product");
  });
});
