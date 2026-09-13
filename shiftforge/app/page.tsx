import assets from "@/data/assets.json";
import reports from "@/data/reports.json";
import Link from "next/link";

export default function Dashboard() {
  const openFaults = assets.reduce((sum, a) => sum + a.open_faults, 0);
  const critical = reports.filter((r) => r.priority === "critical").length;
  const underMaintenance = assets.filter((a) => a.status === "under_maintenance").length;
  return (
    <div className="max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div>
        <div className="eyebrow mb-3">Dashboard · Day Shift · 13 Sep 2026</div>
        <h1 className="text-5xl leading-none">Site Ops Overview</h1>
        <p className="text-paper/60 mt-3 text-sm">Prominent Hill · Real-time asset + shift intelligence</p>
        <div className="divider-red mt-5" />
      </div>

      {/* Stat row */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="Active Assets" value={assets.length.toString()} tone="green" sub={`${assets.filter(a => a.status === "operational").length} operational`} />
        <StatCard label="Open Faults" value={openFaults.toString()} tone="amber" sub="across fleet" />
        <StatCard label="Under Maintenance" value={underMaintenance.toString()} tone="amber" sub="assets" />
        <StatCard label="Critical Reports" value={critical.toString()} tone="red" sub="last 24 hrs" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 card">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="eyebrow mb-1">Feed</div>
              <h2 className="text-2xl">Recent Handovers</h2>
            </div>
            <Link href="/reports/new" className="btn-ghost">+ New Report</Link>
          </div>
          <div className="space-y-4">
            {reports.slice(0, 5).map((r) => (
              <div key={r.id} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-b-0 last:pb-0">
                <PriorityDot priority={r.priority} />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="mono text-[11px] text-paper/60">{r.id}</span>
                    <span className="mono text-[11px] font-bold text-red">{r.asset_code}</span>
                    <span className="text-[11px] text-paper/40 uppercase" style={{ letterSpacing: "0.14em" }}>
                      {r.date} · {r.shift} · {r.author}
                    </span>
                  </div>
                  <div className="text-sm text-paper/85 line-clamp-2 leading-relaxed">{r.issues_identified}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="mb-5">
            <div className="eyebrow mb-1">Fleet</div>
            <h2 className="text-2xl">Equipment Health</h2>
          </div>
          <div className="space-y-4">
            {assets.map((a) => (
              <Link href={`/assets/${a.id}`} key={a.id} className="block group">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="mono text-[11px] font-bold text-paper/70 group-hover:text-red transition-colors">
                    {a.asset_code}
                  </span>
                  <span className="mono text-[11px] text-paper/50">{Math.round(a.health_score * 100)}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${a.health_score > 0.75 ? "bg-emerald-400" : a.health_score > 0.5 ? "bg-amber-400" : "bg-red"}`}
                    style={{ width: `${a.health_score * 100}%` }}
                  />
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
  const toneClass = tone === "green" ? "text-emerald-400" : tone === "amber" ? "text-amber-400" : "text-red";
  const stripe = tone === "green" ? "from-emerald-400/60" : tone === "amber" ? "from-amber-400/60" : "from-red/70";
  return (
    <div className="card group hover:border-white/10 transition-colors">
      <div className={`absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b ${stripe} to-transparent rounded-full`} />
      <div className="stat-label mb-3">{label}</div>
      <div className={`stat-value ${toneClass}`}>{value}</div>
      <div className="text-[11px] text-paper/40 mt-2 uppercase" style={{ letterSpacing: "0.16em" }}>{sub}</div>
    </div>
  );
}

function PriorityDot({ priority }: { priority: string }) {
  const color =
    priority === "critical" ? "bg-red shadow-[0_0_10px_rgba(208,38,31,0.6)]" :
    priority === "high" ? "bg-amber-400" :
    priority === "medium" ? "bg-yellow-500" :
    "bg-emerald-400";
  return <div className={`w-2 h-2 rounded-full ${color} mt-2 flex-none`} />;
}
