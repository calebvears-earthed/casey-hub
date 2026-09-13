import assets from "@/data/assets.json";
import Image from "next/image";
import Link from "next/link";

// Mock coordinates on the pit-trails.png (percentages 0-100)
const positions: Record<string, { x: number; y: number }> = {
  "AST-001": { x: 78, y: 62 }, // C32 conveyor – underground
  "AST-002": { x: 72, y: 74 }, // HYD-014 – underground
  "AST-003": { x: 22, y: 30 }, // TF-500-A – surface substation
  "AST-004": { x: 55, y: 46 }, // Cat793 haul truck – on the ring road
  "AST-005": { x: 88, y: 82 }, // DM45 drill – pit bench
};

export default function SiteMap() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      <div>
        <div className="eyebrow mb-3">Site Map · Live</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Prominent Hill · Fleet Positions</h1>
        <p className="text-paper/60 mt-2 text-sm">Every asset, live-plotted on the pit. Click a marker to jump into its digital twin.</p>
        <div className="divider-red mt-4" />
      </div>

      <div className="card p-0 overflow-hidden relative">
        <div className="relative aspect-[16/10] w-full">
          <Image src="/renders/pit-trails.png" alt="Prominent Hill pit" fill className="object-cover" priority sizes="(max-width: 1024px) 100vw, 1200px" />
          {/* Dark overlay so pins pop */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

          {/* Pins */}
          {assets.map((a) => {
            const pos = positions[a.id];
            if (!pos) return null;
            const tone = a.health_score > 0.75 ? "emerald" : a.health_score > 0.5 ? "amber" : "red";
            const bgColor = tone === "emerald" ? "bg-emerald-400" : tone === "amber" ? "bg-amber-400" : "bg-red";
            const glowColor =
              tone === "emerald" ? "rgba(52, 211, 153, 0.7)" :
              tone === "amber" ? "rgba(251, 191, 36, 0.7)" :
              "rgba(208, 38, 31, 0.8)";
            return (
              <Link
                key={a.id}
                href={`/assets/${a.id}`}
                className="absolute -translate-x-1/2 -translate-y-1/2 group"
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="relative">
                  {/* Ping halo */}
                  <span className={`absolute inset-0 rounded-full ${bgColor} opacity-40 animate-ping`} />
                  <span
                    className={`relative block w-3 h-3 rounded-full ${bgColor} border-2 border-paper`}
                    style={{ boxShadow: `0 0 12px ${glowColor}` }}
                  />
                </div>
                {/* Label */}
                <div className="absolute left-1/2 -translate-x-1/2 top-5 whitespace-nowrap opacity-70 group-hover:opacity-100 transition-opacity">
                  <div className="mono text-[10px] font-bold text-paper bg-charcoal/90 border border-white/10 rounded px-1.5 py-0.5 backdrop-blur-sm">
                    {a.asset_code}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Legend */}
        <div className="p-4 border-t border-white/5 flex flex-wrap items-center gap-4 text-[11px] font-bold text-paper/70 uppercase" style={{ letterSpacing: "0.16em" }}>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px rgba(52,211,153,0.6)" }} />
            Operational
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" style={{ boxShadow: "0 0 6px rgba(251,191,36,0.6)" }} />
            Watch
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red" style={{ boxShadow: "0 0 6px rgba(208,38,31,0.7)" }} />
            Fault / Overdue
          </div>
          <div className="ml-auto text-paper/40">Refreshed just now · concept mode</div>
        </div>
      </div>

      {/* Asset quick list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {assets.map((a) => (
          <Link key={a.id} href={`/assets/${a.id}`} className="card active:bg-white/[0.03] transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="mono text-[12px] font-bold text-red">{a.asset_code}</span>
              <span className={`mono text-[11px] font-bold ${a.health_score > 0.75 ? "text-emerald-400" : a.health_score > 0.5 ? "text-amber-400" : "text-red"}`}>
                {Math.round(a.health_score * 100)}%
              </span>
            </div>
            <div className="text-[12px] text-paper/80 font-bold leading-snug line-clamp-2">{a.description}</div>
            <div className="text-[10px] text-paper/40 mt-1.5 uppercase" style={{ letterSpacing: "0.14em" }}>
              {a.location.split("·")[0].trim()}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
