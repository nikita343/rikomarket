// Product list page + Product detail page.

const { DATA: __DP } = window;

// ── Product list ────────────────────────────────────────────────────
function ProductListPage({ dir }) {
  const c = dir.colors;
  const [activeCat, setActiveCat] = React.useState(__DP.categories[0].id);
  const products = __DP.products.filter((p) => p.cat === activeCat);

  return (
    <div className={`riko-page dir-${dir.key}`} style={{ fontFamily: dir.fonts.body }}>
      <Header dir={dir} current="products" />
      <PageHero
        dir={dir}
        breadcrumb={["Pagrindinis", "Produktai", __DP.categories.find((x) => x.id === activeCat)?.name]}
        eyebrow="Produktai"
        title="Visas asortimentas."
        sub="Filtruokite pagal kategoriją kairėje. Diametrai 10–1200 mm, temperatūros nuo −150 iki +1100 °C."
      />

      <section style={{ padding: "40px 0 80px", background: c.bg }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 36 }}>
            {/* Sidebar */}
            <aside>
              <div style={{ background: dir.key === "B" ? "#fff" : c.bgAlt, border: `1px solid ${c.line}` }}>
                <div style={{ background: c.navy, color: "#fff", padding: "14px 18px", fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Kategorijos
                </div>
                <div>
                  {__DP.categories.map((cat) => {
                    const active = cat.id === activeCat;
                    return (
                      <div key={cat.id}>
                        <button
                          onClick={() => setActiveCat(cat.id)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "13px 18px",
                            background: active ? c.bgWarm : "transparent",
                            borderTop: `1px solid ${c.lineSoft}`,
                            color: active ? c.red : c.navy,
                            fontWeight: active ? 700 : 600,
                            fontSize: 14,
                            cursor: "pointer",
                          }}
                        >
                          <span>{cat.name}</span>
                          <span style={{ fontSize: 12, color: c.mute, fontWeight: 600 }}>{cat.count}</span>
                        </button>
                        {active && (
                          <div style={{ background: c.bgWarm, padding: "0 18px 12px" }}>
                            {cat.sub.map((s, i) => (
                              <label key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, padding: "6px 0", color: c.ink }}>
                                <input type="checkbox" style={{ accentColor: c.red }} defaultChecked={i === 0} />
                                {s}
                              </label>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Filter blocks */}
              {[
                { label: "Vidinis diametras", items: ["10–50 mm", "50–150 mm", "150–500 mm", "500+ mm"] },
                { label: "Darbinė temperatūra", items: ["Iki +90 °C", "Iki +260 °C", "Iki +650 °C", "Iki +1100 °C"] },
                { label: "Armatūra", items: ["Metalo spiralė", "PVC spiralė", "Be spiralės"] },
              ].map((f, i) => (
                <div key={i} style={{ marginTop: 18, background: dir.key === "B" ? "#fff" : c.bgAlt, border: `1px solid ${c.line}`, padding: "14px 18px" }}>
                  <div style={{ fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: c.navy, marginBottom: 10 }}>{f.label}</div>
                  {f.items.map((it, j) => (
                    <label key={j} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 13, padding: "5px 0", color: c.ink }}>
                      <input type="checkbox" style={{ accentColor: c.red }} />
                      {it}
                    </label>
                  ))}
                </div>
              ))}
            </aside>

            {/* Results */}
            <div>
              {/* Toolbar */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 18px", background: "#fff", border: `1px solid ${c.line}`, marginBottom: 18 }}>
                <div style={{ fontSize: 13.5, color: c.ink }}>
                  Rasta <strong style={{ color: c.navy }}>{products.length}</strong> pozicijų · <span style={{ color: c.mute }}>kategorija „{__DP.categories.find((x) => x.id === activeCat)?.name}"</span>
                </div>
                <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                  <span style={{ fontSize: 12, color: c.mute, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Rūšiavimas</span>
                  <select style={{ border: `1px solid ${c.line}`, padding: "8px 12px", fontSize: 13, background: "#fff", color: c.ink, fontFamily: dir.fonts.body, fontWeight: 600 }}>
                    <option>Pagal pavadinimą</option>
                    <option>Pagal diametrą</option>
                    <option>Pagal temperatūrą</option>
                  </select>
                  <div style={{ display: "flex", border: `1px solid ${c.line}` }}>
                    <button style={{ padding: 8, background: c.bgWarm, color: c.navy, borderRight: `1px solid ${c.line}` }}><Ic name="filter" size={14}/></button>
                    <button style={{ padding: 8, background: "#fff", color: c.mute }}><Ic name="search" size={14}/></button>
                  </div>
                </div>
              </div>

              {/* Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: dir.cardKind === "list" ? "1fr" : (dir.cardKind === "editorial" ? "1fr 1fr 1fr" : "1fr 1fr 1fr"),
                gap: dir.density === "compact" ? 12 : 18
              }}>
                {products.map((p) => <ProductCard key={p.id} dir={dir} product={p} />)}
              </div>

              {/* Pagination */}
              <div style={{ marginTop: 36, display: "flex", justifyContent: "center", gap: 8 }}>
                {["‹", "1", "2", "3", "›"].map((p, i) => (
                  <button key={i} style={{
                    width: 40, height: 40,
                    border: `1px solid ${c.line}`,
                    background: i === 1 ? c.navy : "#fff",
                    color: i === 1 ? "#fff" : c.ink,
                    fontWeight: 700, fontSize: 13,
                  }}>{p}</button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer dir={dir} />
    </div>
  );
}

// ── Product detail page ─────────────────────────────────────────────
function ProductPage({ dir }) {
  const c = dir.colors;
  const product = __DP.products.find((p) => p.id === "pvc-a1");
  return (
    <div className={`riko-page dir-${dir.key}`} style={{ fontFamily: dir.fonts.body }}>
      <Header dir={dir} current="products" />

      <section style={{ background: c.bgAlt, borderBottom: `1px solid ${c.line}` }}>
        <Container style={{ padding: "20px 40px" }}>
          <div style={{ fontSize: 12.5, color: c.mute, display: "flex", gap: 8, alignItems: "center" }}>
            <a className="rk-nav-link">Pagrindinis</a><span style={{ opacity: 0.5 }}>/</span>
            <a className="rk-nav-link">Produktai</a><span style={{ opacity: 0.5 }}>/</span>
            <a className="rk-nav-link">PVC žarnos</a><span style={{ opacity: 0.5 }}>/</span>
            <a className="rk-nav-link">Su metalo spirale</a><span style={{ opacity: 0.5 }}>/</span>
            <strong style={{ color: c.navy }}>{product.name}</strong>
          </div>
        </Container>
      </section>

      <section style={{ padding: "44px 0", background: c.bg }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1.05fr 1fr", gap: 56 }}>
            {/* Gallery */}
            <div>
              <div style={{ background: c.bgWarm, border: `1px solid ${c.line}`, height: 460, display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <HoseSvg color="navy" w={460} h={310} />
                <div style={{ position: "absolute", top: 18, left: 18, background: c.red, color: "#fff", fontSize: 11, fontWeight: 700, padding: "5px 10px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Sandėlyje</div>
                <div style={{ position: "absolute", top: 18, right: 18, background: "#fff", border: `1px solid ${c.line}`, padding: "5px 10px", fontSize: 11, fontWeight: 700, color: c.navy, letterSpacing: "0.06em", textTransform: "uppercase" }}>Tipas A1</div>
              </div>
              <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 8 }}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} style={{ height: 80, background: c.bgWarm, border: `${i === 0 ? 2 : 1}px solid ${i === 0 ? c.red : c.line}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <HoseSvg color={i === 1 ? "red" : i === 2 ? "silver" : i === 3 ? "blue" : "navy"} w={80} h={50} />
                  </div>
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <Eyebrow dir={dir}>PVC žarnos · Su metalo spirale</Eyebrow>
              <h1 style={{ margin: "12px 0 0", fontFamily: dir.fonts.head, fontWeight: dir.headStyle.weight, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking, fontSize: dir.key === "C" ? 56 : 36, lineHeight: 1.05, color: c.navy }}>{product.name}</h1>
              <p style={{ marginTop: 16, fontSize: 15.5, lineHeight: 1.6, color: c.ink, maxWidth: 540 }}>
                Lengvos konstrukcijos polivinilchlorido žarna su metalo spirale.
                Skirta drožlių, dulkių, granulių ir lengvų cheminių garų ištraukimui.
                Tinka baldų gamybai, CNC staklėms ir lengvai vėdinimo sistemai.
              </p>

              {/* Key chips */}
              <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {[
                  { l: "DN", v: "50–500 mm" },
                  { l: "Temp.", v: "−10…+80 °C" },
                  { l: "Slėgis", v: "0,3 bar" },
                  { l: "Lenkimas", v: "1,0 × DN" },
                  { l: "Ilgis", v: "10 / 20 m" },
                  { l: "Sertifikatai", v: "REACH, RoHS" },
                ].map((s, i) => (
                  <div key={i} style={{ padding: "12px 14px", background: c.bgAlt, border: `1px solid ${c.line}` }}>
                    <div style={{ fontSize: 11, color: c.mute, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>{s.l}</div>
                    <div style={{ marginTop: 4, fontWeight: 800, fontSize: 14, color: c.navy, fontVariantNumeric: "tabular-nums" }}>{s.v}</div>
                  </div>
                ))}
              </div>

              {/* Industries */}
              <div style={{ marginTop: 22 }}>
                <div style={{ fontSize: 11, color: c.mute, textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 700, marginBottom: 10 }}>Pritaikymo sritys</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {["Medienos apdirbimas", "CNC staklės", "Vėdinimo sistemos", "Pelletų gamyba"].map((t, i) => (
                    <a key={i} className="rk-nav-link" style={{ fontSize: 12.5, padding: "6px 12px", background: "#fff", border: `1px solid ${c.line}`, color: c.navy, fontWeight: 600 }}>{t}</a>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div style={{ marginTop: 28, padding: 22, background: c.navy, color: "#fff" }}>
                <div style={{ fontFamily: dir.fonts.head, fontSize: 16, fontWeight: 700, marginBottom: 6, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking }}>Reikia individualios konfigūracijos?</div>
                <div style={{ fontSize: 13.5, opacity: 0.85, marginBottom: 16 }}>Susisiekite su mūsų inžinieriumi — gausite parinkimo rekomendacijas ir kainą.</div>
                <div style={{ display: "flex", gap: 12 }}>
                  <RkButton dir={dir} kind="primary"><Ic name="phone" size={14}/> Skambinti</RkButton>
                  <RkButton dir={dir} kind="outlineLight" icon={false}><Ic name="mail" size={14}/> El. paštas</RkButton>
                  <RkButton dir={dir} kind="outlineLight" icon={false}><Ic name="doc" size={14}/> PDF</RkButton>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Tabbed details */}
      <section style={{ padding: "30px 0 60px", background: c.bg, borderTop: `1px solid ${c.line}` }}>
        <Container>
          <div style={{ display: "flex", gap: 0, borderBottom: `2px solid ${c.line}`, marginBottom: 28 }}>
            {["Specifikacija", "Aprašymas", "Atsisiuntimai", "Cheminis atsparumas"].map((t, i) => (
              <button key={i} className="rk-tab" style={{
                padding: "14px 22px",
                fontFamily: dir.fonts.head,
                fontWeight: 700,
                fontSize: 13.5,
                textTransform: dir.headStyle.transform,
                letterSpacing: dir.headStyle.tracking,
                borderBottom: i === 0 ? `2px solid ${c.red}` : "2px solid transparent",
                marginBottom: -2,
                color: i === 0 ? c.navy : c.mute,
              }}>{t}</button>
            ))}
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 40 }}>
            <table className="rk-spec-table" style={{ background: "#fff", border: `1px solid ${c.line}` }}>
              <thead>
                <tr style={{ background: c.navy, color: "#fff" }}>
                  <th style={{ fontFamily: dir.fonts.head, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 12 }}>Parametras</th>
                  <th style={{ fontFamily: dir.fonts.head, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 12 }}>Reikšmė</th>
                </tr>
              </thead>
              <tbody>
                {__DP.specRows.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : c.bgWarm, borderTop: `1px solid ${c.line}` }}>
                    <td style={{ color: c.mute, fontWeight: 500, fontSize: 13.5 }}>{r.k}</td>
                    <td style={{ color: c.ink, fontWeight: 700, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>{r.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div>
              <div style={{ background: "#fff", border: `1px solid ${c.line}`, padding: 18 }}>
                <div style={{ fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 13, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking, color: c.navy, marginBottom: 14 }}>Atsisiuntimai</div>
                {[
                  { name: "Techninis lapas (PDF)", size: "320 KB" },
                  { name: "Specifikacijos lentelė", size: "180 KB" },
                  { name: "Cheminio atsparumo lentelė", size: "640 KB" },
                  { name: "REACH sertifikatas", size: "240 KB" },
                ].map((d, i) => (
                  <a key={i} className="rk-nav-link" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderTop: i === 0 ? "none" : `1px solid ${c.lineSoft}`, fontSize: 13, color: c.ink }}>
                    <span style={{ display: "flex", gap: 10, alignItems: "center" }}><Ic name="doc" size={16} color={c.red}/> {d.name}</span>
                    <span style={{ color: c.mute, fontSize: 11.5 }}>{d.size}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Related */}
      <section style={{ padding: "60px 0", background: c.bgAlt, borderTop: `1px solid ${c.line}` }}>
        <Container>
          <SectionHead dir={dir} eyebrow="Panašios pozicijos" title="Susijusios prekės" />
          <div style={{ display: "grid", gridTemplateColumns: dir.cardKind === "list" ? "1fr 1fr" : "repeat(4, 1fr)", gap: 18 }}>
            {__DP.products.filter((p) => p.cat === "pvc" && p.id !== "pvc-a1").slice(0, 4).map((p) => <ProductCard key={p.id} dir={dir} product={p}/>)}
          </div>
        </Container>
      </section>

      <Footer dir={dir} />
    </div>
  );
}

window.ProductListPage = ProductListPage;
window.ProductPage = ProductPage;
