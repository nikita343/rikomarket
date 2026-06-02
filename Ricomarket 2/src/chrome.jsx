// Header (3 variants) + Footer (3 variants) keyed on dir.headerKind.

const { DATA: __D } = window;

// ── Header A: NEW VERSION — bold navy bar, logo left, contact pill right ──────────────────────────
function HeaderA({ dir, current = "home" }) {
  const c = dir.colors;
  return (
    <header style={{ background: "#fff", position: "relative" }}>
      {/* Top contact strip */}
      <div style={{ background: c.navy, color: "#fff" }}>
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 40, padding: "0 40px", fontSize: 13 }}>
          <div style={{ display: "flex", gap: 24, alignItems: "center", color: "rgba(255,255,255,0.85)" }}>
            <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <Ic name="phone" size={14} color={c.yellow} /> {__D.company.phone}
            </span>
            <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <Ic name="mail" size={14} color={c.yellow} /> {__D.company.email}
            </span>
            <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              <Ic name="pin" size={14} color={c.yellow} /> {__D.company.address}
            </span>
          </div>
          <div style={{ display: "flex", gap: 14, alignItems: "center", fontSize: 12 }}>
            <span style={{ fontWeight: 700 }}>LT</span>
            <span style={{ opacity: 0.4 }}>·</span>
            <a className="rk-nav-link" style={{ opacity: 0.65 }}>EN</a>
            <a className="rk-nav-link" style={{ opacity: 0.65 }}>RU</a>
          </div>
        </Container>
      </div>
      {/* Main bar */}
      <Container style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", padding: "18px 40px", gap: 40 }}>
        <Logo dir={dir} />
        <nav style={{ display: "flex", gap: 28, alignItems: "center", justifyContent: "center" }}>
          {__D.nav.map((n, i) => (
            <a key={i} className="rk-nav-link" style={{
              fontFamily: dir.fonts.head,
              fontSize: 14.5,
              fontWeight: 600,
              color: i === 0 ? c.red : c.navy,
              letterSpacing: "0.005em",
              padding: "8px 0",
              position: "relative",
            }}>
              {n.label}
              {i === 0 && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: c.red }} />}
            </a>
          ))}
        </nav>
        <RkButton dir={dir} kind="primary" icon={false}>Užklausa</RkButton>
      </Container>
      {/* Brand color rule */}
      <div style={{ display: "flex", height: 4 }}>
        <span style={{ flex: 4, background: c.navy }} />
        <span style={{ flex: 1, background: c.yellow }} />
        <span style={{ flex: 1, background: c.blueAccent || "#1A56B5" }} />
        <span style={{ flex: 1, background: c.red }} />
      </div>
    </header>
  );
}

// ── Header B: single row · nav center, contact right ──────────────────
function HeaderB({ dir, current = "home" }) {
  const c = dir.colors;
  const curHref = "#" + current;
  return (
    <header style={{ background: "#fff", borderBottom: `1px solid ${c.line}` }}>
      <Container style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "center", padding: "22px 40px", gap: 32 }}>
        <Logo dir={dir} />
        <nav style={{ display: "flex", gap: 28, alignItems: "center", justifyContent: "center" }}>
          {__D.nav.map((n, i) => {
            const active = n.href === curHref;
            return (
              <a key={i} href={n.href} className="rk-nav-link" style={{
                fontSize: 15.5,
                fontWeight: active ? 700 : 600,
                color: active ? c.red : c.ink,
                position: "relative",
                padding: "6px 0",
              }}>
                {n.label}
                {active && <span style={{ position: "absolute", bottom: -2, left: 0, right: 0, height: 3, background: c.red }} />}
              </a>
            );
          })}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <a href="#contact" style={{ display: "inline-flex", gap: 8, alignItems: "center", fontWeight: 700, fontSize: 16, color: c.navy, whiteSpace: "nowrap" }}>
            <Ic name="phone" size={15} color={c.red} /> {__D.company.phone}
          </a>
          <RkButton dir={dir} kind="primary" icon={false}>Užklausa</RkButton>
        </div>
      </Container>
    </header>
  );
}

// ── Header C: minimal editorial ─────────────────────────────────────
function HeaderC({ dir, current = "home" }) {
  const c = dir.colors;
  return (
    <header style={{ background: "#fff", borderBottom: `1px solid ${c.lineSoft}` }}>
      <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 40px", gap: 40 }}>
        <Logo dir={dir} />
        <nav style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {__D.nav.map((n, i) => (
            <a
              key={i}
              className="rk-nav-link"
              style={{
                fontFamily: dir.fonts.head,
                textTransform: dir.headStyle.transform,
                letterSpacing: dir.headStyle.tracking,
                fontSize: 15,
                fontWeight: 500,
                color: c.ink,
              }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <a style={{ display: "inline-flex", gap: 8, alignItems: "center", fontFamily: dir.fonts.head, fontSize: 18, fontWeight: 600, color: c.navy, letterSpacing: dir.headStyle.tracking }}>
            <Ic name="phone" size={16} /> {__D.company.phone}
          </a>
          <button className="rk-btn shape-sharp" style={{ border: `1.5px solid ${c.ink}`, color: c.ink, padding: "10px 18px", fontSize: 12.5, fontWeight: 600, letterSpacing: "0.06em" }}>
            UŽKLAUSA
          </button>
        </div>
      </Container>
    </header>
  );
}

function Header({ dir, current }) {
  if (dir.headerKind === "tall-red") return <HeaderA dir={dir} current={current} />;
  if (dir.headerKind === "compact") return <HeaderB dir={dir} current={current} />;
  return <HeaderC dir={dir} current={current} />;
}

// ── Footer ──────────────────────────────────────────────────────────
function Footer({ dir }) {
  const c = dir.colors;
  // Direction A: bold dark navy footer with red accent bar
  // Direction B: tighter, lighter footer
  // Direction C: editorial white footer with thin rule
  const isC = dir.key === "C";
  const fg = isC ? c.ink : "#fff";
  const sub = isC ? c.mute : "rgba(255,255,255,0.65)";
  const bg = isC ? c.bg : c.navyDeep;
  return (
    <footer style={{ background: bg, color: fg, borderTop: isC ? `1px solid ${c.line}` : "none" }}>
      {!isC && (
        <div style={{ display: "flex", height: 6 }}>
          <span style={{ flex: 2, background: c.yellow }} />
          <span style={{ flex: 3, background: c.blueAccent || c.navy2 }} />
          <span style={{ flex: 2, background: c.red }} />
        </div>
      )}
      <Container style={{ padding: "56px 40px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1.2fr", gap: 56 }}>
          {/* Column 1 — brand */}
          <div>
            <Logo dir={dir} dark={!isC} />
            <p style={{ marginTop: 18, color: sub, fontSize: 13.5, lineHeight: 1.55, maxWidth: 320 }}>
              {__D.company.descShort}
            </p>
            <div style={{ marginTop: 14, fontSize: 12, color: sub, fontWeight: 500 }}>
              {__D.company.foundedNote}
            </div>
          </div>
          {/* Column 2 — categories */}
          <div>
            <div style={{ fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18, color: fg }}>
              Produktai
            </div>
            {__D.categories.map((cat) => (
              <a key={cat.id} className="rk-nav-link" style={{ display: "block", padding: "5px 0", fontSize: 14, color: sub }}>
                {cat.name}
              </a>
            ))}
          </div>
          {/* Column 3 — industries */}
          <div>
            <div style={{ fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18, color: fg }}>
              Pritaikymas
            </div>
            {__D.industries.slice(0, 7).map((ind) => (
              <a key={ind.id} className="rk-nav-link" style={{ display: "block", padding: "5px 0", fontSize: 14, color: sub }}>
                {ind.name}
              </a>
            ))}
          </div>
          {/* Column 4 — contact */}
          <div>
            <div style={{ fontFamily: dir.fonts.head, fontWeight: 700, fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 18, color: fg }}>
              Kontaktai
            </div>
            <div style={{ display: "grid", gap: 12, color: sub, fontSize: 14 }}>
              <div style={{ display: "flex", gap: 10 }}><Ic name="pin" size={16} color={isC ? c.red : "rgba(255,255,255,0.85)"}/><span>{__D.company.address}</span></div>
              <div style={{ display: "flex", gap: 10 }}><Ic name="phone" size={16} color={isC ? c.red : "rgba(255,255,255,0.85)"}/><span style={{ color: fg, fontWeight: 600 }}>{__D.company.phone}</span></div>
              <div style={{ display: "flex", gap: 10 }}><Ic name="mail" size={16} color={isC ? c.red : "rgba(255,255,255,0.85)"}/><span>{__D.company.email}</span></div>
              <div style={{ display: "flex", gap: 10 }}><Ic name="clock" size={16} color={isC ? c.red : "rgba(255,255,255,0.85)"}/><span>{__D.company.hours}</span></div>
            </div>
            <div style={{ marginTop: 22 }}>
              <RkButton dir={dir} kind={isC ? "outline" : "primary"}>Susisiekti</RkButton>
            </div>
          </div>
        </div>
        <div style={{ marginTop: 48, paddingTop: 22, borderTop: `1px solid ${isC ? c.line : "rgba(255,255,255,0.12)"}`, display: "flex", justifyContent: "space-between", color: sub, fontSize: 12.5 }}>
          <span>{__D.company.legalLine}</span>
          <span style={{ display: "flex", gap: 18 }}>
            <a className="rk-nav-link">Privatumo politika</a>
            <a className="rk-nav-link">Naudojimosi sąlygos</a>
          </span>
        </div>
      </Container>
    </footer>
  );
}

window.Header = Header;
window.Footer = Footer;
