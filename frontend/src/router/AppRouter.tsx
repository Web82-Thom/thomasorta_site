import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AboutPage } from "../features/about";
import HomePage from "../features/home/presentation/HomePage";
import {
  LegalNoticePage,
  PrivacyPolicyPage,
  SiteMapPage,
  TermsOfUsePage,
} from "../features/legal";
import { ScrollToHash } from "./ScrollToHash";

function AppRouter() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/mentions-legales" element={<LegalNoticePage />} />
        <Route path="/politique-confidentialite" element={<PrivacyPolicyPage />} />
        <Route path="/conditions-utilisation" element={<TermsOfUsePage />} />
        <Route path="/plan-du-site" element={<SiteMapPage />} />
        <Route path="/a-propos" element={<AboutPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;
