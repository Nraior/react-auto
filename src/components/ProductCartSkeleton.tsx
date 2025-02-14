import { Paper, Box, Skeleton } from "@mui/material";
import { ProductCartSkeletonSize, Spacings } from "../types/constants";
const ProductCartSkeleton = () => {
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
      <Skeleton
        variant="rectangular"
        width={ProductCartSkeletonSize.Width}
        height={ProductCartSkeletonSize.Height}
      />
      <Box
        sx={{
          display: "flex",
          flex: 1,
          gap: Spacings.None,
          margin: Spacings.None,
          flexDirection: "column",
        }}
      >
        <Skeleton width={"100%"} height={"50%"} />
        <Skeleton height={"20%"} />
        <Skeleton height={"30%"} />
      </Box>
    </Paper>
  );
};

export default ProductCartSkeleton;
