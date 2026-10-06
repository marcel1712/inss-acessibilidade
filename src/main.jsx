import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ProvedorAcessibilidade } from "./contexto/AcessibilidadeContexto.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProvedorAcessibilidade>
      <App />
    </ProvedorAcessibilidade>
  </StrictMode>,
);
