"use client";
import { useState } from "react";
import assets from "@/data/assets.json";
import { useToast } from "@/components/Toast";
import { tap, pop } from "@/lib/haptic";

export default function NewReport() {
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [rawNotes, setRawNotes] = useState<string>("");
  const [generated, setGenerated] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { push } = useToast();

  const handleGenerate = () => {
    tap();
    setLoading(true);
    setTimeout(() => {
      const asset = assets.find((a) => a.id === selectedAsset);
      setGenerated(`## Shift Handover Report · Draft\n\n**Asset:** ${asset?.asset_code || "[none selected]"} · ${asset?.description || ""}\n\n**Date:** 13 September 2026 · Day Shift\n**Author:** Casey Williams (Fitter · Fitting Crew Alpha)\n\n### Work completed\nRoutine inspection and preventive maintenance on ${asset?.asset_code}. Grease service to drive-end bearings. Visual checks on all mechanical guards. Vibration analysis captured to CBM database.\n\n### Issues identified\nDrive-end bearing running 4°C above baseline temperature. Trend has been increasing over the last 3 shifts. No immediate concern but flagged for close monitoring.\n\n### Actions taken\n- Thermal image captured and logged\n- Grease serviced (Mobilith SHC 220 · 2 shots)\n- Data uploaded to CBM system\n- Verbal handover to next shift supervisor\n\n### Recommendations\nOrder replacement SKF 22320 bearing to have on-site as pre-emptive spare. Consider scheduling inspection during next major maintenance window (est. 300 hours from now).\n\n### Planned work · next shift\nThermal check and vibration re-scan. Continue trend monitoring.\n\n---\n\n*Report auto-drafted by ShiftForge AI · Signed off by Casey Williams · 06:14*`);
      setLoading(false);
      push({ kind: "ok", text: "AI report drafted ✨" });
      pop();
    }, 1200);
  };

  const rawPlaceholder = "quick notes · gloves-off · voice friendly\n\nsame bearing as yesterday, still warm, 4 deg over. greased it. no smoke. rescan next shift. order spare 22320 while we can.";

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <div className="eyebrow mb-3">New Shift Report</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Report Details</h1>
        <p className="text-paper/60 mt-2 text-sm">Dump rough notes below · fill the form · let AI stitch it into a proper handover.</p>
        <div className="divider-red mt-4" />
      </div>

      {/* AI Comparison card — raw ↔ AI */}
      <div className="card relative overflow-hidden">
        <div className="absolute -top-8 -right-8 w-40 h-40 rounded-full bg-red/10 blur-3xl pointer-events-none" />
        <div className="eyebrow mb-1">The AI Handover Move</div>
        <h2 className="text-xl sm:text-2xl mb-5">Rough notes → publish-ready report, in one click.</h2>
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
          <div className="rounded-lg border border-white/10 bg-charcoal/60 p-4">
            <div className="stat-label mb-2">Your Notes · Raw</div>
            <textarea
              value={rawNotes}
              onChange={(e) => setRawNotes(e.target.value)}
              placeholder={rawPlaceholder}
              className="w-full bg-transparent text-[13px] text-paper/85 placeholder:text-paper/30 resize-none outline-none min-h-[120px] leading-relaxed"
            />
          </div>
          <div className="hidden md:flex flex-col items-center justify-center px-2">
            <div className="w-8 h-8 rounded-full bg-red/20 border border-red/40 flex items-center justify-center text-red">
              →
            </div>
            <div className="text-[9px] font-extrabold text-red uppercase mt-2" style={{ letterSpacing: "0.24em" }}>Claude</div>
          </div>
          <div className="rounded-lg border border-red/30 bg-red/[0.03] p-4 relative">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red/40 to-transparent" />
            <div className="flex items-center justify-between mb-2">
              <div className="text-[10px] font-extrabold text-red uppercase" style={{ letterSpacing: "0.24em" }}>AI Draft · Publish-Ready</div>
              {loading && <span className="text-[10px] text-red animate-pulse">drafting…</span>}
            </div>
            {!generated && !loading && (
              <p className="text-[13px] text-paper/40 leading-relaxed">
                Type or paste your rough notes on the left, then hit <span className="text-red font-bold">Generate</span> below. Structured handover appears here in seconds — Issues, Actions, Parts, Recommendations, Next Shift.
              </p>
            )}
            {loading && (
              <div className="space-y-2">
                {[80, 60, 90, 70, 85, 50].map((w, i) => (
                  <div key={i} className="h-2 rounded bg-red/10 animate-pulse" style={{ width: `${w}%` }} />
                ))}
              </div>
            )}
            {generated && (
              <pre className="whitespace-pre-wrap text-[12px] text-paper/90 font-sans leading-relaxed line-clamp-[12]">
                {generated}
              </pre>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col sm:flex-row gap-2">
          <button
            onClick={handleGenerate}
            disabled={loading}
            className="btn-primary flex-1 sm:flex-none disabled:opacity-50"
          >
            {loading ? "⚡ Drafting…" : generated ? "↺ Regenerate" : "✨ Generate Full Report"}
          </button>
          {generated && (
            <button onClick={() => { pop(); push({ kind: "ok", text: "Report signed off" }); }} className="btn-ghost">
              ✓ Sign Off + Distribute
            </button>
          )}
        </div>
      </div>

      <div className="card space-y-4">
        <div className="mb-1">
          <div className="eyebrow mb-1">Manual · Structured Entry</div>
          <h2 className="text-xl">Full Report Form</h2>
          <p className="text-paper/50 text-[12px] mt-1">Prefer typing every field? Fill this out — same output, more control.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Field label="Date"><input type="date" defaultValue="2026-09-13" className="input" /></Field>
          <Field label="Shift"><select className="input"><option>Day</option><option>Afternoon</option><option>Night</option></select></Field>
          <Field label="Report Type"><select className="input"><option>Shift Report</option><option>Incident</option><option>Service Log</option><option>Inspection</option></select></Field>
          <Field label="Priority"><select className="input"><option>Low</option><option>Medium</option><option>High</option><option>Critical</option></select></Field>
        </div>

        <Field label="Location">
          <select className="input">
            <option>Select location...</option>
            <option>Underground · Level 72 · N2 Spur</option>
            <option>Underground · Level 72 · Access Ramp</option>
            <option>Surface · Substation Compound A</option>
            <option>Surface · Load Bay</option>
            <option>Surface · Pit A · Bench 12</option>
          </select>
        </Field>

        <Field label="Equipment (searchable · multi-select ready)">
          <select className="input" value={selectedAsset} onChange={(e) => setSelectedAsset(e.target.value)}>
            <option value="">Select equipment...</option>
            {assets.map((a) => <option key={a.id} value={a.id}>{a.asset_code} · {a.description}</option>)}
          </select>
          {selectedAsset && (
            <div className="mt-2 p-3 bg-charcoal/70 border border-red/30 rounded-md text-xs">
              <div className="text-red font-bold mb-1">Asset context loaded ✓</div>
              <div className="text-paper/75">Last service 3 shifts ago · 2 open faults · health score {Math.round((assets.find(a => a.id === selectedAsset)?.health_score || 0) * 100)}%</div>
            </div>
          )}
        </Field>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <Field label="Work completed"><textarea className="input min-h-[80px]" placeholder="What was done this shift..." /></Field>
          <Field label="Issues identified"><textarea className="input min-h-[80px]" placeholder="Faults, hazards, defects..." /></Field>
          <Field label="Actions taken"><textarea className="input min-h-[64px]" placeholder="Repairs, inspections, adjustments..." /></Field>
          <Field label="Parts used"><input className="input" placeholder="e.g. 2× SKF 22320 bearing, 5L hydraulic oil" /></Field>
          <Field label="Delays"><input className="input" placeholder="Permits, isolations, waiting on parts..." /></Field>
          <Field label="Planned work · next shift"><textarea className="input min-h-[64px]" placeholder="Follow-up items..." /></Field>
          <Field label="Recommendations"><textarea className="input min-h-[64px] md:col-span-2" placeholder="Optional notes for engineering team..." /></Field>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-white/5">
          <button onClick={handleGenerate} disabled={loading} className="btn-primary flex-1 disabled:opacity-50">{loading ? "AI drafting..." : "✨ Generate AI Report"}</button>
          <button className="btn-ghost">Clear Form</button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[10px] text-paper/60 uppercase font-extrabold mb-1.5" style={{ letterSpacing: "0.22em" }}>{label}</label>
      {children}
    </div>
  );
}
