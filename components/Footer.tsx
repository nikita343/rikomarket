import Link from "next/link";
import { company } from "@/lib/site";
import { categories } from "@/lib/categories";
import { industries } from "@/lib/industries";
import { Container, Logo, Button } from "@/components/ui";
import { Icon } from "@/components/icons";

function ColHead({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-[18px] text-[13px] font-bold uppercase tracking-[0.1em] text-white">
      {children}
    </div>
  );
}

export function Footer() {
  return (
    <footer className="bg-navy-deep text-white">
      {/* Brand color strip */}
      <div className="flex h-1.5">
        <span className="bg-yellow" style={{ flex: 2 }} />
        <span className="bg-blue-accent" style={{ flex: 3 }} />
        <span className="bg-red" style={{ flex: 2 }} />
      </div>

      <Container className="pb-8 pt-14">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-14">
          {/* Brand */}
          <div>
            <Logo size={56} dark />
            <p className="mt-[18px] max-w-[320px] text-[13.5px] leading-relaxed text-white/65">
              {company.descShort}
            </p>
            <div className="mt-3.5 text-xs font-medium text-white/65">
              {company.foundedNote}
            </div>
          </div>

          {/* Products */}
          <div>
            <ColHead>Produktai</ColHead>
            {categories.map((c) => (
              <Link
                key={c.id}
                href={`/products?category=${c.id}`}
                className="nav-link block py-[5px] text-sm text-white/65 hover:text-white"
              >
                {c.name}
              </Link>
            ))}
          </div>

          {/* Industries */}
          <div>
            <ColHead>Pritaikymas</ColHead>
            {industries.slice(0, 7).map((i) => (
              <Link
                key={i.id}
                href="/industries"
                className="nav-link block py-[5px] text-sm text-white/65 hover:text-white"
              >
                {i.name}
              </Link>
            ))}
          </div>

          {/* Contacts */}
          <div>
            <ColHead>Kontaktai</ColHead>
            <div className="grid gap-3 text-sm text-white/65">
              <div className="flex gap-2.5">
                <Icon name="pin" size={16} className="shrink-0 text-white/85" />
                <span>{company.address}</span>
              </div>
              <a href={company.phoneHref} className="flex gap-2.5">
                <Icon name="phone" size={16} className="shrink-0 text-white/85" />
                <span className="font-semibold text-white">{company.phone}</span>
              </a>
              <a href={`mailto:${company.email}`} className="flex gap-2.5">
                <Icon name="mail" size={16} className="shrink-0 text-white/85" />
                <span>{company.email}</span>
              </a>
              <div className="flex gap-2.5">
                <Icon name="clock" size={16} className="shrink-0 text-white/85" />
                <span>{company.hours}</span>
              </div>
            </div>
            <div className="mt-[22px]">
              <Button href="/contacts" kind="primary">
                Susisiekti
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-[22px] text-[12.5px] text-white/65 sm:flex-row sm:justify-between">
          <span>{company.legalLine}</span>
          <span className="flex gap-[18px]">
            <Link href="/contacts" className="nav-link hover:text-white">Privatumo politika</Link>
            <Link href="/contacts" className="nav-link hover:text-white">Naudojimosi sąlygos</Link>
          </span>
        </div>
      </Container>
    </footer>
  );
}
