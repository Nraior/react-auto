import {
  Select,
  OutlinedInput,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import React from "react";
import { Colors, Spacings } from "../types/constants";

interface DropdownProps {
  placeholder: string;
  dropdownOptions: string[];
  onChange: any;
}

const Dropdown = ({
  placeholder,
  dropdownOptions,
  onChange,
}: DropdownProps) => {
  const [dropdownValue, setDropdownValue] = React.useState<string[]>([
    placeholder,
  ]);
  const handleChange = (event: SelectChangeEvent<typeof dropdownValue>) => {
    const {
      target: { value },
    } = event;
    setDropdownValue(typeof value === "string" ? value.split(",") : value);

    onChange(value);
  };

  return (
    <Select
      MenuProps={{
        sx: {
          "&& .Mui-selected:hover": {
            backgroundColor: Colors.Orange,
          },
        },
      }}
      sx={{
        "& .MuiSelect-select": { p: Spacings.Small },
      }}
      displayEmpty
      value={dropdownValue}
      onChange={handleChange}
      input={<OutlinedInput />}
      renderValue={(selected) => {
        if (selected.length === 0) {
          return <em>{placeholder ? placeholder : "Placeholder"}</em>;
        }

        return selected.join(", ");
      }}
      inputProps={{ "aria-label": "Without label" }}
    >
      {dropdownOptions.map((name) => (
        <MenuItem
          key={name}
          value={name}
          sx={{
            ":hover": {
              backgroundColor: Colors.Orange,
              color: Colors.Light,
            },
          }}
        >
          {name}
        </MenuItem>
      ))}
    </Select>
  );
};
export default Dropdown;
