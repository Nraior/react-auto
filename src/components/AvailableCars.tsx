import { use } from "react";
import ProductCart from "./ProductCart";
import { Typography } from "@mui/material";
import Pagination from "./Pagination";
import { Colors, FontSizes, Spacings } from "../types/constants";
interface AvailableCarsProps {
  promise: any;
  page: number;
  setPage: (page: number) => void;
}
const AvailableCars = ({ page, promise, setPage }: AvailableCarsProps) => {
  const cars = use<any>(promise);
  return (
    <>
      <Typography
        sx={{
          color: Colors.Dark,
          fontSize: FontSizes.Regular,
          marginTop: Spacings.Small,
          marginBottom: Spacings.Big,
        }}
      >
        Showing {cars.cars.length} of {cars.totalCarsCount} results
      </Typography>

      {cars.cars.map((car: any) => (
        <ProductCart key={car.stockNumber} {...car} />
      ))}
      {cars.totalPageCount > 1 && (
        <Pagination
          setPage={setPage}
          currentPage={page}
          maxPages={cars.totalPageCount}
        />
      )}
    </>
  );
};

export default AvailableCars;
