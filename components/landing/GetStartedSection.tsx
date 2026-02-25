import Link from "next/link";

export function GetStartedSection() {
  return (
    <section id="get-started" className="px-6 py-20">
      <div className="mx-auto max-w-[720px] text-center">
        <h2 className="text-2xl font-semibold text-primary md:text-3xl">
          Start validating your idea
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Describe your product in 1–2 sentences. We&apos;ll guide you through the rest.
        </p>
        <Link
          href="/get-started"
          className="mt-8 inline-block w-full max-w-md rounded-xl border border-primary bg-primary py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70"
        >
          GET STARTED →
        </Link>
      </div>
    </section>
  );
}
