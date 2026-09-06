import { test, expect } from "../fixtures";

// Relies on the seed data currently hardcoded in App.tsx: "Water the plants"
// and "Walk the dog" start as todo, "Read the book" starts as done. If that
// seed data changes, update the names below to match.
test.describe("Todo list", () => {
  test("marks a todo as done and back to todo", async ({ todosPage }) => {
    const card = todosPage.getCard("Water the plants");
    await expect(card.getByRole("button", { name: "Mark as Done" })).toBeVisible();

    await todosPage.toggleStatus("Water the plants");
    await expect(card.getByRole("button", { name: "Mark as ToDo" })).toBeVisible();

    await todosPage.toggleStatus("Water the plants");
    await expect(card.getByRole("button", { name: "Mark as Done" })).toBeVisible();
  });

  test("hide done filters out completed todos", async ({ todosPage }) => {
    await expect(todosPage.getCard("Read the book")).toBeVisible();

    await todosPage.toggleHideDone();

    await expect(todosPage.getCard("Read the book")).toHaveCount(0);
    await expect(todosPage.getCard("Water the plants")).toBeVisible();
  });
});
