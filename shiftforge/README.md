# ShiftForge · Demo

Pre-build concept for the mining + heavy industry maintenance intelligence platform.

## Run locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

## Deploy

Vercel → New Project → Import from `CASEY` repo → Root Directory: `shiftforge/`

## What's here

**Screens** (6):
- `/` · Dashboard
- `/assets` · Asset Register
- `/assets/[id]` · Asset Detail (digital twin)
- `/shifts` · Shift Roster
- `/reports/new` · New Report (form + AI generator)
- `/handover` · Handover Briefing
- `/analytics` · Analytics + AI-flagged trends

**Demo data** (small scale · 5 assets · 5 reports · 3 users):
- `data/assets.json`
- `data/reports.json`
- `data/users.json`
- `data/permits.json`

**API routes** (mocked · returns JSON):
- `GET /api/assets`
- `GET /api/reports`
- `POST /api/generate` (stubbed AI response)

## What's next (Martin's work)

- Wire `/api/generate` to Claude API (real report generation)
- Move data from JSON to Supabase (Postgres + Auth + RLS)
- Add multi-select equipment picker + location cascade
- Add user auth + role-based views
- Build Complaints/Incident/Service Log report types
- Add photo/video attachments to reports
- Mobile PWA optimisation
- Offline mode with sync (for mine sites with patchy comms)
- Integration to SAP-PM / Pronto / HxGN EAM

## Aesthetic

Dark cosmic + red accent · Sora headings · Inter body · JetBrains Mono for data.
Tailwind config in `tailwind.config.ts`.
