import { test, expect } from "../fixtures";

test.describe("Accessibility: Add Todo", () => {
  test("add-todo form has no violations when open", async ({
    todosPage,
    makeAxeBuilder,
  }) => {
    await todosPage.addNewButton.click();

    const results = await makeAxeBuilder().analyze();

    expect(results.violations).toEqual([]);
  });
});
