"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";
import { getDict, plural } from "@/lib/dictionary";
import { collatorFor, defaultLocale, localeHref, type Locale } from "@/lib/i18n";

export type BrowserCat = { id: string; name: string; parent: string | null; count: number };
export type BrowserProduct = ProductCardData & { categories: string[] };

const PAGE_SIZE = 12;

// ── Parse helpers (pure, client-safe) ───────────────────────────────
function minDiameter(dn: string): number | null {
  const m = dn.match(/\d+/);
  return m ? parseInt(m[0], 10) : null;
}
function maxTemp(temp: string): number | null {
  const nums = [...temp.matchAll(/([+\-−]?)\s*(\d+)/g)].map(
    (m) => (m[1] === "-" || m[1] === "−" ? -1 : 1) * parseInt(m[2], 10),
  );
  return nums.length ? Math.max(...nums) : null;
}

const DIAMETER_TESTS: ((min: number) => boolean)[] = [
  (n) => n >= 10 && n < 50,
  (n) => n >= 50 && n < 150,
  (n) => n >= 150 && n < 500,
  (n) => n >= 500,
];
const TEMP_MAX = [90, 260, 650, 1100];
const SORT_VALUES = ["name", "dn", "temp"] as const;

function toggle(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

export function ProductsBrowser({
  products,
  categories,
  locale = defaultLocale,
}: {
  products: BrowserProduct[];
  categories: BrowserCat[];
  locale?: Locale;
}) {
  const t = getDict(locale).browser;
  const items = (n: number) => plural(n, t.items);
  const sorts = [
    { value: SORT_VALUES[0], label: t.sortName },
    { value: SORT_VALUES[1], label: t.sortDn },
    { value: SORT_VALUES[2], label: t.sortTemp },
  ];
  // Selected category comes from the URL (?category=) so the page can stay static.
  const params = useSearchParams();
  const [category, setCategory] = useState<string | null>(params.get("category"));
  const [diameters, setDiameters] = useState<Set<string>>(new Set());
  const [temps, setTemps] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);

  // ── Category tree helpers (derived once) ──────────────────────────
  const tree = useMemo(() => {
    const byId = new Map(categories.map((c) => [c.id, c]));
    const childrenOf = (id: string | null) =>
      categories.filter((c) => c.parent === id);
    const topAncestor = (id: string): string => {
      let cur = byId.get(id);
      const seen = new Set<string>();
      while (cur && cur.parent && byId.has(cur.parent) && !seen.has(cur.id)) {
        seen.add(cur.id);
        cur = byId.get(cur.parent);
      }
      return cur ? cur.id : id;
    };
    const subtree = (id: string): Set<string> => {
      const ids = new Set<string>([id]);
      const walk = (x: string) => {
        for (const c of childrenOf(x))
          if (!ids.has(c.id)) {
            ids.add(c.id);
            walk(c.id);
          }
      };
      walk(id);
      return ids;
    };
    return { byId, childrenOf, topAncestor, subtree };
  }, [categories]);

  const tops = tree.childrenOf(null);
  const activeCat = category ? tree.byId.get(category) ?? null : null;

  // A representative image for each top-level category (first product in it).
  const catImage = useMemo(() => {
    const m: Record<string, string> = {};
    for (const top of categories.filter((c) => !c.parent)) {
      const ids = tree.subtree(top.id);
      const p = products.find(
        (pr) => pr.image && (pr.category === top.id || pr.categories.some((c) => ids.has(c))),
      );
      if (p) m[top.id] = p.image;
    }
    return m;
  }, [products, categories, tree]);

  function chooseCategory(id: string | null) {
    setCategory(id);
    setDiameters(new Set());
    setTemps(new Set());
    setPage(1);
    const url = localeHref(locale, id ? `/products?category=${id}` : "/products");
    window.history.replaceState(null, "", url);
  }

  const filtered = useMemo(() => {
    let list = products;
    if (category) {
      const ids = tree.subtree(category);
      list = list.filter(
        (p) => p.category === category || p.categories.some((c) => ids.has(c)),
      );
    }
    const labels = getDict(locale).browser;
    if (diameters.size) {
      list = list.filter((p) => {
        const min = minDiameter(p.dn);
        if (min == null) return false;
        return labels.diameterBuckets.some(
          (label: string, i: number) => diameters.has(label) && DIAMETER_TESTS[i](min),
        );
      });
    }
    if (temps.size) {
      list = list.filter((p) => {
        const mx = maxTemp(p.temp);
        if (mx == null) return false;
        return labels.tempBuckets.some(
          (label: string, i: number) => temps.has(label) && mx <= TEMP_MAX[i],
        );
      });
    }
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "dn") return (minDiameter(a.dn) ?? 1e9) - (minDiameter(b.dn) ?? 1e9);
      if (sort === "temp") return (maxTemp(a.temp) ?? 1e9) - (maxTemp(b.temp) ?? 1e9);
      return a.name.localeCompare(b.name, collatorFor(locale));
    });
    return sorted;
  }, [products, category, diameters, temps, sort, tree, locale]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const onFilterChange = (fn: () => void) => {
    fn();
    setPage(1);
  };

  // ── Default view: category cards (products are browsed per category) ──
  if (!category) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tops.map((top) => (
          <button
            key={top.id}
            type="button"
            onClick={() => chooseCategory(top.id)}
            className="group flex flex-col overflow-hidden border border-line bg-white text-left transition-colors hover:border-navy"
          >
            <div className="relative flex h-44 items-center justify-center overflow-hidden bg-bg-warm p-4">
              {catImage[top.id] && (
                <Image
                  src={catImage[top.id]}
                  alt={top.name}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-5 transition-transform duration-300 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex items-center justify-between border-t border-line px-5 py-4">
              <div>
                <div className="text-base font-bold text-navy group-hover:text-red">{top.name}</div>
                <div className="mt-0.5 text-[12.5px] text-mute">
                  {top.count} {items(top.count)}
                </div>
              </div>
              <span className="text-red transition-transform group-hover:translate-x-0.5">→</span>
            </div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-9 lg:grid-cols-[280px_1fr]">
      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside>
        <div className="border border-line bg-white">
          <div className="bg-navy px-[18px] py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white">
            {t.categories}
          </div>
          <button
            type="button"
            onClick={() => chooseCategory(null)}
            className="flex w-full items-center gap-2 px-[18px] py-[13px] text-left text-sm font-semibold text-navy transition-colors hover:bg-bg-warm"
          >
            <span aria-hidden>←</span>
            <span>{t.allCategories}</span>
          </button>
          {tops.map((top) => {
            const active = category === top.id;
            const children = tree.childrenOf(top.id);
            return (
              <div key={top.id}>
                <button
                  type="button"
                  onClick={() => chooseCategory(top.id)}
                  className={`flex w-full items-center justify-between border-t border-line-soft px-[18px] py-[13px] text-left text-sm transition-colors hover:bg-bg-warm ${
                    active ? "bg-bg-warm font-bold text-red" : "font-semibold text-navy"
                  }`}
                >
                  <span>{top.name}</span>
                  <span className="text-xs font-semibold text-mute">{top.count}</span>
                </button>
                {children.length > 0 && (
                  <div className="bg-bg-warm/60 pb-1">
                    {children.map((child) => (
                      <button
                        key={child.id}
                        type="button"
                        onClick={() => chooseCategory(child.id)}
                        className={`flex w-full items-center justify-between py-2 pl-[30px] pr-[18px] text-left text-[13px] transition-colors hover:bg-bg-warm ${
                          category === child.id ? "font-bold text-red" : "text-ink"
                        }`}
                      >
                        <span>{child.name}</span>
                        <span className="text-[11px] font-semibold text-mute">{child.count}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <FilterBlock label={t.diameter}>
          {t.diameterBuckets.map((label: string) => (
            <FilterCheck
              key={label}
              label={label}
              checked={diameters.has(label)}
              onChange={() => onFilterChange(() => setDiameters((v) => toggle(v, label)))}
            />
          ))}
        </FilterBlock>
        <FilterBlock label={t.temperature}>
          {t.tempBuckets.map((label: string) => (
            <FilterCheck
              key={label}
              label={label}
              checked={temps.has(label)}
              onChange={() => onFilterChange(() => setTemps((v) => toggle(v, label)))}
            />
          ))}
        </FilterBlock>
      </aside>

      {/* ── Results ──────────────────────────────────────── */}
      <div>
        <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3 border border-line bg-white px-[18px] py-3.5">
          <div className="text-[13.5px] text-ink">
            {t.found} <strong className="text-navy">{filtered.length}</strong>{" "}
            {items(filtered.length)}
            {activeCat && (
              <>
                {" "}·{" "}
                <span className="text-mute">
                  {t.category} {locale === "ru" ? `«${activeCat.name}»` : `„${activeCat.name}“`}
                </span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-mute">
              {t.sorting}
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-line bg-white px-3 py-2 text-[13px] font-semibold text-ink"
            >
              {sorts.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {pageItems.length === 0 ? (
          <p className="py-10 text-center text-mute">
            {t.empty}
          </p>
        ) : (
          <div className="grid gap-3">
            {pageItems.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-9 flex flex-wrap justify-center gap-2">
            <PageBtn disabled={safePage === 1} onClick={() => setPage(safePage - 1)}>
              ‹
            </PageBtn>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <PageBtn key={n} active={n === safePage} onClick={() => setPage(n)}>
                {n}
              </PageBtn>
            ))}
            <PageBtn disabled={safePage === totalPages} onClick={() => setPage(safePage + 1)}>
              ›
            </PageBtn>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="mt-[18px] border border-line bg-white px-[18px] py-3.5">
      <div className="mb-2.5 text-xs font-bold uppercase tracking-[0.08em] text-navy">{label}</div>
      {children}
    </div>
  );
}

function FilterCheck({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 py-1 text-[13px] text-ink">
      <input type="checkbox" className="accent-red" checked={checked} onChange={onChange} />
      {label}
    </label>
  );
}

function PageBtn({
  children,
  active = false,
  disabled = false,
  onClick,
}: {
  children: React.ReactNode;
  active?: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={`flex h-10 w-10 items-center justify-center border border-line text-[13px] font-bold transition-colors disabled:opacity-40 ${
        active ? "bg-navy text-white" : "bg-white text-ink hover:bg-bg-warm"
      }`}
    >
      {children}
    </button>
  );
}
