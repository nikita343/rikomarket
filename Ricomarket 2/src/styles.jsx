// Global CSS injection — hover states, transitions, table styling, scrollbar
// hiding, etc. Each direction gets its own scoped class via .dir-A/.dir-B/.dir-C.

(function injectStyles() {
  if (document.getElementById("riko-styles")) return;
  const css = `
  /* Reset within the page mockups */
  .riko-page, .riko-page * { box-sizing: border-box; }
  .riko-page { line-height: 1.45; font-feature-settings: "ss01", "kern"; -webkit-font-smoothing: antialiased; }
  .riko-page a { color: inherit; text-decoration: none; }
  .riko-page button { font: inherit; cursor: pointer; border: none; background: none; }

  /* Buttons */
  .rk-btn { display: inline-flex; align-items: center; gap: 8px; padding: 12px 22px; font-weight: 700; letter-spacing: 0.01em; transition: background .15s, color .15s, transform .15s; line-height: 1; }
  .rk-btn:hover { transform: translateY(-1px); }
  .rk-btn.shape-square { border-radius: 0; }
  .rk-btn.shape-soft   { border-radius: 4px; }
  .rk-btn.shape-sharp  { border-radius: 0; }
  .rk-btn .rk-arrow { font-size: 1.1em; line-height: 1; }

  /* Hose tile hover effects */
  .rk-tile { position: relative; overflow: hidden; transition: transform .25s, box-shadow .25s; }
  .rk-tile:hover { transform: translateY(-3px); }

  /* Product card hover (only A — bordered) */
  .rk-card-bordered { transition: border-color .15s, box-shadow .2s, transform .15s; }
  .rk-card-bordered:hover { box-shadow: 0 6px 20px rgba(15,37,69,0.08); transform: translateY(-2px); }
  .rk-card-list:hover { background: rgba(0,0,0,0.02); }
  .rk-card-editorial:hover .rk-card-img { transform: scale(1.03); }

  /* Underline on nav link hover */
  .rk-nav-link { position: relative; display: inline-flex; align-items: center; }
  .rk-nav-link::after { content: ""; position: absolute; bottom: -8px; left: 0; right: 0; height: 2px; background: currentColor; opacity: 0; transition: opacity .12s; }
  .rk-nav-link:hover::after { opacity: 0.9; }

  /* Tab strip */
  .rk-tab { transition: background .12s, color .12s; cursor: pointer; }

  /* Mega menu chevron */
  .rk-chevron { display: inline-block; transition: transform .15s; }

  /* Spec table */
  .rk-spec-table { width: 100%; border-collapse: collapse; font-variant-numeric: tabular-nums; }
  .rk-spec-table th, .rk-spec-table td { padding: 12px 16px; text-align: left; vertical-align: top; }
  .rk-spec-table tbody tr { transition: background .1s; }
  .rk-spec-table tbody tr:hover { background: rgba(15,37,69,0.025); }

  /* Direction-specific font defaults */
  .dir-A { font-family: "Manrope", sans-serif; }
  .dir-B { font-family: "Manrope", sans-serif; }
  .dir-C { font-family: "Manrope", sans-serif; }

  /* Gentle scrollbar reset inside page artboards */
  .riko-page::-webkit-scrollbar { width: 0; }

  /* Image-replacement boxes: simple checkerboard + label */
  .rk-img-slot {
    background:
      linear-gradient(135deg, transparent 49.5%, currentColor 49.5%, currentColor 50.5%, transparent 50.5%) 0 0 / 12px 12px,
      var(--bg, #e9ebef);
    color: rgba(15,37,69,0.06);
    position: relative;
    display: flex; align-items: center; justify-content: center;
    overflow: hidden;
  }
  .rk-img-slot .rk-img-label {
    color: rgba(15,37,69,0.55);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    background: rgba(255,255,255,0.78);
    padding: 4px 10px;
    border-radius: 2px;
  }

  /* Hose SVG decorative class */
  .rk-hose-svg { display: block; }

  /* Eyebrow label */
  .rk-eyebrow { font-size: 11px; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; }
  `;
  const tag = document.createElement("style");
  tag.id = "riko-styles";
  tag.textContent = css;
  document.head.appendChild(tag);
})();
