import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";  // ✅ TSX版を読み込む
import "./index.css";

//import '@fullcalendar/core/index.css';
//import '@fullcalendar/daygrid/index.css';


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
