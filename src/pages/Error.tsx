import { Box, Typography } from "@mui/material";
import { Link } from "react-router";
import { Colors, FontSizes, Spacings } from "../types/constants";

const Error = () => {
  return (
    <Box
      sx={{
        m: Spacings.Big,
        p: Spacings.Big,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
        height: "inherit",
        gap: Spacings.Normal,
      }}
    >
      <Box>
        <img
          src="https://auto1-homepage.prod.mp.auto1.cloud/2.36.0-53/images/logo.svg"
          alt="autoLogo"
        />
      </Box>
      <Typography
        color={Colors.Dark}
        fontWeight="bold"
        fontSize={FontSizes.Big}
        variant="h4"
      >
        404 - Not Found
      </Typography>
      <Typography>
        Sorry, the page you are looking for does not exist.
      </Typography>
      <Typography>
        You can always go back to the{" "}
        <Link to="/" style={{ textDecoration: "none", color: Colors.Orange }}>
          homepage
        </Link>{" "}
        .
      </Typography>
    </Box>
  );
};

export default Error;
