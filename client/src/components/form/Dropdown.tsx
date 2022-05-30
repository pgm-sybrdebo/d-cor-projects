import styled from "styled-components";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const Container = styled.div`
  div {
    height: 2.5rem;
    @media (min-width: 44rem) {
      margin-right: 0.5rem;
    }
  }

  fieldset {
    border-color: ${(props) => props.theme.colors.black};
    border-width: 2px;

    legend {
      width: 3rem;
    }
  }
`;

export interface DropdownProps {
  onValueChange: (value: string) => void;
  title: string;
  defaultString: string;
  values: Value[];
}

export interface Value {
  value: string;
  string: string;
}

const Dropdown = ({
  onValueChange,
  title,
  defaultString,
  values,
}: DropdownProps) => {
  const [value, setValue] = useState(defaultString);

  useEffect(() => {
    if (typeof onValueChange === "function") {
      onValueChange(value);
    }
  }, [value]);

  const handleChange = (event: SelectChangeEvent) => {
    setValue(event.target.value as string);
  };

  return (
    <Container>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-small">{title}</InputLabel>
          <Select
            labelId="demo-simple-select-small"
            id="demo-simple-select"
            value={value}
            label="Sort"
            onChange={handleChange}
          >
            {values.map((v: Value) => (
              <MenuItem value={v.value}>{v.string}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Dropdown;
