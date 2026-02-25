"use client";

import { Lightbulb, Search, Rocket } from "lucide-react";

const problems = [
  {
    icon: Lightbulb,
    title: "Ideas die in isolation",
    desc: "You have a concept but no structured way to validate it before building.",
  },
  {
    icon: Search,
    title: "Generic research tools",
    desc: "Search engines give you links, not insights. You spend hours reading with no clear direction.",
  },
  {
    icon: Rocket,
    title: "Building before validating",
    desc: "Months of work on assumptions that could have been tested in days.",
  },
];

export function ProblemSection() {
  return (
    <section id="problem" className="px-6 py-20">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
          The problem
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Founders waste time building products that haven&apos;t been validated against real market data.
        </p>
        <div className="mt-16 grid grid-cols-1 overflow-hidden rounded-xl border border-border md:grid-cols-3">
          {problems.map((p, i) => (
            <div
              key={i}
              className="group relative border-b border-border bg-surface p-8 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="absolute left-0 top-0 h-full w-[2px] bg-primary opacity-0 transition-opacity group-hover:opacity-100" />
              <p.icon className="mb-6 h-8 w-8 text-primary" strokeWidth={1.5} />
              <h3 className="text-lg font-semibold text-primary">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
