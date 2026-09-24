// Turn a product's size table into header rows with real col/row spans.
//
// The scraper stores tables as a rectangular grid: a merged cell is repeated in
// every position it covers (scripts/table-grid.mjs). Two-level headers therefore
// arrive as a header row with a repeated group title plus a first body row that
// holds the sub-headings, e.g.
//
//   headers: DN | Svoris | Vakuumas  | Vakuumas | Slėgis
//   rows[0]: DN | Svoris | [mm H2O]  | [bar]    | Slėgis
//
// This rebuilds the merged header for display:
//
//   DN (rowspan 2) | Svoris (rowspan 2) | Vakuumas (colspan 2) | Slėgis (rowspan 2)
//                                        | [mm H2O] | [bar]
import type { SpecTable } from "@/lib/products";

export type HeadCell = { text: string; colSpan: number; rowSpan: number };
export type DisplayTable = { head: HeadCell[][]; body: string[][] };

// A value cell: digits with the separators/units that appear in size tables.
const isValue = (s: string) => /\d/.test(s) && /^[\d\s.,*xх×/″"'½¼¾+\-–~%]+$/.test(s.trim());

function isSubHeaderRow(headers: string[], row: string[] | undefined): boolean {
  if (!row || row.length !== headers.length) return false;
  if (row.some(isValue)) return false;
  // Something must actually be merged: a repeated group title in the header,
  // and at least one sub-heading that differs from the header above it.
  const hasGroup = headers.some((h, i) => i > 0 && h && h === headers[i - 1]);
  const hasSub = row.some((c, i) => c !== headers[i]);
  return hasGroup && hasSub;
}

export function toDisplayTable(t: SpecTable): DisplayTable {
  const { headers, rows } = t;
  if (!isSubHeaderRow(headers, rows[0])) {
    return {
      head: [headers.map((text) => ({ text, colSpan: 1, rowSpan: 1 }))],
      body: rows,
    };
  }

  const sub = rows[0];
  const top: HeadCell[] = [];
  const second: HeadCell[] = [];
  for (let i = 0; i < headers.length; ) {
    let j = i + 1;
    while (j < headers.length && headers[j] === headers[i]) j += 1;
    const span = j - i;
    if (span === 1 && sub[i] === headers[i]) {
      // Plain column: header spans both header rows.
      top.push({ text: headers[i], colSpan: 1, rowSpan: 2 });
    } else {
      top.push({ text: headers[i], colSpan: span, rowSpan: 1 });
      for (let k = i; k < j; k += 1) second.push({ text: sub[k], colSpan: 1, rowSpan: 1 });
    }
    i = j;
  }
  return { head: second.length ? [top, second] : [top], body: rows.slice(1) };
}
