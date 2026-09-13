import reports from "@/data/reports.json";
import Link from "next/link";

export default function ReportsIndex() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <div className="eyebrow mb-3">All Reports</div>
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-5xl leading-none">Report Archive</h1>
            <p className="text-paper/60 mt-3 text-sm">Every handover, every shift, every asset · fully searchable</p>
          </div>
          <Link href="/reports/new" className="btn-primary">+ New Report</Link>
        </div>
        <div className="divider-red mt-5" />
      </div>

      {/* Filters (concept — non-functional pills) */}
      <div className="flex flex-wrap gap-2">
        {["All", "Day", "Afternoon", "Night", "Critical only", "Last 7 days", "My reports"].map((f, i) => (
          <button
            key={f}
            className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase transition-all ${
              i === 0 ? "bg-red text-paper" : "border border-white/10 text-paper/60 hover:text-paper hover:border-white/20"
            }`}
            style={{ letterSpacing: "0.18em" }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
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
