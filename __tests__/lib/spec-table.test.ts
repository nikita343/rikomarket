import { toDisplayTable } from "@/lib/spec-table";

describe("toDisplayTable", () => {
  it("leaves a plain one-row header alone", () => {
    const t = { headers: ["DN", "Svoris"], rows: [["20", "0,3"], ["25", "0,4"]] };
    const d = toDisplayTable(t);
    expect(d.head).toHaveLength(1);
    expect(d.head[0].map((c) => c.text)).toEqual(["DN", "Svoris"]);
    expect(d.body).toEqual(t.rows);
  });

  it("rebuilds a two-level header (group title + units row)", () => {
    const t = {
      headers: ["DN", "Svoris", "Vakuumas", "Vakuumas", "Slėgis"],
      rows: [
        ["DN", "Svoris", "[mm H2O]", "[bar]", "Slėgis"],
        ["20", "0,28", "7000", "0,686", "0,314"],
      ],
    };
    const d = toDisplayTable(t);
    expect(d.head[0]).toEqual([
      { text: "DN", colSpan: 1, rowSpan: 2 },
      { text: "Svoris", colSpan: 1, rowSpan: 2 },
      { text: "Vakuumas", colSpan: 2, rowSpan: 1 },
      { text: "Slėgis", colSpan: 1, rowSpan: 2 },
    ]);
    expect(d.head[1].map((c) => c.text)).toEqual(["[mm H2O]", "[bar]"]);
    expect(d.body).toEqual([["20", "0,28", "7000", "0,686", "0,314"]]);
  });

  it("puts a full units row under every column (Camlock tables)", () => {
    const t = {
      headers: ["Vidinis diametras", "Vidinis diametras", "Sriegis", "Slėgis"],
      rows: [
        ["мм", "colis", "EN ISO 228-1", "bar"],
        ["13", "1/2″", "G 1/2", "16"],
      ],
    };
    const d = toDisplayTable(t);
    expect(d.head[0].map((c) => [c.text, c.colSpan])).toEqual([
      ["Vidinis diametras", 2],
      ["Sriegis", 1],
      ["Slėgis", 1],
    ]);
    expect(d.head[1].map((c) => c.text)).toEqual(["мм", "colis", "EN ISO 228-1", "bar"]);
    expect(d.body).toHaveLength(1);
  });

  it("does not mistake a data row for a units row", () => {
    const t = { headers: ["A", "A", "B"], rows: [["1", "2", "3"]] };
    expect(toDisplayTable(t).body).toEqual([["1", "2", "3"]]);
  });
});
