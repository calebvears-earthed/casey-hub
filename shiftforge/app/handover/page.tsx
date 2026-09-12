import reports from "@/data/reports.json";
import assets from "@/data/assets.json";

export default function Handover() {
  const openItems = reports.filter((r) => r.priority !== "low").slice(0, 4);
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">Handover Briefing · Day Shift · 13 Sep 2026 · 06:00</div>
        <h1 className="text-4xl font-bold">Read + acknowledge before starting work.</h1>
      </div>

      <div className="card border-red/40">
        <div className="flex items-start gap-3 mb-4">
          <div className="text-red text-2xl">⚡</div>
          <div>
            <div className="font-bold text-lg text-cream">AI Summary from Night Shift</div>
            <div className="text-sm text-cream/60">Auto-generated from 3 reports filed 22:00-05:59 · reviewed + signed by Ryan Porteous (Night Supervisor)</div>
          </div>
        </div>
        <div className="text-cream/90 leading-relaxed space-y-2">
          <p>Night shift completed hydraulic filter replacement on <span className="mono text-red">HYD-014</span> — return temp still elevated post-service, oil sample sent to lab. <span className="text-amber-400 font-semibold">Watch this closely today</span>.</p>
          <p>Bearing grease service done on <span className="mono text-red">C32-01</span> DE bearing — trending 4°C above baseline for 3rd consecutive shift. Order SKF 22320 spare.</p>
          <p>Drill <span className="mono text-red">DRL-DM45-02</span> down 48+ hours awaiting Sandvik seal kit — <span className="text-red font-semibold">critical</span>, blocking production Bench 12.</p>
        </div>
      </div>

      <div className="card">
        <h2 className="text-xl font-bold mb-4">Open items from previous shifts</h2>
        <div className="space-y-3">
          {openItems.map((r) => (
            <div key={r.id} className="flex items-start gap-4 pb-3 border-b border-white/5 last:border-b-0">
              <span className={`pill ${r.priority === "critical" ? "bg-red/20 text-red" : "bg-amber-500/20 text-amber-400"}`}>{r.priority}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="mono text-xs text-red">{r.asset_code}</span>
                  <span className="text-xs text-cream/50">{r.date} · {r.shift}</span>
                </div>
                <div className="text-sm text-cream/90 mt-0.5">{r.planned_next}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button className="btn-primary">✓ Read + Acknowledge — Start Shift</button>
        <button className="btn-ghost">Raise question with Supervisor</button>
      </div>
    </div>
  );
}
