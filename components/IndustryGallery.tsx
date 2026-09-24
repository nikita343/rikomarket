"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export type GalleryPhoto = { src: string; caption: string };

// Photo grid for one application area. Clicking a photo only enlarges it
// (lightbox) — it never navigates away (client review 2026-09).
export function IndustryGallery({
  photos,
  labels,
}: {
  photos: GalleryPhoto[];
  labels: { enlarge: string; close: string; prev: string; next: string };
}) {
  const [open, setOpen] = useState<number | null>(null);
  const count = photos.length;

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % count));
      if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + count) % count));
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, count]);

  const current = open === null ? null : photos[open];

  return (
    <>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {photos.map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`${labels.enlarge}: ${p.caption}`}
              className="group block w-full cursor-zoom-in overflow-hidden border border-line bg-white text-left transition-colors hover:border-navy"
            >
              <div className="relative aspect-square overflow-hidden bg-bg-warm">
                <Image
                  src={p.src}
                  alt={p.caption}
                  fill
                  sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="px-3 py-2.5 text-[13px] font-semibold leading-snug text-navy">
                {p.caption}
              </div>
            </button>
          </li>
        ))}
      </ul>

      {current && open !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.caption}
          onClick={() => setOpen(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        >
          <figure
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[640px] bg-white"
          >
            <div className="relative aspect-square w-full bg-bg-warm">
              <Image src={current.src} alt={current.caption} fill sizes="640px" className="object-contain" />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-4 py-3 text-sm font-semibold text-navy">
              <span>{current.caption}</span>
              <span className="text-xs text-mute tabular-nums">
                {open + 1} / {count}
              </span>
            </figcaption>
            <button
              type="button"
              onClick={() => setOpen(null)}
              aria-label={labels.close}
              className="absolute -top-3 -right-3 flex h-10 w-10 items-center justify-center bg-red text-xl font-bold text-white"
            >
              ×
            </button>
            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setOpen((open - 1 + count) % count)}
                  aria-label={labels.prev}
                  className="absolute left-2 top-[calc(50%-24px)] flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-2xl text-navy hover:bg-white"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() => setOpen((open + 1) % count)}
                  aria-label={labels.next}
                  className="absolute right-2 top-[calc(50%-24px)] flex h-11 w-11 -translate-y-1/2 items-center justify-center bg-white/90 text-2xl text-navy hover:bg-white"
                >
                  ›
                </button>
              </>
            )}
          </figure>
        </div>
      )}
    </>
  );
}
