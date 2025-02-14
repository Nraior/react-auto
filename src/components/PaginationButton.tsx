import { Button } from "@mui/material";
import React from "react";
import { Colors } from "../types/constants";

const buttonStyle = {
  textTransform: "none",
  color: Colors.Orange,
  ":hover": {
    textDecoration: "underline",
    background: "none",
  },
};
interface PagiantionButtonProps {
  onClick: () => void;
  disabled: boolean;
  children: React.ReactNode;
}

const PaginationButton = ({
  onClick,
  disabled,
  children,
}: PagiantionButtonProps) => {
  return (
    <Button sx={buttonStyle} disabled={disabled} onClick={onClick}>
      {children}
    </Button>
  );
};

export default PaginationButton;
