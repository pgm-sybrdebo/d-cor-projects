import styled from "styled-components";
import { useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PROJECT_DETAIL } from "../graphql/projects";
import ProjectDetail from "../components/projects/ProjectDetail";
import ProjectSubcontractors from "../components/projects/ProjectSubcontractors";
import ProjectImages from "../components/projects/ProjectImages";
import ProjectReports from "../components/projects/ProjectReports";
import AddSubcontractorForm from "../components/forms/AddSubcontractorForm";
import Loading from "../components/layout/Loading";

const Title = styled.h1`
  margin-bottom: 3rem;
`;

const FirstContainer = styled.div`
  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: flex;
    justify-content: space-between;
  }
`;

const Project = () => {
  let { id } = useParams<{ id: string }>();
  const [isOpenAddSubcontractor, setIsOpenAddSubcontractor] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState(true);

  const { error, loading, data } = useQuery(PROJECT_DETAIL, {
    variables: { id: Number(id) },
  });

  const handleClose = () => {
    setIsOpenAddSubcontractor(false);
  };

  const handleOpenAddSubcontractorChange = () => {
    setIsOpenAddSubcontractor(true);
  };

  const handleSnackbarMessageChange = (isSelected: string) => {
    setSnackbarMessage(isSelected);
  };
  const handleOpenSnackbarChange = (isSelected: boolean) => {
    setOpenSnackbar(isSelected);
  };
  const handleSnackbarSuccessChange = (isSelected: boolean) => {
    setSnackbarSuccess(isSelected);
  };

  return (
    <BaseLayout>
      {loading && <Loading />}
      {data && (
        <>
          <Title>Project: {data.project.name}</Title>
          <FirstContainer>
            <ProjectDetail project={data.project} />
            <ProjectSubcontractors
              project={data.project}
              handleOpenAddSubcontractor={handleOpenAddSubcontractorChange}
            />
          </FirstContainer>
          <ProjectReports project={data.project} />
          <ProjectImages project={data.project} />
        </>
      )}

      {isOpenAddSubcontractor && (
        <AddSubcontractorForm
          handleClose={handleClose}
          open={isOpenAddSubcontractor}
          projectId={Number(id)}
          onSnackbarMessageChange={handleSnackbarMessageChange}
          onOpenSnackbarChange={handleOpenSnackbarChange}
          onSnackbarSuccessChange={handleSnackbarSuccessChange}
        />
      )}
    </BaseLayout>
  );
};

export default Project;
