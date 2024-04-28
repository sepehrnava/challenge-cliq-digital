import { render, screen } from "@testing-library/react";

import { BaseTemplate } from "./BaseTemplate";

describe("Base template", () => {
  beforeAll(() => {
    Object.defineProperty(window, "matchMedia", {
      value: jest.fn(() => {
        return {
          matches: true,
          addListener: jest.fn(),
          removeListener: jest.fn(),
        };
      }),
    });
  });

  describe("Render method", () => {
    it("should have h1 with a text", () => {
      render(<BaseTemplate>{null}</BaseTemplate>);
      const h1 = screen.getByText("React Weather");
      expect(h1).toBeInTheDocument();
    });
  });
});
