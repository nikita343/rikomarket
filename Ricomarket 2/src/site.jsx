// Standalone single-direction site — renders Direction B ("Specifikacijų
// katalogas") only, with a hash router so the header nav switches pages.
// This is the client-approved version (v2) prepared for dev handoff.

const {
  DIRECTIONS, applyTweaks,
  HomePage, IndustriesPage, ProductListPage, ProductPage,
  ContactPage, ChemResistancePage, ConversionPage,
} = window;

// Map URL hash → page kind. Falls back to home.
const HASH_TO_KIND = {
  "#home": "home",
  "#products": "productList",
  "#product": "productPage",
  "#industries": "industries",
  "#chemical": "chemical",
  "#units": "units",
  "#contact": "contact",
};

// page kind → the nav item it should highlight in the header
const KIND_TO_CURRENT = {
  home: "home",
  productList: "products",
  productPage: "products",
  industries: "industries",
  chemical: "chemical",
  units: "units",
  contact: "contact",
};

function pageFor(kind, dir, current) {
  switch (kind) {
    case "home":        return <HomePage           dir={dir} current={current} />;
    case "industries":  return <IndustriesPage     dir={dir} current={current} />;
    case "productList": return <ProductListPage    dir={dir} current={current} />;
    case "productPage": return <ProductPage        dir={dir} current={current} />;
    case "contact":     return <ContactPage        dir={dir} current={current} />;
    case "chemical":    return <ChemResistancePage dir={dir} current={current} />;
    case "units":       return <ConversionPage     dir={dir} current={current} />;
    default:            return <HomePage           dir={dir} current={current} />;
  }
}

function kindFromHash() {
  return HASH_TO_KIND[window.location.hash] || "home";
}

function SiteRoot() {
  const dir = DIRECTIONS["B"];
  const [kind, setKind] = React.useState(kindFromHash());

  React.useEffect(() => {
    const onHash = () => {
      setKind(kindFromHash());
      window.scrollTo({ top: 0, behavior: "auto" });
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const current = KIND_TO_CURRENT[kind] || "home";
  return pageFor(kind, dir, current);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SiteRoot />);
