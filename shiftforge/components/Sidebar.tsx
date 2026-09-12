"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const nav = [
  { href: "/", label: "Dashboard", icon: "◧" },
  { href: "/assets", label: "Assets", icon: "⚙" },
  { href: "/shifts", label: "Shifts", icon: "▤" },
  { href: "/reports/new", label: "New Report", icon: "✎" },
  { href: "/handover", label: "Handover", icon: "⇄" },
  { href: "/analytics", label: "Analytics", icon: "▲" },
];

export default function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-dark border-r border-white/5 flex flex-col">
      <div className="p-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-red flex items-center justify-center text-charcoal font-bold text-lg">⚙</div>
          <div>
            <div className="font-heading font-bold text-cream text-lg leading-none">ShiftForge</div>
            <div className="text-xs text-red uppercase tracking-wider mt-0.5">Smart Reports</div>
          </div>
        </div>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href} className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${active ? "bg-red text-cream" : "text-cream/60 hover:text-cream hover:bg-white/5"}`}>
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-white/5 space-y-2">
        <div className="text-xs text-cream/40 uppercase tracking-wider">Site</div>
        <div className="text-sm font-medium">Prominent Hill</div>
        <div className="pt-2 border-t border-white/5">
          <div className="text-sm font-medium text-cream">Casey Williams</div>
          <div className="text-xs text-cream/50">Fitter · Day Shift</div>
        </div>
        <div className="text-xs text-cream/30 pt-3">Powered by <span className="text-red">Top Gun Engineering</span></div>
      </div>
    </aside>
  );
}
