import BaseLayout from "../layouts/BaseLayout";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { PROJECT_DETAIL } from "../graphql/projects";
import { Field, Formik, Form } from "formik";
import * as Yup from "yup";
import InputMaskTextField from "../components/form/InputMaskTextField";

const InputMask = require("react-input-mask");

const Project = () => {
  let { id } = useParams<{ id: string }>();

  const { error, loading, data } = useQuery(PROJECT_DETAIL, {
    variables: { id: Number(id) },
  });

  if (data) {
    console.log("data", data);
  }

  const initialValues = {
    phoneNumber: "",
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string().required("Required"),
  });

  return (
    <BaseLayout>
      {data && (
        <>
          <h1>Project: {data.project.name}</h1>
          <p>Adres:</p>
          <p>{`${data.project.street} ${data.project.houseNumber}`}</p>
          <p>{`${data.project.postalCode} ${data.project.city}`}</p>

          <p>Status</p>

          <p>{data.project.active ? "actief" : "Niet actief"}</p>

          <p>Coördinatie: </p>
          <p>D-Corprojects Dhr. De Backere Lieven</p>
          <InputMask mask="999-999-999" />

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              console.log(values);
            }}
            render={(formikBag) => {
              return (
                <Form>
                  <Field
                    component={InputMaskTextField}
                    name="phoneNumber"
                    type="text"
                    required
                    label={"phone number"}
                    variant="outlined"
                    margin="normal"
                  />
                  <button type="submit">submit</button>
                </Form>
              );
            }}
          />
        </>
      )}
    </BaseLayout>
  );
};

export default Project;
