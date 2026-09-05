import { randomInt } from "node:crypto";

export const DEFAULT_REF_NO_LENGTH = 8;

export function generateReferenceNo(
  length: number = DEFAULT_REF_NO_LENGTH,
): string {
  const BOOKING_REF_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += BOOKING_REF_CHARS[randomInt(BOOKING_REF_CHARS.length)];
  }

  return result;
}
