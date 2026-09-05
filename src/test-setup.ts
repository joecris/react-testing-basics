import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";

afterEach(() => {
  cleanup();

  // Global safety net for `vi.spyOn(...)`. A spy temporarily replaces a real
  // implementation (e.g. a module function or a method on a real object), and
  // that replacement persists until restored. Without this, a spy left
  // un-restored in one test file could leak into unrelated tests run in the
  // same worker/process. Plain `vi.fn()` mocks (e.g. ones created fresh per
  // test in a `beforeEach`) have nothing to restore, so this is a no-op for
  // those — it only matters once a test introduces `vi.spyOn`.
  vi.restoreAllMocks();
});
