import assets from "@/data/assets.json";
import reports from "@/data/reports.json";
import Link from "next/link";

export default function Dashboard() {
  const openFaults = assets.reduce((sum, a) => sum + a.open_faults, 0);
  const critical = reports.filter((r) => r.priority === "critical").length;
  const underMaintenance = assets.filter((a) => a.status === "under_maintenance").length;
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">Dashboard · Day Shift · 13 Sep 2026</div>
        <h1 className="text-4xl font-bold">Site Ops Overview</h1>
        <p className="text-cream/60 mt-1">Prominent Hill · Real-time asset + shift intelligence</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Active Assets" value={assets.length.toString()} tone="green" sub={`${assets.filter(a => a.status === "operational").length} operational`} />
        <StatCard label="Open Faults" value={openFaults.toString()} tone="amber" sub="across fleet" />
        <StatCard label="Under Maintenance" value={underMaintenance.toString()} tone="amber" sub="assets" />
        <StatCard label="Critical Reports" value={critical.toString()} tone="red" sub="last 24 hrs" />
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Recent Handovers</h2>
            <Link href="/reports/new" className="text-sm text-red hover:underline">+ New Report</Link>
          </div>
          <div className="space-y-3">
            {reports.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-start gap-4 pb-3 border-b border-white/5 last:border-b-0 last:pb-0">
                <PriorityDot priority={r.priority} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="mono text-xs text-cream/70">{r.id}</span>
                    <span className="mono text-xs text-red">{r.asset_code}</span>
                    <span className="text-xs text-cream/50">{r.date} · {r.shift} shift · {r.author}</span>
                  </div>
                  <div className="text-sm text-cream/80 line-clamp-2">{r.issues_identified}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">Equipment Health</h2>
          <div className="space-y-3">
            {assets.map((a) => (
              <Link href={`/assets/${a.id}`} key={a.id} className="block group">
                <div className="flex items-center justify-between mb-1">
                  <span className="mono text-xs text-cream/70 group-hover:text-red">{a.asset_code}</span>
                  <span className="text-xs text-cream/50">{Math.round(a.health_score * 100)}%</span>
                </div>
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${a.health_score > 0.75 ? "bg-green-500" : a.health_score > 0.5 ? "bg-amber-500" : "bg-red"}`} style={{ width: `${a.health_score * 100}%` }} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub, tone }: { label: string; value: string; sub: string; tone: "green" | "amber" | "red" }) {
  const toneClass = tone === "green" ? "text-green-400" : tone === "amber" ? "text-amber-400" : "text-red";
  return (
    <div className="card">
      <div className="text-xs text-cream/50 uppercase tracking-wider mb-2">{label}</div>
      <div className={`text-4xl font-bold ${toneClass} font-heading`}>{value}</div>
      <div className="text-xs text-cream/40 mt-1">{sub}</div>
    </div>
  );
}

function PriorityDot({ priority }: { priority: string }) {
  const color = priority === "critical" ? "bg-red" : priority === "high" ? "bg-amber-500" : priority === "medium" ? "bg-yellow-500" : "bg-green-500";
  return <div className={`w-2 h-2 rounded-full ${color} mt-2`} />;
}
