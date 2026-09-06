import { defineConfig, configDefaults } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
    // Playwright owns everything under tests/ (its own runner, its own
    // `test`/`expect`/`page` fixture) — exclude it so Vitest's default
    // *.spec.ts matcher doesn't try to collect it too.
    exclude: [...configDefaults.exclude, "tests/**"],
    coverage: {
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["src/main.tsx", "src/types/**"],
      thresholds: {
        perFile: true,
        lines: 80,
        functions: 80,
        branches: 75,
        statements: 80,
      },
    },
    globals: true,
  },
});
