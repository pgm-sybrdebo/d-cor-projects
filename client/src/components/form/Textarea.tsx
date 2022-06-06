import styled from "styled-components";
import React, { useState } from "react";
import { TextField, FormControl, TextareaAutosize } from "@mui/material";

const Container = styled.div`
  label {
    line-height: 1.2;
  }
`;

export interface TextAreaProps {
  label?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  error: boolean;
  helperText: string;
}

const Textarea = ({
  label,
  value,
  onChange,
  onBlur,
  error,
  helperText,
}: TextAreaProps) => {
  const [currentValue, setCurrentValue] = useState(value);
  return (
    <Container>
      <FormControl fullWidth>
        <TextField
          id="standard-basic"
          label={label}
          value={currentValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (onChange) onChange(e);

            setCurrentValue(e.currentTarget.value);
          }}
          fullWidth
          multiline
          error={error}
          helperText={helperText}
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: {
              minRows: 3,
            },
          }}
        />
      </FormControl>
    </Container>
  );
};

export default Textarea;
