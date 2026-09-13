"use client";
import { useState } from "react";
import { useToast } from "@/components/Toast";
import { tap, pop } from "@/lib/haptic";

type Props = {
  reportId: string;
  assetCode: string;
  priority: string;
  author: string;
  issues: string;
};

export default function ReportActions({ reportId, assetCode, priority, author, issues }: Props) {
  const [modal, setModal] = useState<null | "email">(null);
  const [emailTo, setEmailTo] = useState("supervisor@prominenthill.com.au");
  const [emailCc, setEmailCc] = useState("engineering@topgunengineering.com.au");
  const [tone, setTone] = useState<"tight" | "detailed" | "urgent">("tight");
  const [generating, setGenerating] = useState(false);
  const [draft, setDraft] = useState<string | null>(null);
  const { push } = useToast();

  function download() {
    tap();
    push({ kind: "info", text: "Opening print dialog…" });
    setTimeout(() => window.print(), 200);
  }

  function generateEmail() {
    setGenerating(true);
    tap();
    // Concept-mode: mock the AI. In Phase 2 this hits /api/generate → Claude API.
    setTimeout(() => {
      const intros: Record<typeof tone, string> = {
        tight: `Hi team,\n\nAttached is the shift report ${reportId} for ${assetCode}. Priority ${priority.toUpperCase()}.\n\nHeadline: ${issues.split(".")[0]}.\n\nFull PDF attached. Happy to walk through if useful.\n\n${author}`,
        detailed: `Hi team,\n\nHere is the full shift report ${reportId} covering ${assetCode} from tonight.\n\nContext:\n${issues}\n\nActions taken + planned next are in the attached PDF. I've flagged this as ${priority} — worth a read before the morning walkaround.\n\nGive me a call on the shift line if anything's unclear.\n\n${author}`,
        urgent: `Team — ${assetCode} needs eyes on it today.\n\n${issues.split(".")[0]}. Priority ${priority.toUpperCase()}.\n\nFull report ${reportId} attached. Please acknowledge receipt and confirm next-shift plan by 10:00.\n\n${author}`,
      };
      setDraft(intros[tone]);
      setGenerating(false);
      push({ kind: "ok", text: "AI draft ready" });
    }, 900);
  }

  function send() {
    pop();
    push({ kind: "ok", text: `Sent to ${emailTo.split("@")[0]} · report ${reportId}` });
    setModal(null);
    setDraft(null);
  }

  return (
    <>
      <div className="flex flex-wrap gap-2">
        <button onClick={download} className="btn-primary">↓ Download PDF</button>
        <button
          onClick={() => {
            setModal("email");
            setDraft(null);
          }}
          className="btn-ghost"
        >
          ✉ Email Report
        </button>
        <button className="btn-ghost" onClick={() => { tap(); push({ kind: "info", text: "Slack integration lands in Phase 2" }); }}>💬 Send to Slack</button>
      </div>

      {modal === "email" && (
        <div className="fixed inset-0 z-[60] bg-charcoal/80 backdrop-blur-sm flex items-end sm:items-center justify-center sm:p-6 print:hidden">
          <div className="w-full sm:max-w-2xl bg-elevated border border-white/10 rounded-t-2xl sm:rounded-xl shadow-2xl relative overflow-hidden max-h-[92vh] sm:max-h-[85vh] flex flex-col">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-red via-red/40 to-transparent" />
            <div className="p-6 border-b border-white/5">
              <div className="eyebrow mb-1">Email Report</div>
              <h3 className="text-2xl">Send {reportId} · {assetCode}</h3>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="stat-label">To</label>
                  <input value={emailTo} onChange={(e) => setEmailTo(e.target.value)} className="input mt-1.5" />
                </div>
                <div>
                  <label className="stat-label">Cc</label>
                  <input value={emailCc} onChange={(e) => setEmailCc(e.target.value)} className="input mt-1.5" />
                </div>
              </div>

              <div>
                <label className="stat-label">AI Tone</label>
                <div className="flex gap-2 mt-1.5">
                  {(["tight", "detailed", "urgent"] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTone(t)}
                      className={`px-4 py-2 rounded-lg text-[11px] font-bold uppercase transition-all ${
                        tone === t ? "bg-red text-paper" : "border border-white/10 text-paper/60 hover:text-paper hover:border-white/20"
                      }`}
                      style={{ letterSpacing: "0.18em" }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={generateEmail}
                disabled={generating}
                className="btn-primary w-full disabled:opacity-50"
              >
                {generating ? "⏳ Drafting…" : draft ? "↺ Regenerate Intro" : "✨ Draft Email Intro"}
              </button>

              {draft && (
                <div>
                  <label className="stat-label">AI Draft (edit before sending)</label>
                  <textarea
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    className="input mt-1.5 min-h-[220px] font-mono text-[13px] leading-relaxed"
                  />
                  <p className="text-[10px] text-paper/40 mt-2 uppercase" style={{ letterSpacing: "0.18em" }}>
                    PDF of report auto-attached · you approve before send
                  </p>
                </div>
              )}
            </div>

            <div className="p-6 border-t border-white/5 flex items-center justify-between">
              <button onClick={() => setModal(null)} className="btn-ghost">Cancel</button>
              <button onClick={send} disabled={!draft} className="btn-primary disabled:opacity-40">✓ Send Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
