"use client";
import { useEffect, useRef, useState } from "react";
import { useToast } from "@/components/Toast";
import { tap, pop } from "@/lib/haptic";

type Note = {
  id: string;
  author: string;
  date: string;
  pinned: boolean;
  body: string;
  photo?: string; // data URL for concept mode
};

export default function NotesPanel({ initial, currentUser = "Casey Williams" }: { initial: Note[]; currentUser?: string }) {
  const [notes, setNotes] = useState<Note[]>(initial);
  const [draft, setDraft] = useState("");
  const [pinDraft, setPinDraft] = useState(false);
  const [photoData, setPhotoData] = useState<string | null>(null);
  const [listening, setListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recogRef = useRef<any>(null);
  const { push } = useToast();

  useEffect(() => {
    if (typeof window === "undefined") return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    setVoiceSupported(!!SR);
  }, []);

  function startVoice() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) return;
    const r = new SR();
    r.lang = "en-AU";
    r.interimResults = true;
    r.continuous = false;
    let final = draft;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    r.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const res = e.results[i];
        if (res.isFinal) final += (final && !final.endsWith(" ") ? " " : "") + res[0].transcript.trim();
        else interim += res[0].transcript;
      }
      setDraft(final + (interim ? " " + interim : ""));
    };
    r.onend = () => setListening(false);
    r.onerror = () => setListening(false);
    r.start();
    recogRef.current = r;
    setListening(true);
    tap();
  }

  function stopVoice() {
    recogRef.current?.stop();
    setListening(false);
  }

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPhotoData(reader.result as string);
      push({ kind: "ok", text: "Photo attached" });
      tap();
    };
    reader.readAsDataURL(file);
  }

  function addNote() {
    if (!draft.trim() && !photoData) return;
    const today = new Date().toISOString().slice(0, 10);
    const n: Note = {
      id: `N-${Math.floor(Math.random() * 900) + 100}`,
      author: currentUser,
      date: today,
      pinned: pinDraft,
      body: draft.trim(),
      photo: photoData || undefined,
    };
    setNotes([n, ...notes]);
    setDraft("");
    setPinDraft(false);
    setPhotoData(null);
    push({ kind: "ok", text: pinDraft ? "Note pinned" : "Note added" });
    pop();
  }

  function togglePin(id: string) {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
    tap();
  }

  const pinned = notes.filter((n) => n.pinned);
  const rest = notes.filter((n) => !n.pinned);

  return (
    <div className="card">
      <div className="mb-4">
        <div className="eyebrow mb-1">Team Notes</div>
        <h2 className="text-xl">Shift Notes + Callouts</h2>
      </div>

      {/* Composer */}
      <div className="mb-5 space-y-2">
        <div className="relative">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={listening ? "Listening… speak clearly" : `Add a note as ${currentUser} · voice or type`}
            className={`input min-h-[90px] resize-none ${listening ? "ring-1 ring-red border-red" : ""}`}
            rows={3}
          />
          {listening && (
            <span className="absolute top-3 right-3 flex items-center gap-1.5 text-[10px] font-extrabold text-red uppercase" style={{ letterSpacing: "0.24em" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-red animate-pulse" />
              Recording
            </span>
          )}
        </div>

        {photoData && (
          <div className="relative inline-block">
            <img src={photoData} alt="attached" className="max-h-24 rounded-lg border border-white/10" />
            <button
              onClick={() => setPhotoData(null)}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red text-paper flex items-center justify-center text-xs font-bold"
              aria-label="Remove photo"
            >
              ×
            </button>
          </div>
        )}

        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2">
            {voiceSupported && (
              <button
                onClick={() => (listening ? stopVoice() : startVoice())}
                className={`w-10 h-10 rounded-lg border flex items-center justify-center transition-all ${
                  listening ? "border-red bg-red/10 text-red" : "border-white/10 text-paper/70 hover:text-paper hover:border-white/20"
                }`}
                aria-label="Voice-to-text"
                title="Voice-to-text"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0014 0M12 19v3" />
                </svg>
              </button>
            )}
            <button
              onClick={() => fileRef.current?.click()}
              className="w-10 h-10 rounded-lg border border-white/10 text-paper/70 hover:text-paper hover:border-white/20 flex items-center justify-center transition-all"
              aria-label="Attach photo"
              title="Attach photo (opens camera on mobile)"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="6" width="18" height="14" rx="2" />
                <circle cx="12" cy="13" r="3.5" />
                <path d="M8 6l2-3h4l2 3" />
              </svg>
            </button>
            <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handlePhoto} className="hidden" />
            <label className="flex items-center gap-2 text-[11px] font-bold text-paper/60 uppercase pl-2" style={{ letterSpacing: "0.16em" }}>
              <input type="checkbox" checked={pinDraft} onChange={(e) => setPinDraft(e.target.checked)} className="accent-red w-3.5 h-3.5" />
              Pin
            </label>
          </div>
          <button onClick={addNote} disabled={!draft.trim() && !photoData} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
            + Post Note
          </button>
        </div>
      </div>

      {pinned.length > 0 && (
        <div className="mb-5">
          <div className="text-[10px] font-extrabold text-red uppercase mb-2" style={{ letterSpacing: "0.24em" }}>Pinned</div>
          <div className="space-y-2">
            {pinned.map((n) => (
              <NoteRow key={n.id} note={n} onTogglePin={togglePin} />
            ))}
          </div>
        </div>
      )}

      {rest.length > 0 && (
        <div>
          <div className="text-[10px] font-extrabold text-paper/40 uppercase mb-2" style={{ letterSpacing: "0.24em" }}>Feed</div>
          <div className="space-y-2">
            {rest.map((n) => (
              <NoteRow key={n.id} note={n} onTogglePin={togglePin} />
            ))}
          </div>
        </div>
      )}

      {notes.length === 0 && <p className="text-paper/40 text-sm">No notes yet — first one goes here.</p>}
    </div>
  );
}

function NoteRow({ note, onTogglePin }: { note: Note; onTogglePin: (id: string) => void }) {
  return (
    <div className={`rounded-lg p-3 border ${note.pinned ? "border-red/30 bg-red/[0.04]" : "border-white/5 bg-white/[0.02]"}`}>
      <div className="flex items-start justify-between gap-3 mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-paper">{note.author}</span>
          <span className="text-[11px] text-paper/40 uppercase" style={{ letterSpacing: "0.14em" }}>
            {note.date}
          </span>
        </div>
        <button
          onClick={() => onTogglePin(note.id)}
          className={`text-[10px] font-extrabold uppercase transition-colors ${note.pinned ? "text-red" : "text-paper/30 hover:text-paper/60"}`}
          style={{ letterSpacing: "0.18em" }}
        >
          {note.pinned ? "★ Pinned" : "☆ Pin"}
        </button>
      </div>
      {note.body && <div className="text-sm text-paper/90 leading-relaxed">{note.body}</div>}
      {note.photo && (
        <img src={note.photo} alt="attached" className="mt-2 max-h-48 rounded-md border border-white/10" />
      )}
    </div>
  );
}
