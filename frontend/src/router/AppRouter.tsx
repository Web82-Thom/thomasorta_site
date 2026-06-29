import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "../features/home/presentation/HomePage";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;