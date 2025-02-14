import { Skeleton } from "@mui/material";
import ProductCartSkeleton from "./ProductCartSkeleton";
import {
  AvailableCarsResultsTextSkeletonSize,
  Spacings,
} from "../types/constants";

const AvailableCarsSkeleton = () => {
  return (
    <>
      <Skeleton
        variant="rectangular"
        width={AvailableCarsResultsTextSkeletonSize.Width}
        sx={{ marginTop: Spacings.Small, marginBottom: Spacings.Big }}
        height={AvailableCarsResultsTextSkeletonSize.Height}
      />

      <ProductCartSkeleton />
      <ProductCartSkeleton />
      <ProductCartSkeleton />
      <ProductCartSkeleton />
      <ProductCartSkeleton />
      <ProductCartSkeleton />
      <ProductCartSkeleton />
      <ProductCartSkeleton />
      <ProductCartSkeleton />
      <ProductCartSkeleton />
    </>
  );
};

export default AvailableCarsSkeleton;
