/**
 * Lightweight class-name merger — no external dependencies.
 * Accepts strings, undefined, null, false, and arrays.
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}
