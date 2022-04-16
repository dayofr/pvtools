import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { MenuItem } from "@mui/material";
import { Link } from "react-router-dom";

export default function Menu() {
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
        </Toolbar>
      </AppBar>
    </Box>
  );
}
