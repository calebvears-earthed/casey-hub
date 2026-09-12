# CASEY

Monorepo for Casey's two products:

- **`/topgun`** — Top Gun Engineering marketing site (delivery + consulting arm)
- **`/shiftforge`** — ShiftForge maintenance intelligence SaaS demo (mining + heavy industry)
- **`/_reference`** — ecosystem plan + data model + positioning brief (PDFs · read-only)

## Stack

- Next.js 14 (App Router)
- Tailwind CSS
- TypeScript
- Deployed on Vercel (two separate projects, one per subfolder)

## Local dev

```bash
# ShiftForge
cd shiftforge && npm install && npm run dev
# → localhost:3000

# TopGun (in another terminal)
cd topgun && npm install && npm run dev -- -p 3001
# → localhost:3001
```

## Deploy

Two Vercel projects linked to this repo:

1. **shiftforge** — Root Directory: `shiftforge/` → `shiftforge.vercel.app`
2. **topgun-engineering** — Root Directory: `topgun/` → `topgun-engineering.vercel.app`

Every push to `main` auto-deploys.

## Editing

Files in this repo are edited by Arc (Caleb's AI ops partner) via OneDrive access. Caleb pushes changes to GitHub, Vercel auto-deploys.

## Reference

See `_reference/` for the full ecosystem plan, data model, and Top Gun positioning brief.
