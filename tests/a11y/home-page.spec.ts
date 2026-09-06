import { test, expect } from "../fixtures";

/**
 * Baseline scan of the default page load. The seed data already mixes a
 * "todo" and a "done" card (see App.tsx), so this incidentally covers the
 * done variant's color contrast too - no need for a separate test for that.
 */
test.describe("Accessibility: home page", () => {
  test("has no automatically detectable violations on initial load", async ({
    makeAxeBuilder,
  }) => {
    const results = await makeAxeBuilder().analyze();

    expect(results.violations).toEqual([]);
  });
});
