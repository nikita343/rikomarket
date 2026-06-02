// Shared atoms: Logo, HoseSvg, Header, Footer, USPStrip, Button, ImageSlot,
// SectionHead, Eyebrow. Each accepts `dir` (direction config) so a single
// component renders three different visual flavors.

const { DATA: _D, DIRECTIONS: _DIR } = window;

// ── Logo ────────────────────────────────────────────────────────────
function Logo({ dir, dark, size = 1 }) {
  // Renders the official brand logo (round badge) — the file the client sent.
  // No surrounding wordmark text; the logo is self-contained.
  const badge = 64 * size;
  return (
    <a href="#home" style={{ display: "inline-flex", alignItems: "center" }}>
      <img
        src="assets/logo-v2.jpg"
        alt="UAB Riko Market"
        width={badge}
        height={badge}
        style={{
          display: "block",
          width: badge,
          height: badge,
          objectFit: "cover",
          borderRadius: "50%",
          background: "#fff",
          boxShadow: dark ? "0 0 0 2px rgba(255,255,255,0.18)" : "none",
        }}
      />
    </a>
  );
}

// ── Image slot ──────────────────────────────────────────────────────
function ImageSlot({ width = "100%", height = 200, label = "PRODUKTAS", bg, style = {} }) {
  return (
    <div
      className="rk-img-slot"
      style={{ width, height, "--bg": bg || "#e9ebef", ...style }}
      aria-label="image placeholder"
    >
      <span className="rk-img-label">{label}</span>
    </div>
  );
}

// ── Stylized hose SVG drawn in brand colors ─────────────────────────
// Helical-looking arc — three nested arcs with rib ticks for the spiral.
function HoseSvg({ color = "navy", w = 220, h = 140, style = {} }) {
  const palette = {
    navy: { body: "#1a3358", hi: "#2d4a78", lo: "#0c1a32" },
    red:  { body: "#c8202e", hi: "#e0394a", lo: "#8a121b" },
    silver:{body: "#9aa1ab", hi: "#cfd4dc", lo: "#5e6571" },
    blue: { body: "#1f5fb8", hi: "#3a82d6", lo: "#103b7a" },
    yellow:{body: "#f3c20a", hi: "#ffd83a", lo: "#b88c00" },
  };
  const p = palette[color] || palette.navy;
  // Draw a curved tube via two arcs + ribs as short perpendicular lines
  const ribs = 22;
  const cx = w / 2, cy = h * 0.95, r1 = w * 0.42, r2 = w * 0.32;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="rk-hose-svg" style={{ width: w, height: h, ...style }}>
      <defs>
        <linearGradient id={`hg-${color}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor={p.hi} />
          <stop offset="1" stopColor={p.lo} />
        </linearGradient>
      </defs>
      {/* Outer tube band */}
      <path
        d={`M ${cx - r1} ${cy} A ${r1} ${r1} 0 0 1 ${cx + r1} ${cy} L ${cx + r2} ${cy} A ${r2} ${r2} 0 0 0 ${cx - r2} ${cy} Z`}
        fill={`url(#hg-${color})`}
      />
      {/* Spiral ribs */}
      {Array.from({ length: ribs }).map((_, i) => {
        const t = i / (ribs - 1);
        const ang = Math.PI - Math.PI * t;
        const ix = cx + r2 * Math.cos(ang), iy = cy - r2 * Math.sin(ang);
        const ox = cx + r1 * Math.cos(ang), oy = cy - r1 * Math.sin(ang);
        return (
          <line
            key={i}
            x1={ix}
            y1={iy}
            x2={ox}
            y2={oy}
            stroke={p.lo}
            strokeOpacity={0.45}
            strokeWidth={1.4}
          />
        );
      })}
      {/* Cuff ends */}
      <circle cx={cx + r1} cy={cy} r={(r1 - r2) / 2} fill={p.lo} opacity="0.65" />
      <circle cx={cx - r1} cy={cy} r={(r1 - r2) / 2} fill={p.lo} opacity="0.65" />
    </svg>
  );
}

// ── Mini SVG icons (line) for USP / industries / nav ────────────────
function Ic({ name, size = 22, color = "currentColor", strokeWidth = 1.6 }) {
  const props = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: color, strokeWidth, strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "truck": return <svg {...props}><path d="M3 16V6h11v10M14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>;
    case "tag": return <svg {...props}><path d="M20 12.5L12.5 20a2 2 0 0 1-2.83 0L3 13.34V4h9.34L20 11.67a2 2 0 0 1 0 2.83z"/><circle cx="8" cy="9" r="1.5"/></svg>;
    case "wrench": return <svg {...props}><path d="M14.7 6.3a4 4 0 0 1 5 5l-3.4-1.4-1.4 1.4 1.4 3.4a4 4 0 0 1-5-5L3 16.5 7.5 21l9.9-9.9z"/></svg>;
    case "phone": return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
    case "mail": return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="1"/><path d="M3 7l9 6 9-6"/></svg>;
    case "pin": return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>;
    case "clock": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case "search": return <svg {...props}><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>;
    case "user": return <svg {...props}><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1"/></svg>;
    case "arrow": return <svg {...props}><path d="M5 12h14M13 5l7 7-7 7"/></svg>;
    case "chev": return <svg {...props}><path d="M6 9l6 6 6-6"/></svg>;
    case "check": return <svg {...props}><path d="M20 6L9 17l-5-5"/></svg>;
    case "shield": return <svg {...props}><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>;
    case "doc": return <svg {...props}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>;
    case "spool": return <svg {...props}><ellipse cx="12" cy="6" rx="8" ry="2"/><path d="M4 6v12a8 2 0 0 0 16 0V6"/><path d="M4 12a8 2 0 0 0 16 0"/></svg>;
    case "filter": return <svg {...props}><path d="M3 5h18M6 12h12M10 19h4"/></svg>;
    case "warehouse": return <svg {...props}><path d="M3 21V9l9-5 9 5v12"/><path d="M7 21V13h10v8"/></svg>;
    case "factory": return <svg {...props}><path d="M3 21V11l5 3V11l5 3V11l5 3v7H3z"/><rect x="6" y="16" width="2" height="3"/><rect x="11" y="16" width="2" height="3"/><rect x="16" y="16" width="2" height="3"/></svg>;
    case "wood": return <svg {...props}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="3"/></svg>;
    case "vent": return <svg {...props}><circle cx="12" cy="12" r="9"/><path d="M12 3c2 4 2 6 0 9s-2 5 0 9M3 12c4-2 6-2 9 0s5 2 9 0"/></svg>;
    case "food": return <svg {...props}><path d="M4 12c0-4 4-8 8-8s8 4 8 8"/><path d="M2 12h20M5 16h14M8 20h8"/></svg>;
    case "chem": return <svg {...props}><path d="M9 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V3"/><path d="M9 3h6"/></svg>;
    case "agri": return <svg {...props}><path d="M12 2v8M8 6l4 4 4-4M4 14c4-2 6-2 8 0s4 2 8 0M4 18c4-2 6-2 8 0s4 2 8 0"/></svg>;
    case "spec": return <svg {...props}><rect x="2" y="13" width="18" height="6" rx="1"/><circle cx="7" cy="19" r="2"/><circle cx="16" cy="19" r="2"/><path d="M14 13V8h5l2 5"/></svg>;
    case "oil": return <svg {...props}><path d="M12 2C8 8 6 11 6 15a6 6 0 0 0 12 0c0-4-2-7-6-13z"/></svg>;
    case "exhaust": return <svg {...props}><path d="M3 12c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3"/><path d="M3 17c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3"/></svg>;
    default: return null;
  }
}

// ── Eyebrow ─────────────────────────────────────────────────────────
function Eyebrow({ children, color, dir }) {
  return (
    <div
      className="rk-eyebrow"
      style={{
        color: color || dir.colors.red,
        fontFamily: dir.fonts.body,
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}
    >
      <span style={{ display: "inline-block", width: 24, height: 2, background: "currentColor" }} />
      {children}
    </div>
  );
}

// ── Section heading ─────────────────────────────────────────────────
function SectionHead({ dir, eyebrow, title, sub, align = "left", color, size = 1 }) {
  const c = dir.colors;
  const hs = dir.headStyle;
  const isC = dir.key === "C";
  const titleSize = isC ? 64 * size : 36 * size;
  const titleLh = isC ? 0.95 : 1.1;
  return (
    <div style={{ textAlign: align, marginBottom: 32 }}>
      {eyebrow && <Eyebrow dir={dir} color={color}>{eyebrow}</Eyebrow>}
      <h2
        style={{
          margin: "10px 0 0",
          fontFamily: dir.fonts.head,
          fontWeight: hs.weight,
          textTransform: hs.transform,
          letterSpacing: hs.tracking,
          fontSize: titleSize,
          lineHeight: titleLh,
          color: color || c.navy,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p
          style={{
            margin: "14px 0 0",
            color: color ? "rgba(255,255,255,0.78)" : c.mute,
            fontSize: 16,
            maxWidth: 720,
            ...(align === "center" ? { marginLeft: "auto", marginRight: "auto" } : {}),
          }}
        >
          {sub}
        </p>
      )}
    </div>
  );
}

// ── Button ──────────────────────────────────────────────────────────
function RkButton({ dir, kind = "primary", children, icon, style = {}, size = "md" }) {
  const c = dir.colors;
  const shape = "shape-" + dir.buttonShape;
  const sz = size === "sm" ? { padding: "9px 16px", fontSize: 12 } : size === "lg" ? { padding: "15px 28px", fontSize: 15 } : { padding: "12px 22px", fontSize: 13 };
  const looks = {
    primary:   { background: c.red,   color: "#fff",       border: "none" },
    primaryDark:{background: c.navy,  color: "#fff",       border: "none" },
    outline:   { background: "transparent", color: c.navy, border: `1.5px solid ${c.navy}` },
    outlineLight:{background: "transparent", color: "#fff", border: "1.5px solid rgba(255,255,255,0.7)" },
    ghost:     { background: "transparent", color: c.navy, border: "none" },
  };
  return (
    <button
      className={`rk-btn ${shape}`}
      style={{ ...sz, ...looks[kind], textTransform: dir.headStyle.transform, letterSpacing: "0.04em", ...style }}
    >
      {children}
      {icon === false ? null : <Ic name="arrow" size={size === "sm" ? 14 : 16} />}
    </button>
  );
}

// ── Container wrapper with consistent gutter ────────────────────────
function Container({ children, width = 1320, style = {} }) {
  return (
    <div style={{ maxWidth: width, margin: "0 auto", padding: "0 40px", ...style }}>
      {children}
    </div>
  );
}

window.Logo = Logo;
window.ImageSlot = ImageSlot;
window.HoseSvg = HoseSvg;
window.Ic = Ic;
window.Eyebrow = Eyebrow;
window.SectionHead = SectionHead;
window.RkButton = RkButton;
window.Container = Container;
