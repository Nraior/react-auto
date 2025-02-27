import fetchCarDetails from "../api/carDetails";
import { Suspense } from "react";
import { useParams } from "react-router";
import ProductDetailLoaded from "../components/ProductDetailLoaded";
import ProductDetailSkeleton from "../components/ProductDetailSkeleton";

const ProductDetailWrapper = () => {
  const { stock } = useParams();
  const carDetailsPromise = fetchCarDetails(stock || "");
  return (
    <Suspense fallback={<ProductDetailSkeleton />}>
      <ProductDetailLoaded carDetailsPromise={carDetailsPromise} />
    </Suspense>
  );
};

export default ProductDetailWrapper;
