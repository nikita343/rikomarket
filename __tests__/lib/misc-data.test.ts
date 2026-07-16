import { industries, industryById } from "@/lib/industries";
import { chemData, chemMaterials } from "@/lib/chem-data";
import { convPressure, convLength, convTemp, convFlow } from "@/lib/reference";
import { company, nav, usps } from "@/lib/site";

describe("lib/industries", () => {
  it("lists 6 industries (oil & exhaust removed per client)", () => {
    expect(industries).toHaveLength(6);
    const ids = industries.map((i) => i.id);
    expect(ids).not.toContain("oil");
    expect(ids).not.toContain("exhaust");
  });

  it("industryById resolves known and unknown ids", () => {
    expect(industryById("wood")?.name).toBe("Medienos apdirbimas");
    expect(industryById("oil")).toBeUndefined();
  });

  it("every industry has an icon and description", () => {
    for (const i of industries) {
      expect(i.icon).toBeTruthy();
      expect(i.desc.length).toBeGreaterThan(0);
    }
  });
});

describe("lib/chem-data", () => {
  it("has 9 material columns", () => {
    expect(chemMaterials).toHaveLength(9);
  });

  it("every chem row's vals length matches the material count", () => {
    for (const row of chemData) {
      expect(row.name.length).toBeGreaterThan(0);
      expect(row.vals).toHaveLength(chemMaterials.length);
    }
  });

  it("has no duplicate chemical names", () => {
    const names = chemData.map((r) => r.name);
    expect(new Set(names).size).toBe(names.length);
  });
});

describe("lib/reference", () => {
  it("each conversion table is a non-empty list of [label, formula] pairs", () => {
    for (const table of [convPressure, convLength, convTemp, convFlow]) {
      expect(table.length).toBeGreaterThan(0);
      for (const [label, formula] of table) {
        expect(typeof label).toBe("string");
        expect(typeof formula).toBe("string");
      }
    }
  });
});

describe("lib/site", () => {
  it("uses the Elektrėnai address (per client)", () => {
    expect(company.address).toContain("Elektrėnai");
  });

  it("nav links all have a label and href", () => {
    for (const item of nav) {
      expect(item.label).toBeTruthy();
      expect(item.href.startsWith("/")).toBe(true);
    }
  });

  it("has exactly 3 USPs", () => {
    expect(usps).toHaveLength(3);
  });
});
