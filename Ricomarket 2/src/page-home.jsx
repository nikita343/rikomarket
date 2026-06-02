// Homepage — three hero variants + USPs + industries + categories +
// products tabs + trust strip.

const { DATA: __DH } = window;

// ── Hero variants ───────────────────────────────────────────────────
function HeroSplit({ dir }) {
  // NEW VERSION — bold cream hero, big H1 slogan, large hose image top-right
  const c = dir.colors;
  return (
    <section style={{ background: c.bgWarm, position: "relative", overflow: "hidden", minHeight: 600 }}>
      {/* Yellow corner block — anchored top right behind image */}
      <div style={{ position: "absolute", top: 0, right: 0, width: "42%", height: 380, background: c.yellow, zIndex: 1 }} />
      {/* Navy bottom strip across width */}
      <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 12, background: c.navy }} />

      {/* Large hose image — TOP RIGHT, dominant */}
      <img
        src="assets/hero-hoses.png"
        alt="Pramoninės techninės žarnos"
        style={{
          position: "absolute",
          top: -20,
          right: -20,
          width: "58%",
          maxWidth: 940,
          height: "auto",
          objectFit: "contain",
          objectPosition: "top right",
          zIndex: 2,
          pointerEvents: "none",
          filter: "drop-shadow(0 20px 30px rgba(15,37,69,0.18))",
        }}
      />

      <Container style={{ position: "relative", zIndex: 3, padding: "84px 40px 110px" }}>
        <div style={{ maxWidth: 640 }}>
          <div style={{
            display: "inline-block",
            fontFamily: dir.fonts.head,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.22em",
            color: c.navy,
            textTransform: "uppercase",
            padding: "8px 14px",
            background: "#fff",
            borderLeft: `4px solid ${c.red}`,
          }}>
            UAB RIKO-MARKET
          </div>
          <h1 style={{
            margin: "26px 0 0",
            fontFamily: dir.fonts.head,
            fontWeight: 800,
            fontSize: 72,
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            color: c.navy,
          }}>
            Lankstūs sprendimai –<br/>
            <span style={{ color: c.red }}>patikimas</span> rezultatas
          </h1>
          <p style={{ marginTop: 26, fontSize: 18, lineHeight: 1.55, color: c.ink, maxWidth: 500 }}>
            Techninės žarnos ir Camlock jungtys. Diametrai 10–1200 mm,
            temperatūra −150 °C … +1100 °C.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
            <RkButton dir={dir} kind="primary" size="lg">Katalogas</RkButton>
            <RkButton dir={dir} kind="outline" size="lg" icon={false}>Konsultacija</RkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroPhotoOverlay({ dir }) {
  // NEW VERSION (Direction B) — navy block on left holds the title, hose image
  // overlaps from the right behind a yellow vertical accent.
  const c = dir.colors;
  return (
    <section style={{ position: "relative", background: "#fff", overflow: "hidden", minHeight: 620 }}>
      {/* Navy block on the left holding the title */}
      <div style={{
        position: "absolute",
        left: 0,
        top: 40,
        bottom: 40,
        width: "62%",
        background: c.navy,
        zIndex: 1,
      }} />
      {/* Yellow vertical accent bar */}
      <div style={{
        position: "absolute",
        left: "62%",
        top: 40,
        bottom: 40,
        width: 12,
        background: c.yellow,
        zIndex: 2,
      }} />

      {/* Large hose image — anchored TOP RIGHT, partially overlapping navy block */}
      <img
        src="assets/hero-hoses.png"
        alt="Pramoninės techninės žarnos"
        style={{
          position: "absolute",
          top: 30,
          right: 0,
          width: "55%",
          maxWidth: 860,
          height: "auto",
          objectFit: "contain",
          objectPosition: "top right",
          zIndex: 3,
          pointerEvents: "none",
          filter: "drop-shadow(0 30px 50px rgba(0,0,0,0.4))",
        }}
      />

      <Container style={{ position: "relative", zIndex: 4, padding: "100px 40px 120px" }}>
        <div style={{ maxWidth: 600, color: "#fff" }}>
          <div style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontFamily: dir.fonts.head,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.22em",
            color: c.yellow,
            textTransform: "uppercase",
            marginBottom: 22,
          }}>
            <span style={{ width: 28, height: 2, background: c.yellow }} />
            UAB RIKO-MARKET
          </div>
          <h1 style={{
            margin: 0,
            fontFamily: dir.fonts.head,
            fontWeight: 800,
            fontSize: 68,
            lineHeight: 1.0,
            letterSpacing: "-0.02em",
          }}>
            Lankstūs sprendimai –<br/>
            <span style={{ color: c.yellow }}>patikimas</span> rezultatas
          </h1>
          <p style={{ marginTop: 24, fontSize: 17, lineHeight: 1.55, opacity: 0.85, maxWidth: 480 }}>
            Techninės žarnos ir Camlock jungtys. Sandėlys Vilniuje.
          </p>
          <div style={{ marginTop: 32, display: "flex", gap: 12 }}>
            <RkButton dir={dir} kind="primary" size="lg">Katalogas</RkButton>
            <RkButton dir={dir} kind="outlineLight" size="lg" icon={false}>Konsultacija</RkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

function HeroAsymmetric({ dir }) {
  // Direction C default: editorial asymmetric, large hose image anchored top-right
  const c = dir.colors;
  return (
    <section style={{ background: c.bg, position: "relative", overflow: "hidden", minHeight: 620 }}>
      {/* Large hose image — anchored TOP RIGHT */}
      <img
        src="assets/hero-hoses.png"
        alt="Pramoninės techninės žarnos"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "55%",
          maxWidth: 860,
          height: "auto",
          objectFit: "contain",
          objectPosition: "top right",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      <Container style={{ padding: "56px 40px 80px", position: "relative", zIndex: 3 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: dir.fonts.head, fontSize: 14, fontWeight: 700, letterSpacing: "0.2em", color: c.red, textTransform: "uppercase", marginBottom: 20 }}>
              UAB RIKO-MARKET
            </div>
            <h1 style={{ margin: 0, fontFamily: dir.fonts.head, fontWeight: 600, fontSize: 96, lineHeight: 0.88, textTransform: "uppercase", letterSpacing: "-0.01em", color: c.navy }}>
              Lankstūs<br/>sprendimai –<br/><span style={{ color: c.yellow, WebkitTextStroke: `1px ${c.navy}` }}>patikimas</span><br/>rezultatas.
            </h1>
            <p style={{ marginTop: 28, fontSize: 17, lineHeight: 1.55, color: c.ink, maxWidth: 460 }}>
              Techninės žarnos ir Camlock jungtys. Diametrai 10–1200 mm,
              temperatūra −150 °C … +1100 °C.
            </p>
            <div style={{ marginTop: 24, display: "flex", gap: 12 }}>
              <RkButton dir={dir} kind="primaryDark">Katalogas</RkButton>
              <RkButton dir={dir} kind="outline" icon={false}>Konsultacija</RkButton>
            </div>
          </div>
          <div />
        </div>
        {/* Stats strip */}
        <div style={{ marginTop: 50, paddingTop: 32, borderTop: `1px solid ${c.line}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {[
            { n: "70+", l: "Produktų pozicijų" },
            { n: "08", l: "Pramonės šakų" },
            { n: "10–1200 mm", l: "Diametrų diapazonas" },
            { n: "−150 … +1100 °C", l: "Temperatūros" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: dir.fonts.head, fontWeight: 600, fontSize: 38, color: c.navy, lineHeight: 1, textTransform: "uppercase", letterSpacing: "0.005em" }}>{s.n}</div>
              <div style={{ marginTop: 6, fontSize: 12, color: c.mute, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 600 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function Hero({ dir }) {
  if (dir.hero === "split") return <HeroSplit dir={dir} />;
  if (dir.hero === "photo-overlay") return <HeroPhotoOverlay dir={dir} />;
  return <HeroAsymmetric dir={dir} />;
}

// ── USP strip ───────────────────────────────────────────────────────
function USPStrip({ dir }) {
  const c = dir.colors;
  const isC = dir.key === "C";
  return (
    <section style={{ background: isC ? c.bg : c.navy, color: isC ? c.ink : "#fff", borderTop: isC ? `1px solid ${c.line}` : "none", borderBottom: isC ? `1px solid ${c.line}` : "none" }}>
      <Container style={{ padding: isC ? "44px 40px" : "28px 40px", display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
        {__DH.usps.map((u, i) => (
          <div key={i} style={{ display: "flex", gap: 20, alignItems: isC ? "flex-start" : "center", position: "relative" }}>
            {isC ? (
              <div style={{ fontFamily: dir.fonts.head, fontSize: 38, fontWeight: 600, color: c.red, lineHeight: 0.9, letterSpacing: "0.01em" }}>0{i + 1}</div>
            ) : (
              <div style={{ width: 48, height: 48, background: c.red, display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 48px" }}>
                <Ic name={u.icon} size={24} color="#fff" />
              </div>
            )}
            <div>
              <div style={{ fontFamily: dir.fonts.head, fontWeight: isC ? 600 : 800, fontSize: isC ? 20 : 14.5, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking, color: isC ? c.navy : "#fff" }}>{u.title}</div>
              <div style={{ marginTop: 6, fontSize: 13, opacity: isC ? 1 : 0.78, color: isC ? c.mute : "#fff", lineHeight: 1.45 }}>{u.desc}</div>
            </div>
            {!isC && i < __DH.usps.length - 1 && <div style={{ position: "absolute", right: -20, top: 8, bottom: 8, width: 1, background: "rgba(255,255,255,0.15)" }} />}
          </div>
        ))}
      </Container>
    </section>
  );
}

// ── Industries section (homepage) ───────────────────────────────────
function IndustriesSection({ dir, all = false }) {
  const c = dir.colors;
  const list = all ? __DH.industries : __DH.industries;
  const cols = dir.cardKind === "list" ? 2 : 4;
  return (
    <section style={{ background: c.bg, padding: "80px 0" }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <SectionHead dir={dir} eyebrow="Pritaikymo sritys" title="Pramonės šakos" sub="Pagrindiniai segmentai, kuriems tiekiame žarnas ir jungtis." />
          <a className="rk-nav-link" style={{ fontWeight: 700, color: c.red, fontSize: 13.5, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Visos sritys <Ic name="arrow" size={14} /></a>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap: dir.density === "compact" ? 12 : 18 }}>
          {list.map((ind) => (
            <IndustryTile key={ind.id} dir={dir} industry={ind} h={dir.cardKind === "editorial" ? 240 : 200} />
          ))}
        </div>
      </Container>
    </section>
  );
}

// ── Product categories tabbed section ───────────────────────────────
function CategoriesSection({ dir }) {
  const c = dir.colors;
  const [activeCat, setActiveCat] = React.useState(__DH.categories[0].id);
  const products = __DH.products.filter((p) => p.cat === activeCat).slice(0, 4);
  return (
    <section style={{ background: c.bgAlt, padding: "80px 0", borderTop: `1px solid ${c.line}`, borderBottom: `1px solid ${c.line}` }}>
      <Container>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 28 }}>
          <SectionHead dir={dir} eyebrow="Produktai" title="Produktų kategorijos" sub="Šešios pagrindinės kategorijos." />
        </div>
        {/* Tab strip */}
        <div style={{ display: "flex", borderBottom: `2px solid ${c.line}`, marginBottom: 28, overflowX: "auto" }}>
          {__DH.categories.map((cat) => {
            const active = cat.id === activeCat;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className="rk-tab"
                style={{
                  padding: "16px 24px",
                  borderBottom: active ? `2px solid ${c.red}` : "2px solid transparent",
                  marginBottom: -2,
                  fontFamily: dir.fonts.head,
                  fontWeight: 700,
                  fontSize: 14,
                  textTransform: dir.headStyle.transform,
                  letterSpacing: dir.headStyle.tracking,
                  color: active ? c.navy : c.mute,
                  background: active ? "#fff" : "transparent",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                {cat.name}
                <span style={{ fontSize: 11, opacity: 0.7, padding: "2px 6px", background: c.bgWarm, borderRadius: 3 }}>{cat.count}</span>
              </button>
            );
          })}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: dir.cardKind === "list" ? "1fr 1fr" : "repeat(4, 1fr)", gap: 18 }}>
          {products.map((p) => <ProductCard key={p.id} dir={dir} product={p} />)}
        </div>
        <div style={{ marginTop: 32, textAlign: "center" }}>
          <RkButton dir={dir} kind={dir.key === "C" ? "outline" : "primaryDark"} size="lg">Visi „{__DH.categories.find(c => c.id === activeCat).name}" produktai</RkButton>
        </div>
      </Container>
    </section>
  );
}

// ── Trust strip / Contact CTA band ──────────────────────────────────
function ContactBand({ dir }) {
  const c = dir.colors;
  return (
    <section style={{ background: c.navy, color: "#fff" }}>
      <Container style={{ padding: "60px 40px", display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 60, alignItems: "center" }}>
        <div>
          <Eyebrow dir={dir} color={c.red}>Kontaktai</Eyebrow>
          <h2 style={{ margin: "12px 0 0", fontFamily: dir.fonts.head, fontWeight: dir.headStyle.weight, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking, fontSize: dir.key === "C" ? 56 : 40, lineHeight: 1.05 }}>
            Nežinote, kurią žarną pasirinkti?
          </h2>
          <p style={{ marginTop: 16, fontSize: 16, opacity: 0.85, maxWidth: 540 }}>
            Mūsų inžinieriai padės parinkti žarną pagal Jūsų darbinę aplinką: temperatūrą, slėgį, chemikalus ir mechaninius reikalavimus.
          </p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.18)", padding: 32 }}>
          <div style={{ display: "grid", gap: 18, fontSize: 15 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Ic name="phone" size={20} color={c.red} />
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Telefonas</div>
                <div style={{ fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 22 }}>{__DH.company.phone}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Ic name="mail" size={20} color={c.red} />
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>El. paštas</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{__DH.company.email}</div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <Ic name="clock" size={20} color={c.red} />
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>Darbo laikas</div>
                <div style={{ fontWeight: 700, fontSize: 16 }}>{__DH.company.hours}</div>
              </div>
            </div>
          </div>
          <div style={{ marginTop: 24 }}>
            <RkButton dir={dir} kind="primary" size="lg" style={{ width: "100%", justifyContent: "center" }}>Parašyti užklausą</RkButton>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ── Full home page composition ──────────────────────────────────────
function HomePage({ dir }) {
  return (
    <div className={`riko-page dir-${dir.key}`} style={{ fontFamily: dir.fonts.body }}>
      <Header dir={dir} current="home" />
      <Hero dir={dir} />
      <USPStrip dir={dir} />
      <IndustriesSection dir={dir} />
      <CategoriesSection dir={dir} />
      <ContactBand dir={dir} />
      <Footer dir={dir} />
    </div>
  );
}

window.HomePage = HomePage;
window.Hero = Hero;
window.USPStrip = USPStrip;
window.IndustriesSection = IndustriesSection;
window.CategoriesSection = CategoriesSection;
window.ContactBand = ContactBand;
