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

- The early-access form (`components/EarlyAccess.tsx`) posts to `/api/enquiries`, which stores submissions in MongoDB. See below.
- Page copy lives in `app/page.tsx` and `lib/content.ts`. Design tokens are in `app/globals.css`.

## Forms backend

The early-access form (home page and the plan enquiry modal on `/packages`) sends a JSON `POST` to `app/api/enquiries/route.ts`. The handler validates the input, drops honeypot (`company_website`) submissions, and inserts the enquiry into MongoDB using the official `mongodb` driver (`lib/mongodb.ts`).

Environment variables (see `.env.example`):

| Variable | Required | Default | Notes |
| --- | --- | --- | --- |
| `MONGODB_URI` | yes | none | Connection string, e.g. from MongoDB Atlas |
| `MONGODB_DB` | no | `connect` | Database name |

- Local: copy `.env.example` to `.env.local` and fill in `MONGODB_URI`. `.env*.local` is gitignored.
- Vercel: Project, Settings, Environment Variables. Add both for Production (and Preview if wanted), then redeploy. On Atlas, allow Vercel to connect under Network Access (for example `0.0.0.0/0`, or Vercel's static IPs if your plan has them).

The build does not need the variables. Without `MONGODB_URI` the endpoint returns a generic 500 and logs the reason.

Each submission is stored in the `enquiries` collection as:

```ts
{
  name: string;          // 1-120 chars
  email: string;         // valid email, up to 200 chars
  businessType: string;  // up to 80 chars, may be ""
  task: string;          // up to 2000 chars, may be ""
  plan: string;          // "Core" | "Growth" | "Not sure yet" | ""
  source: "home" | "packages";
  createdAt: Date;
  userAgent: string;
}
```

Invalid input returns `400` with `{ ok: false, field, error }`. Success returns `201` with `{ ok: true }`.
