"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { Button } from "@/components/ui/button";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export function HeroSection() {
  return (
    <div className="overflow-hidden">
      <section>
        <div className="relative pt-24">
          <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--bg)_75%)]" />
          <div className="mx-auto max-w-5xl px-6">
            <div className="sm:mx-auto lg:mr-auto">
              <AnimatedGroup
                variants={{
                  container: {
                    visible: {
                      transition: {
                        staggerChildren: 0.05,
                        delayChildren: 0.75,
                      },
                    },
                  },
                  ...transitionVariants,
                }}
              >
                <h1 className="mt-8 max-w-2xl text-balance text-5xl font-medium text-primary md:text-6xl lg:mt-16">
                  Turn your raw idea into a validated product
                </h1>
                <p className="mt-8 max-w-2xl text-pretty text-lg text-muted-foreground">
                  Gunnu.ai guides you from a single sentence to market research,
                  foundation docs, and a clear path to build. No guesswork. Real
                  data.
                </p>
                <div className="mt-12 flex items-center gap-2">
                  <div className="rounded-[14px] border border-border bg-foreground/10 p-0.5">
                    <Button asChild size="lg" className="rounded-xl px-5 text-base">
                      <Link href="/get-started">
                        <span className="text-nowrap">Get Started</span>
                      </Link>
                    </Button>
                  </div>
                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="h-[42px] rounded-xl px-5 text-base"
                  >
                    <Link href="#features">
                      <span className="text-nowrap">See how it works</span>
                    </Link>
                  </Button>
                </div>
              </AnimatedGroup>
            </div>
          </div>
          <AnimatedGroup
            variants={{
              container: {
                visible: {
                  transition: {
                    staggerChildren: 0.05,
                    delayChildren: 0.75,
                  },
                },
              },
              ...transitionVariants,
            }}
          >
            <div className="relative -mr-56 mt-8 overflow-hidden px-2 sm:mr-0 sm:mt-12 md:mt-20">
              <div
                aria-hidden
                className="absolute inset-0 z-10 bg-gradient-to-b from-transparent from-35% to-bg"
              />
              <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border border-border bg-surface p-4 shadow-lg ring-1 ring-border/25">
                <div className="rounded-2xl border border-border bg-bg p-6">
                  <div className="mb-4 flex items-center gap-2">
                    <Image
                      src="/logo.svg"
                      alt=""
                      width={24}
                      height={24}
                      className="h-6 w-6"
                    />
                    <span className="text-sm font-medium text-primary">
                      Gunnu.ai
                    </span>
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
                    {["Habit tracker", "AI recipe app", "Feedback SaaS"].map(
                      (c) => (
                        <span
                          key={c}
                          className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground"
                        >
                          {c}
                        </span>
                      )
                    )}
                  </div>
                  <Link
                    href="/get-started"
                    className="mt-4 flex w-full items-center justify-center rounded-lg border border-primary bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70"
                  >
                    GET STARTED →
                  </Link>
                </div>
              </div>
            </div>
          </AnimatedGroup>
        </div>
      </section>
    </div>
  );
}
