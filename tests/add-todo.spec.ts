import { test, expect } from "./fixtures";

test.describe("Add Todo", () => {
  test("adds a new todo and shows it in the list", async ({ todosPage }) => {
    await todosPage.addTodo("Buy groceries", "Milk, eggs, bread");

    const card = todosPage.getCard("Buy groceries");
    await expect(card).toBeVisible();
    await expect(card.getByText("Milk, eggs, bread")).toBeVisible();
  });

  test("requires a task name before submitting", async ({ todosPage }) => {
    await todosPage.addNewButton.click();
    await todosPage.submitButton.click();

    // Native required-field validation keeps the form open instead of
    // submitting, so the task input is still visible/focused.
    await expect(todosPage.taskInput).toBeVisible();
  });

  test("cancel discards the form without adding a todo", async ({
    todosPage,
  }) => {
    await todosPage.cancelAddTodo("Should not be saved");

    await expect(todosPage.getCard("Should not be saved")).toHaveCount(0);
  });
});
