import "@testing-library/jest-dom";

import Products from "./Products";
import { act, render, screen } from "../redux/test-utils";

describe("Products Component", () => {
  test("Products should be displayed", async () => {
    window.fetch = jest.fn();
    window.fetch.mockResolvedValueOnce({
      json: async () => import("../../public/api/sneakers.json"),
    });
    render(<Products />);
    const linkElement = await screen.findAllByTestId("test-product");
    expect(linkElement).toHaveLength(80);
  });
});
