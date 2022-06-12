import styled from "styled-components";
import { ProjectProps } from "./ProjectDetail";
import { FaPlus } from "react-icons/fa";
import PrimaryButton from "../form/PrimaryButton";
import { Link } from "react-router-dom";
import ReportList from "../report/ReportList";

const Container = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;

  h2 {
    margin-bottom: 1rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-bottom: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  flex-grow: 1;

  a {
    color: ${(props) => props.theme.colors.white};

    &:hover {
      color: ${(props) => props.theme.colors.primaryAccentColor};
    }
  }

  @media (min-width: 30rem) {
    max-width: 16rem;
  }

  button {
    margin: 0;
  }
`;

const ContainerHeading = styled.div`
  margin-bottom: 1rem;
  @media (min-width: 30rem) {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const ProjectReports = ({ project }: ProjectProps) => {
  return (
    <Container>
      <ContainerHeading>
        <h2>Werfverslagen:</h2>
        <ButtonContainer>
          <Link to={`/nieuw-werfverslag/${project.id}`}>
            <PrimaryButton type="button" icon={<FaPlus />}>
              Nieuw werfverslag
            </PrimaryButton>
          </Link>
        </ButtonContainer>
      </ContainerHeading>
      <ReportList
        reports={project.reports}
        projectId={project.id}
        projectName={project.name}
        projectStreet={project.street}
        projectHouseNumber={project.houseNumber}
        projectCity={project.city}
      />
    </Container>
  );
};

export default ProjectReports;
