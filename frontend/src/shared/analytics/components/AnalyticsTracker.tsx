import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import { useCookieConsent } from "../../cookie-consent";
import { googleAnalyticsService } from "../services/GoogleAnalyticsService";

export function AnalyticsTracker() {
  const { status } = useCookieConsent();
  const { pathname, search } = useLocation();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (status !== "accepted") {
      googleAnalyticsService.disable();
      lastTrackedPath.current = null;
      return;
    }

    googleAnalyticsService.initialize();

    const pagePath = `${pathname}${search}`;

    if (lastTrackedPath.current === pagePath) {
      return;
    }

    googleAnalyticsService.trackPageView(pagePath);
    lastTrackedPath.current = pagePath;
  }, [pathname, search, status]);

  return null;
}
