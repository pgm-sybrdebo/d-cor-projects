import React from "react";
import styled from "styled-components";

const Button = styled.button`
  width: 100%;
  margin: 2rem 0;
  padding: 0.25rem 1rem;
  height: 2.5rem;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.primaryAccentColor};
  border-radius: ${(props) => props.theme.borderRadius.normal};
  border: 3px solid ${(props) => props.theme.colors.primaryAccentColor};
  transition: ${(props) => props.theme.transition.normal};
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.primaryAccentColor};
    background-color: transparent;
    border: 3px solid ${(props) => props.theme.colors.primaryAccentColor};
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    margin-right: 1rem;
  }
`;

interface PrimaryButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const PrimaryButton = ({
  type,
  children,
  disabled = false,
  icon,
  onClick,
}: PrimaryButtonProps) => {
  return (
    <Button type={type} disabled={disabled} onClick={onClick}>
      <Container>
        {icon}
        {children}
      </Container>
    </Button>
  );
};

export default PrimaryButton;
