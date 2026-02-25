"use client";

import { useState } from "react";

const EXAMPLE_CHIPS = [
  "Habit tracker",
  "Freelance marketplace",
  "AI recipe app",
  "Feedback SaaS",
];

const MAX_IDEA_LENGTH = 500;

export function GetStartedForm() {
  const [idea, setIdea] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!idea.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawIdea: idea.trim() }),
      });

      if (!res.ok) throw new Error("Failed to create project");

      const { projectId } = await res.json();

      if (typeof window !== "undefined") {
        const settings = JSON.parse(
          localStorage.getItem("gunnu_settings") || "{}"
        );
        settings.current_project_id = projectId;
        localStorage.setItem("gunnu_settings", JSON.stringify(settings));
      }

      window.location.href = `/project/${projectId}/interview`;
    } catch {
      setIsSubmitting(false);
    }
  };

  const handleChipClick = (chip: string) => {
    setIdea((prev) => (prev ? `${prev} ${chip}` : chip));
  };

  return (
    <section id="get-started" className="px-6 py-20">
      <div className="mx-auto max-w-[720px]">
        <h2 className="text-center text-2xl font-semibold text-primary md:text-3xl">
          Start validating your idea
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted-foreground">
          Describe your product in 1–2 sentences. We&apos;ll guide you through the rest.
        </p>
        <form onSubmit={handleSubmit} className="mt-12 flex flex-col gap-6">
          <div>
            <label
              htmlFor="idea"
              className="text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              What are you building?
            </label>
            <textarea
              id="idea"
              value={idea}
              onChange={(e) =>
                setIdea(e.target.value.slice(0, MAX_IDEA_LENGTH))
              }
              placeholder="e.g. An app for book clubs to track shared highlights..."
              className="mt-2 min-h-[120px] w-full resize-none rounded-lg border border-border bg-surface px-4 py-3 text-primary placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-border"
              maxLength={MAX_IDEA_LENGTH}
              disabled={isSubmitting}
            />
            <div className="mt-1 flex justify-end text-xs text-muted-foreground">
              {idea.length} / {MAX_IDEA_LENGTH}
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {EXAMPLE_CHIPS.map((chip) => (
              <button
                key={chip}
                type="button"
                onClick={() => handleChipClick(chip)}
                className="rounded-md border border-border bg-surface px-3 py-1.5 text-sm text-primary hover:bg-hover"
              >
                {chip}
              </button>
            ))}
          </div>
          <button
            type="submit"
            disabled={!idea.trim() || isSubmitting}
            className="w-full rounded-lg border border-border bg-primary py-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70 disabled:border-border disabled:bg-surface disabled:text-muted-foreground disabled:opacity-100"
          >
            {isSubmitting ? "Creating..." : "GET STARTED →"}
          </button>
        </form>
      </div>
    </section>
  );
}
