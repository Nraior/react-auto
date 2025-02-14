import { Box, Typography } from "@mui/material";
import PaginationButton from "./PaginationButton";
import { FontSizes, Spacings } from "../types/constants";

interface PaginationProps {
  currentPage: number;
  maxPages: number;
  setPage: (page: number) => void;
}

const Pagination = ({ currentPage, maxPages, setPage }: PaginationProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: Spacings.Small,
      }}
    >
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => {
          //navigate("");
          setPage(1);
        }}
      >
        First
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === 1}
        onClick={() => {
          setPage(currentPage - 1);
        }}
      >
        Previous
      </PaginationButton>
      <Typography sx={{ fontSize: FontSizes.Smaller }}>
        Page {currentPage} of {maxPages}
      </Typography>
      <PaginationButton
        disabled={currentPage === maxPages}
        onClick={() => {
          setPage(currentPage + 1);
        }}
      >
        Next
      </PaginationButton>
      <PaginationButton
        disabled={currentPage === maxPages}
        onClick={() => {
          setPage(maxPages);
        }}
      >
        Last
      </PaginationButton>
    </Box>
  );
};

export default Pagination;
