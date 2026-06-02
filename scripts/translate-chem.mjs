// Translate chemical names (UA → LT) and rewrite lib/chem-data.ts, keeping
// each row's resistance values. Dedupes by the resulting Lithuanian name.
//   node scripts/translate-chem.mjs
import fs from "node:fs";

const file = "lib/chem-data.ts";
const src = fs.readFileSync(file, "utf8");
const m = src.match(/chemData: ChemRow\[\] = (\[[\s\S]*?\]);/);
const data = JSON.parse(m[1]);

// Lithuanian names in the exact current row order (281 entries).
const lt = [
  "Azotas", "Kalio nitratas", "Akrilonitrilas", "Alkoholinis gėrimas", "Aliuminio chloridas",
  "Amoniakas (vandeninis tirpalas)", "Amilacetatas", "Azoto rūgšties anhidridas",
  "Chromo rūgšties anhidridas", "Anilinas", "Amonio acetatas", "Vinilacetatas",
  "Izopropilacetatas", "Kalio acetatas", "Natrio acetatas", "Propilacetatas", "Švino acetatas",
  "Celiuliozės acetatas", "Acetilenas", "Acetonas", "Acetonitrilas", "Benzilchloridas", "Benzinas",
  "Benzinas (bešvinis)", "Benzinas (normalus)", "Benzenas", "Bitumas", "Bromas (garai)",
  "Bromas (skystas)", "Etilbromidas", "Kalio bromatas", "Boraksas", "Butadienas", "Butanas (skystas)",
  "Butilacetatas", "Sviestas", "Vynas", "Vanduo, prisotintas bromo", "Šaltinio vanduo",
  "Jūros vanduo", "Vanduo, prisotintas anglies dioksido", "Chloruotas vanduo", "Vandenilis",
  "Natrio-vandenilio sulfatas", "Kalio karbonatas", "Gamtinės dujos", "Heksanas", "Heksanolis",
  "Heptanas", "Aliuminio hidroksidas", "Amonio hidroksidas", "Kalio hidroksidas", "Kalcio hidroksidas",
  "Magnio hidroksidas", "Amonio hidroksidas (30%)", "Kalio hipochloritas", "Kalcio hipochloritas",
  "Natrio hipochloritas", "Dipropilenglikolis", "Glicerinas", "Gliukozė", "Natrio bikarbonatas",
  "Dekalinas", "Dekstrinas", "Diaminoetilenas", "Dietilaminas", "Dietilketonas", "Dietilformamidas",
  "Dyzelinas", "Diizobutilketonas", "Dimetilaminas", "Sieros dioksidas", "Dioksanas",
  "Anglies disulfidas", "Dichlorbenzenas", "Dichloretilenas", "Kalio dichromatas",
  "Metilo dichloroktanas", "Etanolis", "Etilacetatas", "Etilenglikolis", "Etilenchloridas",
  "Dibutileteris", "Dietileteris", "Dimetileteris", "Difenileteris", "Etileteris (dietileteris)",
  "Naftos eteris", "Riebalai (aliejus)", "Diazoto oksidas", "Izobutilacetatas", "Natrio šarmas",
  "Jodas (drėgnas)", "Jodas (sausas)", "Jodoformas", "Kalio permanganatas (10%)", "Kalio persulfatas",
  "Kalio perchloratas", "Kalcio bisulfitas", "Kamparas", "Amonio karbonatas", "Kalcio karbonatas (kreida)",
  "Natrio karbonatas", "Deguonis", "Azoto rūgštis (koncentruota)", "Azoto rūgštis (rūkstanti)",
  "Arseno rūgštis", "Benzoinė rūgštis", "Boro rūgštis", "Vandenilio bromido rūgštis", "Vyno rūgštis",
  "Anglies rūgštis", "Glikolio rūgštis", "Dichloracto rūgštis", "Rauginė rūgštis (taninas)",
  "Vandenilio jodido rūgštis", "Silicio rūgštis", "Citrinos rūgštis", "Maleino rūgštis",
  "Sviesto (butano) rūgštis", "Metilsieros rūgštis", "Pieno rūgštis (koncentruota)",
  "Skruzdžių rūgštis", "Oleino rūgštis", "Acto rūgštis (100%)", "Palmitino rūgštis", "Pikrino rūgštis",
  "Propiono rūgštis", "Sieros rūgštis (10%)", "Sieros rūgštis (60%)", "Sieros rūgštis (99%)",
  "Sieros rūgštis (rūkstanti)", "Druskos rūgštis (koncentruota)", "Stearino rūgštis",
  "Trichloracto rūgštis", "Vandenilio fluorido rūgštis (tirpi)", "Fosforo rūgštis", "Ftalio rūgštis",
  "Perchloro rūgštis", "Chloro rūgštis (10%)", "Chloracto rūgštis", "Chlorsulfono rūgštis",
  "Chromo rūgštis (50%)", "Ciano rūgštis", "Oksalo rūgštis", "Riebalų rūgštys (daugiau nei 6 C)",
  "Kreozotas", "Ksilenas", "Lanolinas", "Vazelino aliejus", "Ricinos aliejus", "Levandų aliejus",
  "Mineralinis aliejus", "Augalinis aliejus / riebalai", "Silikoninė alyva", "Terpentinas",
  "Transformatorinė alyva", "Mentolis", "Metanas", "Metilaminas", "Metilacetatas", "Metilglikolis",
  "Metiletilketonas", "Metilizobutilketonas", "Metoksibutanolis", "Vario fluoridas", "Pienas",
  "Morfijus", "Natrio bisulfitas", "Natrio peroksidas", "Nafta", "Naftalinas", "Amonio nitratas (trąšos)",
  "Natrio nitratas", "Gyvsidabrio nitratas", "Sidabro nitratas", "Nitrobenzenas", "Nitroglicerinas",
  "Nitrometanas", "Nitrotoluenas", "Ozonas", "Etileno oksidas (20 °C)", "Oktanas", "Oktilkrezolis",
  "Actas", "Acetaldehidas", "Kuras (buitinis)", "Vandenilio peroksidas (30%)", "Perchloretilenas",
  "Alus", "Piridinas", "Propanas (skystas)", "Propilenglikolis", "Rezorcinas", "Ricinos aliejus",
  "Skystas stiklas", "Gyvsidabris", "Dibutilsebacatas", "Šlapimas", "Karbamidas", "Siera",
  "Vandenilio sulfidas", "Derva", "Alilo alkoholis", "Benzilo alkoholis", "Butilo alkoholis",
  "Fenetilo alkoholis", "Izobutilo alkoholis", "Izopropilo alkoholis", "Laurilo alkoholis",
  "Propilo alkoholis", "Furfurilo alkoholis", "Stirenas", "Amonio sulfatas (trąšos)",
  "Kalio aliuminio sulfatas", "Kalio sulfatas", "Amonio sulfidas", "Natrio sulfidas", "Natrio sulfitas",
  "Tetrabrometanas", "Tetralinas", "Tetrahidrofuranas", "Tetrachlormetanas", "Tionilchloridas",
  "Tiofenas", "Toluenas", "Sieros trioksidas", "Trietilaminas", "Trichloretilenas",
  "Fosforo trichloridas", "Trichlorfenolis / trichlorbenzenas", "Fenolis", "Formaldehidas",
  "Formamidas", "Fosgenas (skystas)", "Amonio fosfatas (trąšos)", "Natrio fosfatas",
  "Tributil/trietilfosfatas", "Fosforas", "Freonas 11", "Freonas 113", "Freonas 12", "Freonas 22",
  "Vaisių sultys", "Dibutilftalatas", "Dimetilftalatas", "Dioktilftalatas", "Fluoras (sausas)",
  "Chloras (drėgnas)", "Chloras (skystas)", "Chloras (sausos dujos)", "Chlorbenzenas",
  "Chlorbrometanas", "Chloretanolis", "Aliuminio chloridas", "Amilchloridas", "Amonio chloridas",
  "Vinilchloridas", "Kalcio chloridas (tirpalas)", "Magnio chloridas", "Metilchloridas",
  "Metilenchloridas", "Vario chloridas", "Gyvsidabrio chloridas", "Geležies chloridas",
  "Alilchloridas", "Natrio chloridas", "Sieros chloridas", "Chlormetiloktanas", "Trichloretanas",
  "Chloroformas (trichlormetanas)", "Cikloheksanas", "Cikloheksanolis", "Cikloheksanonas",
  "Cinko chloridas", "Natrio cianidas", "Kalio cianidas", "Heksafluoracetonas", "Difenileteris",
  "Dietileteris", "Etileteris (dietileteris)",
];

if (lt.length !== data.length) {
  throw new Error(`Name count mismatch: ${lt.length} LT names vs ${data.length} rows`);
}

const seen = new Set();
const out = [];
data.forEach((r, i) => {
  const name = lt[i];
  if (seen.has(name)) return; // drop rows that collapse to the same LT name
  seen.add(name);
  out.push({ name, vals: r.vals });
});

const header = `// Chemical resistance data — sourced 1:1 from\n// https://rikomarket.com.ua/tablyczya-himichnoyi-stijkosti/ (scripts/parse-chem.mjs),\n// chemical names translated to Lithuanian (scripts/translate-chem.mjs), deduped.\n// Values: "+" atsparus, "+-" sąlyginai, "-" neatsparus, "o" tirpus, "" n/a.\n\nexport const chemMaterials = [\n  "PVC", "PUR", "Santoprenas", "Silikonas", "Teflonas", "Nitrilas", "Chloroprenas", "Hipalonas", "Polietilenas",\n] as const;\n\nexport type ChemRow = { name: string; vals: string[] };\n\nexport const chemData: ChemRow[] = `;
fs.writeFileSync(file, header + JSON.stringify(out, null, 0) + ";\n", "utf8");
console.log(`Translated ${data.length} → ${out.length} unique LT chemicals.`);
