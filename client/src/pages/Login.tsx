import styled from "styled-components";
import LoginForm from "../components/forms/LoginForm";
import logo from "../assets/login-image.jpg";

const LoginStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: ${(props) => props.theme.width.elarge};
  margin: 0 auto;
`;

const Picture = styled.div`

display: none;
@media (min-width: 1023px) {
  display: block;
  width: 70%;
  object-fit: cover;
  height: 100vh;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url(${logo});
  > div {
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 0.4;
  }
`;

const Login = () => {
  return (
    <LoginStyle>
      <Picture>
        <div></div>
      </Picture>
      <LoginForm />
    </LoginStyle>
  );
};

export default Login;
