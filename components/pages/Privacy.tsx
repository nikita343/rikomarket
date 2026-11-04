import { company, getSite } from "@/lib/site";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { Container, PageHero } from "@/components/ui";
import { CookieSettingsLink } from "@/components/CookieBanner";

// Privacy & cookie policy. Plain, factual, and limited to what the site really
// does: inquiries by phone/e-mail, hosting logs, one consent record, and GA4
// after consent. Have the client confirm before treating it as final.
type Section = { h: string; p: string[] };
type CookieRow = [name: string, purpose: string, kind: string, lifetime: string];

const UPDATED = "2026-11-04";

const content: Record<Locale, { title: string; intro: string; sections: Section[]; cookiesTitle: string; cookieHead: CookieRow; cookies: CookieRow[]; after: Section[]; updated: string; settings: string }> = {
  lt: {
    title: "Privatumo ir slapukų politika",
    intro: `Ši politika paaiškina, kaip UAB „Riko Market“ (PVM ${"LT100020123613"}, Elektrėnai, Lietuva; el. paštas ${company.email}) tvarko asmens duomenis ir naudoja slapukus svetainėje ${company.website}.`,
    sections: [
      {
        h: "Kokius duomenis tvarkome",
        p: [
          "Užklausos. Kai susisiekiate telefonu ar el. paštu, tvarkome Jūsų pateiktus duomenis (vardą, įmonę, kontaktus, užklausos turinį), kad atsakytume ir parengtume pasiūlymą. Teisinis pagrindas — veiksmai prieš sudarant sutartį ir teisėtas interesas (BDAR 6 str. 1 d. b ir f p.). Susirašinėjimą saugome tiek, kiek reikia užklausai ir galimai sutarčiai įvykdyti, bet ne ilgiau nei to reikalauja teisės aktai.",
          "Serverio žurnalai. Svetainės talpinimo paslaugų teikėjas (Vercel Inc.) saugumo ir veikimo tikslais trumpai saugo techninius užklausų duomenis (IP adresą, naršyklės tipą, laiką). Pagrindas — teisėtas interesas užtikrinti svetainės saugumą.",
        ],
      },
    ],
    cookiesTitle: "Slapukai",
    cookieHead: ["Pavadinimas", "Paskirtis", "Tipas", "Galiojimas"],
    cookies: [
      ["rk-consent (vietinė saugykla)", "Įsimena Jūsų slapukų pasirinkimą", "Būtinasis", "Iki 6 mėn."],
      ["_ga", "Google Analytics: atskiria lankytojus", "Analitikos, tik su sutikimu", "13 mėn."],
      ["_ga_<ID>", "Google Analytics: išsaugo sesijos būseną", "Analitikos, tik su sutikimu", "13 mėn."],
    ],
    after: [
      {
        h: "Google Analytics",
        p: [
          "Google Analytics 4 (Google Ireland Ltd.) įkeliamas tik Jums sutikus. Naudojame jį tik lankomumo statistikai: reklamos funkcijos ir Google signalai išjungti, IP adresai nesaugomi. Statistika saugoma 14 mėn. Duomenys gali būti perduodami į JAV pagal ES ir JAV duomenų privatumo sistemą. Sutikimą galite bet kada atšaukti — tada analitika išjungiama, o jos slapukai ištrinami.",
        ],
      },
      {
        h: "Jūsų teisės",
        p: [
          `Galite prašyti susipažinti su savo duomenimis, juos ištaisyti, ištrinti, apriboti jų tvarkymą, nesutikti su tvarkymu ar gauti duomenis perkeliamu formatu. Rašykite ${company.email}. Jei manote, kad duomenys tvarkomi neteisėtai, galite pateikti skundą Valstybinei duomenų apsaugos inspekcijai (vdai.lrv.lt).`,
        ],
      },
    ],
    updated: "Atnaujinta",
    settings: "Keisti slapukų nustatymus",
  },
  ru: {
    title: "Политика конфиденциальности и cookie",
    intro: `Эта политика объясняет, как UAB «Riko Market» (НДС LT100020123613, Электренай, Литва; e-mail ${company.email}) обрабатывает персональные данные и использует cookie на сайте ${company.website}.`,
    sections: [
      {
        h: "Какие данные мы обрабатываем",
        p: [
          "Запросы. Когда вы связываетесь с нами по телефону или e-mail, мы обрабатываем предоставленные вами данные (имя, компанию, контакты, содержание запроса), чтобы ответить и подготовить предложение. Правовое основание — действия до заключения договора и законный интерес (ст. 6(1)(b) и (f) GDPR). Переписку храним столько, сколько нужно для запроса и возможного договора, но не дольше, чем требует закон.",
          "Журналы сервера. Хостинг-провайдер сайта (Vercel Inc.) для безопасности и работы сайта кратковременно хранит технические данные запросов (IP-адрес, тип браузера, время). Основание — законный интерес в безопасности сайта.",
        ],
      },
    ],
    cookiesTitle: "Файлы cookie",
    cookieHead: ["Название", "Назначение", "Тип", "Срок"],
    cookies: [
      ["rk-consent (локальное хранилище)", "Запоминает ваш выбор cookie", "Необходимый", "До 6 мес."],
      ["_ga", "Google Analytics: различает посетителей", "Аналитический, только с согласия", "13 мес."],
      ["_ga_<ID>", "Google Analytics: хранит состояние сессии", "Аналитический, только с согласия", "13 мес."],
    ],
    after: [
      {
        h: "Google Analytics",
        p: [
          "Google Analytics 4 (Google Ireland Ltd.) загружается только с вашего согласия. Используем его только для статистики посещений: рекламные функции и сигналы Google отключены, IP-адреса не хранятся. Статистика хранится 14 мес. Данные могут передаваться в США в рамках Рамочной программы конфиденциальности данных ЕС–США. Согласие можно отозвать в любой момент — тогда аналитика отключается, а её cookie удаляются.",
        ],
      },
      {
        h: "Ваши права",
        p: [
          `Вы можете запросить доступ к своим данным, их исправление, удаление, ограничение обработки, возразить против обработки или получить данные в переносимом формате. Пишите на ${company.email}. Если считаете, что данные обрабатываются незаконно, можете подать жалобу в Государственную инспекцию по защите данных Литвы (vdai.lrv.lt).`,
        ],
      },
    ],
    updated: "Обновлено",
    settings: "Изменить настройки cookie",
  },
};

export const privacyTitle = (locale: Locale) => content[locale].title;
export const privacyIntro = (locale: Locale) => content[locale].intro;

export function PrivacyPage({ locale }: { locale: Locale }) {
  const c = content[locale];
  const t = getDict(locale);
  const block = (s: Section) => (
    <section key={s.h} className="mt-10">
      <h2 className="text-[22px] font-extrabold text-navy">{s.h}</h2>
      {s.p.map((p) => (
        <p key={p.slice(0, 40)} className="mt-3 text-[15px] leading-relaxed text-ink">
          {p}
        </p>
      ))}
    </section>
  );
  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={[{ label: t.common.home, href: localeHref(locale, "/") }, { label: c.title }]}
        eyebrow={getSite(locale).nameFull}
        title={c.title}
        sub={c.intro}
      />
      <section className="bg-bg pb-20">
        <Container className="max-w-[900px]">
          {c.sections.map(block)}

          <section className="mt-10">
            <h2 className="text-[22px] font-extrabold text-navy">{c.cookiesTitle}</h2>
            <div className="mt-4 overflow-x-auto rounded-[4px] border border-line bg-white">
              <table className="w-full min-w-[560px] text-left text-[13.5px]">
                <thead className="bg-bg-alt text-[12px] uppercase tracking-[0.06em] text-mute">
                  <tr>
                    {c.cookieHead.map((h) => (
                      <th key={h} className="px-4 py-3 font-semibold">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {c.cookies.map((row) => (
                    <tr key={row[0]} className="border-t border-line">
                      {row.map((cell, i) => (
                        <td key={i} className={`px-4 py-3 ${i === 0 ? "font-mono text-[12.5px] text-navy" : "text-ink"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <CookieSettingsLink
              label={c.settings}
              className="mt-4 inline-flex rounded-[4px] border-[1.5px] border-navy px-4 py-2.5 text-[13px] font-bold text-navy hover:bg-navy hover:text-white"
            />
          </section>

          {c.after.map(block)}

          <p className="mt-12 text-[13px] text-mute">
            {c.updated}: {UPDATED}
          </p>
        </Container>
      </section>
    </>
  );
}
