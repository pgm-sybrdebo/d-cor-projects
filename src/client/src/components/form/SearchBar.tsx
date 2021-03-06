import styled from "styled-components";
import { Formik, Field, Form } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { SecondaryButton } from "./SecondaryButton";
import SearchField from "./SearchField";
import { FaSearch } from "react-icons/fa";

const SearchContainer = styled.div`
  form {
    display: flex;
    align-items: center;

    input {
      height: 2.5rem;
      outline: none;
      border: 2px solid ${(props) => props.theme.colors.black};
      border-right: none;
      border-radius: ${(props) => props.theme.borderRadius.small} 
        0  
        0 
        ${(props) => props.theme.borderRadius.small};
    }

    button {
      height: 2.5rem;
      border: 2px solid ${(props) => props.theme.colors.black};
      border-left: none;
      background-color: transparent;
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      color: ${(props) => props.theme.colors.black};

      &:hover {
        background-color: transparent;
        color: ${(props) => props.theme.colors.primaryAccentColor};
        border: 2px solid ${(props) => props.theme.colors.black};
        border-left: none;

  }
`;

const validationSchema = yup.object({
  search: yup.string(),
});

const SearchBar = ({ onSearchChange }: any) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (typeof onSearchChange === "function") {
      onSearchChange(search);
    }
    // eslint-disable-next-line
  }, [search]);

  return (
    <SearchContainer>
      <Formik
        initialValues={{
          search: "",
        }}
        onSubmit={async (values, { setSubmitting }) => {
          setSubmitting(true);
          if (search !== values.search) {
            setSearch(values.search);
          }
          setSubmitting(false);
        }}
        validationSchema={validationSchema}
      >
        {({ values, isSubmitting, handleSubmit }) => (
          <Form>
            <Field
              placeholder="Zoek op naam"
              name="search"
              as={SearchField}
              type="input"
            />
            <SecondaryButton disabled={isSubmitting} type="submit">
              <FaSearch />
            </SecondaryButton>
          </Form>
        )}
      </Formik>
    </SearchContainer>
  );
};

export default SearchBar;
