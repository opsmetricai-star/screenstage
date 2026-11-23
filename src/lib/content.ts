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

const mechanismStats = [
  { value: "5 to 7", label: "structured questions generated per role" },
  { value: "1 to 5", label: "evidence-backed score for every competency" },
  { value: "100%", label: "of AI scores carry the answer excerpt behind them" },
];

const commonFaqs = (topic: string): Faq[] => [
  { q: `How quickly can a team run ${topic}?`, a: "Paste a job description and ScreenStage produces a structured, rubric-scored workflow in minutes. Your team reviews it, then shares a link with candidates the same day." },
  { q: "Who makes the hiring decision?", a: "Your team does. The AI analyzes responses, scores them against the rubric and recommends a next step. Every score links back to the candidate's own words so a person can confirm it." },
  { q: "How is candidate data protected?", a: "Every organization's data is isolated at the database level with row level security. Access is limited to the account that owns the records, and AI processing is restricted to scoring job-relevant evidence." },
  { q: "What does usage cost?", a: "Each AI action consumes one credit. Plans include a monthly credit allowance and you can move between plans from the billing page." },
];

export const pages: PageDef[] = [
  {
    slug: "ai-interviewer", group: "solutions", nav: "AI Interviewer", eyebrow: "Screen",
    title: "An AI interviewer that screens every applicant and ranks them on evidence",
    lead: "ScreenStage reads your job description, writes a structured interview, conducts it with every candidate and scores each answer against a rubric. Recruiters stop screening and start deciding.",
    stats: mechanismStats,
    features: [
      { title: "Interview generation from the job description", body: "The AI extracts the competencies the role demands and drafts questions with scoring rubrics. Your team edits nothing unless it wants to." },
      { title: "Consistent scoring at any volume", body: "Every candidate answers the same questions and is scored against the same rubric, so comparisons are fair and decisions are defensible." },
      { title: "Evidence attached to every score", body: "Each competency rating includes the supporting excerpt from the candidate's answer. Reviewers verify in seconds instead of re-interviewing." },
      { title: "A clear recommendation per candidate", body: "The model returns advance, review or decline with a written summary, so hiring managers open a ranked shortlist rather than a pile of transcripts." },
      { title: "A shareable interview link", body: "Send one link per role. Candidates respond from any device and results appear in your pipeline as they arrive." },
      { title: "Protected characteristics excluded by design", body: "Scoring instructions restrict the model to job-relevant evidence and ignore any instructions embedded in candidate answers." },
    ],
    stepsTitle: "From job description to ranked shortlist",
    steps: [{ title: "Analyze", body: "The AI maps the role to competencies." }, { title: "Generate", body: "A structured interview and rubric are produced." }, { title: "Collect", body: "Candidates answer through a single link." }, { title: "Score", body: "Each answer is rated with cited evidence." }, { title: "Decide", body: "Your team acts on a ranked shortlist." }],
    pillarsTitle: "Built so every recommendation can be defended",
    pillars: [{ title: "Evidence-led", body: "No score exists without the excerpt that justifies it." }, { title: "Rubric-anchored", body: "Ratings follow criteria set before the first candidate responds." }, { title: "Human final say", body: "The platform recommends. Your team decides." }],
    faqs: commonFaqs("AI interviews"),
  },
  {
    slug: "assessment-builder", group: "solutions", nav: "Assessment Builder", eyebrow: "Assess",
    title: "Generate role-specific assessments from the skills your business needs",
    lead: "Name the competencies that predict success in a role. ScreenStage drafts a scenario-based assessment with answer keys, ready to deploy after a quick review.",
    stats: [{ value: "3 to 15", label: "scenario questions per assessment" }, { value: "4", label: "plausible options per question" }, { value: "1 credit", label: "per AI-drafted assessment" }],
    features: [
      { title: "Competency-first drafting", body: "Describe the skills to measure and the AI writes situational questions that test judgment, not trivia." },
      { title: "Calibrated answer options", body: "Distractors are written to be plausible, so the assessment separates strong candidates from guessers." },
      { title: "Built-in answer keys", body: "Keys stay on the server and never reach the candidate's browser." },
      { title: "Reusable across requisitions", body: "Save an assessment once and run it for every opening in the same job family." },
    ],
    stepsTitle: "How an assessment is built",
    steps: [{ title: "Specify", body: "List the skills the role requires." }, { title: "Draft", body: "The AI generates scenario questions and keys." }, { title: "Review", body: "Your team inspects the questions." }, { title: "Deploy", body: "Run candidates and compare scores." }],
    pillarsTitle: "Precision where precision matters",
    pillars: [{ title: "Deterministic scoring", body: "Results are calculated from the answer key, never estimated by a model." }, { title: "Auditable content", body: "Every question and key is stored and reviewable." }, { title: "Consistent delivery", body: "All candidates face the same items under the same rules." }],
    faqs: commonFaqs("an assessment"),
  },
  {
    slug: "assessments", group: "solutions", nav: "Assessments", eyebrow: "Assess",
    title: "Instant, objective skills scoring that removes guesswork from selection",
    lead: "Run candidates through scenario assessments and receive a precise percentage score the moment they finish, calculated directly from the answer key.",
    stats: [{ value: "0 seconds", label: "from submission to score" }, { value: "100%", label: "deterministic, no model estimation" }, { value: "Automatic", label: "candidate record creation" }],
    features: [
      { title: "Scores calculated, not predicted", body: "Precision-sensitive results use plain arithmetic on the answer key, so the same answers always produce the same score." },
      { title: "Candidates enter your pipeline automatically", body: "Name and email create a candidate record at the assessed stage, with the score attached." },
      { title: "Side-by-side comparison", body: "Rank candidates by score and move the strongest to the next stage." },
      { title: "Secure delivery", body: "Answer keys never leave the server. Candidates see questions only." },
    ],
    stepsTitle: "From assessment to ranked candidates",
    steps: [{ title: "Select", body: "Choose an assessment you built." }, { title: "Run", body: "Candidate completes the scenarios." }, { title: "Score", body: "The percentage is computed instantly." }, { title: "Rank", body: "The pipeline sorts by result." }],
    pillarsTitle: "Selection you can explain",
    pillars: [{ title: "Reproducible", body: "Identical inputs always return identical scores." }, { title: "Transparent", body: "Each result shows correct answers out of total." }, { title: "Traceable", body: "Every result is stored against the candidate and assessment." }],
    faqs: commonFaqs("assessments"),
  },
  {
    slug: "hiring-analytics", group: "solutions", nav: "Hiring Analytics", eyebrow: "Decide",
    title: "Hiring analytics that show where speed, quality and spend are won or lost",
    lead: "Every interview, assessment and AI action feeds one live view of your funnel, your score distribution and your credit consumption.",
    stats: [{ value: "6", label: "pipeline stages tracked" }, { value: "5", label: "score bands in the distribution" }, { value: "Daily", label: "credit usage reporting" }],
    features: [
      { title: "Funnel visibility", body: "See how many candidates sit at applied, screened, assessed, interview, offer and rejected." },
      { title: "Score distribution", body: "Spot whether a role attracts strong talent or needs a different sourcing approach." },
      { title: "Spend control", body: "Track daily credit usage so AI cost stays predictable as volume grows." },
      { title: "Notifications on completion", body: "Get alerted the moment a candidate finishes, with their score and recommendation." },
    ],
    stepsTitle: "From activity to decisions",
    steps: [{ title: "Capture", body: "Every action is recorded." }, { title: "Aggregate", body: "Data rolls into funnel and score views." }, { title: "Act", body: "Move candidates and adjust sourcing." }],
    pillarsTitle: "Operational clarity",
    pillars: [{ title: "Live", body: "Dashboards reflect the latest completions." }, { title: "Scoped", body: "Each account sees only its own data." }, { title: "Actionable", body: "Stage changes happen in the same view." }],
    faqs: commonFaqs("analytics"),
  },
  {
    slug: "evidence-scoring", group: "platform", nav: "Evidence-based Scoring", eyebrow: "Platform",
    title: "Scoring that is anchored to evidence, calculated with discipline",
    lead: "ScreenStage separates what AI is good at from what arithmetic is better at. Models interpret language and cite evidence. Code calculates totals.",
    stats: mechanismStats,
    features: [
      { title: "Structured model output", body: "Every AI response must conform to a strict schema or it is rejected and retried." },
      { title: "Deterministic totals", body: "Overall scores are computed in code from per-competency ratings, so they are reproducible." },
      { title: "Injection resistance", body: "Candidate text is treated as data. Instructions hidden inside answers are ignored." },
      { title: "Failure-safe billing", body: "If an AI call fails, the credit is returned automatically." },
    ],
    stepsTitle: "How a score is produced",
    steps: [{ title: "Interpret", body: "The model reads each answer against the rubric." }, { title: "Cite", body: "It must quote the evidence it relied on." }, { title: "Validate", body: "Output is checked against a strict schema." }, { title: "Calculate", body: "Code derives the overall score." }],
    pillarsTitle: "Principles",
    pillars: [{ title: "Job-relevant only", body: "Scoring considers evidence of the competency and nothing else." }, { title: "Explainable", body: "Each rating states why it was given." }, { title: "Reviewable", body: "People can overrule any recommendation." }],
    faqs: commonFaqs("evidence-based scoring"),
  },
  {
    slug: "security-governance", group: "platform", nav: "Security and Governance", eyebrow: "Platform",
    title: "Enterprise data isolation built into the database, not bolted on",
    lead: "Candidate and hiring data is protected by row level security in PostgreSQL, so one customer can never read another's records, even through a bug in application code.",
    stats: [{ value: "RLS", label: "enforced on every data table" }, { value: "Server-only", label: "credit metering and payments" }, { value: "Idempotent", label: "payment confirmation" }],
    features: [
      { title: "Row level security", body: "Every query is filtered by the authenticated account at the database layer." },
      { title: "Protected billing state", body: "Plans and credits can only be changed by trusted server processes, never by a user session." },
      { title: "Verified payments", body: "A checkout redirect alone never unlocks a plan. Activation follows trusted confirmation." },
      { title: "Secrets stay on the server", body: "AI and service credentials are never exposed to the browser." },
    ],
    stepsTitle: "Control model",
    steps: [{ title: "Authenticate", body: "Every session is verified." }, { title: "Isolate", body: "Queries are scoped to the account." }, { title: "Meter", body: "Usage is recorded atomically." }],
    pillarsTitle: "Governance outcomes",
    pillars: [{ title: "Containment", body: "A flaw in one layer cannot expose another account's data." }, { title: "Accountability", body: "Usage and subscription events are logged." }, { title: "Integrity", body: "Billing state resists tampering." }],
    faqs: commonFaqs("with these controls"),
  },
  ...[
    ["high-volume-hiring", "Hourly and High Volume", "Screen thousands of applicants without adding recruiters", "Always-on AI interviews rank every applicant on evidence, so your team spends time only on the people most likely to succeed."],
    ["early-career-graduate", "Early Career and Graduate", "Assess graduate talent on potential, not pedigree", "Structured scenario questions and consistent scoring surface strong early-career candidates regardless of background."],
    ["technical-hiring", "Technical Hiring", "Verify technical judgment before engineers lose hours interviewing", "AI-drafted scenario assessments test problem solving, and deterministic scoring ranks results immediately."],
    ["professional-hiring", "Professional", "Bring evidence to experienced-hire decisions", "Rubric-scored interviews replace gut feel with comparable, defensible ratings for senior roles."],
    ["internal-mobility", "Internal Mobility", "Match employees to the next role on demonstrated skill", "Run internal candidates through the same assessments and interviews as external ones and compare on equal terms."],
    ["financial-services", "Financial Services", "Document every hiring decision for regulated teams", "Rubric-anchored scoring and stored evidence give compliance teams a clear record of why each candidate advanced."],
    ["hospitality", "Hospitality", "Hire service-ready teams ahead of every peak season", "Situational questions reveal composure, reliability and guest focus at the volume seasonal hiring demands."],
    ["manufacturing", "Manufacturing", "Select for dependability and safety judgment at plant scale", "Scenario assessments rank candidates on the behaviors that reduce early attrition."],
    ["tech-telecom", "Tech and Telecom", "Staff technical and customer-facing teams from one platform", "Combine AI interviews for communication with assessments for problem solving in a single pipeline."],
    ["public-sector", "Public Sector", "Run transparent, auditable selection for public roles", "Every applicant answers the same questions and is scored against the same published rubric."],
    ["retail", "Retail", "Turn application volume into a ranked, store-ready shortlist", "AI interviews score adaptability and customer focus for every applicant, so managers interview only the strongest."],
    ["healthcare", "Healthcare", "Prioritize clinical candidates on judgment and care", "Structured interviews and scenario assessments evaluate decision-making and communication before credential review."],
    ["rpo-staffing", "RPO and Staffing", "Standardize screening across every client requisition", "Generate a role-specific interview per client and deliver ranked shortlists faster, with evidence for each recommendation."],
    ["mid-market", "Mid-market", "Run an enterprise-grade selection process with a lean team", "Automate screening and scoring so a small recruiting function competes for talent at larger-company speed."],
  ].map(([slug, nav, title, lead]) => ({
    slug, group: "use-cases" as const, nav, eyebrow: "Use case", title, lead,
    stats: mechanismStats,
    features: [
      { title: "Cut screening time", body: "The AI interviews and scores every applicant so recruiters review a ranked list instead of raw volume." },
      { title: "Improve decision quality", body: "Rubric-anchored ratings with cited evidence replace inconsistent impressions." },
      { title: "Reduce hiring risk", body: "Every recommendation can be traced to the candidate's own answers." },
      { title: "Scale without headcount", body: "Interview capacity grows with credits, not with recruiter hours." },
    ],
    stepsTitle: "How the workflow runs",
    steps: [{ title: "Generate", body: "The AI writes the interview from the job description." }, { title: "Interview", body: "Candidates respond through one link." }, { title: "Assess", body: "Optional scenario assessment with instant scoring." }, { title: "Decide", body: "Advance the strongest candidates." }],
    pillarsTitle: "What the platform measures",
    pillars: [{ title: "Role competencies", body: "Skills extracted from the job description." }, { title: "Answer quality", body: "Specificity, relevance and judgment shown in responses." }, { title: "Assessment accuracy", body: "Objective results from the answer key." }],
    faqs: commonFaqs(String(nav).toLowerCase() + " hiring"),
  })),
];

export const byGroup = (g: PageDef["group"]) => pages.filter((p) => p.group === g);
export const findPage = (g: PageDef["group"], slug: string) => pages.find((p) => p.group === g && p.slug === slug);

export const homeFaqs: Faq[] = [
  { q: "What is ScreenStage?", a: "ScreenStage is an AI-native hiring platform. The AI generates structured interviews and assessments from your job descriptions, evaluates every candidate response against a rubric and returns a ranked, evidence-backed shortlist." },
  { q: "What does the AI actually do?", a: "It analyzes the job description to define competencies, writes the interview, scores each answer with cited evidence, recommends a next step and drafts scenario assessments. Totals and assessment results are calculated deterministically in code." },
  { q: "How does ScreenStage reduce hiring cost and time?", a: "Recruiters no longer screen applicants manually. The AI handles first-round interviews at any volume, so human time goes only to candidates the evidence supports." },
  { q: "Can AI screening be fair and defensible?", a: "Scoring is limited to job-relevant evidence against a fixed rubric, every rating cites the answer behind it, and your team can overrule any recommendation." },
  { q: "Who stays in control of decisions?", a: "Your team. ScreenStage recommends and explains. People advance, hold or decline." },
  { q: "How is data protected?", a: "Row level security isolates each account's records in the database, and billing state can be changed only by trusted server processes." },
  { q: "How does pricing work?", a: "Plans include a monthly credit allowance. Each AI action uses one credit. New accounts start with free credits." },
];

export type Plan = { id: string; name: string; price: number; blurb: string; url?: string; credits: number; popular?: boolean; features: string[] };
export const plans: Plan[] = [
  { id: "free", name: "Free", price: 0, blurb: "For evaluating the platform on a real role.", credits: 5, features: ["5 AI credits to start", "AI interview generation and scoring", "AI-drafted assessments with instant scoring", "Candidate pipeline and analytics"] },
  { id: "starter", name: "Starter", price: 47, blurb: "For teams automating their first hiring workflows.", url: "https://selar.com/47plan?currency=USD", credits: 50, features: ["50 AI credits each month", "AI interview generation and scoring", "AI-drafted assessments with instant scoring", "Candidate pipeline and analytics"] },
  { id: "growth", name: "Growth", price: 57, blurb: "For teams that hire continuously.", url: "https://selar.com/57plan?currency=USD", credits: 200, popular: true, features: ["200 AI credits each month", "Everything in Starter", "Four times the interview capacity", "Priority access to new releases"] },
  { id: "scale", name: "Scale", price: 97, blurb: "For high-volume hiring across multiple requisitions.", url: "https://selar.com/97plan?currency=USD", credits: 1000, features: ["1,000 AI credits each month", "Everything in Growth", "Capacity for sustained high-volume screening", "Lowest cost per AI action"] },
];
