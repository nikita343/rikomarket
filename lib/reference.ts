// Unit-conversion formula reference tables (from Ricomarket 2/src/data.jsx),
// per locale. Chemical-resistance data lives in lib/chem-data.ts.
import type { Locale } from "@/lib/i18n";

export type ConvRow = [string, string];
export type ConvTables = {
  pressure: ConvRow[];
  length: ConvRow[];
  temp: ConvRow[];
  flow: ConvRow[];
};

const lt: ConvTables = {
  pressure: [
    ["bar", "1 bar = 100 000 Pa"],
    ["bar → kPa", "1 bar = 100 kPa"],
    ["bar → MPa", "1 bar = 0,1 MPa"],
    ["bar → psi", "1 bar ≈ 14,5038 psi"],
    ["bar → atm", "1 bar ≈ 0,987 atm"],
    ["bar → mm Hg", "1 bar ≈ 750,062 mm Hg"],
    ["bar → mm H₂O", "1 bar ≈ 10 197 mm H₂O"],
  ],
  length: [
    ["1 colis (in)", "= 25,4 mm"],
    ["1 colis (in)", "= 2,54 cm"],
    ["1 pėda (ft)", "= 304,8 mm"],
    ["1 jardas (yd)", "= 914,4 mm"],
    ["1 m", "= 39,37 in"],
    ["1 m", "= 3,2808 ft"],
  ],
  temp: [
    ["°C → °F", "°F = °C × 1,8 + 32"],
    ["°F → °C", "°C = (°F − 32) / 1,8"],
    ["°C → K", "K = °C + 273,15"],
  ],
  flow: [
    ["1 m³/h", "= 16,67 l/min"],
    ["1 m³/h", "= 0,2778 l/s"],
    ["1 l/min", "= 0,06 m³/h"],
    ["1 l/s", "= 3,6 m³/h"],
    ["1 gal/min (US)", "≈ 3,785 l/min"],
  ],
};

const ru: ConvTables = {
  pressure: [
    ["бар", "1 бар = 100 000 Па"],
    ["бар → кПа", "1 бар = 100 кПа"],
    ["бар → МПа", "1 бар = 0,1 МПа"],
    ["бар → psi", "1 бар ≈ 14,5038 psi"],
    ["бар → атм", "1 бар ≈ 0,987 атм"],
    ["бар → мм рт. ст.", "1 бар ≈ 750,062 мм рт. ст."],
    ["бар → мм вод. ст.", "1 бар ≈ 10 197 мм вод. ст."],
  ],
  length: [
    ["1 дюйм (in)", "= 25,4 мм"],
    ["1 дюйм (in)", "= 2,54 см"],
    ["1 фут (ft)", "= 304,8 мм"],
    ["1 ярд (yd)", "= 914,4 мм"],
    ["1 м", "= 39,37 in"],
    ["1 м", "= 3,2808 ft"],
  ],
  temp: [
    ["°C → °F", "°F = °C × 1,8 + 32"],
    ["°F → °C", "°C = (°F − 32) / 1,8"],
    ["°C → K", "K = °C + 273,15"],
  ],
  flow: [
    ["1 м³/ч", "= 16,67 л/мин"],
    ["1 м³/ч", "= 0,2778 л/с"],
    ["1 л/мин", "= 0,06 м³/ч"],
    ["1 л/с", "= 3,6 м³/ч"],
    ["1 gal/min (US)", "≈ 3,785 л/мин"],
  ],
};

export const conversions: Record<Locale, ConvTables> = { lt, ru };
export const getConversions = (locale: Locale): ConvTables => conversions[locale];

// Back-compat exports (Lithuanian tables).
export const convPressure = lt.pressure;
export const convLength = lt.length;
export const convTemp = lt.temp;
export const convFlow = lt.flow;
