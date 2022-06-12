import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { Button, Autocomplete, Typography } from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import { useState, useEffect } from "react";
import {
  ADD_SUBCONTRACTOR_TO_PROJECT,
  PROJECT_DETAIL,
} from "../../graphql/projects";

import { Add, Remove } from "@material-ui/icons";
import { GET_ALL_SUBCONTRACTORS } from "../../graphql/subcontractor";

const ButtonContainer = styled.div`
  margin: 3rem 0;

  @media (min-width: ${(props) => props.theme.width.medium}) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
  }

  button:first-child {
    margin-bottom: 2rem;

    @media (min-width: ${(props) => props.theme.width.medium}) {
      margin-bottom: 0;
      order: 2;
    }
  }
`;

const ContainerSelection = styled.div`
  margin-top: 1.5rem;

  > div {
    margin-bottom: 0.5rem;
  }
`;

const SubContainer = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  > div {
    flex-grow: 1;
    width: 100%;
    // min-width: 33.5625rem;
    padding: 0.75rem 0;

    @media (min-width: 960px) {
      width: 50%;
      padding-right: 2rem;
    }
  }
`;

interface AddSubcontractorFormProps {
  open: boolean;
  handleClose: any;
  projectId: number;
  onSnackbarMessageChange: any;
  onOpenSnackbarChange: any;
  onSnackbarSuccessChange: any;
}

interface SubcontractorProp {
  id: number;
  companyName: string;
}

const validationSchema = yup.object({
  subcontractors: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().min(1).required("Dit veld is verplicht!"),
        companyName: yup.string().min(1).required("Dit veld is verplicht!"),
      })
    )
    .required("Dit veld is verplicht!"),
});

const AddSubcontractorForm = ({
  open,
  projectId,
  handleClose,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: AddSubcontractorFormProps) => {
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarSuccess, setSnackbarSuccess] = useState(true);

  useEffect(() => {
    if (typeof onSnackbarMessageChange === "function") {
      onSnackbarMessageChange(message);
    }
    if (typeof onOpenSnackbarChange === "function") {
      onOpenSnackbarChange(openSnackbar);
    }
    if (typeof onSnackbarSuccessChange === "function") {
      onSnackbarSuccessChange(snackbarSuccess);
    }
  }, [
    message,
    openSnackbar,
    snackbarSuccess,
    onSnackbarMessageChange,
    onOpenSnackbarChange,
    onSnackbarSuccessChange,
  ]);

  const [addSubcontractor] = useMutation(ADD_SUBCONTRACTOR_TO_PROJECT);

  const { data: dataSubcontractors } = useQuery(GET_ALL_SUBCONTRACTORS);

  return (
    <>
      {dataSubcontractors && (
        <Dialog fullWidth open={open} onClose={handleClose} disableEnforceFocus>
          <>
            <DialogTitle>Onderaannemers toevoegen:</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  subcontractors: [
                    { id: 0, companyName: "" },
                  ] as SubcontractorProp[],
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);

                  try {
                    values.subcontractors.forEach((subcontractor) => {
                      addSubcontractor({
                        variables: {
                          projectId: Number(projectId),
                          subcontractorId: Number(subcontractor.id),
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
                    });

                    setSnackbarSuccess(true);
                    setMessage("Nieuw project is toegevoegd!");
                    setOpenSnackbar(true);
                    handleClose();
                  } catch (error) {
                    setSnackbarSuccess(false);
                    setMessage(
                      `Project kon niet aangemaakt worden door volgende fout: ${error}`
                    );
                    setOpenSnackbar(true);
                  }
                  setSubmitting(false);
                }}
                validationSchema={validationSchema}
              >
                {({
                  handleSubmit,
                  isSubmitting,
                  handleChange,
                  submitForm,
                  setFieldValue,
                  values,
                  touched,
                  errors,
                }) => (
                  <Form>
                    <Grid item xs={12}>
                      <FieldArray
                        name="subcontractors"
                        render={(arrayHelpers) => (
                          <ContainerSelection>
                            <Typography
                              noWrap
                              component="div"
                              sx={{
                                flexGrow: 1,
                                marginTop: 2,
                                marginBottom: 2,
                                color: "rgba(0, 0, 0, 0.54)",
                                fontSize: "0.9rem",
                              }}
                            >
                              Onderaannemers:
                            </Typography>
                            {values.subcontractors &&
                              values.subcontractors.map((val, index) => (
                                <SubContainer key={index}>
                                  <Field
                                    component={Autocomplete}
                                    xs={12}
                                    md={6}
                                    id="subcontractorId"
                                    options={dataSubcontractors.subcontractors}
                                    onChange={(
                                      e: any,
                                      value: SubcontractorProp
                                    ) => {
                                      values.subcontractors[
                                        values.subcontractors.length - 1
                                      ].id = value.id;

                                      values.subcontractors[
                                        values.subcontractors.length - 1
                                      ].companyName = value.companyName;

                                      setFieldValue(
                                        "subcontractors",
                                        values.subcontractors
                                      );
                                    }}
                                    getOptionLabel={(
                                      option: SubcontractorProp
                                    ) => {
                                      return option.companyName;
                                    }}
                                    renderOption={(
                                      props: any,
                                      option: SubcontractorProp
                                    ) => {
                                      return (
                                        <li {...props}>
                                          <p>{option.companyName}</p>
                                        </li>
                                      );
                                    }}
                                    renderInput={(params: any) => (
                                      <TextField
                                        {...params}
                                        label="Onderaannemer:"
                                        variant="outlined"
                                        error={Boolean(
                                          touched.subcontractors &&
                                            errors.subcontractors
                                        )}
                                        helperText={
                                          touched.subcontractors &&
                                          errors.subcontractors &&
                                          "Dit veld is verplicht!"
                                        }
                                      />
                                    )}
                                  />

                                  <Button
                                    sx={{
                                      marginRight: 1,
                                      color: "#1D1D1B",
                                      borderColor: "#1D1D1B",
                                      ":hover": {
                                        bgcolor: "#EFEFEF",
                                        color: "#1D1D1B",
                                        borderColor: "#1D1D1B",
                                      },
                                    }}
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    <Remove />
                                  </Button>

                                  <Button
                                    sx={{
                                      margin: 1,
                                      color: "#1D1D1B",
                                      borderColor: "#1D1D1B",
                                      ":hover": {
                                        bgcolor: "#EFEFEF",
                                        color: "#1D1D1B",
                                        borderColor: "#1D1D1B",
                                      },
                                    }}
                                    variant="outlined"
                                    disabled={isSubmitting}
                                    onClick={() =>
                                      arrayHelpers.push({
                                        id: 0,
                                        companyName: "",
                                      })
                                    }
                                  >
                                    <Add />
                                  </Button>
                                </SubContainer>
                              ))}
                          </ContainerSelection>
                        )}
                      />
                    </Grid>

                    <ButtonContainer>
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
                        Aanmaken
                      </Button>

                      <Button
                        onClick={handleClose}
                        variant="outlined"
                        size="large"
                        fullWidth
                        sx={{
                          backgroundColor: "#999999",
                          borderColor: "#999999",
                          color: "#FFF",
                          borderWidth: 2,

                          ":hover": {
                            borderColor: "#999999",
                            color: "#999999",
                            borderWidth: 2,
                            bgcolor: "#FFF",
                          },
                        }}
                      >
                        Cancel
                      </Button>
                    </ButtonContainer>
                  </Form>
                )}
              </Formik>
            </DialogContent>
          </>
        </Dialog>
      )}
    </>
  );
};

export default AddSubcontractorForm;
