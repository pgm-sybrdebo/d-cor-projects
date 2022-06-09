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
import { SecondaryButton } from "../form/SecondaryButton";
import { Link } from "react-router-dom";
import * as Routes from "../../routes";

const Card = styled.li`
  position: relative;
  // display: flex;
  width: 100%;
  // justify-content: space-between;
  // align-items: center;
  // padding: 1rem;
  margin-bottom: 2rem;
  // border: 3px solid ${(props) => props.theme.colors.black};
  // border-radius: ${(props) => props.theme.borderRadius.normal};

  @media (min-width: ${(props) => props.theme.width.medium}) {
    width: calc(50% - 1.5rem);
  }

  @media (min-width: ${(props) => props.theme.width.large}) {
    width: calc(33% - 1.5rem);
  }

  a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    color: ${(props) => props.theme.colors.black};
    border: 3px solid ${(props) => props.theme.colors.black};
    border-radius: ${(props) => props.theme.borderRadius.normal};
  }

  div {
    margin: 0 0.5rem;
    text-align: center;

    p {
      margin-bottom: 0rem;
    }
  }

  button {
    position: absolute;
    right: 1rem;
    top: calc(50% - 1rem);
    background-color: transparent;
    border: none;
    padding: 0;

    &:hover {
      border: none;
      background-color: transparent;
    }

    svg:hover {
      transform: scale(1.2);
    }
  }
`;

const Small = styled.p`
  font-size: 0.8rem;
  // text-align: left;
`;

const Block = styled.div`
  display: block;
  width: 2rem;
  height: 2rem;
`;

const ProjectCard = ({
  id,
  name,
  city,
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
      <Link to={`/project/${id}`}>
        <FaFolder color="#1D1D1B" size={32} />
        <div>
          <p>{name}</p>
          <Small>{city}</Small>
        </div>
        <Block />
      </Link>
      <SecondaryButton disabled={false} type="submit" onClick={handleClick}>
        {active ? (
          <FaHeart color="#56B13D" size={32} />
        ) : (
          <FaRegHeart color="#56B13D" size={32} />
        )}
      </SecondaryButton>
    </Card>
  );
};

export default ProjectCard;
