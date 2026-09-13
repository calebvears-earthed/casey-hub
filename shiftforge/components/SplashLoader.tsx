"use client";
import { useEffect, useState } from "react";

export default function SplashLoader() {
  const [visible, setVisible] = useState(true);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    // Only show once per session
    try {
      if (typeof window !== "undefined" && sessionStorage.getItem("sf-splash-seen")) {
        setVisible(false);
        return;
      }
    } catch {
      /* private mode etc */
    }
    const t1 = setTimeout(() => setHide(true), 1100);
    const t2 = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem("sf-splash-seen", "1");
      } catch {}
    }, 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-charcoal transition-opacity duration-300 print:hidden ${
        hide ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Red halo */}
      <div className="absolute w-[420px] h-[420px] rounded-full bg-red/20 blur-3xl animate-pulse-slow" />
      <div className="relative flex flex-col items-center">
        <svg viewBox="0 0 96 96" className="w-16 h-16 text-red animate-spin-slow" fill="currentColor" aria-hidden>
          <defs>
            <mask id="sf-splash-bore">
              <rect width="96" height="96" fill="#fff" />
              <circle cx="48" cy="48" r="13.5" fill="#000" />
            </mask>
          </defs>
          <g mask="url(#sf-splash-bore)">
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
        <div className="mt-6 wordmark text-4xl" style={{ textShadow: "0 0 24px rgba(208, 38, 31, 0.7)" }}>ShiftForge</div>
        <div className="tagline mt-2">Smart Reports</div>
        <div className="mt-8 text-[10px] font-extrabold text-paper/40 uppercase" style={{ letterSpacing: "0.28em" }}>
          Prominent Hill · Loading Fleet
        </div>
        <div className="mt-3 w-24 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-red animate-loading-bar" />
        </div>
      </div>
    </div>
  );
}
