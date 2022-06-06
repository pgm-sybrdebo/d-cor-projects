import { TextField } from "@material-ui/core";
import styled from "styled-components";
import React, { useState } from "react";
const InputMask = require("react-input-mask");

export interface InputMaskTextFieldProps {
  type: string;
  label?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  error: boolean;
  helperText: string;
  mask: any;
}

const InputMaskTextField = ({
  type,
  label,
  value,
  placeholder,
  onChange,
  onBlur,
  error,
  helperText,
  mask,
}: InputMaskTextFieldProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <InputMask
      mask={mask}
      value={currentValue}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChange) onChange(e);

        setCurrentValue(e.currentTarget.value.replaceAll(" ", ""));
      }}
      onBlur={onBlur}
      maskPlaceholder={"_"}
    >
      {() => (
        <TextField
          fullWidth
          label={label}
          error={error}
          helperText={helperText}
        />
      )}
    </InputMask>
  );
};

export default InputMaskTextField;
