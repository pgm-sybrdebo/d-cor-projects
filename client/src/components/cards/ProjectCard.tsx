import React from "react";
import { FaFolder, FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
import { ProjectCardProp } from "../../interfaces";

const Card = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 3px solid ${(props) => props.theme.colors.black};

  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: calc(50% - 1.5rem);
  }

  @media (min-width: ${(props) => props.theme.width.large}) {
    width: calc(33% - 1.5rem);
  }

  p {
    margin: 0;
    text-align: center;
  }
`;

const ProjectCard = ({ id, name, active }: ProjectCardProp) => {
  return (
    <Card>
      <FaFolder color="#1D1D1B" size={32} />
      <p>{name}</p>
      {active ? (
        <FaHeart color="#56B13D" size={32} />
      ) : (
        <FaRegHeart color="#56B13D" size={32} />
      )}
    </Card>
  );
};

export default ProjectCard;
