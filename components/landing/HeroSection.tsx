"use client";

import Image from "next/image";

export function HeroSection() {
  return (
    <section className="px-6 py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-primary md:text-5xl lg:text-6xl">
            Turn your raw idea into a validated product
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Gunnu.ai guides you from a single sentence to market research, foundation docs, and a clear path to build. No guesswork. Real data.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-[640px]">
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="mb-4 flex items-center gap-2">
              <Image
                src="/logo.svg"
                alt=""
                width={24}
                height={24}
                className="h-6 w-6"
              />
              <span className="text-sm font-medium text-primary">Gunnu.ai</span>
            </div>
            <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              What are you building?
            </label>
            <div className="mt-2 min-h-[100px] w-full resize-none rounded-lg border border-border bg-bg px-4 py-3">
              <span className="text-sm text-muted-foreground">
                Describe your idea in 1–2 sentences...
              </span>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {["Habit tracker", "AI recipe app", "Feedback SaaS"].map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground"
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="mt-4 w-full rounded-lg border border-primary bg-primary py-3 text-center text-sm font-medium text-primary-foreground">
              GET STARTED →
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
