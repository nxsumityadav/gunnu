export function FeaturesSection() {
  const features = [
    {
      title: "Dynamic interview",
      desc: "8 questions tailored to your idea. MCQ options + custom answers. Each question adapts to your previous responses.",
    },
    {
      title: "Real market research",
      desc: "Live Tavily search across Reddit, Product Hunt, and market reports. No mock data—only real user feedback and trends.",
    },
    {
      title: "Validation report",
      desc: "Pain point score, market interest, competitor gaps, differentiators, and suggested stack—all grounded in your research.",
    },
    {
      title: "Foundation doc",
      desc: "A structured summary of your product vision, ready to hand to your team or AI coding assistant.",
    },
  ];

  return (
    <section id="features" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
          What you get with Gunnu.ai
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Everything you need to validate and document your product idea.
        </p>
        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {features.map((f, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <h3 className="text-lg font-medium text-primary">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
