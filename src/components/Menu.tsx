import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { IconButton, MenuItem, useTheme } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { Link } from "react-router-dom";
import { colorMode as colorModeAtom } from "./store/ColorMode";
import { useSetRecoilState } from "recoil";

export default function Menu() {
  const theme = useTheme();
  const setColorMode = useSetRecoilState(colorModeAtom);

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <MenuItem
            onClick={() => {
              return null;
            }}
          >
            <Typography textAlign="center">
              <Link to="/">Home</Link>
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return null;
            }}
          >
            <Typography textAlign="center">
              <Link to="/merge">Merge</Link>
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              return null;
            }}
          >
            <Typography textAlign="center">
              <Link to="/estimate">Estimate</Link>
            </Typography>
          </MenuItem>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "text.primary",
            }}
          >
            {theme.palette.mode} mode
            <IconButton
              sx={{ ml: 1 }}
              onClick={toggleColorMode}
              color="inherit"
            >
              {theme.palette.mode === "dark" ? (
                <Brightness7Icon />
              ) : (
                <Brightness4Icon />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
