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

const Dropdown = ({ onSortChange }: any) => {
  const [sort, setSort] = useState("descending");

  useEffect(() => {
    if (typeof onSortChange === "function") {
      onSortChange(sort);
    }
  }, [sort]);

  const handleChange = (event: SelectChangeEvent) => {
    setSort(event.target.value as string);
  };

  return (
    <Container>
      <Box sx={{ minWidth: 200 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-small">Sorteer</InputLabel>
          <Select
            labelId="demo-simple-select-small"
            id="demo-simple-select"
            value={sort}
            label="Sort"
            onChange={handleChange}
          >
            <MenuItem value={"alphabetically"}>Alfabetisch</MenuItem>
            <MenuItem value={"descending"}>Datum aflopend</MenuItem>
            <MenuItem value={"ascending"}>Datum oplopend</MenuItem>
          </Select>
        </FormControl>
      </Box>
    </Container>
  );
};

export default Dropdown;
