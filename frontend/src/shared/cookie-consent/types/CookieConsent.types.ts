export type CookieConsentStatus =
  | "unknown"
  | "accepted"
  | "refused";

export interface CookieConsentContextValue {
  status: CookieConsentStatus;
  accept: () => void;
  refuse: () => void;
  reset: () => void;
}