# Connect

Marketing site for Connect, a planned platform of AI agents (booking, voice, WhatsApp, follow-up and more) for small service businesses.

Built with Next.js (App Router), TypeScript and CSS Modules. The isometric illustrations are generated in code (`lib/iso.ts`, `components/iso.tsx`, `components/Board.tsx`).

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Notes

- The early-access form (`components/EarlyAccess.tsx`) only shows a confirmation. It is not connected to a backend yet.
- Page copy lives in `app/page.tsx` and `lib/content.ts`. Design tokens are in `app/globals.css`.
