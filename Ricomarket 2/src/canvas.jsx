// Canvas — assembles all pages × all directions into a design_canvas.

const {
  DATA, DIRECTIONS, applyTweaks,
  HomePage, IndustriesPage, ProductListPage, ProductPage,
  ContactPage, ChemResistancePage, ConversionPage,
  TweaksPanel, useTweaks, TweakSection, TweakRadio, TweakSelect,
} = window;

const PAGE_W = 1440;

// Tweakable defaults — the host parses this block to persist.
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "typography": "default",
  "density": "default",
  "hero": "default"
}/*EDITMODE-END*/;

// Render the page tree for a given kind+direction. Wrapped here so the
// caller can drop the JSX as a DIRECT child of DCArtboard (DCSection
// iterates React.Children looking for DCArtboard markers — custom
// wrappers are ignored, so we can't return <DCArtboard> from a helper).
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

// Wrapper component that owns tweaks state and re-renders artboards
// when they change. Each artboard reads through window.__rikoDir which
// closes over the current tweaks via React state.
function CanvasRoot() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // Expose tweaked-direction lookup globally so every artboard can read it
  // without prop-drilling through the design canvas.
  window.__rikoDir = (key) => applyTweaks(DIRECTIONS[key], t);

  // Helper that renders three DCArtboards (A/B/C) for a given page kind. We
  // return an array so the DCArtboards become DIRECT children of DCSection.
  const threeBoards = (kind, height) => [
    <DCArtboard key="A" id={`${kind}-A`} label="A · Klasikinis katalogas" width={PAGE_W} height={height}>
      <div data-screen-label={`${kind}-A`} style={{ width: PAGE_W, minHeight: height, background: "#fff" }}>
        {pageFor(kind, window.__rikoDir("A"))}
      </div>
    </DCArtboard>,
    <DCArtboard key="B" id={`${kind}-B`} label="B · Specifikacijų katalogas" width={PAGE_W} height={height}>
      <div data-screen-label={`${kind}-B`} style={{ width: PAGE_W, minHeight: height, background: "#fff" }}>
        {pageFor(kind, window.__rikoDir("B"))}
      </div>
    </DCArtboard>,
    <DCArtboard key="C" id={`${kind}-C`} label="C · Inžinerinis editorial" width={PAGE_W} height={height}>
      <div data-screen-label={`${kind}-C`} style={{ width: PAGE_W, minHeight: height, background: "#fff" }}>
        {pageFor(kind, window.__rikoDir("C"))}
      </div>
    </DCArtboard>,
  ];

  return (
    <>
      <DesignCanvas>
        <DCSection
          id="intro"
          title="UAB Riko Market · Web design exploration"
          subtitle="Trys kryptys × septyni puslapiai. Visi puslapiai lietuvių kalba, pritaikyti vyresnio amžiaus B2B auditorijai (gamintojai). Tweaks panelėje galite keisti tipografiją, tankį ir hero stilių globaliai — visoms trim kryptim iškart."
        >
          <DCArtboard id="legend" label="Krypčių legenda" width={PAGE_W} height={420}>
            <DirectionLegend />
          </DCArtboard>
        </DCSection>

        <DCSection id="home" title="1 · Pagrindinis" subtitle="Banner · Pramonės šakos · Produktų pavyzdžiai · Kontaktai">
          {threeBoards("home", 3400)}
        </DCSection>

        <DCSection id="industries" title="2 · Pritaikymo sritys" subtitle="Aštuonios pramonės šakos su aprašymu ir susijusiais produktais">
          {threeBoards("industries", 4400)}
        </DCSection>

        <DCSection id="productList" title="3 · Produktų sąrašas" subtitle="Su kategorijų filtru kairėje. Spauskite skirtukus matyti kitą kategoriją">
          {threeBoards("productList", 2400)}
        </DCSection>

        <DCSection id="productPage" title="4 · Produkto puslapis" subtitle="Galerija, specifikacija, atsisiuntimai, susijusios prekės">
          {threeBoards("productPage", 2700)}
        </DCSection>

        <DCSection id="contact" title="5 · Kontaktai" subtitle="Kontaktinė informacija, žemėlapis ir užklausos forma">
          {threeBoards("contact", 1740)}
        </DCSection>

        <DCSection id="chemical" title="6 · Cheminio atsparumo lentelės" subtitle="Informacinė lentelė su paaiškinimu ir paieška">
          {threeBoards("chemical", 2080)}
        </DCSection>

        <DCSection id="units" title="7 · Matavimo vienetų konvertavimas" subtitle="Slėgio, ilgio, temperatūros ir srauto perskaičiavimo formulės">
          {threeBoards("units", 1820)}
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks · global">
        <TweakSection label="Tipografija">
          <TweakSelect
            label="Šriftų derinys"
            value={t.typography}
            onChange={(v) => setTweak("typography", v)}
            options={[
              { value: "default", label: "Kiekvienos krypties numatyt." },
              { value: "archivo", label: "Archivo + Manrope" },
              { value: "barlow",  label: "Barlow Cond. + Manrope" },
              { value: "manrope", label: "Manrope vienas" },
              { value: "plex",    label: "IBM Plex Sans" },
            ]}
          />
        </TweakSection>
        <TweakSection label="Tankis">
          <TweakRadio
            value={t.density}
            onChange={(v) => setTweak("density", v)}
            options={[
              { value: "default", label: "Auto" },
              { value: "comfortable", label: "Komfort." },
              { value: "compact", label: "Kompakt." },
            ]}
          />
        </TweakSection>
        <TweakSection label="Hero stilius">
          <TweakRadio
            value={t.hero}
            onChange={(v) => setTweak("hero", v)}
            options={[
              { value: "default", label: "Auto" },
              { value: "split", label: "Split" },
              { value: "photo-overlay", label: "Foto" },
              { value: "asymmetric", label: "Editor." },
            ]}
          />
        </TweakSection>
        <p style={{ margin: "10px 0 0", fontSize: 11, color: "rgba(0,0,0,0.45)", lineHeight: 1.4 }}>
          Pasirinkimai veikia visoms trim kryptim iškart, kad galėtumėte palyginti
          tą patį parametrą skirtinguose stiliuose. „Auto" — palieka kiekvienos
          krypties numatytuosius parametrus.
        </p>
      </TweaksPanel>
    </>
  );
}

// ── Direction legend card ───────────────────────────────────────────
function DirectionLegend() {
  return (
    <div style={{ padding: "32px 40px", height: "100%", background: "#fff", color: "#0f2545", fontFamily: '"Manrope", sans-serif', display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <div style={{ fontSize: 11, color: "#c8202e", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 700 }}>UAB Riko Market</div>
        <h1 style={{ margin: "8px 0 0", fontFamily: '"Archivo", sans-serif', fontWeight: 800, fontSize: 32, lineHeight: 1.0, letterSpacing: "-0.005em" }}>
          Lankstūs sprendimai – patikimas rezultatas.
        </h1>
        <p style={{ marginTop: 10, color: "#5b6577", fontSize: 13, maxWidth: 760, lineHeight: 1.5 }}>
          v2 atnaujinimas: įtraukta geltona prekės ženklo spalva iš naujo logotipo, naujas šūkis hero sekcijoje, apvalus brendo ženklas antraštėje ir poraidėje, antrinis geltonas / mėlynas ruožas. Trys originalios kryptys (A/B/C) išlaikytos — slinkite žemyn pamatyti kiekvieną puslapį visose trijose.
        </p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 18, flex: 1 }}>
        {Object.values(DIRECTIONS).map((d) => (
          <div key={d.key} style={{ border: `1px solid ${d.colors.line}`, padding: 18, position: "relative" }}>
            <div style={{ position: "absolute", top: 0, left: 0, background: d.colors.red, color: "#fff", padding: "4px 10px", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em" }}>KRYPTIS {d.key}</div>
            <div style={{ marginTop: 10, fontFamily: d.fonts.head, textTransform: d.headStyle.transform, letterSpacing: d.headStyle.tracking, fontWeight: d.headStyle.weight, fontSize: 22, color: d.colors.navy, lineHeight: 1.05 }}>
              {d.name}
            </div>
            <div style={{ marginTop: 8, fontSize: 12.5, color: d.colors.mute, lineHeight: 1.5 }}>{d.blurb}</div>
            <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", fontSize: 11.5 }}>
              <span style={{ color: d.colors.mute, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Header</span>
              <span style={{ color: d.colors.ink }}>{d.headerKind}</span>
              <span style={{ color: d.colors.mute, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Hero</span>
              <span style={{ color: d.colors.ink }}>{d.hero}</span>
              <span style={{ color: d.colors.mute, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Cards</span>
              <span style={{ color: d.colors.ink }}>{d.cardKind}</span>
              <span style={{ color: d.colors.mute, textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>Density</span>
              <span style={{ color: d.colors.ink }}>{d.density}</span>
            </div>
            <div style={{ marginTop: 14, display: "flex", gap: 6 }}>
              <span style={{ width: 28, height: 28, background: d.colors.navy, borderRadius: 2 }}></span>
              <span style={{ width: 28, height: 28, background: d.colors.red, borderRadius: 2 }}></span>
              <span style={{ width: 28, height: 28, background: d.colors.bgAlt, border: `1px solid ${d.colors.line}`, borderRadius: 2 }}></span>
              <span style={{ width: 28, height: 28, background: d.colors.bgWarm, border: `1px solid ${d.colors.line}`, borderRadius: 2 }}></span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<CanvasRoot />);
