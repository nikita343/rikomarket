// Parse an HTML <table> into a rectangular grid of cell texts.
//
// rowspan / colspan are expanded: a merged cell's text is repeated in every
// grid position it covers, so every row has the same number of columns and
// row i / column j line up with the table as it is displayed. (The previous
// parser dropped merged cells, which shifted values into the wrong columns.)
//
//   parseTableGrid(tableHtml, collapse) → string[][]
//   `collapse` turns a cell's inner HTML into plain text.
export function parseTableGrid(tableHtml, collapse) {
  const grid = [];
  const trs = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
  trs.forEach((tr, r) => {
    grid[r] ??= [];
    let c = 0;
    for (const m of tr[1].matchAll(/<t[dh]\b([^>]*)>([\s\S]*?)<\/t[dh]>/gi)) {
      while (grid[r][c] !== undefined) c += 1; // skip slots taken by a rowspan above
      const attrs = m[1];
      const rs = Math.max(1, Number(attrs.match(/rowspan\s*=\s*["']?(\d+)/i)?.[1] ?? 1));
      const cs = Math.max(1, Number(attrs.match(/colspan\s*=\s*["']?(\d+)/i)?.[1] ?? 1));
      const text = collapse(m[2]);
      for (let dr = 0; dr < rs && r + dr < trs.length; dr += 1) {
        grid[r + dr] ??= [];
        for (let dc = 0; dc < cs; dc += 1) grid[r + dr][c + dc] = text;
      }
      c += cs;
    }
  });
  const width = Math.max(0, ...grid.map((row) => row.length));
  return grid
    .map((row) => Array.from({ length: width }, (_, i) => row[i] ?? ""))
    .filter((row) => row.some((cell) => cell));
}
