"use client";
import { useState } from "react";
import assets from "@/data/assets.json";

export default function NewReport() {
  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [generated, setGenerated] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    setLoading(true);
    setTimeout(() => {
      const asset = assets.find((a) => a.id === selectedAsset);
      setGenerated(`## Shift Handover Report · Draft\n\n**Asset:** ${asset?.asset_code || "[none selected]"} · ${asset?.description || ""}\n\n**Date:** 13 September 2026 · Day Shift\n**Author:** Casey Williams (Fitter · Fitting Crew Alpha)\n\n### Work completed\nRoutine inspection and preventive maintenance on ${asset?.asset_code}. Grease service to drive-end bearings. Visual checks on all mechanical guards. Vibration analysis captured to CBM database.\n\n### Issues identified\nDrive-end bearing running 4°C above baseline temperature. Trend has been increasing over the last 3 shifts. No immediate concern but flagged for close monitoring.\n\n### Actions taken\n- Thermal image captured and logged\n- Grease serviced (Mobilith SHC 220 · 2 shots)\n- Data uploaded to CBM system\n- Verbal handover to next shift supervisor\n\n### Recommendations\nOrder replacement SKF 22320 bearing to have on-site as pre-emptive spare. Consider scheduling inspection during next major maintenance window (est. 300 hours from now).\n\n### Planned work · next shift\nThermal check and vibration re-scan. Continue trend monitoring.\n\n---\n\n*Report auto-drafted by ShiftForge AI · Signed off by Casey Williams · 06:14*`);
      setLoading(false);
    }, 1200);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">New Shift Report</div>
        <h1 className="text-4xl font-bold">Report Details</h1>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card space-y-4">
          <div className="grid grid-cols-2 gap-3">
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
              <div className="mt-2 p-3 bg-charcoal border border-red/30 rounded text-xs">
                <div className="text-red font-semibold mb-1">Asset context loaded ✓</div>
                <div className="text-cream/70">Last service 3 shifts ago · 2 open faults · health score {Math.round((assets.find(a => a.id === selectedAsset)?.health_score || 0) * 100)}%</div>
              </div>
            )}
          </Field>

          <Field label="Work completed"><textarea className="input h-20" placeholder="What was done this shift..." /></Field>
          <Field label="Issues identified"><textarea className="input h-20" placeholder="Faults, hazards, defects..." /></Field>
          <Field label="Actions taken"><textarea className="input h-16" placeholder="Repairs, inspections, adjustments..." /></Field>
          <Field label="Parts used"><input className="input" placeholder="e.g. 2× SKF 22320 bearing, 5L hydraulic oil" /></Field>
          <Field label="Delays"><input className="input" placeholder="Permits, isolations, waiting on parts..." /></Field>
          <Field label="Planned work · next shift"><textarea className="input h-16" placeholder="Follow-up items..." /></Field>
          <Field label="Recommendations"><textarea className="input h-16" placeholder="Optional notes for engineering team..." /></Field>

          <div className="flex gap-3 pt-4 border-t border-white/5">
            <button onClick={handleGenerate} disabled={loading} className="btn-primary flex-1 disabled:opacity-50">{loading ? "AI drafting..." : "Generate AI Report"}</button>
            <button className="btn-ghost">Clear Form</button>
          </div>
        </div>

        <div className="card sticky top-6 self-start">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">Generated Report</h2>
            {generated && <button className="text-xs text-red hover:underline">Sign Off + Distribute</button>}
          </div>
          {!generated && !loading && (
            <div className="text-center py-16 text-cream/40">
              <div className="text-4xl mb-3">✎</div>
              <div>Fill the form and click Generate AI Report.</div>
              <div className="text-xs mt-2">Your professional report will appear here.</div>
            </div>
          )}
          {loading && <div className="text-center py-16 text-cream/60"><div className="text-4xl mb-3 animate-pulse">⚡</div>ShiftForge AI drafting...</div>}
          {generated && (
            <pre className="whitespace-pre-wrap text-sm text-cream/90 font-sans leading-relaxed">{generated}</pre>
          )}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="block text-xs text-cream/60 uppercase tracking-wider mb-1.5">{label}</label>{children}</div>;
}
