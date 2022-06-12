import styled from "styled-components";
import { useState } from "react";
import BaseLayout from "../layouts/BaseLayout";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { Formik, Form, Field, FieldArray } from "formik";
import DatePicker from "../components/form/DatePicker";
import { Grid } from "@material-ui/core";
import {
  CREATE_REPORT,
  CREATE_REPORT_SECTION,
  UPDATE_REPORT,
} from "../graphql/reports";
import { useMutation, useQuery } from "@apollo/client";
import Textarea from "../components/form/Textarea";
import { Autocomplete, Button, TextField } from "@mui/material";
import { PDFDownloadLink } from "@react-pdf/renderer";
import ImagesSection from "../components/report/ImagesSection";
import { Add, Remove } from "@material-ui/icons";
import { GET_ALL_DESIGNERS } from "../graphql/designers";
import { UploadImageCard, ReportForm } from "../interfaces";
import { GET_ALL_SUBCONTRACTORS } from "../graphql/subcontractor";
import { PROJECT_DETAIL } from "../graphql/projects";
import { CREATE_MEDIA } from "../graphql/media";
import { PdfDocument } from "../components/pdf/TemplatePdf";
import Loading from "../components/layout/Loading";
import PrimaryLink from "../components/form/PrimaryLink";

const Title = styled.h1`
  margin-bottom: 3rem;
`;

const Container = styled.div`
  max-width: ${(props) => props.theme.width.medium};
  margin: 0 auto;
  margin-bottom: 1.5rem;
`;

const ButtonContainer = styled.div`
  margin-top: 3rem;

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

const PDFContainer = styled.div`
  display: flex;
  margin-top: 3rem;
  margin-bottom: 2rem;
  justify-content: center;

  a {
    text-decoration: none;
    padding: 0.25rem 1rem;
    color: #fff;
    text-align: center;
    background-color: #56b13d;
    border: 2px solid #56b13d;
    border-radius: 3px;
    width: 15rem;

    &:hover {
      background-color: #fff;
      color: #56b13d;
    }
  }
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

interface DesignerValues {
  designerId: number;
  companyName: string;
  firstName: string;
  lastName: string;
  gender: number;
  email: string;
  gsm: string;
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
  firstName: string;
  lastName: string;
  gender: number;
  email: string;
  gsm: string;
}
interface SubcontractorProp {
  id: number;
  companyName: string;
}

const NewReport = () => {
  let { id } = useParams<{ id: string }>();
  const [formValues, setFormValues] = useState<ReportForm>({
    startDate: new Date(),
    nextDate: new Date(),
    generalInfo: "",
    clientInfo: "",
    clientImages: [],
    dcorprojectsInfo: "",
    designers: [],
    subcontractors: [],
  });
  const [pdfReady, setPdfReady] = useState(false);
  const [reportNumber, setReportNumber] = useState<number>(0);
  const [timer, setTimer] = useState<any>(null);
  const navigate = useNavigate();

  const {
    data: projectData,
    loading: projectLoading,
    error: projectError,
  } = useQuery(PROJECT_DETAIL, {
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

  const [updateReport] = useMutation(UPDATE_REPORT);

  const [createReport, { loading: reportLoading }] = useMutation(
    CREATE_REPORT,
    {
      onCompleted: async (data: any) => {
        await setReportNumber(data.createReport.number);
        console.log("*******", data.createReport);
        await updateReport({
          variables: {
            id: data.createReport.id,
            pdf: `${data.createReport.pdf}-${data.createReport.number}`,
          },
        });
        await createReportSection({
          variables: {
            reportId: Number(data.createReport.id),
            clientId: Number(projectData.project.client.id),
            content: formValues?.clientInfo,
          },
        });
        formValues?.designers.forEach(async (designer: DesignerValues) => {
          await createReportSection({
            variables: {
              reportId: Number(data.createReport.id),
              designerId: Number(designer.designerId),
              content: designer.text,
            },
          });
        });

        formValues?.subcontractors.forEach(
          async (subcontractor: SubcontractorValues) => {
            await createReportSection({
              variables: {
                reportId: Number(data.createReport.id),
                subcontractorId: Number(subcontractor.subcontractorId),
                content: subcontractor.text,
              },
            });
          }
        );
      },
    }
  );
  const [createReportSection, { loading: reportSectionLoading }] = useMutation(
    CREATE_REPORT_SECTION,
    {
      onCompleted: (data: any) => {
        if (data.createReportSection.designerId) {
          const imgs = formValues?.designers.find(
            (designer: DesignerValues) => {
              return (
                designer.designerId === data.createReportSection.designerId
              );
            }
          )?.images;

          imgs.forEach(async (img: UploadImageCard) => {
            await CreateMedia({
              variables: {
                projectId: Number(id),
                reportSectionId: Number(data.createReportSection.id),
                name: img.filename,
                type: img.type,
                source: img.filename,
              },
            });
          });
        }
        if (data.createReportSection.subcontractorId) {
          const imgs = formValues?.subcontractors.find(
            (subcontractor: SubcontractorValues) => {
              return (
                subcontractor.subcontractorId ===
                data.createReportSection.subcontractorId
              );
            }
          )?.images;

          imgs.forEach(async (img: UploadImageCard) => {
            await CreateMedia({
              variables: {
                projectId: Number(id),
                reportSectionId: Number(data.createReportSection.id),
                name: img.filename,
                type: img.type,
                source: img.filename,
              },
            });
          });
        }
        if (data.createReportSection.clientId) {
          formValues?.clientImages.forEach(async (img: UploadImageCard) => {
            await CreateMedia({
              variables: {
                projectId: Number(id),
                reportSectionId: Number(data.createReportSection.id),
                name: img.filename,
                type: img.type,
                source: img.filename,
              },
            });
          });
        }
      },
    }
  );
  const [CreateMedia, { loading: mediaLoading }] = useMutation(CREATE_MEDIA);

  if (
    mediaLoading ||
    reportSectionLoading ||
    reportLoading ||
    projectLoading ||
    loadingDesigners ||
    loadingSubcontractors
  ) {
    return (
      <BaseLayout>
        <Loading />
      </BaseLayout>
    );
  }

  if (projectError || errorDesigners || errorSubcontractors) {
    return (
      <BaseLayout>
        <p>Er is iets fout gelopen!</p>
      </BaseLayout>
    );
  }

  return (
    <BaseLayout>
      {projectData && dataDesigners && dataSubcontractors && !pdfReady && (
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
                designers: [] as DesignerValues[],
                subcontractors: [] as SubcontractorValues[],
              }}
              onSubmit={async (values, { setSubmitting }) => {
                setSubmitting(true);
                try {
                  console.log("values", values);
                  await setFormValues(values);
                  console.log("why", projectData.project.data);
                  await createReport({
                    variables: {
                      projectId: Number(id),
                      generalInfo: values.generalInfo,
                      dcorprojects: values.dcorprojectsInfo,
                      pdf: projectData.project.name,
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

                  setPdfReady(true);
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
                                            values.designers[
                                              values.designers.length - 1
                                            ].firstName = value.firstName;
                                            values.designers[
                                              values.designers.length - 1
                                            ].lastName = value.lastName;
                                            values.designers[
                                              values.designers.length - 1
                                            ].gender = value.gender;
                                            values.designers[
                                              values.designers.length - 1
                                            ].email = value.email;
                                            values.designers[
                                              values.designers.length - 1
                                            ].gsm = value.gsm;
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
                                            gsm: "",
                                            email: "",
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
                                        if (timer) {
                                          clearTimeout(timer);
                                          setTimer(null);
                                        }
                                        setTimer(
                                          setTimeout(() => {
                                            values.designers[
                                              values.designers.length - 1
                                            ].text = e.target.value;
                                            setFieldValue(
                                              "designers",
                                              values.designers
                                            );
                                          }, 3000)
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
                                    gsm: "",
                                    email: "",
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
                                        setTimeout(() => {
                                          values.subcontractors[
                                            values.subcontractors.length - 1
                                          ].text = e.target.value;
                                          setFieldValue(
                                            "subcontractors",
                                            values.subcontractors
                                          );
                                        }, 3000);
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
                      Creëer PDF
                    </Button>
                  </ButtonContainer>
                </Form>
              )}
            </Formik>
          </Container>
        </>
      )}
      {/* <PDFDownloadLink document={TemplatePdf} fileName="report.pdf">
        <button>export</button>
      </PDFDownloadLink> */}
      {pdfReady &&
        !reportLoading &&
        !reportSectionLoading &&
        !mediaLoading &&
        !projectLoading &&
        !loadingDesigners &&
        !loadingSubcontractors && (
          <PDFContainer>
            <PDFDownloadLink
              document={
                <PdfDocument
                  data={formValues}
                  reportNumber={reportNumber}
                  projectName={projectData.project.name}
                  clientName={projectData.project.client.name}
                  projectStreet={projectData.project.street}
                  projectHouseNumber={projectData.project.houseNumber}
                  projectCity={projectData.project.city}
                />
              }
              fileName={`${projectData.project.name}-${reportNumber}.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download Pdf"
              }
            </PDFDownloadLink>
          </PDFContainer>
        )}
      <PrimaryLink onClick={() => navigate(-1)}>Ga terug</PrimaryLink>
    </BaseLayout>
  );
};

export default NewReport;
