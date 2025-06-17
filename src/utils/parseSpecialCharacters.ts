export function parseSpecialCharacters(textToParse: string): string {
  if (!textToParse) return "404";
  // the normalize method breaks down accented characters (i.e. é becomes e').
  // the replace removes all the accents (that are now standalone).
  const textWithConvertedAccents = textToParse.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const textWithCorrectSpacing = textWithConvertedAccents.replace(/@/, " ");

  const matches = textWithCorrectSpacing.match(/[A-Za-z0-9 ]/g);

  return matches ? matches.join("") : "";
}
