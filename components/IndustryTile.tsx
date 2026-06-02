import Link from "next/link";
import type { Industry } from "@/lib/industries";
import { Icon } from "@/components/icons";

// List-row industry tile (Direction B): navy icon box · name+desc · arrow.
export function IndustryTile({ industry }: { industry: Industry }) {
  return (
    <Link
      href="/industries"
      className="group flex items-center gap-[18px] rounded-[4px] border border-line bg-white px-5 py-[18px] transition-colors hover:border-navy"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center bg-navy text-white">
        <Icon name={industry.icon} size={26} className="text-white" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="mb-0.5 text-base font-bold text-navy">{industry.name}</div>
        <div className="text-[13px] leading-snug text-mute">{industry.desc}</div>
      </div>
      <Icon name="arrow" size={18} className="shrink-0 text-red transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
