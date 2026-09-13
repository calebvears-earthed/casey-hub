"use client";
import { createContext, useCallback, useContext, useEffect, useState } from "react";

type Toast = { id: number; kind: "ok" | "info" | "warn"; text: string };
type Ctx = { push: (t: Omit<Toast, "id">) => void };

const ToastCtx = createContext<Ctx | null>(null);

export function useToast() {
  const ctx = useContext(ToastCtx);
  if (!ctx) throw new Error("useToast used outside ToastProvider");
  return ctx;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const push = useCallback((t: Omit<Toast, "id">) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { ...t, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== id));
    }, 3200);
  }, []);

  return (
    <ToastCtx.Provider value={{ push }}>
      {children}
      <div className="fixed bottom-24 lg:bottom-6 right-4 lg:right-6 z-[70] flex flex-col gap-2 pointer-events-none">
        {toasts.map((t) => (
          <ToastRow key={t.id} t={t} />
        ))}
      </div>
    </ToastCtx.Provider>
  );
}

function ToastRow({ t }: { t: Toast }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);
  const tone =
    t.kind === "ok"
      ? "border-emerald-500/40 bg-elevated"
      : t.kind === "warn"
      ? "border-red/40 bg-elevated"
      : "border-white/10 bg-elevated";
  const icon = t.kind === "ok" ? "✓" : t.kind === "warn" ? "⚠" : "ℹ";
  const iconColor = t.kind === "ok" ? "text-emerald-400" : t.kind === "warn" ? "text-red" : "text-paper/70";
  return (
    <div
      className={`pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-lg border shadow-2xl min-w-[260px] max-w-sm backdrop-blur-md transition-all duration-200 ${tone} ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
      style={{ boxShadow: "0 10px 40px -10px rgba(0,0,0,0.6)" }}
    >
      <span className={`text-lg font-bold ${iconColor}`}>{icon}</span>
      <span className="text-sm text-paper font-bold">{t.text}</span>
    </div>
  );
}
