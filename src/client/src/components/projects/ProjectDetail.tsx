import styled from "styled-components";

const LeftContainer = styled.div`
  width: 100%;
  margin-bottom: 3rem;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: 44%;
    margin-bottom: 0;
  }
`;

const LeftSubContainer = styled.div`
  display: flex;
  margin-bottom: 0.75rem;

  span {
    font-size: ${(props) => props.theme.fontSizes.normal};
    display: block;
  }
`;

const Label = styled.p`
  min-width: 6rem;
  max-width: 6rem;
  margin-right: 1rem;
  font-size: ${(props) => props.theme.fontSizes.normal};
`;

const DesignContainer = styled.div`
  margin-bottom: 0.5rem;
`;

export interface ProjectProps {
  project: Project;
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
  media: Media[];
  reports: Report[];
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

export interface Media {
  id: number;
  name: string;
  source: string;
  type: string;
}

export interface Report {
  created_on: EpochTimeStamp;
  pdf: string;
}

const ProjectDetail = ({ project }: ProjectProps) => {
  const getDate = (date: EpochTimeStamp) => {
    const d = new Date(Math.round(Number(date)));
    const day = ("0" + d.getDate()).slice(-2);
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const formatDate = day + "/" + month + "/" + d.getFullYear();

    return formatDate;
  };

  return (
    <LeftContainer>
      <LeftSubContainer>
        <Label>Client:</Label>
        <p>{`${project.client.name}`}</p>
      </LeftSubContainer>
      <LeftSubContainer>
        <Label>Status:</Label>
        <p>{`${project.active === true ? "Actief" : "Niet actief"}`}</p>
      </LeftSubContainer>
      <LeftSubContainer>
        <Label>StartDatum:</Label>
        <p>{getDate(project.startDate)}</p>
      </LeftSubContainer>
      <LeftSubContainer>
        <Label>Adres:</Label>
        <div>
          <span>{`${project.street} ${project.houseNumber}`}</span>
          <span>{`${project.postalCode} ${project.city}`}</span>
        </div>
      </LeftSubContainer>
      <LeftSubContainer>
        <Label>Coördinatie:</Label>
        <div>
          <span>D-Corprojects</span>
          <span>Dhr. De Backere Lieven</span>
        </div>
      </LeftSubContainer>
      <LeftSubContainer>
        <Label>Ontwerp:</Label>
        <div>
          {project.designers &&
            project.designers.map((designer: any) => (
              <DesignContainer key={designer.id}>
                <span>{`${designer.companyName}`}</span>
                <span>{`${designer.gender === 0 ? "Dhr." : "Mevr."} ${
                  designer.lastName
                } ${designer.firstName}`}</span>
              </DesignContainer>
            ))}
        </div>
      </LeftSubContainer>
    </LeftContainer>
  );
};

export default ProjectDetail;
