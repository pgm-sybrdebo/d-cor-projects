import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import * as Routes from "../../routes";
import logo from "../../assets/logo-dcor.png";

interface Props {
  open: boolean;
}

const HeaderContainer = styled.div`
  max-width: ${(props) => props.theme.width.elarge};
  width: 100%;
  margin: 0 auto;
`;

const Navigation = styled.nav<Props>`
  display: flex;
`;

const HeaderStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1.5rem 1.5rem 1.5rem 1.5rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin: 0.5rem 3rem 1.5rem 3rem;
  }
`;

const Logo = styled.img`
  height: 3rem;

  // &:hover {
  //   transform: scale(1.2);
  // }
`;

const NavButton = styled.button<Props>`
  outline: none;
  border: none;
  background-color: transparent;
  cursor: pointer;
  z-index: 100;
  margin-left: auto;
  span {
    display: block;
    width: 2rem;
    height: 0.25rem;
    background-color: ${(props) => props.theme.colors.black};
    border-radius: 10px;
    transition: all 0.4s linear;
    position: relative;
    margin-bottom: 0.3rem;

    :first-child {
      transform: ${({ open }) =>
        open ? "rotate(45deg) translateY(0.8rem)" : "rotate(0)"};
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(2rem)" : "translateX(0)")};
    }
    :nth-child(3) {
      transform: ${({ open }) =>
        open ? "rotate(-45deg) translateY(-0.8rem)" : "rotate(0)"};
    }
  }
  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: none;
  }
`;

const NavigationList = styled.ul<Props>`
  list-style: none;
  position: absolute;
  left: 0rem;
  top: ${({ open }) => (open ? "0" : "-100%")};
  height: 100vh;
  width: 100vw;
  overflow-y: hidden;
  overscroll-behavior: contain;
  padding-top: 6rem;
  padding-left: 1.5rem;
  background-color: ${(props) => props.theme.colors.white};
  z-index: 10;
  transition: ${(props) => props.theme.transition.normal};

  li {
    margin: 1.5rem 0;

    a {
      position: relative;
      color: ${(props) => props.theme.colors.black};
      font-size: ${(props) => props.theme.fontSizes.normal};
      font-weight: ${(props) => props.theme.fontWeights.bold};
      transition: ${(props) => props.theme.transition.normal};

      &::before {
        content: "";
        position: absolute;
        bottom: -0.5rem;
        left: 0;
        width: 0;
        height: 3px;
        background-color: ${(props) => props.theme.colors.primaryAccentColor};
        transition: all 0.5s ease;
      }

      &:hover {
        color: ${(props) => props.theme.colors.primaryAccentColor};

        &::before {
          width: 100%;
        }

        &::after {
          width: 100%;
        }
      }

      &.is-active {
        color: ${(props) => props.theme.colors.primaryAccentColor};

        &::before {
          content: "";
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 100%;
          height: 3px;
          background-color: ${(props) => props.theme.colors.primaryAccentColor};
        }
      }
    }
  }

  @media (min-width: ${(props) => props.theme.width.medium}) {
    position: static;
    display: flex;
    align-items: center;
    height: auto;
    width: auto;
    padding: 0;

    li {
      margin-left: 3rem;
    }
  }
`;

const Header = () => {
  const [open, setOpen] = useState(false);

  const handleMenuButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpen(!open);
  };

  return (
    <HeaderContainer>
      <HeaderStyle>
        <NavLink to={Routes.LANDING}>
          <Logo src={logo} alt="logo D-Cor Projects" />
        </NavLink>

        <NavButton open={open} onClick={handleMenuButton}>
          <span />
          <span />
          <span />
        </NavButton>

        <Navigation open={open}>
          <NavigationList open={open}>
            <li>
              <NavLink
                to={Routes.ACTIVE_PROJECTS}
                className={(navData) => (navData.isActive ? "is-active" : "")}
              >
                Actieve projecten
              </NavLink>
            </li>
            <li>
              <NavLink
                to={Routes.PROJECTS}
                className={(navData) => (navData.isActive ? "is-active" : "")}
              >
                Projecten
              </NavLink>
            </li>
            <li>
              <NavLink
                to={Routes.CLIENTS}
                className={(navData) => (navData.isActive ? "is-active" : "")}
              >
                Cliënten
              </NavLink>
            </li>
            <li>
              <NavLink
                to={Routes.SUBCONTRACTORS}
                className={(navData) => (navData.isActive ? "is-active" : "")}
              >
                Onderaannemers
              </NavLink>
            </li>
          </NavigationList>
        </Navigation>
      </HeaderStyle>
    </HeaderContainer>
  );
};

export default Header;
