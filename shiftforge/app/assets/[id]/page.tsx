import assets from "@/data/assets.json";
import reports from "@/data/reports.json";
import specs from "@/data/asset_specs.json";
import schedules from "@/data/service_schedules.json";
import docs from "@/data/documents.json";
import notesData from "@/data/notes.json";
import Link from "next/link";
import { notFound } from "next/navigation";
import NotesPanel from "@/components/NotesPanel";

type SpecMap = Record<string, { key: string; value: string }[]>;
type DocMap = Record<string, { id: string; type: string; title: string; date: string; size: string }[]>;
type SchedItem = {
  id: string;
  interval: string;
  task: string;
  last_completed: string | null;
  next_due_hours?: number | null;
  next_due_date?: string;
  current_hours?: number;
  status: "on_track" | "due_soon" | "overdue" | "planning";
  parts: string[];
};
type SchedMap = Record<string, SchedItem[]>;

export default function AssetDetail({ params }: { params: { id: string } }) {
  const asset = assets.find((a) => a.id === params.id);
  if (!asset) return notFound();

  const history = reports.filter((r) => r.asset_id === asset.id);
  const assetSpecs = (specs as SpecMap)[asset.id] ?? [];
  const assetDocs = (docs as DocMap)[asset.id] ?? [];
  const assetSchedule = (schedules as SchedMap)[asset.id] ?? [];
  const assetNotes = notesData.filter((n) => n.asset_id === asset.id);

  const runtimePct = Math.round((asset.service_hours / asset.expected_life_hours) * 100);
  const overdueCount = assetSchedule.filter((s) => s.status === "overdue").length;
  const dueSoonCount = assetSchedule.filter((s) => s.status === "due_soon").length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 lg:space-y-8">
      <div>
        <Link href="/assets" className="text-[11px] font-bold text-paper/50 hover:text-red uppercase" style={{ letterSpacing: "0.18em" }}>
          ← Back to Assets
        </Link>
      </div>

      {/* 1 · HEADER STRIP */}
      <div className="card relative">
        <div className="flex items-start justify-between gap-4 sm:gap-6 flex-wrap">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-3 flex-wrap">
              <span className="mono text-red text-2xl sm:text-3xl font-black">{asset.asset_code}</span>
              <span className="pill bg-purple/20 text-purple">{asset.discipline}</span>
              <StatusPill status={asset.status} />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl leading-tight">{asset.description}</h1>
            <p className="text-paper/60 text-sm mt-2">{asset.location}</p>
            <div className="flex items-center gap-2 sm:gap-4 mt-4 text-[10px] sm:text-[11px] text-paper/50 uppercase flex-wrap" style={{ letterSpacing: "0.16em" }}>
              <span>{asset.make}</span>
              <span>·</span>
              <span>{asset.model}</span>
              <span className="hidden sm:inline">·</span>
              <span className="mono normal-case w-full sm:w-auto">{asset.serial}</span>
            </div>
          </div>

          {/* QR mock */}
          <div className="text-right flex-none">
            <div className="stat-label mb-2">Scan</div>
            <div className="w-20 h-20 sm:w-24 sm:h-24 grid grid-cols-6 grid-rows-6 gap-[2px] bg-paper p-1.5 rounded-md">
              {Array.from({ length: 36 }).map((_, i) => (
                <div key={i} className={`${(i * 7 + 3) % 5 === 0 || (i * 11 + 1) % 3 === 0 ? "bg-ink" : "bg-paper"}`} />
              ))}
            </div>
            <div className="text-[9px] mono text-paper/40 mt-1.5">SF:{asset.id}</div>
          </div>
        </div>
      </div>

      {/* 2 · LIVE STATUS TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <MiniStat label="Health" value={`${Math.round(asset.health_score * 100)}%`} tone={asset.health_score > 0.75 ? "green" : asset.health_score > 0.5 ? "amber" : "red"} />
        <MiniStat label="Runtime" value={asset.service_hours.toLocaleString()} sub={`of ${asset.expected_life_hours.toLocaleString()} h · ${runtimePct}%`} />
        <MiniStat label="Open Faults" value={asset.open_faults.toString()} tone={asset.open_faults === 0 ? "green" : asset.open_faults > 3 ? "red" : "amber"} />
        <MiniStat label="Overdue" value={overdueCount.toString()} sub="services" tone={overdueCount > 0 ? "red" : "green"} />
        <MiniStat label="Due Soon" value={dueSoonCount.toString()} sub="in next 500 h" tone={dueSoonCount > 0 ? "amber" : "green"} />
      </div>

      {/* 3 · SPEC SHEET + 4 · DOCS side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-1">
          <div className="mb-4">
            <div className="eyebrow mb-1">Spec Sheet</div>
            <h2 className="text-xl">Machine Details</h2>
          </div>
          <dl className="space-y-2 text-sm">
            <Row label="Install Date" value={asset.install_date} />
            <Row label="Warranty" value={asset.warranty_expires || "Out of warranty"} />
            <Row label="Custodian" value={asset.custodian_crew} />
            <Row label="Site" value={asset.site} />
            {assetSpecs.map((s) => (
              <Row key={s.key} label={s.key} value={s.value} mono={s.value.includes("mm") || s.value.includes("kW") || s.value.includes("V")} />
            ))}
          </dl>
        </div>

        <div className="card lg:col-span-2">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <div className="eyebrow mb-1">Document Library</div>
              <h2 className="text-xl">Manuals, Drawings, Certificates</h2>
            </div>
            <button className="btn-ghost">+ Attach Doc</button>
          </div>
          <div className="space-y-2">
            {assetDocs.map((d) => (
              <div key={d.id} className="flex items-center gap-3 p-3 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all cursor-pointer">
                <DocIcon type={d.type} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold text-paper truncate">{d.title}</div>
                  <div className="text-[11px] text-paper/50 uppercase mt-0.5" style={{ letterSpacing: "0.14em" }}>
                    <span className="text-red">{d.type}</span> · {d.date} · {d.size}
                  </div>
                </div>
                <span className="text-paper/40 group-hover:text-red text-lg">↓</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5 · MAINTENANCE CYCLE PANEL */}
      <div className="card">
        <div className="mb-5 flex items-start justify-between">
          <div>
            <div className="eyebrow mb-1">Maintenance</div>
            <h2 className="text-2xl">Service Schedule + Reminders</h2>
          </div>
          <button className="btn-ghost">+ Log Service Event</button>
        </div>
        <div className="space-y-2">
          {assetSchedule.map((s) => (
            <ServiceRow key={s.id} item={s} />
          ))}
          {assetSchedule.length === 0 && <p className="text-paper/50 text-sm">No schedule configured.</p>}
        </div>
      </div>

      {/* 6 · REPORT TIMELINE + 7 · AI INSIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="card lg:col-span-2">
          <div className="mb-5">
            <div className="eyebrow mb-1">History</div>
            <h2 className="text-2xl">Report Timeline · Full Memory</h2>
          </div>
          <div className="space-y-3">
            {history.length === 0 && <p className="text-paper/40 text-sm">No reports logged against this asset yet.</p>}
            {history.map((r) => (
              <Link
                href={`/reports/${r.id}`}
                key={r.id}
                className="block border-l-2 border-red/40 hover:border-red pl-4 py-2 hover:bg-white/[0.02] rounded-r transition-all"
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="mono text-[11px] text-paper/70">{r.id}</span>
                  <span className="text-[11px] text-paper/50 uppercase" style={{ letterSpacing: "0.14em" }}>{r.date} · {r.shift} · {r.author}</span>
                  <PriorityPill priority={r.priority} />
                </div>
                <div className="text-sm font-bold text-paper mb-1">{r.issues_identified}</div>
                <div className="text-[12px] text-paper/60">Action: {r.actions_taken}</div>
              </Link>
            ))}
          </div>
        </div>

        <div className="card relative overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red via-purple to-transparent" />
          <div className="mb-4">
            <div className="eyebrow mb-1">Claude AI</div>
            <h2 className="text-xl">Machine Insights</h2>
          </div>
          <div className="space-y-3">
            <Insight
              severity="high"
              text={`${asset.asset_code} has ${asset.open_faults} open fault${asset.open_faults === 1 ? "" : "s"} — trend is ${asset.health_score < 0.5 ? "deteriorating" : "stable"}.`}
              signal={asset.open_faults > 2}
            />
            <Insight
              severity="medium"
              text={history.length >= 2 ? `Same symptom appears in ${Math.min(history.length, 3)} of last ${history.length} reports — pattern flag.` : "No pattern detected yet — needs 3+ reports."}
              signal={history.length >= 2}
            />
            <Insight
              severity={overdueCount > 0 ? "high" : "low"}
              text={overdueCount > 0 ? `${overdueCount} service task overdue — schedule before next shift.` : "All scheduled services on-track."}
              signal={overdueCount > 0}
            />
          </div>
          <div className="text-[10px] text-paper/30 mt-4 pt-3 border-t border-white/5 uppercase" style={{ letterSpacing: "0.2em" }}>
            Concept mode · wired to Claude API in Phase 2
          </div>
        </div>
      </div>

      {/* 8 · NOTES */}
      <NotesPanel initial={assetNotes} />

      {/* 9 · ACTIONS BAR */}
      <div className="card">
        <div className="eyebrow mb-3">Quick Actions</div>
        <div className="flex flex-wrap gap-2">
          <Link href="/reports/new" className="btn-primary">+ New Report on this Asset</Link>
          <button className="btn-ghost">✓ Log Service Event</button>
          <button className="btn-ghost">📎 Attach Document</button>
          <button className="btn-ghost">✎ Update Spec Sheet</button>
          <button className="btn-ghost">↓ Print Asset Card</button>
          <button className="btn-ghost">⚑ Raise Fault</button>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    operational: "bg-emerald-500/20 text-emerald-400",
    under_maintenance: "bg-amber-500/20 text-amber-400",
    offline: "bg-red/20 text-red",
    operational_with_watch: "bg-yellow-500/20 text-yellow-300",
  };
  return <span className={`pill ${map[status] ?? "bg-white/10 text-paper/70"}`}>{status.replace(/_/g, " ")}</span>;
}

function PriorityPill({ priority }: { priority: string }) {
  const map: Record<string, string> = {
    critical: "bg-red/20 text-red",
    high: "bg-amber-500/15 text-amber-400",
    medium: "bg-yellow-500/15 text-yellow-300",
    low: "bg-emerald-500/15 text-emerald-400",
  };
  return <span className={`pill ${map[priority] ?? "bg-white/10 text-paper/70"}`}>{priority}</span>;
}

function MiniStat({ label, value, sub, tone }: { label: string; value: string; sub?: string; tone?: "green" | "amber" | "red" }) {
  const toneClass = tone === "green" ? "text-emerald-400" : tone === "amber" ? "text-amber-400" : tone === "red" ? "text-red" : "text-paper";
  const stripe = tone === "green" ? "from-emerald-400/60" : tone === "amber" ? "from-amber-400/60" : tone === "red" ? "from-red/70" : "from-purple/50";
  return (
    <div className="card">
      <div className={`absolute left-0 top-4 bottom-4 w-0.5 bg-gradient-to-b ${stripe} to-transparent rounded-full`} />
      <div className="stat-label mb-2">{label}</div>
      <div className={`mono text-3xl font-bold ${toneClass}`}>{value}</div>
      {sub && <div className="text-[10px] text-paper/40 mt-1 uppercase" style={{ letterSpacing: "0.16em" }}>{sub}</div>}
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between items-baseline border-b border-white/5 pb-1.5 gap-3">
      <dt className="text-paper/50 text-[12px] uppercase whitespace-nowrap" style={{ letterSpacing: "0.14em" }}>{label}</dt>
      <dd className={`text-right ${mono ? "mono text-paper/90 text-[12px]" : "text-paper/90 text-[13px]"}`}>{value}</dd>
    </div>
  );
}

function ServiceRow({ item }: { item: SchedItem }) {
  const map: Record<string, { pill: string; label: string }> = {
    on_track: { pill: "bg-emerald-500/15 text-emerald-400", label: "On Track" },
    due_soon: { pill: "bg-amber-500/15 text-amber-400", label: "Due Soon" },
    overdue: { pill: "bg-red/20 text-red", label: "Overdue" },
    planning: { pill: "bg-purple/20 text-purple", label: "Planning" },
  };
  const tone = map[item.status];
  const dueText =
    item.next_due_date
      ? `Next: ${item.next_due_date}`
      : item.next_due_hours && item.current_hours != null
      ? `Next: ${item.next_due_hours.toLocaleString()} h · ${(item.next_due_hours - item.current_hours).toLocaleString()} h to go`
      : "Ad-hoc";
  return (
    <div className="p-3 rounded-lg border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all">
      {/* Mobile: stacked */}
      <div className="md:hidden space-y-2">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="mono text-[11px] text-paper/70">{item.id}</span>
            <span className="text-[10px] font-bold text-red uppercase" style={{ letterSpacing: "0.14em" }}>{item.interval}</span>
          </div>
          <span className={`pill ${tone.pill}`}>{tone.label}</span>
        </div>
        <div className="text-[13px] text-paper/90 leading-snug">{item.task}</div>
        {item.parts.length > 0 && (
          <div className="text-[11px] text-paper/50">Parts: {item.parts.join(" · ")}</div>
        )}
        <div className="text-[10px] text-paper/60 uppercase" style={{ letterSpacing: "0.14em" }}>{dueText}</div>
      </div>
      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-[110px_100px_1fr_180px_110px] gap-3 items-center">
        <div className="mono text-[11px] text-paper/70">{item.id}</div>
        <div className="text-[11px] font-bold text-red uppercase" style={{ letterSpacing: "0.14em" }}>{item.interval}</div>
        <div className="text-[13px] text-paper/90">
          {item.task}
          {item.parts.length > 0 && (
            <div className="text-[11px] text-paper/50 mt-1">Parts: {item.parts.join(" · ")}</div>
          )}
        </div>
        <div className="text-[11px] text-paper/60 uppercase" style={{ letterSpacing: "0.12em" }}>{dueText}</div>
        <div className="text-right">
          <span className={`pill ${tone.pill}`}>{tone.label}</span>
        </div>
      </div>
    </div>
  );
}

function DocIcon({ type }: { type: string }) {
  const map: Record<string, string> = {
    manual: "📘",
    drawing: "📐",
    cert: "🎖",
    swms: "🦺",
    report: "📊",
  };
  return (
    <div className="w-10 h-10 rounded-md bg-white/5 flex items-center justify-center text-lg flex-none">
      {map[type] ?? "📄"}
    </div>
  );
}

function Insight({ severity, text, signal }: { severity: "high" | "medium" | "low"; text: string; signal: boolean }) {
  const map = {
    high: signal ? "border-l-red text-paper" : "border-l-emerald-500 text-paper/80",
    medium: signal ? "border-l-amber-400 text-paper" : "border-l-white/10 text-paper/70",
    low: signal ? "border-l-red text-paper" : "border-l-emerald-500 text-paper/80",
  }[severity];
  return (
    <div className={`border-l-2 ${map} pl-3 py-1 text-[13px] leading-relaxed`}>
      {text}
    </div>
  );
}
