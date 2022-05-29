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
import { Formik, Form, Field, FieldArray } from "formik";
import { useState, useEffect } from "react";
import {
  CREATE_SUBCONTRACTOR,
  GET_ALL_SUBCONTRACTORS_BY_COMPANY_NAME,
  TOTAL_SUBCONTRACTORS,
  UPDATE_SUBCONTRACTOR,
} from "../../../graphql/subcontractor";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
`;

interface UpdateFormSubcontractorProps {
  selectedRow: any;
  open: boolean;
  handleClose: () => void;
  page: number;
  name: string;
  onSnackbarMessageChange: any;
  onOpenSnackbarChange: any;
  onSnackbarSuccessChange: any;
}

const phoneRegex = /^(\+?32|0)4\d{8}$/;
const vatRegex = /^(BE)?0[0-9]{9}$/;
const accountRegex = /^(BE)\d{14}$/;

const postalCodeRegex = /^\d{4}$/;

const validationSchema = yup.object({
  companyName: yup.string().min(3, "Te kort").required("Verplicht"),
  firstName: yup.string().min(3, "Te kort").required("Verplicht"),
  lastName: yup.string().min(3, "Te kort").required("Verplicht"),
  gender: yup.number().min(0).max(1).required("Verplicht"),
  function: yup
    .string()
    .oneOf(
      ["Dakwerker", "Vloerenlegger", "Elektricien", "Loodgieter", "Metselaar"],
      "Ongeldige functie"
    )
    .required("Verplicht"),
  email: yup.string().email("Ongeldig email").required("Verplicht"),
  gsm: yup
    .string()
    .matches(phoneRegex, "Ongeldig gsm nummer")
    .required("Verplicht"),
  street: yup.string().min(3, "Ongeldige straatnaam").required("Verplicht"),
  houseNumber: yup.number().min(1, "Ongeldig huisnummer").required("Verplicht"),
  postalCode: yup
    .string()
    .matches(postalCodeRegex, "Ongeldige postcode")
    .min(4, "Ongeldige postcode")
    .max(4, "Ongeldige postcode")
    .required("Verplicht"),
  city: yup.string().min(3, "Ongeldige stad").required("Verplicht"),
  vatNumber: yup
    .string()
    .matches(vatRegex, "Ongeldig BTW nummer")
    .required("Verplicht"),
  accountNumber: yup
    .string()
    .matches(accountRegex, "Ongeldig bankrekeningnummer")
    .required("Verplicht"),
});

const UpdateFormSubcontractor = ({
  selectedRow,
  open,
  handleClose,
  page,
  name,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: UpdateFormSubcontractorProps) => {
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
  const [updateSubcontractor] = useMutation(UPDATE_SUBCONTRACTOR);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <>
        <DialogTitle>Nieuwe onderaannemer aanmaken</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              companyName: selectedRow.companyName,
              firstName: selectedRow.firstName,
              lastName: selectedRow.lastName,
              gender: selectedRow.gender,
              function: selectedRow.function,
              email: selectedRow.email,
              gsm: selectedRow.gsm,
              street: selectedRow.street,
              houseNumber: selectedRow.houseNumber,
              postalCode: selectedRow.postalCode,
              city: selectedRow.city,
              accountNumber: selectedRow.accountNumber,
              vatNumber: selectedRow.vatNumber,
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              console.log(values);
              try {
                await updateSubcontractor({
                  variables: {
                    id: selectedRow.id,
                    companyName: values.companyName,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    gender: Number(values.gender),
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
                        offset: page,
                        limit: 10,
                      },
                    },
                    {
                      query: TOTAL_SUBCONTRACTORS,
                      variables: {
                        companyName: name,
                      },
                    },
                  ],
                });
                setSnackbarSuccess(true);
                setMessage("Onderaannemer is aangepast!");
                setOpenSnackbar(true);
                handleClose();
              } catch (error) {
                setSnackbarSuccess(false);
                setMessage(
                  `Onderaannemer kon niet aangepast worden door volgende fout: ${error}`
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
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <InputLabel id="gender">Geslacht</InputLabel>
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
                  <Grid item xs={6}>
                    <InputLabel id="function">Functie</InputLabel>
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
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="gsm"
                      type="text"
                      label="Gsm:"
                      value={values.gsm}
                      onChange={(e: any) => {
                        setFieldValue("gsm", e.target.value);
                      }}
                      error={Boolean(touched.gsm && errors.gsm)}
                      helperText={touched.gsm && errors.gsm}
                    />
                  </Grid>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
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
                    />
                  </Grid>
                  <Grid item xs={6}>
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
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="accountNumber"
                      type="text"
                      label="Rekeningnummer:"
                      max="4"
                      value={values.accountNumber}
                      onChange={(e: any) => {
                        setFieldValue("accountNumber", e.target.value);
                      }}
                      error={Boolean(
                        touched.accountNumber && errors.accountNumber
                      )}
                      helperText={touched.accountNumber && errors.accountNumber}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      component={TextField}
                      fullWidth
                      name="vatNumber"
                      type="text"
                      label="BTW nummer:"
                      max="4"
                      value={values.vatNumber}
                      onChange={(e: any) => {
                        setFieldValue("vatNumber", e.target.value);
                      }}
                      error={Boolean(touched.vatNumber && errors.vatNumber)}
                      helperText={touched.vatNumber && errors.vatNumber}
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
                      marginRight: "3rem",
                      color: "#FFF",
                      ":hover": {
                        borderWidth: 2,
                        borderColor: "#56B13D",
                        bgcolor: "#FFF",
                        color: "#56B13D",
                      },
                    }}
                  >
                    Aanpassen
                  </Button>
                  <Button
                    onClick={handleClose}
                    variant="outlined"
                    size="large"
                    fullWidth
                    sx={{
                      borderColor: "#ED0034",
                      color: "#ED0034",
                      borderWidth: 2,
                      ":hover": {
                        borderColor: "#ED0034",
                        color: "#FFF",
                        borderWidth: 2,
                        bgcolor: "rgba(238, 0, 52, 0.4)",
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

export default UpdateFormSubcontractor;
