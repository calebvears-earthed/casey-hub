export default function Shifts() {
  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div>
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">Shifts</div>
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Shift Roster + Handover Chain</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {["Day · 06:00-14:00", "Afternoon · 14:00-22:00", "Night · 22:00-06:00"].map((s, i) => (
          <div key={i} className="card">
            <div className="text-xs text-cream/50 uppercase tracking-wider">{s.split(" · ")[0]}</div>
            <div className="mono text-xs text-red mt-1">{s.split(" · ")[1]}</div>
            <div className="mt-4 space-y-2">
              <div className="text-sm">Casey Williams · Fitter</div>
              <div className="text-sm text-cream/60">Ryan Porteous · Supervisor</div>
              <div className="text-sm text-cream/40">3 more crew...</div>
            </div>
            <div className="mt-4 pt-3 border-t border-white/5">
              <div className="text-xs text-cream/50">Last handover</div>
              <div className="text-sm">Report RPT-{20 - i} · signed off</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
