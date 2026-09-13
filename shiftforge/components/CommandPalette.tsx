"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import assets from "@/data/assets.json";
import reports from "@/data/reports.json";
import { tap } from "@/lib/haptic";

type Item = { id: string; title: string; sub: string; kind: string; href: string; keywords: string };

const PAGES: Item[] = [
  { id: "p-home", title: "Dashboard", sub: "Site ops overview", kind: "Page", href: "/", keywords: "dashboard home overview" },
  { id: "p-assets", title: "Asset Register", sub: "All machines", kind: "Page", href: "/assets", keywords: "assets machines fleet plant register" },
  { id: "p-reports", title: "Report Archive", sub: "All handovers", kind: "Page", href: "/reports", keywords: "reports archive feed history" },
  { id: "p-new", title: "New Report", sub: "Draft a handover", kind: "Page", href: "/reports/new", keywords: "new report draft create shift" },
  { id: "p-shifts", title: "Shifts", sub: "Roster + chain", kind: "Page", href: "/shifts", keywords: "shifts roster day afternoon night" },
  { id: "p-handover", title: "Handover Briefing", sub: "Start-of-shift brief", kind: "Page", href: "/handover", keywords: "handover briefing morning start acknowledge" },
  { id: "p-analytics", title: "Analytics", sub: "Patterns + predictions", kind: "Page", href: "/analytics", keywords: "analytics patterns trends downtime prevented" },
  { id: "p-site", title: "Site Map", sub: "Prominent Hill live", kind: "Page", href: "/site", keywords: "site map pit prominent hill locations" },
];

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [i, setI] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function onOpen() { setOpen(true); }
    window.addEventListener("keydown", onKey);
    window.addEventListener("sf-open-palette", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("sf-open-palette", onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ("");
      setI(0);
      setTimeout(() => inputRef.current?.focus(), 30);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items = useMemo(() => {
    const assetItems: Item[] = assets.map((a) => ({
      id: `a-${a.id}`,
      title: `${a.asset_code}`,
      sub: `${a.description} · ${a.location}`,
      kind: "Asset",
      href: `/assets/${a.id}`,
      keywords: `${a.asset_code} ${a.description} ${a.discipline} ${a.location} ${a.make} ${a.model}`.toLowerCase(),
    }));
    const reportItems: Item[] = reports.map((r) => ({
      id: `r-${r.id}`,
      title: `${r.id} · ${r.asset_code}`,
      sub: r.issues_identified.slice(0, 80),
      kind: "Report",
      href: `/reports/${r.id}`,
      keywords: `${r.id} ${r.asset_code} ${r.issues_identified} ${r.author} ${r.date} ${r.priority}`.toLowerCase(),
    }));
    const all = [...PAGES, ...assetItems, ...reportItems];
    if (!q.trim()) return all.slice(0, 20);
    const query = q.toLowerCase();
    return all
      .filter((it) => it.keywords.toLowerCase().includes(query) || it.title.toLowerCase().includes(query))
      .slice(0, 20);
  }, [q]);

  useEffect(() => {
    if (i >= items.length) setI(Math.max(0, items.length - 1));
  }, [items.length, i]);

  function pick(it: Item) {
    tap();
    router.push(it.href);
    setOpen(false);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setI((v) => Math.min(v + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setI((v) => Math.max(v - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const it = items[i];
      if (it) pick(it);
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] bg-charcoal/80 backdrop-blur-md flex items-start justify-center pt-[10vh] px-4 print:hidden" onClick={() => setOpen(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-elevated border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
        style={{ boxShadow: "0 20px 80px -10px rgba(0,0,0,0.7), 0 0 40px -10px rgba(208,38,31,0.3)" }}
      >
        <div className="border-b border-white/5 px-4 py-3 flex items-center gap-3">
          <span className="text-red text-xl">⌘</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setI(0);
            }}
            onKeyDown={onKeyDown}
            placeholder="Jump to asset, report, or page…"
            className="flex-1 bg-transparent border-0 outline-none text-paper placeholder:text-paper/40 text-base"
          />
          <kbd className="hidden sm:inline text-[10px] font-extrabold text-paper/40 uppercase border border-white/10 rounded px-1.5 py-0.5" style={{ letterSpacing: "0.16em" }}>
            Esc
          </kbd>
        </div>
        <div className="max-h-[60vh] overflow-y-auto">
          {items.length === 0 && (
            <div className="p-8 text-center text-paper/40 text-sm">No matches — try a different search.</div>
          )}
          {items.map((it, idx) => (
            <button
              key={it.id}
              onClick={() => pick(it)}
              onMouseEnter={() => setI(idx)}
              className={`w-full text-left px-4 py-3 flex items-center gap-3 border-b border-white/[0.03] last:border-b-0 transition-colors ${
                idx === i ? "bg-red/[0.08]" : ""
              }`}
            >
              <span className={`text-[9px] font-extrabold uppercase w-16 flex-none ${idx === i ? "text-red" : "text-paper/40"}`} style={{ letterSpacing: "0.2em" }}>
                {it.kind}
              </span>
              <div className="flex-1 min-w-0">
                <div className={`text-sm font-bold truncate ${idx === i ? "text-paper" : "text-paper/90"}`}>{it.title}</div>
                <div className="text-[11px] text-paper/50 truncate">{it.sub}</div>
              </div>
              {idx === i && <span className="text-red text-xs">↵</span>}
            </button>
          ))}
        </div>
        <div className="border-t border-white/5 px-4 py-2 flex items-center justify-between text-[10px] font-extrabold text-paper/40 uppercase" style={{ letterSpacing: "0.18em" }}>
          <div className="flex items-center gap-3">
            <span>↑↓ Nav</span>
            <span>↵ Open</span>
          </div>
          <div>⌘K anywhere</div>
        </div>
      </div>
    </div>
  );
}
