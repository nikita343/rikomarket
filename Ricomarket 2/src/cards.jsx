// Cards: ProductCard, IndustryTile, CategoryCard — three visual variants
// driven by dir.cardKind and dir.key.

// ── Industry tile ───────────────────────────────────────────────────
function IndustryTile({ dir, industry, h = 180 }) {
  const c = dir.colors;
  // A: dense, photo bg dark, small icon, name top
  // B: list-row: small icon left, name + desc right
  // C: editorial: tall, photo, name in big condensed type bottom
  if (dir.cardKind === "list") {
    return (
      <a className="rk-tile" style={{ display: "flex", alignItems: "center", gap: 18, padding: "18px 20px", background: "#fff", border: `1px solid ${c.line}`, borderRadius: 4 }}>
        <div style={{ width: 56, height: 56, background: c.navy, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", flex: "0 0 56px" }}>
          <Ic name={industry.id === "wood" ? "wood" : industry.id === "vent" ? "vent" : industry.id === "food" ? "food" : industry.id === "chem" ? "chem" : industry.id === "agri" ? "agri" : industry.id === "spec" ? "spec" : industry.id === "oil" ? "oil" : "exhaust"} size={26} color="#fff" />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: 16, color: c.navy, marginBottom: 3 }}>{industry.name}</div>
          <div style={{ fontSize: 13, color: c.mute, lineHeight: 1.45 }}>{industry.desc}</div>
        </div>
        <Ic name="arrow" size={18} color={c.red} />
      </a>
    );
  }

  if (dir.cardKind === "editorial") {
    return (
      <a className="rk-tile" style={{ display: "block", height: h, position: "relative", overflow: "hidden", background: c.navy }}>
        <ImageSlot height="100%" label={industry.name.toUpperCase()} style={{ position: "absolute", inset: 0 }} bg={c.navy2} />
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 35%, ${c.navyDeep}f0 100%)` }} />
        <div style={{ position: "absolute", left: 22, top: 22 }}>
          <div style={{ width: 44, height: 44, background: c.red, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Ic name={industry.id === "wood" ? "wood" : industry.id === "vent" ? "vent" : industry.id === "food" ? "food" : industry.id === "chem" ? "chem" : industry.id === "agri" ? "agri" : industry.id === "spec" ? "spec" : industry.id === "oil" ? "oil" : "exhaust"} size={22} color="#fff" />
          </div>
        </div>
        <div style={{ position: "absolute", left: 22, right: 22, bottom: 18, color: "#fff" }}>
          <div style={{ fontFamily: dir.fonts.head, fontWeight: 600, fontSize: 30, lineHeight: 0.95, textTransform: "uppercase", letterSpacing: "0.01em" }}>{industry.name}</div>
          <div style={{ marginTop: 6, fontSize: 12, opacity: 0.85, display: "flex", alignItems: "center", gap: 6 }}>Žiūrėti produktus <Ic name="arrow" size={14} /></div>
        </div>
      </a>
    );
  }

  // Default A: dense bordered tile
  return (
    <a className="rk-tile" style={{ display: "block", height: h, position: "relative", overflow: "hidden", background: c.navy, border: `1px solid ${c.line}` }}>
      <ImageSlot height="100%" label={industry.name.toUpperCase()} style={{ position: "absolute", inset: 0 }} bg={c.navy2} />
      <div style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, ${c.navyDeep}30 0%, ${c.navyDeep}d0 90%)` }} />
      <div style={{ position: "absolute", left: 16, top: 14, width: 36, height: 36, background: c.red, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Ic name={industry.id === "wood" ? "wood" : industry.id === "vent" ? "vent" : industry.id === "food" ? "food" : industry.id === "chem" ? "chem" : industry.id === "agri" ? "agri" : industry.id === "spec" ? "spec" : industry.id === "oil" ? "oil" : "exhaust"} size={18} color="#fff" />
      </div>
      <div style={{ position: "absolute", left: 16, right: 16, bottom: 14, color: "#fff" }}>
        <div style={{ fontFamily: dir.fonts.head, fontWeight: 800, fontSize: 17, lineHeight: 1.1, textTransform: "uppercase", letterSpacing: "0.01em" }}>{industry.name}</div>
        <div style={{ marginTop: 4, fontSize: 11.5, opacity: 0.85 }}>{industry.desc.slice(0, 60)}…</div>
      </div>
    </a>
  );
}

// ── Product card — three variants ───────────────────────────────────
function ProductCard({ dir, product, h = 320 }) {
  const c = dir.colors;
  const hoseColor = product.color || "navy";

  if (dir.cardKind === "list") {
    // Direction B: list-style row, info-dense
    return (
      <a className="rk-card-list" style={{ display: "grid", gridTemplateColumns: "120px 1fr 200px auto", gap: 20, padding: "14px 16px", background: "#fff", border: `1px solid ${c.line}`, borderRadius: 4, alignItems: "center" }}>
        <div style={{ width: 120, height: 84, background: c.bgWarm, display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${c.lineSoft}`, borderRadius: 2 }}>
          <HoseSvg color={hoseColor} w={104} h={68} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 11, color: c.mute, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 4 }}>
            {__D.categories.find((x) => x.id === product.cat)?.name}
          </div>
          <div style={{ fontWeight: 700, fontSize: 15.5, color: c.navy, lineHeight: 1.25 }}>{product.name}</div>
          <div style={{ marginTop: 6, fontSize: 12.5, color: c.mute }}>{product.note}</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 4, fontSize: 12 }}>
          <span style={{ color: c.mute }}>DN</span><span style={{ color: c.ink, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{product.dn}</span>
          <span style={{ color: c.mute }}>°C</span><span style={{ color: c.ink, fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{product.temp}</span>
          <span style={{ color: c.mute }}>Slėgis</span><span style={{ color: c.ink, fontWeight: 600 }}>{product.press}</span>
        </div>
        <Ic name="arrow" size={20} color={c.red} />
      </a>
    );
  }

  if (dir.cardKind === "editorial") {
    // Direction C: image-led, no border, big type
    return (
      <a className="rk-card-editorial" style={{ display: "block", background: "#fff" }}>
        <div style={{ height: 220, background: c.bgAlt, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
          <div className="rk-card-img" style={{ transition: "transform .25s", display: "flex" }}>
            <HoseSvg color={hoseColor} w={240} h={150} />
          </div>
        </div>
        <div style={{ padding: "18px 4px 8px" }}>
          <div style={{ fontSize: 11, color: c.red, textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700, marginBottom: 8 }}>
            {__D.categories.find((x) => x.id === product.cat)?.name}
          </div>
          <div style={{ fontFamily: dir.fonts.head, fontWeight: 600, fontSize: 22, lineHeight: 1.05, textTransform: "uppercase", color: c.navy, letterSpacing: "0.01em", minHeight: 60 }}>
            {product.name}
          </div>
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${c.line}`, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, fontSize: 11, color: c.mute }}>
            <div><div style={{ fontWeight: 700, color: c.ink, fontSize: 13, marginBottom: 2 }}>{product.dn}</div>DN</div>
            <div><div style={{ fontWeight: 700, color: c.ink, fontSize: 13, marginBottom: 2 }}>{product.temp.split("…")[1] || product.temp}</div>Temp.</div>
            <div><div style={{ fontWeight: 700, color: c.ink, fontSize: 13, marginBottom: 2 }}>{product.press}</div>Slėgis</div>
          </div>
        </div>
      </a>
    );
  }

  // Default A: bordered, dense, red accent
  return (
    <a className="rk-card-bordered" style={{ display: "block", background: "#fff", border: `1px solid ${c.line}`, position: "relative" }}>
      <div style={{ position: "relative", height: 180, background: c.bgWarm, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <HoseSvg color={hoseColor} w={180} h={120} />
        <span style={{ position: "absolute", top: 10, left: 10, background: c.red, color: "#fff", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "4px 8px" }}>
          {product.sub}
        </span>
      </div>
      <div style={{ padding: "14px 16px" }}>
        <div style={{ fontWeight: 800, fontSize: 14.5, lineHeight: 1.2, color: c.navy, minHeight: 50, fontFamily: dir.fonts.head, textTransform: "uppercase", letterSpacing: "0.005em" }}>
          {product.name}
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.lineSoft}`, display: "grid", gridTemplateColumns: "auto 1fr", gap: "5px 12px", fontSize: 12 }}>
          <span style={{ color: c.mute }}>DN</span><span style={{ color: c.ink, fontWeight: 600, textAlign: "right" }}>{product.dn}</span>
          <span style={{ color: c.mute }}>Temperatūra</span><span style={{ color: c.ink, fontWeight: 600, textAlign: "right" }}>{product.temp}</span>
          <span style={{ color: c.mute }}>Slėgis</span><span style={{ color: c.ink, fontWeight: 600, textAlign: "right" }}>{product.press}</span>
        </div>
        <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 11, color: c.mute, textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>Sandėlyje</span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: c.red }}>Daugiau <Ic name="arrow" size={14}/></span>
        </div>
      </div>
    </a>
  );
}

// ── Category card (homepage product categories) ─────────────────────
function CategoryCard({ dir, cat, h = 280 }) {
  const c = dir.colors;
  const hoseColor = cat.id === "pur" ? "red" : cat.id === "metal" || cat.id === "fittings" ? "silver" : "navy";

  if (dir.cardKind === "list") {
    return (
      <a className="rk-card-list" style={{ display: "block", background: "#fff", border: `1px solid ${c.line}`, padding: 18, borderRadius: 4 }}>
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          <div style={{ flex: "0 0 100px", height: 70, background: c.bgWarm, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <HoseSvg color={hoseColor} w={90} h={58} />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 16, color: c.navy }}>{cat.name}</div>
            <div style={{ fontSize: 12.5, color: c.mute, marginTop: 4, lineHeight: 1.4 }}>{cat.desc}</div>
          </div>
          <span style={{ fontSize: 12, color: c.red, fontWeight: 700 }}>{cat.count}+</span>
        </div>
        <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.lineSoft}`, display: "flex", flexWrap: "wrap", gap: 6 }}>
          {cat.sub.map((s, i) => (
            <span key={i} style={{ fontSize: 11, color: c.mute, padding: "3px 8px", background: c.bgWarm, borderRadius: 2 }}>{s}</span>
          ))}
        </div>
      </a>
    );
  }

  if (dir.cardKind === "editorial") {
    return (
      <a className="rk-card-editorial" style={{ display: "block", background: c.bgAlt, height: h, position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <HoseSvg color={hoseColor} w={300} h={200} />
        </div>
        <div style={{ position: "absolute", left: 24, top: 24, right: 24 }}>
          <div style={{ fontSize: 12, fontFamily: dir.fonts.body, color: c.red, letterSpacing: "0.14em", fontWeight: 700, textTransform: "uppercase" }}>0{__D.categories.indexOf(cat) + 1}</div>
        </div>
        <div style={{ position: "absolute", left: 24, right: 24, bottom: 24 }}>
          <div style={{ fontFamily: dir.fonts.head, fontWeight: 600, fontSize: 36, lineHeight: 0.95, textTransform: "uppercase", color: c.navy, letterSpacing: "0.005em" }}>{cat.name}</div>
          <div style={{ marginTop: 10, fontSize: 12.5, color: c.mute, maxWidth: 240 }}>{cat.desc}</div>
          <div style={{ marginTop: 14, display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12.5, fontWeight: 700, color: c.navy }}>{cat.count}+ pozicijos <Ic name="arrow" size={14}/></div>
        </div>
      </a>
    );
  }

  // Default A
  return (
    <a className="rk-card-bordered" style={{ display: "block", background: "#fff", border: `1px solid ${c.line}`, position: "relative" }}>
      <div style={{ position: "relative", height: 160, background: c.bgWarm, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <HoseSvg color={hoseColor} w={210} h={140} />
        <span style={{ position: "absolute", top: 0, left: 0, background: c.red, color: "#fff", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", padding: "5px 10px" }}>{cat.count}+ pozicijos</span>
      </div>
      <div style={{ padding: "16px 18px 18px" }}>
        <div style={{ fontFamily: dir.fonts.head, fontWeight: 800, fontSize: 17, color: c.navy, textTransform: "uppercase", letterSpacing: "0.005em" }}>{cat.name}</div>
        <div style={{ marginTop: 6, fontSize: 12.5, color: c.mute, lineHeight: 1.45, minHeight: 36 }}>{cat.desc}</div>
        <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
          {cat.sub.map((s, i) => (
            <span key={i} style={{ fontSize: 10.5, color: c.ink, padding: "3px 8px", background: c.bgWarm, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s}</span>
          ))}
        </div>
      </div>
    </a>
  );
}

window.IndustryTile = IndustryTile;
window.ProductCard = ProductCard;
window.CategoryCard = CategoryCard;
