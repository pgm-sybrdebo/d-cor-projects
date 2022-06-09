import styled from "styled-components";
import { ProjectProps } from "./ProjectDetail";
import { Delete } from "@material-ui/icons";
import { FaFilePdf, FaPen, FaPlus } from "react-icons/fa";
import PrimaryButton from "../form/PrimaryButton";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-top: 3rem;
  margin-bottom: 5rem;

  h2 {
    margin-bottom: 1rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-bottom: 0;
    }
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 2rem;
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
  @media (min-width: 30rem) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
`;

const ReportCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: ${(props) => props.theme.borderRadius.small};
  width: 10rem;
  height: 10rem;
  min-height: 10rem;
`;

const PdfIcon = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.small}
    ${(props) => props.theme.borderRadius.small} 0 0;

  svg {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.black};
  }
`;

const DateReport = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  padding: 0.5rem;
  text-align: center;

  border-radius: 0 0 ${(props) => props.theme.borderRadius.small}
    ${(props) => props.theme.borderRadius.small};

  span {
    font-size: ${(props) => props.theme.fontSizes.normal};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${(props) => props.theme.colors.black};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    color: ${(props) => props.theme.colors.primaryAccentColor};
    transform: scale(1.2);
  }
`;

const EditButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${(props) => props.theme.colors.black};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    color: ${(props) => props.theme.colors.primaryAccentColor};
    transform: scale(1.2);
  }
`;

const ProjectReports = ({ project }: ProjectProps) => {
  const getDate = (date: EpochTimeStamp) => {
    const d = new Date(Math.round(Number(date)));
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const hour = ("0" + d.getHours()).slice(-2);
    const minutes = ("0" + d.getMinutes()).slice(-2);
    const formatDate =
      day + "/" + month + "/" + d.getFullYear() + " " + hour + ":" + minutes;

    return formatDate;
  };

  const handleOpenNewReport = () => {
    console.log("open new report");
  };

  return (
    <Container>
      <ContainerHeading>
        <h2>Werfverslagen:</h2>
        <ButtonContainer>
          <PrimaryButton
            type="button"
            icon={<FaPlus />}
            onClick={handleOpenNewReport}
          >
            <Link to={`/nieuw-werfverslag/${project.id}`}>
              Nieuw werfverslag
            </Link>
          </PrimaryButton>
        </ButtonContainer>
      </ContainerHeading>

      <div>
        {project.reports.map((report, index) => (
          <ReportCard key={index}>
            <PdfIcon>
              <FaFilePdf />
            </PdfIcon>
            <DateReport>
              <span>{getDate(report.created_on)}</span>
            </DateReport>
            <DeleteButton>
              <Delete />
            </DeleteButton>
            <EditButton>
              <FaPen />
            </EditButton>
          </ReportCard>
        ))}
      </div>
    </Container>
  );
};

export default ProjectReports;
