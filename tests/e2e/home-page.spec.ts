import { test, expect } from "../fixtures";

/**
 * Quick smoke test for the page
 * This should not repeat all tests similar to components tests
 */
test.describe("home page", () => {
  test("has title", async ({ todosPage }) => {
    await expect(todosPage.page).toHaveTitle(
      /My Todos - React Testing Overview/,
    );
  });

  test("displays navbar and links", async ({ todosPage }) => {
    await expect(
      todosPage.page.getByRole("link", {
        name: /a blue house with the text My Awesome Logo/,
      }),
    ).toBeVisible();
  });

  test("displays Todos and controls", async ({ todosPage }) => {
    await expect(todosPage.page.getByText(/My ToDo's/)).toBeVisible();
  });
});
