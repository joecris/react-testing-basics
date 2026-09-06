import type { Locator, Page } from "@playwright/test";

/**
 * Page Object for the Todos page (currently the whole app — there's only
 * one page). Centralizes "how do I find/interact with X" so a markup or
 * copy change only needs a fix here, not in every spec file that touches it.
 */
export class TodosPage {
  readonly page: Page;
  readonly addNewButton: Locator;
  readonly hideDoneCheckbox: Locator;
  readonly taskInput: Locator;
  readonly descriptionInput: Locator;
  readonly submitButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addNewButton = page.getByRole("button", { name: "Add New" });
    this.hideDoneCheckbox = page.getByRole("checkbox", { name: "Hide done" });
    this.taskInput = page.getByRole("textbox", { name: /task/i });
    this.descriptionInput = page.getByRole("textbox", { name: /description/i });
    this.submitButton = page.getByRole("button", { name: "Add" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  async goto() {
    await this.page.goto("/");
  }

  /** Scopes to one todo card by its visible name/description text. */
  getCard(name: string) {
    return this.page.getByTestId("todo-card").filter({ hasText: name });
  }

  async addTodo(name: string, description?: string) {
    await this.addNewButton.click();
    await this.taskInput.fill(name);
    if (description) {
      await this.descriptionInput.fill(description);
    }
    await this.submitButton.click();
  }

  async cancelAddTodo(name: string, description?: string) {
    await this.addNewButton.click();
    await this.taskInput.fill(name);
    if (description) {
      await this.descriptionInput.fill(description);
    }
    await this.cancelButton.click();
  }

  async toggleStatus(name: string) {
    await this.getCard(name)
      .getByRole("button", { name: /^Mark as/ })
      .click();
  }

  async toggleHideDone() {
    await this.hideDoneCheckbox.click();
  }
}
