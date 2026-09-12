import assets from "@/data/assets.json";
import Link from "next/link";

export default function AssetsList() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">Asset Register</div>
        <h1 className="text-4xl font-bold">Every machine · every memory</h1>
        <p className="text-cream/60 mt-1">Click any asset for full history, service log, and open items.</p>
      </div>

      <div className="flex gap-3">
        <select className="input max-w-xs"><option>All Disciplines</option><option>Mechanical</option><option>Electrical</option><option>Hydraulic</option></select>
        <select className="input max-w-xs"><option>All Statuses</option><option>Operational</option><option>Under Maintenance</option><option>Offline</option></select>
        <input placeholder="Search asset code..." className="input flex-1" />
      </div>

      <div className="card overflow-hidden p-0">
        <table className="w-full text-sm">
          <thead className="bg-charcoal border-b border-white/5">
            <tr className="text-left text-xs text-cream/50 uppercase tracking-wider">
              <th className="px-4 py-3">Asset ID</th><th className="px-4 py-3">Description</th><th className="px-4 py-3">Location</th><th className="px-4 py-3">Discipline</th><th className="px-4 py-3">Health</th><th className="px-4 py-3">Status</th><th className="px-4 py-3">Faults</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {assets.map((a) => (
              <tr key={a.id} className="hover:bg-white/5">
                <td className="px-4 py-3 mono text-red font-semibold"><Link href={`/assets/${a.id}`}>{a.asset_code}</Link></td>
                <td className="px-4 py-3 text-cream/80">{a.description}</td>
                <td className="px-4 py-3 text-cream/60 text-xs">{a.location}</td>
                <td className="px-4 py-3"><span className="pill bg-purple/20 text-purple">{a.discipline}</span></td>
                <td className="px-4 py-3"><span className={a.health_score > 0.75 ? "text-green-400" : a.health_score > 0.5 ? "text-amber-400" : "text-red"}>{Math.round(a.health_score * 100)}%</span></td>
                <td className="px-4 py-3"><span className="pill bg-white/5 text-cream/70">{a.status}</span></td>
                <td className="px-4 py-3">{a.open_faults > 0 ? <span className="text-red font-semibold">{a.open_faults}</span> : <span className="text-cream/30">0</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
