import { parseSpecialCharacters } from "./parseSpecialCharacters";

export function toSlug(str: string) {
  return parseSpecialCharacters(str).replace(/[ /]/g, "-").replace(/:/g, "").toLowerCase();
}
