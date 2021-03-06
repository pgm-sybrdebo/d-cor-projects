import { useMutation } from "@apollo/client";
import styled from "styled-components";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { Button, InputLabel, Select, MenuItem } from "@mui/material";
import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import {
  CREATE_SUBCONTRACTOR,
  GET_ALL_SUBCONTRACTORS_BY_COMPANY_NAME,
  TOTAL_SUBCONTRACTORS,
} from "../../../graphql/subcontractor";
import InputMaskTextField from "../../form/InputMaskTextField";

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
      order: 2;
      margin-bottom: 0;
    }
  }
`;

interface CreateFormSubcontractorProps {
  open: boolean;
  handleClose: any;
  page: number;
  name: string;
  func: string;
  onSnackbarMessageChange: any;
  onOpenSnackbarChange: any;
  onSnackbarSuccessChange: any;
}

const phoneRegex = /^(\+?32|0)4\d{8}$/;
const vatRegex = /^(BE)?0[0-9]{9}$/;
const accountRegex = /^(BE)[0-9]{14}$/;

const postalCodeRegex = /^\d{4}$/;

const validationSchema = yup.object({
  companyName: yup
    .string()
    .min(3, "Bedrijfsnaam is te kort. Dit moet minstens 3 tekens bevatten.")
    .required("Dit veld is verplicht!"),
  firstName: yup
    .string()
    .min(3, "Voornaam is te kort. Dit moet minstens 3 tekens bevatten.")
    .required("Dit veld is verplicht!"),
  lastName: yup
    .string()
    .min(3, "Achternaam is te kort. Dit moet minstens 3 tekens bevatten.")
    .required("Dit veld is verplicht!"),
  gender: yup.number().min(0).max(1).required("Dit veld is verplicht!"),
  function: yup
    .string()
    .oneOf(
      ["Dakwerker", "Vloerenlegger", "Elektricien", "Loodgieter", "Metselaar"],
      "Ongeldige functie"
    )
    .required("Dit veld is verplicht!"),
  email: yup
    .string()
    .email("Ongeldig email!")
    .required("Dit veld is verplicht!"),
  gsm: yup
    .string()
    .matches(phoneRegex, "Ongeldig gsm nummer!")
    .required("Dit veld is verplicht!"),
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
    .min(4, "Ongeldige postcode")
    .max(4, "Ongeldige postcode")
    .required("Dit veld is verplicht!"),
  city: yup
    .string()
    .min(3, "Ongeldige stad!")
    .required("Die veld is verplicht!"),
  vatNumber: yup
    .string()
    .matches(vatRegex, "Ongeldig BTW of ondernemingsnummer!")
    .required("Dit veld is verplicht!"),
  accountNumber: yup
    .string()
    .matches(accountRegex, "Ongeldig bankrekeningnummer!")
    .required("Dit veld is verplicht!"),
});

const CreateFormSubcontractor = ({
  open,
  handleClose,
  page,
  name,
  func,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: CreateFormSubcontractorProps) => {
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
  const [createSubcontractor] = useMutation(CREATE_SUBCONTRACTOR);

  return (
    <Dialog fullWidth open={open} onClose={handleClose} disableEnforceFocus>
      <>
        <DialogTitle>Nieuwe onderaannemer aanmaken</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              companyName: "",
              firstName: "",
              lastName: "",
              gender: 0,
              function: "",
              email: "",
              gsm: "",
              street: "",
              houseNumber: null,
              postalCode: "",
              city: "",
              accountNumber: "",
              vatNumber: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                await createSubcontractor({
                  variables: {
                    companyName: values.companyName,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    gender: values.gender,
                    function: values.function,
                    email: values.email,
                    gsm: values.gsm,
                    street: values.street,
                    houseNumber: Number(values.houseNumber),
                    postalCode: values.postalCode,
                    city: values.city,
                    accountNumber: values.accountNumber,
                    vatNumber: values.vatNumber,
                  },
                  refetchQueries: [
                    {
                      query: GET_ALL_SUBCONTRACTORS_BY_COMPANY_NAME,
                      variables: {
                        companyName: name,
                        func: func,
                        offset: page,
                        limit: 10,
                      },
                    },
                    {
                      query: TOTAL_SUBCONTRACTORS,
                      variables: {
                        companyName: name,
                        func: func,
                      },
                    },
                  ],
                });
                await setSnackbarSuccess(true);
                await setMessage(
                  `Nieuwe onderaannemer ${values.companyName} is toegevoegd!`
                );
                await setOpenSnackbar(true);
                handleClose();
              } catch (error) {
                setSnackbarSuccess(false);
                setMessage(
                  `Onderaannemer ${values.companyName} kon niet aangemaakt worden door volgende fout: ${error}`
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
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="companyName"
                      type="text"
                      label="Bedrijfsnaam:"
                      value={values.companyName}
                      onChange={(e: any) => {
                        setFieldValue("companyName", e.target.value);
                      }}
                      error={Boolean(touched.companyName && errors.companyName)}
                      helperText={touched.companyName && errors.companyName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="firstName"
                      type="text"
                      label="Voornaam:"
                      value={values.firstName}
                      onChange={(e: any) => {
                        setFieldValue("firstName", e.target.value);
                      }}
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="lastName"
                      type="text"
                      label="Achternaam:"
                      value={values.lastName}
                      onChange={(e: any) => {
                        setFieldValue("lastName", e.target.value);
                      }}
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel id="gender" sx={{ transform: "scale(0.75)" }}>
                      Geslacht
                    </InputLabel>
                    <Select
                      sx={{ width: "100%" }}
                      labelId="gender"
                      id="gender"
                      value={values.gender}
                      onChange={(e: any) => {
                        setFieldValue("gender", e.target.value);
                      }}
                    >
                      <MenuItem value={0}>Man</MenuItem>
                      <MenuItem value={1}>Vrouw</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <InputLabel id="function" sx={{ transform: "scale(0.75)" }}>
                      Functie
                    </InputLabel>
                    <Select
                      sx={{ width: "100%" }}
                      labelId="function"
                      id="function"
                      value={values.function}
                      onChange={(e: any) => {
                        setFieldValue("function", e.target.value);
                      }}
                    >
                      <MenuItem value={"Dakwerker"}>Dakwerker</MenuItem>
                      <MenuItem value={"Elektricien"}>Elektricien</MenuItem>
                      <MenuItem value={"Loodgieter"}>Loodgieter</MenuItem>
                      <MenuItem value={"Metselaar"}>Metselaar</MenuItem>
                      <MenuItem value={"Vloerenlegger"}>Vloerenlegger</MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="email"
                      type="text"
                      label="Email:"
                      value={values.email}
                      onChange={(e: any) => {
                        setFieldValue("email", e.target.value);
                      }}
                      error={Boolean(touched.email && errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      component={InputMaskTextField}
                      fullWidth
                      name="gsm"
                      type="text"
                      label="Gsm:"
                      value={values.gsm}
                      onChange={(e: any) => {
                        setFieldValue(
                          "gsm",
                          e.target.value.replaceAll(" ", "")
                        );
                      }}
                      error={Boolean(touched.gsm && errors.gsm)}
                      helperText={touched.gsm && errors.gsm}
                      mask="+32 999 99 99 99"
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
                      error={Boolean(touched.houseNumber && errors.houseNumber)}
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
                      error={Boolean(touched.postalCode && errors.postalCode)}
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
                  <Grid item xs={12} md={6}>
                    <Field
                      component={InputMaskTextField}
                      fullWidth
                      name="accountNumber"
                      type="text"
                      label="Rekeningnummer:"
                      max="4"
                      value={values.accountNumber}
                      onChange={(e: any) => {
                        setFieldValue(
                          "accountNumber",
                          e.target.value.replaceAll(" ", "")
                        );
                      }}
                      error={Boolean(
                        touched.accountNumber && errors.accountNumber
                      )}
                      helperText={touched.accountNumber && errors.accountNumber}
                      mask="BE99 9999 9999 9999"
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Field
                      component={InputMaskTextField}
                      fullWidth
                      name="vatNumber"
                      type="text"
                      label="BTW nummer:"
                      max="4"
                      value={values.vatNumber}
                      onChange={(e: any) => {
                        setFieldValue(
                          "vatNumber",
                          e.target.value.replaceAll(" ", "")
                        );
                      }}
                      error={Boolean(touched.vatNumber && errors.vatNumber)}
                      helperText={touched.vatNumber && errors.vatNumber}
                      mask="BE 0999 999 999"
                    />
                  </Grid>
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
  );
};

export default CreateFormSubcontractor;
