import { FaPlus } from "react-icons/fa";
import styled from "styled-components";
import PrimaryButton from "../form/PrimaryButton";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { MdExpandMore } from "react-icons/md";

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
  margin-bottom: 1.5rem;

  @media (min-width: 30rem) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 40rem;
  }
`;

const ContainerAccordion = styled.div`
  span {
    font-size: ${(props) => props.theme.fontSizes.normal};
    margin-left: 0.5rem;

    &:first-child {
      margin-left: 0;
    }
  }
`;

const ContainerDetails = styled.div`
  p {
    font-size: ${(props) => props.theme.fontSizes.small};

    span {
      font-size: ${(props) => props.theme.fontSizes.normal};
    }

    a {
      font-size: ${(props) => props.theme.fontSizes.normal};
      text-decoration: underline;
      padding-bottom: 0.5rem;
      color: ${(props) => props.theme.colors.black};
      text-underline-offset: 3px;
      transition: all 0.2s ease-in-out;

      &:hover {
        color: ${(props) => props.theme.colors.primaryAccentColor};
      }
    }
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

      {project.subcontractors &&
        project.subcontractors.length > 0 &&
        project.subcontractors.map((subcontractor: any) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<MdExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <ContainerAccordion>
                <span>{subcontractor.companyName}</span>
                <span>({subcontractor.function})</span>
              </ContainerAccordion>
            </AccordionSummary>
            <AccordionDetails>
              <ContainerDetails>
                <p>
                  Contactpersoon:{" "}
                  <span>{`${subcontractor.lastName} ${subcontractor.firstName}`}</span>
                </p>
                <p>
                  Gsm:{" "}
                  <a
                    href={`tel:${subcontractor.gsm}`}
                  >{`${subcontractor.gsm.slice(0, 3)} ${subcontractor.gsm.slice(
                    3,
                    6
                  )} ${subcontractor.gsm.slice(6, 8)} ${subcontractor.gsm.slice(
                    8,
                    10
                  )} ${subcontractor.gsm.slice(10, 12)}`}</a>
                </p>
                <p>
                  Email:{" "}
                  <a href={`mailto:${subcontractor.email}`}>
                    {subcontractor.email}
                  </a>
                </p>
              </ContainerDetails>
            </AccordionDetails>
          </Accordion>
        ))}

      {/* <SubcontractorCards>
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
      </SubcontractorCards> */}
    </RightContainer>
  );
};

export default ProjectSubcontractors;
