export interface DesignSystem {
  colors: {
    preset: string;
    bg: string;
    surface: string;
    border: string;
    primary: string;
    muted: string;
    accent?: string;
  };
  radius: {
    base: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  typography: {
    fontFamily: string;
    fontSize: number;
    lineHeight: number;
  };
  spacing: {
    base: number;
    sm: number;
    md: number;
    lg: number;
  };
}

export const COLOR_PRESETS: Record<string, { bg: string; surface: string; border: string; primary: string; muted: string }> = {
  default: { bg: "#000000", surface: "#111111", border: "#2a2a2a", primary: "#ffffff", muted: "#888888" },
  blue: { bg: "#0a0f1a", surface: "#0f1729", border: "#1e3a5f", primary: "#3b82f6", muted: "#64748b" },
  green: { bg: "#0a1a0f", surface: "#0f2917", border: "#1e5f3a", primary: "#22c55e", muted: "#64748b" },
  orange: { bg: "#1a140a", surface: "#291a0f", border: "#5f3a1e", primary: "#f97316", muted: "#64748b" },
  red: { bg: "#1a0a0a", surface: "#290f0f", border: "#5f1e1e", primary: "#ef4444", muted: "#64748b" },
  rose: { bg: "#1a0a12", surface: "#290f1a", border: "#5f1e3a", primary: "#f43f5e", muted: "#64748b" },
  violet: { bg: "#120a1a", surface: "#1a0f29", border: "#3a1e5f", primary: "#8b5cf6", muted: "#64748b" },
  yellow: { bg: "#1a180a", surface: "#29220f", border: "#5f4a1e", primary: "#eab308", muted: "#64748b" },
};

export const DEFAULT_DESIGN: DesignSystem = {
  colors: { ...COLOR_PRESETS.default, preset: "default" },
  radius: { base: 8, sm: 8, md: 12, lg: 14, xl: 16 },
  typography: { fontFamily: "Inter", fontSize: 14, lineHeight: 1.5 },
  spacing: { base: 4, sm: 2, md: 4, lg: 8 },
};
