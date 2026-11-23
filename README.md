# ScreenStage

AI-native hiring platform: AI interviews, AI-drafted assessments and evidence-based candidate scoring. Next.js 16 (App Router), React 19, TypeScript, Tailwind 4, Supabase, Gemini.

## What is in the repo

**Public site** (original copy and branding)
- Homepage, mega-menu navigation, footer
- 4 solution pages, 2 platform pages, 14 use-case pages (data-driven from `src/lib/content.ts`)
- Pricing (Selar links via signup and billing), About, Hiring ROI calculator, Candidate support, Legal pages
- Calls to action are limited to Sign up and Log in

**Application** (`/app`, protected)
- Auth: sign-up, login, logout, password recovery/reset, session refresh in `src/proxy.ts`
- AI Interviews: job description to structured script (Gemini, schema-validated), shareable candidate link `/i/[token]`, AI evaluation with evidence per competency
- Assessments: AI-drafted multiple choice, **deterministic** scoring (answer keys never sent to the client)
- Candidates pipeline, Analytics (Recharts), Notifications, Billing (credits, plans), Settings
- Credits are spent atomically in Postgres (`spend_credit`) and refunded if the AI call fails

## Setup

1. `npm install`
2. Create a Supabase project, run `supabase/schema.sql` in the SQL editor (tables, RLS, profile trigger, credit function).
3. Copy `.env.example` to `.env.local` and fill every value. Never commit `.env.local`.
4. `npm run dev`

### Environment variables
| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Browser/server auth and RLS-protected data |
| `SUPABASE_SERVICE_ROLE_KEY` | Server only: credit metering, public candidate submissions, demo leads, payment confirmation |
| `GEMINI_API_KEY`, `GEMINI_MODEL` | Server only AI calls (default `gemini-3.8-flash`) |
| `PAYMENT_WEBHOOK_SECRET` | Shared secret for `POST /api/payments/confirm` |
| `NEXT_PUBLIC_SITE_URL` | Used to build candidate links |

## Payments
Upgrade buttons open the Selar links. A redirect never unlocks a plan. Plans activate through `POST /api/payments/confirm` (`x-webhook-secret` header; body `{ email, plan, reference }`), called by a verified Selar webhook or by an admin. Idempotent on `reference`. The customer must use the same email at checkout as their account.

## Deploy to Vercel
Import the repo, add the variables above, deploy. Add your Vercel URL to Supabase Auth, URL Configuration (Site URL and redirect `/reset-password`, `/app`).

## Known limitations
- Video interviewing, live interview co-pilot, ATS connectors and cheating detection are not built and are not advertised.
- The AI interviewer is text-based.
- Selar webhook signature verification is not wired; the confirm endpoint uses a shared secret and expects verified events.
- Legal pages are starting points and need counsel review before launch.
- Set `NEXT_PUBLIC_SITE_URL` to the live domain so confirmation and reset emails link to the live site, and set the same URL as the Site URL in Supabase Auth settings.
