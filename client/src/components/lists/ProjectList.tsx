import styled from "styled-components";
import ProjectCard from "../cards/ProjectCard";

const ProjectsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-gap: 1rem;
`;

// interface DataProps {
//   id: number;
//   clientId: number;
//   name: string;
//   description: string;
//   street: string;
//   houseNumber: number;
//   city: string;
//   postalCode: string;
//   country: string;
//   active: boolean;
// }

interface DataProps {
  data: data[];
}

interface data {
  id: number;
  clientId: number;
  name: string;
  description: string;
  street: string;
  houseNumber: number;
  city: string;
  postalCode: string;
  country: string;
  active: boolean;
}

const ProjectList = ({ data }: DataProps) => {
  return (
    <ProjectsList>
      {data.map((project: any) => {
        return (
          <ProjectCard
            id={project.id}
            name={project.name}
            active={project.active}
          />
        );
      })}
    </ProjectsList>
  );
};

export default ProjectsList;
