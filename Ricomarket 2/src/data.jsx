// Shared content/data in Lithuanian (translated from rikomarket.com.ua UA/RU).
// All directions consume from here so copy stays consistent across mockups.

const DATA = {
  company: {
    nameShort: "Riko Market",
    nameFull: "UAB Riko Market",
    tagline: "Lankstūs sprendimai – patikimas rezultatas",
    descShort:
      "Techninės žarnos: PVC, PUR, KLIN, metalo, gumos. Diametrai 10–1200 mm. Temperatūros −150 … +1100 °C.",
    descLong:
      "Tiekiame techninių žarnų ir sujungimo elementų asortimentą medienos apdirbimo, vėdinimo, žemės ūkio, chemijos ir specialiosios technikos sektoriams.",
    phone: "+370 661 42272",
    email: "rikomarket.lt@gmail.com",
    website: "www.rikomarket.lt",
    address: "Vilnius, Lietuva",
    hours: "I–V / 9:00–18:00",
    director: "Hovorkov Olekcii",
    foundedNote: "Įm. kodas 307642804 · PVM LT100020123613",
    legalLine: "© 2026 UAB Riko Market · Įm. kodas 307642804 · PVM LT100020123613",
  },

  nav: [
    { label: "Pagrindinis", href: "#home" },
    { label: "Produktai", href: "#products" },
    { label: "Pritaikymo sritys", href: "#industries" },
    { label: "Cheminis atsparumas", href: "#chemical" },
    { label: "Matavimo vienetai", href: "#units" },
    { label: "Kontaktai", href: "#contact" },
  ],

  usps: [
    {
      title: "Pristatymas visoje Lietuvoje",
      desc: "Greitas siuntimas iš sandėlio Vilniuje. Pristatymas per 1–3 d.d.",
      icon: "truck",
    },
    {
      title: "Gamintojo kaina",
      desc: "Tiesioginės sutartys su Europos gamintojais. Be tarpininkų.",
      icon: "tag",
    },
    {
      title: "Pagalba parenkant",
      desc: "Mūsų inžinieriai padės parinkti tinkamą žarną pagal Jūsų darbo sąlygas.",
      icon: "wrench",
    },
  ],

  categories: [
    {
      id: "pvc",
      name: "PVC žarnos",
      slug: "pvc-zarnos",
      desc: "Polivinilchlorido žarnos su metalo arba PVC spirale, taip pat siūline armatūra.",
      sub: ["Su metalo spirale", "Su PVC spirale", "Su siūline armatūra"],
      count: 14,
    },
    {
      id: "pur",
      name: "PUR žarnos",
      slug: "pur-zarnos",
      desc: "Poliuretano žarnos abrazyvinėms medžiagoms, granulėms, dulkėms.",
      sub: ["Su metalo spirale", "Su PVC spirale", "Be spiralės (FLAT)"],
      count: 12,
    },
    {
      id: "klin",
      name: "KLIN tipo žarnos",
      slug: "klin-zarnos",
      desc: "Teflono, stiklo pluošto, nitrilo žarnos aukštoms ir žemoms temperatūroms.",
      sub: ["Tefloninės (PTFE)", "Stiklo pluošto", "Nitrilas, PE, PUR"],
      count: 11,
    },
    {
      id: "metal",
      name: "Metalinės žarnos",
      slug: "metalines-zarnos",
      desc: "Lankstūs metaliniai vamzdžiai iš nerūdijančio ir cinkuoto plieno.",
      sub: ["Nerūdijantis plienas", "Cinkuotas plienas"],
      count: 6,
    },
    {
      id: "rubber",
      name: "Gumos gaminiai",
      slug: "gumos-gaminiai",
      desc: "Techninės gumos gaminiai ir žarnos pramonės naudojimui.",
      sub: ["Hidraulinės", "Slėginės", "Vakuuminės"],
      count: 9,
    },
    {
      id: "fittings",
      name: "Sujungimo elementai",
      slug: "sujungimo-elementai",
      desc: "Camlock greitojo sujungimo perėjikliai, antgaliai, apkabos.",
      sub: ["Camlock aliuminis", "Camlock nerūdijantis", "Antgaliai"],
      count: 18,
    },
  ],

  industries: [
    { id: "wood", name: "Medienos apdirbimas", desc: "Drožlių, dulkių ištraukimas, CNC staklės, granulių linijos.", img: "wood" },
    { id: "vent", name: "Vėdinimo sistemos", desc: "Aukštų ir žemų temperatūrų vėdinimas, chemikalų garai.", img: "vent" },
    { id: "food", name: "Maisto pramonė", desc: "Sertifikuoti žarnų gaminiai, atitinkantys maisto kontaktui keliamus reikalavimus.", img: "food" },
    { id: "chem", name: "Cheminė pramonė", desc: "Atsparios chemikalams žarnos. Galvanika, laboratorijos, garų ištraukimas.", img: "chem" },
    { id: "agri", name: "Žemės ūkis", desc: "Sėjamosios, granuliatoriai, purkštuvai, grūdų transportavimas.", img: "agri" },
    { id: "spec", name: "Specialioji technika", desc: "Asenizacija, komunalinė technika, motopompos, vakuuminiai siurbliai.", img: "spec" },
    { id: "oil", name: "Nafta ir dujos", desc: "Naftos perdirbimas ir degalų perpylimas. Camlock perėjikliai.", img: "oil" },
    { id: "exhaust", name: "Išmetamosios dujos", desc: "Aukštatemperatūrinės žarnos automobilių servisams ir bandymų stotims.", img: "exhaust" },
  ],

  // Pulled from the existing site and translated. Used in product listings.
  products: [
    { id: "pvc-agrochem", name: "PVC žarna „Agrochem“", cat: "pvc", sub: "Su PVC spirale", ind: ["agri", "spec"], dn: "25–200 mm", temp: "−10…+60 °C", press: "1–4 bar", color: "navy", note: "Trąšos, srutos, vakuumas" },
    { id: "pvc-vakuum", name: "PVC žarna „Vakuum“", cat: "pvc", sub: "Su PVC spirale", ind: ["agri", "spec"], dn: "32–250 mm", temp: "−10…+60 °C", press: "Vakuum.", color: "navy", note: "Žemkasių, motopompų" },
    { id: "pvc-vent", name: "PVC žarna „Vent“", cat: "pvc", sub: "Su PVC spirale", ind: ["vent", "chem"], dn: "40–315 mm", temp: "−10…+70 °C", press: "Žemo slėgio", color: "navy", note: "Galvanika, sėjamosios" },
    { id: "pvc-grin", name: "PVC žarna „Grin“", cat: "pvc", sub: "Su PVC spirale", ind: ["agri"], dn: "40–200 mm", temp: "−10…+60 °C", press: "1–3 bar", color: "navy", note: "Žemkasiai, motopompos" },
    { id: "pvc-a1", name: "Tipas A1. PVC — lengva konstrukcija", cat: "pvc", sub: "Su metalo spirale", ind: ["wood", "chem", "vent"], dn: "50–500 mm", temp: "−10…+80 °C", press: "Iki 0,3 bar", color: "navy", note: "Baldų gamyba, drožlių siurbliai" },
    { id: "pvc-a2", name: "Tipas A2. PVC — sunki konstrukcija", cat: "pvc", sub: "Su metalo spirale", ind: ["wood", "vent"], dn: "50–500 mm", temp: "−10…+80 °C", press: "Iki 0,5 bar", color: "navy", note: "Masyvų apdirbimas, garai" },
    { id: "pvc-a6", name: "Tipas A6. PVC — vidutinė konstrukcija", cat: "pvc", sub: "Su metalo spirale", ind: ["wood", "vent"], dn: "50–400 mm", temp: "−10…+70 °C", press: "Iki 0,4 bar", color: "navy", note: "Baldų gamyba, garai" },
    { id: "pvc-s2", name: "Tipas S2. PVC — superlengva", cat: "pvc", sub: "Su metalo spirale", ind: ["wood", "vent", "chem"], dn: "50–500 mm", temp: "−10…+70 °C", press: "Iki 0,2 bar", color: "navy", note: "Rankinis naudojimas" },

    { id: "pur-vc1-04", name: "Tipas VC1. PUR — 0,4 mm", cat: "pur", sub: "Su PVC spirale", ind: ["agri"], dn: "40–200 mm", temp: "−40…+90 °C", press: "Iki 0,4 bar", color: "red", note: "Sėjamosios, grūdai" },
    { id: "pur-vc1-06", name: "Tipas VC1. PUR — 0,6 mm", cat: "pur", sub: "Su PVC spirale", ind: ["agri"], dn: "40–200 mm", temp: "−40…+90 °C", press: "Iki 0,6 bar", color: "red", note: "Granuliatoriai" },
    { id: "pur-b1", name: "Tipas B1. PUR — lengva konstrukcija", cat: "pur", sub: "Su metalo spirale", ind: ["wood", "agri", "spec"], dn: "50–500 mm", temp: "−40…+90 °C", press: "Iki 0,5 bar", color: "red", note: "Granulės, drožlės" },
    { id: "pur-b2", name: "Tipas B2. PUR — sunki konstrukcija", cat: "pur", sub: "Su metalo spirale", ind: ["wood", "agri"], dn: "50–500 mm", temp: "−40…+90 °C", press: "Iki 0,8 bar", color: "red", note: "Masyvai, pneumotransportas" },
    { id: "pur-c1", name: "Tipas C1. PUR folija — superlengva", cat: "pur", sub: "Su metalo spirale", ind: ["wood", "spec"], dn: "50–500 mm", temp: "−40…+90 °C", press: "Iki 0,3 bar", color: "red", note: "CNC, vakuum. siurbliai" },
    { id: "pur-deptak", name: "Žarna išmetamosioms dujoms „DEPTAK“", cat: "pur", sub: "Su PVC spirale", ind: ["exhaust"], dn: "75–200 mm", temp: "Iki +180 °C", press: "Žemo slėgio", color: "red", note: "Auto servisai" },

    { id: "klin-k1b", name: "KLIN K1/B. Teflonas (PTFE)", cat: "klin", sub: "Tefloninės", ind: ["chem", "vent"], dn: "50–300 mm", temp: "−70…+260 °C", press: "Iki 0,1 bar", color: "navy", note: "Chemikalų garai" },
    { id: "klin-k1c", name: "KLIN K1/C. Teflonas antistatic", cat: "klin", sub: "Tefloninės", ind: ["chem", "vent"], dn: "50–300 mm", temp: "−70…+260 °C", press: "Iki 0,1 bar", color: "navy", note: "Antistatinis" },
    { id: "klin-k1d", name: "KLIN K1/D. Teflonas + stiklo pluoštas", cat: "klin", sub: "Tefloninės", ind: ["chem", "vent"], dn: "50–500 mm", temp: "−70…+260 °C", press: "Iki 0,1 bar", color: "navy", note: "Sustiprintas" },
    { id: "klin-k2a", name: "KLIN K2/A. Stiklo pluoštas", cat: "klin", sub: "Stiklo pluošto", ind: ["exhaust", "vent"], dn: "50–500 mm", temp: "Iki +550 °C", press: "Žemo slėgio", color: "navy", note: "Aliuminizuotas audinys" },
    { id: "klin-k2b", name: "KLIN K2/B. Dvigubas stiklo pluoštas", cat: "klin", sub: "Stiklo pluošto", ind: ["exhaust", "vent"], dn: "50–500 mm", temp: "Iki +650 °C", press: "Žemo slėgio", color: "navy", note: "Aukštos temperatūros" },
    { id: "klin-k3", name: "KLIN K3. PVC", cat: "klin", sub: "Nitrilas, PE, PUR", ind: ["chem", "vent"], dn: "50–300 mm", temp: "−10…+70 °C", press: "Žemo slėgio", color: "navy", note: "Chemikalų garai" },
    { id: "klin-k5", name: "KLIN K5. Poliuretanas (PUR)", cat: "klin", sub: "Nitrilas, PE, PUR", ind: ["vent"], dn: "50–500 mm", temp: "−40…+90 °C", press: "Žemo slėgio", color: "red", note: "Žemos temperatūros" },
    { id: "klin-k9a", name: "KLIN K9/A. Aukštatemperatūrinis", cat: "klin", sub: "Stiklo pluošto", ind: ["exhaust", "vent"], dn: "75–400 mm", temp: "Iki +1100 °C", press: "Žemo slėgio", color: "navy", note: "Stiklo p. + nerūd. tinklas" },

    { id: "met-c", name: "Metalinė žarna iš nerūdijančio plieno, tipas C", cat: "metal", sub: "Nerūdijantis plienas", ind: ["exhaust", "chem"], dn: "10–200 mm", temp: "Iki +600 °C", press: "Žemo slėgio", color: "silver", note: "Lanksti, lygus paviršius" },
    { id: "met-d", name: "Metalinė žarna iš nerūdijančio plieno, tipas D", cat: "metal", sub: "Nerūdijantis plienas", ind: ["exhaust", "chem"], dn: "10–200 mm", temp: "Iki +700 °C", press: "Žemo slėgio", color: "silver", note: "Sustiprinta jungtis" },
    { id: "met-a", name: "Cinkuoto plieno žarna, tipas A", cat: "metal", sub: "Cinkuotas plienas", ind: ["exhaust", "vent"], dn: "12–150 mm", temp: "Iki +300 °C", press: "Žemo slėgio", color: "silver", note: "Ekonomiškas variantas" },
    { id: "met-b", name: "Cinkuoto plieno žarna, tipas B", cat: "metal", sub: "Cinkuotas plienas", ind: ["exhaust", "vent"], dn: "12–150 mm", temp: "Iki +300 °C", press: "Žemo slėgio", color: "silver", note: "Sustiprintas vingiavimas" },

    { id: "fit-aa-al", name: "Camlock perėjiklis tipas AA, aliuminis", cat: "fittings", sub: "Camlock aliuminis", ind: ["oil", "agri"], dn: "1/2\"–6\"", temp: "−20…+120 °C", press: "Iki 16 bar", color: "silver", note: "ISO standart." },
    { id: "fit-aa-ss", name: "Camlock perėjiklis tipas AA, nerūdijantis", cat: "fittings", sub: "Camlock nerūdijantis", ind: ["chem", "food"], dn: "1/2\"–6\"", temp: "−20…+150 °C", press: "Iki 16 bar", color: "silver", note: "AISI 304/316" },
    { id: "fit-dd-al", name: "Camlock perėjiklis tipas DD, aliuminis", cat: "fittings", sub: "Camlock aliuminis", ind: ["oil", "agri"], dn: "1/2\"–6\"", temp: "−20…+120 °C", press: "Iki 16 bar", color: "silver", note: "Dvigubas movinis" },
    { id: "fit-a-al", name: "Camlock tipas A, aliuminis", cat: "fittings", sub: "Camlock aliuminis", ind: ["oil"], dn: "1/2\"–6\"", temp: "−20…+120 °C", press: "Iki 16 bar", color: "silver", note: "Su išorinis sriegis" },
    { id: "fit-b-al", name: "Camlock tipas B, aliuminis", cat: "fittings", sub: "Camlock aliuminis", ind: ["oil"], dn: "1/2\"–6\"", temp: "−20…+120 °C", press: "Iki 16 bar", color: "silver", note: "Su movine jungtimi" },
    { id: "fit-f-pp", name: "Camlock tipas F, polipropilenas", cat: "fittings", sub: "Camlock aliuminis", ind: ["chem"], dn: "1/2\"–4\"", temp: "−10…+80 °C", press: "Iki 7 bar", color: "silver", note: "Chemikalams atsparus" },
  ],

  // Sample spec rows for product detail page
  specRows: [
    { k: "Vidinis diametras (DN)", v: "50–500 mm" },
    { k: "Sienelės storis", v: "0,6 mm / 0,8 mm / 1,0 mm" },
    { k: "Darbinė temperatūra", v: "−40 °C … +90 °C" },
    { k: "Spiralės žingsnis", v: "Pagal DN, 14–60 mm" },
    { k: "Darbinis slėgis (DN100)", v: "0,38 bar" },
    { k: "Vakuumas (DN100)", v: "0,32 bar" },
    { k: "Minimalus lenkimo spindulys", v: "1,0 × DN" },
    { k: "Standartinis ilgis ritinyje", v: "10 m / 20 m" },
    { k: "Spalva", v: "Skaidri / mėlyna / juoda" },
    { k: "Sertifikatai", v: "REACH, RoHS" },
    { k: "Pagaminta", v: "Lenkija / ES" },
  ],

  // Chemical resistance — sample rows
  chemRows: [
    { name: "Acetonas", pvc: "X", pur: "○", ptfe: "✓", nbr: "X", epdm: "✓" },
    { name: "Amoniakas (vandeninis)", pvc: "○", pur: "○", ptfe: "✓", nbr: "✓", epdm: "✓" },
    { name: "Benzinas", pvc: "X", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "X" },
    { name: "Dyzelinas", pvc: "X", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "X" },
    { name: "Druskos rūgštis 10%", pvc: "✓", pur: "X", ptfe: "✓", nbr: "○", epdm: "✓" },
    { name: "Etilo alkoholis", pvc: "✓", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "✓" },
    { name: "Glicerinas", pvc: "✓", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "✓" },
    { name: "Hidraulinė alyva", pvc: "X", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "X" },
    { name: "Karštas vanduo (60°C)", pvc: "○", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "✓" },
    { name: "Natrio šarmas 30%", pvc: "✓", pur: "○", ptfe: "✓", nbr: "✓", epdm: "✓" },
    { name: "Oro suslėgto", pvc: "✓", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "✓" },
    { name: "Sieros rūgštis 30%", pvc: "✓", pur: "X", ptfe: "✓", nbr: "X", epdm: "✓" },
    { name: "Tepalai mineraliniai", pvc: "X", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "X" },
    { name: "Vandenilio peroksidas 30%", pvc: "✓", pur: "○", ptfe: "✓", nbr: "X", epdm: "✓" },
    { name: "Žibalas", pvc: "X", pur: "✓", ptfe: "✓", nbr: "✓", epdm: "X" },
  ],
  chemKey: [
    { sym: "✓", label: "Atsparus" },
    { sym: "○", label: "Sąlyginai atsparus" },
    { sym: "X", label: "Neatsparus" },
  ],

  // Conversion tables — pressure, length, temperature, flow
  convPressure: [
    ["bar", "1 bar = 100 000 Pa"],
    ["bar → kPa", "1 bar = 100 kPa"],
    ["bar → MPa", "1 bar = 0,1 MPa"],
    ["bar → psi", "1 bar ≈ 14,5038 psi"],
    ["bar → atm", "1 bar ≈ 0,987 atm"],
    ["bar → mm Hg", "1 bar ≈ 750,062 mm Hg"],
    ["bar → mm H₂O", "1 bar ≈ 10 197 mm H₂O"],
  ],
  convLength: [
    ["1 colis (in)", "= 25,4 mm"],
    ["1 colis (in)", "= 2,54 cm"],
    ["1 pėda (ft)", "= 304,8 mm"],
    ["1 jardas (yd)", "= 914,4 mm"],
    ["1 m", "= 39,37 in"],
    ["1 m", "= 3,2808 ft"],
  ],
  convTemp: [
    ["°C → °F", "°F = °C × 1,8 + 32"],
    ["°F → °C", "°C = (°F − 32) / 1,8"],
    ["°C → K", "K = °C + 273,15"],
  ],
  convFlow: [
    ["1 m³/h", "= 16,67 l/min"],
    ["1 m³/h", "= 0,2778 l/s"],
    ["1 l/min", "= 0,06 m³/h"],
    ["1 l/s", "= 3,6 m³/h"],
    ["1 gal/min (US)", "≈ 3,785 l/min"],
  ],
};

window.DATA = DATA;
