import assets from "@/data/assets.json";
import timeseries from "@/data/health_timeseries.json";
import Link from "next/link";
import Sparkline from "@/components/Sparkline";

type Series = Record<string, number[]>;
const series = timeseries as Series;

function toneFor(score: number) {
  if (score > 0.75) return { stroke: "#34D399", fill: "rgba(52, 211, 153, 0.14)", text: "text-emerald-400" };
  if (score > 0.5) return { stroke: "#FBBF24", fill: "rgba(251, 191, 36, 0.14)", text: "text-amber-400" };
  return { stroke: "#D0261F", fill: "rgba(208, 38, 31, 0.16)", text: "text-red" };
}

export default function AssetsList() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="eyebrow mb-3">Asset Register</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Every machine · every memory</h1>
        <p className="text-paper/60 mt-2 text-sm">Click any asset for full history, service log, and open items.</p>
        <div className="divider-red mt-4" />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <select className="input sm:max-w-xs"><option>All Disciplines</option><option>Mechanical</option><option>Electrical</option><option>Hydraulic</option></select>
        <select className="input sm:max-w-xs"><option>All Statuses</option><option>Operational</option><option>Under Maintenance</option><option>Offline</option></select>
        <input placeholder="Search asset code..." className="input sm:flex-1" />
      </div>

      {/* Desktop table */}
      <div className="hidden md:block card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-charcoal/60 border-b border-white/5">
            <tr className="text-left text-[10px] text-paper/50 uppercase" style={{ letterSpacing: "0.2em" }}>
              <th className="px-4 py-3 font-extrabold">Asset ID</th>
              <th className="px-4 py-3 font-extrabold">Description</th>
              <th className="px-4 py-3 font-extrabold">Location</th>
              <th className="px-4 py-3 font-extrabold">Discipline</th>
              <th className="px-4 py-3 font-extrabold">30d Trend</th>
              <th className="px-4 py-3 font-extrabold">Health</th>
              <th className="px-4 py-3 font-extrabold">Status</th>
              <th className="px-4 py-3 font-extrabold">Faults</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {assets.map((a) => {
              const t = toneFor(a.health_score);
              return (
                <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-4 py-3 mono text-red font-bold"><Link href={`/assets/${a.id}`}>{a.asset_code}</Link></td>
                  <td className="px-4 py-3 text-paper/85">{a.description}</td>
                  <td className="px-4 py-3 text-paper/60 text-xs">{a.location}</td>
                  <td className="px-4 py-3"><span className="pill bg-purple/20 text-purple">{a.discipline}</span></td>
                  <td className="px-4 py-3"><Sparkline data={series[a.id] || []} width={80} height={22} stroke={t.stroke} fill={t.fill} /></td>
                  <td className={`px-4 py-3 mono text-[13px] font-bold ${t.text}`}>{Math.round(a.health_score * 100)}%</td>
                  <td className="px-4 py-3"><span className="pill bg-white/5 text-paper/70">{a.status.replace(/_/g, " ")}</span></td>
                  <td className="px-4 py-3 mono">{a.open_faults > 0 ? <span className="text-red font-bold">{a.open_faults}</span> : <span className="text-paper/30">0</span>}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {assets.map((a) => {
          const t = toneFor(a.health_score);
          return (
            <Link key={a.id} href={`/assets/${a.id}`} className="block card active:bg-white/[0.03] transition-colors">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="mono text-[14px] font-bold text-red">{a.asset_code}</span>
                  <span className="pill bg-purple/20 text-purple">{a.discipline}</span>
                </div>
                <span className={`mono text-[13px] font-bold ${t.text}`}>{Math.round(a.health_score * 100)}%</span>
              </div>
              <div className="text-[14px] text-paper/90 font-bold leading-snug">{a.description}</div>
              <div className="text-[11px] text-paper/50 mt-1">{a.location}</div>
              <div className="mt-3 flex items-center gap-3">
                <Sparkline data={series[a.id] || []} width={120} height={22} stroke={t.stroke} fill={t.fill} />
                <div className="text-[10px] text-paper/40 uppercase" style={{ letterSpacing: "0.18em" }}>30d trend</div>
              </div>
              <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                <span className="pill bg-white/5 text-paper/70">{a.status.replace(/_/g, " ")}</span>
                <div className="text-[11px] uppercase text-paper/60" style={{ letterSpacing: "0.16em" }}>
                  {a.open_faults > 0 ? <span className="text-red font-bold">{a.open_faults} open faults</span> : <span className="text-emerald-400">All clear</span>}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
