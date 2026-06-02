"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { company, nav } from "@/lib/site";
import { Container, Logo, Button } from "@/components/ui";
import { Icon } from "@/components/icons";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white">
      <Container>
        <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 py-3.5 lg:gap-8 lg:py-[18px]">
          <Logo size={56} />

          {/* Desktop nav (centered) */}
          <nav className="hidden items-center justify-center gap-7 lg:flex">
            {nav.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`nav-link relative py-1.5 text-[15px] transition-colors hover:text-red ${
                    active ? "font-bold text-red" : "font-semibold text-ink"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-0 right-0 h-[3px] bg-red" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Desktop contact + CTA */}
          <div className="hidden items-center gap-3.5 lg:flex">
            <a
              href={company.phoneHref}
              className="inline-flex items-center gap-2 whitespace-nowrap text-base font-bold text-navy hover:text-red"
            >
              <Icon name="phone" size={15} className="text-red" />
              {company.phone}
            </a>
            <Button href="/contacts" kind="primary" icon={false}>
              Užklausa
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="col-start-3 inline-flex h-10 w-10 items-center justify-center text-navy lg:hidden"
            aria-label="Meniu"
            aria-expanded={open}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" strokeLinecap="round" /> : <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-line bg-white lg:hidden">
          <Container>
            <div className="py-2">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block border-b border-line-soft py-3 text-base font-semibold ${
                    isActive(item.href) ? "text-red" : "text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex items-center justify-between py-4">
                <a href={company.phoneHref} className="inline-flex items-center gap-2 font-bold text-navy">
                  <Icon name="phone" size={15} className="text-red" />
                  {company.phone}
                </a>
                <Button href="/contacts" kind="primary" icon={false}>
                  Užklausa
                </Button>
              </div>
            </div>
          </Container>
        </nav>
      )}
    </header>
  );
}
