"use client";
import { useMemo, useState } from "react";

type Event = { hour: number; label: string; kind: "shift" | "fault" | "service" | "handover" };

const EVENTS: Event[] = [
  { hour: 6, label: "Day shift start · handover ack", kind: "handover" },
  { hour: 7, label: "HYD-014 · fluid sample sent", kind: "service" },
  { hour: 9, label: "C32-01 · bearing greased", kind: "service" },
  { hour: 11, label: "TF-500-A · IR scan booked", kind: "service" },
  { hour: 13, label: "HAUL-CAT793-07 · tyre inspection", kind: "service" },
  { hour: 14, label: "Afternoon shift takeover", kind: "shift" },
  { hour: 15, label: "DM45 · rotary head vibration ↑", kind: "fault" },
  { hour: 17, label: "Vibration contractor booked (Tue)", kind: "handover" },
  { hour: 18, label: "HYD-014 · lab result: ISO 20/18/15", kind: "fault" },
  { hour: 20, label: "HYD-014 · fluid swap approved", kind: "service" },
  { hour: 22, label: "Night shift start", kind: "shift" },
  { hour: 23, label: "C32-01 · thermal recheck", kind: "service" },
];

export default function TimelineScrubber() {
  const [hour, setHour] = useState(15);

  const active = useMemo(() => EVENTS.filter((e) => e.hour <= hour), [hour]);
  const upcoming = useMemo(() => EVENTS.filter((e) => e.hour > hour).slice(0, 3), [hour]);

  const shift =
    hour < 6 ? "Night carry"
    : hour < 14 ? "Day Shift"
    : hour < 22 ? "Afternoon Shift"
    : "Night Shift";

  return (
    <div className="card">
      <div className="mb-4 flex items-start justify-between gap-4 flex-wrap">
        <div>
          <div className="eyebrow mb-1">Replay</div>
          <h2 className="text-xl">24-Hour Shift Timeline</h2>
          <p className="text-paper/50 text-[12px] mt-1">Scrub through today · watch faults + services appear as they happened.</p>
        </div>
        <div className="text-right">
          <div className="mono text-3xl font-bold text-red text-glow-red">{String(hour).padStart(2, "0")}:00</div>
          <div className="text-[10px] font-extrabold text-paper/50 uppercase mt-1" style={{ letterSpacing: "0.22em" }}>{shift}</div>
        </div>
      </div>

      {/* Scrubber */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="range"
            min={0}
            max={23}
            value={hour}
            onChange={(e) => setHour(parseInt(e.target.value))}
            className="w-full accent-red h-1.5 cursor-pointer"
          />
          <div className="flex justify-between mt-2 text-[9px] font-extrabold text-paper/40 uppercase" style={{ letterSpacing: "0.2em" }}>
            <span>00</span>
            <span>06 · Day</span>
            <span>12</span>
            <span>14 · Aft</span>
            <span>22 · Night</span>
            <span>24</span>
          </div>
        </div>
      </div>

      {/* Active events */}
      <div className="space-y-2">
        <div className="text-[10px] font-extrabold text-paper/40 uppercase mb-2" style={{ letterSpacing: "0.24em" }}>
          Logged this shift ({active.length})
        </div>
        {active.length === 0 && <p className="text-paper/40 text-sm">Nothing yet — scrub forward.</p>}
        {active.slice(-5).reverse().map((e, i) => (
          <div key={i} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-b-0">
            <EventDot kind={e.kind} />
            <span className="mono text-[11px] text-paper/70 w-12">{String(e.hour).padStart(2, "0")}:00</span>
            <span className="text-[13px] text-paper/90 flex-1 truncate">{e.label}</span>
          </div>
        ))}
      </div>

      {upcoming.length > 0 && (
        <div className="mt-5 pt-4 border-t border-white/5 space-y-2">
          <div className="text-[10px] font-extrabold text-paper/30 uppercase mb-2" style={{ letterSpacing: "0.24em" }}>Coming up</div>
          {upcoming.map((e, i) => (
            <div key={i} className="flex items-center gap-3 py-1 opacity-40">
              <EventDot kind={e.kind} />
              <span className="mono text-[11px] text-paper/60 w-12">{String(e.hour).padStart(2, "0")}:00</span>
              <span className="text-[12px] text-paper/70 flex-1 truncate">{e.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function EventDot({ kind }: { kind: Event["kind"] }) {
  const map = {
    fault: "bg-red shadow-[0_0_8px_rgba(208,38,31,0.6)]",
    service: "bg-emerald-400",
    handover: "bg-amber-400",
    shift: "bg-purple",
  }[kind];
  return <span className={`w-2 h-2 rounded-full ${map} flex-none`} />;
}
