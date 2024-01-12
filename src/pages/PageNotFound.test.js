import "@testing-library/jest-dom";

import { render, screen } from "../redux/test-utils";
import Home from "./Home";

describe("Page Not found component", () => {
  test("On click of invalid link, pageNotFound page should display", () => {
    render(<Home />);
    window.location = "/product/jkdk";
    setTimeout(() => {
      const element = screen.getByText(/404: Page Not Found/i);
      expect(element).toBeInTheDocument();
    }, 100);
  });
});
