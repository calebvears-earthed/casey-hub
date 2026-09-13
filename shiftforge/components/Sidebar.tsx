"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/site", label: "Site Map" },
  { href: "/assets", label: "Assets" },
  { href: "/shifts", label: "Shifts" },
  { href: "/reports", label: "Reports" },
  { href: "/reports/new", label: "New Report" },
  { href: "/handover", label: "Handover" },
  { href: "/analytics", label: "Analytics" },
];

// ShiftForge gear — "A · Machined" mark from Logo Sheet v1.0
function GearMark({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} fill="currentColor" aria-hidden>
      <defs>
        <mask id="sf-round-bore">
          <rect width="96" height="96" fill="#fff" />
          <circle cx="48" cy="48" r="13.5" fill="#000" />
        </mask>
      </defs>
      <g mask="url(#sf-round-bore)">
        <circle cx="48" cy="48" r="31" />
        <rect x="40.5" y="8" width="15" height="20" rx="3.5" />
        <rect x="40.5" y="8" width="15" height="20" rx="3.5" transform="rotate(45 48 48)" />
        <rect x="40.5" y="8" width="15" height="20" rx="3.5" transform="rotate(90 48 48)" />
        <rect x="40.5" y="8" width="15" height="20" rx="3.5" transform="rotate(135 48 48)" />
        <rect x="40.5" y="8" width="15" height="20" rx="3.5" transform="rotate(180 48 48)" />
        <rect x="40.5" y="8" width="15" height="20" rx="3.5" transform="rotate(225 48 48)" />
        <rect x="40.5" y="8" width="15" height="20" rx="3.5" transform="rotate(270 48 48)" />
        <rect x="40.5" y="8" width="15" height="20" rx="3.5" transform="rotate(315 48 48)" />
      </g>
    </svg>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-dark border-r border-white/5 flex-col print:hidden">
      {/* Brand lockup */}
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-3">
          <GearMark className="w-10 h-10 text-red flex-none" />
          <div>
            <div className="wordmark text-[26px]">ShiftForge</div>
            <div className="tagline mt-1.5">Smart Reports</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map((item) => {
          // Prefer the most-specific matching nav item (e.g. "/reports/new" over "/reports")
          const candidates = nav
            .filter((n) => n.href === "/" ? pathname === "/" : pathname === n.href || pathname.startsWith(n.href + "/"))
            .sort((a, b) => b.href.length - a.href.length);
          const active = candidates[0]?.href === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex items-center px-4 py-3 rounded-md text-[11px] font-bold uppercase transition-all ${
                active
                  ? "text-paper bg-white/[0.04]"
                  : "text-paper/50 hover:text-paper hover:bg-white/[0.02]"
              }`}
              style={{ letterSpacing: "0.18em" }}
            >
              {active && (
                <span className="absolute left-0 top-2 bottom-2 w-0.5 rounded-full bg-red" />
              )}
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Foot */}
      <div className="p-5 border-t border-white/5 space-y-4">
        {/* ⌘K hint */}
        <button
          onClick={() => window.dispatchEvent(new Event("sf-open-palette"))}
          className="w-full flex items-center justify-between px-3 py-2 rounded-md border border-white/10 hover:border-white/20 hover:bg-white/[0.03] transition-all text-left"
        >
          <span className="text-[10px] font-extrabold text-paper/50 uppercase" style={{ letterSpacing: "0.2em" }}>
            Quick jump
          </span>
          <kbd className="text-[10px] font-extrabold text-paper/60 uppercase border border-white/10 rounded px-1.5 py-0.5" style={{ letterSpacing: "0.16em" }}>
            ⌘K
          </kbd>
        </button>
        <div>
          <div className="text-[10px] font-extrabold text-paper/40 uppercase" style={{ letterSpacing: "0.24em" }}>
            Site
          </div>
          <div className="text-sm font-bold text-paper mt-1">Prominent Hill</div>
        </div>
        <div className="pt-4 border-t border-white/5">
          <div className="text-sm font-bold text-paper">Casey Williams</div>
          <div className="text-[10px] text-paper/50 uppercase mt-0.5" style={{ letterSpacing: "0.2em" }}>
            Fitter · Day Shift
          </div>
        </div>
        <div className="pt-4 border-t border-white/5 text-[9px] font-extrabold text-paper/30 uppercase" style={{ letterSpacing: "0.24em" }}>
          Powered by <span className="text-red">Top Gun Engineering</span>
        </div>
      </div>
    </aside>
  );
}
