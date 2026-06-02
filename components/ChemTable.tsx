"use client";

import { useMemo, useState } from "react";
import { chemData, chemMaterials } from "@/lib/chem-data";
import { Icon } from "@/components/icons";

const LEGEND = [
  { sym: "+", label: "Atsparus", cls: "text-ok" },
  { sym: "+-", label: "Sąlyginai atsparus", cls: "text-warn" },
  { sym: "−", label: "Neatsparus", cls: "text-red" },
  { sym: "o", label: "Tirpus", cls: "text-blue-accent" },
];

function Sym({ v }: { v: string }) {
  if (!v) return <span className="text-line">·</span>;
  if (v === "+") return <span className="font-bold text-ok">+</span>;
  if (v === "+-") return <span className="font-bold text-warn">+−</span>;
  if (v === "-") return <span className="font-bold text-red">−</span>;
  if (v === "o") return <span className="font-bold text-blue-accent">o</span>;
  return <span>{v}</span>;
}

export function ChemTable() {
  const [query, setQuery] = useState("");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return chemData;
    return chemData.filter((r) => r.name.toLowerCase().includes(q));
  }, [query]);

  return (
    <>
      {/* Legend */}
      <div className="mb-5 flex flex-wrap items-center gap-5 border border-line bg-bg-alt p-4">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-mute">
          Paaiškinimas
        </span>
        {LEGEND.map((k) => (
          <span key={k.sym} className="flex items-center gap-2 text-[13px]">
            <span className={`w-6 text-center text-base font-extrabold ${k.cls}`}>{k.sym}</span>
            {k.label}
          </span>
        ))}
        <span className="ml-auto text-xs text-mute">Duomenys atnaujinti: 2026 / 05</span>
      </div>

      {/* Search */}
      <div className="mb-[18px] flex items-center border border-line bg-white">
        <span className="flex items-center px-3.5 text-mute">
          <Icon name="search" size={16} />
        </span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Ieškoti chemikalo…"
          className="flex-1 border-none bg-transparent py-3 text-sm text-ink outline-none"
        />
        <span className="px-3.5 text-[13px] text-mute">
          {rows.length} / {chemData.length}
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-line bg-white">
        <table className="spec-table w-full min-w-[820px]">
          <thead>
            <tr className="bg-navy text-white">
              <th className="sticky left-0 z-10 bg-navy text-left text-xs font-bold uppercase tracking-[0.08em]">
                Chemikalas
              </th>
              {chemMaterials.map((m) => (
                <th key={m} className="text-center text-xs font-bold uppercase tracking-[0.06em]">
                  {m}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={`${r.name}-${i}`} className={`border-t border-line ${i % 2 ? "bg-bg-warm" : "bg-white"}`}>
                <th
                  scope="row"
                  className={`sticky left-0 z-10 text-left text-sm font-semibold text-navy ${
                    i % 2 ? "bg-bg-warm" : "bg-white"
                  }`}
                >
                  {r.name}
                </th>
                {r.vals.map((v, j) => (
                  <td key={j} className="text-center text-sm">
                    <Sym v={v} />
                  </td>
                ))}
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={chemMaterials.length + 1} className="text-center text-mute">
                  Chemikalų nerasta.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="mt-[18px] max-w-[900px] text-[12.5px] leading-relaxed text-mute">
        * Lentelė pateikiama informaciniais tikslais (esant 20 °C, normalios ar didelės
        koncentracijos reagentams). Konkrečios darbo sąlygos — temperatūra, koncentracija,
        kontakto trukmė — gali smarkiai pakeisti rezultatą. Dėl detalių rekomendacijų
        kreipkitės į mūsų techninį skyrių.
      </p>
    </>
  );
}
