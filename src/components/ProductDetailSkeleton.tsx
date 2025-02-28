import { Box, Skeleton, Paper, Typography, Button } from "@mui/material";
import {
  ButtonSize,
  Colors,
  FontSizes,
  ProductDetailMinHeight,
  ProductDetailSkeletonSize,
  Spacings,
  WrapperContentSize,
} from "../utils/constants";

const ProductDetailSkeleton = () => {
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
          <Skeleton
            height={ProductDetailSkeletonSize.Height}
            width={ProductDetailSkeletonSize.Width}
          />
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
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </Box>
        <Box sx={{ flex: 1, marginLeft: Spacings.Big }}>
          <Paper variant="outlined" sx={{ flex: 1, padding: Spacings.Normal }}>
            <Box>
              <Typography fontSize={FontSizes.Smaller}>
                If you like this car, click the button and save it in your
                collection of favourite items.
              </Typography>
            </Box>
            <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
              <Button
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
                Save
              </Button>
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default ProductDetailSkeleton;
