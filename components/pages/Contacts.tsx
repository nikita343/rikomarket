import { company, getSite } from "@/lib/site";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { Container, PageHero, Button } from "@/components/ui";
import { Icon, type IconName } from "@/components/icons";

export function ContactsPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const s = getSite(locale);

  const details: { ic: IconName; label: string; value: string; sub: string }[] = [
    { ic: "pin", label: t.common.address, value: s.address, sub: t.contactsPage.addressSub },
    { ic: "phone", label: t.common.phone, value: company.phone, sub: s.hours },
    { ic: "mail", label: t.common.email, value: company.email, sub: t.contactsPage.emailSub },
    { ic: "clock", label: t.common.hours, value: s.hours, sub: t.contactsPage.hoursSub },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={[
          { label: t.common.home, href: localeHref(locale, "/") },
          { label: t.contactsPage.eyebrow },
        ]}
        eyebrow={t.contactsPage.eyebrow}
        title={t.contactsPage.title}
        sub={t.contactsPage.sub}
      />

      <section className="bg-bg py-[60px]">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            {/* Contact details */}
            <div className="border border-line bg-white p-8">
              <h2 className="heading text-[22px] font-bold">{s.nameFull}</h2>
              <div className="mt-1 text-[13px] text-mute">
                {t.contactsPage.companyPrefix} {s.foundedNote}
              </div>

              <div className="mt-[26px] grid gap-[22px]">
                {details.map((r, i) => (
                  <div
                    key={r.label}
                    className={`flex gap-4 ${i < details.length - 1 ? "border-b border-line-soft pb-[22px]" : ""}`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-red text-white">
                      <Icon name={r.ic} size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
                        {r.label}
                      </div>
                      <div className="mt-1 text-[22px] font-bold text-navy">{r.value}</div>
                      <div className="mt-1 text-[13px] text-mute">{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company history + quick contact */}
            <div className="flex flex-col gap-[22px]">
              <div className="bg-navy p-[26px] text-white">
                <div className="text-base font-bold">{t.contactsPage.historyTitle}</div>
                <p className="mt-2.5 text-sm leading-relaxed text-white/85">{s.descLong}</p>
              </div>

              <div className="flex flex-1 flex-col justify-center border border-line bg-white p-[26px]">
                <h3 className="heading text-lg font-bold">{t.contactsPage.offerTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">{t.contactsPage.offerText}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href={company.phoneHref} kind="primary" icon={false} external>
                    <Icon name="phone" size={14} /> {company.phone}
                  </Button>
                  <Button href={`mailto:${company.email}`} kind="outline" icon={false} external>
                    <Icon name="mail" size={14} /> {t.common.email}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
