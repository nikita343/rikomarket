import Image from "next/image";
import { company, usps } from "@/lib/site";
import { categoryById } from "@/lib/categories";
import { industries } from "@/lib/industries";
import {
  getAllProducts,
  getProductsByCategory,
  countByCategory,
  type Product,
} from "@/lib/products";
import { Container, Button, Eyebrow, SectionHead } from "@/components/ui";
import { Icon, type IconName } from "@/components/icons";
import { IndustryTile } from "@/components/IndustryTile";
import { CategoryTabs, type TabCat } from "@/components/CategoryTabs";

// The five material families shown on the homepage.
const HOME_CATEGORIES = [
  "rukava-z-polihlorvinilu",
  "rukava-z-poliuretanu",
  "rukava-typu-klyn",
  "metalorukavy",
  "elementi-ziednannya",
];

export default function HomePage() {
  const counts = countByCategory();
  const homeCats = HOME_CATEGORIES.map((id) => categoryById(id)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );
  const tabCats: TabCat[] = homeCats.map((c) => ({
    id: c.id,
    name: c.name,
    count: counts[c.id] ?? 0,
  }));
  const productsByCat: Record<string, Product[]> = {};
  for (const c of homeCats) {
    productsByCat[c.id] = getProductsByCategory(c.id).slice(0, 4);
  }
  // Ensure every category tab shows something even if seeded thinly.
  const fallback = getAllProducts().slice(0, 4);
  for (const c of homeCats) {
    if (productsByCat[c.id].length === 0) productsByCat[c.id] = fallback;
  }

  return (
    <>
      {/* ── Hero (photo-overlay) ───────────────────────────── */}
      <section className="relative overflow-hidden bg-navy lg:min-h-[600px] lg:bg-white">
        {/* Desktop decorative layers — flush to header + USP strip (no gaps) */}
        <div className="absolute inset-y-0 left-0 hidden w-[62%] bg-navy lg:block" />
        <div className="absolute inset-y-0 left-[62%] hidden w-3 bg-yellow lg:block" />
        <div className="pointer-events-none absolute right-0 top-1/2 hidden w-[55%] max-w-[860px] -translate-y-1/2 lg:block">
          <Image
            src="/brand/hero-hoses.png"
            alt="Pramoninės techninės žarnos"
            width={1870}
            height={1200}
            priority
            className="h-auto w-full object-contain drop-shadow-[0_30px_50px_rgba(0,0,0,0.4)]"
          />
        </div>

        <Container className="relative z-10 py-14 lg:py-[100px] lg:pb-[120px]">
          <div className="max-w-[600px] text-white">
            <Eyebrow tone="yellow">UAB RIKO-MARKET</Eyebrow>
            <h1 className="mt-5 text-[42px] font-extrabold leading-[1.0] tracking-[-0.02em] sm:text-6xl lg:text-[68px]">
              Lankstūs sprendimai –<br />
              <span className="text-yellow">patikimas</span> rezultatas
            </h1>
            <p className="mt-6 max-w-[480px] text-[17px] leading-relaxed text-white/85">
              Techninės žarnos ir Camlock jungtys. Sandėlys Elektrėnuose.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/products" kind="primary" size="lg">
                Katalogas
              </Button>
              <Button href="/contacts" kind="outlineLight" size="lg" icon={false}>
                Konsultacija
              </Button>
            </div>
          </div>
        </Container>

        {/* Mobile hero image */}
        <div className="border-t-4 border-yellow lg:hidden">
          <Image
            src="/brand/hero-hoses.png"
            alt="Pramoninės techninės žarnos"
            width={1870}
            height={1200}
            priority
            className="h-auto w-full object-cover"
          />
        </div>
      </section>

      {/* ── USP strip ──────────────────────────────────────── */}
      <section className="bg-navy text-white">
        <Container className="grid gap-10 py-7 md:grid-cols-3">
          {usps.map((usp, i) => (
            <div key={usp.title} className="relative flex items-center gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center bg-red">
                <Icon name={usp.icon as IconName} size={24} className="text-white" />
              </div>
              <div>
                <div className="text-[14.5px] font-extrabold">{usp.title}</div>
                <div className="mt-1.5 text-[13px] leading-snug text-white/[0.78]">
                  {usp.desc}
                </div>
              </div>
              {i < usps.length - 1 && (
                <span className="absolute -right-5 bottom-2 top-2 hidden w-px bg-white/15 md:block" />
              )}
            </div>
          ))}
        </Container>
      </section>

      {/* ── Industries ─────────────────────────────────────── */}
      <section className="bg-bg py-20">
        <Container>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <SectionHead
              eyebrow="Pritaikymo sritys"
              title="Pramonės šakos"
              sub="Pagrindiniai segmentai, kuriems tiekiame žarnas ir jungtis."
            />
            <a
              href="/industries"
              className="nav-link mb-1.5 inline-flex items-center gap-1.5 text-[13.5px] font-bold uppercase tracking-[0.08em] text-red"
            >
              Visos sritys <Icon name="arrow" size={14} />
            </a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => (
              <IndustryTile key={ind.id} industry={ind} />
            ))}
          </div>
        </Container>
      </section>

      {/* ── Product categories (tabbed) ────────────────────── */}
      <section className="border-y border-line bg-bg-alt py-20">
        <Container>
          <SectionHead
            eyebrow="Produktai"
            title="Produktų kategorijos"
            sub="Penkios pagrindinės kategorijos."
            className="mb-7"
          />
          <CategoryTabs cats={tabCats} productsByCat={productsByCat} />
        </Container>
      </section>

      {/* ── Contact band ───────────────────────────────────── */}
      <section className="bg-navy text-white">
        <Container className="grid items-center gap-14 py-[60px] lg:grid-cols-[1.4fr_1fr]">
          <div>
            <Eyebrow>Kontaktai</Eyebrow>
            <h2 className="mt-3 text-[32px] font-extrabold leading-tight sm:text-[40px]">
              Nežinote, kurią žarną pasirinkti?
            </h2>
            <p className="mt-4 max-w-[540px] text-base text-white/85">
              Mūsų inžinieriai padės parinkti žarną pagal Jūsų darbinę aplinką:
              temperatūrą, slėgį, chemikalus ir mechaninius reikalavimus.
            </p>
          </div>
          <div className="border border-white/[0.18] bg-white/[0.06] p-8">
            <div className="grid gap-[18px] text-[15px]">
              <ContactRow icon="phone" label="Telefonas" value={company.phone} big />
              <ContactRow icon="mail" label="El. paštas" value={company.email} />
              <ContactRow icon="clock" label="Darbo laikas" value={company.hours} />
            </div>
            <div className="mt-6">
              <Button href="/contacts" kind="primary" size="lg" className="w-full">
                Parašyti užklausą
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactRow({
  icon,
  label,
  value,
  big = false,
}: {
  icon: IconName;
  label: string;
  value: string;
  big?: boolean;
}) {
  return (
    <div className="flex items-center gap-3">
      <Icon name={icon} size={20} className="shrink-0 text-red" />
      <div>
        <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-white/70">
          {label}
        </div>
        <div className={`font-bold ${big ? "text-[22px]" : "text-base"}`}>{value}</div>
      </div>
    </div>
  );
}
