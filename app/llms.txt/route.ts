// /llms.txt — a plain-markdown map of the site for AI answer engines
// (ChatGPT, Perplexity, Claude, Gemini). Generated from the same data as the
// pages, so it never goes stale. Written in English with LT/RU page links,
// because answer engines translate freely but quote facts verbatim.
import { company } from "@/lib/site";
import { getProductsByCategory, type Product } from "@/lib/products";
import {
  categoryLandings,
  cities,
  cityPath,
  DELIVERY_PATH,
  deliveryCopy,
  fittingLandings,
  formatDn,
  formatTemp,
  homeFaq,
  purposeLandings,
  purposePath,
  specRange,
} from "@/lib/landing";
import { categoryLandingProducts, purposeLandingProducts } from "@/lib/landing-products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

const specsOf = (products: Product[]) => {
  const r = specRange(products);
  return [formatDn(r, "lt") && `DN ${formatDn(r, "lt")}`, formatTemp(r, "lt")].filter(Boolean).join(", ");
};

export function GET() {
  const cats = categoryLandings.map((l) => {
    const products = getProductsByCategory(l.categoryId, "lt");
    const specs = specsOf(products);
    const items = products.map((p) => `  - [${p.name}](${absoluteUrl(`/products/${p.slug}`)})`).join("\n");
    return `### ${l.copy.lt.h1} (${l.copy.ru.h1})\n${l.copy.lt.description}${specs ? ` Range: ${specs}.` : ""}\n- Page (LT): ${absoluteUrl(`/products/category/${l.slug}`)}\n- Page (RU): ${absoluteUrl(`/ru/products/category/${l.slug}`)}\n${items}`;
  });

  // Sub-pages of the fittings category — product links are already listed above.
  const fittings = fittingLandings.map((l) => {
    const n = categoryLandingProducts(l, "lt").length;
    return `- ${l.copy.lt.h1} (${l.copy.ru.h1}), ${n} items: ${absoluteUrl(`/products/category/${l.slug}`)} · RU ${absoluteUrl(`/ru/products/category/${l.slug}`)}`;
  });

  const uses = purposeLandings.map((u) => {
    const products = purposeLandingProducts(u, "lt");
    const specs = specsOf(products);
    return `### ${u.copy.lt.h1} (${u.copy.ru.h1})\n${u.copy.lt.description}${specs ? ` Range: ${specs}.` : ""} ${products.length} items.\n- Page (LT): ${absoluteUrl(purposePath(u.slug))}\n- Page (RU): ${absoluteUrl(`/ru${purposePath(u.slug)}`)}`;
  });

  const body = `# ${company.nameShort} (UAB „Riko Market“)

> Supplier of industrial technical hoses and hose fittings in Lithuania: PVC, PUR (polyurethane), KLIN-type fabric ducting and metal hoses, plus Camlock and STORZ couplings and hose clamps. Warehouse in Elektrėnai; delivery across Lithuania in 1–3 business days. Engineers help select the right hose for temperature, pressure, vacuum and chemical exposure. Prices on request.

## Key facts
- Company: UAB „Riko Market“, VAT LT100020123613
- Location: Elektrėnai, Lithuania (warehouse)
- Phone: ${company.phone} (also ${company.phone2})
- E-mail: ${company.email}
- Hours: Monday–Friday 9:00–18:00
- Languages: Lithuanian, Russian
- Delivery: all of Lithuania, 1–3 business days — ${cities.map((c) => c.names.lt.name).join(", ")}
- Industries: woodworking (chip and dust extraction), ventilation, food, chemical, agriculture, special vehicles
- Website languages: Lithuanian (${absoluteUrl("/")}), Russian (${absoluteUrl("/ru")})

## Product categories
${cats.join("\n\n")}

## Coupling systems and clamps
${fittings.join("\n")}

## Hoses by use
${uses.join("\n\n")}

## Ordering and delivery
${deliveryCopy.lt.description}
- Page (LT): ${absoluteUrl(DELIVERY_PATH)}
- Page (RU): ${absoluteUrl(`/ru${DELIVERY_PATH}`)}

## City pages
${cities.map((c) => `- ${c.names.lt.name}: ${absoluteUrl(cityPath(c.slug))}`).join("\n")}

## Reference
- Chemical resistance table: ${absoluteUrl("/chemical-resistance")}
- Unit converter (pressure, flow, temperature): ${absoluteUrl("/units")}
- Applications by industry: ${absoluteUrl("/industries")}
- Contacts: ${absoluteUrl("/contacts")}

## FAQ (Lithuanian)
${homeFaq.lt.map((f) => `**${f.q}**\n${f.a}`).join("\n\n")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
