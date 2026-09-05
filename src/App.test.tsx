import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  /**
   * App has no state or logic of its own anymore — it just composes NavBar
   * and Todos. So this is a thin smoke/integration test confirming both
   * mount together on a real page load, not a re-test of their internal
   * behavior (that belongs in NavBar.test.tsx / Todos.test.tsx).
   */
  test("renders the navigation and the todo list together", () => {
    render(<App />);

    expect(screen.getByRole("link", { name: "Docs" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "My ToDo's" }),
    ).toBeInTheDocument();
  });
});
