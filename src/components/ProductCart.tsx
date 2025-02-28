import { Box, Paper, Typography } from "@mui/material";
import { Link } from "react-router";
import {
  Colors,
  FontSizes,
  ProductCartImageWidth,
  Spacings,
} from "../utils/constants";

interface ProductCartProps {
  stockNumber: number;
  manufacturerName: string;
  modelName: string;
  color: string;
  pictureUrl: string;
  fuelType: string;
  mileage: {
    number: number;
    unit: string;
  };
}
const ProductCart = ({
  stockNumber,
  manufacturerName,
  modelName,
  color,
  pictureUrl,
  fuelType,
  mileage,
}: ProductCartProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        display: "flex",
        p: Spacings.Normal,
        m: Spacings.Normal,
        gap: Spacings.Big,
      }}
    >
      <Box>
        {" "}
        <img width={ProductCartImageWidth} src={pictureUrl} alt="autoLogo" />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Typography
          fontSize={FontSizes.Regular}
          fontWeight={"bold"}
          color={Colors.Dark}
        >
          {manufacturerName} {modelName}
        </Typography>
        <Typography fontSize={FontSizes.Smaller}>
          Stock # {stockNumber} - {mileage.number} {mileage.unit} - {fuelType} -{" "}
          {color}
        </Typography>
        <Link
          to={`/stock/${stockNumber}`}
          style={{
            textDecoration: "none",
            color: Colors.Orange,
            fontSize: FontSizes.Smaller,
          }}
        >
          <Box
            sx={{
              "&:hover": {
                textDecoration: "underline",
              },
            }}
          >
            View Details
          </Box>
        </Link>{" "}
      </Box>
    </Paper>
  );
};

export default ProductCart;
