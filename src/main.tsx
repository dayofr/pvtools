import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
const Estimate = React.lazy(() => import("./routes/Estimate"));
const Home = React.lazy(() => import("./routes/Home"));
const Merge = React.lazy(() => import("./routes/Merge"));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route
          path="/"
          element={
            <React.Suspense fallback={<>...</>}>
              <Home />
            </React.Suspense>
          }
        />
        <Route
          path="merge"
          element={
            <React.Suspense fallback={<>...</>}>
              <Merge />
            </React.Suspense>
          }
        />
        <Route
          path="estimate"
          element={
            <React.Suspense fallback={<>...</>}>
              <Estimate />
            </React.Suspense>
          }
        />
      </Routes>{" "}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
