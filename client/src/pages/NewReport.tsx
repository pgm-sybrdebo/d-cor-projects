import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, FieldArray, useFormikContext } from "formik";
import DatePicker from "../components/form/DatePicker";
import { Grid } from "@material-ui/core";
import { CREATE_REPORT } from "../graphql/reports";
import { useMutation } from "@apollo/client";
import Textarea from "../components/form/Textarea";
import { Button } from "@mui/material";
import ReactDOMServer from "react-dom/server";
import logo from "../assets/dcorprojectPdfImage.jpg";
import {
  PDFDownloadLink,
  Document,
  Page,
  View,
  Text,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import TemplatePdf from "../components/pdf/TemplatePdf";
import PrimaryButton from "../components/form/PrimaryButton";
import { SecondaryButton } from "../components/form/SecondaryButton";
import { FaPlus } from "react-icons/fa";
import { ResponsUploadImage } from "../components/projects/ProjectImages";
import ImageList from "../components/images/ImageList";

const Title = styled.h1`
  margin-bottom: 3rem;
`;

const Container = styled.div`
  max-width: ${(props) => props.theme.width.medium};
  margin: 0 auto;
`;

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

const SubText = styled.p`
  text-decoration: underline;
  margin-bottom: 1rem;
`;

const validationSchema = yup.object({
  startDate: yup.date().required("Dit veld is verplicht!"),
  nextDate: yup.date().required("Dit veld is verplicht!"),
  generalInfo: yup
    .string()
    .min(
      10,
      "Deze algemen info is te kort. Dit moet minstens 10 tekens bevatten."
    )
    .required("Dit veld is verplicht!"),
  clientInfo: yup
    .string()
    .min(
      10,
      "Deze bouwheer info is te kort. Dit moet minstens 10 tekens bevatten."
    )
    .required("Dit veld is verplicht!"),
  clientImages: yup.array().required("Dit veld is verplicht!"),
  dcorprojectsInfo: yup
    .string()
    .min(
      10,
      "Deze D-corprojects info is te kort. Dit moet minstens 10 tekens bevatten."
    )
    .required("Dit veld is verplicht!"),
});

export interface NewReportProps {}

const styles = StyleSheet.create({
  body: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
  },
  logo: {
    width: 80,
  },
  header: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: "center",
    color: "grey",
    border: "1px solid black",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 30,
    textAlign: "right",
    color: "grey",
  },
  heading: {
    border: "3px solid black",
    padding: 4,
    marginTop: 10,
    marginBottom: 10,
  },
  headingHeading: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  text: {
    fontSize: 8,
  },
});

const NewReport = ({}: NewReportProps) => {
  let { id } = useParams<{ id: string }>();
  const imagesInput = useRef<HTMLInputElement>(null);
  const [uploadImages, setUploadImages] = useState<ResponsUploadImage[]>([]);
  // const { setFieldValue } = useFormikContext();

  const handleUploadChange = (isSelected: any) => {
    console.log("yesssssss", isSelected);
    setUploadImages(isSelected);
  };

  // useEffect(() => {
  //   if (uploadImages.length > 0) {
  //     setFieldValue("clientImages", uploadImages);
  //   }
  // }, [uploadImages]);

  const handleNewImages = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const imgData = new FormData();
    if (e.target.files) {
      console.log("new image", e.target.files[0]);
      for (let i = 0; i < e.target.files.length; i++) {
        imgData.append("images", e.target.files[i]);
      }

      const uploadRequest = await fetch(
        `${process.env.REACT_APP_UPLOAD_PROJECT_IMAGES}`,
        {
          method: "POST",
          headers: new Headers({ Accept: "application/json" }),
          body: imgData,
        }
      );
      const uploadResponse = await uploadRequest.json();
      console.log("resp", uploadResponse);
      setUploadImages([...uploadImages, ...uploadResponse]);
      console.log("before");
      await setFieldValue("clientImages", uploadImages);
      console.log("after");
      // uploadResponse.map(async (resp: ResponsUploadImage) => {
      //   console.log("resp", resp);
      // });
    }
  };
  let reportId: number | null = null;
  const [createReport] = useMutation(CREATE_REPORT, {
    update: (proxy, mutationResult) => {
      reportId = mutationResult.data.createReport.id;
    },
  });
  const test = ["hello", "there", "!"];

  const TemplatePdf = (
    <Document>
      <Page style={styles.body}>
        <Image src={logo} style={styles.logo} />
        <View style={styles.heading}>
          <View style={styles.headingHeading}>
            <Text style={styles.text}>Werfverslag</Text>
            <Text style={styles.text}>dd. 17/08/2021</Text>
          </View>
        </View>
        <Text style={styles.header} fixed>
          ksldfjsdljfklsdjfkdljsfskdljfsdlkjflsdkfjsdlk
        </Text>

        {test.map((text) => (
          <Text>{text}</Text>
        ))}
        <Text
          style={styles.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
        />
      </Page>
    </Document>
  );

  return (
    <BaseLayout>
      <Title>Nieuw Werfverslag</Title>
      <Container>
        <Formik
          initialValues={{
            startDate: new Date(),
            nextDate: new Date(),
            generalInfo: "",
            clientInfo: "",
            clientImages: [],
            dcorprojectsInfo: "",
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            console.log("endvalues", values);
            try {
            } catch (error) {}
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
                    component={DatePicker}
                    fullWidth
                    name="nextDate"
                    label="Datum volgende werfvergadering:"
                    value={values.nextDate}
                    onChange={(e: any) => {
                      setFieldValue("nextDate", e);
                    }}
                    error={Boolean(touched.nextDate && errors.nextDate)}
                    helperText={touched.nextDate && errors.nextDate}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    component={Textarea}
                    fullWidth
                    name="generalInfo"
                    label="Algemene info:"
                    value={values.generalInfo}
                    onChange={(e: any) => {
                      setFieldValue("generalInfo", e.target.value);
                    }}
                    error={Boolean(touched.generalInfo && errors.generalInfo)}
                    helperText={touched.generalInfo && errors.generalInfo}
                  />
                </Grid>
                <Grid item xs={12}>
                  <SubText>Bouwheer</SubText>
                  <Field
                    component={Textarea}
                    fullWidth
                    name="clientInfo"
                    label="Bouwheer:"
                    value={values.clientInfo}
                    onChange={(e: any) => {
                      setFieldValue("clientInfo", e.target.value);
                    }}
                    error={Boolean(touched.clientInfo && errors.clientInfo)}
                    helperText={touched.clientInfo && errors.clientInfo}
                  />
                </Grid>
                <Grid item xs={12}>
                  {/* <label htmlFor="modelImage">Add model Image</label>
                  <input
                    id="modelImage"
                    type="file"
                    name="modelImage"
                    onChange={(e: any) => {
                      if (e.target.files) {
                        setFieldValue("image", e.target.files[0]);
                      }
                    }}
                  /> */}
                  <SecondaryButton
                    type="button"
                    icon={<FaPlus />}
                    onClick={() => imagesInput?.current?.click()}
                  >
                    Voeg foto's toe
                    <input
                      id="clientImages"
                      ref={imagesInput}
                      type="file"
                      hidden
                      multiple
                      accept="image/*"
                      onChange={async (e: any) => {
                        if (e.target.files) {
                          await handleNewImages(e, setFieldValue);
                          console.log("values", uploadImages);

                          // setFieldValue("clientImages", e.target.files);
                        }
                      }}
                    />
                  </SecondaryButton>
                  {uploadImages.length > 0 && (
                    <ImageList
                      upload={uploadImages}
                      projectId={Number(id)}
                      onUploadChange={handleUploadChange}
                    />
                  )}
                </Grid>
                <Grid item xs={12}>
                  <SubText>D-Corprojects</SubText>
                  <Field
                    component={Textarea}
                    fullWidth
                    name="dcorprojectsInfo"
                    label="D-corprojects:"
                    value={values.dcorprojectsInfo}
                    onChange={(e: any) => {
                      setFieldValue("dcorprojectsInfo", e.target.value);
                    }}
                    error={Boolean(
                      touched.dcorprojectsInfo && errors.dcorprojectsInfo
                    )}
                    helperText={
                      touched.dcorprojectsInfo && errors.dcorprojectsInfo
                    }
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
                  Verzenden
                </Button>
              </ButtonContainer>
            </Form>
          )}
        </Formik>
      </Container>
      <PDFDownloadLink document={TemplatePdf} fileName="report.pdf">
        <button>export</button>
      </PDFDownloadLink>

      {/* <PDFDownloadLink document={MyDoc} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? "Loading document..." : "Download now!"
        }
      </PDFDownloadLink> */}
    </BaseLayout>
  );
};

export default NewReport;

// const exportPDF = () => {
//   let element = (
//     <div>
//       <div
//         style={{
//           backgroundColor: "green",
//           width: "100%",
//           border: "1px solid black",
//         }}
//       >
//         <p>super</p>
//         <img src={logo} alt="test" style={{ width: "5rem" }} />
//       </div>
//       <h1 style={{ fontSize: "10rem" }}>Report</h1>
//       <h1 style={{ fontSize: "10rem" }}>Report</h1>
//       <h1 style={{ fontSize: "10rem" }}>Report</h1>
//       <h1 style={{ fontSize: "10rem" }}>Report</h1>
//       <h1 style={{ fontSize: "10rem" }}>Report</h1>
//       <p>Super</p>
//       <p>Super</p>
//       <footer>
//         <div style={{ textAlign: "center" }}>
//           Page <span className="pageCounter"></span>/
//           <span className="totalPages"></span>
//         </div>
//       </footer>
//     </div>
//   );
//   const doc = new jsPDF("p", "px", "a4");
//   doc.html(ReactDOMServer.renderToString(element), {
//     callback: function (doc) {
//       doc.save("sample.pdf");
//     },
//     autoPaging: "text",
//     margin: [5, 60, 15, 30],
//   });
// };
