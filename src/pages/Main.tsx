import { Box, Paper, Typography, Button, InputLabel } from "@mui/material";
import Dropdown from "../components/Dropdown";
import AvailableCars from "../components/AvailableCars";
import { use, Suspense, useState, useEffect } from "react";
import manufacturersPromise from "../api/manufacturers";
import colorsPromise from "../api/colors";
import AvailableCarsSkeleton from "../components/AvailableCarsSkeleton";
import fetchCars from "../api/cars";
import { ButtonSize, Colors, FontSizes, Spacings } from "../utils/constants";
import ManufacturerInterface from "../types/ManufacturerInterface";

const Main = () => {
  //carsPromise
  const manufacturers = use<{ manufacturers: ManufacturerInterface[] }>(
    manufacturersPromise
  );
  const colors = use<{ colors: string[] }>(colorsPromise);
  const [dropdownColor, setDropdownColor] = useState("All car colors");
  const [dropdownManufacturer, setDropdownManufacturer] =
    useState("All manufacturers");
  const [page, setPage] = useState(1);

  const [fetchCarsPromise, setFetchCarsPromise] = useState(() =>
    fetchCars(dropdownColor, dropdownManufacturer, page)
  );

  useEffect(() => {
    setFetchCarsPromise(fetchCars(dropdownColor, dropdownManufacturer, page));
  }, [page]);

  const manufacturersNames = manufacturers.manufacturers.map(
    (manufacturer: ManufacturerInterface) => manufacturer.name
  );

  return (
    <Box
      sx={{
        display: "flex",
        m: Spacings.Small,
        gap: Spacings.Big,
        justifyContent: "center",
        padding: Spacings.Normal,
        flexDirection: { xs: "column", md: "row" },
      }}
    >
      <Paper
        sx={{ flex: 2, m: Spacings.Normal, height: "fit-content" }}
        variant="outlined"
      >
        <Box
          sx={{
            p: Spacings.Big,
            display: "flex",
            flexDirection: "column",
            gap: Spacings.Small,
          }}
        >
          <InputLabel sx={{ color: Colors.Dark }} id="color-label">
            Color
          </InputLabel>
          <Dropdown
            labelId="color-label"
            label="Color"
            onChange={setDropdownColor}
            placeholder="All car colors"
            dropdownOptions={["All car colors", ...colors.colors]}
          />
          <InputLabel sx={{ color: Colors.Dark }} id="manufacturer-label">
            Manufacturer
          </InputLabel>

          <Dropdown
            labelId="manufacturer-label"
            label="Manufacturer"
            onChange={setDropdownManufacturer}
            placeholder="All manufacturers"
            dropdownOptions={["All manufacturers", ...manufacturersNames]}
          />
          <Box
            sx={{
              mt: Spacings.Normal,
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Button
              disableRipple
              sx={{
                width: ButtonSize.Width,
                height: ButtonSize.Height,
                backgroundColor: Colors.Orange,
                color: Colors.Light,
                textTransform: "none",
                ":active": {
                  bgcolor: Colors.DarkOrange,
                },
              }}
              onClick={() => {
                setPage(1);
                const updatedFetchCarsPromise = fetchCars(
                  dropdownColor,
                  dropdownManufacturer,
                  1
                );

                setFetchCarsPromise(updatedFetchCarsPromise);
              }}
            >
              Filter
            </Button>
          </Box>
        </Box>
      </Paper>
      <Box sx={{ flex: 4, m: Spacings.Normal }}>
        <Typography
          fontSize={FontSizes.Regular}
          fontWeight="bold"
          color={Colors.Dark}
        >
          Available cars
        </Typography>

        <Suspense fallback={<AvailableCarsSkeleton />}>
          <AvailableCars
            page={page}
            setPage={setPage}
            promise={fetchCarsPromise}
          />
        </Suspense>
      </Box>
    </Box>
  );
};

export default Main;
