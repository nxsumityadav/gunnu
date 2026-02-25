import type { ValidationReport as ValidationReportType } from "@/lib/ai/synthesis";

interface ValidationReportProps {
  report: ValidationReportType;
}

export function ValidationReport({ report }: ValidationReportProps) {
  return (
    <div className="flex flex-col gap-6 rounded-xl border border-border p-6">
      <h2 className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
        Validation Report
      </h2>

      <div className="flex gap-8">
        <div>
          <span className="text-xs text-muted-foreground">
            Pain Point Score
          </span>
          <p className="text-xl font-semibold">
            {report.painPointScore} / 10
          </p>
        </div>
        <div>
          <span className="text-xs text-muted-foreground">
            Market Interest
          </span>
          <p className="text-xl font-semibold">{report.marketInterest}</p>
        </div>
      </div>

      {report.keyEvidence.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-primary">
            Key Evidence
          </h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {report.keyEvidence.map((e, i) => (
              <li key={i}>
                {e.finding} —{" "}
                <a
                  href={e.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline"
                >
                  source
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {report.competitorGaps.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-primary">
            Competitor Gaps
          </h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {report.competitorGaps.map((gap, i) => (
              <li key={i}>{gap}</li>
            ))}
          </ul>
        </div>
      )}

      {report.differentiators.length > 0 && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-primary">
            Differentiators
          </h3>
          <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
            {report.differentiators.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      )}

      {report.suggestedStack && (
        <div>
          <h3 className="mb-2 text-sm font-medium text-primary">
            Suggested Stack
          </h3>
          <p className="text-sm text-muted-foreground">
            Frontend: {report.suggestedStack.frontend} · Backend:{" "}
            {report.suggestedStack.backend} · Database:{" "}
            {report.suggestedStack.database}
          </p>
        </div>
      )}
    </div>
  );
}
