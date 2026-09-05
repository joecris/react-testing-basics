import { generateReferenceNo, DEFAULT_REF_NO_LENGTH } from "./utils";

describe("generateReferenceNo", () => {
  test("correctly generates reference no. with default length", () => {
    const refNo = generateReferenceNo();
    expect(refNo.length).toBe(DEFAULT_REF_NO_LENGTH);
    expect(refNo).toMatch(/^[A-Z0-9]+$/);
  });

  test("correctly generates reference no. with specified length", () => {
    const refNo = generateReferenceNo(10);
    expect(refNo.length).toBe(10);
    expect(refNo).toMatch(/^[A-Z0-9]+$/);
  });

  // Edge cases
  test("returns empty string on invalid length passed", () => {
    const refNo = generateReferenceNo(0);
    expect(refNo.length).toBe(0);
    expect(refNo).toBe("");

    const refNo2 = generateReferenceNo(-1);
    expect(refNo2.length).toBe(0);
    expect(refNo2).toBe("");
  });
});
