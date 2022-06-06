import styled from "styled-components";
import { useState } from "react";
import { TextField, FormControl } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const Container = styled.div``;

export interface DatePickerProps {
  label: string;
  value?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  error: boolean;
  helperText: string;
}

const DatePicker = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: DatePickerProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <Container>
      <FormControl fullWidth>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
            label={label}
            inputFormat="dd/MM/yyyy"
            value={currentValue}
            onChange={(e: any) => {
              if (onChange) onChange(e);
              console.log("e", e);

              setCurrentValue(e);
              console.log("currentValue", currentValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FormControl>
    </Container>
  );
};

export default DatePicker;
