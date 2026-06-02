import Link from "next/link";
import Image from "next/image";
import { Icon } from "@/components/icons";
import { company } from "@/lib/site";

/* ── Container ─────────────────────────────────────────────────────── */
export function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-10 ${className}`}>
      {children}
    </div>
  );
}

/* ── Button (RkButton) ────────────────────────────────────────────────
   Direction B: soft (rounded-[4px]) shape, sentence-case, 0.04em tracking. */
type ButtonKind =
  | "primary"
  | "primaryDark"
  | "outline"
  | "outlineLight"
  | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const KIND: Record<ButtonKind, string> = {
  primary: "bg-red text-white hover:bg-red-dark",
  primaryDark: "bg-navy text-white hover:bg-navy-2",
  outline: "border border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white",
  outlineLight:
    "border border-[1.5px] border-white/70 text-white hover:bg-white/10",
  ghost: "text-navy hover:bg-navy/5",
};
const SIZE: Record<ButtonSize, string> = {
  sm: "px-4 py-2.5 text-xs",
  md: "px-[22px] py-3 text-[13px]",
  lg: "px-7 py-[15px] text-[15px]",
};

export function Button({
  children,
  kind = "primary",
  size = "md",
  href,
  icon = true,
  external = false,
  className = "",
}: {
  children: React.ReactNode;
  kind?: ButtonKind;
  size?: ButtonSize;
  href?: string;
  icon?: boolean;
  external?: boolean;
  className?: string;
}) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-[4px] font-bold tracking-[0.04em] leading-none transition-colors ${KIND[kind]} ${SIZE[size]} ${className}`;
  const inner = (
    <>
      {children}
      {icon && <Icon name="arrow" size={size === "sm" ? 14 : 16} />}
    </>
  );
  if (href && !external) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls}>
        {inner}
      </a>
    );
  }
  return <button className={cls}>{inner}</button>;
}

/* ── Eyebrow ──────────────────────────────────────────────────────────
   Short red rule + uppercase label. tone switches the color. */
export function Eyebrow({
  children,
  tone = "red",
  className = "",
}: {
  children: React.ReactNode;
  tone?: "red" | "yellow" | "white";
  className?: string;
}) {
  const color =
    tone === "yellow" ? "text-yellow" : tone === "white" ? "text-white" : "text-red";
  return (
    <span
      className={`inline-flex items-center gap-2.5 text-[11px] font-bold uppercase tracking-[0.16em] ${color} ${className}`}
    >
      <span className="inline-block h-0.5 w-6 bg-current" />
      {children}
    </span>
  );
}

/* ── Section heading ──────────────────────────────────────────────── */
export function SectionHead({
  eyebrow,
  title,
  sub,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  sub?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className="heading mt-2.5 text-[36px]">{title}</h2>
      {sub && <p className="mt-3.5 max-w-[720px] text-base text-mute">{sub}</p>}
    </div>
  );
}

/* ── Page hero (inner pages) ─────────────────────────────────────────
   Light band with breadcrumb, red eyebrow, big navy title, sub. */
export type Crumb = { label: string; href?: string };

export function PageHero({
  breadcrumb,
  eyebrow,
  title,
  sub,
}: {
  breadcrumb?: Crumb[];
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <section className="border-b border-line bg-bg-alt">
      <Container className="py-11">
        {breadcrumb && (
          <nav aria-label="Naršymo kelias" className="mb-4 text-xs tracking-[0.04em] text-mute">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumb.map((b, i) => {
                const last = i === breadcrumb.length - 1;
                return (
                  <li key={i} className="flex items-center gap-2">
                    {i > 0 && <span className="opacity-50">/</span>}
                    {b.href && !last ? (
                      <Link href={b.href} className="nav-link hover:text-red">
                        {b.label}
                      </Link>
                    ) : (
                      <span className={last ? "font-semibold text-ink" : undefined}>
                        {b.label}
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="heading mt-3 max-w-[1100px] text-4xl leading-[1.05] sm:text-5xl md:text-[52px]">
          {title}
        </h1>
        {sub && (
          <p className="mt-4 max-w-[760px] text-[17px] leading-relaxed text-ink">
            {sub}
          </p>
        )}
      </Container>
    </section>
  );
}

/* ── Logo (round brand badge) ────────────────────────────────────── */
export function Logo({ size = 56, dark = false }: { size?: number; dark?: boolean }) {
  return (
    <Link href="/" aria-label={company.nameShort} className="inline-flex shrink-0">
      <Image
        src="/brand/logo-v2.jpg"
        alt={company.nameShort}
        width={size}
        height={size}
        priority
        className="rounded-full bg-white object-cover"
        style={{
          width: size,
          height: size,
          boxShadow: dark ? "0 0 0 2px rgba(255,255,255,0.18)" : undefined,
        }}
      />
    </Link>
  );
}
