// Industries page — listing of 8 industries with description + linked products.

const { DATA: __DI } = window;

function PageHero({ dir, eyebrow, title, sub, breadcrumb }) {
  const c = dir.colors;
  const isC = dir.key === "C";
  return (
    <section style={{ background: dir.key === "B" ? c.bgAlt : c.bgWarm, borderBottom: `1px solid ${c.line}` }}>
      <Container style={{ padding: isC ? "56px 40px 60px" : "44px 40px" }}>
        {breadcrumb && (
          <div style={{ fontSize: 12, color: c.mute, marginBottom: 16, display: "flex", gap: 8, alignItems: "center", letterSpacing: "0.04em" }}>
            {breadcrumb.map((b, i) => (
              <React.Fragment key={i}>
                {i > 0 && <span style={{ opacity: 0.5 }}>/</span>}
                <a className="rk-nav-link" style={{ color: i === breadcrumb.length - 1 ? c.ink : c.mute, fontWeight: i === breadcrumb.length - 1 ? 600 : 400 }}>{b}</a>
              </React.Fragment>
            ))}
          </div>
        )}
        <Eyebrow dir={dir}>{eyebrow}</Eyebrow>
        <h1 style={{ margin: "12px 0 0", fontFamily: dir.fonts.head, fontWeight: dir.headStyle.weight, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking, fontSize: isC ? 96 : 52, lineHeight: isC ? 0.92 : 1.05, color: c.navy, maxWidth: 1100 }}>
          {title}
        </h1>
        {sub && <p style={{ marginTop: 18, fontSize: 17, color: c.ink, maxWidth: 760, lineHeight: 1.55 }}>{sub}</p>}
      </Container>
    </section>
  );
}

function IndustriesPage({ dir }) {
  const c = dir.colors;
  return (
    <div className={`riko-page dir-${dir.key}`} style={{ fontFamily: dir.fonts.body }}>
      <Header dir={dir} current="industries" />
      <PageHero
        dir={dir}
        breadcrumb={["Pagrindinis", "Pritaikymo sritys"]}
        eyebrow="Pritaikymo sritys"
        title="Aštuonios pramonės šakos."
        sub="Tiekiame techninių žarnų asortimentą medienos apdirbimo, vėdinimo, žemės ūkio, chemijos, specialiosios technikos ir kitiems sektoriams."
      />

      {/* Detail rows */}
      <section style={{ padding: "60px 0", background: c.bg }}>
        <Container>
          {__DI.industries.map((ind, idx) => {
            const products = __DI.products.filter((p) => p.ind && p.ind.includes(ind.id)).slice(0, 3);
            const flip = idx % 2 === 1;
            return (
              <div key={ind.id} style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60, alignItems: "center", padding: "56px 0", borderBottom: idx === __DI.industries.length - 1 ? "none" : `1px solid ${c.line}` }}>
                <div style={{ order: flip ? 2 : 1 }}>
                  <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                    <div style={{ width: 56, height: 56, background: c.red, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Ic name={ind.id === "wood" ? "wood" : ind.id === "vent" ? "vent" : ind.id === "food" ? "food" : ind.id === "chem" ? "chem" : ind.id === "agri" ? "agri" : ind.id === "spec" ? "spec" : ind.id === "oil" ? "oil" : "exhaust"} size={28} color="#fff" />
                    </div>
                    <span style={{ fontSize: 12, color: c.mute, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>0{idx + 1} / 0{__DI.industries.length}</span>
                  </div>
                  <h3 style={{ margin: 0, fontFamily: dir.fonts.head, fontWeight: dir.headStyle.weight, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking, fontSize: dir.key === "C" ? 60 : 36, lineHeight: 1.0, color: c.navy }}>{ind.name}</h3>
                  <p style={{ marginTop: 16, fontSize: 16, lineHeight: 1.55, color: c.ink, maxWidth: 540 }}>{ind.desc} Tinkamos žarnos parinkimas priklauso nuo darbinės temperatūros, slėgio ir kontaktuojančių medžiagų.</p>
                  <div style={{ marginTop: 22, display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {["Aukšta temperatūra", "Abrazyvinė aplinka", "Lankstumas", "Antistatinis"].slice(0, 3 + (idx % 2)).map((tag, i) => (
                      <span key={i} style={{ fontSize: 11.5, padding: "5px 10px", border: `1px solid ${c.line}`, color: c.ink, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", background: c.bgAlt }}>{tag}</span>
                    ))}
                  </div>
                  <div style={{ marginTop: 26 }}>
                    <RkButton dir={dir} kind="primary">Žiūrėti tinkamas žarnas</RkButton>
                  </div>
                </div>
                <div style={{ order: flip ? 1 : 2, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <ImageSlot height={300} label={ind.name.toUpperCase()} bg={c.bgWarm} style={{ gridColumn: "1 / span 2" }} />
                  {products.slice(0, 2).map((p) => (
                    <div key={p.id} style={{ background: "#fff", border: `1px solid ${c.line}`, padding: 14 }}>
                      <div style={{ height: 80, background: c.bgWarm, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                        <HoseSvg color={p.color} w={130} h={70} />
                      </div>
                      <div style={{ fontSize: 12.5, fontWeight: 700, color: c.navy, lineHeight: 1.2, minHeight: 32 }}>{p.name}</div>
                      <div style={{ marginTop: 6, fontSize: 11, color: c.mute, fontVariantNumeric: "tabular-nums" }}>DN {p.dn} · {p.temp}</div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>

      <ContactBand dir={dir} />
      <Footer dir={dir} />
    </div>
  );
}

window.IndustriesPage = IndustriesPage;
window.PageHero = PageHero;
