// Three direction tokens. Each direction encodes the personality of one
// homepage/site mockup. Pages render with these tokens — same components,
// different visual flavour.
//
// Tweaks panel can override `typography`, `density`, `hero` globally so
// you can compare a single dimension across all three directions.

const DIRECTIONS = {
  A: {
    key: "A",
    name: "Klasikinis katalogas",
    blurb:
      "Lytagra / Agropartsbaltija stiliaus pramoninis katalogas. Tankus, utilitarus, daug informacijos viršuje.",
    colors: {
      navy: "#0F2545",
      navy2: "#15315a",
      navyDeep: "#0a1a32",
      red: "#C8202E",
      redDark: "#a51823",
      yellow: "#F5C518",
      yellowDark: "#d4a800",
      blueAccent: "#1A56B5",
      ink: "#1a2438",
      mute: "#5b6577",
      line: "#dadfe7",
      lineSoft: "#ebeef2",
      bg: "#ffffff",
      bgAlt: "#f4f3ef",
      bgWarm: "#fbf6e3",
    },
    fonts: {
      head: '"Archivo", "Helvetica Neue", sans-serif',
      body: '"Manrope", "Helvetica Neue", sans-serif',
      mono: '"IBM Plex Mono", ui-monospace, monospace',
    },
    headStyle: { transform: "uppercase", weight: 800, tracking: "0.01em" },
    density: "comfortable",
    hero: "split",        // big product image right, copy left
    headerKind: "tall-red", // top utility + white logo bar + red main nav strip
    cardKind: "bordered",   // hard border, red accent
    buttonShape: "square",
  },

  B: {
    key: "B",
    name: "Specifikacijų katalogas",
    blurb:
      "Agropartsbaltija stiliaus duomenų katalogas. Šoninė kategorijų navigacija, sąrašinės kortelės, kompaktiška.",
    colors: {
      navy: "#14233a",
      navy2: "#1d3052",
      navyDeep: "#0d1a2e",
      red: "#B12731",
      redDark: "#8e1f28",
      yellow: "#EBB30E",
      yellowDark: "#c69708",
      blueAccent: "#1A56B5",
      ink: "#152033",
      mute: "#5a667a",
      line: "#d4d9e1",
      lineSoft: "#e8ebef",
      bg: "#f3f4f6",
      bgAlt: "#ffffff",
      bgWarm: "#f7efd1",
    },
    fonts: {
      head: '"Manrope", "Helvetica Neue", sans-serif',
      body: '"Manrope", "Helvetica Neue", sans-serif',
      mono: '"IBM Plex Mono", ui-monospace, monospace',
    },
    headStyle: { transform: "none", weight: 700, tracking: "-0.01em" },
    density: "compact",
    hero: "photo-overlay",   // photo bg, headline overlay
    headerKind: "compact",   // narrow util + wide white + light grey nav
    cardKind: "list",        // list-style row with specs
    buttonShape: "soft",
  },

  C: {
    key: "C",
    name: "Inžinerinis editorial",
    blurb:
      "Redakcinis stilius su didelėmis kondensuotomis antraštėmis ir oru. Stipri vizualinė hierarchija.",
    colors: {
      navy: "#1a2a44",
      navy2: "#22365a",
      navyDeep: "#0f1c33",
      red: "#A8201F",
      redDark: "#871918",
      yellow: "#E8B40A",
      yellowDark: "#b88c00",
      blueAccent: "#1A56B5",
      ink: "#10182a",
      mute: "#5e6878",
      line: "#dde1e8",
      lineSoft: "#eef1f5",
      bg: "#ffffff",
      bgAlt: "#f5f4f0",
      bgWarm: "#f4ecc6",
    },
    fonts: {
      head: '"Barlow Condensed", "Helvetica Neue", sans-serif',
      body: '"Manrope", "Helvetica Neue", sans-serif',
      mono: '"IBM Plex Mono", ui-monospace, monospace',
    },
    headStyle: { transform: "uppercase", weight: 600, tracking: "0.02em" },
    density: "comfortable",
    hero: "asymmetric",       // big condensed headline + stats + floating image
    headerKind: "minimal",    // single white bar with sparse links
    cardKind: "editorial",    // image-led, no border, big type
    buttonShape: "sharp",
  },
};

// Tweak overrides — return a NEW direction with overrides baked in.
function applyTweaks(dir, tweaks) {
  if (!tweaks) return dir;
  const d = { ...dir, fonts: { ...dir.fonts } };
  // Typography override (global across all 3 directions when set)
  if (tweaks.typography && tweaks.typography !== "default") {
    if (tweaks.typography === "archivo") {
      d.fonts.head = '"Archivo", "Helvetica Neue", sans-serif';
      d.fonts.body = '"Manrope", "Helvetica Neue", sans-serif';
      d.headStyle = { transform: "uppercase", weight: 800, tracking: "0.01em" };
    } else if (tweaks.typography === "barlow") {
      d.fonts.head = '"Barlow Condensed", "Helvetica Neue", sans-serif';
      d.fonts.body = '"Manrope", "Helvetica Neue", sans-serif';
      d.headStyle = { transform: "uppercase", weight: 600, tracking: "0.02em" };
    } else if (tweaks.typography === "manrope") {
      d.fonts.head = '"Manrope", "Helvetica Neue", sans-serif';
      d.fonts.body = '"Manrope", "Helvetica Neue", sans-serif';
      d.headStyle = { transform: "none", weight: 700, tracking: "-0.01em" };
    } else if (tweaks.typography === "plex") {
      d.fonts.head = '"IBM Plex Sans", "Helvetica Neue", sans-serif';
      d.fonts.body = '"IBM Plex Sans", "Helvetica Neue", sans-serif';
      d.headStyle = { transform: "none", weight: 600, tracking: "-0.005em" };
    }
  }
  if (tweaks.density && tweaks.density !== "default") d.density = tweaks.density;
  if (tweaks.hero && tweaks.hero !== "default") d.hero = tweaks.hero;
  return d;
}

// Per-direction density scale. The `s` (spacing) and `t` (type) helpers
// take direction and return a number scaled by density.
function dens(dir) {
  return dir.density === "compact" ? 0.85 : 1.0;
}

window.DIRECTIONS = DIRECTIONS;
window.applyTweaks = applyTweaks;
window.dens = dens;
