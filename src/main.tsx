import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Menu from "./components/Menu";
import { RecoilRoot, useRecoilState } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material";
import { colorMode as colorModeAtom } from "./components/store/ColorMode";
import Box from "@mui/material/Box";

const Estimate = React.lazy(() => import("./routes/Estimate"));
const Home = React.lazy(() => import("./routes/Home"));
const Merge = React.lazy(() => import("./routes/Merge"));

function App() {
  const [colorMode] = useRecoilState(colorModeAtom);
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  // setColorMode((previous) => {
  //   console.log("ici");
  //   return prefersDarkMode ? "dark" : "light";
  // });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode: colorMode,
        },
      }),
    [colorMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Box
          sx={{
            bgcolor: "background.default",
            color: "text.primary",
          }}
        >
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
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </React.StrictMode>
);
