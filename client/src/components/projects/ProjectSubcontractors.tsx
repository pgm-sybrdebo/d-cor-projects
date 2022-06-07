import { IconButton, Tooltip } from "@mui/material";
import { FaInfoCircle, FaPlus } from "react-icons/fa";
import styled from "styled-components";
import PrimaryButton from "../form/PrimaryButton";

const RightContainer = styled.div`
  width: 100%;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: 50%;
    max-width: 40rem;
  }

  h2 {
    font-size: ${(props) => props.theme.fontSizes.smedium};
    font-weight: ${(props) => props.theme.fontWeights.normal};
    margin-bottom: 1rem;

    @media (min-width: 30rem) {
      margin-bottom: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  flex-grow: 1;

  @media (min-width: 30rem) {
    max-width: 16rem;
  }

  button {
    margin: 0;
  }
`;

const SubcontractorHeading = styled.div`
  @media (min-width: 30rem) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 40rem;
  }
`;

const SubcontractorCards = styled.div`
  margin-top: 2rem;
`;

const SubcontractorCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 40rem;
  margin-bottom: 1rem;
  padding: 0.5rem;
  gap: 1rem;
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-radius: ${(props) => props.theme.borderRadius.small};

  @media (min-width: ${(props) => props.theme.width.medium}) {
    margin: 0 0 1rem 0;
  }

  span {
    font-size: ${(props) => props.theme.fontSizes.normal};
  }

  svg {
    font-size: ${(props) => props.theme.fontSizes.medium};
    color: ${(props) => props.theme.colors.black};
  }
`;

export interface ProjectProps {
  project: Project;
  handleOpenAddSubcontractor: () => void;
}

export interface Project {
  id: number;
  name: string;
  active: boolean;
  description: string;
  startDate: EpochTimeStamp;
  street: string;
  houseNumber: number;
  postalCode: string;
  city: string;
  client: Client;
  designers: Designer[];
  subcontractors: Subcontractor[];
}

export interface Client {
  name: string;
}

export interface Designer {
  companyName: string;
  firstName: string;
  lastName: string;
  gender: number;
}

export interface Subcontractor {
  companyName: string;
  firstName: string;
  lastName: string;
  gsm: string;
  email: string;
  function: string;
}

const ProjectSubcontractors = ({
  project,
  handleOpenAddSubcontractor,
}: ProjectProps) => {
  const createTooltip = (subcontractor: any) => {
    return (
      <div>
        <p>{`Contactpersoon: ${subcontractor.lastName} ${subcontractor.firstName}`}</p>
        <p>{`Gsm: ${subcontractor.gsm.slice(0, 3)} ${subcontractor.gsm.slice(
          3,
          6
        )} ${subcontractor.gsm.slice(6, 8)} ${subcontractor.gsm.slice(
          8,
          10
        )} ${subcontractor.gsm.slice(10, 12)}`}</p>
        <p>{`Email: ${subcontractor.email}`}</p>
      </div>
    );
  };

  return (
    <RightContainer>
      <SubcontractorHeading>
        <h2>Onderaannemers:</h2>
        <ButtonContainer>
          <PrimaryButton
            type="button"
            icon={<FaPlus />}
            onClick={handleOpenAddSubcontractor}
          >
            Nieuwe onderaannemer
          </PrimaryButton>
        </ButtonContainer>
      </SubcontractorHeading>

      <SubcontractorCards>
        {project.subcontractors &&
          project.subcontractors.map((subcontractor: any) => (
            <SubcontractorCard key={subcontractor.id}>
              <span>{`${subcontractor.function}`}</span>
              <span>{`${subcontractor.companyName}`}</span>
              <Tooltip
                title={createTooltip(subcontractor)}
                arrow
                placement="bottom"
              >
                <IconButton>
                  <FaInfoCircle />
                </IconButton>
              </Tooltip>
            </SubcontractorCard>
          ))}
      </SubcontractorCards>
    </RightContainer>
  );
};

export default ProjectSubcontractors;
