import assets from "@/data/assets.json";
import reports from "@/data/reports.json";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function AssetDetail({ params }: { params: { id: string } }) {
  const asset = assets.find((a) => a.id === params.id);
  if (!asset) return notFound();
  const history = reports.filter((r) => r.asset_id === asset.id);
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <Link href="/assets" className="text-sm text-cream/50 hover:text-red">← Back to Assets</Link>
      <div>
        <div className="flex items-center gap-3 mb-2">
          <span className="mono text-red text-2xl font-bold">{asset.asset_code}</span>
          <span className="pill bg-purple/20 text-purple">{asset.discipline}</span>
          <span className={`pill ${asset.status === "operational" ? "bg-green-500/20 text-green-400" : "bg-amber-500/20 text-amber-400"}`}>{asset.status}</span>
        </div>
        <h1 className="text-3xl font-bold">{asset.description}</h1>
        <p className="text-cream/50 text-sm mt-1">{asset.location}</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="card"><div className="text-xs text-cream/50 uppercase">Health Score</div><div className={`text-3xl font-bold font-heading ${asset.health_score > 0.75 ? "text-green-400" : asset.health_score > 0.5 ? "text-amber-400" : "text-red"}`}>{Math.round(asset.health_score * 100)}%</div></div>
        <div className="card"><div className="text-xs text-cream/50 uppercase">Service Hours</div><div className="text-3xl font-bold font-heading text-cream mono">{asset.service_hours.toLocaleString()}</div><div className="text-xs text-cream/40">of {asset.expected_life_hours.toLocaleString()}</div></div>
        <div className="card"><div className="text-xs text-cream/50 uppercase">Open Faults</div><div className="text-3xl font-bold font-heading text-red">{asset.open_faults}</div></div>
        <div className="card"><div className="text-xs text-cream/50 uppercase">Reports Logged</div><div className="text-3xl font-bold font-heading text-cream">{history.length}</div></div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card col-span-1">
          <h2 className="text-lg font-bold mb-4">Asset Details</h2>
          <dl className="space-y-2 text-sm">
            <Row label="Make" value={asset.make} />
            <Row label="Model" value={asset.model} />
            <Row label="Serial" value={asset.serial} mono />
            <Row label="Installed" value={asset.install_date} />
            <Row label="Warranty until" value={asset.warranty_expires || "Out of warranty"} />
            <Row label="Custodian" value={asset.custodian_crew} />
            <Row label="Site" value={asset.site} />
          </dl>
        </div>

        <div className="card col-span-2">
          <h2 className="text-lg font-bold mb-4">Shift History · Full memory</h2>
          <div className="space-y-4">
            {history.length === 0 && <p className="text-cream/40 text-sm">No reports logged against this asset yet.</p>}
            {history.map((r) => (
              <div key={r.id} className="border-l-2 border-red pl-4 py-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="mono text-xs text-cream/70">{r.id}</span>
                  <span className="text-xs text-cream/50">{r.date} · {r.shift} · {r.author}</span>
                  <span className={`pill ${r.priority === "critical" ? "bg-red/20 text-red" : r.priority === "high" ? "bg-amber-500/20 text-amber-400" : "bg-white/10 text-cream/70"}`}>{r.priority}</span>
                </div>
                <div className="text-sm font-semibold mb-1">{r.issues_identified}</div>
                <div className="text-xs text-cream/60">Action: {r.actions_taken}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between border-b border-white/5 pb-1.5">
      <dt className="text-cream/50">{label}</dt>
      <dd className={mono ? "mono text-cream/90" : "text-cream/90"}>{value}</dd>
    </div>
  );
}
