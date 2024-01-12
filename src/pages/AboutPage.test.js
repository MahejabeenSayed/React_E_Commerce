import "@testing-library/jest-dom";

import AboutPage from "./AboutPage";
import { render, screen } from "../redux/test-utils";

test("renders About Us heading", () => {
  render(<AboutPage />);
  const linkElement = screen.getByText(/About Us/i);
  expect(linkElement).toBeInTheDocument();
});
