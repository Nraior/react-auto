import { Box, Paper, Typography, Button } from "@mui/material";
import { use, useState } from "react";
import { Navigate } from "react-router";
import {
  ButtonSize,
  Colors,
  FontSizes,
  ProductDetailMinHeight,
  Spacings,
  WrapperContentSize,
} from "../utils/constants";
import CarDetailsInterface from "../types/CarDetailsInterface";
interface ProductDetailLadedProps {
  carDetailsPromise: Promise<CarDetailsInterface>;
}
const ProductDetailLoaded = ({
  carDetailsPromise,
}: ProductDetailLadedProps) => {
  const details = use<CarDetailsInterface>(carDetailsPromise);
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("favorites") || "");
    } catch (e) {
      // Some kind of local storage bug
      return [];
    }
  });

  if (!details) {
    return <Navigate to="/404/" />;
  }

  const {
    color,
    fuelType,
    manufacturerName,
    mileage,
    modelName,
    pictureUrl,
    stockNumber,
  } = details.car || {};

  const isStockInFavorite = favorites.includes(stockNumber.toString());

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        justifyContent={"center"}
        alignItems={"center"}
        display={"flex"}
        bgcolor={Colors.Light}
        width={"100%"}
        minHeight={ProductDetailMinHeight}
      >
        <Box>
          <img src={pictureUrl} alt="car picture" />
        </Box>
      </Box>

      <Box
        sx={{
          margin: Spacings.Big,
          width: { xs: "initial", md: WrapperContentSize },
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
        }}
      >
        <Box
          display={"flex"}
          flexDirection={"column"}
          gap={Spacings.Normal}
          flex={2}
        >
          <Typography
            fontSize={FontSizes.Big}
            color={Colors.Dark}
            fontWeight={"bold"}
          >
            {manufacturerName} {modelName}
          </Typography>
          <Typography
            fontSize={FontSizes.Regular}
            color={Colors.Dark}
            fontWeight={"bold"}
          >
            Stock # {stockNumber} - {mileage?.number} {mileage?.unit} -{" "}
            {fuelType} - {color}{" "}
          </Typography>
          <Typography fontSize={FontSizes.Smaller}>
            This car is currently available and can be delivered as soon as
            tomorrow morning. Please be aware that delivery times shown in this
            page are not definive and may change due to bad weather conditions.
          </Typography>
        </Box>
        <Box sx={{ flex: 1, marginLeft: Spacings.Big }}>
          <Paper variant="outlined" sx={{ flex: 1, padding: Spacings.Normal }}>
            <Box>
              <Typography fontSize={FontSizes.Smaller}>
                {isStockInFavorite
                  ? `If you dislike this car, click the button and remove it from your
                favourite items collection.`
                  : `If you like this car, click the button and save it in your
                collection of favourite items.`}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button
                onClick={() => {
                  let newFavorites = [...favorites];

                  if (isStockInFavorite) {
                    newFavorites = newFavorites.filter(
                      (el) => el !== stockNumber.toString()
                    );
                  } else {
                    newFavorites.push(stockNumber.toString());
                  }
                  setFavorites(newFavorites);
                  localStorage.setItem(
                    `favorites`,
                    JSON.stringify(newFavorites)
                  );
                }}
                disableRipple
                sx={{
                  textTransform: "none",
                  backgroundColor: Colors.Orange,
                  color: Colors.Light,
                  width: ButtonSize.Width,
                  height: ButtonSize.Height,
                  flex: 0.5,
                  ":active": {
                    bgcolor: Colors.DarkOrange,
                  },
                }}
              >
                {!isStockInFavorite ? "Save" : "Remove"}
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailLoaded;
