"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Header } from "@/components/layout/Header";
import type { FoundationDoc } from "@/lib/types";
import type { DynamicQuestion } from "@/lib/ai/questions";

const QUESTION_IDS: (keyof Omit<FoundationDoc, "idea_raw">)[] = [
  "pain_point",
  "primary_user",
  "core_action",
  "platform",
  "features_needed",
  "competitors",
  "desired_feel",
  "visual_inspiration",
];

const MAX_STEP = QUESTION_IDS.length - 1;

export default function InterviewPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [step, setStep] = useState(0);
  const [question, setQuestion] = useState<DynamicQuestion | null>(null);
  const [loadingQuestion, setLoadingQuestion] = useState(true);
  const [selectedOptions, setSelectedOptions] = useState<Set<number>>(new Set());
  const [otherValue, setOtherValue] = useState("");
  const [answers, setAnswers] = useState<Partial<FoundationDoc>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const prefetchedRef = useRef<{ step: number; q: DynamicQuestion } | null>(null);
  const questionsCacheRef = useRef<Map<number, DynamicQuestion>>(new Map());

  const fetchQuestion = useCallback(
    async (s: number, prev: Partial<FoundationDoc>) => {
      setLoadingQuestion(true);
      try {
        const res = await fetch(`/api/projects/${id}/interview/questions`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ step: s, previousAnswers: prev }),
        });
        if (!res.ok) throw new Error("Failed to load question");
        const q = (await res.json()) as DynamicQuestion;
        questionsCacheRef.current.set(s, q);
        setQuestion(q);
        setSelectedOptions(new Set());
        setOtherValue("");
      } catch {
        setQuestion(null);
      } finally {
        setLoadingQuestion(false);
      }
    },
    [id]
  );

  useEffect(() => {
    prefetchedRef.current = null;
    const cached = questionsCacheRef.current.get(step);
    if (cached) {
      setQuestion(cached);
      setLoadingQuestion(false);
      const fieldId = QUESTION_IDS[step];
      const val = answers[fieldId];
      if (val !== undefined && val !== null) {
        const str = Array.isArray(val) ? val.join(", ") : String(val).trim();
        if (str) {
          const parts = str.split(",").map((p) => p.trim()).filter(Boolean);
          const selected = new Set<number>();
          const otherParts: string[] = [];
          for (const p of parts) {
            const idx = cached.options.findIndex(
              (o) => o.replace(/^[A-C][\.\)]\s*/i, "").trim() === p.replace(/^[A-C][\.\)]\s*/i, "").trim() || o.trim() === p
            );
            if (idx >= 0) selected.add(idx);
            else otherParts.push(p);
          }
          setSelectedOptions(selected);
          setOtherValue(otherParts.join(", "));
          return;
        }
      }
      setSelectedOptions(new Set());
      setOtherValue("");
    } else {
      setSelectedOptions(new Set());
      setOtherValue("");
      fetchQuestion(step, answers);
    }
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const prefetchNext = useCallback(
    (nextStep: number, nextAnswers: Partial<FoundationDoc>) => {
      if (nextStep > MAX_STEP) return;
      fetch(`/api/projects/${id}/interview/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: nextStep, previousAnswers: nextAnswers }),
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((q) => {
          if (q) prefetchedRef.current = { step: nextStep, q };
        })
        .catch(() => {});
    },
    [id]
  );

  // Prefetch next question when user has answered (before Next click)
  useEffect(() => {
    if (!question || step >= MAX_STEP || loadingQuestion) return;
    const ans =
      selectedOptions.size > 0
        ? [...selectedOptions].map((i) => question.options[i]).join(", ")
        : otherValue.trim();
    if (!ans || ans.length < 2) return;
    const fieldId = question.id;
    const next: Partial<FoundationDoc> = { ...answers };
    if (fieldId === "competitors" || fieldId === "visual_inspiration") {
      (next as Record<string, unknown>)[fieldId] = ans
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else {
      (next as Record<string, unknown>)[fieldId] = ans;
    }
    const t = setTimeout(() => prefetchNext(step + 1, next), selectedOptions.size > 0 ? 0 : 400);
    return () => clearTimeout(t);
  }, [step, question, selectedOptions, otherValue, answers, loadingQuestion, prefetchNext]);

  const currentAnswer = (): string => {
    if (selectedOptions.size > 0 && question) {
      return [...selectedOptions].map((i) => question.options[i]).join(", ");
    }
    return otherValue.trim();
  };

  const toggleOption = (i: number) => {
    setSelectedOptions((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
    setOtherValue("");
  };

  const handleNext = async () => {
    const answer = currentAnswer();
    if (!answer) return;

    const fieldId = question?.id ?? QUESTION_IDS[step];
    const nextAnswers = { ...answers };
    if (fieldId === "competitors" || fieldId === "visual_inspiration") {
      nextAnswers[fieldId] = answer
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean) as unknown as string[];
    } else {
      nextAnswers[fieldId] = answer as never;
    }
    setAnswers(nextAnswers);

    if (step < MAX_STEP) {
      const nextStep = step + 1;
      const cached = prefetchedRef.current;
      if (cached?.step === nextStep && cached.q) {
        prefetchedRef.current = null;
        questionsCacheRef.current.set(nextStep, cached.q);
        setStep(nextStep);
        setQuestion(cached.q);
        setSelectedOptions(new Set());
        setOtherValue("");
        setLoadingQuestion(false);
        prefetchNext(nextStep + 1, nextAnswers);
      } else {
        setStep(nextStep);
        await fetchQuestion(nextStep, nextAnswers);
      }
      return;
    }

    setIsSubmitting(true);
    try {
      const foundationDoc = {
        pain_point: String(nextAnswers.pain_point ?? "").trim(),
        primary_user: String(nextAnswers.primary_user ?? "").trim(),
        core_action: String(nextAnswers.core_action ?? "").trim(),
        platform: String(nextAnswers.platform ?? "").trim(),
        features_needed: String(nextAnswers.features_needed ?? "").trim(),
        competitors: Array.isArray(nextAnswers.competitors)
          ? nextAnswers.competitors
          : String(nextAnswers.competitors ?? "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
        desired_feel: String(nextAnswers.desired_feel ?? "").trim(),
        visual_inspiration: Array.isArray(nextAnswers.visual_inspiration)
          ? nextAnswers.visual_inspiration
          : String(nextAnswers.visual_inspiration ?? "")
              .split(",")
              .map((s) => s.trim())
              .filter(Boolean),
      } as Omit<FoundationDoc, "idea_raw">;

      const res = await fetch(`/api/projects/${id}/interview`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ foundationDoc }),
      });

      if (!res.ok) throw new Error("Failed to save");

      router.push(`/project/${id}/research`);
    } catch {
      setIsSubmitting(false);
    }
  };

  const canProceed =
    selectedOptions.size > 0 || (otherValue.trim().length >= 2);

  const stripOptionPrefix = (s: string) =>
    s.replace(/^[A-C][\.\)]\s*/i, "").trim();

  const restoreAnswerForStep = useCallback((s: number, q: DynamicQuestion) => {
    const fieldId = QUESTION_IDS[s];
    const val = answers[fieldId];
    if (val === undefined || val === null) return;
    const str = Array.isArray(val) ? val.join(", ") : String(val).trim();
    if (!str) return;
    const parts = str.split(",").map((p) => p.trim()).filter(Boolean);
    const selected = new Set<number>();
    const otherParts: string[] = [];
    for (const p of parts) {
      const idx = q.options.findIndex(
        (o) => stripOptionPrefix(o) === stripOptionPrefix(p) || o.trim() === p
      );
      if (idx >= 0) selected.add(idx);
      else otherParts.push(p);
    }
    setSelectedOptions(selected);
    setOtherValue(otherParts.join(", "));
  }, [answers]);

  const handleBack = () => {
    if (step <= 0) return;
    const prevStep = step - 1;
    const cached = questionsCacheRef.current.get(prevStep);
    if (cached) {
      setStep(prevStep);
      setQuestion(cached);
      setLoadingQuestion(false);
      restoreAnswerForStep(prevStep, cached);
    } else {
      setLoadingQuestion(true);
      const prevAnswers: Partial<FoundationDoc> = {};
      for (let i = 0; i < prevStep; i++) {
        const f = QUESTION_IDS[i];
        prevAnswers[f] = answers[f] as never;
      }
      fetch(`/api/projects/${id}/interview/questions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ step: prevStep, previousAnswers: prevAnswers }),
      })
        .then((r) => (r.ok ? r.json() : null))
        .then((q) => {
          if (q) {
            questionsCacheRef.current.set(prevStep, q);
            setStep(prevStep);
          }
        })
        .catch(() => {})
        .finally(() => setLoadingQuestion(false));
    }
  };

  if (loadingQuestion && !question) {
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <Header />
        <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-8 px-6 py-16">
          <p className="text-muted-foreground">Loading question...</p>
        </main>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <Header />
        <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-8 px-6 py-16">
          <p className="text-muted-foreground">Failed to load question. Refresh to try again.</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header />
      <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-8 px-6 py-16">
        <div className="flex items-center gap-4">
          <div className="flex gap-1">
            {QUESTION_IDS.map((_, i) => (
              <span
                key={i}
                className={`h-2 w-2 ${
                  i < step ? "bg-primary" : i === step ? "bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">
            Question {step + 1} of {QUESTION_IDS.length}
          </span>
        </div>

        <div className="flex flex-col gap-4">
          <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Foundation
          </label>
          <h2 className="text-xl font-semibold text-primary">{question.label}</h2>

          <div className="flex flex-col gap-2">
            <p className="mb-1 text-xs text-muted-foreground">
              Select one or more
            </p>
            {question.options.map((opt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => toggleOption(i)}
                className={`w-full rounded-lg border px-4 py-3 text-left text-sm flex items-center gap-2 ${
                  selectedOptions.has(i)
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-surface text-primary hover:bg-hover"
                }`}
              >
                <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded border border-current text-[10px]">
                  {selectedOptions.has(i) ? "✓" : ""}
                </span>
                <span>
                  {String.fromCharCode(65 + i)}. {String(opt).replace(/^[A-C][\.\)]\s*/i, "").trim() || opt}
                </span>
              </button>
            ))}

            <div className="border-t border-border py-2" />
            <p className="text-xs text-muted-foreground">— OR type your own —</p>
            <input
              type="text"
              value={otherValue}
              onChange={(e) => {
                setOtherValue(e.target.value);
                if (e.target.value.trim()) setSelectedOptions(new Set());
              }}
              placeholder={question.otherPlaceholder}
              className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex gap-3">
            {step > 0 && (
              <button
                type="button"
                onClick={handleBack}
                disabled={loadingQuestion || isSubmitting}
                className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-primary hover:bg-hover disabled:opacity-50"
              >
                ← BACK
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              disabled={!canProceed || isSubmitting}
              className="flex-1 rounded-lg border border-border bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70 disabled:border-border disabled:bg-surface disabled:text-muted-foreground disabled:opacity-100"
            >
              {step < MAX_STEP
                ? "NEXT QUESTION →"
                : isSubmitting
                  ? "Saving..."
                  : "RUN RESEARCH →"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
