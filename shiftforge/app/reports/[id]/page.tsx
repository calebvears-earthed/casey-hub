import reports from "@/data/reports.json";
import assets from "@/data/assets.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReportActions from "@/components/ReportActions";

export default function ReportDetail({ params }: { params: { id: string } }) {
  const report = reports.find((r) => r.id === params.id);
  if (!report) return notFound();
  const asset = assets.find((a) => a.id === report.asset_id);

  return (
    <div className="max-w-5xl mx-auto space-y-6 lg:space-y-8">
      <div className="print:hidden">
        <Link href="/reports" className="text-[11px] font-bold text-paper/50 hover:text-red uppercase" style={{ letterSpacing: "0.18em" }}>
          ← Back to Reports
        </Link>
      </div>

      {/* Header lockup — this prints */}
      <div className="card !bg-elevated relative">
        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="eyebrow">Handover Report</span>
              <PriorityPill priority={report.priority} />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl leading-none mb-2 break-words">
              <span className="mono text-red">{report.id}</span> · {report.asset_code}
            </h1>
            <p className="text-paper/60 mt-2 text-sm">
              {asset?.description} · {asset?.location}
            </p>
          </div>
          <div className="text-left sm:text-right w-full sm:w-auto grid grid-cols-3 sm:grid-cols-1 gap-3 sm:gap-0 pt-3 sm:pt-0 border-t sm:border-0 border-white/5">
            <div>
              <div className="stat-label mb-1 sm:mb-1">Shift</div>
              <div className="text-sm sm:text-lg font-bold uppercase" style={{ letterSpacing: "0.18em" }}>{report.shift}</div>
            </div>
            <div>
              <div className="stat-label mt-0 sm:mt-3 mb-1">Date</div>
              <div className="mono text-sm sm:text-lg text-paper">{report.date}</div>
            </div>
            <div>
              <div className="stat-label mt-0 sm:mt-3 mb-1">Author</div>
              <div className="text-xs sm:text-sm font-bold text-paper">{report.author}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions (hidden on print) */}
      <div className="print:hidden">
        <ReportActions
          reportId={report.id}
          assetCode={report.asset_code}
          priority={report.priority}
          author={report.author}
          issues={report.issues_identified}
        />
      </div>

      {/* Body sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Work Completed" body={report.work_completed} />
        <Section title="Issues Identified" body={report.issues_identified} tone="red" />
        <Section title="Actions Taken" body={report.actions_taken} />
        <Section title="Parts Used" body={report.parts_used} mono />
        <Section title="Delays" body={report.delays} />
        <Section title="Current Status" body={humanStatus(report.current_status)} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Section title="Planned Next Shift" body={report.planned_next} />
        <Section title="Recommendations" body={report.recommendations} tone="red" />
      </div>

      {/* Signature panel */}
      <div className="card">
        <div className="eyebrow mb-3">Sign-off</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <SignatureBlock label="Author" name={report.author} date={report.date} />
          <SignatureBlock label="Supervisor" name="Ryan Porteous" date="pending" />
          <SignatureBlock label="Engineering Review" name="Sam Chen" date="pending" />
        </div>
      </div>

      <div className="text-[10px] text-paper/30 uppercase text-center pt-6" style={{ letterSpacing: "0.28em" }}>
        Generated in ShiftForge · Powered by Top Gun Engineering · Prominent Hill · {report.date}
      </div>
    </div>
  );
}

function Section({ title, body, tone, mono }: { title: string; body: string; tone?: "red"; mono?: boolean }) {
  return (
    <div className="card">
      <div className={`eyebrow mb-3 ${tone === "red" ? "text-red" : ""}`}>{title}</div>
      <p className={`text-[14px] leading-relaxed ${mono ? "mono text-paper/85" : "text-paper/90"}`}>{body || "—"}</p>
    </div>
  );
}

function SignatureBlock({ label, name, date }: { label: string; name: string; date: string }) {
  return (
    <div>
      <div className="stat-label mb-2">{label}</div>
      <div className="h-14 border-b border-white/15 flex items-end">
        <span className="text-lg text-paper italic pb-1" style={{ fontFamily: "serif" }}>
          {date !== "pending" ? name : ""}
        </span>
      </div>
      <div className="text-[11px] mt-2 flex items-center justify-between text-paper/50 uppercase" style={{ letterSpacing: "0.14em" }}>
        <span>{name}</span>
        <span className={date === "pending" ? "text-amber-400" : "text-paper/60"}>{date}</span>
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

function humanStatus(s: string) {
  return s.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}
