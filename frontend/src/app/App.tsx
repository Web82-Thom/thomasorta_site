import { useEffect } from "react";

import AppRouter from "../router/AppRouter";
import { CookieBanner } from "../shared/cookie-consent";

function App() {
  useEffect(() => {
    const preventInteractiveElementDrag = (event: DragEvent) => {
      const target = event.target;

      if (
        target instanceof Element &&
        target.closest("a, button, img, svg")
      ) {
        event.preventDefault();
      }
    };

    document.addEventListener("dragstart", preventInteractiveElementDrag);

    return () => {
      document.removeEventListener("dragstart", preventInteractiveElementDrag);
    };
  }, []);

  return (
    <>
      <AppRouter />
      <CookieBanner />
    </>
  );
}

export default App;
