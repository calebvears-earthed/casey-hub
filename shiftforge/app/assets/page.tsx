import assets from "@/data/assets.json";
import Link from "next/link";

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
              <th className="px-4 py-3 font-extrabold">Health</th>
              <th className="px-4 py-3 font-extrabold">Status</th>
              <th className="px-4 py-3 font-extrabold">Faults</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {assets.map((a) => (
              <tr key={a.id} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-4 py-3 mono text-red font-bold"><Link href={`/assets/${a.id}`}>{a.asset_code}</Link></td>
                <td className="px-4 py-3 text-paper/85">{a.description}</td>
                <td className="px-4 py-3 text-paper/60 text-xs">{a.location}</td>
                <td className="px-4 py-3"><span className="pill bg-purple/20 text-purple">{a.discipline}</span></td>
                <td className="px-4 py-3 mono text-[13px]"><span className={a.health_score > 0.75 ? "text-emerald-400" : a.health_score > 0.5 ? "text-amber-400" : "text-red"}>{Math.round(a.health_score * 100)}%</span></td>
                <td className="px-4 py-3"><span className="pill bg-white/5 text-paper/70">{a.status.replace(/_/g, " ")}</span></td>
                <td className="px-4 py-3 mono">{a.open_faults > 0 ? <span className="text-red font-bold">{a.open_faults}</span> : <span className="text-paper/30">0</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {assets.map((a) => (
          <Link key={a.id} href={`/assets/${a.id}`} className="block card active:bg-white/[0.03] transition-colors">
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="mono text-[14px] font-bold text-red">{a.asset_code}</span>
                <span className="pill bg-purple/20 text-purple">{a.discipline}</span>
              </div>
              <span className={`mono text-[13px] font-bold ${a.health_score > 0.75 ? "text-emerald-400" : a.health_score > 0.5 ? "text-amber-400" : "text-red"}`}>
                {Math.round(a.health_score * 100)}%
              </span>
            </div>
            <div className="text-[14px] text-paper/90 font-bold leading-snug">{a.description}</div>
            <div className="text-[11px] text-paper/50 mt-1">{a.location}</div>
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
              <span className="pill bg-white/5 text-paper/70">{a.status.replace(/_/g, " ")}</span>
              <div className="text-[11px] uppercase text-paper/60" style={{ letterSpacing: "0.16em" }}>
                {a.open_faults > 0 ? <span className="text-red font-bold">{a.open_faults} open faults</span> : <span className="text-emerald-400">All clear</span>}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
