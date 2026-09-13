"use client";
import { useEffect, useState } from "react";
import assets from "@/data/assets.json";
import reports from "@/data/reports.json";

export default function MorningBrief() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(t);
  }, []);

  if (!now) return null;

  const hour = now.getHours();
  const greeting =
    hour < 5 ? "Late shift, Casey."
    : hour < 12 ? "Morning, Casey."
    : hour < 17 ? "Afternoon, Casey."
    : hour < 22 ? "Evening, Casey."
    : "Late shift, Casey.";
  const shiftBand =
    hour >= 6 && hour < 14 ? "Day Shift · 06:00-14:00"
    : hour >= 14 && hour < 22 ? "Afternoon Shift · 14:00-22:00"
    : "Night Shift · 22:00-06:00";
  const focus = assets.filter((a) => a.open_faults > 1 || a.health_score < 0.7);
  const critical = reports.filter((r) => r.priority === "critical").length;

  const timeStr = now.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: false });

  return (
    <div className="card relative overflow-hidden">
      <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-red/10 blur-3xl pointer-events-none" />
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 relative">
        <div>
          <div className="eyebrow mb-2">{shiftBand}</div>
          <h2 className="text-2xl sm:text-3xl leading-tight">{greeting}</h2>
          <p className="text-paper/70 mt-2 text-sm max-w-md">
            {focus.length > 0 ? (
              <>
                <span className="text-paper font-bold">{focus.length}</span> machine{focus.length === 1 ? "" : "s"} need{focus.length === 1 ? "s" : ""} eyes on today
                {critical > 0 && (
                  <> · <span className="text-red font-bold">{critical}</span> critical report{critical === 1 ? "" : "s"} in the queue</>
                )}
                . Coffee first.
              </>
            ) : (
              <>Fleet is holding steady. Nothing urgent — keep it that way.</>
            )}
          </p>
        </div>
        <div className="text-left sm:text-right">
          <div className="mono text-5xl sm:text-6xl font-bold text-paper leading-none tracking-tight">{timeStr}</div>
          <div className="text-[10px] text-paper/50 mt-2 uppercase" style={{ letterSpacing: "0.24em" }}>
            Prominent Hill · Live
          </div>
        </div>
      </div>
      {focus.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/5 flex flex-wrap gap-2">
          {focus.map((a) => (
            <a
              key={a.id}
              href={`/assets/${a.id}`}
              className="mono text-[11px] font-bold text-red px-2.5 py-1 rounded-md bg-red/10 border border-red/20 hover:bg-red/20 transition-colors"
            >
              {a.asset_code}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
