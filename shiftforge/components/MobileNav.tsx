"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Dashboard" },
  { href: "/assets", label: "Assets" },
  { href: "/shifts", label: "Shifts" },
  { href: "/reports", label: "Reports" },
  { href: "/reports/new", label: "New Report" },
  { href: "/handover", label: "Handover" },
  { href: "/analytics", label: "Analytics" },
];

function GearMark({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 96 96" className={className} fill="currentColor" aria-hidden>
      <defs>
        <mask id="sf-mobile-bore">
          <rect width="96" height="96" fill="#fff" />
          <circle cx="48" cy="48" r="13.5" fill="#000" />
        </mask>
      </defs>
      <g mask="url(#sf-mobile-bore)">
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

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close drawer on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top bar — mobile only */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-dark/95 backdrop-blur-md border-b border-white/5 h-14 flex items-center justify-between px-4 print:hidden">
        <Link href="/" className="flex items-center gap-2.5">
          <GearMark className="w-7 h-7 text-red flex-none" />
          <div>
            <div className="wordmark text-[18px] leading-none">ShiftForge</div>
          </div>
        </Link>
        <button
          onClick={() => setOpen(!open)}
          aria-label="Menu"
          className="w-11 h-11 flex items-center justify-center rounded-md border border-white/10 text-paper hover:bg-white/5 active:bg-white/10 transition-colors"
        >
          {open ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </header>

      {/* Drawer overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 z-40 bg-charcoal/70 backdrop-blur-sm animate-fade-in print:hidden"
        />
      )}

      {/* Drawer */}
      <aside
        className={`lg:hidden fixed top-14 right-0 bottom-0 z-50 w-[85vw] max-w-sm bg-dark border-l border-white/10 shadow-2xl transform transition-transform duration-200 print:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <nav className="p-4 space-y-1 overflow-y-auto h-full">
          {nav.map((item) => {
            const candidates = nav
              .filter((n) => (n.href === "/" ? pathname === "/" : pathname === n.href || pathname.startsWith(n.href + "/")))
              .sort((a, b) => b.href.length - a.href.length);
            const active = candidates[0]?.href === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative flex items-center px-4 py-4 rounded-lg text-[13px] font-bold uppercase transition-all min-h-[52px] ${
                  active ? "text-paper bg-white/[0.05]" : "text-paper/60 hover:text-paper active:bg-white/[0.03]"
                }`}
                style={{ letterSpacing: "0.18em" }}
              >
                {active && <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-red" />}
                {item.label}
              </Link>
            );
          })}

          <div className="pt-6 mt-4 border-t border-white/5 px-4 space-y-4">
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
        </nav>
      </aside>
    </>
  );
}
