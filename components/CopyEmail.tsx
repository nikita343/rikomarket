"use client";

import { useState } from "react";

// Copy-to-clipboard for the e-mail address. On PCs without a mail app,
// a mailto: link only opens Windows' "How do you want to open this?" prompt —
// copying the address lets the visitor paste it into Gmail/Outlook web instead.
export function CopyEmail({
  email,
  label,
  copiedLabel,
  className = "",
}: {
  email: string;
  label: string;
  copiedLabel: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      // Older browsers / insecure context: fall back to a hidden textarea.
      const ta = document.createElement("textarea");
      ta.value = email;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className={`inline-flex items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.06em] text-navy transition-colors hover:border-navy ${className}`}
    >
      {copied ? `✓ ${copiedLabel}` : label}
    </button>
  );
}
