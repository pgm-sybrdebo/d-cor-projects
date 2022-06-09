import styled from "styled-components";
import { ProjectProps } from "./ProjectDetail";
import { Delete } from "@material-ui/icons";
import PrimaryButton from "../form/PrimaryButton";
import { FaPlus } from "react-icons/fa";
import { Button } from "@mui/material";
import React, { useRef } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_MEDIA, REMOVE_MEDIA } from "../../graphql/media";
import { PROJECT_DETAIL } from "../../graphql/projects";
import ImageList from "../images/ImageList";

const Container = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;

  h2 {
    margin-bottom: 1rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-bottom: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  flex-grow: 1;

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

export interface ResponsUploadImage {
  filename: string;
  type: string;
}

const ProjectImages = ({ project }: ProjectProps) => {
  const imagesInput = useRef<HTMLInputElement>(null);
  const [CreateMedia] = useMutation(CREATE_MEDIA);
  console.log("media", project.media);

  const handleNewImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgData = new FormData();
    if (e.target.files) {
      console.log("new image", e.target.files[0]);
      for (let i = 0; i < e.target.files.length; i++) {
        imgData.append("images", e.target.files[i]);
      }

      const uploadRequest = await fetch(
        `${process.env.REACT_APP_UPLOAD_PROJECT_IMAGES}`,
        {
          method: "POST",
          headers: new Headers({ Accept: "application/json" }),
          body: imgData,
        }
      );
      const uploadResponse = await uploadRequest.json();
      console.log("resp", uploadResponse);
      uploadResponse.map(async (resp: ResponsUploadImage) => {
        await CreateMedia({
          variables: {
            projectId: project.id,
            name: resp.filename,
            type: resp.type,
            source: resp.filename,
          },
          refetchQueries: [
            {
              query: PROJECT_DETAIL,
              variables: {
                id: project.id,
              },
            },
          ],
        });
      });
    }
  };

  return (
    <Container>
      <ContainerHeading>
        <h2>Foto's:</h2>
        <ButtonContainer>
          <PrimaryButton
            type="submit"
            icon={<FaPlus />}
            onClick={() => imagesInput?.current?.click()}
          >
            Voeg foto's
            <input
              ref={imagesInput}
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleNewImages}
            />
          </PrimaryButton>
        </ButtonContainer>
      </ContainerHeading>
      <ImageList media={project.media} projectId={project.id} />
    </Container>
  );
};

export default ProjectImages;
