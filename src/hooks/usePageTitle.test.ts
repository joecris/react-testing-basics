import { renderHook } from "@testing-library/react";
import usePageTitle from "./usePageTitle";

describe("usePageTitle", () => {
  const originalTitle = document.title;

  afterEach(() => {
    document.title = originalTitle;
  });

  test("sets document.title to the given value", () => {
    renderHook(() => usePageTitle("My Page"));

    expect(document.title).toBe("My Page");
  });

  test("updates document.title when the title argument changes", () => {
    const { rerender } = renderHook(
      ({ title }: { title: string }) => usePageTitle(title),
      { initialProps: { title: "First" } },
    );
    expect(document.title).toBe("First");

    rerender({ title: "Second" });

    expect(document.title).toBe("Second");
  });

  test("restores the previous title on unmount", () => {
    document.title = "Original";

    const { unmount } = renderHook(() => usePageTitle("Temporary"));
    expect(document.title).toBe("Temporary");

    unmount();

    expect(document.title).toBe("Original");
  });
});
