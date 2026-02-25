import { redirect } from "next/navigation";
import Link from "next/link";
import { getProject } from "@/lib/db-helpers";
import { Header } from "@/components/layout/Header";
import { ValidationReport } from "@/components/research/ValidationReport";
import { RawResearchData } from "@/components/research/RawResearchData";
import type { FoundationDoc } from "@/lib/types";
import type { ValidationReport as ValidationReportType } from "@/lib/ai/synthesis";
import type { TavilyResult } from "@/lib/research/tavily";

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const project = await getProject(id);

  if (!project) redirect("/");

  const foundationDoc = project.interviewData as FoundationDoc | null;
  const report = project.validationReport as ValidationReportType | null;
  const researchData = project.researchData as {
    painPoints?: TavilyResult[];
    competitors?: TavilyResult[];
    marketTrends?: TavilyResult[];
  } | null;

  if (!report) redirect(`/project/${id}/research`);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Header />
      <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-8 px-6 py-16">
        <h1 className="text-xl font-semibold text-primary">
          Validation Report
        </h1>

        {foundationDoc && (
          <div className="flex flex-col gap-4 rounded-xl border border-border p-6">
            <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              Foundation Doc
            </h2>
            <dl className="grid gap-3 text-sm">
              <div>
                <dt className="text-muted-foreground">Idea</dt>
                <dd className="text-primary">{foundationDoc.idea_raw}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Pain point</dt>
                <dd className="text-primary">{foundationDoc.pain_point}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Primary user</dt>
                <dd className="text-primary">{foundationDoc.primary_user}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Core action (Day 1)</dt>
                <dd className="text-primary">{foundationDoc.core_action}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Platform</dt>
                <dd className="text-primary">{foundationDoc.platform}</dd>
              </div>
              {foundationDoc.competitors?.length ? (
                <div>
                  <dt className="text-muted-foreground">Competitors</dt>
                  <dd className="text-primary">
                    {foundationDoc.competitors.join(", ")}
                  </dd>
                </div>
              ) : null}
              <div>
                <dt className="text-muted-foreground">Desired feel</dt>
                <dd className="text-primary">{foundationDoc.desired_feel}</dd>
              </div>
            </dl>
          </div>
        )}

        {researchData && (
          <RawResearchData
            painPoints={researchData.painPoints ?? []}
            competitors={researchData.competitors ?? []}
            marketTrends={researchData.marketTrends ?? []}
          />
        )}

        <ValidationReport report={report} />

        <div className="flex flex-col gap-4 rounded-xl border border-border p-6">
          <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
            Download bundle
          </h2>
          <p className="text-sm text-muted-foreground">
            Get everything: Q&A, design system, tech stack, research data.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={`/api/projects/${id}/bundle?format=json`}
              download
              className="rounded-lg border border-primary bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70"
            >
              DOWNLOAD JSON
            </a>
            <a
              href={`/api/projects/${id}/bundle?format=md`}
              download
              className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-primary hover:bg-hover"
            >
              DOWNLOAD .MD
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          {!project.designSystem && (
            <Link
              href={`/project/${id}/design`}
              className="w-full rounded-lg border border-border bg-surface py-3 text-center text-sm font-medium text-primary hover:bg-hover"
            >
              BUILD DESIGN SYSTEM →
            </Link>
          )}
          <a
            href="/"
            className="w-full rounded-lg border border-border bg-surface py-3 text-center text-sm font-medium text-primary hover:bg-hover"
          >
            START NEW IDEA →
          </a>
        </div>
      </main>
    </div>
  );
}
