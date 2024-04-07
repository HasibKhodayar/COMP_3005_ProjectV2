import React from "react";
import TextField from "@mui/material/TextField";
import { InputAdornment } from "@mui/material";

const DecimalInput = ({
  value,
  onChange,
  unit,
}: {
  value: any;
  onChange: any;
  unit: any;
}) => {
  const handleInputChange = (event: any) => {
    const inputValue = event.target.value;
    // Check if the input value is a valid decimal number
    if (/^\d*\.?\d*$/.test(inputValue) || inputValue === "") {
      onChange(inputValue);
    }
  };

  return (
    <TextField
      type="text"
      value={value}
      onChange={handleInputChange}
      inputProps={{
        pattern: "^\\d*\\.?\\d*$",
        title: "Enter a valid decimal number",
      }}
      InputProps={{
        endAdornment: unit && (
          <InputAdornment position="end">{unit}</InputAdornment>
        ),
      }}
      sx={{ width: "400px" }}
    />
  );
};

export default DecimalInput;
