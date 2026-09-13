import Image from "next/image";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  rightStat?: { label: string; value: string; sub?: string };
  variant?: "pit" | "fleet" | "gear";
};

const IMG: Record<NonNullable<Props["variant"]>, string> = {
  pit: "/renders/pit-trails.png",
  fleet: "/renders/fleet-grid.png",
  gear: "/renders/gear-hero.png",
};

export default function HeroBanner({ eyebrow, title, subtitle, rightStat, variant = "pit" }: Props) {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/[0.06] min-h-[240px] lg:min-h-[320px] flex items-end">
      {/* Background render */}
      <div className="absolute inset-0">
        <Image
          src={IMG[variant]}
          alt=""
          fill
          priority
          className="object-cover object-right"
          sizes="(max-width: 1024px) 100vw, 1200px"
        />
      </div>

      {/* Cinematic overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/85 to-charcoal/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/95 via-charcoal/40 to-transparent" />

      {/* Red glow orb */}
      <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-red/25 blur-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative w-full p-6 lg:p-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <div className="max-w-xl">
          <div className="eyebrow mb-3 text-glow-red">{eyebrow}</div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl leading-none">{title}</h1>
          {subtitle && <p className="text-paper/70 mt-3 text-sm lg:text-base max-w-lg">{subtitle}</p>}
          <div className="divider-red mt-5" />
        </div>

        {rightStat && (
          <div className="text-left sm:text-right">
            <div className="stat-label mb-2">{rightStat.label}</div>
            <div className="mono text-4xl lg:text-5xl font-bold text-red text-glow-red">
              {rightStat.value}
            </div>
            {rightStat.sub && (
              <div className="text-[10px] text-paper/50 mt-1 uppercase" style={{ letterSpacing: "0.2em" }}>
                {rightStat.sub}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Live dot */}
      <div className="absolute top-4 right-4 flex items-center gap-2 bg-charcoal/70 backdrop-blur-md border border-white/10 rounded-full px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" style={{ boxShadow: "0 0 8px rgba(208, 38, 31, 0.9)" }} />
        <span className="text-[10px] font-extrabold text-paper uppercase" style={{ letterSpacing: "0.24em" }}>Live</span>
      </div>
    </section>
  );
}
