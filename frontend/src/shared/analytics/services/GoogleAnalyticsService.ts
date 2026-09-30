import { analyticsConfig } from "../config/analyticsConfig";
import type {
  AnalyticsEventParameters,
  AnalyticsService,
  GoogleConsentSettings,
  GoogleTag,
} from "../types/GoogleAnalytics.types";

const GOOGLE_ANALYTICS_SCRIPT_ID = "google-analytics-script";
const GOOGLE_ANALYTICS_COOKIE_PREFIX = "_ga";
const GOOGLE_EVENT_NAME_PATTERN = /^[a-z][a-z0-9_]{0,39}$/i;

const DENIED_CONSENT: GoogleConsentSettings = {
  analytics_storage: "denied",
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
};

const ANALYTICS_CONSENT: GoogleConsentSettings = {
  ...DENIED_CONSENT,
  analytics_storage: "granted",
};

export class GoogleAnalyticsService implements AnalyticsService {
  private isInitialized = false;
  private isTrackingEnabled = false;

  initialize(): void {
    if (!analyticsConfig.enabled || !this.isBrowserEnvironment()) {
      return;
    }

    this.ensureGoogleTag();

    if (!this.isInitialized) {
      window.gtag("consent", "default", DENIED_CONSENT);
      window.gtag("consent", "update", ANALYTICS_CONSENT);

      this.loadGoogleScript();
      window.gtag("js", new Date());
      window.gtag("config", analyticsConfig.measurementId, {
        send_page_view: false,
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      });

      this.isInitialized = true;
    } else {
      window.gtag("consent", "update", ANALYTICS_CONSENT);
    }

    this.isTrackingEnabled = true;
  }

  trackPageView(path: string): void {
    if (!this.canTrack() || path.trim() === "") {
      return;
    }

    window.gtag("event", "page_view", {
      page_path: path,
      page_location: new URL(path, window.location.origin).toString(),
      page_title: document.title,
    });
  }

  trackEvent(
    name: string,
    parameters: AnalyticsEventParameters = {},
  ): void {
    const normalizedName = name.trim();

    if (!this.canTrack() || !GOOGLE_EVENT_NAME_PATTERN.test(normalizedName)) {
      return;
    }

    window.gtag("event", normalizedName, parameters);
  }

  disable(): void {
    if (!this.isBrowserEnvironment()) {
      return;
    }

    this.isTrackingEnabled = false;

    if (typeof window.gtag === "function") {
      window.gtag("consent", "update", DENIED_CONSENT);
    }

    this.removeGoogleAnalyticsCookies();
  }

  private canTrack(): boolean {
    return (
      analyticsConfig.enabled &&
      this.isTrackingEnabled &&
      this.isBrowserEnvironment() &&
      typeof window.gtag === "function"
    );
  }

  private isBrowserEnvironment(): boolean {
    return typeof window !== "undefined" && typeof document !== "undefined";
  }

  private ensureGoogleTag(): void {
    window.dataLayer ??= [];

    if (typeof window.gtag !== "function") {
      window.gtag = function googleTag(): void {
        // gtag.js requires the native arguments object, not a rest-parameter array.
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer.push(arguments);
      } as GoogleTag;
    }
  }

  private loadGoogleScript(): void {
    if (document.getElementById(GOOGLE_ANALYTICS_SCRIPT_ID)) {
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_ANALYTICS_SCRIPT_ID;
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
      analyticsConfig.measurementId,
    )}`;

    document.head.appendChild(script);
  }

  private removeGoogleAnalyticsCookies(): void {
    const cookieNames = document.cookie
      .split(";")
      .map((cookie) => cookie.split("=", 1)[0].trim())
      .filter(
        (name) =>
          name === GOOGLE_ANALYTICS_COOKIE_PREFIX ||
          name.startsWith(`${GOOGLE_ANALYTICS_COOKIE_PREFIX}_`),
      );

    const hostnameParts = window.location.hostname.split(".");
    const domainCandidates = hostnameParts
      .map((_, index) => hostnameParts.slice(index).join("."))
      .filter((domain) => domain.includes("."));

    for (const cookieName of cookieNames) {
      document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax`;

      for (const domain of domainCandidates) {
        document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
      }
    }
  }
}

export const googleAnalyticsService = new GoogleAnalyticsService();
