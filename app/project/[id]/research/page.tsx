"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/Header";
import { ValidationReport } from "@/components/research/ValidationReport";
import type { ValidationReport as ValidationReportType } from "@/lib/ai/synthesis";

type StepStatus = "waiting" | "running" | "done" | "error";

interface StepState {
  tavily_1: StepStatus;
  tavily_2: StepStatus;
  tavily_3: StepStatus;
  synthesis: StepStatus;
}

const STEPS: { key: keyof StepState; label: string }[] = [
  { key: "tavily_1", label: "Searching pain points" },
  { key: "tavily_2", label: "Finding competitors" },
  { key: "tavily_3", label: "Market trends" },
  { key: "synthesis", label: "Synthesizing insights" },
];

const INITIAL_STEPS: StepState = {
  tavily_1: "waiting",
  tavily_2: "waiting",
  tavily_3: "waiting",
  synthesis: "waiting",
};

export default function ResearchPage() {
  const params = useParams();
  const id = params.id as string;

  const [steps, setSteps] = useState<StepState>(INITIAL_STEPS);
  const [report, setReport] = useState<ValidationReportType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState(0);

  const runResearch = useCallback(() => {
    setError(null);
    setReport(null);
    setSteps(INITIAL_STEPS);
    setRetryKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const es = new EventSource(`/api/projects/${id}/research`);

    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as {
          step: string;
          status: string;
          data?: ValidationReportType;
          error?: string;
        };

        if (data.step === "complete") {
          es.close();
          return;
        }

        if (data.step === "error") {
          setError(data.error ?? "Research failed");
          es.close();
          return;
        }

        if (data.step in INITIAL_STEPS) {
          setSteps((prev) => ({
            ...prev,
            [data.step]: data.status as StepStatus,
          }));
        }

        if (data.step === "synthesis" && data.status === "done" && data.data) {
          setReport(data.data);
        }
      } catch {
        // ignore parse errors
      }
    };

    es.onerror = () => {
      if (!report) setError("Connection lost");
      es.close();
    };

    return () => es.close();
  }, [id, retryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const statusIcon = (status: StepStatus) => {
    if (status === "done") return "✓";
    if (status === "running") return "⟳";
    if (status === "error") return "✗";
    return "○";
  };

  const isActive = (status: StepStatus) =>
    status === "running" || status === "waiting";

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header />
      <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-8 px-6 py-16">
        <h1 className="text-xl font-semibold text-primary">
          Researching your market...
        </h1>

        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-4 rounded-lg border border-border bg-surface p-4"
          >
            <p className="text-primary">{error}</p>
            <p className="text-xs text-muted-foreground">
              Your interview answers are saved. Click Retry to run research again.
            </p>
            <button
              type="button"
              onClick={runResearch}
              className="w-full rounded-lg border border-primary bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70"
            >
              RETRY RESEARCH
            </button>
          </motion.div>
        )}

        <div className="flex flex-col gap-2">
          {STEPS.map(({ key, label }) => (
            <motion.div
              key={key}
              layout
              className="flex items-center gap-3 text-sm text-muted-foreground"
              initial={false}
              animate={{
                opacity: steps[key] === "error" ? 0.6 : 1,
              }}
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                {statusIcon(steps[key])}
              </span>
              <span className="flex-1">
                {isActive(steps[key]) ? (
                  <span
                    className="inline-block text-transparent"
                    style={{
                      backgroundImage:
                        "linear-gradient(90deg, #888 0%, #888 35%, #fff 50%, #888 65%, #888 100%)",
                      backgroundSize: "200% 100%",
                      backgroundClip: "text",
                      WebkitBackgroundClip: "text",
                      animation: "shimmer-text 1.5s linear infinite",
                    }}
                  >
                    {label}
                  </span>
                ) : (
                  <span>{label}</span>
                )}
              </span>
              <span className="text-xs capitalize">{steps[key]}</span>
            </motion.div>
          ))}
        </div>

        {report && (
          <>
            <div className="border-t border-border" />
            <ValidationReport report={report} />
            <a
              href={`/project/${id}/design`}
              className="w-full rounded-lg border border-border bg-primary py-3 text-center text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70"
            >
              BUILD DESIGN SYSTEM →
            </a>
          </>
        )}
      </main>
    </div>
  );
}
