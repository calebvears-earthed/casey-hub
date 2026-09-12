export default function Home() {
  return (
    <div className="min-h-screen">
      <nav className="border-b border-white/5">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-red flex items-center justify-center font-bold text-charcoal">TG</div>
            <div className="font-heading font-bold text-lg">Top Gun Engineering</div>
          </div>
          <div className="flex items-center gap-6 text-sm text-cream/70">
            <a href="#services" className="hover:text-red">Services</a>
            <a href="#shiftforge" className="hover:text-red">ShiftForge</a>
            <a href="#contact" className="hover:text-red">Contact</a>
            <a href="mailto:casey@topgunengineering.com.au" className="bg-red text-cream px-4 py-2 rounded-lg font-semibold hover:bg-red/90">Get in touch</a>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-4">Maintenance Intelligence · Delivered</div>
        <h1 className="text-6xl font-bold leading-tight max-w-4xl">The deployment partner behind the smartest mine sites in Australia.</h1>
        <p className="text-xl text-cream/70 mt-6 max-w-2xl">Top Gun Engineering deploys ShiftForge — our proprietary maintenance intelligence platform — onto your site in 30 days. Your fitters keep their tools. Your enterprise systems keep running. What changes is the intelligence layer between them.</p>
        <div className="flex gap-4 mt-8">
          <a href="#contact" className="bg-red hover:bg-red/90 text-cream font-semibold px-6 py-3 rounded-lg">Book a discovery call</a>
          <a href="https://shiftforge.vercel.app" className="border border-white/20 hover:border-red text-cream px-6 py-3 rounded-lg">See ShiftForge live →</a>
        </div>
      </section>

      <section id="services" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">Services</div>
        <h2 className="text-4xl font-bold mb-10">What we deliver, on your site.</h2>
        <div className="grid grid-cols-3 gap-6">
          {[
            {title:"Site scoping + Asset Register", desc:"2-4 week engagement · load your fleet into ShiftForge · verify serials · capture location hierarchy · $15-30k"},
            {title:"Full ShiftForge deployment", desc:"6-8 week site rollout · training + integration + go-live · $40-80k"},
            {title:"Enterprise system integration", desc:"Connect ShiftForge to SAP-PM · Pronto · HxGN EAM · isolation registers · $25-60k"},
            {title:"Ongoing optimisation retainer", desc:"Monthly pattern analysis · roadmap sessions · custom dashboards · $8-15k/mo"},
            {title:"Crew training", desc:"Hands-on sessions with fitters + supervisors + engineers · role-specific workflows · $8-15k per site"},
            {title:"24/7 incident support", desc:"On-call SLA for critical fleet events · direct escalation to Top Gun team · $50k/yr"},
          ].map((s,i)=>(
            <div key={i} className="p-6 rounded-xl bg-elevated border border-white/5">
              <div className="text-red font-heading font-bold text-lg mb-2">{s.title}</div>
              <div className="text-cream/70 text-sm">{s.desc}</div>
            </div>
          ))}
        </div>
      </section>

      <section id="shiftforge" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">The Product</div>
        <h2 className="text-4xl font-bold mb-6">ShiftForge · maintenance intelligence for the crews on the tools.</h2>
        <p className="text-cream/70 max-w-3xl mb-8">Every mine site + heavy commercial op runs on the same broken model: fitters fill in paper handovers that supervisors never read. Machines fail because the last 3 shifts flagged the same problem and nobody joined the dots. Enterprise systems cost $2M and don't talk to the guys on the tools.</p>
        <p className="text-cream/90 max-w-3xl mb-8"><span className="text-red font-semibold">ShiftForge is the layer between.</span> Smart enough to remember every machine, every shift, every fitter — and tell you which asset is about to bite you 240 hours before it does.</p>
        <a href="https://shiftforge.vercel.app" className="text-red hover:underline">Explore the ShiftForge demo →</a>
      </section>

      <section id="contact" className="max-w-7xl mx-auto px-6 py-16 border-t border-white/5">
        <div className="text-xs text-red font-bold uppercase tracking-widest mb-2">Contact</div>
        <h2 className="text-4xl font-bold mb-6">Ready to make your handover the smartest touch-point on site?</h2>
        <div className="flex gap-6 items-center">
          <a href="mailto:casey@topgunengineering.com.au" className="bg-red hover:bg-red/90 text-cream font-semibold px-6 py-3 rounded-lg">casey@topgunengineering.com.au</a>
          <div className="text-cream/60">Casey Williams · Founder · Top Gun Engineering</div>
        </div>
      </section>

      <footer className="border-t border-white/5 mt-16 py-8">
        <div className="max-w-7xl mx-auto px-6 text-xs text-cream/40">© 2026 Top Gun Engineering · ShiftForge Deployment Partner</div>
      </footer>
    </div>
  );
}
