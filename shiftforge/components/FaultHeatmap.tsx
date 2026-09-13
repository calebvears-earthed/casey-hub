"use client";
import { useMemo, useState } from "react";

// Concept-mode: procedural 30-day fault intensity per asset code
function seed(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0;
  return () => {
    h = (h * 9301 + 49297) % 233280;
    return h / 233280;
  };
}

type Props = { assetCodes: string[] };

export default function FaultHeatmap({ assetCodes }: Props) {
  const [hovered, setHovered] = useState<{ code: string; day: number; count: number } | null>(null);

  const grid = useMemo(() => {
    return assetCodes.map((code) => {
      const rand = seed(code);
      const days = Array.from({ length: 30 }).map(() => {
        const r = rand();
        // sparse — mostly 0-1, occasional 2-4
        if (r > 0.94) return 4;
        if (r > 0.85) return 3;
        if (r > 0.72) return 2;
        if (r > 0.5) return 1;
        return 0;
      });
      return { code, days };
    });
  }, [assetCodes]);

  const colorFor = (n: number) =>
    n === 0 ? "bg-white/[0.04]"
    : n === 1 ? "bg-red/25"
    : n === 2 ? "bg-red/50"
    : n === 3 ? "bg-red/75"
    : "bg-red shadow-[0_0_8px_rgba(208,38,31,0.7)]";

  const dayLabels = ["30d", "", "", "", "", "", "24d", "", "", "", "", "", "18d", "", "", "", "", "", "12d", "", "", "", "", "", "6d", "", "", "", "", "0"];

  return (
    <div className="card">
      <div className="mb-4">
        <div className="eyebrow mb-1">Fault Density</div>
        <h2 className="text-xl">30-Day Heatmap</h2>
        <p className="text-paper/50 text-[12px] mt-1">Every square = one shift. Redder = more faults filed that day.</p>
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <div className="min-w-max">
          <div className="grid grid-cols-[80px_repeat(30,1fr)] gap-[3px] items-center mb-1">
            <div />
            {dayLabels.map((l, i) => (
              <div key={i} className="text-[8px] text-paper/30 mono text-center h-3">{l}</div>
            ))}
          </div>
          {grid.map(({ code, days }) => (
            <div key={code} className="grid grid-cols-[80px_repeat(30,1fr)] gap-[3px] mb-[3px] items-center">
              <div className="mono text-[10px] font-bold text-paper/70 truncate pr-2">{code}</div>
              {days.map((n, d) => (
                <button
                  key={d}
                  onMouseEnter={() => setHovered({ code, day: d, count: n })}
                  onMouseLeave={() => setHovered(null)}
                  className={`aspect-square rounded-[3px] ${colorFor(n)} transition-transform hover:scale-125 hover:z-10 relative`}
                  aria-label={`${code} day ${30 - d}: ${n} faults`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-white/5 text-[10px] font-extrabold text-paper/40 uppercase" style={{ letterSpacing: "0.22em" }}>
        <div>
          {hovered ? (
            <span className="text-paper">
              <span className="text-red">{hovered.code}</span> · day-{30 - hovered.day} · {hovered.count} fault{hovered.count === 1 ? "" : "s"}
            </span>
          ) : (
            "Hover a cell for detail"
          )}
        </div>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((n) => (
            <span key={n} className={`w-3 h-3 rounded-[3px] ${colorFor(n)}`} />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}
