import { Box, CircularProgress } from "@material-ui/core";
import styled from "styled-components";

const Container = styled.div`
  position: relative;
`;

const Loading = () => {
  return (
    <Container>
      <CircularProgress
        size={80}
        style={{
          color: "#56B13D",
          position: "absolute",
          top: "50%",
          left: "50%",
        }}
      />
    </Container>
  );
};

export default Loading;
