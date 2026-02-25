export function TestimonialSection() {
  const testimonials = [
    {
      quote: "Finally, a tool that validates before I build. Saved me weeks of wrong assumptions.",
      author: "Founder, B2B SaaS",
    },
    {
      quote: "The market research is real—Reddit threads, Product Hunt, actual data. Not generic AI fluff.",
      author: "Indie hacker",
    },
    {
      quote: "The 8 questions adapt to my idea. Felt like talking to a PM who actually gets it.",
      author: "Product manager",
    },
  ];

  return (
    <section id="testimonials" className="px-6 py-20">
      <div className="mx-auto max-w-4xl">
        <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
          What founders say
        </h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="rounded-xl border border-border bg-surface p-6"
            >
              <p className="text-sm text-primary">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-xs text-muted-foreground">— {t.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
