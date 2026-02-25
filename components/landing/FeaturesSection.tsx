"use client";

import { MessageCircle, Search, FileCheck, FileText } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";

const features = [
  {
    title: "Dynamic interview",
    desc: "8 questions tailored to your idea. MCQ options + custom answers. Each question adapts to your previous responses.",
    icon: MessageCircle,
  },
  {
    title: "Real market research",
    desc: "Live Tavily search across Reddit, Product Hunt, and market reports. No mock data—only real user feedback and trends.",
    icon: Search,
  },
  {
    title: "Validation report",
    desc: "Pain point score, market interest, competitor gaps, differentiators, and suggested stack—all grounded in your research.",
    icon: FileCheck,
  },
  {
    title: "Foundation doc",
    desc: "A structured summary of your product vision, ready to hand to your team or AI coding assistant.",
    icon: FileText,
  },
];

function FeatureCard({
  title,
  desc,
  icon: Icon,
}: {
  title: string;
  desc: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="relative h-full min-h-[14rem]">
      <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
          borderWidth={3}
        />
        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] border-border bg-surface p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
              <Icon className="h-4 w-4" />
            </div>
            <div className="space-y-3">
              <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-primary">
                {title}
              </h3>
              <p className="font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                {desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturesSection() {
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
            <FeatureCard
              key={i}
              title={f.title}
              desc={f.desc}
              icon={f.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
