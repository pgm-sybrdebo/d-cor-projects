import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextareaAutosize,
  Grid,
  TextField,
} from "@material-ui/core";
import {
  Button,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  FormControl,
  Typography,
} from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import { useState, useEffect } from "react";
import {
  ADD_DESIGNER_TO_PROJECT,
  ADD_SUBCONTRACTOR_TO_PROJECT,
  CREATE_PROJECT,
  GET_ALL_ACTIVE_PROJECTS_BY_NAME_WITH_PAGINATION,
  GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION,
} from "../../graphql/projects";
import { GET_ALL_CLIENTS } from "../../graphql/clients";
import Dropdown from "../form/Dropdown";
import SelectBox from "../form/SelectBox";
import Textarea from "../form/Textarea";
import InputMaskTextField from "../form/InputMaskTextField";
import DatePicker from "../form/DatePicker";
import { Add, Remove } from "@material-ui/icons";
import { GET_ALL_DESIGNERS } from "../../graphql/designers";
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

interface CreateFormProjectProps {
  open: boolean;
  handleClose: any;
  page: number;
  name: string;
  offset: number;
  limit: number;
  sort: string;
  onSnackbarMessageChange: any;
  onOpenSnackbarChange: any;
  onSnackbarSuccessChange: any;
}

interface ValueProp {
  id: number;
  name: string;
}

interface DesignerProp {
  id: number;
  companyName: string;
}

const postalCodeRegex = /^\d{4}$/;

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Project naam is te kort. Dit moet minstens 3 tekens bevatten.")
    .required("Dit veld is verplicht!"),
  description: yup
    .string()
    .min(
      10,
      "Deze beschrijving is te kort. Dit moet minstens 10 tekens bevatten."
    )
    .required("Dit veld is verplicht!"),
  clientId: yup
    .number()
    .min(1, "Dit veld is verplicht!")
    .required("Dit veld is verplicht!"),
  active: yup.number().min(0).max(1).required("Dit veld is verplicht!"),
  startDate: yup.date().required("Dit veld is verplicht!"),
  street: yup
    .string()
    .min(3, "Ongeldige straatnaam!")
    .required("Dit veld is verplicht!"),
  houseNumber: yup
    .number()
    .min(1, "Ongeldig huisnummer!")
    .required("Dit veld is verplicht!"),
  postalCode: yup
    .string()
    .matches(postalCodeRegex, "Ongeldige postcode!")
    .min(4, "Ongeldige postcode!")
    .max(4, "Ongeldige postcode!")
    .required("Dit veld is verplicht!"),
  city: yup
    .string()
    .min(3, "Ongeldige stad!")
    .required("Dit veld is verplicht!"),
  designers: yup
    .array()
    .of(
      yup.object().shape({
        id: yup.number().min(1).required("Dit veld is verplicht!"),
        companyName: yup.string().min(1).required("Dit veld is verplicht!"),
      })
    )
    .required("Dit veld is verplicht!"),
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

const CreateFormProject = ({
  open,
  handleClose,
  page,
  name,
  offset,
  limit,
  sort,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: CreateFormProjectProps) => {
  let projectId: number | null = null;
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
  const [createProject] = useMutation(CREATE_PROJECT, {
    update: (proxy, mutationResult) => {
      projectId = mutationResult.data.createProject.id;
    },
  });
  const [addDesigner] = useMutation(ADD_DESIGNER_TO_PROJECT);
  const [addSubcontractor] = useMutation(ADD_SUBCONTRACTOR_TO_PROJECT);

  const { data, loading, error } = useQuery(GET_ALL_CLIENTS);
  const {
    data: dataDesigners,
    loading: loadingDesigners,
    error: errorDesigners,
  } = useQuery(GET_ALL_DESIGNERS);
  const {
    data: dataSubcontractors,
    loading: loadingSubcontractors,
    error: errorSubcontractors,
  } = useQuery(GET_ALL_SUBCONTRACTORS);

  const handleSomething = () => {
    console.log("jup");
  };

  return (
    <>
      {data && dataDesigners && dataSubcontractors && (
        <Dialog fullWidth open={open} onClose={handleClose} disableEnforceFocus>
          <>
            <DialogTitle>Nieuw project aanmaken</DialogTitle>
            <DialogContent>
              <Formik
                initialValues={{
                  name: "",
                  description: "",
                  clientId: 0,
                  active: 0,
                  startDate: new Date(),
                  street: "",
                  houseNumber: 0,
                  postalCode: "",
                  city: "",
                  designers: [{ id: 0, companyName: "" }] as DesignerProp[],
                  subcontractors: [
                    { id: 0, companyName: "" },
                  ] as DesignerProp[],
                }}
                onSubmit={async (values, { setSubmitting }) => {
                  setSubmitting(true);
                  console.log("values", values);
                  try {
                    await createProject({
                      variables: {
                        name: values.name,
                        startDate: values.startDate,
                        description: values.description,
                        clientId: Number(values.clientId),
                        active: values.active === 0 ? true : false,
                        street: values.street,
                        houseNumber: Number(values.houseNumber),
                        postalCode: values.postalCode,
                        city: values.city,
                      },
                      refetchQueries: [
                        {
                          query:
                            GET_ALL_ACTIVE_PROJECTS_BY_NAME_WITH_PAGINATION,
                          variables: {
                            name,
                            sort,
                            offset,
                            limit,
                          },
                        },
                        {
                          query: GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION,
                          variables: {
                            name,
                            sort,
                            offset,
                            limit,
                          },
                        },
                      ],
                    });

                    if (projectId) {
                      console.log("projectId", projectId);
                      values.designers.map((designer) => {
                        console.log(designer);
                        addDesigner({
                          variables: {
                            projectId: Number(projectId),
                            designerId: Number(designer.id),
                          },
                        });
                      });

                      values.subcontractors.map((subcontractor) => {
                        addSubcontractor({
                          variables: {
                            projectId: Number(projectId),
                            subcontractorId: Number(subcontractor.id),
                          },
                        });
                      });
                    }

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
                    <Grid container spacing={3}>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={TextField}
                          fullWidth
                          name="name"
                          type="text"
                          label="Project naam:"
                          value={values.name}
                          onChange={(e: any) => {
                            setFieldValue("name", e.target.value);
                          }}
                          error={Boolean(touched.name && errors.name)}
                          helperText={touched.name && errors.name}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          component={DatePicker}
                          fullWidth
                          name="startDate"
                          label="StartDatum:"
                          value={values.startDate}
                          onChange={(e: any) => {
                            setFieldValue("startDate", e);
                          }}
                          error={Boolean(touched.startDate && errors.startDate)}
                          helperText={touched.startDate && errors.startDate}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          component={Autocomplete}
                          fullWidth
                          id="clientId"
                          options={data.clients}
                          onChange={(e: any, value: ValueProp) => {
                            setFieldValue("clientId", value.id);
                          }}
                          getOptionLabel={(option: ValueProp) => {
                            return option.name;
                          }}
                          renderOption={(props: any, option: ValueProp) => {
                            return (
                              <li {...props}>
                                <p>{option.name}</p>
                              </li>
                            );
                          }}
                          renderInput={(params: any) => (
                            <TextField
                              {...params}
                              label="Client"
                              variant="outlined"
                              error={Boolean(
                                touched.clientId && errors.clientId
                              )}
                              helperText={touched.clientId && errors.clientId}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={SelectBox}
                          fullWidth
                          name="status"
                          label="Status:"
                          value={values.active}
                          values={[
                            {
                              value: 0,
                              string: "Actief",
                            },
                            {
                              value: 1,
                              string: "Niet actief",
                            },
                          ]}
                          onChange={(e: any) => {
                            setFieldValue("active", e.target.value);
                          }}
                        />
                      </Grid>

                      <Grid item xs={12}>
                        <Field
                          component={Textarea}
                          fullWidth
                          name="description"
                          label="Beschrijving:"
                          value={values.description}
                          onChange={(e: any) => {
                            setFieldValue("description", e.target.value);
                          }}
                          error={Boolean(
                            touched.description && errors.description
                          )}
                          helperText={touched.description && errors.description}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        <Field
                          component={TextField}
                          fullWidth
                          name="street"
                          type="text"
                          label="Straat:"
                          value={values.street}
                          onChange={(e: any) => {
                            setFieldValue("street", e.target.value);
                          }}
                          error={Boolean(touched.street && errors.street)}
                          helperText={touched.street && errors.street}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={TextField}
                          fullWidth
                          name="houseNumber"
                          type="number"
                          label="Huisnummer:"
                          value={values.houseNumber}
                          onChange={(e: any) => {
                            setFieldValue("houseNumber", e.target.value);
                          }}
                          error={Boolean(
                            touched.houseNumber && errors.houseNumber
                          )}
                          helperText={touched.houseNumber && errors.houseNumber}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={InputMaskTextField}
                          fullWidth
                          name="postalCode"
                          type="text"
                          label="Postcode:"
                          max="4"
                          value={values.postalCode}
                          onChange={(e: any) => {
                            setFieldValue("postalCode", e.target.value);
                          }}
                          error={Boolean(
                            touched.postalCode && errors.postalCode
                          )}
                          helperText={touched.postalCode && errors.postalCode}
                          mask="9999"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Field
                          component={TextField}
                          fullWidth
                          name="city"
                          type="text"
                          label="Stad:"
                          value={values.city}
                          onChange={(e: any) => {
                            setFieldValue("city", e.target.value);
                          }}
                          error={Boolean(touched.city && errors.city)}
                          helperText={touched.city && errors.city}
                        />
                      </Grid>
                    </Grid>

                    <Grid item xs={12}>
                      <FieldArray
                        name="designers"
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
                              Ontwerpers:
                            </Typography>
                            {
                              values.designers &&
                                values.designers.length > 0 &&
                                values.designers.map((val, index) => (
                                  <SubContainer key={index}>
                                    <Field
                                      component={Autocomplete}
                                      id="designerId"
                                      options={dataDesigners.designers}
                                      onChange={(
                                        e: any,
                                        value: DesignerProp
                                      ) => {
                                        values.designers[
                                          values.designers.length - 1
                                        ].id = value.id;

                                        values.designers[
                                          values.designers.length - 1
                                        ].companyName = value.companyName;

                                        setFieldValue(
                                          "designers",
                                          values.designers
                                        );
                                      }}
                                      getOptionLabel={(
                                        option: DesignerProp
                                      ) => {
                                        return option.companyName;
                                      }}
                                      renderOption={(
                                        props: any,
                                        option: DesignerProp
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
                                          label="Ontwerper:"
                                          variant="outlined"
                                          error={Boolean(
                                            touched.designers &&
                                              errors.designers
                                          )}
                                          helperText={
                                            touched.designers &&
                                            errors.designers &&
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
                                ))
                              // : (
                              //   <Button
                              //     sx={{
                              //       marginTop: 2,
                              //       color: "#1D1D1B",
                              //       borderColor: "#1D1D1B",
                              //       ":hover": {
                              //         bgcolor: "#EFEFEF",
                              //         color: "#1D1D1B",
                              //         borderColor: "#1D1D1B",
                              //       },
                              //     }}
                              //     variant="outlined"
                              //     disabled={isSubmitting}
                              //     onClick={() =>
                              //       arrayHelpers.push({
                              //         id: 0,
                              //         companyName: "",
                              //       })
                              //     }
                              //   >
                              //     Voeg ontwerper toe
                              //   </Button>
                              // )
                            }
                          </ContainerSelection>
                        )}
                      />
                    </Grid>

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
                            {
                              values.subcontractors &&
                                values.subcontractors.map((val, index) => (
                                  <SubContainer key={index}>
                                    <Field
                                      component={Autocomplete}
                                      xs={12}
                                      md={6}
                                      id="subcontractorId"
                                      options={
                                        dataSubcontractors.subcontractors
                                      }
                                      onChange={(
                                        e: any,
                                        value: DesignerProp
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
                                        option: DesignerProp
                                      ) => {
                                        return option.companyName;
                                      }}
                                      renderOption={(
                                        props: any,
                                        option: DesignerProp
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
                                ))
                              // : (
                              //   <Button
                              //     sx={{
                              //       marginTop: 2,
                              //       color: "#1D1D1B",
                              //       borderColor: "#1D1D1B",
                              //       ":hover": {
                              //         bgcolor: "#EFEFEF",
                              //         color: "#1D1D1B",
                              //         borderColor: "#1D1D1B",
                              //       },
                              //     }}
                              //     variant="outlined"
                              //     disabled={isSubmitting}
                              //     onClick={() =>
                              //       arrayHelpers.push({
                              //         id: 0,
                              //         companyName: "",
                              //       })
                              //     }
                              //   >
                              //     Voeg onderaannemer toe
                              //   </Button>
                              // )
                            }
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

export default CreateFormProject;

// import React from 'react'

// const CreateFormProject = () => {
//   return (
//     <div>CreateFormProject</div>
//   )
// }

// export default CreateFormProject
