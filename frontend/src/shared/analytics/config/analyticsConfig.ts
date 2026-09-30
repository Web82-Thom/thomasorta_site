interface AnalyticsConfig {
  readonly enabled: boolean;
  readonly measurementId: string;
  readonly isConfigured: boolean;
}

const GOOGLE_MEASUREMENT_ID_PATTERN = /^G-[A-Z0-9]+$/;

const measurementId =
  import.meta.env.VITE_GA_MEASUREMENT_ID?.trim().toUpperCase() ?? "";
const isConfigured = GOOGLE_MEASUREMENT_ID_PATTERN.test(measurementId);
const isExplicitlyEnabled = import.meta.env.VITE_GA_ENABLED === "true";

export const analyticsConfig = Object.freeze({
  enabled: import.meta.env.PROD && isExplicitlyEnabled && isConfigured,
  measurementId,
  isConfigured,
} satisfies AnalyticsConfig);
