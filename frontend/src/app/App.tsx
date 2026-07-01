import AppRouter from "../router/AppRouter";
import { CookieBanner } from "../shared/cookie-consent";

function App() {
  return (
    <>
      <AppRouter />
      <CookieBanner />
    </>
  );
}

export default App;