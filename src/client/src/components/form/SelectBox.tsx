import styled from "styled-components";
import React, { useState } from "react";
import { InputLabel, Select, MenuItem, FormControl } from "@mui/material";

const Container = styled.div`
  legend {
    width: 3rem;
  }

  fieldset {
    top: -9px;
  }

  #active {
    padding: 14.5px 14px;
  }

  label {
    transform: translate(4px, -17px) scale(0.75) !important;
  }
`;

export interface SelectValue {
  value: string | number;
  string: string;
}

export interface InputMaskTextFieldProps {
  label?: string;
  value?: string;
  values: SelectValue[];
  onChange?: any;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const SelectBox = ({
  label,
  value,
  values,
  onChange,
  onBlur,
}: InputMaskTextFieldProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <Container>
      <FormControl fullWidth>
        <InputLabel id="active">{label}</InputLabel>
        <Select
          labelId="active"
          id="active"
          value={currentValue}
          onBlur={onBlur}
          onChange={(e: any) => {
            if (onChange) onChange(e);

            setCurrentValue(e.target.value);
          }}
        >
          {values.map((v: SelectValue) => (
            <MenuItem value={v.value} key={v.string}>
              {v.string}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Container>
  );
};

export default SelectBox;
