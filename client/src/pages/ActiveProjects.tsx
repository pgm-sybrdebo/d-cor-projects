import styled from "styled-components";
import ProjectCard from "../components/cards/ProjectCard";
import {
  GET_ALL_ACTIVE_PROJECTS_BY_NAME_WITH_PAGINATION,
  TOTAL_ACTIVE_PROJECTS,
} from "../graphql/projects";
import { useQuery, useLazyQuery } from "@apollo/client";
import BaseLayout from "../layouts/BaseLayout";
import { useEffect, useState } from "react";
import ProjectHeading from "../components/projects/ProjectHeading";
import Pagination from "../components/projects/Pagination";
import { ActiveProjectsOverview, ProjectsOverview } from "../interfaces";
import Loading from "../components/layout/Loading";

const ProjectsList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-gap: 1rem;
`;

const Text = styled.p`
  text-align: center;
  padding-top: 10%;
`;

const limitItems = 24;

const ActiveProjects = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");

  const {
    loading: loadinging,
    data: totalData,
    error: totalError,
  } = useQuery(TOTAL_ACTIVE_PROJECTS, {
    variables: {
      name: search,
    },
  });

  useEffect(() => {
    if (totalData) {
      setTotal(Number(totalData.totalActiveProjects));
    }
  }, [totalData]);

  const [activeProjectsByName, { error, loading, data }] =
    useLazyQuery<ActiveProjectsOverview>(
      GET_ALL_ACTIVE_PROJECTS_BY_NAME_WITH_PAGINATION
    );

  const handleSearchChange = (searchString: string) => {
    setSearch(searchString);
    setPageNumber(1);
  };

  const handleSortChange = (sortString: string) => {
    setSort(sortString);
  };

  useEffect(() => {
    activeProjectsByName({
      variables: {
        name: search,
        sort: sort,
        limit: limitItems,
        offset: pageNumber - 1,
      },
    });
  }, [search, pageNumber, activeProjectsByName, total, sort]);

  const changePage = ({ selected }: any) => {
    setPageNumber(selected + 1);
  };

  if (error || totalError) {
    return (
      <BaseLayout>
        <Text>Er is een fout opgetreden!</Text>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      <ProjectHeading
        onSearchChange={handleSearchChange}
        onSortChange={handleSortChange}
      />
      {data && (
        <>
          <ProjectsList>
            {data.activeProjectsByNameWithPagination.map((project: any) => {
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  active={project.active}
                  search={search}
                  sort={sort}
                  offset={pageNumber - 1}
                  limit={limitItems}
                />
              );
            })}
          </ProjectsList>
          {total > limitItems && (
            <Pagination
              total={total}
              limitItems={limitItems}
              pageNumber={pageNumber}
              changePage={changePage}
            />
          )}
        </>
      )}
      {loading && <Loading />}
      {!error &&
        !totalError &&
        !loading &&
        !loadinging &&
        data &&
        total === 0 && (
          <Text>Er zijn geen projecten die beginnen met "{search}" !</Text>
        )}
    </BaseLayout>
  );
};

export default ActiveProjects;
