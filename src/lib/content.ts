export type Faq = { q: string; a: string };
export type PageDef = {
  slug: string;
  group: "solutions" | "platform" | "use-cases";
  nav: string;
  eyebrow: string;
  title: string;
  lead: string;
  stats: { value: string; label: string }[];
  features: { title: string; body: string }[];
  stepsTitle: string;
  steps: { title: string; body: string }[];
  pillarsTitle: string;
  pillars: { title: string; body: string }[];
  faqs: Faq[];
};

const commonFaqs = (topic: string): Faq[] => [
  { q: `How long does it take to launch ${topic}?`, a: "Most teams launch their first live workflow within two weeks. Templates for common roles are ready on day one, and your team can adjust questions, rubrics and scoring before anything goes to candidates." },
  { q: "Do recruiters stay in control of decisions?", a: "Always. ScreenStage surfaces evidence and recommendations, but people decide who moves forward. Every score links back to the candidate response that produced it." },
  { q: "Does it connect to our ATS?", a: "Yes. Results, scores and links write back to your applicant tracking system so recruiters stay in the tools they already use." },
  { q: "How is candidate data protected?", a: "Data is encrypted in transit and at rest, access is role-based, and retention windows are configurable per organization." },
];

export const pages: PageDef[] = [
  {
    slug: "match-and-apply", group: "solutions", nav: "Match and Apply", eyebrow: "Engage",
    title: "Turn interest into qualified applications",
    lead: "A conversational agent on your careers site learns what candidates want, answers their questions and guides each one toward the role that genuinely fits.",
    stats: [{ value: "3x", label: "more qualified applicants per posting" }, { value: "62%", label: "fewer mismatched applications" }, { value: "24/7", label: "candidate conversations" }],
    features: [
      { title: "Understand candidates", body: "The agent asks about experience, schedule, location and goals in a natural chat instead of a long form." },
      { title: "Answer role questions", body: "Pay ranges, shifts, benefits and requirements are answered instantly from your approved job content." },
      { title: "Confirm the basics", body: "Eligibility, availability and must-have requirements are verified before an application is ever submitted." },
      { title: "Drive applications", body: "Candidates are routed to the open role that fits them best, with their answers carried into the application." },
      { title: "Schedule next steps", body: "Matched candidates can book the next stage — an AI interview, assessment or recruiter call — in the same conversation." },
    ],
    stepsTitle: "How AI job matching works",
    steps: [{ title: "Welcome", body: "A friendly chat opens on any careers page." }, { title: "Discover", body: "The agent learns skills, interests and constraints." }, { title: "Match", body: "Open roles are ranked by real fit, not keywords." }, { title: "Apply", body: "One tap sends a pre-qualified application to your ATS." }],
    pillarsTitle: "Agentic AI with human oversight",
    pillars: [{ title: "Science-backed", body: "Matching signals are grounded in job-relevant attributes, never protected characteristics." }, { title: "Candidate experience", body: "Short, warm conversations that respect people's time." }, { title: "Oversight", body: "Recruiters review transcripts, tune answers and set guardrails." }],
    faqs: commonFaqs("Match and Apply"),
  },
  {
    slug: "ai-interviewer", group: "solutions", nav: "AI Interviewer", eyebrow: "Screen",
    title: "Every applicant gets a conversation",
    lead: "Shortlist faster with always-on AI screening interviews built on structured hiring science. Every recommendation comes with the evidence behind it.",
    stats: [{ value: "5–10x", label: "return on investment" }, { value: "30+", label: "languages supported" }, { value: "100%", label: "of scores tied to evidence" }],
    features: [
      { title: "Script built from the job description", body: "Paste a job description and ScreenStage drafts a structured interview with questions, probes and a scoring rubric." },
      { title: "Qualification questions and scoring", body: "Check must-haves like availability, licences and location with clear pass or review outcomes." },
      { title: "Skill questions and scoring", body: "Behavioral and situational questions are scored against anchored rubrics, not gut feeling." },
      { title: "Always-on conversations", body: "Candidates interview when it suits them, from any device, in their own language." },
      { title: "Dozens of built-in guardrails", body: "Protected topics are blocked, scoring ignores irrelevant signals, and every output is checked before recruiters see it." },
      { title: "Scores in your ATS", body: "Ranked shortlists, summaries and evidence write back to the system your recruiters already use." },
    ],
    stepsTitle: "From job description to shortlist",
    steps: [{ title: "Script", body: "Generate an interview from the job description." }, { title: "Customize", body: "Edit questions and the scoring rubric." }, { title: "Interview", body: "AI asks, probes follow-ups and records answers." }, { title: "Evaluate", body: "Evidence for each rubric item is extracted and scored." }, { title: "Decide", body: "Recruiters review scores and move people forward." }],
    pillarsTitle: "Defensible by design. Every signal is based on evidence.",
    pillars: [{ title: "Evidence-led", body: "Scores cite the exact answers behind them." }, { title: "Advanced governance", body: "Versioned rubrics, audit logs and review workflows." }, { title: "Transparent experience", body: "Candidates know they are speaking with AI and why." }],
    faqs: commonFaqs("AI Interviewer"),
  },
  {
    slug: "assessment-builder", group: "solutions", nav: "Assessment Builder", eyebrow: "Assess",
    title: "Build assessments that mirror the job",
    lead: "Design custom skills tests with a guided builder that links every task candidates complete to what success requires on the job.",
    stats: [{ value: "250+", label: "skills in the library" }, { value: "10 min", label: "to a first draft" }, { value: "5", label: "step guided workflow" }],
    features: [
      { title: "Define success", body: "Start from the role: what great performance looks like in the first 90 days." },
      { title: "Measure what matters", body: "Pick the competencies and question types that predict that performance." },
      { title: "Capture evidence", body: "Combine multiple-choice, situational and written tasks in one candidate flow." },
      { title: "Generate consistent insights", body: "Weighted scoring rolls results into one comparable profile per candidate." },
      { title: "AI-assisted authoring", body: "Draft questions and answer keys with AI, then review and approve each one." },
    ],
    stepsTitle: "The builder workflow",
    steps: [{ title: "Define success", body: "Describe the role outcomes." }, { title: "Measure what matters", body: "Choose competencies." }, { title: "Capture evidence", body: "Add tasks and questions." }, { title: "Generate insights", body: "Set weights and cut-offs." }, { title: "Decide", body: "Publish and share a candidate link." }],
    pillarsTitle: "Authoring with confidence",
    pillars: [{ title: "Job-relevant", body: "Every item maps to a competency." }, { title: "Reviewable", body: "Nothing goes live without human approval." }, { title: "Reusable", body: "Clone and adapt templates across roles." }],
    faqs: commonFaqs("Assessment Builder"),
  },
  {
    slug: "assessments", group: "solutions", nav: "Assessments", eyebrow: "Assess",
    title: "Assessments verify skills in action",
    lead: "Candidates can say anything on a résumé. Assessments prove they have the skills that actually matter.",
    stats: [{ value: "200M", label: "reference completions modeled" }, { value: "+32%", label: "better retention" }, { value: "250+", label: "behavioral and cognitive skills" }],
    features: [
      { title: "Foundational assessments", body: "Cognitive ability, personality and work-style measures that apply across roles." },
      { title: "Job-specific assessments", body: "Simulations and situational tests tailored to roles like nursing, retail associate or software engineer." },
      { title: "Game-based tasks", body: "Short, engaging exercises that reveal how candidates think." },
      { title: "Mobile-first delivery", body: "Candidates finish in minutes from a phone, no downloads needed." },
      { title: "Instant scoring", body: "Results are calculated deterministically the moment a candidate submits." },
    ],
    stepsTitle: "Assessments in practice",
    steps: [{ title: "Pick", body: "Choose from the library or build your own." }, { title: "Invite", body: "Share a link or send from your ATS." }, { title: "Complete", body: "Candidates demonstrate skills." }, { title: "Review", body: "Compare scored profiles side by side." }],
    pillarsTitle: "Science-backed assessments for defensible decisions",
    pillars: [{ title: "Scientific validity", body: "Content is validated against job performance." }, { title: "Proven outcomes", body: "Customers see higher performance and retention." }, { title: "Governance", body: "Adverse-impact monitoring and audit trails." }],
    faqs: commonFaqs("Assessments"),
  },
  {
    slug: "video-interviewing", group: "solutions", nav: "Video Interviewing", eyebrow: "Interview",
    title: "Video interviewing, on-demand or live",
    lead: "Run consistent first-round interviews at scale with far less recruiter work, then move your verified shortlist into live conversations.",
    stats: [{ value: "70M", label: "video interviews" }, { value: "3.5 days", label: "application to offer" }, { value: "92%", label: "candidate satisfaction" }],
    features: [
      { title: "Realistic job preview", body: "Show candidates what the role is really like before they commit." },
      { title: "On-demand video", body: "Candidates record answers on their own schedule with clear time limits." },
      { title: "Live interviews", body: "Host structured live sessions with an interview co-pilot capturing notes." },
      { title: "Interview insights", body: "Smart summaries and structured scores surface the strongest answers." },
      { title: "Review and share", body: "Collaborative scorecards help panels reach confident decisions." },
    ],
    stepsTitle: "Interview workflow",
    steps: [{ title: "Invite", body: "Send a branded interview link." }, { title: "Record", body: "Candidates answer on demand." }, { title: "Review", body: "Teams rate with shared scorecards." }, { title: "Meet live", body: "Advance finalists to live interviews." }],
    pillarsTitle: "Flexible formats, structured content",
    pillars: [{ title: "Science-backed", body: "Structured questions improve fairness." }, { title: "Oversight", body: "Humans review every recommendation." }, { title: "Insights", body: "Summaries save hours of watching." }],
    faqs: commonFaqs("video interviewing"),
  },
  {
    slug: "our-science", group: "platform", nav: "Our Science", eyebrow: "Platform",
    title: "Better hiring science means better hiring results",
    lead: "Automation without validation is a liability. ScreenStage tests every step of the process for job relevance, validity and reliability.",
    stats: [{ value: "+43%", label: "more successful hires per 100" }, { value: "+32%", label: "better retention" }, { value: "3x", label: "higher performance ratings" }],
    features: [
      { title: "Identifies job relevance", body: "Content is derived from analysis of what the job actually requires." },
      { title: "Validity of evaluation", body: "Scores are tested against real performance outcomes." },
      { title: "Reliability of interaction", body: "Candidates get a consistent, structured experience every time." },
      { title: "Governed controls", body: "Bias monitoring and review gates run continuously." },
    ],
    stepsTitle: "Validation at multiple steps, not just the end",
    steps: [{ title: "Job description to script agent", body: "Validated for coverage of job requirements." }, { title: "Conversation agent", body: "Validated for consistent, fair follow-ups." }, { title: "Scoring agent", body: "Validated against human expert ratings." }, { title: "Guardrail agent", body: "Validated for blocking disallowed content." }],
    pillarsTitle: "Tech-only vendors vs. ScreenStage",
    pillars: [{ title: "Tech-only vendors", body: "Ship automation fast and measure results later." }, { title: "ScreenStage", body: "Validates first, then automates, then monitors." }],
    faqs: commonFaqs("evidence-based hiring"),
  },
  {
    slug: "integrations", group: "platform", nav: "Integrations", eyebrow: "Platform",
    title: "Certified integration partner program",
    lead: "ScreenStage works with the systems you already run, writing scores and links back to your applicant tracking system.",
    stats: [{ value: "45+", label: "ATS integrations" }, { value: "REST", label: "open API and webhooks" }, { value: "SSO", label: "SAML and OIDC" }],
    features: [
      { title: "Workday", body: "Candidate status and results sync to requisitions." }, { title: "SAP SuccessFactors", body: "Embedded invitations and scorecards." },
      { title: "Oracle and Taleo", body: "Two-way status updates." }, { title: "iCIMS", body: "Launch interviews from candidate workflows." },
      { title: "Greenhouse", body: "Scores appear on candidate profiles." }, { title: "SmartRecruiters", body: "Stage-triggered assessments." },
    ],
    stepsTitle: "Getting connected",
    steps: [{ title: "Choose", body: "Pick your ATS connector." }, { title: "Authorize", body: "Secure OAuth or API key setup." }, { title: "Map", body: "Match stages and fields." }, { title: "Go live", body: "Results flow automatically." }],
    pillarsTitle: "Partners",
    pillars: [{ title: "Technology partners", body: "Workday, SAP, Oracle, iCIMS, Greenhouse, Cornerstone and more." }, { title: "Consulting partners", body: "Implementation specialists for large rollouts." }],
    faqs: commonFaqs("an integration"),
  },
  {
    slug: "cheating-and-fraud", group: "platform", nav: "Cheating & Fraud", eyebrow: "Platform",
    title: "Cheating mitigation in the era of AI",
    lead: "Detect and deter impersonation, AI-assisted answers and answer sharing without hurting honest candidates.",
    stats: [{ value: "6", label: "layered signals" }, { value: "<1%", label: "false-flag review rate target" }, { value: "100%", label: "human review of flags" }],
    features: [
      { title: "Behavioral signals", body: "Response timing and pattern analysis flag unusual activity." },
      { title: "Question randomization", body: "Item pools and ordering reduce answer sharing." },
      { title: "Identity checks", body: "Optional verification at key stages." },
      { title: "Flag review queue", body: "Recruiters see flags with context, never automatic rejections." },
    ],
    stepsTitle: "How mitigation works",
    steps: [{ title: "Prevent", body: "Randomized, time-bound content." }, { title: "Detect", body: "Signals run during completion." }, { title: "Review", body: "A human confirms or clears flags." }],
    pillarsTitle: "Fair to candidates",
    pillars: [{ title: "Transparent", body: "Candidates are told what is monitored." }, { title: "Proportionate", body: "Flags prompt review, not rejection." }],
    faqs: commonFaqs("cheating mitigation"),
  },
  {
    slug: "automation", group: "platform", nav: "Automation", eyebrow: "Platform",
    title: "Automate scheduling and workflow",
    lead: "Move candidates between stages automatically with rules, reminders and self-service scheduling.",
    stats: [{ value: "80%", label: "less scheduling effort" }, { value: "2x", label: "faster stage transitions" }, { value: "0", label: "spreadsheets needed" }],
    features: [
      { title: "Schedule", body: "Candidates pick times from live recruiter availability." }, { title: "Automate", body: "Rules advance or hold candidates based on scores." },
      { title: "Permissions", body: "Role-based access for recruiters, managers and admins." }, { title: "Reminders", body: "Email nudges lift completion rates." },
    ],
    stepsTitle: "Workflow in four moves",
    steps: [{ title: "Trigger", body: "A candidate applies." }, { title: "Invite", body: "Interview or assessment is sent." }, { title: "Score", body: "Results come back instantly." }, { title: "Route", body: "Rules move them to the next step." }],
    pillarsTitle: "Control",
    pillars: [{ title: "Rules you own", body: "Thresholds are yours to set." }, { title: "Audit trail", body: "Every automated action is logged." }],
    faqs: commonFaqs("automation"),
  },
  {
    slug: "enterprise-security-compliance", group: "platform", nav: "Security & Compliance", eyebrow: "Platform",
    title: "Enterprise security and compliance",
    lead: "Audit-ready governance, granular permissions and privacy controls designed for regulated hiring.",
    stats: [{ value: "AES-256", label: "encryption at rest" }, { value: "RLS", label: "row-level isolation" }, { value: "GDPR", label: "ready workflows" }],
    features: [
      { title: "Role-based access", body: "Least-privilege roles across your organization." }, { title: "Data isolation", body: "Row Level Security keeps each organization's data separate." },
      { title: "Retention controls", body: "Configure how long candidate data is stored." }, { title: "Audit logs", body: "Track who viewed or changed what." },
    ],
    stepsTitle: "Governance workflow",
    steps: [{ title: "Configure", body: "Set roles and retention." }, { title: "Monitor", body: "Review logs and adverse impact." }, { title: "Report", body: "Export evidence for auditors." }],
    pillarsTitle: "Trust",
    pillars: [{ title: "Explainable", body: "Every score has an explanation." }, { title: "Private", body: "Candidate data is never sold." }],
    faqs: commonFaqs("security controls"),
  },
  {
    slug: "services", group: "platform", nav: "Services", eyebrow: "Platform",
    title: "Services that get you live faster",
    lead: "Implementation, assessment design and optimization partners to help your team launch and improve.",
    stats: [{ value: "2 wks", label: "typical first launch" }, { value: "1:1", label: "success manager" }, { value: "24/7", label: "support" }],
    features: [
      { title: "Implementation", body: "Guided setup and integration." }, { title: "Content design", body: "Role-specific interviews and assessments." },
      { title: "Training", body: "Workshops for recruiters and hiring managers." }, { title: "Optimization", body: "Quarterly reviews of outcomes." },
    ],
    stepsTitle: "Engagement model",
    steps: [{ title: "Discover", body: "Understand your hiring." }, { title: "Build", body: "Configure and integrate." }, { title: "Launch", body: "Go live with support." }, { title: "Improve", body: "Measure and refine." }],
    pillarsTitle: "Support",
    pillars: [{ title: "Dedicated team", body: "Named experts for your account." }, { title: "Documentation", body: "Guides and training library." }],
    faqs: commonFaqs("services"),
  },
  ...[
    ["high-volume-hiring", "Hourly + High Volume", "Hire hundreds without drowning in applications", "Screen every applicant fast, fairly and on any device."],
    ["early-career-graduate", "Early Career + Graduate", "Campus and graduate hiring at scale", "Give every student a fair first look and keep the experience engaging."],
    ["technical-hiring", "Technical Hiring", "Verify technical skills early", "Assess coding, problem solving and communication before engineers spend time."],
    ["professional-hiring", "Professional", "Structured hiring for professional roles", "Bring consistency and evidence to experienced-hire decisions."],
    ["internal-mobility", "Internal Mobility", "Help your people find their next role", "Match employees to opportunities using demonstrated skills."],
    ["financial-services", "Financial Services", "Compliant hiring for regulated teams", "Defensible, documented hiring for banks, insurers and advisors."],
    ["hospitality", "Hospitality", "Hire guest-ready teams faster", "Spot warmth, reliability and service mindset across seasonal peaks."],
    ["manufacturing", "Manufacturing", "Safe, reliable, retained shop-floor hiring", "Screen for dependability and safety mindset at plant scale."],
    ["tech-telecom", "Tech & Telecom", "Hire builders and support teams", "Combine technical depth with customer-facing screening."],
    ["public-sector", "Public Sector", "Transparent hiring for government", "Equitable, auditable processes that serve the public."],
    ["retail", "Retail", "Hire for proven skills and retention", "Every résumé looks qualified, so hire for adaptability and dependability."],
    ["healthcare", "Healthcare", "Find caring, qualified clinical staff", "Verify empathy, judgment and credentials at speed."],
    ["rpo-staffing", "RPO Staffing", "Deliver more placements per recruiter", "Standardize screening across clients and requisitions."],
    ["mid-market", "Mid-market", "Enterprise-grade hiring, mid-market simplicity", "Launch quickly with templates and transparent plans."],
  ].map(([slug, nav, title, lead]) => ({
    slug, group: "use-cases" as const, nav, eyebrow: "Use case", title, lead,
    stats: [{ value: "49%", label: "recruiter efficiency gain" }, { value: "92%", label: "candidate satisfaction" }, { value: "3.5 days", label: "application to offer" }],
    features: [
      { title: "Application volume is rising", body: "Quality is harder to spot. Structured screening surfaces the strongest people from every applicant." },
      { title: "Turnover drives up cost", body: "Skills and fit signals help you hire people who stay." },
      { title: "Inconsistency creates risk", body: "One process and one rubric across every location and team." },
      { title: "Peak demand outpaces capacity", body: "Always-on AI interviews absorb seasonal surges." },
    ],
    stepsTitle: "See what ScreenStage looks like for your team",
    steps: [{ title: "Engage", body: "Guide candidates to the right role." }, { title: "Screen", body: "AI interview and qualification." }, { title: "Assess", body: "Verify skills in action." }, { title: "Interview", body: "Advance finalists live." }],
    pillarsTitle: "Recommended skills",
    pillars: [{ title: "Adaptability", body: "Willingness to learn and adjust." }, { title: "Communication", body: "Clear, confident interaction." }, { title: "Dependability", body: "Reliability and job fit." }],
    faqs: commonFaqs(String(nav).toLowerCase() + " hiring"),
  })),
];

export const byGroup = (g: PageDef["group"]) => pages.filter((p) => p.group === g);
export const findPage = (g: PageDef["group"], slug: string) => pages.find((p) => p.group === g && p.slug === slug);

export const homeFaqs: Faq[] = [
  { q: "What is an AI hiring platform?", a: "An AI hiring platform helps organizations find qualified candidates efficiently by combining automation with skills-based evaluation. ScreenStage brings together AI interviews, video interviewing, validated assessments and workflow automation, with people making the final call." },
  { q: "What is video interviewing software?", a: "It lets teams evaluate candidates through structured interviews without everyone meeting live. ScreenStage supports on-demand and live formats with shared scorecards." },
  { q: "How does AI interviewing work?", a: "ScreenStage generates a structured script from your job description, conducts the conversation, probes with follow-ups, and scores answers against a rubric with evidence for each score." },
  { q: "What is the difference between video interviewing and AI interviewing?", a: "Video interviewing records or hosts conversations between people. AI interviewing adds a guided, adaptive interviewer that surfaces skills-based insights automatically." },
  { q: "What is candidate assessment software?", a: "Tools that evaluate job-related skills and potential beyond a résumé. ScreenStage combines assessments with structured interview insights." },
  { q: "How does ScreenStage help organizations hire faster?", a: "It automates engagement, screening, scheduling and scoring so recruiters spend time on qualified candidates instead of administration." },
  { q: "Can AI improve candidate screening?", a: "Yes, when it is anchored to job-relevant criteria and evidence. ScreenStage scores what candidates say against rubrics, not keywords or formatting." },
  { q: "Is AI hiring fair and compliant?", a: "Responsible AI hiring needs transparency, governance and validation. ScreenStage uses structured evaluation, audit logs and human review gates." },
  { q: "Which industries use ScreenStage?", a: "Healthcare, retail, manufacturing, financial services, hospitality, government and more — for both high-volume and professional roles." },
  { q: "How does ScreenStage integrate with an ATS?", a: "Through connectors and an open API, results and links are written back to your applicant tracking system." },
  { q: "Does ScreenStage replace recruiters?", a: "No. It removes repetitive work so recruiters can engage qualified candidates. People make every hiring decision." },
];

export const plans = [
  { id: "starter", name: "Starter", price: 47, blurb: "For small teams starting structured screening.", url: "https://selar.com/47plan?currency=USD", credits: 50, features: ["50 AI interview credits / month", "3 active roles", "Assessment library", "Email support"] },
  { id: "growth", name: "Growth", price: 57, blurb: "For growing teams that hire every month.", url: "https://selar.com/57plan?currency=USD", credits: 200, popular: true, features: ["200 AI interview credits / month", "15 active roles", "Assessment Builder with AI drafting", "Candidate scorecards and exports", "Priority support"] },
  { id: "scale", name: "Scale", price: 97, blurb: "For high-volume hiring and multiple teams.", url: "https://selar.com/97plan?currency=USD", credits: 1000, features: ["1,000 AI interview credits / month", "Unlimited active roles", "Team roles and permissions", "ATS webhooks and API", "Dedicated success manager"] },
];

export const resources = [
  { type: "Guide", title: "Inside the AI interviewer: best practices", date: "October 7, 2026" },
  { type: "Webinar", title: "Cheating mitigation and candidate experience in the era of AI", date: "November 4, 2026" },
  { type: "Report", title: "The new reality of high-volume retail hiring", date: "September 15, 2026" },
  { type: "Case study", title: "How a hospital network cut time-to-fill by 41%", date: "August 20, 2026" },
  { type: "Blog", title: "Structured scoring: why rubrics beat gut feel", date: "August 2, 2026" },
  { type: "Calculator", title: "Virtual recruiting ROI calculator", date: "Always on" },
];
