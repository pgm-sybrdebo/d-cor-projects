import styled from "styled-components";

const ButtonStyle = styled.button`
  padding: 0.25rem 1rem;
  height: 2rem;
  color: ${(props) => props.theme.colors.black};
  background-color: ${(props) => props.theme.colors.grey};
  outline: none;
  border-radius: ${(props) => props.theme.borderRadius.small};
  border: 3px solid ${(props) => props.theme.colors.grey};
  transition: ${(props) => props.theme.transition.normal};
  cursor: pointer;
  line-height: 50%;

  &:hover {
    color: ${(props) => props.theme.colors.white};
    background-color: ${(props) => props.theme.colors.darkGrey};
    border: 3px solid ${(props) => props.theme.colors.darkGrey};
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

interface ButtonProps {
  type: "submit" | "button" | "reset" | undefined;
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  icon?: React.ReactNode;
}

export const SecondaryButton = ({
  type,
  children,
  disabled,
  onClick,
  icon,
}: ButtonProps) => {
  return (
    <ButtonStyle type={type} disabled={disabled} onClick={onClick}>
      <Container>
        {icon}
        {children}
      </Container>
    </ButtonStyle>
  );
};
