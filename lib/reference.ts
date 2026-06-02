// Unit-conversion formula reference tables (from Ricomarket 2/src/data.jsx).
// Chemical-resistance data lives in lib/chem-data.ts.

export const convPressure: [string, string][] = [
  ["bar", "1 bar = 100 000 Pa"],
  ["bar → kPa", "1 bar = 100 kPa"],
  ["bar → MPa", "1 bar = 0,1 MPa"],
  ["bar → psi", "1 bar ≈ 14,5038 psi"],
  ["bar → atm", "1 bar ≈ 0,987 atm"],
  ["bar → mm Hg", "1 bar ≈ 750,062 mm Hg"],
  ["bar → mm H₂O", "1 bar ≈ 10 197 mm H₂O"],
];

export const convLength: [string, string][] = [
  ["1 colis (in)", "= 25,4 mm"],
  ["1 colis (in)", "= 2,54 cm"],
  ["1 pėda (ft)", "= 304,8 mm"],
  ["1 jardas (yd)", "= 914,4 mm"],
  ["1 m", "= 39,37 in"],
  ["1 m", "= 3,2808 ft"],
];

export const convTemp: [string, string][] = [
  ["°C → °F", "°F = °C × 1,8 + 32"],
  ["°F → °C", "°C = (°F − 32) / 1,8"],
  ["°C → K", "K = °C + 273,15"],
];

export const convFlow: [string, string][] = [
  ["1 m³/h", "= 16,67 l/min"],
  ["1 m³/h", "= 0,2778 l/s"],
  ["1 l/min", "= 0,06 m³/h"],
  ["1 l/s", "= 3,6 m³/h"],
  ["1 gal/min (US)", "≈ 3,785 l/min"],
];
