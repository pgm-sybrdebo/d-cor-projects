import React from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;

  button {
    margin-horizontal: auto;
    transition: ${(props) => props.theme.transition.normal};
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.darkGrey};
    color: ${(props) => props.theme.colors.darkGrey};
    background-color: transparent;
    cursor: pointer;
    outline: none;

    &:hover {
      color: ${(props) => props.theme.colors.black};
      border-color: ${(props) => props.theme.colors.black};
    }
  }
`;

interface LinkProps {
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PrimaryLink = ({ children, onClick }: LinkProps) => {
  return (
    <Container>
      <button type="button" onClick={onClick}>
        {children}
      </button>
    </Container>
  );
};

export default PrimaryLink;
