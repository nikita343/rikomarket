// Search landing pages: one page per hose type (category) and one per city.
//
// These exist because people search "PVC žarnos", "metalinės žarnos",
// "techninės žarnos Vilniuje", "Camlock jungtys" — and before this the site had
// no URL that matched any of those queries (categories were only a
// ?category= filter on /products). Everything here is hand-written per locale;
// spec ranges (DN, °C) are computed from the catalogue so they never drift.
import type { Locale } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export type Faq = { q: string; a: string };

type CategoryCopy = {
  title: string; // <title> (brand appended by the layout template)
  h1: string;
  keyword: string; // singular noun phrase used in product titles ("PVC žarna")
  description: string; // meta description, ≤ ~155 chars
  intro: string[]; // visible paragraphs under the H1
  faq: Faq[];
};

export type CategoryLanding = {
  slug: string; // URL: /products/category/<slug>
  categoryId: string; // lib/categories.ts id
  copy: Record<Locale, CategoryCopy>;
};

export const categoryLandings: CategoryLanding[] = [
  {
    slug: "pvc-zarnos",
    categoryId: "rukava-z-polihlorvinilu",
    copy: {
      lt: {
        title: "PVC žarnos: spiralinės, siurbimo ir vakuuminės",
        h1: "PVC žarnos",
        keyword: "PVC žarna",
        description:
          "PVC žarnos su plieno ar PVC spirale: siurbimo, vakuuminės, antistatinės, laistymo ir purškimo. Platus diametrų pasirinkimas, pristatymas visoje Lietuvoje.",
        intro: [
          "PVC (polivinilchlorido) žarnos — lanksčios, lengvos ir ekonomiškos. Armuotos spyruoklinės vielos arba kieto PVC spirale, jos atlaiko vakuumą ir tinka orui, dulkėms, vandeniui, grūdams bei kitoms biriosioms medžiagoms transportuoti.",
          "Asortimente — lengvos ir sunkios konstrukcijos spiralinės žarnos, vakuuminės, antistatinės sprogioms aplinkoms, taip pat žemės ūkio, laistymo ir purškimo žarnos. Žarnos siunčiamos iš sandėlio Elektrėnuose į bet kurį Lietuvos miestą.",
        ],
        faq: [
          {
            q: "Kuo skiriasi PVC ir PUR žarnos?",
            a: "PVC žarnos pigesnės ir tinka daugumai įprastų darbų su oru, vandeniu ir biriosiomis medžiagomis. PUR (poliuretano) žarnos daug atsparesnės dilimui, todėl jos rekomenduojamos abrazyvinėms medžiagoms — drožlėms, smėliui, granulėms.",
          },
          {
            q: "Ar PVC žarna tinka vakuumui?",
            a: "Taip, jei ji armuota spirale. Spiralinės PVC žarnos išlaiko formą esant neigiamam slėgiui; konkretų vakuuminį atsparumą pagal diametrą rasite kiekvienos žarnos lentelėje.",
          },
          {
            q: "Ar yra antistatinių PVC žarnų?",
            a: "Taip — liutniovinilo žarnos, padengtos antistatiniu PVC, skirtos sprogioms aplinkoms, kur būtina nuvesti statinį krūvį.",
          },
        ],
      },
      ru: {
        title: "Рукава ПВХ: спиральные, всасывающие и вакуумные",
        h1: "Рукава из ПВХ",
        keyword: "рукав ПВХ",
        description:
          "Рукава ПВХ со стальной или ПВХ-спиралью: всасывающие, вакуумные, антистатические, поливочные и для опрыскивания. Доставка по всей Литве.",
        intro: [
          "Рукава из ПВХ (поливинилхлорида) — гибкие, лёгкие и экономичные. Армированные спиралью из пружинной стали или жёсткого ПВХ, они держат вакуум и подходят для воздуха, пыли, воды, зерна и других сыпучих материалов.",
          "В ассортименте — спиральные рукава лёгкой и тяжёлой конструкции, вакуумные, антистатические для взрывоопасных сред, а также рукава для сельского хозяйства, полива и опрыскивания. Отправляем со склада в Электренае в любой город Литвы.",
        ],
        faq: [
          {
            q: "Чем отличаются рукава ПВХ и ПУ?",
            a: "Рукава ПВХ дешевле и подходят для большинства задач с воздухом, водой и сыпучими материалами. Полиуретановые (ПУ) рукава значительно стойче к истиранию, поэтому их выбирают для абразивных сред — стружки, песка, гранул.",
          },
          {
            q: "Подходит ли рукав ПВХ для вакуума?",
            a: "Да, если он армирован спиралью. Спиральные рукава ПВХ сохраняют форму при разрежении; вакуумная стойкость по диаметрам указана в таблице каждого рукава.",
          },
          {
            q: "Есть ли антистатические рукава ПВХ?",
            a: "Да — рукава из лютниовинила с антистатическим покрытием ПВХ для взрывоопасных сред, где нужно отводить статический заряд.",
          },
        ],
      },
    },
  },
  {
    slug: "pur-zarnos",
    categoryId: "rukava-z-poliuretanu",
    copy: {
      lt: {
        title: "PUR žarnos: poliuretano žarnos drožlėms ir dulkėms",
        h1: "PUR (poliuretano) žarnos",
        keyword: "PUR žarna",
        description:
          "Poliuretano (PUR) žarnos drožlių, dulkių ir granulių nusiurbimui: lengvos, sunkios ir vakuuminės konstrukcijos, antistatinės. Pristatymas visoje Lietuvoje.",
        intro: [
          "PUR (poliuretano) žarnos — atspariausias dilimui pasirinkimas: poliuretanas dyla apie 100 kartų lėčiau nei PVC ir lenkia net atspariausią gumą. Žarnos antistatinės ir išlaiko savybes esant žemai temperatūrai.",
          "Jos naudojamos drožlių ir dulkių ištraukimui medienos apdirbime ir CNC staklėse, granulių linijose, grūdų transportavimui ir pneumotransportui. Turime lengvos, sunkios, supersunkios ir vakuuminės konstrukcijos žarnų.",
        ],
        faq: [
          {
            q: "Kokia žarna geriausia drožlių nusiurbimui?",
            a: "Drožlėms ir medienos dulkėms rekomenduojamos PUR žarnos su plieno spirale — jos atsparios dilimui ir antistatinės. Konstrukciją (lengvą, sunkią ar vakuuminę) parenkame pagal oro greitį ir vakuumą Jūsų sistemoje.",
          },
          {
            q: "Ar PUR žarnos antistatinės?",
            a: "Taip, poliuretano žarnos su plieno spirale yra elektrostatiškai antistatinės, jei spiralė įžeminta.",
          },
          {
            q: "Kokio ilgio tiekiamos PUR žarnos?",
            a: "Standartinis ilgis — 10 m; suderinus galima ir ilgesnės, iki 20 m.",
          },
        ],
      },
      ru: {
        title: "Рукава ПУ: полиуретановые рукава для стружки и пыли",
        h1: "Рукава из полиуретана (ПУ)",
        keyword: "рукав ПУ",
        description:
          "Полиуретановые (ПУ) рукава для аспирации стружки, пыли и гранул: лёгкой, тяжёлой и вакуумной конструкции, антистатические. Доставка по всей Литве.",
        intro: [
          "Рукава из полиуретана (ПУ) — самый износостойкий вариант: полиуретан истирается примерно в 100 раз медленнее ПВХ и превосходит даже самую стойкую резину. Рукава антистатические и сохраняют свойства на морозе.",
          "Их используют для удаления стружки и пыли в деревообработке и на станках ЧПУ, на гранульных линиях, для транспортировки зерна и в пневмотранспорте. Есть рукава лёгкой, тяжёлой, сверхтяжёлой и вакуумной конструкции.",
        ],
        faq: [
          {
            q: "Какой рукав лучше для удаления стружки?",
            a: "Для стружки и древесной пыли рекомендуем рукава ПУ со стальной спиралью — они износостойкие и антистатические. Конструкцию (лёгкую, тяжёлую или вакуумную) подберём по скорости воздуха и разрежению в вашей системе.",
          },
          {
            q: "Полиуретановые рукава антистатические?",
            a: "Да, рукава ПУ со стальной спиралью антистатические при условии заземления спирали.",
          },
          {
            q: "Какой длины поставляются рукава ПУ?",
            a: "Стандартная длина — 10 м; по согласованию возможны более длинные, до 20 м.",
          },
        ],
      },
    },
  },
  {
    slug: "klin-zarnos",
    categoryId: "rukava-typu-klyn",
    copy: {
      lt: {
        title: "KLIN žarnos: aukštatemperatūrinės ventiliacijos žarnos",
        h1: "KLIN tipo žarnos",
        keyword: "KLIN žarna",
        description:
          "KLIN tipo žarnos iš techninių audinių: teflono, silikono, stiklo pluošto, neopreno. Ventiliacijai ir karštiems garams iki +1100 °C. Pristatymas po Lietuvą.",
        intro: [
          "KLIN tipo žarnos gaminamos iš techninių audinių su plieno vielos spirale. Jos itin lanksčios, lengvai suspaudžiamos ir naudojamos vėdinimo sistemose, karštų dujų ir chemikalų garų ištraukimui.",
          "Medžiaga parenkama pagal temperatūrą ir terpę: PVC ir poliuretanas — įprastai ventiliacijai, teflonas ir silikonas — chemijai ir iki +260 °C, stiklo pluoštas ir termoaudiniai — karštiems išmetimams iki +1100 °C.",
        ],
        faq: [
          {
            q: "Kokia žarna atlaiko aukščiausią temperatūrą?",
            a: "KLIN K9/B (stiklo pluoštas + nerūdijančio metalo tinklas + termoaudinys) — iki +1100 °C. Iki +500 °C tinka K9/A, iki +260 °C — teflono ir silikono žarnos.",
          },
          {
            q: "Kokią žarną rinktis chemikalų garams?",
            a: "Agresyviems garams dažniausiai rekomenduojamos teflono (PTFE) žarnos. Patikrinkite medžiagą cheminio atsparumo lentelėje arba paklauskite mūsų inžinierių.",
          },
        ],
      },
      ru: {
        title: "Рукава КЛИН: высокотемпературные рукава для вентиляции",
        h1: "Рукава типа КЛИН",
        keyword: "рукав КЛИН",
        description:
          "Рукава типа КЛИН из технических тканей: тефлон, силикон, стекловолокно, неопрен. Для вентиляции и горячих газов до +1100 °C. Доставка по всей Литве.",
        intro: [
          "Рукава типа КЛИН изготавливаются из технических тканей со спиралью из стальной проволоки. Они очень гибкие, легко сжимаются и применяются в вентиляции, для отвода горячих газов и паров химикатов.",
          "Материал подбирается по температуре и среде: ПВХ и полиуретан — для обычной вентиляции, тефлон и силикон — для химии и до +260 °C, стекловолокно и термоткани — для горячих выбросов до +1100 °C.",
        ],
        faq: [
          {
            q: "Какой рукав выдерживает самую высокую температуру?",
            a: "КЛИН K9/B (стекловолокно + сетка из нержавеющей стали + термоткань) — до +1100 °C. До +500 °C подходит K9/A, до +260 °C — тефлоновые и силиконовые рукава.",
          },
          {
            q: "Какой рукав выбрать для паров химикатов?",
            a: "Для агрессивных паров чаще всего рекомендуют тефлоновые (PTFE) рукава. Проверьте материал в таблице химической стойкости или спросите наших инженеров.",
          },
        ],
      },
    },
  },
  {
    slug: "metalines-zarnos",
    categoryId: "metalorukavy",
    copy: {
      lt: {
        title: "Metalinės žarnos: cinkuoto ir nerūdijančio plieno",
        h1: "Metalinės žarnos",
        keyword: "metalinė žarna",
        description:
          "Metalinės žarnos Metalhex iš cinkuoto ir nerūdijančio plieno: išmetamosioms dujoms, karštam orui iki +650 °C. Pristatymas visoje Lietuvoje.",
        intro: [
          "Metalinės žarnos (metalorukavai) gaminamos iš cinkuoto arba nerūdijančio plieno juostos. Jos atlaiko aukštą temperatūrą ir mechaninį poveikį, todėl naudojamos variklių išmetamosioms dujoms, karštam orui ir dūmams šalinti.",
          "Cinkuoto plieno Metalhex A / B / B1 tinka iki +300…+500 °C, nerūdijančio plieno Metalhex inox C / D / D1 — iki +650 °C. Sandarumui — silikono arba stiklo pluošto sandariklis.",
        ],
        faq: [
          {
            q: "Kada rinktis nerūdijančio plieno žarną?",
            a: "Kai temperatūra viršija +500 °C arba aplinka drėgna ir korozinė — nerūdijančio plieno Metalhex inox žarnos atlaiko iki +650 °C.",
          },
          {
            q: "Ar metalinė žarna sandari?",
            a: "Versijos su silikoniniu (B, D) arba stiklo pluošto (B1, D1) sandarikliu yra sandarios; versijos be sandariklio (A, C) skirtos ten, kur nedidelis pralaidumas nesvarbus.",
          },
        ],
      },
      ru: {
        title: "Металлорукава из оцинкованной и нержавеющей стали",
        h1: "Металлорукава",
        keyword: "металлорукав",
        description:
          "Металлорукава Metalhex из оцинкованной и нержавеющей стали: для выхлопных газов и горячего воздуха до +650 °C. Доставка по всей Литве.",
        intro: [
          "Металлорукава изготавливаются из оцинкованной или нержавеющей стальной ленты. Они выдерживают высокую температуру и механические нагрузки, поэтому применяются для отвода выхлопных газов двигателей, горячего воздуха и дыма.",
          "Оцинкованные Metalhex A / B / B1 рассчитаны на +300…+500 °C, нержавеющие Metalhex inox C / D / D1 — до +650 °C. Для герметичности — уплотнитель из силикона или стекловолокна.",
        ],
        faq: [
          {
            q: "Когда выбирать металлорукав из нержавеющей стали?",
            a: "Когда температура выше +500 °C или среда влажная и коррозионная — нержавеющие Metalhex inox выдерживают до +650 °C.",
          },
          {
            q: "Герметичен ли металлорукав?",
            a: "Версии с силиконовым (B, D) или стекловолоконным (B1, D1) уплотнителем герметичны; версии без уплотнителя (A, C) — для мест, где небольшая негерметичность не важна.",
          },
        ],
      },
    },
  },
  {
    slug: "sujungimo-elementai",
    categoryId: "elementi-ziednannya",
    copy: {
      lt: {
        title: "Camlock jungtys, STORZ jungtys ir žarnų apkabos",
        h1: "Žarnų jungtys ir apkabos",
        keyword: "jungtis",
        description:
          "Greitosios jungtys Camlock (aliuminis, nerūdijantis plienas, polipropilenas), STORZ jungtys, tarpikliai ir žarnų apkabos. Sandėlys Elektrėnuose.",
        intro: [
          "Viskas žarnoms sujungti ir pritvirtinti: greitosios Camlock jungtys (tipai A, B, C, D, E, F, DC, DP ir perėjikliai) iš aliuminio, nerūdijančio plieno ir polipropileno, STORZ jungtys, EPDM ir NBR tarpikliai.",
          "Taip pat — sraigtinės, galingosios, spyruoklinės ir plastikinės žarnų apkabos nuo mažiausių iki 265 mm diametro žarnų. Jungtis ir apkabas galima užsisakyti kartu su žarnomis.",
        ],
        faq: [
          {
            q: "Kuo skiriasi Camlock A ir C tipai?",
            a: "A tipas — mova (adapteris) su vidiniu sriegiu, C tipas — jungtis su antgaliu žarnai. Žarną su C tipo jungtimi greitai prijungsite prie įrangos su A tipo jungtimi.",
          },
          {
            q: "Kokį tarpiklį rinktis Camlock jungčiai?",
            a: "NBR — naftos produktams ir alyvoms, EPDM — vandeniui, rūgštims ir šarmams. Kilus abejonių, patikrinkite cheminio atsparumo lentelę.",
          },
        ],
      },
      ru: {
        title: "Соединения Camlock, STORZ и хомуты для рукавов",
        h1: "Соединения и хомуты для рукавов",
        keyword: "соединение",
        description:
          "Быстроразъёмные соединения Camlock (алюминий, нержавейка, полипропилен), соединения STORZ, уплотнители и хомуты для рукавов. Склад в Электренае.",
        intro: [
          "Всё для соединения и крепления рукавов: быстроразъёмные соединения Camlock (типы A, B, C, D, E, F, DC, DP и переходники) из алюминия, нержавеющей стали и полипропилена, соединения STORZ, уплотнители из EPDM и NBR.",
          "А также червячные, силовые, пружинные и пластиковые хомуты — от самых малых до 265 мм. Соединения и хомуты можно заказать вместе с рукавами.",
        ],
        faq: [
          {
            q: "Чем отличаются Camlock типа A и C?",
            a: "Тип A — муфта (адаптер) с внутренней резьбой, тип C — соединение со штуцером под рукав. Рукав с соединением типа C быстро подключается к оборудованию с соединением типа A.",
          },
          {
            q: "Какой уплотнитель выбрать для Camlock?",
            a: "NBR — для нефтепродуктов и масел, EPDM — для воды, кислот и щелочей. Если сомневаетесь, сверьтесь с таблицей химической стойкости.",
          },
        ],
      },
    },
  },
];

const landingBySlug = new Map(categoryLandings.map((c) => [c.slug, c]));
const landingByCat = new Map(categoryLandings.map((c) => [c.categoryId, c]));

export const categoryLandingBySlug = (slug: string) => landingBySlug.get(slug);
export const categoryLandingFor = (categoryId: string) => landingByCat.get(categoryId);

export { categoryPath } from "@/lib/category-paths";

// ── Spec ranges computed from the catalogue ────────────────────────────────

// "20–650 mm." → [20, 650]; "15 mm – 228 mm (1″ – 9 1/8″)" → [15, 228];
// "2–12,5 mm" → [2, 12.5]. Inch annotations in brackets are ignored.
function numbers(text: string): number[] {
  return (text.replace(/\([^)]*\)/g, " ").match(/[−-]?\+?\d+(?:[.,]\d+)?/g) ?? [])
    .map((n) => Number(n.replace("−", "-").replace(",", ".").replace("+", "")));
}

export type SpecRange = { dn?: [number, number]; temp?: [number | null, number] };

export function specRange(products: Product[]): SpecRange {
  const dn = products.flatMap((p) => (p.dn ? numbers(p.dn).map(Math.abs) : [])).filter((n) => n > 0);
  // "iki +500 °C" / "+120 °C." are upper bounds only; "nuo −40 iki +80" gives
  // both ends. A lower bound is reported only when some product states one.
  const temps = products.map((p) => (p.temp ? numbers(p.temp) : [])).filter((t) => t.length);
  const highs = temps.map((t) => Math.max(...t));
  const lows = temps.filter((t) => t.length > 1).map((t) => Math.min(...t));
  return {
    ...(dn.length ? { dn: [Math.min(...dn), Math.max(...dn)] as [number, number] } : {}),
    ...(highs.length
      ? { temp: [lows.length ? Math.min(...lows) : null, Math.max(...highs)] as [number | null, number] }
      : {}),
  };
}

const fmt = (n: number, locale: Locale) => n.toLocaleString(locale === "ru" ? "ru-RU" : "lt-LT");
const signed = (n: number, locale: Locale) => (n > 0 ? `+${fmt(n, locale)}` : n < 0 ? `−${fmt(-n, locale)}` : "0");

export function formatDn(r: SpecRange, locale: Locale) {
  return r.dn ? `${fmt(r.dn[0], locale)}–${fmt(r.dn[1], locale)} ${locale === "ru" ? "мм" : "mm"}` : "";
}
export function formatTemp(r: SpecRange, locale: Locale) {
  if (!r.temp) return "";
  const [a, b] = r.temp;
  if (a === null) return `${locale === "ru" ? "до" : "iki"} ${signed(b, locale)} °C`;
  return `${signed(a, locale)} … ${signed(b, locale)} °C`;
}

// ── Cities ─────────────────────────────────────────────────────────────────

type CityNames = {
  name: string; // nominative: Vilnius / Вильнюс
  inCity: string; // locative: Vilniuje / в Вильнюсе
  toCity: string; // direction: į Vilnių / в Вильнюс
};

export type City = {
  slug: string; // URL: /technines-zarnos/<slug>
  names: Record<Locale, CityNames>;
  // Optional city-specific sentence. Only facts we can stand behind.
  note?: Record<Locale, string>;
  warehouse?: boolean; // the Elektrėnai warehouse itself
};

const nearA1: Record<Locale, string> = {
  lt: "Sandėlis Elektrėnuose yra prie magistralės Vilnius–Kaunas, tad iki miesto — vos apie 50 km.",
  ru: "Склад в Электренае находится у магистрали Вильнюс–Каунас — до города всего около 50 км.",
};

export const cities: City[] = [
  {
    slug: "vilnius",
    names: {
      lt: { name: "Vilnius", inCity: "Vilniuje", toCity: "į Vilnių" },
      ru: { name: "Вильнюс", inCity: "в Вильнюсе", toCity: "в Вильнюс" },
    },
    note: nearA1,
  },
  {
    slug: "kaunas",
    names: {
      lt: { name: "Kaunas", inCity: "Kaune", toCity: "į Kauną" },
      ru: { name: "Каунас", inCity: "в Каунасе", toCity: "в Каунас" },
    },
    note: nearA1,
  },
  {
    slug: "klaipeda",
    names: {
      lt: { name: "Klaipėda", inCity: "Klaipėdoje", toCity: "į Klaipėdą" },
      ru: { name: "Клайпеда", inCity: "в Клайпеде", toCity: "в Клайпеду" },
    },
  },
  {
    slug: "siauliai",
    names: {
      lt: { name: "Šiauliai", inCity: "Šiauliuose", toCity: "į Šiaulius" },
      ru: { name: "Шяуляй", inCity: "в Шяуляе", toCity: "в Шяуляй" },
    },
  },
  {
    slug: "panevezys",
    names: {
      lt: { name: "Panevėžys", inCity: "Panevėžyje", toCity: "į Panevėžį" },
      ru: { name: "Паневежис", inCity: "в Паневежисе", toCity: "в Паневежис" },
    },
  },
  {
    slug: "alytus",
    names: {
      lt: { name: "Alytus", inCity: "Alytuje", toCity: "į Alytų" },
      ru: { name: "Алитус", inCity: "в Алитусе", toCity: "в Алитус" },
    },
  },
  {
    slug: "marijampole",
    names: {
      lt: { name: "Marijampolė", inCity: "Marijampolėje", toCity: "į Marijampolę" },
      ru: { name: "Мариямполе", inCity: "в Мариямполе", toCity: "в Мариямполе" },
    },
  },
  {
    slug: "mazeikiai",
    names: {
      lt: { name: "Mažeikiai", inCity: "Mažeikiuose", toCity: "į Mažeikius" },
      ru: { name: "Мажейкяй", inCity: "в Мажейкяе", toCity: "в Мажейкяй" },
    },
  },
  {
    slug: "utena",
    names: {
      lt: { name: "Utena", inCity: "Utenoje", toCity: "į Uteną" },
      ru: { name: "Утена", inCity: "в Утене", toCity: "в Утену" },
    },
  },
  {
    slug: "elektrenai",
    warehouse: true,
    names: {
      lt: { name: "Elektrėnai", inCity: "Elektrėnuose", toCity: "į Elektrėnus" },
      ru: { name: "Электренай", inCity: "в Электренае", toCity: "в Электренай" },
    },
  },
];

const cityMap = new Map(cities.map((c) => [c.slug, c]));
export const cityBySlug = (slug: string) => cityMap.get(slug);
export const cityPath = (slug: string) => `/technines-zarnos/${slug}`;

// Copy for a city page — templated, but every line is true for every city.
export function cityCopy(city: City, locale: Locale) {
  const n = city.names[locale];
  if (locale === "ru") {
    return {
      title: `Технические рукава ${n.inCity}: ПВХ, ПУ, металлорукава`,
      h1: `Технические рукава ${n.inCity}`,
      description: city.warehouse
        ? `Технические рукава ПВХ, ПУ, КЛИН, металлорукава и соединения Camlock со склада ${n.inCity}. Подбор инженером, отправка по всей Литве.`
        : `Технические рукава ПВХ, ПУ, КЛИН, металлорукава и соединения Camlock с доставкой ${n.toCity} за 1–3 рабочих дня. Подбор инженером.`,
      sub: city.warehouse
        ? `Наш склад находится ${n.inCity}. Рукава ПВХ, ПУ, КЛИН, металлорукава и соединения Camlock — со склада, с подбором под ваши условия.`
        : `Рукава ПВХ, ПУ, КЛИН, металлорукава и соединения Camlock с доставкой ${n.toCity} за 1–3 рабочих дня со склада в Электренае.`,
      howTitle: "Как заказать",
      how: [
        "Напишите или позвоните: диаметр, длина, среда (воздух, стружка, вода, химикаты) и температура.",
        "Инженер подберёт рукав и соединения и пришлёт предложение с ценой.",
        city.warehouse ? "Рукава отгружаются со склада в Электренае." : `Отправляем ${n.toCity} — доставка за 1–3 рабочих дня.`,
      ],
      faq: [
        {
          q: city.warehouse ? "Где находится склад Riko Market?" : `Сколько идёт доставка ${n.toCity}?`,
          a: city.warehouse
            ? "Склад UAB «Riko Market» находится в Электренае. Точный адрес сообщим вместе с ответом на запрос."
            : `Отправляем со склада в Электренае; доставка ${n.toCity}, как и в другие города Литвы, занимает 1–3 рабочих дня.`,
        },
        {
          q: `Поставляете ли вы рукава компаниям ${n.inCity}?`,
          a: `Да. Поставляем технические рукава и соединения предприятиям, мастерским и хозяйствам по всей Литве, включая ${n.name}.`,
        },
        {
          q: "Поможете подобрать рукав?",
          a: "Да. Наши инженеры подберут рукав по температуре, давлению, разрежению и химической среде. Пн–Пт 9:00–18:00.",
        },
      ] as Faq[],
    };
  }
  return {
    title: `Techninės žarnos ${n.inCity}: PVC, PUR, metalinės`,
    h1: `Techninės žarnos ${n.inCity}`,
    description: city.warehouse
      ? `Techninės PVC, PUR, KLIN, metalinės žarnos ir Camlock jungtys iš sandėlio ${n.inCity}. Pagalba parenkant, siuntimas visoje Lietuvoje.`
      : `Techninės PVC, PUR, KLIN, metalinės žarnos ir Camlock jungtys su pristatymu ${n.toCity} per 1–3 d.d. Inžinierių pagalba parenkant.`,
    sub: city.warehouse
      ? `Mūsų sandėlis — ${n.inCity}. PVC, PUR, KLIN, metalinės žarnos ir Camlock jungtys iš sandėlio, parinktos pagal Jūsų darbo sąlygas.`
      : `PVC, PUR, KLIN, metalinės žarnos ir Camlock jungtys su pristatymu ${n.toCity} per 1–3 darbo dienas iš sandėlio Elektrėnuose.`,
    howTitle: "Kaip užsakyti",
    how: [
      "Parašykite arba paskambinkite: diametras, ilgis, terpė (oras, drožlės, vanduo, chemikalai) ir temperatūra.",
      "Inžinierius parinks žarną ir jungtis, atsiųs pasiūlymą su kaina.",
      city.warehouse ? "Žarnos išsiunčiamos iš sandėlio Elektrėnuose." : `Siunčiame ${n.toCity} — pristatymas per 1–3 d.d.`,
    ],
    faq: [
      {
        q: city.warehouse ? "Kur yra Riko Market sandėlis?" : `Kiek trunka pristatymas ${n.toCity}?`,
        a: city.warehouse
          ? "UAB „Riko Market“ sandėlis yra Elektrėnuose. Tikslų adresą atsiųsime atsakydami į užklausą."
          : `Siunčiame iš sandėlio Elektrėnuose; pristatymas ${n.toCity}, kaip ir į kitus Lietuvos miestus, trunka 1–3 darbo dienas.`,
      },
      {
        q: `Ar tiekiate žarnas įmonėms ${n.inCity}?`,
        a: `Taip. Techninės žarnos ir jungtys tiekiamos įmonėms, dirbtuvėms ir ūkiams visoje Lietuvoje, įskaitant ${n.toCity.replace(/^į /, "")}.`,
      },
      {
        q: "Ar padėsite parinkti žarną?",
        a: "Taip. Mūsų inžinieriai parinks žarną pagal temperatūrą, slėgį, vakuumą ir cheminę aplinką. I–V 9:00–18:00.",
      },
    ] as Faq[],
  };
}

// ── Home page FAQ (answer-engine friendly: short, factual, self-contained) ──

export const homeFaq: Record<Locale, Faq[]> = {
  lt: [
    {
      q: "Kokias technines žarnas parduoda Riko Market?",
      a: "PVC, PUR (poliuretano), KLIN tipo (techninių audinių) ir metalines žarnas, taip pat Camlock ir STORZ jungtis bei žarnų apkabas. Diametrai nuo kelių milimetrų iki 1150 mm, darbinės temperatūros iki +1100 °C.",
    },
    {
      q: "Ar pristatote žarnas visoje Lietuvoje?",
      a: "Taip. Siunčiame iš sandėlio Elektrėnuose į Vilnių, Kauną, Klaipėdą, Šiaulius, Panevėžį ir kitus miestus; pristatymas trunka 1–3 darbo dienas.",
    },
    {
      q: "Kaip sužinoti žarnos kainą?",
      a: "Kainos skaičiuojamos pagal diametrą, ilgį ir kiekį. Atsiųskite užklausą arba paskambinkite +370 60 70 40 30 — pasiūlymą pateiksime per 1 darbo dieną.",
    },
    {
      q: "Kokia žarna tinka drožlėms ir dulkėms nusiurbti?",
      a: "Medienos drožlėms ir dulkėms rekomenduojamos PUR žarnos su plieno spirale: jos labai atsparios dilimui ir antistatinės.",
    },
    {
      q: "Kokia žarna atlaiko aukštą temperatūrą?",
      a: "Karštiems garams ir dujoms — KLIN tipo žarnos iš stiklo pluošto ir termoaudinių (iki +1100 °C) arba nerūdijančio plieno metalinės žarnos (iki +650 °C).",
    },
  ],
  ru: [
    {
      q: "Какие технические рукава продаёт Riko Market?",
      a: "Рукава из ПВХ, полиуретана (ПУ), рукава типа КЛИН (из технических тканей) и металлорукава, а также соединения Camlock и STORZ и хомуты. Диаметры от нескольких миллиметров до 1150 мм, рабочие температуры до +1100 °C.",
    },
    {
      q: "Доставляете ли вы рукава по всей Литве?",
      a: "Да. Отправляем со склада в Электренае в Вильнюс, Каунас, Клайпеду, Шяуляй, Паневежис и другие города; доставка занимает 1–3 рабочих дня.",
    },
    {
      q: "Как узнать цену рукава?",
      a: "Цена зависит от диаметра, длины и количества. Отправьте запрос или позвоните +370 60 70 40 30 — предложение пришлём в течение 1 рабочего дня.",
    },
    {
      q: "Какой рукав подходит для стружки и пыли?",
      a: "Для древесной стружки и пыли рекомендуем полиуретановые рукава со стальной спиралью: они очень износостойкие и антистатические.",
    },
    {
      q: "Какой рукав выдерживает высокую температуру?",
      a: "Для горячих газов и паров — рукава КЛИН из стекловолокна и термотканей (до +1100 °C) или металлорукава из нержавеющей стали (до +650 °C).",
    },
  ],
};
