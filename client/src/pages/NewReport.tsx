import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, FieldArray, useFormikContext } from "formik";
import DatePicker from "../components/form/DatePicker";
import { Grid } from "@material-ui/core";
import { CREATE_REPORT, CREATE_REPORT_SECTION } from "../graphql/reports";
import { useMutation, useQuery } from "@apollo/client";
import Textarea from "../components/form/Textarea";
import { Autocomplete, Button, TextField } from "@mui/material";
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
import ImagesSection from "../components/report/ImagesSection";
import { Add, Remove } from "@material-ui/icons";
import { GET_ALL_DESIGNERS } from "../graphql/designers";
import { Media, ValueProp, UploadImageCard } from "../interfaces";
import { GET_ALL_SUBCONTRACTORS } from "../graphql/subcontractor";
import { PROJECT_DETAIL } from "../graphql/projects";
import { CREATE_MEDIA } from "../graphql/media";

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

const SubText = styled.h2`
  font-weight: normal;
  font-size: 1.5rem;
  text-decoration: underline;
  margin-bottom: 1.5rem;
`;

const SubTextOptions = styled.h2`
  font-weight: normal;
  font-size: 1.5rem;
  text-decoration: underline;
  margin-top: 0.75rem;
  margin-bottom: 1.5rem;
`;

const FieldButtonContainer = styled.div`
  @media (min-width: ${(props) => props.theme.width.small}) {
    display: flex;
    align-items: center;
    margin-bottom: 1.5rem;

    > div {
      margin-right: 1.5rem;
    }
  }
`;

const ImageSectionContainer = styled.div`
  margin-top: 1.5rem;
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
  clientImages: yup.array(),
  dcorprojectsInfo: yup
    .string()
    .min(
      10,
      "Deze D-corprojects info is te kort. Dit moet minstens 10 tekens bevatten."
    )
    .required("Dit veld is verplicht!"),
  dcorprojectsImages: yup.array(),
  designers: yup.array().of(
    yup.object().shape({
      designerId: yup.number().min(1).required("Dit veld is verplicht!"),
      companyName: yup.string().min(1).required("Dit veld is verplicht!"),
      text: yup.string().min(10).required("Dit veld is verplicht!"),
      images: yup.array(),
    })
  ),
  subcontractors: yup.array().of(
    yup.object().shape({
      subcontractorId: yup.number().min(1).required("Dit veld is verplicht!"),
      companyName: yup.string().min(1).required("Dit veld is verplicht!"),
      text: yup.string().min(10).required("Dit veld is verplicht!"),
      images: yup.array(),
    })
  ),
});

export interface NewReportProps {}

interface DesignerValues {
  designerId: number;
  companyName: string;
  text: string;
  images: UploadImageCard[];
}
interface SubcontractorValues {
  subcontractorId: number;
  companyName: string;
  text: string;
  images: UploadImageCard[];
}

interface DesignerProp {
  id: number;
  companyName: string;
}
interface SubcontractorProp {
  id: number;
  companyName: string;
}

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
  const { data, loading, error } = useQuery(PROJECT_DETAIL, {
    variables: { id: Number(id) },
  });

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

  let reportId: number | null = null;
  const [createReport] = useMutation(CREATE_REPORT, {
    update: (proxy, mutationResult) => {
      reportId = mutationResult.data.createReport.id;
    },
  });
  let reportSectionId: number | null = null;
  const [createReportSection] = useMutation(CREATE_REPORT_SECTION, {
    update: (proxy, mutationResult) => {
      console.log("reportSection", mutationResult.data.createReportSection);
      reportSectionId = mutationResult.data.createReportSection.id;
    },
  });
  const [CreateMedia] = useMutation(CREATE_MEDIA);
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

        {test.map((text, index) => (
          <Text key={index}>{text}</Text>
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
      {data && dataDesigners && dataSubcontractors && (
        <>
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
                dcorprojectsImages: [],
                designers: [] as DesignerValues[],
                subcontractors: [] as SubcontractorValues[],
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                  console.log("values", values);
                  await createReport({
                    variables: {
                      projectId: Number(id),
                      generalInfo: values.generalInfo,
                      pdf: "pdf",
                      startDate: values.startDate,
                      nextDate: values.nextDate,
                    },
                    refetchQueries: [
                      {
                        query: PROJECT_DETAIL,
                        variables: {
                          id: Number(id),
                        },
                      },
                    ],
                  });

                  if (reportId) {
                    await createReportSection({
                      variables: {
                        reportId: reportId,
                        clientId: data.project.client.id,
                        content: values.clientInfo,
                      },
                    });

                    if (values.designers.length > 0) {
                      values.designers.forEach(async (designer) => {
                        console.log("designer", designer);
                        await createReportSection({
                          variables: {
                            reportId: Number(reportId),
                            designerId: Number(designer.designerId),
                            content: designer.text,
                          },
                        });
                        console.log("why");

                        if (reportSectionId) {
                          values.designers.forEach(async (designer) => {
                            designer.images.forEach(async (image) => {
                              console.log("image", reportSectionId);
                              await CreateMedia({
                                variables: {
                                  projectId: Number(id),
                                  reportSectionId: Number(reportSectionId),
                                  name: image.filename,
                                  type: image.type,
                                  source: image.filename,
                                },
                              });
                            });
                          });
                        }
                      });
                    }
                  }
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
                  <SubText>Algemeen</SubText>
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
                        error={Boolean(
                          touched.generalInfo && errors.generalInfo
                        )}
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
                    <ImagesSection fieldValueString="clientImages" />
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
                    <ImagesSection fieldValueString="dcorprojectsImages" />

                    <Grid item xs={12}>
                      <FieldArray
                        name="designers"
                        render={(arrayHelpers) => (
                          <div>
                            <SubText>Ontwerpers</SubText>
                            {values.designers && values.designers.length > 0 ? (
                              values.designers.map((val, index) => (
                                <div key={index}>
                                  <Grid>
                                    <FieldButtonContainer>
                                      <Grid item xs={12} md={6}>
                                        <Field
                                          component={Autocomplete}
                                          fullWidth
                                          id="designerId"
                                          options={dataDesigners.designers}
                                          onChange={(
                                            e: any,
                                            value: DesignerProp
                                          ) => {
                                            values.designers[
                                              values.designers.length - 1
                                            ].designerId = value.id;
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
                                              label="Ontwerper"
                                              variant="outlined"
                                              error={Boolean(
                                                touched.designers &&
                                                  errors.designers
                                              )}
                                              helperText={
                                                touched.designers &&
                                                errors.designers &&
                                                "Dit is een verplicht veld!"
                                              }
                                            />
                                          )}
                                        />
                                      </Grid>
                                      <Button
                                        sx={{
                                          marginRight: 1,
                                          marginBottom: 2,
                                          marginTop: 1,
                                          color: "#56B13D",
                                          borderColor: "#56B13D",
                                          ":hover": {
                                            bgcolor: "#56B13D",
                                            color: "#FFF",
                                            borderColor: "#56B13D",
                                          },
                                        }}
                                        variant="outlined"
                                        disabled={isSubmitting}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <Remove />
                                      </Button>

                                      <Button
                                        sx={{
                                          margin: 1,
                                          marginBottom: 2,
                                          marginTop: 1,
                                          color: "#56B13D",
                                          borderColor: "#56B13D",
                                          ":hover": {
                                            bgcolor: "#56B13D",
                                            color: "#FFF",
                                            borderColor: "#56B13D",
                                          },
                                        }}
                                        variant="outlined"
                                        disabled={isSubmitting}
                                        onClick={() =>
                                          arrayHelpers.push({
                                            designerId: 0,
                                            companyName: "",
                                            text: "",
                                            images: [],
                                          })
                                        }
                                      >
                                        <Add />
                                      </Button>
                                    </FieldButtonContainer>

                                    <Field
                                      component={Textarea}
                                      name={"designerText"}
                                      onChange={(e: any) => {
                                        values.designers[
                                          values.designers.length - 1
                                        ].text = e.target.value;
                                        setFieldValue(
                                          "designers",
                                          values.designers
                                        );
                                      }}
                                      type="text"
                                      label="Info"
                                      error={Boolean(
                                        touched.subcontractors &&
                                          errors.subcontractors
                                      )}
                                      helperText={
                                        touched.subcontractors &&
                                        errors.subcontractors &&
                                        "Dit is een verplicht veld en moet minstens 10 karakters bevatten!"
                                      }
                                    />
                                    <ImageSectionContainer>
                                      <ImagesSection fieldValueString="designers" />
                                    </ImageSectionContainer>
                                  </Grid>
                                </div>
                              ))
                            ) : (
                              <Button
                                sx={{
                                  color: "#56B13D",
                                  borderColor: "#56B13D",
                                  ":hover": {
                                    bgcolor: "#56B13D",
                                    color: "#FFF",
                                    borderColor: "#56B13D",
                                  },
                                }}
                                variant="outlined"
                                disabled={isSubmitting}
                                onClick={() =>
                                  arrayHelpers.push({
                                    designerId: 0,
                                    text: "",
                                    companyName: "",
                                    images: [],
                                  })
                                }
                              >
                                Voeg ontwerpers toe
                              </Button>
                            )}
                          </div>
                        )}
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <FieldArray
                        name="subcontractors"
                        render={(arrayHelpers) => (
                          <div>
                            <SubTextOptions>Onderaannemers</SubTextOptions>
                            {values.subcontractors &&
                            values.subcontractors.length > 0 ? (
                              values.subcontractors.map((val, index) => (
                                <div key={index}>
                                  <Grid>
                                    <FieldButtonContainer>
                                      <Grid item xs={12} md={6}>
                                        <Field
                                          component={Autocomplete}
                                          fullWidth
                                          id="subcontractorId"
                                          options={
                                            dataSubcontractors.subcontractors
                                          }
                                          onChange={(
                                            e: any,
                                            value: SubcontractorProp
                                          ) => {
                                            values.subcontractors[
                                              values.subcontractors.length - 1
                                            ].subcontractorId = value.id;
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
                                              label="Onderaannemer"
                                              variant="outlined"
                                              error={Boolean(
                                                touched.subcontractors &&
                                                  errors.subcontractors
                                              )}
                                              helperText={
                                                touched.subcontractors &&
                                                errors.subcontractors &&
                                                "Deze is een verplicht veld!"
                                              }
                                            />
                                          )}
                                        />
                                      </Grid>
                                      <Button
                                        sx={{
                                          marginRight: 1,
                                          marginBottom: 2,
                                          marginTop: 1,
                                          color: "#56B13D",
                                          borderColor: "#56B13D",
                                          ":hover": {
                                            bgcolor: "#56B13D",
                                            color: "#FFF",
                                            borderColor: "#56B13D",
                                          },
                                        }}
                                        variant="outlined"
                                        disabled={isSubmitting}
                                        onClick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                      >
                                        <Remove />
                                      </Button>

                                      <Button
                                        sx={{
                                          margin: 1,
                                          marginBottom: 2,
                                          marginTop: 1,
                                          color: "#56B13D",
                                          borderColor: "#56B13D",
                                          ":hover": {
                                            bgcolor: "#56B13D",
                                            color: "#FFF",
                                            borderColor: "#56B13D",
                                          },
                                        }}
                                        variant="outlined"
                                        disabled={isSubmitting}
                                        onClick={() =>
                                          arrayHelpers.push({
                                            subcontractorId: 0,
                                            companyName: "",
                                            text: "",
                                            images: [],
                                          })
                                        }
                                      >
                                        <Add />
                                      </Button>
                                    </FieldButtonContainer>

                                    <Field
                                      component={Textarea}
                                      name={"subcontractorText"}
                                      onChange={(e: any) => {
                                        values.subcontractors[
                                          values.subcontractors.length - 1
                                        ].text = e.target.value;
                                        setFieldValue(
                                          "subcontractors",
                                          values.subcontractors
                                        );
                                      }}
                                      type="text"
                                      label="Info"
                                      error={Boolean(
                                        touched.subcontractors &&
                                          errors.subcontractors
                                      )}
                                      helperText={
                                        touched.subcontractors &&
                                        errors.subcontractors &&
                                        "Dit is een verplicht veld en moet minstens 10 karakters bevatten!"
                                      }
                                    />
                                    <ImageSectionContainer>
                                      <ImagesSection fieldValueString="subcontractors" />
                                    </ImageSectionContainer>
                                  </Grid>
                                </div>
                              ))
                            ) : (
                              <Button
                                sx={{
                                  color: "#56B13D",
                                  borderColor: "#56B13D",
                                  ":hover": {
                                    bgcolor: "#56B13D",
                                    color: "#FFF",
                                    borderColor: "#56B13D",
                                  },
                                }}
                                variant="outlined"
                                disabled={isSubmitting}
                                onClick={() =>
                                  arrayHelpers.push({
                                    subcontractorId: 0,
                                    text: "",
                                    companyName: "",
                                    images: [],
                                  })
                                }
                              >
                                Voeg onderaannemers toe
                              </Button>
                            )}
                          </div>
                        )}
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
        </>
      )}
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
