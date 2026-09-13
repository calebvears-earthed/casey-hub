import reports from "@/data/reports.json";
import Link from "next/link";

export default function ReportsIndex() {
  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
      <div>
        <div className="eyebrow mb-3">All Reports</div>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-none">Report Archive</h1>
            <p className="text-paper/60 mt-3 text-sm">Every handover, every shift, every asset · fully searchable</p>
          </div>
          <Link href="/reports/new" className="btn-primary self-start sm:self-auto">+ New Report</Link>
        </div>
        <div className="divider-red mt-5" />
      </div>

      {/* Filters — horizontal scroll on mobile */}
      <div className="flex flex-nowrap gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap">
        {["All", "Day", "Afternoon", "Night", "Critical only", "Last 7 days", "My reports"].map((f, i) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase transition-all whitespace-nowrap flex-none ${
              i === 0 ? "bg-red text-paper" : "border border-white/10 text-paper/60 hover:text-paper hover:border-white/20"
            }`}
            style={{ letterSpacing: "0.18em" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Desktop table */}
      <div className="hidden md:block card p-0 overflow-hidden">
        <div className="grid grid-cols-[110px_130px_130px_120px_160px_1fr_100px] gap-3 px-5 py-3 border-b border-white/5 text-[10px] font-extrabold text-paper/40 uppercase" style={{ letterSpacing: "0.24em" }}>
          <div>Report</div>
          <div>Asset</div>
          <div>Date</div>
          <div>Shift</div>
          <div>Author</div>
          <div>Headline</div>
          <div className="text-right">Priority</div>
        </div>
        {reports.map((r) => (
          <Link
            key={r.id}
            href={`/reports/${r.id}`}
            className="grid grid-cols-[110px_130px_130px_120px_160px_1fr_100px] gap-3 px-5 py-4 border-b border-white/5 last:border-b-0 hover:bg-white/[0.02] transition-colors items-center group"
          >
            <div className="mono text-[12px] text-paper/70 group-hover:text-paper">{r.id}</div>
            <div className="mono text-[12px] font-bold text-red">{r.asset_code}</div>
            <div className="text-[12px] text-paper/70">{r.date}</div>
            <div className="text-[11px] text-paper/60 uppercase" style={{ letterSpacing: "0.14em" }}>{r.shift}</div>
            <div className="text-[12px] text-paper/80">{r.author}</div>
            <div className="text-[13px] text-paper/85 truncate">{r.issues_identified}</div>
            <div className="text-right">
              <PriorityPill priority={r.priority} />
            </div>
          </Link>
        ))}
      </div>

      {/* Mobile cards */}
      <div className="md:hidden space-y-3">
        {reports.map((r) => (
          <Link
            key={r.id}
            href={`/reports/${r.id}`}
            className="block card active:bg-white/[0.03] transition-colors"
          >
            <div className="flex items-start justify-between gap-3 mb-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="mono text-[12px] font-bold text-red">{r.asset_code}</span>
                <span className="mono text-[11px] text-paper/60">{r.id}</span>
              </div>
              <PriorityPill priority={r.priority} />
            </div>
            <div className="text-[14px] text-paper/90 leading-snug mb-3">{r.issues_identified}</div>
            <div className="flex items-center gap-3 text-[10px] text-paper/50 uppercase" style={{ letterSpacing: "0.16em" }}>
              <span>{r.date}</span>
              <span>·</span>
              <span>{r.shift} shift</span>
              <span>·</span>
              <span>{r.author}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function PriorityPill({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    critical: "bg-red/20 text-red",
    high: "bg-amber-500/15 text-amber-400",
    medium: "bg-yellow-500/15 text-yellow-300",
    low: "bg-emerald-500/15 text-emerald-400",
  };
  return <span className={`pill ${map[priority] ?? "bg-white/5 text-paper/60"}`}>{priority}</span>;
}
