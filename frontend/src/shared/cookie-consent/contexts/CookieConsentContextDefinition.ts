import { createContext } from "react";

import type { CookieConsentContextValue } from "../types/CookieConsent.types";

export const CookieConsentContext =
  createContext<CookieConsentContextValue | null>(null);