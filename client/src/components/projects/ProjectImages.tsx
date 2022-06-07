import styled from "styled-components";
import { ProjectProps } from "./ProjectDetail";
import { Delete } from "@material-ui/icons";
import PrimaryButton from "../form/PrimaryButton";
import { FaPlus } from "react-icons/fa";

const Container = styled.div`
  margin-top: 3rem;
  margin-bottom: 3rem;

  h2 {
    margin-bottom: 1rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-bottom: 0;
    }
  }

  > div {
    display: flex;
    align-items: center;
    flex-direction: row;
    gap: 2rem;
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

const ImageCard = styled.div`
  position: relative;
  img {
    width: 10rem;
    height: 10rem;
    object-fit: cover;
    object-position: center;
    border-radius: ${(props) => props.theme.borderRadius.small};
  }
`;

const Button = styled.button`
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
  background-color: transparent;
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

const ProjectImages = ({ project }: ProjectProps) => {
  const handleOpenNewImage = () => {
    console.log("open new image");
  };

  return (
    <Container>
      <ContainerHeading>
        <h2>Foto's:</h2>
        <ButtonContainer>
          <PrimaryButton
            type="button"
            icon={<FaPlus />}
            onClick={handleOpenNewImage}
          >
            Nieuwe foto
          </PrimaryButton>
        </ButtonContainer>
      </ContainerHeading>
      <div>
        {project.media.map((image, index) => (
          <ImageCard>
            <img
              key={index}
              src="https://images.unsplash.com/photo-1653465255362-2ce1ced1d97d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80"
              alt={image.name}
            />
            <Button>
              <Delete />
            </Button>
          </ImageCard>
        ))}
      </div>
    </Container>
  );
};

export default ProjectImages;
