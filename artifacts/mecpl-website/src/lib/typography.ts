const preservedTerms = [
  "MECPL", "ISO", "CRISIL", "BBB", "SME", "NSCI", "CIDC", "BAI", "CSR",
  "AGM", "FY", "RCC", "R&D", "HSE", "PPE", "BIM", "VR", "AR", "CAD", "ESG", "DOORS", "India", "Pune",
  "Maharashtra", "Trump Towers", "Panchshil", "Aluform", "Hofundur",
  "Schwing Stetter", "Cr",
];

/**
 * Format generic display headings without changing the underlying data.
 * Company, person, project, and official award names should render unchanged.
 */
export function sentenceCase(value: string): string {
  let result = value.toLowerCase();
  const terms = [...preservedTerms, ...(value.match(/\b[A-Z][A-Z0-9]*\d[A-Z0-9]*\b/g) ?? [])];
  for (const term of terms) {
    const escaped = term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    result = result.replace(new RegExp(`\\b${escaped}\\b`, "gi"), term);
  }
  return result.replace(/(^|[.!?]\s+)([a-z])/g, (_, boundary: string, letter: string) => boundary + letter.toUpperCase());
}

const titleCaseMinorWords = new Set([
  "a", "an", "and", "as", "at", "but", "by", "for", "from", "in", "into",
  "nor", "of", "on", "or", "over", "per", "to", "up", "via", "with", "yet",
]);
const titleCaseAcronyms = new Set([
  "mecpl", "iso", "crisil", "bbb", "sme", "nsci", "cidc", "bai", "csr",
  "agm", "fy", "rcc", "r&d", "hse", "ppe", "bim", "vr", "ar", "cad", "esg",
]);

/** Format a display heading in title case while preserving common acronyms. */
export function titleCase(value: string): string {
  const source = sentenceCase(value).replace(/\bDOORS\b/g, "Doors");
  let startsSentence = true;

  return source.split(/(\s+)/).map((part) => {
    if (!part.trim()) return part;

    const leading = part.match(/^[^A-Za-z0-9]*/)?.[0] ?? "";
    const rest = part.slice(leading.length);
    const trailing = rest.match(/[^A-Za-z0-9]*$/)?.[0] ?? "";
    const word = rest.slice(0, rest.length - trailing.length);
    if (!word) return part;

    const lower = word.toLowerCase();
    const formatted = titleCaseAcronyms.has(lower)
      ? lower.toUpperCase()
      : !startsSentence && titleCaseMinorWords.has(lower)
        ? lower
        : `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;

    startsSentence = /[.!?]$/.test(trailing);
    return `${leading}${formatted}${trailing}`;
  }).join("");
}