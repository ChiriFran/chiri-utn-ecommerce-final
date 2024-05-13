import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import "./App.css";
import Footer from "./components/Footer";
import { Outlet } from "react-router-dom";


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <Outlet />
    <Footer />
  </>
);
