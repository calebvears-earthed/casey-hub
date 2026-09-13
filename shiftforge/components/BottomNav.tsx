"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { tap } from "@/lib/haptic";

const primary = [
  { href: "/", label: "Home", icon: HomeIcon },
  { href: "/assets", label: "Assets", icon: AssetsIcon },
  { href: "/reports/new", label: "Report", icon: PlusIcon, center: true },
  { href: "/reports", label: "Feed", icon: FeedIcon },
];

const overflow = [
  { href: "/shifts", label: "Shifts" },
  { href: "/handover", label: "Handover" },
  { href: "/analytics", label: "Analytics" },
  { href: "/site", label: "Site Map" },
];

export default function BottomNav() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-dark/95 backdrop-blur-md border-t border-white/[0.08] pb-safe print:hidden">
        <div className="grid grid-cols-5 h-16">
          {primary.slice(0, 2).map((item) => (
            <NavItem key={item.href} item={item} active={isActive(item.href)} />
          ))}
          {/* Center + button */}
          <div className="relative flex items-center justify-center">
            <Link
              href={primary[2].href}
              onClick={() => tap()}
              className="absolute -top-5 w-14 h-14 rounded-full bg-red flex items-center justify-center shadow-[0_8px_24px_-4px_rgba(208,38,31,0.7)] active:scale-95 transition-transform"
            >
              <PlusIcon className="w-6 h-6 text-paper" />
            </Link>
            <span className="absolute -bottom-0 text-[9px] font-extrabold text-red uppercase pb-2" style={{ letterSpacing: "0.2em" }}>
              New
            </span>
          </div>
          {primary.slice(3).map((item) => (
            <NavItem key={item.href} item={item} active={isActive(item.href)} />
          ))}
          <button
            onClick={() => {
              tap();
              setSheetOpen(true);
            }}
            className="flex flex-col items-center justify-center gap-1 text-paper/50 active:text-paper transition-colors"
          >
            <MoreIcon className="w-5 h-5" />
            <span className="text-[9px] font-extrabold uppercase" style={{ letterSpacing: "0.2em" }}>
              More
            </span>
          </button>
        </div>
      </nav>

      {/* Overflow sheet */}
      {sheetOpen && (
        <div
          onClick={() => setSheetOpen(false)}
          className="lg:hidden fixed inset-0 z-50 bg-charcoal/80 backdrop-blur-sm flex items-end print:hidden"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full bg-elevated border-t border-white/10 rounded-t-2xl pb-safe animate-slide-up"
          >
            <div className="flex justify-center pt-3 pb-2">
              <div className="w-10 h-1 rounded-full bg-white/20" />
            </div>
            <div className="p-5">
              <div className="eyebrow mb-4">More</div>
              <div className="space-y-1">
                {overflow.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => {
                      tap();
                      setSheetOpen(false);
                    }}
                    className={`flex items-center px-4 py-4 rounded-lg text-[13px] font-bold uppercase transition-colors min-h-[52px] ${
                      isActive(item.href) ? "text-paper bg-white/[0.05]" : "text-paper/70 active:bg-white/[0.03]"
                    }`}
                    style={{ letterSpacing: "0.18em" }}
                  >
                    {isActive(item.href) && <span className="w-0.5 h-4 rounded-full bg-red mr-3" />}
                    {item.label}
                  </Link>
                ))}
                <div className="pt-4 mt-4 border-t border-white/5 text-[10px] font-extrabold text-paper/30 uppercase text-center" style={{ letterSpacing: "0.24em" }}>
                  Powered by <span className="text-red">Top Gun Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function NavItem({ item, active }: { item: (typeof primary)[number]; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={() => tap()}
      className={`flex flex-col items-center justify-center gap-1 transition-colors ${
        active ? "text-red" : "text-paper/50 active:text-paper"
      }`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-[9px] font-extrabold uppercase" style={{ letterSpacing: "0.2em" }}>
        {item.label}
      </span>
    </Link>
  );
}

// Icons — line style (matches Higgsfield render kit aesthetic)
function HomeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11l9-8 9 8v10a1 1 0 01-1 1h-5v-6h-6v6H4a1 1 0 01-1-1V11z" />
    </svg>
  );
}
function AssetsIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 00.3 1.9l.1.1a2 2 0 11-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 11-4 0v-.1a1.7 1.7 0 00-1-1.5 1.7 1.7 0 00-1.9.3l-.1.1a2 2 0 11-2.8-2.8l.1-.1a1.7 1.7 0 00.3-1.9 1.7 1.7 0 00-1.5-1H3a2 2 0 110-4h.1a1.7 1.7 0 001.5-1 1.7 1.7 0 00-.3-1.9l-.1-.1a2 2 0 112.8-2.8l.1.1a1.7 1.7 0 001.9.3H9a1.7 1.7 0 001-1.5V3a2 2 0 114 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.9-.3l.1-.1a2 2 0 112.8 2.8l-.1.1a1.7 1.7 0 00-.3 1.9V9a1.7 1.7 0 001.5 1H21a2 2 0 110 4h-.1a1.7 1.7 0 00-1.5 1z" />
    </svg>
  );
}
function PlusIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className} strokeLinecap="round">
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}
function FeedIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
      <path d="M14 2v6h6M8 13h8M8 17h5" />
    </svg>
  );
}
function MoreIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="5" cy="12" r="2" />
      <circle cx="12" cy="12" r="2" />
      <circle cx="19" cy="12" r="2" />
    </svg>
  );
}
