import styled from "styled-components";
import ProjectCard from "../components/cards/ProjectCard";
import {
  GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION,
  TOTAL_PROJECTS,
} from "../graphql/projects";
import { useQuery, useLazyQuery } from "@apollo/client";
import BaseLayout from "../layouts/BaseLayout";
import { useEffect, useState } from "react";
import ProjectHeading from "../components/projects/ProjectHeading";
import Pagination from "../components/projects/Pagination";
import { ProjectsOverview } from "../interfaces";
import Loading from "../components/layout/Loading";
import CreateFormProject from "../components/forms/CreateFormProject";

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

const Projects = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState<string>("");
  const [sort, setSort] = useState<string>("");
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState(true);

  const handleSnackbarMessageChange = (isSelected: string) => {
    setSnackbarMessage(isSelected);
  };
  const handleOpenSnackbarChange = (isSelected: boolean) => {
    setOpenSnackbar(isSelected);
  };
  const handleSnackbarSuccessChange = (isSelected: boolean) => {
    setSnackbarSuccess(isSelected);
  };

  const handleSnackbarClose = (
    e: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleClose = () => {
    setIsOpenCreate(false);
  };

  const {
    loading: loadinging,
    data: totalData,
    error: totalError,
  } = useQuery(TOTAL_PROJECTS, {
    variables: {
      name: search,
    },
  });

  useEffect(() => {
    if (totalData) {
      setTotal(Number(totalData.totalProjects));
    }
  }, [totalData]);

  const [projectsByName, { error, loading, data }] =
    useLazyQuery<ProjectsOverview>(GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION);

  const handleSearchChange = (searchString: string) => {
    setSearch(searchString);
    setPageNumber(1);
  };

  const handleSortChange = (sortString: string) => {
    setSort(sortString);
  };

  const handleOpenCreateChange = () => {
    setIsOpenCreate(true);
  };

  useEffect(() => {
    projectsByName({
      variables: {
        name: search,
        sort: sort,
        limit: limitItems,
        offset: pageNumber - 1,
      },
    });
  }, [search, pageNumber, projectsByName, total, sort]);

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
        handleOpenCreate={handleOpenCreateChange}
      />
      {data && (
        <>
          <ProjectsList>
            {data.projectsByNameWithPagination.map((project: any) => {
              return (
                <ProjectCard
                  key={project.id}
                  id={project.id}
                  name={project.name}
                  city={project.city}
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

      {isOpenCreate && (
        <CreateFormProject
          handleClose={handleClose}
          open={isOpenCreate}
          page={pageNumber}
          name={search}
          offset={pageNumber - 1}
          limit={limitItems}
          sort={sort}
          onSnackbarMessageChange={handleSnackbarMessageChange}
          onOpenSnackbarChange={handleOpenSnackbarChange}
          onSnackbarSuccessChange={handleSnackbarSuccessChange}
        />
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

export default Projects;
