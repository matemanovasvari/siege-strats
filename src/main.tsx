import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Main from "./pages/Main";
import Strats from "./pages/Strats";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/siege-strats" element={<Main />} />
      <Route path="/strats/:map/:strat" element={<Strats />} />
    </Routes>
  </BrowserRouter>,
);
