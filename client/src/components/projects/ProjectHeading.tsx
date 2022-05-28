import { useState, useEffect } from "react";
import styled from "styled-components";
import Dropdown from "../form/Dropdown";
import PrimaryButton from "../form/PrimaryButton";
import SearchBar from "../form/SearchBar";
import { FaPlus } from "react-icons/fa";

const ProjectContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const ButtonContainer = styled.div`
  // margin-bottom: 2rem;
  // max-width: 12rem;
  // min-width: 12rem;
  // width: 100%;
  flex-grow: 1;
  // margin-right: 3rem;

  @media (min-width: 44rem) {
    max-width: 12rem;
    order: 1;
  }

  button {
    margin: 0;
  }
`;

const SearchContainer = styled.div`
  // max-width: 30rem;
  // width: 100%;
  // margin-bottom: 2rem;
  // margin: 0 3rem 2rem 3rem;
  flex-grow: 1;

  @media (min-width: 44rem) {
    order: 2;
    max-width: 30rem;
  }
`;

const SortContainer = styled.div`
  // margin-bottom: 2rem;
  // margin-left: 3rem;
  // max-width: 12rem;
  // width: 100%;
  flex-grow: 1;

  @media (min-width: 44rem) {
    max-width: 12rem;
    order: 3;
  }
`;

const ProjectHeading = ({ onSearchChange, onSortChange }: any) => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const handleSearchChange = (searchString: string) => {
    setSearch(searchString);
  };

  const handleSortChange = (sortString: string) => {
    setSort(sortString);
  };

  useEffect(() => {
    if (typeof onSearchChange === "function") {
      onSearchChange(search);
    }
  }, [search]);

  useEffect(() => {
    if (typeof onSortChange === "function") {
      onSortChange(sort);
    }
  }, [sort]);

  return (
    <ProjectContainer>
      <ButtonContainer>
        <PrimaryButton type="button" icon={<FaPlus />}>
          Nieuw project
        </PrimaryButton>
      </ButtonContainer>
      <SortContainer>
        <Dropdown onSortChange={handleSortChange} />
      </SortContainer>
      <SearchContainer>
        <SearchBar onSearchChange={handleSearchChange} />
      </SearchContainer>
    </ProjectContainer>
  );
};

export default ProjectHeading;
