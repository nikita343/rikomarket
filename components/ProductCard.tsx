import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/lib/products";
import { categoryById } from "@/lib/categories";
import { Icon } from "@/components/icons";

// List-style row (Direction B cardKind: "list"): image · name+note · specs · arrow.
export function ProductCard({ product }: { product: Product }) {
  const category = categoryById(product.category);
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group grid grid-cols-[100px_1fr] items-center gap-4 rounded-[4px] border border-line bg-white px-4 py-3.5 transition-colors hover:bg-black/[0.02] sm:grid-cols-[120px_1fr_175px_auto] sm:gap-5"
    >
      <div className="relative flex h-[84px] w-full items-center justify-center overflow-hidden rounded-[2px] border border-line-soft bg-bg-warm">
        {product.image && (
          <Image
            src={product.image}
            alt={product.name}
            width={120}
            height={84}
            className="h-full w-full object-cover"
          />
        )}
      </div>

      <div className="min-w-0">
        {category && (
          <div className="mb-1 text-[11px] uppercase tracking-[0.08em] text-mute">
            {category.name}
          </div>
        )}
        <div className="text-[15.5px] font-bold leading-tight text-navy group-hover:text-red">
          {product.name}
        </div>
        {product.shortNote && (
          <div className="mt-1.5 text-[12.5px] text-mute">{product.shortNote}</div>
        )}
      </div>

      <dl className="hidden grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs tabular-nums sm:grid">
        <dt className="text-mute">DN</dt>
        <dd className="text-right font-semibold text-ink">{product.dn || "—"}</dd>
        <dt className="text-mute">°C</dt>
        <dd className="text-right font-semibold text-ink">{product.temp || "—"}</dd>
        <dt className="text-mute">Slėgis</dt>
        <dd className="text-right font-semibold text-ink">{product.pressure || "—"}</dd>
      </dl>

      <Icon name="arrow" size={20} className="hidden text-red sm:block" />
    </Link>
  );
}
