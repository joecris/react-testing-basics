import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test-setup.ts"],
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
