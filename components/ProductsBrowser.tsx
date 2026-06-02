"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@/components/icons";

export type BrowserCat = { id: string; name: string; sub: string[]; count: number };

const PAGE_SIZE = 8;

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

const DIAMETER_BUCKETS: { label: string; test: (min: number) => boolean }[] = [
  { label: "10–50 mm", test: (n) => n >= 10 && n < 50 },
  { label: "50–150 mm", test: (n) => n >= 50 && n < 150 },
  { label: "150–500 mm", test: (n) => n >= 150 && n < 500 },
  { label: "500+ mm", test: (n) => n >= 500 },
];
const TEMP_BUCKETS: { label: string; max: number }[] = [
  { label: "Iki +90 °C", max: 90 },
  { label: "Iki +260 °C", max: 260 },
  { label: "Iki +650 °C", max: 650 },
  { label: "Iki +1100 °C", max: 1100 },
];
const REINFORCEMENT = ["Metalo spiralė", "PVC spiralė", "Be spiralės"];
const SORTS = [
  { value: "name", label: "Pagal pavadinimą" },
  { value: "dn", label: "Pagal diametrą" },
  { value: "temp", label: "Pagal temperatūrą" },
];

function toggle(set: Set<string>, value: string): Set<string> {
  const next = new Set(set);
  if (next.has(value)) next.delete(value);
  else next.add(value);
  return next;
}

function plural(n: number): string {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "pozicija";
  if (m10 >= 2 && m10 <= 9 && (m100 < 10 || m100 >= 20)) return "pozicijos";
  return "pozicijų";
}

export function ProductsBrowser({
  products,
  categories,
  initialCategory,
}: {
  products: Product[];
  categories: BrowserCat[];
  initialCategory?: string;
}) {
  const [category, setCategory] = useState<string | null>(initialCategory ?? null);
  const [subs, setSubs] = useState<Set<string>>(new Set());
  const [diameters, setDiameters] = useState<Set<string>>(new Set());
  const [temps, setTemps] = useState<Set<string>>(new Set());
  const [reinf, setReinf] = useState<Set<string>>(new Set());
  const [sort, setSort] = useState("name");
  const [page, setPage] = useState(1);

  const activeCat = categories.find((c) => c.id === category) ?? null;

  function chooseCategory(id: string | null) {
    setCategory(id);
    setSubs(new Set());
    setPage(1);
    // Reflect in the URL without a full navigation.
    const url = id ? `/products?category=${id}` : "/products";
    window.history.replaceState(null, "", url);
  }

  const filtered = useMemo(() => {
    let list = products;
    if (category) list = list.filter((p) => p.category === category);
    if (subs.size) list = list.filter((p) => subs.has(p.subcategory));
    if (diameters.size) {
      list = list.filter((p) => {
        const min = minDiameter(p.dn);
        if (min == null) return false;
        return DIAMETER_BUCKETS.some((b) => diameters.has(b.label) && b.test(min));
      });
    }
    if (temps.size) {
      list = list.filter((p) => {
        const mx = maxTemp(p.temp);
        if (mx == null) return false;
        return TEMP_BUCKETS.some((b) => temps.has(b.label) && mx <= b.max);
      });
    }
    if (reinf.size) {
      list = list.filter((p) =>
        REINFORCEMENT.some(
          (r) => reinf.has(r) && p.reinforcement.toLowerCase().includes(r.toLowerCase()),
        ),
      );
    }
    const sorted = [...list];
    sorted.sort((a, b) => {
      if (sort === "dn") return (minDiameter(a.dn) ?? 1e9) - (minDiameter(b.dn) ?? 1e9);
      if (sort === "temp") return (maxTemp(a.temp) ?? 1e9) - (maxTemp(b.temp) ?? 1e9);
      return a.name.localeCompare(b.name, "lt");
    });
    return sorted;
  }, [products, category, subs, diameters, temps, reinf, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const onFilterChange = (fn: () => void) => {
    fn();
    setPage(1);
  };

  return (
    <div className="grid gap-9 lg:grid-cols-[280px_1fr]">
      {/* ── Sidebar ──────────────────────────────────────── */}
      <aside>
        <div className="border border-line bg-white">
          <div className="bg-navy px-[18px] py-3.5 text-[13px] font-bold uppercase tracking-[0.08em] text-white">
            Kategorijos
          </div>
          <button
            type="button"
            onClick={() => chooseCategory(null)}
            className={`flex w-full items-center justify-between px-[18px] py-[13px] text-left text-sm font-semibold transition-colors hover:bg-bg-warm ${
              !category ? "bg-bg-warm text-red" : "text-navy"
            }`}
          >
            <span>Visi produktai</span>
            <span className="text-xs font-semibold text-mute">{products.length}</span>
          </button>
          {categories.map((cat) => {
            const active = category === cat.id;
            return (
              <div key={cat.id}>
                <button
                  type="button"
                  onClick={() => chooseCategory(cat.id)}
                  className={`flex w-full items-center justify-between border-t border-line-soft px-[18px] py-[13px] text-left text-sm transition-colors hover:bg-bg-warm ${
                    active ? "bg-bg-warm font-bold text-red" : "font-semibold text-navy"
                  }`}
                >
                  <span>{cat.name}</span>
                  <span className="text-xs font-semibold text-mute">{cat.count}</span>
                </button>
                {active && cat.sub.length > 0 && (
                  <div className="bg-bg-warm px-[18px] pb-3">
                    {cat.sub.map((s) => (
                      <label key={s} className="flex cursor-pointer items-center gap-2.5 py-1.5 text-[13px] text-ink">
                        <input
                          type="checkbox"
                          className="accent-red"
                          checked={subs.has(s)}
                          onChange={() => onFilterChange(() => setSubs((v) => toggle(v, s)))}
                        />
                        {s}
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <FilterBlock label="Vidinis diametras">
          {DIAMETER_BUCKETS.map((b) => (
            <FilterCheck
              key={b.label}
              label={b.label}
              checked={diameters.has(b.label)}
              onChange={() => onFilterChange(() => setDiameters((v) => toggle(v, b.label)))}
            />
          ))}
        </FilterBlock>
        <FilterBlock label="Darbinė temperatūra">
          {TEMP_BUCKETS.map((b) => (
            <FilterCheck
              key={b.label}
              label={b.label}
              checked={temps.has(b.label)}
              onChange={() => onFilterChange(() => setTemps((v) => toggle(v, b.label)))}
            />
          ))}
        </FilterBlock>
        <FilterBlock label="Armatūra">
          {REINFORCEMENT.map((r) => (
            <FilterCheck
              key={r}
              label={r}
              checked={reinf.has(r)}
              onChange={() => onFilterChange(() => setReinf((v) => toggle(v, r)))}
            />
          ))}
        </FilterBlock>
      </aside>

      {/* ── Results ──────────────────────────────────────── */}
      <div>
        <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3 border border-line bg-white px-[18px] py-3.5">
          <div className="text-[13.5px] text-ink">
            Rasta <strong className="text-navy">{filtered.length}</strong> {plural(filtered.length)}
            {activeCat && (
              <>
                {" "}· <span className="text-mute">kategorija „{activeCat.name}“</span>
              </>
            )}
          </div>
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-[0.08em] text-mute">
              Rūšiavimas
            </span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="border border-line bg-white px-3 py-2 text-[13px] font-semibold text-ink"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {pageItems.length === 0 ? (
          <p className="py-10 text-center text-mute">
            Pagal pasirinktus filtrus produktų nerasta.
          </p>
        ) : (
          <div className="grid gap-3">
            {pageItems.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-9 flex justify-center gap-2">
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
