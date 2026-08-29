"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { getDict } from "@/lib/dictionary";
import { defaultLocale, localeHref, type Locale } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui";

export type TabCat = { id: string; name: string; count: number };

export function CategoryTabs({
  cats,
  productsByCat,
  locale = defaultLocale,
}: {
  cats: TabCat[];
  productsByCat: Record<string, Product[]>;
  locale?: Locale;
}) {
  const t = getDict(locale).tabs;
  const [active, setActive] = useState(cats[0]?.id);
  const activeCat = cats.find((c) => c.id === active);
  const products = productsByCat[active] ?? [];

  return (
    <div>
      {/* Tab strip */}
      <div className="mb-7 flex overflow-x-auto border-b-2 border-line">
        {cats.map((cat) => {
          const isActive = cat.id === active;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActive(cat.id)}
              className={`-mb-0.5 flex shrink-0 items-center gap-2 whitespace-nowrap border-b-2 px-6 py-4 text-sm font-bold transition-colors ${
                isActive
                  ? "border-red bg-white text-navy"
                  : "border-transparent text-mute hover:text-navy"
              }`}
            >
              {cat.name}
              <span className="rounded-[3px] bg-bg-warm px-1.5 py-0.5 text-[11px] opacity-70">
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {products.length > 0 ? (
        <div className="grid gap-3 lg:grid-cols-2">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale} />
          ))}
        </div>
      ) : (
        <p className="text-mute">{t.empty}</p>
      )}

      <div className="mt-8 text-center">
        <Button
          href={localeHref(locale, `/products?category=${active}`)}
          kind="primaryDark"
          size="lg"
        >
          {t.allOf(activeCat?.name ?? "")}
        </Button>
      </div>
    </div>
  );
}
