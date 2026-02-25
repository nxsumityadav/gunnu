"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  COLOR_PRESETS,
  DEFAULT_DESIGN,
  type DesignSystem,
} from "@/lib/types/design-system";
import { DesignPreview } from "@/components/design/DesignPreview";

const RADIUS_OPTIONS = [8, 12, 14, 16, 20];
const FONT_OPTIONS = ["Inter", "Geist", "System UI", "Georgia", "Monospace"];
const SPACING_OPTIONS = [2, 4, 6, 8, 12];

export default function DesignPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [design, setDesign] = useState<DesignSystem>(DEFAULT_DESIGN);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`/api/projects/${id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((p) => {
        if (!p) return;
        if (!p.validationReport) {
          router.replace(`/project/${id}/research`);
          return;
        }
        if (p.designSystem) {
          setDesign({ ...DEFAULT_DESIGN, ...p.designSystem });
          setSaved(true);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id, router]);

  const updateDesign = useCallback((updates: Partial<DesignSystem>) => {
    setDesign((d) => ({ ...d, ...updates }));
  }, []);

  const setPreset = useCallback((preset: string) => {
    const c = COLOR_PRESETS[preset];
    if (c) {
      setDesign((d) => ({
        ...d,
        colors: { ...c, preset },
      }));
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await fetch(`/api/projects/${id}/design`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(design),
      });
      if (res.ok) setSaved(true);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col bg-bg">
        <main className="mx-auto flex w-full max-w-[720px] flex-1 flex-col gap-8 px-6 py-16">
          <p className="text-muted-foreground">Loading...</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <main className="mx-auto flex w-full max-w-[900px] flex-1 flex-col gap-8 px-6 py-16">
        <h1 className="text-xl font-semibold text-primary">
          Design System Builder
        </h1>
        <p className="text-sm text-muted-foreground">
          Customize your design tokens. Changes preview in real time.
        </p>

        <div className="grid gap-8 lg:grid-cols-[340px_1fr]">
          {/** Controls */}
          <div className="flex flex-col gap-6 rounded-xl border border-border bg-surface p-6 lg:max-h-[calc(100vh-12rem)] lg:overflow-y-auto">
            <section>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Color preset
              </h3>
              <div className="flex flex-wrap gap-2">
                {Object.keys(COLOR_PRESETS).map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPreset(preset)}
                    className={`rounded-lg border px-3 py-1.5 text-xs capitalize ${design.colors.preset === preset ? "border-primary bg-primary text-primary-foreground" : "border-border bg-bg text-primary hover:bg-hover"}`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Custom primary color
              </h3>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={design.colors.primary}
                  onChange={(e) =>
                    updateDesign({
                      colors: { ...design.colors, primary: e.target.value },
                    })
                  }
                  className="h-10 w-14 cursor-pointer rounded-lg border border-border bg-transparent"
                />
                <input
                  type="text"
                  value={design.colors.primary}
                  onChange={(e) =>
                    updateDesign({
                      colors: { ...design.colors, primary: e.target.value },
                    })
                  }
                  className="flex-1 rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary"
                />
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Radius (px)
              </h3>
              <div className="flex flex-wrap gap-2">
                {RADIUS_OPTIONS.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() =>
                      updateDesign({
                        radius: {
                          base: r,
                          sm: r,
                          md: Math.min(r + 4, 20),
                          lg: Math.min(r + 6, 20),
                          xl: 20,
                        },
                      })
                    }
                    className={`rounded-lg border px-3 py-1.5 text-xs ${design.radius.base === r ? "border-primary bg-primary text-primary-foreground" : "border-border bg-bg text-primary hover:bg-hover"}`}
                  >
                    {r}px
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Typography
              </h3>
              <select
                value={design.typography.fontFamily}
                onChange={(e) =>
                  updateDesign({
                    typography: {
                      ...design.typography,
                      fontFamily: e.target.value,
                    },
                  })
                }
                className="w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary"
              >
                {FONT_OPTIONS.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
              <div className="mt-2 flex gap-2">
                <label className="flex flex-1 flex-col gap-1 text-xs text-muted-foreground">
                  Size
                  <input
                    type="number"
                    min={10}
                    max={24}
                    value={design.typography.fontSize}
                    onChange={(e) =>
                      updateDesign({
                        typography: {
                          ...design.typography,
                          fontSize: Number(e.target.value) || 14,
                        },
                      })
                    }
                    className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary"
                  />
                </label>
                <label className="flex flex-1 flex-col gap-1 text-xs text-muted-foreground">
                  Line height
                  <input
                    type="number"
                    min={1}
                    max={2}
                    step={0.1}
                    value={design.typography.lineHeight}
                    onChange={(e) =>
                      updateDesign({
                        typography: {
                          ...design.typography,
                          lineHeight: Number(e.target.value) || 1.5,
                        },
                      })
                    }
                    className="rounded-lg border border-border bg-bg px-3 py-2 text-sm text-primary"
                  />
                </label>
              </div>
            </section>

            <section>
              <h3 className="mb-3 text-sm font-medium uppercase tracking-wider text-muted-foreground">
                Spacing (base)
              </h3>
              <div className="flex flex-wrap gap-2">
                {SPACING_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      updateDesign({
                        spacing: {
                          base: s,
                          sm: Math.max(1, s - 2),
                          md: s,
                          lg: s * 2,
                        },
                      })
                    }
                    className={`rounded-lg border px-3 py-1.5 text-xs ${design.spacing.base === s ? "border-primary bg-primary text-primary-foreground" : "border-border bg-bg text-primary hover:bg-hover"}`}
                  >
                    {s}px
                  </button>
                ))}
              </div>
            </section>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="flex-1 rounded-lg border border-primary bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70 disabled:opacity-50"
              >
                {saving ? "Saving..." : saved ? "Saved" : "SAVE DESIGN"}
              </button>
              <a
                href={`/project/${id}/report`}
                className="rounded-lg border border-border bg-surface px-6 py-3 text-sm font-medium text-primary hover:bg-hover"
              >
                SKIP →
              </a>
            </div>
          </div>

          {/** Live preview — all components */}
          <motion.div
            layout
            className="flex flex-col gap-4 rounded-xl border border-border p-6 min-h-[500px]"
            style={{
              backgroundColor: design.colors.surface,
              borderColor: design.colors.border,
            }}
          >
            <div
              className="rounded-lg p-4 max-h-[calc(100vh-14rem)] overflow-y-auto"
              style={{
                backgroundColor: design.colors.bg,
                borderRadius: design.radius.lg,
              }}
            >
              <DesignPreview design={design} />
            </div>
          </motion.div>
        </div>

        <button
          type="button"
          onClick={async () => {
            await fetch(`/api/projects/${id}/design`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(design),
            });
            router.push(`/project/${id}/report`);
          }}
          className="w-full rounded-lg border border-primary bg-primary py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-70"
        >
          SAVE & DOWNLOAD BUNDLE →
        </button>
      </main>
    </div>
  );
}
