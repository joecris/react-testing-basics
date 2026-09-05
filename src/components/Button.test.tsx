import Button from "./Button";
import { render, screen } from "@testing-library/react";

/**
 * Typically testing components based on CSS classes assertions are brittle.
 * However, this Button component is a "primitive" component with variants that differs
 * only on their CSS styles. To make the tests more stable, we only test the subset of CSS classes
 * that would differ between vriants
 */

describe("Button", () => {
  test("renders children correctly", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  test("renders primary variant", () => {
    render(<Button variant="primary">Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass(
      "bg-blue-700",
      "text-white",
    );
  });

  test("renders secondary variant", () => {
    render(<Button variant="secondary">Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass(
      "bg-gray-300",
      "text-slate-700",
    );
  });

  test("renders primary variant by default when none is specified", () => {
    render(<Button>Submit</Button>);
    expect(screen.getByRole("button", { name: "Submit" })).toHaveClass(
      "bg-blue-700",
      "text-white",
    );
  });
});
