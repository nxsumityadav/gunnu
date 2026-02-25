export function CTASection() {
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-2xl font-semibold text-primary md:text-3xl">
          Ready to validate your idea?
        </h2>
        <p className="mt-4 text-muted-foreground">
          No signup required. Enter your idea and get started in seconds.
        </p>
        <a
          href="/get-started"
          className="mt-8 inline-block rounded-xl border border-primary bg-primary px-8 py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70"
        >
          START NOW →
        </a>
      </div>
    </section>
  );
}
