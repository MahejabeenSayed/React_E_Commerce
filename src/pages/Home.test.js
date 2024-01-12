import "@testing-library/jest-dom";

import Home from "./Home";
import { render, screen } from "../redux/test-utils";

describe("Home Component", () => {
  test("renders my shop heading", () => {
    render(<Home />, { initialState: {} });
    const linkElement = screen.getByText(/my shop/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders New Arrival heading on banner", () => {
    render(<Home />);
    const linkElement = screen.getByText(/New Arrival/i);
    expect(linkElement).toBeInTheDocument();
  });

  test("renders mahejabeen name in the footer link", () => {
    render(<Home />);
    const linkElement = screen.getByText(/mahejabeen/i);
    expect(linkElement).toBeInTheDocument();
  });
});
