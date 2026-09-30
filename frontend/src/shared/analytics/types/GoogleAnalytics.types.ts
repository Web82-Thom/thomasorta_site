export type AnalyticsEventParameter =
  | string
  | number
  | boolean
  | undefined;

export type AnalyticsEventParameters = Record<
  string,
  AnalyticsEventParameter
>;

export interface AnalyticsService {
  initialize(): void;
  trackPageView(path: string): void;
  trackEvent(name: string, parameters?: AnalyticsEventParameters): void;
  disable(): void;
}

export type GoogleConsentState = "granted" | "denied";

export interface GoogleConsentSettings {
  analytics_storage: GoogleConsentState;
  ad_storage: GoogleConsentState;
  ad_user_data: GoogleConsentState;
  ad_personalization: GoogleConsentState;
}

export interface GoogleTagConfig extends AnalyticsEventParameters {
  send_page_view?: boolean;
  allow_google_signals?: boolean;
  allow_ad_personalization_signals?: boolean;
  page_path?: string;
  page_location?: string;
  page_title?: string;
}

export interface GoogleTag {
  (command: "js", date: Date): void;
  (
    command: "config",
    measurementId: string,
    config?: GoogleTagConfig,
  ): void;
  (
    command: "event",
    eventName: string,
    parameters?: AnalyticsEventParameters,
  ): void;
  (
    command: "consent",
    action: "default" | "update",
    settings: GoogleConsentSettings,
  ): void;
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: GoogleTag;
  }
}
