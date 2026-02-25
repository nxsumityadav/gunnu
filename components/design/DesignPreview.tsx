"use client";

import type { DesignSystem } from "@/lib/types/design-system";

interface DesignPreviewProps {
  design: DesignSystem;
}

export function DesignPreview({ design }: DesignPreviewProps) {
  const r = (key: keyof DesignSystem["radius"]) => design.radius[key];
  const c = design.colors;
  const t = design.typography;

  const baseStyle: React.CSSProperties = {
    fontFamily: t.fontFamily,
    fontSize: t.fontSize,
    lineHeight: t.lineHeight,
  };

  return (
    <div
      className="flex flex-col gap-4 overflow-auto"
      style={{ ...baseStyle, color: c.primary }}
    >
      <h3 className="text-xs font-medium uppercase tracking-wider" style={{ color: c.muted }}>
        Component preview
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {/* Metric cards */}
        <div
          className="p-4 border"
          style={{
            backgroundColor: c.surface,
            borderColor: c.border,
            borderRadius: r.lg,
          }}
        >
          <p className="text-xs" style={{ color: c.muted }}>Total Revenue</p>
          <p className="text-lg font-semibold" style={{ color: c.primary }}>$15,231</p>
          <p className="text-xs" style={{ color: c.muted }}>+20% from last month</p>
          <div className="mt-2 h-8 w-full rounded" style={{ backgroundColor: c.border, borderRadius: r.sm }} />
        </div>
        <div
          className="p-4 border"
          style={{
            backgroundColor: c.surface,
            borderColor: c.border,
            borderRadius: r.lg,
          }}
        >
          <p className="text-xs" style={{ color: c.muted }}>Subscriptions</p>
          <p className="text-lg font-semibold" style={{ color: c.primary }}>+2,350</p>
          <p className="text-xs" style={{ color: c.muted }}>+180% from last month</p>
          <div className="mt-2 h-8 w-full rounded" style={{ backgroundColor: c.border, borderRadius: r.sm }} />
        </div>
      </div>

      {/* Divider */}
      <div className="h-px w-full" style={{ backgroundColor: c.border }} />

      {/* Buttons */}
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium border"
          style={{
            backgroundColor: c.primary,
            color: c.bg,
            borderColor: c.primary,
            borderRadius: r.md,
          }}
        >
          Primary
        </button>
        <button
          type="button"
          className="px-4 py-2 text-sm font-medium border"
          style={{
            backgroundColor: c.surface,
            color: c.primary,
            borderColor: c.border,
            borderRadius: r.md,
          }}
        >
          Secondary
        </button>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Email"
          readOnly
          className="w-full px-3 py-2 text-sm border"
          style={{
            backgroundColor: c.bg,
            borderColor: c.border,
            color: c.primary,
            borderRadius: r.md,
          }}
        />
        <input
          type="password"
          placeholder="Password"
          readOnly
          className="w-full px-3 py-2 text-sm border"
          style={{
            backgroundColor: c.bg,
            borderColor: c.border,
            color: c.primary,
            borderRadius: r.md,
          }}
        />
      </div>

      {/* Radio & Checkbox */}
      <div className="flex flex-col gap-3">
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <span
              className="h-4 w-4 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: c.primary }}
            >
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.primary }} />
            </span>
            <span style={{ color: c.primary }}>Option A</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="h-4 w-4 rounded border" style={{ borderColor: c.border }} />
            <span style={{ color: c.muted }}>Option B</span>
          </label>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <span
            className="h-4 w-4 rounded border flex items-center justify-center"
            style={{ borderColor: c.primary, backgroundColor: c.primary }}
          >
            <span className="text-[10px]" style={{ color: c.bg }}>✓</span>
          </span>
          <span style={{ color: c.primary }}>I agree</span>
        </label>
      </div>

      {/* Card with form */}
      <div
        className="p-4 border"
        style={{
          backgroundColor: c.surface,
          borderColor: c.border,
          borderRadius: r.xl,
        }}
      >
        <p className="text-sm font-medium mb-2" style={{ color: c.primary }}>Create account</p>
        <p className="text-xs mb-3" style={{ color: c.muted }}>Enter your email below</p>
        <input
          type="text"
          placeholder="m@example.com"
          readOnly
          className="w-full px-3 py-2 text-sm border mb-2"
          style={{
            backgroundColor: c.bg,
            borderColor: c.border,
            color: c.primary,
            borderRadius: r.md,
          }}
        />
        <button
          type="button"
          className="w-full py-2 text-sm font-medium"
          style={{
            backgroundColor: c.primary,
            color: c.bg,
            borderRadius: r.md,
          }}
        >
          Create Account
        </button>
      </div>

      {/* Table */}
      <div
        className="overflow-hidden border"
        style={{
          backgroundColor: c.surface,
          borderColor: c.border,
          borderRadius: r.lg,
        }}
      >
        <div className="flex justify-between items-center p-3 border-b" style={{ borderColor: c.border }}>
          <span className="text-sm font-medium" style={{ color: c.primary }}>Payments</span>
          <button
            type="button"
            className="text-xs px-2 py-1 border"
            style={{
              backgroundColor: c.primary,
              color: c.bg,
              borderColor: c.primary,
              borderRadius: r.sm,
            }}
          >
            Add
          </button>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr style={{ borderColor: c.border }}>
              <th className="p-2 text-left" style={{ color: c.muted }}>Email</th>
              <th className="p-2 text-left" style={{ color: c.muted }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {["user@a.com", "user@b.com"].map((email, i) => (
              <tr key={i} className="border-t" style={{ borderColor: c.border }}>
                <td className="p-2" style={{ color: c.primary }}>{email}</td>
                <td className="p-2" style={{ color: c.primary }}>${(i + 1) * 99}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-between p-3 border" style={{ backgroundColor: c.surface, borderColor: c.border, borderRadius: r.lg }}>
        <div>
          <p className="text-sm font-medium" style={{ color: c.primary }}>Notifications</p>
          <p className="text-xs" style={{ color: c.muted }}>Receive email updates</p>
        </div>
        <div
          className="h-6 w-10 rounded-full flex items-center justify-end pr-1"
          style={{ backgroundColor: c.primary }}
        >
          <div className="h-4 w-4 rounded-full" style={{ backgroundColor: c.bg }} />
        </div>
      </div>

      {/* Select / Dropdown */}
      <div className="relative">
        <select
          className="w-full px-3 py-2 text-sm border"
          style={{
            backgroundColor: c.bg,
            borderColor: c.border,
            color: c.primary,
            borderRadius: r.md,
          }}
        >
          <option>Select option</option>
          <option>Option 1</option>
          <option>Option 2</option>
        </select>
      </div>

      {/* Textarea */}
      <div>
        <label className="block text-xs mb-1" style={{ color: c.muted }}>Notes</label>
        <textarea
          placeholder="Enter notes..."
          readOnly
          rows={2}
          className="w-full px-3 py-2 text-sm border resize-none"
          style={{
            backgroundColor: c.bg,
            borderColor: c.border,
            color: c.primary,
            borderRadius: r.md,
          }}
        />
      </div>

      {/* Badge / Tag */}
      <div className="flex flex-wrap gap-2">
        <span
          className="px-2 py-0.5 text-xs"
          style={{
            backgroundColor: c.primary,
            color: c.bg,
            borderRadius: r.sm,
          }}
        >
          Success
        </span>
        <span
          className="px-2 py-0.5 text-xs border"
          style={{
            backgroundColor: c.surface,
            borderColor: c.border,
            color: c.primary,
            borderRadius: r.sm,
          }}
        >
          Pending
        </span>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span style={{ color: c.muted }}>Progress</span>
          <span style={{ color: c.primary }}>60%</span>
        </div>
        <div
          className="h-2 w-full rounded-full overflow-hidden"
          style={{ backgroundColor: c.border, borderRadius: r.sm }}
        >
          <div
            className="h-full rounded-full"
            style={{ width: "60%", backgroundColor: c.primary }}
          />
        </div>
      </div>
    </div>
  );
}
