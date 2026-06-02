// Print-mode root — renders every direction × page stacked vertically with
// page breaks. Replaces the interactive canvas for PDF export.

const {
  DATA, DIRECTIONS, applyTweaks,
  HomePage, IndustriesPage, ProductListPage, ProductPage,
  ContactPage, ChemResistancePage, ConversionPage,
} = window;

const PAGES = [
  { kind: "home",        label: "Pagrindinis" },
  { kind: "industries",  label: "Pritaikymo sritys" },
  { kind: "productList", label: "Produktų sąrašas" },
  { kind: "productPage", label: "Produkto puslapis" },
  { kind: "contact",     label: "Kontaktai" },
  { kind: "chemical",    label: "Cheminis atsparumas" },
  { kind: "units",       label: "Matavimo vienetai" },
];

const DIR_KEYS = ["B"];

function pageFor(kind, dir) {
  switch (kind) {
    case "home":        return <HomePage           dir={dir} />;
    case "industries":  return <IndustriesPage     dir={dir} />;
    case "productList": return <ProductListPage    dir={dir} />;
    case "productPage": return <ProductPage        dir={dir} />;
    case "contact":     return <ContactPage        dir={dir} />;
    case "chemical":    return <ChemResistancePage dir={dir} />;
    case "units":       return <ConversionPage     dir={dir} />;
    default: return null;
  }
}

function PrintRoot() {
  const sheets = [];
  // Cover
  sheets.push(
    <section key="cover" className="print-sheet print-cover">
      <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.22em", color: "#c8202e", textTransform: "uppercase" }}>UAB RIKO-MARKET</div>
      <h1 style={{ margin: "16px 0 0", fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: 48, lineHeight: 1.0, letterSpacing: "-0.01em", color: "#0F2545" }}>
        Lankstūs sprendimai –<br/><span style={{ color: "#c8202e" }}>patikimas</span> rezultatas
      </h1>
      <p style={{ marginTop: 22, fontSize: 15, lineHeight: 1.55, color: "#5b6577", maxWidth: 720 }}>
        Web design exploration · Kryptis B — Specifikacijų katalogas. Septyni puslapiai, lietuvių kalba, B2B gamintojų auditorijai.
      </p>
      <div style={{ marginTop: 60 }}>
        {(() => {
          const d = DIRECTIONS["B"];
          return (
            <div style={{ border: `1px solid ${d.colors.line}`, padding: 24, maxWidth: 520 }}>
              <div style={{ display: "inline-block", background: d.colors.red, color: "#fff", padding: "4px 10px", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em" }}>KRYPTIS B</div>
              <div style={{ marginTop: 12, fontFamily: d.fonts.head, fontWeight: 700, fontSize: 22, color: d.colors.navy }}>{d.name}</div>
              <div style={{ marginTop: 8, fontSize: 13, color: d.colors.mute, lineHeight: 1.5 }}>{d.blurb}</div>
              <div style={{ marginTop: 14, display: "flex", gap: 6 }}>
                <span style={{ width: 28, height: 28, background: d.colors.navy }} />
                <span style={{ width: 28, height: 28, background: d.colors.red }} />
                <span style={{ width: 28, height: 28, background: d.colors.yellow }} />
                <span style={{ width: 28, height: 28, background: d.colors.bgAlt, border: `1px solid ${d.colors.line}` }} />
              </div>
            </div>
          );
        })()}
      </div>
      <div style={{ marginTop: "auto", paddingTop: 40, fontSize: 11, color: "#5b6577", letterSpacing: "0.08em", textTransform: "uppercase" }}>
        © 2026 UAB Riko Market · Įm. kodas 307642804
      </div>
    </section>
  );

  // For each page kind, render 3 directions on their own sheets
  PAGES.forEach((p) => {
    DIR_KEYS.forEach((k) => {
      const dir = DIRECTIONS[k];
      sheets.push(
        <section key={`${p.kind}-${k}`} className="print-sheet">
          <div className="print-sheet-header">
            <span className="print-page-label">{p.label}</span>
            <span className="print-dir-label" style={{ background: dir.colors.red }}>KRYPTIS {k} · {dir.name}</span>
          </div>
          <div className="print-page-frame">
            {pageFor(p.kind, dir)}
          </div>
        </section>
      );
    });
  });

  return <div className="print-root">{sheets}</div>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PrintRoot />);

// Auto print after fonts + layout ready
(async () => {
  try { await document.fonts.ready; } catch (e) {}
  await new Promise((r) => setTimeout(r, 800));
  window.print();
})();
