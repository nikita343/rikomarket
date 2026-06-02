// Contact page + Chemical Resistance Table + Unit Conversion Table

const { DATA: __DU } = window;

// ── Contact page ────────────────────────────────────────────────────
function ContactPage({ dir }) {
  const c = dir.colors;
  return (
    <div className={`riko-page dir-${dir.key}`} style={{ fontFamily: dir.fonts.body }}>
      <Header dir={dir} current="contact" />
      <PageHero
        dir={dir}
        breadcrumb={["Pagrindinis", "Kontaktai"]}
        eyebrow="Kontaktai"
        title="Susisiekite su mumis."
        sub="Mūsų inžinieriai padės parinkti žarną, paskaičiuoti kiekį ir suderinti pristatymą."
      />

      <section style={{ padding: "60px 0", background: c.bg }}>
        <Container>
          <div style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 60 }}>
            {/* Contact details */}
            <div>
              <div style={{ background: "#fff", border: `1px solid ${c.line}`, padding: 32 }}>
                <h3 style={{ margin: 0, fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 22, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking, color: c.navy }}>
                  UAB „Riko Market"
                </h3>
                <div style={{ marginTop: 4, fontSize: 13, color: c.mute }}>Lietuvos įmonės kodas 305XXXXXX</div>

                <div style={{ marginTop: 26, display: "grid", gap: 22 }}>
                  {[
                    { ic: "pin", label: "Adresas", value: "Vilnius, Lietuva", sub: "Detalų adresą atsiųsime atsakydami į užklausą" },
                    { ic: "phone", label: "Telefonas", value: __DU.company.phone, sub: "I–V / 9:00–18:00" },
                    { ic: "mail", label: "El. paštas", value: __DU.company.email, sub: "Atsakome per 1 d.d." },
                    { ic: "clock", label: "Darbo laikas", value: __DU.company.hours, sub: "Šeštadieniais — pagal susitarimą" },
                  ].map((r, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, paddingBottom: 22, borderBottom: i === 3 ? "none" : `1px solid ${c.lineSoft}` }}>
                      <div style={{ width: 44, height: 44, background: c.red, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 44px" }}>
                        <Ic name={r.ic} size={22} color="#fff" />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: c.mute, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700 }}>{r.label}</div>
                        <div style={{ fontFamily: dir.fonts.head, fontSize: 22, fontWeight: 700, color: c.navy, marginTop: 4 }}>{r.value}</div>
                        <div style={{ fontSize: 13, color: c.mute, marginTop: 4 }}>{r.sub}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 22, background: c.navy, color: "#fff", padding: 26 }}>
                <div style={{ fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 16, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking }}>Įmonės istorija</div>
                <p style={{ marginTop: 10, fontSize: 14, lineHeight: 1.55, opacity: 0.85 }}>{__DU.company.descLong}</p>
              </div>
            </div>

            {/* Map placeholder + quick contact */}
            <div>
              <div style={{ background: c.bgAlt, border: `1px solid ${c.line}`, height: 360, position: "relative", overflow: "hidden" }}>
                <ImageSlot height="100%" label="ŽEMĖLAPIS · VILNIUS" style={{ position: "absolute", inset: 0 }} bg={c.bgWarm} />
                {/* Pin overlay */}
                <div style={{ position: "absolute", left: "55%", top: "45%", transform: "translate(-50%, -100%)" }}>
                  <div style={{ width: 44, height: 44, background: c.red, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 10px rgba(0,0,0,0.2)", clipPath: "polygon(50% 0%, 100% 0%, 100% 70%, 60% 70%, 50% 100%, 40% 70%, 0% 70%, 0% 0%)", paddingTop: 6 }}>
                    <Ic name="pin" size={20} color="#fff" />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: 22, background: "#fff", border: `1px solid ${c.line}` }}>
                <div style={{ background: c.navy, color: "#fff", padding: "14px 20px", fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 13.5, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking }}>
                  Greita užklausa
                </div>
                <div style={{ padding: 22 }}>
                  <p style={{ margin: "0 0 18px", fontSize: 13.5, color: c.mute, lineHeight: 1.5 }}>
                    Aprašykite, kokio tipo žarnos ar Camlock jungties Jums reikia — kiekis, diametras, darbinė temperatūra.
                  </p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                    {["Vardas", "Įmonė", "Telefonas", "El. paštas"].map((lbl, i) => (
                      <label key={i} style={{ fontSize: 11.5, color: c.mute, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>
                        {lbl}
                        <input style={{ display: "block", marginTop: 6, width: "100%", padding: "10px 12px", border: `1px solid ${c.line}`, fontSize: 13.5, color: c.ink, background: c.bg, font: "inherit" }} readOnly />
                      </label>
                    ))}
                  </div>
                  <label style={{ fontSize: 11.5, color: c.mute, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700, display: "block", marginTop: 12 }}>
                    Užklausos turinys
                    <textarea readOnly rows={4} style={{ display: "block", marginTop: 6, width: "100%", padding: "10px 12px", border: `1px solid ${c.line}`, fontSize: 13.5, color: c.ink, background: c.bg, font: "inherit", resize: "none" }} />
                  </label>
                  <div style={{ marginTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, color: c.mute }}>Spausdami sutinkate su privatumo politika.</span>
                    <RkButton dir={dir} kind="primary">Siųsti užklausą</RkButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Footer dir={dir} />
    </div>
  );
}

// ── Chemical Resistance Table ───────────────────────────────────────
function ChemResistancePage({ dir }) {
  const c = dir.colors;
  const cols = ["PVC", "PUR", "PTFE", "NBR", "EPDM"];
  return (
    <div className={`riko-page dir-${dir.key}`} style={{ fontFamily: dir.fonts.body }}>
      <Header dir={dir} current="chemical" />
      <PageHero
        dir={dir}
        breadcrumb={["Pagrindinis", "Cheminio atsparumo lentelės"]}
        eyebrow="Informacinė lentelė"
        title="Cheminio atsparumo lentelės."
        sub="Pagrindinių žarnų medžiagų atsparumas dažniausiai naudojamiems chemikalams. Rekomenduojame pasitarti su mūsų inžinieriais dėl konkretaus pritaikymo."
      />

      <section style={{ padding: "50px 0 60px", background: c.bg }}>
        <Container>
          {/* Legend */}
          <div style={{ display: "flex", gap: 20, alignItems: "center", marginBottom: 20, padding: 16, background: c.bgAlt, border: `1px solid ${c.line}` }}>
            <span style={{ fontSize: 11, color: c.mute, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 700 }}>Paaiškinimas</span>
            {__DU.chemKey.map((k, i) => (
              <span key={i} style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}>
                <span style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 26, height: 26,
                  background: k.sym === "✓" ? "#2a8c4a" : k.sym === "○" ? "#d8a020" : "#c8202e",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 13,
                }}>{k.sym}</span>
                {k.label}
              </span>
            ))}
            <span style={{ marginLeft: "auto", fontSize: 12, color: c.mute }}>Duomenys atnaujinti: 2026 / 05</span>
          </div>

          {/* Search + filter */}
          <div style={{ display: "flex", gap: 14, marginBottom: 18 }}>
            <div style={{ flex: 1, display: "flex", border: `1px solid ${c.line}`, background: "#fff" }}>
              <span style={{ padding: "0 14px", display: "flex", alignItems: "center" }}><Ic name="search" size={16} color={c.mute}/></span>
              <input placeholder="Ieškoti chemikalo (lt arba en pavadinimas)…" style={{ flex: 1, border: "none", outline: "none", padding: "12px 0", fontSize: 14, color: c.ink, background: "transparent", font: "inherit" }} readOnly />
            </div>
            <select style={{ border: `1px solid ${c.line}`, padding: "12px 16px", fontSize: 13.5, background: "#fff", color: c.ink, fontFamily: dir.fonts.body, fontWeight: 600 }}>
              <option>Temperatūra: visos</option>
              <option>+20 °C</option>
              <option>+60 °C</option>
            </select>
            <RkButton dir={dir} kind="outline" icon={false}><Ic name="doc" size={14}/> Atsisiųsti PDF</RkButton>
          </div>

          {/* Table */}
          <div style={{ background: "#fff", border: `1px solid ${c.line}`, overflow: "hidden" }}>
            <table className="rk-spec-table" style={{ width: "100%" }}>
              <thead>
                <tr style={{ background: c.navy, color: "#fff" }}>
                  <th style={{ textAlign: "left", fontFamily: dir.fonts.head, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 12, width: "35%" }}>Chemikalas</th>
                  {cols.map((col) => (
                    <th key={col} style={{ textAlign: "center", fontFamily: dir.fonts.head, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 12 }}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {__DU.chemRows.map((r, i) => (
                  <tr key={i} style={{ background: i % 2 === 0 ? "#fff" : c.bgWarm, borderTop: `1px solid ${c.line}` }}>
                    <td style={{ color: c.navy, fontWeight: 600, fontSize: 14 }}>{r.name}</td>
                    {[r.pvc, r.pur, r.ptfe, r.nbr, r.epdm].map((sym, j) => (
                      <td key={j} style={{ textAlign: "center" }}>
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 30, height: 30,
                          background: sym === "✓" ? "#2a8c4a" : sym === "○" ? "#d8a020" : "#c8202e",
                          color: "#fff",
                          fontWeight: 800,
                          fontSize: 14,
                        }}>{sym}</span>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p style={{ marginTop: 18, fontSize: 12.5, color: c.mute, lineHeight: 1.55, maxWidth: 900 }}>
            * Lentelė pateikiama informaciniais tikslais. Konkrečios darbo sąlygos (temperatūra, koncentracija, kontakto trukmė) gali smarkiai pakeisti rezultatą. Dėl detalių rekomendacijų kreipkitės į mūsų techninį skyrių.
          </p>
        </Container>
      </section>

      <Footer dir={dir} />
    </div>
  );
}

// ── Conversion Table ────────────────────────────────────────────────
function ConversionPage({ dir }) {
  const c = dir.colors;
  const blocks = [
    { title: "Slėgis", icon: "spool", rows: __DU.convPressure },
    { title: "Ilgis", icon: "filter", rows: __DU.convLength },
    { title: "Temperatūra", icon: "clock", rows: __DU.convTemp },
    { title: "Srauto greitis", icon: "tag", rows: __DU.convFlow },
  ];
  return (
    <div className={`riko-page dir-${dir.key}`} style={{ fontFamily: dir.fonts.body }}>
      <Header dir={dir} current="units" />
      <PageHero
        dir={dir}
        breadcrumb={["Pagrindinis", "Matavimo vienetų konvertavimas"]}
        eyebrow="Informacinė lentelė"
        title="Matavimo vienetų konvertavimas."
        sub="Slėgio, ilgio, temperatūros ir srauto perskaičiavimo formulės. Naudokite parinkdami tinkamą produkto specifikaciją."
      />

      <section style={{ padding: "50px 0 60px", background: c.bg }}>
        <Container>
          {/* Quick converter mock */}
          <div style={{ background: c.navy, color: "#fff", padding: 26, marginBottom: 30 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr auto 1fr auto auto", gap: 14, alignItems: "end" }}>
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Įveskite reikšmę</div>
                <input style={{ width: "100%", padding: "14px 16px", fontSize: 22, fontFamily: dir.fonts.head, fontWeight: 700, color: "#fff", background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", outline: "none" }} defaultValue="1,5" readOnly />
              </div>
              <select style={{ padding: "14px 16px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", fontSize: 14, fontWeight: 700 }}>
                <option>bar</option>
                <option>psi</option>
                <option>kPa</option>
              </select>
              <div>
                <div style={{ fontSize: 11, opacity: 0.7, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 6 }}>Rezultatas</div>
                <input style={{ width: "100%", padding: "14px 16px", fontSize: 22, fontFamily: dir.fonts.head, fontWeight: 700, color: c.red, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", outline: "none" }} defaultValue="21,7556" readOnly />
              </div>
              <select style={{ padding: "14px 16px", background: "rgba(255,255,255,0.08)", color: "#fff", border: "1px solid rgba(255,255,255,0.18)", fontSize: 14, fontWeight: 700 }}>
                <option>psi</option>
                <option>kPa</option>
                <option>bar</option>
              </select>
              <RkButton dir={dir} kind="primary" size="lg">Konvertuoti</RkButton>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22 }}>
            {blocks.map((b, i) => (
              <div key={i} style={{ background: "#fff", border: `1px solid ${c.line}` }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center", padding: "16px 22px", background: c.bgAlt, borderBottom: `1px solid ${c.line}` }}>
                  <div style={{ width: 36, height: 36, background: c.red, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Ic name={b.icon} size={18} color="#fff"/>
                  </div>
                  <h3 style={{ margin: 0, fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 18, textTransform: dir.headStyle.transform, letterSpacing: dir.headStyle.tracking, color: c.navy }}>{b.title}</h3>
                </div>
                <table className="rk-spec-table" style={{ width: "100%" }}>
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} style={{ borderTop: j === 0 ? "none" : `1px solid ${c.lineSoft}` }}>
                        <td style={{ color: c.navy, fontWeight: 700, fontSize: 14, width: "40%", fontVariantNumeric: "tabular-nums" }}>{r[0]}</td>
                        <td style={{ color: c.ink, fontSize: 14, fontVariantNumeric: "tabular-nums" }}>{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Footer dir={dir} />
    </div>
  );
}

window.ContactPage = ContactPage;
window.ChemResistancePage = ChemResistancePage;
window.ConversionPage = ConversionPage;
