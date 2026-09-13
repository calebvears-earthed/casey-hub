import assets from "@/data/assets.json";
import reports from "@/data/reports.json";

export default function Analytics() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">Analytics · Last 30 Days</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Patterns · Predictions · Cost Avoidance</h1>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <div className="card"><div className="text-xs text-cream/50 uppercase">Total Reports</div><div className="text-3xl font-heading font-bold text-cream">{reports.length}</div><div className="text-xs text-green-400">+18% vs prior 30 days</div></div>
        <div className="card"><div className="text-xs text-cream/50 uppercase">Faults Caught Early</div><div className="text-3xl font-heading font-bold text-green-400">7</div><div className="text-xs text-cream/50">before failure</div></div>
        <div className="card"><div className="text-xs text-cream/50 uppercase">Est. Downtime Prevented</div><div className="text-3xl font-heading font-bold text-red">$186k</div><div className="text-xs text-cream/50">this month</div></div>
        <div className="card"><div className="text-xs text-cream/50 uppercase">Avg Handover Time</div><div className="text-3xl font-heading font-bold text-cream">4.2min</div><div className="text-xs text-green-400">-71% vs paper baseline</div></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="text-lg font-bold mb-4">AI-flagged trends</h2>
          <div className="space-y-3">
            <div className="border-l-2 border-red pl-3">
              <div className="font-semibold text-sm">HYD-014 · rising return temp trend</div>
              <div className="text-xs text-cream/60 mt-1">4 reports in 5 shifts flagged elevated hydraulic temp. Predictive model estimates pump replacement needed within 240 hrs before catastrophic failure.</div>
              <div className="text-xs text-red mt-1 font-semibold">Recommended action: schedule pump swap this week</div>
            </div>
            <div className="border-l-2 border-amber-500 pl-3">
              <div className="font-semibold text-sm">C32-01 · DE bearing wear signature</div>
              <div className="text-xs text-cream/60 mt-1">Vibration + thermal trending up over 3 shifts. Trend consistent with early bearing wear.</div>
              <div className="text-xs text-amber-400 mt-1 font-semibold">Recommended action: order SKF 22320 spare</div>
            </div>
            <div className="border-l-2 border-purple pl-3">
              <div className="font-semibold text-sm">Drill fleet · seal kit failures</div>
              <div className="text-xs text-cream/60 mt-1">3 rotation head seal failures in 12 months across the Sandvik fleet — investigate common root cause with reliability engineering.</div>
              <div className="text-xs text-purple mt-1 font-semibold">Recommended action: reliability review</div>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-lg font-bold mb-4">Asset health leaderboard</h2>
          <div className="space-y-2">
            {[...assets].sort((a, b) => a.health_score - b.health_score).map((a) => (
              <div key={a.id} className="flex items-center gap-3 py-2 border-b border-white/5 last:border-b-0">
                <span className="mono text-xs text-red w-24">{a.asset_code}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${a.health_score > 0.75 ? "bg-green-500" : a.health_score > 0.5 ? "bg-amber-500" : "bg-red"}`} style={{ width: `${a.health_score * 100}%` }} />
                </div>
                <span className="text-xs text-cream/60 w-12 text-right">{Math.round(a.health_score * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="text-lg font-bold mb-2">Natural language query</h2>
        <p className="text-cream/60 text-sm mb-3">Ask ShiftForge anything about your fleet, shifts, or history.</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input className="input flex-1" placeholder="e.g. show me every hydraulic fault on level 72 in the last 60 days" />
          <button className="btn-primary sm:flex-none">Ask AI</button>
        </div>
      </div>
    </div>
  );
}
