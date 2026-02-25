export function SolutionSection() {
  return (
    <section id="solution" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
          The solution
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
          Gunnu.ai takes your raw idea, asks the right questions, runs live market research, and delivers a validation report with real evidence—all in one flow.
        </p>
        <div className="mt-16 flex flex-col items-center justify-center gap-6 rounded-2xl border border-border bg-surface p-12">
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary bg-primary text-lg font-bold text-primary-foreground">
              1
            </span>
            <span className="text-primary">Enter your idea</span>
          </div>
          <span className="text-muted-foreground">↓</span>
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary bg-primary text-lg font-bold text-primary-foreground">
              2
            </span>
            <span className="text-primary">Answer 8 contextual questions</span>
          </div>
          <span className="text-muted-foreground">↓</span>
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary bg-primary text-lg font-bold text-primary-foreground">
              3
            </span>
            <span className="text-primary">Live market research (Reddit, Product Hunt, trends)</span>
          </div>
          <span className="text-muted-foreground">↓</span>
          <div className="flex items-center gap-4">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary bg-primary text-lg font-bold text-primary-foreground">
              4
            </span>
            <span className="text-primary">Validation report + foundation doc</span>
          </div>
        </div>
      </div>
    </section>
  );
}
