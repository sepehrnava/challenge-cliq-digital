import { render, screen } from "@testing-library/react";

import Index from "./page";

describe("Index page", () => {
  describe("Render method", () => {
    it("should have h1 tag", () => {
      render(<Index />);

      const heading = screen.getByRole("heading", {
        name: /Boilerplate Code/,
      });

      expect(heading).toBeInTheDocument();
    });
  });
});
