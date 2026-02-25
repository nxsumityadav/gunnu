const USE_CASES = [
  {
    title: "The Non-Technical Founder",
    who: "Priya, 28 — has a business idea, zero coding knowledge",
    situation:
      '"I want to build an app where local tutors can list their services and students can book sessions. I have no idea where to start."',
    steps: [
      "Opens Gunnu.ai → types her idea",
      "Answers 8 contextual questions (B2C, marketplace model, mobile + web)",
      "Research phase finds: Superprof and UrbanPro dominate but have poor UX and no real-time chat",
      "Downloads validation report with foundation doc",
      "Opens Cursor → pastes context → says \"Build this\"",
    ],
    gets: [
      "Validation that 10,000+ Reddit users complain about tutor discovery",
      "Full PRD, database schema, API spec",
      "Recommended stack: Next.js + Supabase + Stripe",
      "5-step MVP plan starting from scratch",
    ],
    timeSaved: "3–4 days of manual research and planning → 20 minutes",
  },
  {
    title: "The Indie Hacker",
    who: "Arjun, 24 — developer, wants to launch a SaaS fast",
    situation:
      '"I want to build a tool that lets startup teams track their weekly OKRs without the complexity of Jira or Notion."',
    steps: [
      "Opens Gunnu.ai → enters idea",
      "Answers: B2B, small teams, subscription model, ASAP launch",
      "Research finds: Linear is loved but no OKR tracking. Notion is too complex. Clear gap exists.",
      "Downloads validation report → drops into Windsurf",
    ],
    gets: [
      "Competitor gap analysis with real Product Hunt data",
      "Granular dev plan from setup to deployment",
      "Confidence score: 8.5/10 — strong market signal",
    ],
    timeSaved: "Skip the \"should I build this?\" phase → validated in 15 minutes",
  },
  {
    title: "The Design Agency",
    who: "Meera's agency — builds MVPs for startup clients",
    situation:
      "Client walks in: \"We want a platform for freelance photographers to sell presets and editing tutorials.\"",
    steps: [
      "Run Gunnu.ai during the client discovery call (live)",
      "Client answers questions themselves → instant alignment",
      "Research phase shown to client on screen — real competitor data",
      "Both download the validation report at end of meeting",
    ],
    gets: [
      "PRD the client has already \"approved\" (they answered the questions)",
      "Technical spec reduces back-and-forth with dev team",
      "Validation report to justify build decisions to client",
    ],
    timeSaved: "Discovery → spec usually takes 1 week → done in 1 meeting",
  },
  {
    title: "The Student / First-Time Builder",
    who: "Rahul, 21 — CS student, first real project",
    situation:
      '"I want to build something for my portfolio. Maybe a habit tracker but smarter — it uses AI to suggest habits based on your goals."',
    steps: [
      "Opens Gunnu.ai → describes the idea loosely",
      "Interview helps him clarify his own thinking",
      "Research shows: Habitica and Streaks exist but no AI personalization layer — strong differentiator",
      "Downloads report → opens in Cursor for the first time",
    ],
    gets: [
      "His first ever proper PRD (he didn't know what one was before)",
      "Database schema already written — doesn't have to figure it out",
      "A build plan that teaches him the right order to code things",
      "Portfolio project with real market research backing it",
    ],
    timeSaved: "Months of \"where do I even start?\" → clear path in 20 minutes",
  },
];

export function UseCasesSection() {
  return (
    <section id="use-cases" className="border-t border-border px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
          Use Cases
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          See how founders and builders use Gunnu.ai to validate and ship faster.
        </p>
        <div className="mt-16 flex flex-col gap-16">
          {USE_CASES.map((uc, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-8"
            >
              <h3 className="text-lg font-semibold text-primary">{uc.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{uc.who}</p>
              <blockquote className="mt-4 rounded-r-md border-l-2 border-border pl-4 text-sm italic text-muted-foreground">
                {uc.situation}
              </blockquote>
              <div className="mt-6">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  What they do
                </h4>
                <ol className="mt-2 list-inside list-decimal space-y-1 text-sm text-primary">
                  {uc.steps.map((step, j) => (
                    <li key={j}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="mt-6">
                <h4 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  What they get
                </h4>
                <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-primary">
                  {uc.gets.map((g, j) => (
                    <li key={j}>{g}</li>
                  ))}
                </ul>
              </div>
              <p className="mt-6 text-sm font-medium text-primary">
                Time saved: {uc.timeSaved}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
