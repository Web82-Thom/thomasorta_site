import { useMemo, useState, type ReactNode } from "react";

import { CookieConsentStorage } from "../services/CookieConsentStorage";
import type { CookieConsentStatus } from "../types/CookieConsent.types";
import { CookieConsentContext } from "./CookieConsentContextDefinition";

interface CookieConsentProviderProps {
  children: ReactNode;
}

export function CookieConsentProvider({
  children,
}: CookieConsentProviderProps) {
  const [status, setStatus] = useState<CookieConsentStatus>(() =>
    CookieConsentStorage.get(),
  );

  const accept = () => {
    CookieConsentStorage.set("accepted");
    setStatus("accepted");
  };

  const refuse = () => {
    CookieConsentStorage.set("refused");
    setStatus("refused");
  };

  const reset = () => {
    CookieConsentStorage.reset();
    setStatus("unknown");
  };

  const value = useMemo(
    () => ({
      status,
      accept,
      refuse,
      reset,
    }),
    [status],
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
    </CookieConsentContext.Provider>
  );
}