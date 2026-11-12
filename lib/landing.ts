// Search landing pages: one page per hose type (category) and one per city.
//
// These exist because people search "PVC žarnos", "metalinės žarnos",
// "techninės žarnos Vilniuje", "Camlock jungtys" — and before this the site had
// no URL that matched any of those queries (categories were only a
// ?category= filter on /products). Everything here is hand-written per locale;
// spec ranges (DN, °C) are computed from the catalogue so they never drift.
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
  // Sub-pages of a category (Camlock / STORZ / clamps inside "sujungimo
  // elementai"): the parent landing's slug and the test that picks this
  // family out of the category. Matched against the Lithuanian record, so both
  // languages list the same products — see lib/landing-products.ts.
  parent?: string;
  match?: (p: Product) => boolean;
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
          "PVC (polivinilchlorido) žarnos — lanksčios, lengvos ir ekonomiškos; kasdienėje kalboje jos dažnai vadinamos tiesiog šlangomis. Armuotos spyruoklinės vielos arba kieto PVC spirale, jos atlaiko vakuumą ir tinka orui, dulkėms, vandeniui, grūdams bei kitoms biriosioms medžiagoms transportuoti.",
          "Asortimente — lengvos ir sunkios konstrukcijos spiralinės žarnos su plieno arba PVC spirale, vakuuminės, antistatinės sprogioms aplinkoms, taip pat žemės ūkio, laistymo ir purškimo žarnos. Žarnos siunčiamos iš sandėlio Elektrėnuose į bet kurį Lietuvos miestą.",
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
          "Рукава из ПВХ (поливинилхлорида), которые часто называют просто ПВХ-шлангами, — гибкие, лёгкие и экономичные. Армированные спиралью из пружинной стали или жёсткого ПВХ, они держат вакуум и подходят для воздуха, пыли, воды, зерна и других сыпучих материалов.",
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
        h1: "Poliuretano (PU / PUR) žarnos",
        keyword: "PUR žarna",
        description:
          "Poliuretano (PUR) žarnos drožlių, dulkių ir granulių nusiurbimui: lengvos, sunkios ir vakuuminės konstrukcijos, antistatinės. Pristatymas visoje Lietuvoje.",
        intro: [
          "PUR (poliuretano) žarnos, dar vadinamos PU žarnomis, — atspariausias dilimui pasirinkimas: poliuretanas dyla apie 100 kartų lėčiau nei PVC ir lenkia net atspariausią gumą. Žarnos antistatinės ir išlaiko savybes esant žemai temperatūrai.",
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
          "Рукава из полиуретана (ПУ), или полиуретановые шланги, — самый износостойкий вариант: полиуретан истирается примерно в 100 раз медленнее ПВХ и превосходит даже самую стойкую резину. Рукава антистатические и сохраняют свойства на морозе.",
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
          "KLIN tipo žarnos iš techninių audinių: teflono, silikono, stiklo pluošto, neopreno. Ventiliacijai ir karštiems garams iki +1100 °C. Pristatymas po Lietuvą.",
        intro: [
          "KLIN tipo žarnos gaminamos iš techninių audinių su plieno vielos spirale. Jos itin lanksčios, lengvai suspaudžiamos ir naudojamos vėdinimo sistemose, karštų dujų ir chemikalų garų ištraukimui.",
          "Medžiaga parenkama pagal temperatūrą ir terpę: PVC ir poliuretanas — įprastai ventiliacijai, teflonas ir silikonas — chemijai ir iki +260 °C, stiklo pluoštas ir termoaudiniai — karštiems išmetimams iki +1100 °C.",
        ],
        faq: [
          {
            q: "Kokia žarna atlaiko aukščiausią temperatūrą?",
            a: "KLIN K9/B (stiklo pluoštas + nerūdijančio metalo tinklas + termoaudinys) — iki +1100 °C. Iki +500 °C tinka K9/A, iki +260 °C — teflono ir silikono žarnos.",
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
          "Рукава типа КЛИН из технических тканей: тефлон, силикон, стекловолокно, неопрен. Для вентиляции и горячих газов до +1100 °C. Доставка по всей Литве.",
        intro: [
          "Рукава (шланги) типа КЛИН изготавливаются из технических тканей со спиралью из стальной проволоки. Они очень гибкие, легко сжимаются и применяются в вентиляции, для отвода горячих газов и паров химикатов.",
          "Материал подбирается по температуре и среде: ПВХ и полиуретан — для обычной вентиляции, тефлон и силикон — для химии и до +260 °C, стекловолокно и термоткани — для горячих выбросов до +1100 °C.",
        ],
        faq: [
          {
            q: "Какой рукав выдерживает самую высокую температуру?",
            a: "КЛИН K9/B (стекловолокно + сетка из нержавеющей стали + термоткань) — до +1100 °C. До +500 °C подходит K9/A, до +260 °C — тефлоновые и силиконовые рукава.",
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
          "Metalinės žarnos Metalhex iš cinkuoto ir nerūdijančio plieno: išmetamosioms dujoms, karštam orui iki +650 °C. Pristatymas visoje Lietuvoje.",
        intro: [
          "Metalinės žarnos (metalorukavai) gaminamos iš cinkuoto arba nerūdijančio plieno juostos. Jos atlaiko aukštą temperatūrą ir mechaninį poveikį, todėl naudojamos variklių išmetamosioms dujoms, karštam orui ir dūmams šalinti.",
          "Cinkuoto plieno Metalhex A / B / B1 tinka iki +300…+500 °C, nerūdijančio plieno Metalhex inox C / D / D1 — iki +650 °C. Sandarumui — silikono arba stiklo pluošto sandariklis.",
        ],
        faq: [
          {
            q: "Kada rinktis nerūdijančio plieno žarną?",
            a: "Kai temperatūra viršija +500 °C arba aplinka drėgna ir korozinė — nerūdijančio plieno Metalhex inox žarnos atlaiko iki +650 °C.",
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
          "Металлорукава Metalhex из оцинкованной и нержавеющей стали: для выхлопных газов и горячего воздуха до +650 °C. Доставка по всей Литве.",
        intro: [
          "Металлорукава (металлические шланги) изготавливаются из оцинкованной или нержавеющей стальной ленты. Они выдерживают высокую температуру и механические нагрузки, поэтому применяются для отвода выхлопных газов двигателей, горячего воздуха и дыма.",
          "Оцинкованные Metalhex A / B / B1 рассчитаны на +300…+500 °C, нержавеющие Metalhex inox C / D / D1 — до +650 °C. Для герметичности — уплотнитель из силикона или стекловолокна.",
        ],
        faq: [
          {
            q: "Когда выбирать металлорукав из нержавеющей стали?",
            a: "Когда температура выше +500 °C или среда влажная и коррозионная — нержавеющие Metalhex inox выдерживают до +650 °C.",
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
        title: "Žarnų jungtys ir apkabos: Camlock, STORZ, sąvaržos",
        h1: "Žarnų jungtys ir apkabos",
        keyword: "jungtis",
        description:
          "Greitosios jungtys Camlock (aliuminis, nerūdijantis plienas, polipropilenas), STORZ jungtys, tarpikliai ir žarnų apkabos. Sandėlys Elektrėnuose.",
        intro: [
          "Viskas žarnoms sujungti ir pritvirtinti: greitosios Camlock jungtys (tipai A, B, C, D, E, F, DC, DP ir perėjikliai) iš aliuminio, nerūdijančio plieno ir polipropileno, STORZ jungtys, antgaliai žarnų sujungimams, EPDM ir NBR tarpikliai.",
          "Taip pat — sraigtinės, galingosios, spyruoklinės ir plastikinės žarnų apkabos (sąvaržos) nuo mažiausių iki 265 mm diametro žarnų. Jungtis ir apkabas galima užsisakyti kartu su žarnomis.",
        ],
        faq: [
          {
            q: "Kuo skiriasi Camlock A ir C tipai?",
            a: "A tipas — adapteris su žiediniu grioveliu ir vidiniu sriegiu, C tipas — mova su kumšteliais ir antgaliu žarnai. Žarną su C tipo mova greitai prijungsite prie įrangos su A tipo adapteriu.",
          },
          {
            q: "Kokį tarpiklį rinktis Camlock jungčiai?",
            a: "NBR — naftos produktams ir alyvoms, EPDM — vandeniui, rūgštims ir šarmams. Kilus abejonių, patikrinkite cheminio atsparumo lentelę.",
          },
        ],
      },
      ru: {
        title: "Соединения и хомуты для рукавов: Camlock, STORZ",
        h1: "Соединения и хомуты для рукавов",
        keyword: "соединение",
        description:
          "Быстроразъёмные соединения Camlock (алюминий, нержавейка, полипропилен), соединения STORZ, уплотнители и хомуты для рукавов. Склад в Электренае.",
        intro: [
          "Всё для соединения и крепления рукавов и шлангов: быстроразъёмные соединения Camlock (типы A, B, C, D, E, F, DC, DP и переходники) из алюминия, нержавеющей стали и полипропилена, соединения STORZ, уплотнители из EPDM и NBR.",
          "А также червячные, силовые, пружинные и пластиковые хомуты — от самых малых до 265 мм. Соединения и хомуты можно заказать вместе с рукавами.",
        ],
        faq: [
          {
            q: "Чем отличаются Camlock типа A и C?",
            a: "Тип A — адаптер с кольцевой канавкой и внутренней резьбой, тип C — муфта с кулачками и штуцером под рукав. Рукав с муфтой типа C быстро подключается к оборудованию с адаптером типа A.",
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

// ── Fittings, one page per coupling system ────────────────────────────────
// People search "Camlock jungtys", "Storz jungtys" and "sąvaržos" separately,
// so the fittings category also gets three narrower pages. Products are picked
// by name; anything that matches none of them (Tankwagen gaskets, the
// "Eglutė" repair fitting, cable ties) stays on the parent page only.

export const FITTINGS_CATEGORY = "elementi-ziednannya";
const FITTINGS_SLUG = "sujungimo-elementai";

export const isCamlock = (p: Pick<Product, "name">) => /camlock/i.test(p.name);
export const isStorz = (p: Pick<Product, "name">) => /storz/i.test(p.name);
export const isClamp = (p: Pick<Product, "name">) => /apkab/i.test(p.name);

export const fittingLandings: CategoryLanding[] = [
  {
    slug: "camlock-jungtys",
    categoryId: FITTINGS_CATEGORY,
    parent: FITTINGS_SLUG,
    match: isCamlock,
    copy: {
      lt: {
        title: "Camlock jungtys: aliuminis, nerūdijantis plienas, PP",
        h1: "Camlock jungtys",
        keyword: "Camlock jungtis",
        description:
          "Greitosios Camlock jungtys: tipai A, B, C, D, E, F, DC, DP, AF ir perėjikliai iš aliuminio, nerūdijančio plieno, polipropileno. EPDM ir NBR tarpikliai.",
        intro: [
          "Camlock (Cam and Groove) — greitojo atjungimo jungtis iš dviejų dalių: movos su kumšteliais ir adapterio su žiediniu grioveliu. Ji leidžia greitai ir patikimai sujungti žarnas tarpusavyje arba prijungti žarną prie įrangos, cisternų ir rezervuarų.",
          "Aliumininės Camlock jungtys tiekiamos A, B, C, D ir AF tipų, taip pat perėjikliai AA, AR, BR, CR, DA, DD, DR ir ER; polipropileninės — DC, DP, E ir F tipų. Asortimente yra ir nerūdijančio plieno perėjiklis AA, taip pat EPDM ir NBR sandarinimo žiedai. Camlock naudojamos vandeniui perpumpuoti, kuro cisternose, žemės ūkyje, statybose ir maisto pramonėje.",
        ],
        faq: [
          {
            q: "Kuo skiriasi Camlock A ir C tipai?",
            a: "A tipas — adapteris su žiediniu grioveliu ir vidiniu sriegiu, C tipas — mova su kumšteliais ir antgaliu žarnai. Žarną su C tipo mova greitai prijungsite prie įrangos su A tipo adapteriu.",
          },
          {
            q: "Kokį tarpiklį rinktis Camlock jungčiai?",
            a: "NBR — naftos produktams ir alyvoms, EPDM — vandeniui, rūgštims ir šarmams. Kilus abejonių, patikrinkite cheminio atsparumo lentelę.",
          },
          {
            q: "Kokių dydžių būna Camlock jungtys?",
            a: "Aliumininės Camlock jungtys — nuo 1/2″ iki 6″ (DN 13–150 mm), polipropileninės — DN 13–125 mm.",
          },
        ],
      },
      ru: {
        title: "Соединения Camlock: алюминий, нержавеющая сталь, полипропилен",
        h1: "Соединения Camlock",
        keyword: "соединение Camlock",
        description:
          "Быстроразъёмные соединения Camlock: типы A, B, C, D, E, F, DC, DP, AF и переходники из алюминия, нержавеющей стали и полипропилена. Уплотнители EPDM и NBR.",
        intro: [
          "Camlock (Cam and Groove) — быстроразъёмное соединение из двух частей: муфты с кулачками и адаптера с кольцевой канавкой. Оно позволяет быстро и надёжно соединить рукава (шланги) между собой или подключить рукав к оборудованию, цистернам и резервуарам.",
          "Алюминиевые соединения Camlock поставляются типов A, B, C, D и AF, а также переходники AA, AR, BR, CR, DA, DD, DR и ER; полипропиленовые — типов DC, DP, E и F. В ассортименте также переходник AA из нержавеющей стали и уплотнительные кольца из EPDM и NBR. Camlock применяют для перекачки воды, на топливных цистернах, в сельском хозяйстве, строительстве и пищевой промышленности.",
        ],
        faq: [
          {
            q: "Чем отличаются Camlock типа A и C?",
            a: "Тип A — адаптер с кольцевой канавкой и внутренней резьбой, тип C — муфта с кулачками и штуцером под рукав. Рукав с муфтой типа C быстро подключается к оборудованию с адаптером типа A.",
          },
          {
            q: "Какой уплотнитель выбрать для Camlock?",
            a: "NBR — для нефтепродуктов и масел, EPDM — для воды, кислот и щелочей. Если сомневаетесь, сверьтесь с таблицей химической стойкости.",
          },
          {
            q: "Каких размеров бывают соединения Camlock?",
            a: "Алюминиевые соединения Camlock — от 1/2″ до 6″ (DN 13–150 мм), полипропиленовые — DN 13–125 мм.",
          },
        ],
      },
    },
  },
  {
    slug: "storz-jungtys",
    categoryId: FITTINGS_CATEGORY,
    parent: FITTINGS_SLUG,
    match: isStorz,
    copy: {
      lt: {
        title: "STORZ jungtys ir tarpikliai",
        h1: "STORZ jungtys",
        keyword: "STORZ jungtis",
        description:
          "STORZ jungtys su vidiniu ir išoriniu BSP sriegiu bei antgaliu žarnai, NBR tarpikliai. Iš aliuminio, nerūdijančio plieno AISI316 ir žalvario, iki 16 bar.",
        intro: [
          "STORZ — greitoji jungtis, kuri sujungiama ir atjungiama pasukus 120°. Tokios jungtys naudojamos skysčiams ir biriems produktams transportuoti: priešgaisrinėje apsaugoje, naftos perdirbimo gamyklose, žemės ūkyje ir statybose.",
          "Tiekiame STORZ jungtis su vidiniu ir išoriniu BSP sriegiu bei su antgaliu žarnai, taip pat alyvai ir benzinui atsparius NBR tarpiklius. Jungtys gaminamos iš aliuminio, nerūdijančio plieno AISI316 ir žalvario, maksimalus darbinis slėgis — 16 bar.",
        ],
        faq: [
          {
            q: "Kokių dydžių būna STORZ jungtys?",
            a: "Dydis žymimas pagal DIN atstumą tarp atramų: 25-D — 31 mm, 52-C — 66 mm, 75-B — 89 mm, 110-A — 133 mm.",
          },
          {
            q: "Kokį slėgį atlaiko STORZ jungtis?",
            a: "Maksimalus darbinis slėgis — 16 bar. Tiek pat atlaiko ir NBR tarpiklis STORZ jungtims.",
          },
        ],
      },
      ru: {
        title: "Соединения STORZ и уплотнители",
        h1: "Соединения STORZ",
        keyword: "соединение STORZ",
        description:
          "Соединения STORZ с внутренней и наружной резьбой BSP и с хвостовиком под шланг, уплотнители NBR. Алюминий, нержавеющая сталь AISI316, латунь, до 16 бар.",
        intro: [
          "STORZ — быстроразъёмное соединение, которое соединяется и разъединяется поворотом на 120°. Такие соединения используют для транспортировки жидкостей и сыпучих продуктов: в противопожарной защите, на нефтеперерабатывающих заводах, в сельском хозяйстве и строительстве.",
          "Поставляем соединения STORZ с внутренней и наружной резьбой BSP и с хвостовиком под шланг, а также стойкие к маслу и бензину уплотнители из NBR. Соединения изготавливаются из алюминия, нержавеющей стали AISI316 и латуни, максимальное рабочее давление — 16 бар.",
        ],
        faq: [
          {
            q: "Каких размеров бывают соединения STORZ?",
            a: "Размер обозначается по DIN — расстоянию между опорами: 25-D — 31 мм, 52-C — 66 мм, 75-B — 89 мм, 110-A — 133 мм.",
          },
          {
            q: "Какое давление выдерживает соединение STORZ?",
            a: "Максимальное рабочее давление — 16 бар. Столько же выдерживает и уплотнитель NBR для соединений STORZ.",
          },
        ],
      },
    },
  },
  {
    slug: "zarnu-apkabos",
    categoryId: FITTINGS_CATEGORY,
    parent: FITTINGS_SLUG,
    match: isClamp,
    copy: {
      lt: {
        title: "Žarnų apkabos (sąvaržos): sraigtinės, galingosios, spyruoklinės",
        h1: "Žarnų apkabos",
        keyword: "žarnų apkaba",
        description:
          "Žarnų apkabos (sąvaržos): sraigtinės, galingosios, spyruoklinės ir plastikinės, cinkuotos ir nerūdijančios W1, W2, W4. Sandėlys Elektrėnuose.",
        intro: [
          "Žarnų apkabos (sąvaržos) tvirtina žarną ant atvamzdžio ar antgalio. Tiekiame sraigtines, galingąsias, spyruoklines ir plastikines apkabas — nuo mažų „Mini“ apkabų iki apkabų 265 mm skersmens žarnoms.",
          "Pagal medžiagą apkabos skirstomos į W1 (cinkuotas varžtas ir juosta), W2 (cinkuotas varžtas ir nerūdijanti juosta) ir W4 (nerūdijantis varžtas ir juosta). W2 ir W4 apkabos atsparios korozijai ir cheminėms medžiagoms.",
        ],
        faq: [
          {
            q: "Kokią apkabą rinktis žarnai su spirale?",
            a: "Standžioms žarnoms su spirale, stora sienele, dideliu slėgiu ar vakuumu skirtos galingosios apkabos. Jos atsparios vibracijai ir leidžia priveržti dideliu momentu.",
          },
          {
            q: "Kam skirtos spyruoklinės apkabos?",
            a: "Dujų, aušinimo skysčio ir benzino žarnoms tvirtinti, pavyzdžiui, automobilių aušinimo sistemose. Spyruoklė išlaiko vienodą radialinę jėgą kintant temperatūrai, todėl žarna nenuslysta nuo atvamzdžio.",
          },
          {
            q: "Kuo skiriasi W1, W2 ir W4 apkabos?",
            a: "W1 — cinkuotas varžtas ir juosta, W2 — cinkuotas varžtas ir nerūdijanti juosta, W4 — nerūdijantis varžtas ir juosta. Korozinei ar cheminei aplinkai rinkitės W2 arba W4.",
          },
        ],
      },
      ru: {
        title: "Хомуты для рукавов: червячные, силовые, пружинные",
        h1: "Хомуты для рукавов",
        keyword: "хомут",
        description:
          "Хомуты для рукавов и шлангов: червячные, силовые, пружинные и пластиковые, оцинкованные и нержавеющие W1, W2, W4. Склад в Электренае.",
        intro: [
          "Хомуты крепят рукав (шланг) на патрубке или штуцере. Поставляем червячные, силовые, пружинные и пластиковые хомуты — от маленьких хомутов «Мини» до хомутов для рукавов диаметром 265 мм.",
          "По материалу хомуты делятся на W1 (оцинкованные винт и лента), W2 (оцинкованный винт и нержавеющая лента) и W4 (нержавеющие винт и лента). Хомуты W2 и W4 стойки к коррозии и химическим веществам.",
        ],
        faq: [
          {
            q: "Какой хомут выбрать для рукава со спиралью?",
            a: "Для жёстких рукавов со спиралью, толстой стенкой, высоким давлением или вакуумом предназначены силовые хомуты. Они устойчивы к вибрации и позволяют затягивать с большим моментом.",
          },
          {
            q: "Для чего нужны пружинные хомуты?",
            a: "Для крепления шлангов газа, охлаждающей жидкости и бензина, например в системах охлаждения автомобилей. Пружина сохраняет равномерное радиальное усилие при перепадах температуры, поэтому рукав не соскальзывает с патрубка.",
          },
          {
            q: "Чем отличаются хомуты W1, W2 и W4?",
            a: "W1 — оцинкованные винт и лента, W2 — оцинкованный винт и нержавеющая лента, W4 — нержавеющие винт и лента. Для коррозионной или химической среды выбирайте W2 или W4.",
          },
        ],
      },
    },
  },
];

// Every page under /products/category/: the five categories and their sub-pages.
export const allCategoryLandings: CategoryLanding[] = [...categoryLandings, ...fittingLandings];

const landingBySlug = new Map(allCategoryLandings.map((c) => [c.slug, c]));
const landingByCat = new Map(categoryLandings.map((c) => [c.categoryId, c]));

export const categoryLandingBySlug = (slug: string) => landingBySlug.get(slug);
export const categoryLandingFor = (categoryId: string) => landingByCat.get(categoryId);
export const childLandings = (slug: string) => fittingLandings.filter((c) => c.parent === slug);

export { categoryPath } from "@/lib/category-paths";

// ── Hoses by use ("Žarnos drožlėms", "ventiliacijos žarnos"…) ───────────────
// Competitors organise hoses by what they carry, and that is how people
// search. Each page lists the catalogue items whose `industries` contain the
// tag, so the list follows data/products.json. "exhaust" is a product tag
// only — it is deliberately not an industry in lib/industries.ts.

type PurposeCopy = {
  title: string;
  h1: string;
  description: string; // meta description, ≤ 158 chars
  intro: string[];
  choose: string[]; // "how to choose" — only what the catalogue says
  faq: Faq[];
};

export type PurposeLanding = {
  slug: string; // URL: /zarnos/<slug>
  tag: string; // products.json `industries` tag
  copy: Record<Locale, PurposeCopy>;
};

export const purposeLandings: PurposeLanding[] = [
  {
    slug: "drozlems-ir-dulkems",
    tag: "wood",
    copy: {
      lt: {
        title: "Žarnos drožlėms ir dulkėms: PUR, PVC ir metalinės",
        h1: "Žarnos drožlėms ir dulkėms",
        description:
          "Žarnos drožlėms ir dulkėms nusiurbti: PUR ir PVC su plieno spirale, Aspirato, metalinės Metalhex. Medienos apdirbimui ir CNC staklėms, pristatymas po Lietuvą.",
        intro: [
          "Drožlių ir medienos dulkių nusiurbimo sistemoms reikia žarnų, kurios atlaiko dilimą ir išlaiko formą esant vakuumui. Čia surinktos žarnos, kurias tiekiame medienos apdirbimui: baldų gamybai, masyvo apdirbimui, CNC staklėms, granulių linijoms ir drožlių siurbliams.",
          "Asortimente — poliuretano (PUR) ir PVC žarnos su spyruoklinės vielos spirale, lengvos Aspirato ir Aspirato PU žarnos su kieto PVC spirale, taip pat metalinės Metalhex žarnos, kai be atsparumo dilimui svarbi ir temperatūra.",
        ],
        choose: [
          "Abrazyvinėms drožlėms ir dulkėms — PUR žarnos su plieno spirale: poliuretanas dyla apie 100 kartų lėčiau nei PVC, o įžeminta spiralė nuveda statinį krūvį.",
          "Kai dilimas nedidelis — PVC žarnos su plieno spirale (A ir C tipai): lengvos, lanksčios ir pigesnės už PUR.",
          "Konstrukciją — lengvą, sunkią ar vakuuminę — parenkame pagal oro greitį ir vakuumą Jūsų sistemoje.",
          "Kai svarbus atsparumas ir temperatūrai, ir mechaniniams pažeidimams — cinkuoto plieno Metalhex žarnos: iki +300…+500 °C, atitinka ATEX direktyvos reikalavimus.",
        ],
        faq: [
          {
            q: "Kokia žarna geriausia drožlių nusiurbimui?",
            a: "Drožlėms ir medienos dulkėms rekomenduojamos PUR žarnos su plieno spirale — jos atsparios dilimui ir antistatinės. Konstrukciją parenkame pagal oro greitį ir vakuumą Jūsų sistemoje.",
          },
          {
            q: "Ar PUR žarnos nuveda statinį krūvį?",
            a: "Taip, poliuretano žarnos su plieno spirale yra antistatinės, jei spiralė įžeminta.",
          },
          {
            q: "Kokio ilgio tiekiamos žarnos?",
            a: "PUR ir PVC žarnos su plieno spirale — standartiškai 10 m, suderinus iki 20 m; metalinės Metalhex — 5 m arba 10 m.",
          },
        ],
      },
      ru: {
        title: "Рукава для стружки и пыли: ПУ, ПВХ и металлорукава",
        h1: "Рукава для стружки и пыли",
        description:
          "Рукава для аспирации стружки и пыли: ПУ и ПВХ со стальной спиралью, Aspirato, металлорукава Metalhex. Для деревообработки и станков с ЧПУ. Доставка по Литве.",
        intro: [
          "Системам аспирации стружки и древесной пыли нужны рукава, которые выдерживают истирание и держат форму при разрежении. Здесь собраны рукава, которые мы поставляем для деревообработки: производства мебели, обработки массива, станков с ЧПУ, линий гранулирования и стружкоотсосов.",
          "В ассортименте — полиуретановые (ПУ) и ПВХ-рукава (шланги) со спиралью из пружинной проволоки, лёгкие рукава Aspirato и Aspirato PU со спиралью из жёсткого ПВХ, а также металлорукава Metalhex — когда кроме износостойкости важна и температура.",
        ],
        choose: [
          "Для абразивной стружки и пыли — рукава ПУ со стальной спиралью: полиуретан истирается примерно в 100 раз медленнее ПВХ, а заземлённая спираль отводит статический заряд.",
          "Когда износ невелик — рукава ПВХ со стальной спиралью (типы A и C): лёгкие, гибкие и дешевле ПУ.",
          "Конструкцию — лёгкую, тяжёлую или вакуумную — подберём по скорости воздуха и разрежению в вашей системе.",
          "Когда важна стойкость и к температуре, и к механическим повреждениям — металлорукава Metalhex из оцинкованной стали: до +300…+500 °C, соответствуют требованиям директивы ATEX.",
        ],
        faq: [
          {
            q: "Какой рукав лучше для удаления стружки?",
            a: "Для стружки и древесной пыли рекомендуем рукава ПУ со стальной спиралью — они износостойкие и антистатические. Конструкцию подберём по скорости воздуха и разрежению в вашей системе.",
          },
          {
            q: "Отводят ли рукава ПУ статический заряд?",
            a: "Да, рукава ПУ со стальной спиралью антистатические при условии заземления спирали.",
          },
          {
            q: "Какой длины поставляются рукава?",
            a: "Рукава ПУ и ПВХ со стальной спиралью — стандартно 10 м, по согласованию до 20 м; металлорукава Metalhex — 5 или 10 м.",
          },
        ],
      },
    },
  },
  {
    slug: "ventiliacijai",
    tag: "vent",
    copy: {
      lt: {
        title: "Ventiliacijos žarnos: KLIN, PVC ir metalinės iki +1100 °C",
        h1: "Ventiliacijos žarnos",
        description:
          "Ventiliacijos žarnos iš techninių audinių (KLIN), PVC ir metalo: karštam orui ir chemikalų garams iki +1100 °C, DN iki 1150 mm. Pristatymas po Lietuvą.",
        intro: [
          "Ventiliacijos žarnos (lankstūs ortakiai) naudojamos vėdinimo sistemose, karšto oro, dūmų ir chemikalų garų ištraukimui. Tiekiame žarnas ir įprastam vėdinimui, ir aukštoms bei žemoms temperatūroms, cheminiams garams ir sprogioms aplinkoms, pavyzdžiui, šachtoms.",
          "Didžiausią pasirinkimą sudaro KLIN tipo žarnos iš techninių audinių su plieno vielos spirale — jos itin lanksčios ir lengvai suspaudžiamos. Taip pat tiekiame PVC žarnas su plieno spirale, antistatines liutniovinilo žarnas ir metalines Metalhex žarnas.",
        ],
        choose: [
          "Įprastam vėdinimui — KLIN žarnos iš PVC ar poliuretano arba PVC žarnos su plieno spirale.",
          "Chemikalų garams ir iki +260 °C — teflono (PTFE) ir silikono KLIN žarnos.",
          "Karštiems išmetimams — stiklo pluošto KLIN žarnos (iki +1100 °C) arba nerūdijančio plieno Metalhex inox (iki +650 °C).",
          "Sprogioms aplinkoms — antistatinės liutniovinilo žarnos (KLIN K7 ir PVC žarna) arba ATEX direktyvos reikalavimus atitinkančios Metalhex žarnos.",
        ],
        faq: [
          {
            q: "Kokia ventiliacijos žarna atlaiko aukščiausią temperatūrą?",
            a: "KLIN K9/B (stiklo pluoštas + nerūdijančio metalo tinklas + termoaudinys) — iki +1100 °C. Iki +500 °C tinka K9/A, iki +260 °C — teflono ir silikono žarnos.",
          },
          {
            q: "Kokio skersmens būna ventiliacijos žarnos?",
            a: "KLIN tipo žarnos — iki 1150 mm (daugumos tipų nuo 50 mm), PVC žarnos su plieno spirale — 20–650 mm, metalinės Metalhex — 18–337 mm.",
          },
          {
            q: "Kokią žarną rinktis chemikalų garams?",
            a: "Agresyviems garams dažniausiai rekomenduojamos teflono (PTFE) žarnos. Patikrinkite medžiagą cheminio atsparumo lentelėje arba paklauskite mūsų inžinierių.",
          },
        ],
      },
      ru: {
        title: "Рукава для вентиляции: КЛИН, ПВХ и металлорукава до +1100 °C",
        h1: "Рукава для вентиляции",
        description:
          "Рукава для вентиляции из технических тканей (КЛИН), ПВХ и металла: для горячего воздуха и паров химикатов до +1100 °C, DN до 1150 мм. Доставка по Литве.",
        intro: [
          "Вентиляционные рукава (гибкие воздуховоды) применяются в системах вентиляции, для отвода горячего воздуха, дыма и паров химикатов. Поставляем рукава и для обычной вентиляции, и для высоких и низких температур, химических паров и взрывоопасных сред, например шахт.",
          "Самый широкий выбор — рукава типа КЛИН из технических тканей со спиралью из стальной проволоки: они очень гибкие и легко сжимаются. Также поставляем ПВХ-рукава (шланги) со стальной спиралью, антистатические рукава из лютниовинила и металлорукава Metalhex.",
        ],
        choose: [
          "Для обычной вентиляции — рукава КЛИН из ПВХ или полиуретана либо ПВХ-рукава со стальной спиралью.",
          "Для паров химикатов и до +260 °C — тефлоновые (PTFE) и силиконовые рукава КЛИН.",
          "Для горячих выбросов — рукава КЛИН из стекловолокна (до +1100 °C) или металлорукава Metalhex inox из нержавеющей стали (до +650 °C).",
          "Для взрывоопасных сред — антистатические рукава из лютниовинила (КЛИН K7 и ПВХ-рукав) или металлорукава Metalhex, соответствующие требованиям директивы ATEX.",
        ],
        faq: [
          {
            q: "Какой рукав для вентиляции выдерживает самую высокую температуру?",
            a: "КЛИН K9/B (стекловолокно + сетка из нержавеющей стали + термоткань) — до +1100 °C. До +500 °C подходит K9/A, до +260 °C — тефлоновые и силиконовые рукава.",
          },
          {
            q: "Какого диаметра бывают рукава для вентиляции?",
            a: "Рукава типа КЛИН — до 1150 мм (большинство типов от 50 мм), ПВХ-рукава со стальной спиралью — 20–650 мм, металлорукава Metalhex — 18–337 мм.",
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
    slug: "maisto-pramonei",
    tag: "food",
    copy: {
      lt: {
        title: "Žarnos maisto pramonei: gėrimams, pienui ir grūdams",
        h1: "Žarnos maisto pramonei",
        description:
          "Žarnos maisto pramonei: skaidrios PVC žarnos skystiems maisto produktams, pienui ir gėrimams iki 20 % alkoholio, PU žarnos grūdams. Pristatymas po Lietuvą.",
        intro: [
          "Maisto pramonėje žarnomis tiekiami skysti maisto produktai (pienas, sultys, vynas ir kiti gėrimai), taip pat transportuojami grūdai ir kiti birūs produktai.",
          "Šiame puslapyje — žarnos, kurių aprašyme nurodyta, kad jos tinka maisto produktams: skaidrios PVC žarnos CRISTALIX ir CRISTALIXPRESS bei slėginės-siurbimo žarnos GRAIN PRESS ir GRAIN PRESS PU su kieto PVC spirale.",
        ],
        choose: [
          "Skystiems maisto produktams ir mažiems diametrams — CRISTALIX (2–12,5 mm, maistinis PVC) arba sintetiniu kordu armuota CRISTALIXPRESS (4–15 mm).",
          "Pienui ir gėrimams, kuriuose yra iki 20 % alkoholio, — CRISTALIXPRESS arba GRAIN PRESS.",
          "Grūdams ir kitoms abrazyvinėms birioms medžiagoms — GRAIN PRESS PU: poliuretano sluoksnis daug atsparesnis dilimui.",
          "Darbinė temperatūra — iki +60 °C, GRAIN PRESS PU — iki +80 °C.",
        ],
        faq: [
          {
            q: "Kokios žarnos tinka pienui ir gėrimams?",
            a: "CRISTALIXPRESS ir GRAIN PRESS žarnos naudojamos vandeniui, pienui ir gėrimams, kuriuose yra iki 20 % alkoholio. Mažiems diametrams yra maistinio PVC žarna CRISTALIX.",
          },
          {
            q: "Kokią žarną rinktis grūdams transportuoti?",
            a: "GRAIN PRESS PU — poliuretano žarna su kieto PVC spirale, tinkanti maisto produktams ir rekomenduojama, kai reikia didelio atsparumo abrazyviniam dilimui. Grūdams naudojama ir PVC žarna GRAIN PRESS.",
          },
          {
            q: "Kokioje temperatūroje galima naudoti šias žarnas?",
            a: "CRISTALIX, CRISTALIXPRESS ir GRAIN PRESS — nuo −10 iki +60 °C, GRAIN PRESS PU — nuo −20 iki +80 °C.",
          },
        ],
      },
      ru: {
        title: "Рукава для пищевой промышленности: напитки, молоко, зерно",
        h1: "Рукава для пищевой промышленности",
        description:
          "Рукава для пищевой промышленности: прозрачные ПВХ-рукава для жидких продуктов, молока и напитков до 20 % алкоголя, ПУ-рукава для зерна. Доставка по Литве.",
        intro: [
          "В пищевой промышленности по рукавам подают жидкие пищевые продукты (молоко, соки, вино и другие напитки), а также транспортируют зерно и другие сыпучие продукты.",
          "На этой странице — рукава, в описании которых указано, что они подходят для пищевых продуктов: прозрачные ПВХ-шланги CRISTALIX и CRISTALIXPRESS, а также напорно-всасывающие рукава GRAIN PRESS и GRAIN PRESS PU со спиралью из жёсткого ПВХ.",
        ],
        choose: [
          "Для жидких пищевых продуктов и малых диаметров — CRISTALIX (2–12,5 мм, пищевой ПВХ) или армированный синтетическим кордом CRISTALIXPRESS (4–15 мм).",
          "Для молока и напитков с содержанием алкоголя до 20 % — CRISTALIXPRESS или GRAIN PRESS.",
          "Для зерна и других абразивных сыпучих материалов — GRAIN PRESS PU: слой полиуретана гораздо устойчивее к истиранию.",
          "Рабочая температура — до +60 °C, у GRAIN PRESS PU — до +80 °C.",
        ],
        faq: [
          {
            q: "Какие рукава подходят для молока и напитков?",
            a: "Рукава CRISTALIXPRESS и GRAIN PRESS используют для воды, молока и напитков с содержанием алкоголя до 20 %. Для малых диаметров есть рукав CRISTALIX из пищевого ПВХ.",
          },
          {
            q: "Какой рукав выбрать для транспортировки зерна?",
            a: "GRAIN PRESS PU — полиуретановый рукав со спиралью из жёсткого ПВХ, подходит для пищевых продуктов и рекомендуется, когда нужна высокая стойкость к абразивному износу. Для зерна применяют и ПВХ-рукав GRAIN PRESS.",
          },
          {
            q: "При какой температуре можно использовать эти рукава?",
            a: "CRISTALIX, CRISTALIXPRESS и GRAIN PRESS — от −10 до +60 °C, GRAIN PRESS PU — от −20 до +80 °C.",
          },
        ],
      },
    },
  },
  {
    slug: "chemijos-pramonei",
    tag: "chem",
    copy: {
      lt: {
        title: "Chemiškai atsparios žarnos: teflono, PVC, nerūdijančio plieno",
        h1: "Chemiškai atsparios žarnos",
        description:
          "Chemiškai atsparios žarnos: KLIN iš teflono (PTFE), nitrilo, neopreno ir hipalono, PVC žarnos chemikalams ir trąšoms, Metalhex inox. Pagalba parenkant.",
        intro: [
          "Cheminėje pramonėje žarnomis ištraukiami agresyvūs garai galvanikos cechuose ir laboratorijose, perpumpuojami chemikalai, trąšos ir herbicidai. Tokiai žarnai svarbiausia — medžiaga, atspari konkrečiai cheminei medžiagai.",
          "Garams ištraukti tiekiame KLIN tipo žarnas iš teflono (PTFE), nitrilo, neopreno, hipalono ir PVC, skysčiams — PVC žarnas AGROCHEM ir TERRASPRAY, o karštai ir korozinei aplinkai — nerūdijančio plieno Metalhex inox žarnas.",
        ],
        choose: [
          "Agresyviems garams — teflono (PTFE) KLIN žarnos, atlaikančios iki +260 °C; yra ir antistatinė versija K1/C.",
          "Medžiagą visada patikrinkite cheminio atsparumo lentelėje: joje — PVC, PUR, silikono, teflono, nitrilo, neopreno, hipalono ir polietileno atsparumas dažniausiems chemikalams.",
          "Trąšoms ir herbicidams — TERRASPRAY, pasižyminti dideliu cheminiu atsparumu (iki 20 bar); daugelio kitų chemikalų poveikiui atspari AGROCHEM su kieto PVC spirale.",
          "Kai aplinka korozinė arba karšta — nerūdijančio plieno Metalhex inox (iki +650 °C).",
        ],
        faq: [
          {
            q: "Kokią žarną rinktis chemikalų garams?",
            a: "Agresyviems garams dažniausiai rekomenduojamos teflono (PTFE) žarnos. Patikrinkite medžiagą cheminio atsparumo lentelėje arba paklauskite mūsų inžinierių.",
          },
          {
            q: "Kaip sužinoti, ar žarnos medžiaga atspari chemikalui?",
            a: "Pasinaudokite cheminio atsparumo lentele: joje nurodyta, ar medžiaga atspari, sąlyginai atspari ar neatspari chemikalui esant 20 °C. Kadangi temperatūra, koncentracija ir kontakto trukmė gali pakeisti rezultatą, dėl konkrečių sąlygų pasitarkite su mūsų inžinieriais.",
          },
          {
            q: "Ar yra antistatinių chemiškai atsparių žarnų?",
            a: "Taip — antistatinio teflono KLIN K1/C ir antistatinio PVC KLIN K4 žarnos.",
          },
        ],
      },
      ru: {
        title: "Химически стойкие рукава: тефлон, ПВХ, нержавеющая сталь",
        h1: "Химически стойкие рукава",
        description:
          "Химически стойкие рукава: КЛИН из тефлона (PTFE), нитрила, неопрена и гипалона, ПВХ-рукава для химикатов и удобрений, Metalhex inox. Помощь в подборе.",
        intro: [
          "В химической промышленности по рукавам отводят агрессивные пары в гальванических цехах и лабораториях, перекачивают химикаты, удобрения и гербициды. Главное для такого рукава — материал, стойкий к конкретному веществу.",
          "Для отвода паров поставляем рукава типа КЛИН из тефлона (PTFE), нитрила, неопрена, гипалона и ПВХ, для жидкостей — ПВХ-шланги AGROCHEM и TERRASPRAY, а для горячей и коррозионной среды — металлорукава Metalhex inox из нержавеющей стали.",
        ],
        choose: [
          "Для агрессивных паров — тефлоновые (PTFE) рукава КЛИН, выдерживающие до +260 °C; есть и антистатическая версия K1/C.",
          "Материал всегда проверяйте по таблице химической стойкости: в ней — стойкость ПВХ, ПУ, силикона, тефлона, нитрила, неопрена, гипалона и полиэтилена к самым распространённым химикатам.",
          "Для удобрений и гербицидов — TERRASPRAY с высокой химической стойкостью (до 20 бар); к действию многих других химикатов устойчив AGROCHEM со спиралью из жёсткого ПВХ.",
          "Для коррозионной или горячей среды — металлорукава Metalhex inox из нержавеющей стали (до +650 °C).",
        ],
        faq: [
          {
            q: "Какой рукав выбрать для паров химикатов?",
            a: "Для агрессивных паров чаще всего рекомендуют тефлоновые (PTFE) рукава. Проверьте материал в таблице химической стойкости или спросите наших инженеров.",
          },
          {
            q: "Как узнать, стоек ли материал рукава к химикату?",
            a: "Воспользуйтесь таблицей химической стойкости: в ней указано, стоек ли материал, условно стоек или нестоек к химикату при 20 °C. Температура, концентрация и время контакта могут изменить результат, поэтому по конкретным условиям посоветуйтесь с нашими инженерами.",
          },
          {
            q: "Есть ли антистатические химически стойкие рукава?",
            a: "Да — рукава КЛИН K1/C из антистатического тефлона и КЛИН K4 из антистатического ПВХ.",
          },
        ],
      },
    },
  },
  {
    slug: "zemes-ukiui",
    tag: "agri",
    copy: {
      lt: {
        title: "Žarnos žemės ūkiui: grūdams, sėjamosioms, purkštuvams",
        h1: "Žarnos žemės ūkiui",
        description:
          "Žarnos žemės ūkiui: grūdams, sėjamosioms, purkštuvams ir trąšoms, pneumotransportui ir laistymui. PUR ir PVC žarnos, pristatymas visoje Lietuvoje.",
        intro: [
          "Žemės ūkyje žarnos naudojamos grūdams ir sėkloms transportuoti, sėjamosiose, granuliatoriuose, purkštuvuose, pneumotransporto sistemose, žemsiurbėse ir motopompose.",
          "Tiekiame poliuretano (PUR) žarnas su plieno spirale, plokščias PUR žarnas be spiralės, PVC slėgines-siurbimo žarnas su kieto PVC spirale, purškimo ir laistymo žarnas. Grūdams ir kitoms abrazyvinėms medžiagoms rekomenduojamos poliuretano žarnos.",
        ],
        choose: [
          "Grūdams, sėkloms ir pneumotransportui — PUR žarnos su plieno spirale arba GRAIN PRESS PU: poliuretanas dyla apie 100 kartų lėčiau nei PVC.",
          "Purkštuvams, trąšoms ir herbicidams — slėginė žarna TERRASPRAY (iki 20 bar).",
          "KAS perpumpuoti ir sėkloms iš bunkerio tiekti — Vacuum FR.",
          "Laistymui — GARDENPRESS; drėkinimo sistemoms ir nuotekų duobėms — AGROCHEM arba ELASTIC SUPER NOVA.",
        ],
        faq: [
          {
            q: "Kokia žarna tinka grūdams transportuoti?",
            a: "Grūdams rekomenduojamos poliuretano žarnos — PUR su plieno spirale arba GRAIN PRESS PU su kieto PVC spirale: jos daug atsparesnės dilimui nei PVC. Sėjamosiose sėkloms tiekti dažnai naudojamos GRAIN PRESS ir Vacuum FR žarnos.",
          },
          {
            q: "Kokia žarna tinka purkštuvams?",
            a: "TERRASPRAY — slėginė PVC žarna, armuota poliesterio siūlais, atspari trąšoms ir herbicidams; darbinis slėgis — iki 20 bar.",
          },
          {
            q: "Ar žarnos tinka darbui šaltyje?",
            a: "PUR žarnos išlaiko savybes esant žemai temperatūrai (nuo −40 °C), o ELASTIC SUPER NOVA — šalčiui atspari PVC/NBR žarna, naudojama nuo −40 °C.",
          },
        ],
      },
      ru: {
        title: "Рукава для сельского хозяйства: зерно, сеялки, опрыскиватели",
        h1: "Рукава для сельского хозяйства",
        description:
          "Рукава для сельского хозяйства: для зерна, сеялок, опрыскивателей и удобрений, пневмотранспорта и полива. Рукава ПУ и ПВХ, доставка по всей Литве.",
        intro: [
          "В сельском хозяйстве рукава используют для транспортировки зерна и семян, в сеялках, грануляторах, опрыскивателях, системах пневмотранспорта, земснарядах и мотопомпах.",
          "Поставляем полиуретановые (ПУ) рукава со стальной спиралью, плоские рукава ПУ без спирали, напорно-всасывающие ПВХ-рукава со спиралью из жёсткого ПВХ, шланги для опрыскивания и полива. Для зерна и других абразивных материалов рекомендуем полиуретановые рукава.",
        ],
        choose: [
          "Для зерна, семян и пневмотранспорта — рукава ПУ со стальной спиралью или GRAIN PRESS PU: полиуретан истирается примерно в 100 раз медленнее ПВХ.",
          "Для опрыскивателей, удобрений и гербицидов — напорный рукав TERRASPRAY (до 20 бар).",
          "Для перекачки КАС и подачи семян из бункера — Vacuum FR.",
          "Для полива — GARDENPRESS; для систем орошения и выгребных ям — AGROCHEM или ELASTIC SUPER NOVA.",
        ],
        faq: [
          {
            q: "Какой рукав подходит для транспортировки зерна?",
            a: "Для зерна рекомендуем полиуретановые рукава — ПУ со стальной спиралью или GRAIN PRESS PU со спиралью из жёсткого ПВХ: они гораздо устойчивее к истиранию, чем ПВХ. В сеялках для подачи семян часто используют рукава GRAIN PRESS и Vacuum FR.",
          },
          {
            q: "Какой рукав подходит для опрыскивателей?",
            a: "TERRASPRAY — напорный ПВХ-рукав, армированный полиэфирной нитью, стойкий к удобрениям и гербицидам; рабочее давление — до 20 бар.",
          },
          {
            q: "Подходят ли рукава для работы на морозе?",
            a: "Рукава ПУ сохраняют свойства при низких температурах (от −40 °C), а ELASTIC SUPER NOVA — морозостойкий рукав из ПВХ/NBR, который применяют от −40 °C.",
          },
        ],
      },
    },
  },
  {
    slug: "ismetamosioms-dujoms",
    tag: "exhaust",
    copy: {
      lt: {
        title: "Žarnos išmetamosioms dujoms ir karštam orui iki +1100 °C",
        h1: "Žarnos išmetamosioms dujoms ir karštam orui",
        description:
          "Žarnos išmetamosioms dujoms, dūmams ir karštam orui: KLIN iš stiklo pluošto iki +1100 °C, metalinės Metalhex iki +650 °C, DEPTAK autoservisams.",
        intro: [
          "Variklių išmetamosioms dujoms, dūmams ir karštam orui šalinti reikia žarnų, kurios atlaiko aukštą temperatūrą ir mechaninį poveikį.",
          "Tiekiame metalines Metalhex žarnas iš cinkuoto ir nerūdijančio plieno, aukštatemperatūrines KLIN tipo žarnas iš stiklo pluošto, silikono ir termoaudinių, taip pat poliuretano žarną DEPTAK, skirtą išmetamosioms dujoms šalinti autoservisuose.",
        ],
        choose: [
          "Iki +1100 °C — KLIN K9/B (stiklo pluoštas, nerūdijančio metalo tinklas ir termoaudinys); iki +500 °C — K9/A, iki +400 °C — K2/B.",
          "Variklių išmetamosioms dujoms ir dūmams — Metalhex: cinkuoto plieno iki +300…+500 °C, nerūdijančio plieno inox — iki +650 °C.",
          "Kai reikia sandarumo — Metalhex versijos su silikoniniu (B, D) arba stiklo pluošto (B1, D1) sandarikliu.",
          "Automobilių išmetamosioms dujoms autoservisuose — DEPTAK: antistatinis, dilimui atsparus poliuretanas.",
        ],
        faq: [
          {
            q: "Kokia žarna atlaiko aukščiausią temperatūrą?",
            a: "KLIN K9/B (stiklo pluoštas + nerūdijančio metalo tinklas + termoaudinys) — iki +1100 °C. Iki +500 °C tinka K9/A, iki +260 °C — teflono ir silikono žarnos.",
          },
          {
            q: "Ar metalinė žarna sandari?",
            a: "Versijos su silikoniniu (B, D) arba stiklo pluošto (B1, D1) sandarikliu yra sandarios; versijos be sandariklio (A, C) skirtos ten, kur nedidelis pralaidumas nesvarbus.",
          },
          {
            q: "Kokia žarna tinka autoserviso išmetimo sistemai?",
            a: "DEPTAK tipo poliuretano žarna — antistatinė, atspari dilimui ir deformacijai, skirta išmetamosioms dujoms šalinti autoservisuose. Skersmuo — 75–160 mm.",
          },
        ],
      },
      ru: {
        title: "Рукава для выхлопных газов и горячего воздуха до +1100 °C",
        h1: "Рукава для выхлопных газов и горячего воздуха",
        description:
          "Рукава для выхлопных газов, дыма и горячего воздуха: КЛИН из стекловолокна до +1100 °C, металлорукава Metalhex до +650 °C, DEPTAK для автосервисов.",
        intro: [
          "Для отвода выхлопных газов двигателей, дыма и горячего воздуха нужны рукава, которые выдерживают высокую температуру и механические нагрузки.",
          "Поставляем металлорукава Metalhex из оцинкованной и нержавеющей стали, высокотемпературные рукава типа КЛИН из стекловолокна, силикона и термотканей, а также полиуретановый шланг DEPTAK для удаления выхлопных газов в автосервисах.",
        ],
        choose: [
          "До +1100 °C — КЛИН K9/B (стекловолокно, сетка из нержавеющей стали и термоткань); до +500 °C — K9/A, до +400 °C — K2/B.",
          "Для выхлопных газов двигателей и дыма — Metalhex: из оцинкованной стали до +300…+500 °C, из нержавеющей стали (inox) — до +650 °C.",
          "Когда нужна герметичность — версии Metalhex с силиконовым (B, D) или стекловолоконным (B1, D1) уплотнителем.",
          "Для выхлопных газов автомобилей в автосервисах — DEPTAK: антистатический, износостойкий полиуретан.",
        ],
        faq: [
          {
            q: "Какой рукав выдерживает самую высокую температуру?",
            a: "КЛИН K9/B (стекловолокно + сетка из нержавеющей стали + термоткань) — до +1100 °C. До +500 °C подходит K9/A, до +260 °C — тефлоновые и силиконовые рукава.",
          },
          {
            q: "Герметичен ли металлорукав?",
            a: "Версии с силиконовым (B, D) или стекловолоконным (B1, D1) уплотнителем герметичны; версии без уплотнителя (A, C) — для мест, где небольшая негерметичность не важна.",
          },
          {
            q: "Какой рукав подходит для вытяжки в автосервисе?",
            a: "Полиуретановый рукав типа DEPTAK — антистатический, стойкий к истиранию и деформации, предназначен для удаления выхлопных газов в автосервисах. Диаметр — 75–160 мм.",
          },
        ],
      },
    },
  },
];

const purposeMap = new Map(purposeLandings.map((u) => [u.slug, u]));
export const purposeLandingBySlug = (slug: string) => purposeMap.get(slug);
export const purposePath = (slug: string) => `/zarnos/${slug}`;
// The use page for an industry id from lib/industries.ts ("spec" has none).
export const purposeLandingForIndustry = (industryId: string) => purposeLandings.find((u) => u.tag === industryId);

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
  // "iki +500 °C" / "+120 °C." are upper bounds only; "nuo −40 iki +80" gives
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
  if (a === null) return `${locale === "ru" ? "до" : "iki"} ${signed(b, locale)} °C`;
  return `${signed(a, locale)} … ${signed(b, locale)} °C`;
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
      a: "PVC, PUR (poliuretano), KLIN tipo (techninių audinių) ir metalines žarnas, taip pat Camlock ir STORZ jungtis bei žarnų apkabas. Diametrai nuo kelių milimetrų iki 1150 mm, darbinės temperatūros iki +1100 °C.",
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
      a: "Karštiems garams ir dujoms — KLIN tipo žarnos iš stiklo pluošto ir termoaudinių (iki +1100 °C) arba nerūdijančio plieno metalinės žarnos (iki +650 °C).",
    },
  ],
  ru: [
    {
      q: "Какие технические рукава продаёт Riko Market?",
      a: "Рукава из ПВХ, полиуретана (ПУ), рукава типа КЛИН (из технических тканей) и металлорукава, а также соединения Camlock и STORZ и хомуты. Диаметры от нескольких миллиметров до 1150 мм, рабочие температуры до +1100 °C.",
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
      a: "Для горячих газов и паров — рукава КЛИН из стекловолокна и термотканей (до +1100 °C) или металлорукава из нержавеющей стали (до +650 °C).",
    },
  ],
};

// ── Ordering and delivery page (/pristatymas) ──────────────────────────────
// Only facts the client has confirmed: warehouse in Elektrėnai, delivery to all
// of Lithuania in 1–3 business days, an offer within 1 business day, Mon–Fri
// 9:00–18:00, VAT payer. Nothing about prices, delivery cost, minimum order,
// pickup or cutting to length — those are open questions for the client.

export const DELIVERY_PATH = "/pristatymas";
const VAT_CODE = "LT100020123613";

type DeliveryCopy = {
  title: string;
  h1: string;
  eyebrow: string;
  description: string;
  sub: string;
  facts: { label: string; value: string }[];
  howTitle: string;
  how: string[];
  includeTitle: string;
  include: string[];
  invoiceTitle: string;
  invoice: string;
  contactTitle: string;
  faq: Faq[];
};

export const deliveryCopy: Record<Locale, DeliveryCopy> = {
  lt: {
    title: "Užsakymas ir pristatymas: žarnos įmonėms visoje Lietuvoje",
    h1: "Užsakymas ir pristatymas",
    eyebrow: "Įmonėms",
    description:
      "Kaip užsakyti technines žarnas ir jungtis: pasiūlymas per 1 darbo dieną, pristatymas iš Elektrėnų visoje Lietuvoje per 1–3 d.d., PVM sąskaitos įmonėms.",
    sub: "Techninės žarnos, jungtys ir apkabos įmonėms, dirbtuvėms ir ūkiams: pasiūlymas per 1 darbo dieną, pristatymas iš sandėlio Elektrėnuose į bet kurį Lietuvos miestą per 1–3 darbo dienas.",
    facts: [
      { label: "Sandėlis", value: "Elektrėnai" },
      { label: "Pristatymas", value: "Visoje Lietuvoje, 1–3 d.d." },
      { label: "Pasiūlymas", value: "Per 1 darbo dieną" },
      { label: "Darbo laikas", value: "I–V 9:00–18:00" },
    ],
    howTitle: "Kaip užsakyti",
    how: [
      "Atsiųskite užklausą el. paštu arba paskambinkite darbo dienomis 9:00–18:00.",
      "Inžinierius parinks žarną, jungtis ir apkabas ir per 1 darbo dieną atsiųs pasiūlymą su kaina.",
      "Patvirtinus užsakymą, siunčiame iš sandėlio Elektrėnuose — pristatymas visoje Lietuvoje per 1–3 d.d.",
    ],
    includeTitle: "Ką nurodyti užklausoje",
    include: [
      "Žarnos tipą arba paskirtį (pvz., drožlėms, ventiliacijai, chemikalams)",
      "Vidinį diametrą (DN) ir ilgį",
      "Kiekį",
      "Terpę: oras, drožlės, vanduo, chemikalai ir pan.",
      "Darbinę temperatūrą, slėgį arba vakuumą",
      "Reikalingas jungtis ir apkabas",
      "Įmonės rekvizitus sąskaitai išrašyti",
    ],
    invoiceTitle: "Sąskaitos įmonėms",
    invoice: `UAB „Riko Market“ yra PVM mokėtoja (PVM mokėtojo kodas ${VAT_CODE}). Įmonėms išrašome PVM sąskaitas faktūras.`,
    contactTitle: "Kontaktai užsakymams",
    faq: [
      {
        q: "Per kiek laiko pristatote žarnas?",
        a: "Siunčiame iš sandėlio Elektrėnuose; pristatymas į bet kurį Lietuvos miestą trunka 1–3 darbo dienas.",
      },
      {
        q: "Kaip greitai gausiu pasiūlymą?",
        a: "Per 1 darbo dieną. Kaina skaičiuojama pagal diametrą, ilgį ir kiekį, todėl šiuos duomenis nurodykite užklausoje.",
      },
      {
        q: "Ar išrašote PVM sąskaitas faktūras?",
        a: `Taip. UAB „Riko Market“ yra PVM mokėtoja (PVM mokėtojo kodas ${VAT_CODE}), įmonėms išrašome PVM sąskaitas faktūras.`,
      },
      {
        q: "Ar padėsite parinkti žarną?",
        a: "Taip. Mūsų inžinieriai parinks žarną pagal temperatūrą, slėgį, vakuumą ir cheminę aplinką. I–V 9:00–18:00.",
      },
    ],
  },
  ru: {
    title: "Заказ и доставка: технические рукава для компаний по Литве",
    h1: "Заказ и доставка",
    eyebrow: "Для компаний",
    description:
      "Как заказать технические рукава и соединения: предложение в течение 1 рабочего дня, доставка из Электреная по всей Литве за 1–3 рабочих дня, счета с НДС.",
    sub: "Технические рукава, соединения и хомуты для предприятий, мастерских и хозяйств: предложение в течение 1 рабочего дня, доставка со склада в Электренае в любой город Литвы за 1–3 рабочих дня.",
    facts: [
      { label: "Склад", value: "Электренай" },
      { label: "Доставка", value: "По всей Литве, 1–3 раб. дня" },
      { label: "Предложение", value: "В течение 1 рабочего дня" },
      { label: "Время работы", value: "Пн–Пт 9:00–18:00" },
    ],
    howTitle: "Как заказать",
    how: [
      "Отправьте запрос по e-mail или позвоните в рабочие дни с 9:00 до 18:00.",
      "Инженер подберёт рукав, соединения и хомуты и в течение 1 рабочего дня пришлёт предложение с ценой.",
      "После подтверждения заказа отправляем со склада в Электренае — доставка по всей Литве за 1–3 рабочих дня.",
    ],
    includeTitle: "Что указать в запросе",
    include: [
      "Тип рукава или его назначение (например, для стружки, вентиляции, химикатов)",
      "Внутренний диаметр (DN) и длину",
      "Количество",
      "Среду: воздух, стружка, вода, химикаты и т. п.",
      "Рабочую температуру, давление или разрежение",
      "Нужные соединения и хомуты",
      "Реквизиты компании для выставления счёта",
    ],
    invoiceTitle: "Счета для компаний",
    invoice: `UAB «Riko Market» — плательщик НДС (код плательщика НДС ${VAT_CODE}). Компаниям выставляем счета-фактуры с НДС.`,
    contactTitle: "Контакты для заказов",
    faq: [
      {
        q: "Сколько идёт доставка рукавов?",
        a: "Отправляем со склада в Электренае; доставка в любой город Литвы занимает 1–3 рабочих дня.",
      },
      {
        q: "Как быстро я получу предложение?",
        a: "В течение 1 рабочего дня. Цена зависит от диаметра, длины и количества, поэтому укажите эти данные в запросе.",
      },
      {
        q: "Выставляете ли вы счета-фактуры с НДС?",
        a: `Да. UAB «Riko Market» — плательщик НДС (код плательщика НДС ${VAT_CODE}), компаниям выставляем счета-фактуры с НДС.`,
      },
      {
        q: "Поможете подобрать рукав?",
        a: "Да. Наши инженеры подберут рукав по температуре, давлению, разрежению и химической среде. Пн–Пт 9:00–18:00.",
      },
    ],
  },
};
