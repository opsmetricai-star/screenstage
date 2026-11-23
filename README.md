# ScreenStage

Agentic hiring platform: AI interviews, skills assessments and video-interview workflow. Next.js 16 (App Router) · React 19 · TypeScript · Tailwind 4 · Supabase · Gemini.

## What is in the repo

**Public site** (modelled on the reference's structure; original copy and branding)
- Homepage in the reference's 7-section order, mega-menu navigation (Solutions, Platform, Use Cases, Customers, Resources, Company), footer
- 5 solution pages, 6 platform pages, 14 use-case/industry pages (data-driven from `src/lib/content.ts`)
- Pricing (Selar links), About, Customers, Resources (+ working ROI calculator), Blog, Careers, Contact, Demo request, Candidate support, Legal templates

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
- Video interviewing, the live interview co-pilot, ATS connectors and cheating detection are described on the marketing pages but are **not implemented** as product features. The AI interviewer is text-based.
- Reference imagery, customer logos and some illustrations are recreated with CSS or placeholders, not copied.
- Selar webhook signature verification is not wired; the endpoint uses a shared secret and expects you to forward verified events.
- Legal pages are templates and need counsel review.
