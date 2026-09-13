"use client";
import Link from "next/link";

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
  return (
    <header className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-dark/95 backdrop-blur-md border-b border-white/5 h-14 flex items-center justify-between px-4 print:hidden pt-safe">
      <Link href="/" className="flex items-center gap-2.5">
        <GearMark className="w-7 h-7 text-red flex-none" />
        <div className="wordmark text-[18px] leading-none">ShiftForge</div>
      </Link>
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" style={{ boxShadow: "0 0 8px rgba(208, 38, 31, 0.9)" }} />
        <span className="text-[9px] font-extrabold text-paper/70 uppercase" style={{ letterSpacing: "0.24em" }}>Live</span>
      </div>
    </header>
  );
}
