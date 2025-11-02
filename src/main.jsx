import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "../index.css";
import MainLayout from "./layout/main.jsx";
import MainRouter from "./router/main-router.jsx";
import Navbar from "./components/navbar.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
        <Navbar />
        <MainLayout>
          <MainRouter />
        </MainLayout>
    </BrowserRouter>
  </StrictMode>
);
