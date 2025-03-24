import { Link, Outlet, useNavigate } from "react-router";
import { Button, Typography, Paper } from "@mui/material";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { Colors, FooterAndHeaderSize, Spacings } from "../utils/constants";
const Layout = () => {
  const navigate = useNavigate();
  const navbarItems = ["Purchase", "My Orders", "Sell"];
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <CssBaseline />
      <AppBar
        sx={{
          bgcolor: "white",
          height: FooterAndHeaderSize,
          justifyContent: "center",
        }}
        variant="outlined"
        component="nav"
      >
        <Toolbar
          sx={{
            padding: Spacings.Small,
            flexDirection: { xs: "column", sm: "initial" },
          }}
        >
          <Box sx={{ flexGrow: 1, display: "block" }}>
            <Link to={"/"}>
              <img id="navLogo" src="/logo.svg" alt="autoLogo" />
            </Link>
          </Box>
          <Box>
            {navbarItems.map((item) => {
              return (
                <Button
                  key={item}
                  sx={{
                    color: Colors.Dark,
                    textTransform: "none",
                    padding: Spacings.Small,
                  }}
                  onClick={() => {
                    navigate(item);
                  }}
                >
                  {item}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <Outlet />
      </Box>

      <Paper
        variant="outlined"
        component="footer"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: FooterAndHeaderSize,
        }}
      >
        {/* Your footer content goes here */}
        <Typography variant="body2" align="center">
          © AUTO1 Group 2018
        </Typography>
      </Paper>
    </Box>
  );
};

export default Layout;
