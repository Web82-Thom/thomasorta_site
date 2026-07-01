import type { CookieConsentStatus } from "../types/CookieConsent.types";
const COOKIE_CONSENT_STORAGE_KEY = "cookieConsent";

export const CookieConsentStorage = {
  get(): CookieConsentStatus {
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);

    if (storedConsent === "accepted" || storedConsent === "refused") {
      return storedConsent;
    }

    return "unknown";
  },

  set(status: Exclude<CookieConsentStatus, "unknown">): void {
    localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, status);
  },

  reset(): void {
    localStorage.removeItem(COOKIE_CONSENT_STORAGE_KEY);
  },
};
