import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Home from "./main";

test("renders New Arrival heading on banner", () => {
  render(<Home />);
  const linkElement = screen.getByText(/New Arrival/i);
  expect(linkElement).toBeInTheDocument();
});
