import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { RecoilRoot, useRecoilState } from "recoil";
import { createTheme, ThemeProvider } from "@mui/material";
import { colorMode as colorModeAtom } from "@/components/store/ColorMode";
import Box from "@mui/material/Box";
import router from "@/routes/router";

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
      <Box
        sx={{
          bgcolor: "background.default",
          color: "text.primary",
        }}
      >
        <RouterProvider router={router} />
      </Box>
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
