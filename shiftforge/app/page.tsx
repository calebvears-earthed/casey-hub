import assets from "@/data/assets.json";
import reports from "@/data/reports.json";
import timeseries from "@/data/health_timeseries.json";
import Link from "next/link";
import MorningBrief from "@/components/MorningBrief";
import Sparkline from "@/components/Sparkline";

type Series = Record<string, number[]>;

export default function Dashboard() {
  const openFaults = assets.reduce((sum, a) => sum + a.open_faults, 0);
  const critical = reports.filter((r) => r.priority === "critical").length;
  const underMaintenance = assets.filter((a) => a.status === "under_maintenance").length;
  const series = timeseries as Series;

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
      <MorningBrief />

      {/* Stat row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <StatCard label="Active Assets" value={assets.length.toString()} tone="green" sub={`${assets.filter(a => a.status === "operational").length} operational`} />
        <StatCard label="Open Faults" value={openFaults.toString()} tone="amber" sub="across fleet" />
        <StatCard label="Under Maintenance" value={underMaintenance.toString()} tone="amber" sub="assets" />
        <StatCard label="Critical Reports" value={critical.toString()} tone="red" sub="last 24 hrs" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 card">
          <div className="flex items-center justify-between mb-5 gap-3">
            <div>
              <div className="eyebrow mb-1">Feed</div>
              <h2 className="text-xl sm:text-2xl">Recent Handovers</h2>
            </div>
            <Link href="/reports/new" className="btn-ghost whitespace-nowrap">+ New Report</Link>
          </div>
          <div className="space-y-4">
            {reports.slice(0, 5).map((r) => (
              <Link key={r.id} href={`/reports/${r.id}`} className="flex items-start gap-4 pb-4 border-b border-white/5 last:border-b-0 last:pb-0 hover:bg-white/[0.02] -mx-2 px-2 rounded transition-colors">
                <PriorityDot priority={r.priority} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                    <span className="mono text-[11px] text-paper/60">{r.id}</span>
                    <span className="mono text-[11px] font-bold text-red">{r.asset_code}</span>
                    <span className="text-[11px] text-paper/40 uppercase" style={{ letterSpacing: "0.14em" }}>
                      {r.date} · {r.shift} · {r.author}
                    </span>
                  </div>
                  <div className="text-sm text-paper/85 line-clamp-2 leading-relaxed">{r.issues_identified}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="mb-5">
            <div className="eyebrow mb-1">Fleet · 30 Day Trend</div>
            <h2 className="text-xl sm:text-2xl">Equipment Health</h2>
          </div>
          <div className="space-y-4">
            {assets.map((a) => {
              const data = series[a.id] || [];
              const tone = a.health_score > 0.75 ? "#34D399" : a.health_score > 0.5 ? "#FBBF24" : "#D0261F";
              const fill = a.health_score > 0.75 ? "rgba(52, 211, 153, 0.14)" : a.health_score > 0.5 ? "rgba(251, 191, 36, 0.14)" : "rgba(208, 38, 31, 0.16)";
              return (
                <Link href={`/assets/${a.id}`} key={a.id} className="block group">
                  <div className="flex items-center justify-between gap-3 mb-1.5">
                    <span className="mono text-[11px] font-bold text-paper/70 group-hover:text-red transition-colors truncate">
                      {a.asset_code}
                    </span>
                    <div className="flex items-center gap-2 flex-none">
                      <Sparkline data={data} width={70} height={20} stroke={tone} fill={fill} />
                      <span className="mono text-[11px] text-paper/60 w-9 text-right">{Math.round(a.health_score * 100)}%</span>
                    </div>
                  </div>
                </Link>
              );
            })}
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
    <div className="card group hover:border-white/10 transition-colors animate-count-up">
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
