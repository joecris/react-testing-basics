import { test as base, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { TodosPage } from "./pages/todos-page";

// The explicit WCAG conformance target for automated a11y scans. Without
// this, axe-core's default ruleset mixes WCAG 2.0/2.1/2.2 criteria with ~30
// "best-practice" rules that aren't official success criteria at all, and
// that default set can silently grow on every axe-core version bump.
const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];

/**
 * Extends Playwright's base `test` with:
 * - `todosPage`: a ready-to-use Page Object, already navigated, so spec
 *   files don't repeat `new TodosPage(page)` + `page.goto("/")`.
 * - `makeAxeBuilder`: an AxeBuilder factory pre-scoped to WCAG_TAGS, so
 *   every a11y spec scans against the same declared conformance level
 *   without repeating the tag list.
 */
export const test = base.extend<{
  todosPage: TodosPage;
  makeAxeBuilder: () => AxeBuilder;
}>({
  todosPage: async ({ page }, use) => {
    const todosPage = new TodosPage(page);
    await todosPage.goto();
    await use(todosPage);
  },

  // Depends on `todosPage`, not the raw `page`, so requesting
  // `makeAxeBuilder` alone still triggers navigation to "/" via
  // `todosPage`'s own fixture - a spec that only interacts through
  // `todosPage.page` doesn't need to separately destructure `todosPage`.
  makeAxeBuilder: async ({ todosPage }, use) => {
    await use(() =>
      new AxeBuilder({ page: todosPage.page }).withTags(WCAG_TAGS),
    );
  },
});

export { expect };
