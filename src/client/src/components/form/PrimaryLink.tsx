import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-bottom: 3rem;
  display: flex;
  justify-content: center;

  a {
    margin-horizontal: auto;
    transition: ${(props) => props.theme.transition.normal};
    border: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.darkGrey};
    color: ${(props) => props.theme.colors.darkGrey};
    background-color: transparent;
    cursor: pointer;

    &:hover {
      color: ${(props) => props.theme.colors.black};
      border-color: ${(props) => props.theme.colors.black};
    }
  }
`;

interface LinkProps {
  children: React.ReactNode;
  id: number;
}

const PrimaryLink = ({ children, id }: LinkProps) => {
  return (
    <Container>
      <Link to={`/project/${id}`}>{children}</Link>
    </Container>
  );
};

export default PrimaryLink;
