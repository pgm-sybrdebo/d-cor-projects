import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Field, Form, Formik } from "formik";
import * as YUP from "yup";
import styled from "styled-components";
import { LOGIN } from "../../graphql/auth";
import { useMutation } from "@apollo/client";
import { Button, TextField } from "@mui/material";

const LogSection = styled.div`
  height: 100vh;
  padding: 1.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  form {
    width: 100%;

    > div {
      margin-bottom: 1.5rem;
    }

    button {
      margin-top: 1.5rem;
    }
  }
  div {
    margin: 0;
    padding: 0;
    width: 100%;
    h2 {
      font-size: 1.8rem !important;
      font-weight: 600;
      color: #000;
      margin-bottom: 1rem !important;
    }
  }
`;

const Error = styled.p`
  font-size: 1rem;
  color: red;
  margin-bottom: 1rem;
`;

const validationSchema = YUP.object({
  loginEmail: YUP.string()
    .email("Ongeldig emailadres!")
    .required("Email is verplicht!"),
  loginPass: YUP.string()
    .min(5, "Wachtwoord moet minstens 5 tekens bevatten!")
    .required("Wachtwoord is verplicht!"),
});

const LoginForm = () => {
  const [responseError, setResponseError] = useState("");
  const [login] = useMutation(LOGIN, {
    onCompleted: (response) => {
      localStorage.setItem("D-corprojectsToken", response.login.access_token);
      navigate("/");
    },
    onError: (error) => {
      setResponseError("Verkeerd email of wachtwoord!");
    },
  });
  let navigate = useNavigate();
  return (
    <LogSection>
      <div className="wrap">
        <h2>Login</h2>
        {responseError && <Error>{responseError}</Error>}

        <Formik
          initialValues={{
            loginEmail: "",
            loginPass: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(formData, { setSubmitting }) => {
            setSubmitting(true);

            login({
              variables: {
                email: formData.loginEmail,
                password: formData.loginPass,
              },
            });

            setSubmitting(false);
          }}
        >
          {({
            values,
            submitForm,
            isSubmitting,
            setFieldValue,
            handleBlur,
            touched,
            errors,
          }) => (
            <Form>
              <Field
                component={TextField}
                fullWidth
                name="loginEmail"
                type="email"
                label="Email:"
                value={values.loginEmail}
                onChange={(e: any) => {
                  setFieldValue("loginEmail", e.target.value);
                }}
                onBlur={handleBlur}
                error={Boolean(touched.loginEmail && errors.loginEmail)}
                helperText={touched.loginEmail && errors.loginEmail}
              />
              <Field
                component={TextField}
                fullWidth
                name="loginPass"
                type="password"
                label="Wachtwoord:"
                value={values.loginPass}
                onChange={(e: any) => {
                  setFieldValue("loginPass", e.target.value);
                }}
                onBlur={handleBlur}
                error={Boolean(touched.loginPass && errors.loginPass)}
                helperText={touched.loginPass && errors.loginPass}
              />

              <Button
                variant="outlined"
                size="large"
                fullWidth
                disabled={isSubmitting}
                onClick={submitForm}
                sx={{
                  borderWidth: 2,
                  borderColor: "#56B13D",
                  backgroundColor: "#56B13D",
                  color: "#FFF",
                  ":hover": {
                    borderWidth: 2,
                    borderColor: "#56B13D",
                    bgcolor: "#FFF",
                    color: "#56B13D",
                  },
                }}
              >
                Login
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </LogSection>
  );
};

export default LoginForm;
