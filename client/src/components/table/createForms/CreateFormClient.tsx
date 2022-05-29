import { useMutation } from "@apollo/client";
import styled from "styled-components";
import * as yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
  TextareaAutosize,
  TextField,
} from "@material-ui/core";
import {
  Typography,
  Button,
  Input,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Formik, Form, Field, FieldArray } from "formik";
import { Add, Remove } from "@material-ui/icons";
import { bgcolor, borderColor } from "@mui/system";
import { useState, useEffect } from "react";
import {
  GET_ALL_CLIENTS_BY_NAME,
  TOTAL_CLIENTS,
  CREATE_CLIENT,
} from "../../../graphql/clients";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 3rem 0;
`;

const Label = styled.label`
  display: block;
  font-size: 0.9rem;
  color: rgba(0, 0, 0, 0.54);
  padding: 0;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
`;

interface CreateFormClientProps {
  open: boolean;
  handleClose: any;
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
  name: yup.string().min(3, "Te kort").required("Verplicht"),
  firstName: yup.string().min(3, "Te kort").required("Verplicht"),
  lastName: yup.string().min(3, "Te kort").required("Verplicht"),
  gender: yup.number().min(0).max(1).required("Verplicht"),
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

const CreateFormClient = ({
  open,
  handleClose,
  page,
  name,
  onSnackbarMessageChange,
  onOpenSnackbarChange,
  onSnackbarSuccessChange,
}: CreateFormClientProps) => {
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
  const [createClient] = useMutation(CREATE_CLIENT);

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <>
        <DialogTitle>Nieuwe Cliënt aanmaken</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={{
              name: "",
              firstName: "",
              lastName: "",
              gender: 0,
              email: "",
              gsm: "",
              street: "",
              houseNumber: 0,
              postalCode: "",
              city: "",
              accountNumber: "",
              vatNumber: "",
            }}
            onSubmit={async (values, { setSubmitting }) => {
              setSubmitting(true);
              try {
                await createClient({
                  variables: {
                    name: values.name,
                    firstName: values.firstName,
                    lastName: values.lastName,
                    gender: values.gender,
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
                      query: GET_ALL_CLIENTS_BY_NAME,
                      variables: {
                        name: name,
                        offset: page,
                        limit: 10,
                      },
                    },
                    {
                      query: TOTAL_CLIENTS,
                      variables: {
                        name: name,
                      },
                    },
                  ],
                });
                setSnackbarSuccess(true);
                setMessage("Nieuwe cliënt is toegevoegd!");
                setOpenSnackbar(true);
                handleClose();
              } catch (error) {
                setSnackbarSuccess(false);
                setMessage(
                  `Cliënt kon niet aangemaakt worden door volgende fout: ${error}`
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
                      name="name"
                      type="text"
                      label="Name:"
                      value={values.name}
                      onChange={(e: any) => {
                        setFieldValue("name", e.target.value);
                      }}
                      error={Boolean(touched.name && errors.name)}
                      helperText={touched.name && errors.name}
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
                  <Grid item xs={12}>
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
                    Aanmaken
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

export default CreateFormClient;
