import { industries, industryById, industryText } from "@/lib/industries";
import { chemData, chemMaterials } from "@/lib/chem-data";
import { convPressure, convLength, convTemp, convFlow, getConversions } from "@/lib/reference";
import { getSite, site } from "@/lib/site";
import { locales } from "@/lib/i18n";
import { getDict, plural } from "@/lib/dictionary";

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

  it("every industry has an icon and a description in both locales", () => {
    for (const i of industries) {
      expect(i.icon).toBeTruthy();
      for (const l of locales) {
        const { name, desc } = industryText(i, l);
        expect(name.length).toBeGreaterThan(0);
        expect(desc.length).toBeGreaterThan(0);
      }
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
    expect(getSite("lt").address).toContain("Elektrėnai");
    expect(getSite("ru").address).toContain("Электренай");
  });

  it("nav links all have a label and a locale-independent href", () => {
    for (const l of locales) {
      for (const item of getSite(l).nav) {
        expect(item.label).toBeTruthy();
        expect(item.href.startsWith("/")).toBe(true);
      }
      // both locales expose the same set of routes
      expect(getSite(l).nav.map((n) => n.href)).toEqual(getSite("lt").nav.map((n) => n.href));
    }
  });

  it("has exactly 3 USPs in every locale", () => {
    for (const l of locales) expect(getSite(l).usps).toHaveLength(3);
  });

  it("every locale fills in every site field", () => {
    for (const l of locales) {
      for (const value of Object.values(site[l])) {
        if (typeof value === "string") expect(value.length).toBeGreaterThan(0);
      }
    }
  });
});

describe("lib/dictionary", () => {
  it("the Russian dictionary has the same keys as the Lithuanian one", () => {
    const keys = (o: unknown, prefix = ""): string[] =>
      o && typeof o === "object" && !Array.isArray(o)
        ? Object.entries(o as Record<string, unknown>).flatMap(([k, v]) =>
            [`${prefix}${k}`].concat(keys(v, `${prefix}${k}.`)),
          )
        : [];
    expect(keys(getDict("ru")).sort()).toEqual(keys(getDict("lt")).sort());
  });

  it("no Russian string is left in Lithuanian", () => {
    const walk = (o: unknown): string[] =>
      typeof o === "string"
        ? [o]
        : Array.isArray(o)
          ? o.flatMap(walk)
          : o && typeof o === "object"
            ? Object.values(o as Record<string, unknown>).flatMap(walk)
            : [];
    const ltOnly = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/;
    expect(walk(getDict("ru")).filter((s) => ltOnly.test(s))).toEqual([]);
  });

  it("picks the right plural form", () => {
    const forms = getDict("ru").browser.items;
    expect(plural(1, forms)).toBe(forms[0]);
    expect(plural(3, forms)).toBe(forms[1]);
    expect(plural(11, forms)).toBe(forms[2]);
    expect(plural(22, forms)).toBe(forms[1]);
    expect(plural(25, forms)).toBe(forms[2]);
  });
});

describe("lib/reference", () => {
  it("both locales ship the same conversion table shapes", () => {
    for (const key of ["pressure", "length", "temp", "flow"] as const) {
      expect(getConversions("ru")[key]).toHaveLength(getConversions("lt")[key].length);
    }
  });
});
