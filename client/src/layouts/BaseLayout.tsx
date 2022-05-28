import styled from "styled-components";
import Header from "../components/layout/Header";

interface BaseLayoutProps {
  children: React.ReactNode;
}

const MainLayout = styled.main`
  max-width: ${(props) => props.theme.width.elarge};
  margin: 0 auto;
  padding: 0 1.5rem;
  width: 100%;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    padding: 0 3rem;
  }
`;

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <>
      <Header />
      <MainLayout>{children}</MainLayout>
    </>
  );
};

export default BaseLayout;
