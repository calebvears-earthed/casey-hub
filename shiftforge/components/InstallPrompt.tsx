"use client";
import { useEffect, useState } from "react";
import { tap } from "@/lib/haptic";

export default function InstallPrompt() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem("sf-install-dismissed");
      if (dismissed) return;
      // iOS Safari detection (no beforeinstallprompt) — check for standalone flag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const isStandalone = (window.navigator as any).standalone || window.matchMedia("(display-mode: standalone)").matches;
      if (isStandalone) return;
      const isMobile = window.matchMedia("(max-width: 1024px)").matches;
      if (!isMobile) return;
      setTimeout(() => setShow(true), 3000);
    } catch {
      /* private mode / SSR */
    }
  }, []);

  function dismiss() {
    tap();
    setShow(false);
    try {
      localStorage.setItem("sf-install-dismissed", Date.now().toString());
    } catch {}
  }

  if (!show) return null;

  return (
    <div className="lg:hidden fixed bottom-20 left-4 right-4 z-50 print:hidden animate-slide-up">
      <div className="bg-elevated border border-red/30 rounded-xl p-4 shadow-2xl flex items-center gap-3" style={{ boxShadow: "0 10px 40px -8px rgba(0,0,0,0.7)" }}>
        <div className="w-10 h-10 rounded-lg bg-red/20 border border-red/30 flex items-center justify-center flex-none">
          <span className="text-red text-lg">↓</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-paper">Install ShiftForge</div>
          <div className="text-[11px] text-paper/60 mt-0.5">Share → Add to Home Screen for the full app experience</div>
        </div>
        <button
          onClick={dismiss}
          className="w-8 h-8 flex items-center justify-center text-paper/50 active:text-paper flex-none"
          aria-label="Dismiss"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
