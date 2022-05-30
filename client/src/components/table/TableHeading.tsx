import { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "../form/Dropdown";
import PrimaryButton from "../form/PrimaryButton";
import SearchBar from "../form/SearchBar";
import { FaPlus } from "react-icons/fa";

const TableContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  flex-grow: 1;

  @media (min-width: 44rem) {
    max-width: 16rem;
    order: 1;
  }

  button {
    margin: 0;
  }
`;

const SearchContainer = styled.div`
  flex-grow: 1;

  @media (min-width: 44rem) {
    order: 2;
    max-width: 30rem;
  }
`;

const FilterContainer = styled.div`
  flex-grow: 1;

  @media (min-width: 44rem) {
    max-width: 12rem;
    order: 3;
  }
`;

export interface TableHeadingProps {
  onSearchChange: (value: string) => void;
  onOpenCreateChange: (value: boolean) => void;
  onFilterChange?: (value: string) => void;
  title: string;
}

const TableHeading = ({
  onSearchChange,
  onOpenCreateChange,
  onFilterChange,
  title,
}: TableHeadingProps) => {
  const [search, setSearch] = useState("");
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [filter, setFilter] = useState("");

  const handleSearchChange = (searchString: string) => {
    setSearch(searchString);
  };

  const handleCLickCreate = () => {
    setIsOpenCreate(true);
  };

  const handleValueChange = (valueString: string) => {
    if (valueString === "Alle") {
      setFilter("");
    } else {
      setFilter(valueString);
    }
  };

  useEffect(() => {
    if (typeof onSearchChange === "function") {
      onSearchChange(search);
    }
  }, [search]);

  useEffect(() => {
    if (typeof onOpenCreateChange === "function") {
      onOpenCreateChange(isOpenCreate);
    }
  }, [isOpenCreate]);

  useEffect(() => {
    if (typeof onFilterChange === "function") {
      onFilterChange(filter);
    }
  }, [filter]);

  return (
    <TableContainer>
      <ButtonContainer>
        <PrimaryButton
          type="button"
          icon={<FaPlus />}
          onClick={handleCLickCreate}
        >
          Nieuwe {title}
        </PrimaryButton>
      </ButtonContainer>
      {title === "onderaannemer" && (
        <FilterContainer>
          <Dropdown
            onValueChange={handleValueChange}
            title={"Functie"}
            defaultString={"Alle"}
            values={[
              {
                value: "Alle",
                string: "Alle",
              },
              {
                value: "Dakwerker",
                string: "Dakwerker",
              },
              {
                value: "Elektricien",
                string: "Elektricien",
              },
              {
                value: "Loodgieter",
                string: "Loodgieter",
              },
              {
                value: "Metselaar",
                string: "Metselaar",
              },
              {
                value: "Vloerenlegger",
                string: "Vloerenlegger",
              },
            ]}
          />
        </FilterContainer>
      )}

      <SearchContainer>
        <SearchBar onSearchChange={handleSearchChange} />
      </SearchContainer>
    </TableContainer>
  );
};

export default TableHeading;
