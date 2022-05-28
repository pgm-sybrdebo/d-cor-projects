import { useMutation } from "@apollo/client";
import React from "react";
import { FaFolder, FaHeart, FaRegHeart } from "react-icons/fa";
import styled from "styled-components";
import {
  GET_ALL_ACTIVE_PROJECTS_BY_NAME_WITH_PAGINATION,
  GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION,
  UPDATE_PROJECT,
} from "../../graphql/projects";
import { ProjectCardProp } from "../../interfaces";
import { Button } from "../form/Button";

const Card = styled.li`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  margin-bottom: 2rem;
  border: 3px solid ${(props) => props.theme.colors.black};
  border-radius: ${(props) => props.theme.borderRadius.normal};

  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: calc(50% - 1.5rem);
  }

  @media (min-width: ${(props) => props.theme.width.large}) {
    width: calc(33% - 1.5rem);
  }

  p {
    margin: 0 0.5rem;
    text-align: center;
  }

  button {
    background-color: transparent;
    border: none;
    padding: 0;

    &:hover {
      border: none;
    }

    svg:hover {
      transform: scale(1.2);
    }
  }
`;

const ProjectCard = ({
  id,
  name,
  active,
  search,
  sort,
  offset,
  limit,
}: ProjectCardProp) => {
  const [updateProject, { data, loading, error }] = useMutation(UPDATE_PROJECT);

  const handleClick = () => {
    updateProject({
      variables: { id, active: !active },
      refetchQueries: [
        {
          query: GET_ALL_ACTIVE_PROJECTS_BY_NAME_WITH_PAGINATION,
          variables: {
            name: search,
            sort,
            offset,
            limit,
          },
        },
        {
          query: GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION,
          variables: {
            name: search,
            sort,
            offset,
            limit,
          },
        },
      ],
    });
  };

  return (
    <Card>
      <FaFolder color="#1D1D1B" size={32} />
      <p>{name}</p>
      <Button disabled={false} type="submit" onClick={handleClick}>
        {active ? (
          <FaHeart color="#56B13D" size={32} />
        ) : (
          <FaRegHeart color="#56B13D" size={32} />
        )}
      </Button>
    </Card>
  );
};

export default ProjectCard;
