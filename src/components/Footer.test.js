import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Footer from "./Footer";

test("renders mahejabeen name in the footer link", () => {
  render(<Footer />);
  const linkElement = screen.getByText(/mahejabeen/i);
  expect(linkElement).toBeInTheDocument();
});
