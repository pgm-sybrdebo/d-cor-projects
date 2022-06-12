import { useEffect, useState } from "react";
import styled from "styled-components";
import { Media, UploadImageCard } from "../../interfaces";
import ImageCard from "../cards/ImageCard";

const ImagesContainer = styled.div`
  position: relative;
`;

const ImageContainerList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: row;
  gap: 2rem;
  overflow-x: auto;
  padding-right: 2rem;

  &::-webkit-scrollbar {
    background-color: ${(props) => props.theme.colors.white};
    height: 0.75rem;
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.darkGrey};
    border-radius: 1rem;
  }
`;

const OverlayGradient = styled.div`
  position: absolute;
  display: block;
  width: 3rem;
  height: 100%;
  background-image: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 1) 100%
  );
  position: absolute;
  /* top: 0; */
  bottom: 1rem;
  right: 0;
`;

export interface ImageListProps {
  media?: Media[];
  upload?: UploadImageCard[];
  projectId: number;
  onUploadChange?: (upload: UploadImageCard[]) => void;
}

const ImageList = ({
  media,
  upload,
  projectId,
  onUploadChange,
}: ImageListProps) => {
  const [uploads, setUploads] = useState<UploadImageCard[]>(upload || []);
  useEffect(() => {
    if (typeof onUploadChange === "function") {
      onUploadChange(uploads);
    }
  }, [uploads]);

  const handleDeleteUploadImage = (isSelected: any) => {
    setUploads(isSelected);
  };

  return (
    <ImagesContainer>
      <ImageContainerList>
        {media &&
          media.map((image) => (
            <ImageCard
              key={image.id}
              id={image.id}
              source={image.source}
              name={image.name}
              projectId={projectId}
            />
          ))}
        {upload &&
          upload.map((image) => (
            <ImageCard
              key={image.filename}
              source={image.filename}
              name={image.filename}
              projectId={projectId}
              uploads={uploads}
              onDelete={handleDeleteUploadImage}
            />
          ))}
        <OverlayGradient />
      </ImageContainerList>
    </ImagesContainer>
  );
};

export default ImageList;
