import styled from "styled-components";
import { Grid } from "@mui/material";
import { id } from "date-fns/locale";
import { useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { SecondaryButton } from "../form/SecondaryButton";
import ImageList from "../images/ImageList";
import { ResponsUploadImage } from "../projects/ProjectImages";
import { Media, ReportForm } from "../../interfaces";

const Container = styled.div`
  margin-top: 1rem;
`;

export interface ImagesSectionProps {
  fieldValueString: string;
}

const ImagesSection = ({ fieldValueString }: ImagesSectionProps) => {
  const imagesInput = useRef<HTMLInputElement>(null);
  const [uploadImages, setUploadImages] = useState<ResponsUploadImage[]>([]);
  const { setFieldValue, values } = useFormikContext<ReportForm>();

  const handleUploadChange = (isSelected: any) => {
    setUploadImages(isSelected);
  };

  useEffect(() => {
    if (fieldValueString === "clientImages") {
      setFieldValue(fieldValueString, uploadImages);
    }
    if (fieldValueString === "dcorprojectsImages") {
      setFieldValue(fieldValueString, uploadImages);
    }
    if (fieldValueString === "designers") {
      values.designers[values.designers.length - 1].images = uploadImages;
    }
    if (fieldValueString === "subcontractors") {
      values.subcontractors[values.subcontractors.length - 1].images =
        uploadImages;
    }
  }, [uploadImages]);

  const handleNewImages = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const imgData = new FormData();
    if (e.target.files) {
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
      setUploadImages([...uploadImages, ...uploadResponse]);
    }
  };

  return (
    <Grid item xs={12} style={{ marginBottom: "1.5rem" }}>
      <SecondaryButton
        type="button"
        icon={<FaPlus />}
        onClick={() => imagesInput?.current?.click()}
      >
        Voeg foto's toe
        <input
          id="clientImages"
          ref={imagesInput}
          type="file"
          hidden
          multiple
          accept="image/*"
          onChange={async (e: any) => {
            if (e.target.files) {
              await handleNewImages(e, setFieldValue);
            }
          }}
        />
      </SecondaryButton>
      {uploadImages.length > 0 && (
        <Container>
          <ImageList
            upload={uploadImages}
            projectId={Number(id)}
            onUploadChange={handleUploadChange}
          />
        </Container>
      )}
    </Grid>
  );
};

export default ImagesSection;
