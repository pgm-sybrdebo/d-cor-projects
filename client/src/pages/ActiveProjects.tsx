import styled from "styled-components";
import ProjectCard from "../components/cards/ProjectCard";
import {
  GET_ALL_ACTIVE_PROJECTS_WITH_PAGINATION,
  TOTAL_ACTIVE_PROJECTS,
} from "../graphql/projects";
import { useQuery, useLazyQuery } from "@apollo/client";
import BaseLayout from "../layouts/BaseLayout";
import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";

const ProjectsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-gap: 1rem;
`;

const StyledPaginateContainer = styled.div`
  .paginationBttns {
    list-style: none;
    margin: 1rem 0 3rem 0;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .paginationBttns li {
    margin: 1.5rem 0;
  }
  .paginationBttns a {
    padding: 0.5rem;
    margin: 0.5rem;
    border-radius: 3px;
    border: 1px solid ${(props) => props.theme.colors.primaryAccentColor};
    color: black;
    cursor: pointer;
    @media (min-width: 62rem) {
      padding: 1rem;
    }
  }
  .paginationBttns a:hover {
    background-color: ${(props) => props.theme.colors.secondaryAccentColor};
  }
  .paginationActive a {
    background-color: ${(props) =>
      props.theme.colors.secondaryAccentColor} !important;
  }
  .paginationDisabled a {
    color: transparent;
    background-color: transparent;
    &:hover {
      color: black;
      background-color: transparent;
    }
  }
`;

const limitItems = 24;

const Projects = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  // const { loading, error, data } = useQuery(GET_ALL_PROJECTS_WITH_PAGINATION, {
  //   variables: { limit: limitItems, offset: (pageNumber - 1) * limitItems },
  // });
  const { loading: loading2 } = useQuery(TOTAL_ACTIVE_PROJECTS, {
    onCompleted: (response) => {
      setTotal(Number(response.totalActiveProjects));
      console.log(total);
    },
    onError: (error) => {
      console.log(`GRAPHQL ERROR: ${error.message}`);
    },
  });

  const [getProjects, { loading, error, data }] = useLazyQuery(
    GET_ALL_ACTIVE_PROJECTS_WITH_PAGINATION
  );

  const changePage = ({ selected }: any) => {
    setPageNumber(selected + 1);
  };

  useEffect(() => {
    getProjects({
      variables: { limit: limitItems, offset: pageNumber },
    });
  }, [getProjects, pageNumber]);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (data) {
    console.log(data);
  }

  return (
    <BaseLayout>
      {data && (
        <>
          <ProjectsList>
            {data.activeProjectsByPagination.map((project: any) => {
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  active={project.active}
                />
              );
            })}
          </ProjectsList>
          {total > limitItems && (
            <StyledPaginateContainer>
              <ReactPaginate
                previousLabel={"Back"}
                nextLabel={"Next"}
                pageCount={Math.floor(total / limitItems)}
                pageRangeDisplayed={0}
                onPageChange={changePage}
                containerClassName={"paginationBttns"}
                previousLinkClassName={"previousBttn"}
                nextLinkClassName={"nextBttn"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
                forcePage={pageNumber - 1}
              />
            </StyledPaginateContainer>
          )}
        </>
      )}
    </BaseLayout>
  );
};

export default Projects;
