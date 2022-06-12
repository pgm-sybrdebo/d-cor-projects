import { useMutation } from "@apollo/client";
import { Delete } from "@material-ui/icons";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { REMOVE_MEDIA } from "../../graphql/media";
import { PROJECT_DETAIL } from "../../graphql/projects";
import { UploadImageCard } from "../../interfaces";

const Container = styled.li`
  position: relative;
  img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    object-position: center;
    border-radius: ${(props) => props.theme.borderRadius.small};
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.circle};
  color: ${(props) => props.theme.colors.black};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    color: ${(props) => props.theme.colors.primaryAccentColor};
    transform: scale(1.2);
  }
`;

export interface ImageCardProps {
  id?: number;
  source: string;
  name: string;
  projectId: number;
  onDelete?: any;
  uploads?: UploadImageCard[];
}

const ImageCard = ({
  id,
  source,
  name,
  projectId,
  onDelete,
  uploads,
}: ImageCardProps) => {
  const [deleteMedia] = useMutation(REMOVE_MEDIA);
  const [uploadImages, setUploadImages] = useState<UploadImageCard[]>(
    uploads || []
  );
  useEffect(() => {
    if (typeof onDelete === "function") {
      onDelete(uploadImages);
    }
  }, [uploadImages, uploads, onDelete]);

  useEffect(() => {
    if (uploads) {
      setUploadImages(uploads);
    }
  }, [uploads]);

  const handleDeleteImage = async (id: number, name: string) => {
    console.log("target", id);
    await fetch(`${process.env.REACT_APP_DELETE_PROJECT_IMAGE}/${name}`, {
      method: "DELETE",
      headers: new Headers({ Accept: "application/json" }),
    });

    await deleteMedia({
      variables: {
        id,
      },
      refetchQueries: [
        {
          query: PROJECT_DETAIL,
          variables: {
            id: projectId,
          },
        },
      ],
    });
  };
  const handleStopUploadImage = async (name: string) => {
    await fetch(`${process.env.REACT_APP_DELETE_PROJECT_IMAGE}/${name}`, {
      method: "DELETE",
      headers: new Headers({ Accept: "application/json" }),
    });
    const n = uploadImages.filter((img) => img.filename !== name);
    setUploadImages(n);
  };

  return (
    <Container key={id ? id : name}>
      <img
        src={`${process.env.REACT_APP_GET_PROJECT_IMAGE}${source}`}
        alt={name}
      />
      <DeleteButton
        type="button"
        onClick={() =>
          id ? handleDeleteImage(id, name) : handleStopUploadImage(name)
        }
      >
        <Delete />
      </DeleteButton>
    </Container>
  );
};

export default ImageCard;
