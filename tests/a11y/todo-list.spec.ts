import { test, expect } from "../fixtures";

// Relies on the seed data hardcoded in App.tsx: "Water the plants" and
// "Walk the dog" start as todo, "Read the book" starts as done.
test.describe("Accessibility: Todo list", () => {
  test("hide-done filtered list has no violations", async ({
    todosPage,
    makeAxeBuilder,
  }) => {
    await todosPage.toggleHideDone();

    const results = await makeAxeBuilder().analyze();

    expect(results.violations).toEqual([]);
  });

  test("all-done empty state has no violations", async ({
    todosPage,
    makeAxeBuilder,
  }) => {
    await todosPage.toggleStatus("Water the plants");
    await todosPage.toggleStatus("Walk the dog");
    await todosPage.toggleHideDone();

    const results = await makeAxeBuilder().analyze();

    expect(results.violations).toEqual([]);
  });
});
