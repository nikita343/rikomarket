"use client";

import { useMemo, useState } from "react";

// Factor-based quantities (value × factor = base unit).
const FACTOR_QUANTITIES = {
  pressure: {
    label: "Slėgis",
    units: {
      bar: 100000, kPa: 1000, MPa: 1_000_000, psi: 6894.757,
      atm: 101325, "mm Hg": 133.322, "mm H₂O": 9.80665,
    } as Record<string, number>,
  },
  length: {
    label: "Ilgis",
    units: { mm: 1, cm: 10, m: 1000, in: 25.4, ft: 304.8, yd: 914.4 } as Record<string, number>,
  },
  flow: {
    label: "Srautas",
    units: { "m³/h": 1, "l/min": 0.06, "l/s": 3.6, "gal/min": 0.2271247 } as Record<string, number>,
  },
};

const TEMP_UNITS = ["°C", "°F", "K"] as const;
type TempUnit = (typeof TEMP_UNITS)[number];

function tempToC(v: number, u: TempUnit): number {
  if (u === "°F") return (v - 32) / 1.8;
  if (u === "K") return v - 273.15;
  return v;
}
function tempFromC(c: number, u: TempUnit): number {
  if (u === "°F") return c * 1.8 + 32;
  if (u === "K") return c + 273.15;
  return c;
}

type Quantity = keyof typeof FACTOR_QUANTITIES | "temperature";

const QUANTITY_LABELS: Record<Quantity, string> = {
  pressure: "Slėgis",
  length: "Ilgis",
  flow: "Srautas",
  temperature: "Temperatūra",
};

function unitsFor(q: Quantity): string[] {
  return q === "temperature" ? [...TEMP_UNITS] : Object.keys(FACTOR_QUANTITIES[q].units);
}

const fmt = new Intl.NumberFormat("lt-LT", { maximumSignificantDigits: 6 });

export function UnitConverter() {
  const [quantity, setQuantity] = useState<Quantity>("pressure");
  const [value, setValue] = useState("1,5");
  const units = unitsFor(quantity);
  const [from, setFrom] = useState(units[0]);
  const [to, setTo] = useState(units[1]);

  function changeQuantity(q: Quantity) {
    setQuantity(q);
    const u = unitsFor(q);
    setFrom(u[0]);
    setTo(u[1]);
  }

  const result = useMemo(() => {
    const n = parseFloat(value.replace(",", "."));
    if (!isFinite(n)) return "—";
    let out: number;
    if (quantity === "temperature") {
      out = tempFromC(tempToC(n, from as TempUnit), to as TempUnit);
    } else {
      const f = FACTOR_QUANTITIES[quantity].units;
      out = (n * f[from]) / f[to];
    }
    return fmt.format(out);
  }, [value, from, to, quantity]);

  const selCls =
    "border border-white/[0.18] bg-white/[0.08] px-4 py-3.5 text-sm font-bold text-white outline-none";

  return (
    <div className="bg-navy p-[26px] text-white">
      {/* Quantity tabs */}
      <div className="mb-5 flex flex-wrap gap-2">
        {(Object.keys(QUANTITY_LABELS) as Quantity[]).map((q) => (
          <button
            key={q}
            type="button"
            onClick={() => changeQuantity(q)}
            className={`rounded-[4px] px-4 py-2 text-[13px] font-bold transition-colors ${
              quantity === q ? "bg-red text-white" : "bg-white/[0.08] text-white/70 hover:text-white"
            }`}
          >
            {QUANTITY_LABELS[q]}
          </button>
        ))}
      </div>

      <div className="grid items-end gap-3.5 lg:grid-cols-[1fr_auto_1fr_auto]">
        <div>
          <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70">
            Įveskite reikšmę
          </div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            inputMode="decimal"
            className="w-full border border-white/[0.18] bg-white/[0.08] px-4 py-3.5 text-[22px] font-bold text-white outline-none"
          />
        </div>
        <select value={from} onChange={(e) => setFrom(e.target.value)} className={selCls}>
          {units.map((u) => (
            <option key={u} value={u} className="text-ink">
              {u}
            </option>
          ))}
        </select>
        <div>
          <div className="mb-1.5 text-[11px] font-bold uppercase tracking-[0.1em] text-white/70">
            Rezultatas
          </div>
          <div className="w-full border border-white/[0.18] bg-white/[0.08] px-4 py-3.5 text-[22px] font-bold text-red">
            {result}
          </div>
        </div>
        <select value={to} onChange={(e) => setTo(e.target.value)} className={selCls}>
          {units.map((u) => (
            <option key={u} value={u} className="text-ink">
              {u}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
