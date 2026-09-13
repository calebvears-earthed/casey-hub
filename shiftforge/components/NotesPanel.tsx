"use client";
import { useState } from "react";

type Note = {
  id: string;
  author: string;
  date: string;
  pinned: boolean;
  body: string;
};

export default function NotesPanel({ initial, currentUser = "Casey Williams" }: { initial: Note[]; currentUser?: string }) {
  const [notes, setNotes] = useState<Note[]>(initial);
  const [draft, setDraft] = useState("");
  const [pinDraft, setPinDraft] = useState(false);

  function addNote() {
    if (!draft.trim()) return;
    const today = new Date().toISOString().slice(0, 10);
    const n: Note = {
      id: `N-${Math.floor(Math.random() * 900) + 100}`,
      author: currentUser,
      date: today,
      pinned: pinDraft,
      body: draft.trim(),
    };
    setNotes([n, ...notes]);
    setDraft("");
    setPinDraft(false);
  }

  function togglePin(id: string) {
    setNotes(notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
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
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={`Add a note as ${currentUser} · voice-friendly · gets timestamped`}
          className="input min-h-[80px] resize-none"
          rows={3}
        />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-[11px] font-bold text-paper/60 uppercase" style={{ letterSpacing: "0.16em" }}>
            <input
              type="checkbox"
              checked={pinDraft}
              onChange={(e) => setPinDraft(e.target.checked)}
              className="accent-red w-3.5 h-3.5"
            />
            Pin to top
          </label>
          <button onClick={addNote} disabled={!draft.trim()} className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed">
            + Post Note
          </button>
        </div>
      </div>

      {/* Pinned */}
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

      {/* Feed */}
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
      <div className="text-sm text-paper/90 leading-relaxed">{note.body}</div>
    </div>
  );
}
