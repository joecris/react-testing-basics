import { test as base, expect } from "@playwright/test";
import { TodosPage } from "./pages/todos-page";

/**
 * Extends Playwright's base `test` with a ready-to-use `todosPage` fixture,
 * so spec files get a page object with the app already navigated to,
 * instead of repeating `new TodosPage(page)` + `page.goto("/")` everywhere.
 */
export const test = base.extend<{ todosPage: TodosPage }>({
  todosPage: async ({ page }, use) => {
    const todosPage = new TodosPage(page);
    await todosPage.goto();
    await use(todosPage);
  },
});

export { expect };
