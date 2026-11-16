import { randomInt } from "node:crypto";

/**
 * Tracking reference format: NRV-YYYYMMDD-XXXXXX
 * where X is an unambiguous alphanumeric. 6 chars of entropy in a
 * 30-symbol alphabet ≈ 29 bits; combined with a mandatory phone-number
 * match on lookup, guessing another person's request is impractical.
 */
const ALPHABET = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

export function generateTrackingRef(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  let suffix = "";
  for (let i = 0; i < 6; i += 1) {
    suffix += ALPHABET[randomInt(0, ALPHABET.length)];
  }
  return `NRV-${y}${m}${d}-${suffix}`;
}

export const TRACKING_REF_PATTERN = /^NRV-\d{8}-[A-Z2-9]{6}$/;
