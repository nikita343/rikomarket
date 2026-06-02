// Line icons ported 1:1 from Ricomarket 2/src/atoms.jsx (Ic component).

export type IconName =
  | "truck" | "tag" | "wrench" | "phone" | "mail" | "pin" | "clock"
  | "search" | "user" | "arrow" | "chev" | "check" | "shield" | "doc"
  | "spool" | "filter" | "warehouse" | "factory" | "wood" | "vent"
  | "food" | "chem" | "agri" | "spec" | "oil" | "exhaust";

const PATHS: Record<IconName, React.ReactNode> = {
  truck: (<><path d="M3 16V6h11v10M14 10h4l3 3v3h-7" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>),
  tag: (<><path d="M20 12.5L12.5 20a2 2 0 0 1-2.83 0L3 13.34V4h9.34L20 11.67a2 2 0 0 1 0 2.83z" /><circle cx="8" cy="9" r="1.5" /></>),
  wrench: (<path d="M14.7 6.3a4 4 0 0 1 5 5l-3.4-1.4-1.4 1.4 1.4 3.4a4 4 0 0 1-5-5L3 16.5 7.5 21l9.9-9.9z" />),
  phone: (<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />),
  mail: (<><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7l9 6 9-6" /></>),
  pin: (<><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></>),
  clock: (<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
  search: (<><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></>),
  user: (<><circle cx="12" cy="8" r="4" /><path d="M4 21v-1a6 6 0 0 1 6-6h4a6 6 0 0 1 6 6v1" /></>),
  arrow: (<path d="M5 12h14M13 5l7 7-7 7" />),
  chev: (<path d="M6 9l6 6 6-6" />),
  check: (<path d="M20 6L9 17l-5-5" />),
  shield: (<path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z" />),
  doc: (<><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></>),
  spool: (<><ellipse cx="12" cy="6" rx="8" ry="2" /><path d="M4 6v12c0 1.1 3.6 2 8 2s8-.9 8-2V6" /><path d="M4 12c0 1.1 3.6 2 8 2s8-.9 8-2" /></>),
  filter: (<path d="M3 5h18M6 12h12M10 19h4" />),
  warehouse: (<><path d="M3 21V9l9-5 9 5v12" /><path d="M7 21V13h10v8" /></>),
  factory: (<><path d="M3 21V11l5 3V11l5 3V11l5 3v7H3z" /><rect x="6" y="16" width="2" height="3" /><rect x="11" y="16" width="2" height="3" /><rect x="16" y="16" width="2" height="3" /></>),
  wood: (<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="3" /></>),
  vent: (<><circle cx="12" cy="12" r="9" /><path d="M12 3c2 4 2 6 0 9s-2 5 0 9M3 12c4-2 6-2 9 0s5 2 9 0" /></>),
  food: (<><path d="M4 12c0-4 4-8 8-8s8 4 8 8" /><path d="M2 12h20M5 16h14M8 20h8" /></>),
  chem: (<><path d="M9 3v6L4 19a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-10V3" /><path d="M9 3h6" /></>),
  agri: (<path d="M12 2v8M8 6l4 4 4-4M4 14c4-2 6-2 8 0s4 2 8 0M4 18c4-2 6-2 8 0s4 2 8 0" />),
  spec: (<><rect x="2" y="13" width="18" height="6" rx="1" /><circle cx="7" cy="19" r="2" /><circle cx="16" cy="19" r="2" /><path d="M14 13V8h5l2 5" /></>),
  oil: (<path d="M12 2C8 8 6 11 6 15a6 6 0 0 0 12 0c0-4-2-7-6-13z" />),
  exhaust: (<><path d="M3 12c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3" /><path d="M3 17c2 0 2-3 4-3s2 3 4 3 2-3 4-3 2 3 4 3" /></>),
};

export function Icon({
  name,
  size = 22,
  className,
  strokeWidth = 1.6,
}: {
  name: IconName;
  size?: number;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}
