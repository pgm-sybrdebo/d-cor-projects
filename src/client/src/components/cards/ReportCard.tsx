import { useLazyQuery, useMutation } from "@apollo/client";
import { Delete } from "@material-ui/icons";
import styled from "styled-components";
import { PROJECT_DETAIL } from "../../graphql/projects";

import { FaFilePdf, FaPen } from "react-icons/fa";
import {
  GET_ALL_REPORT_SECTIONS_WITH_CLIENT_ID,
  GET_ALL_REPORT_SECTIONS_WITH_DESIGNER_ID,
  GET_ALL_REPORT_SECTIONS_WITH_SUBCONTRACTOR_ID,
  REMOVE_REPORT,
} from "../../graphql/reports";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfOpenDocument } from "../pdf/TemplateOpenPdf";

const Container = styled.li`
  position: relative;
  border-radius: ${(props) => props.theme.borderRadius.small};
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: ${(props) => props.theme.borderRadius.circle};
  color: ${(props) => props.theme.colors.black};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    color: ${(props) => props.theme.colors.primaryAccentColor};
    transform: scale(1.2);
  }
`;

const PdfIcon = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  display: flex;
  width: 10rem;
  padding: 2rem 0;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  border-radius: ${(props) => props.theme.borderRadius.small}
    ${(props) => props.theme.borderRadius.small} 0 0;

  svg {
    font-size: 3rem;
    color: ${(props) => props.theme.colors.black};
  }
`;

const NameReport = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  padding: 0.5rem;
  text-align: center;
  max-width: 10rem;
  min-width: 10rem;
  min-height: 4rem;

  border-radius: 0 0 ${(props) => props.theme.borderRadius.small}
    ${(props) => props.theme.borderRadius.small};

    span {
      color: ${(props) => props.theme.colors.black};
      font-size: ${(props) => props.theme.fontSizes.normal};
      text-decoration: underline;
  
      &:hover {
        color: #319716;
      }
`;

const EditButton = styled.button`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  height: 2rem;
  min-width: 2rem;
  min-height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${(props) => props.theme.colors.black};
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  margin: 0 auto;

  &:hover {
    color: ${(props) => props.theme.colors.primaryAccentColor};
    transform: scale(1.2);
  }
`;

const FalseButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
`;

const PDFContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.darkGrey};
  padding: 0.5rem;
  text-align: center;
  max-width: 10rem;
  min-width: 10rem;
  min-height: 4rem;
  border-radius: 0 0 ${(props) => props.theme.borderRadius.small}
    ${(props) => props.theme.borderRadius.small};

  span {
    color: ${(props) => props.theme.colors.black};
    font-size: ${(props) => props.theme.fontSizes.normal};
    text-decoration: underline;

    &:hover {
      color: #319716;
    }
  }
`;

export interface ReportCardProps {
  id: number;
  name: string;
  projectId: number;
  number: number;
  startDate: EpochTimeStamp;
  nextDate: EpochTimeStamp;
  dcorprojects: string;
  generalInfo: string;
  projectName: string;
  projectStreet: string;
  projectCity: string;
  projectHouseNumber: number;
}

const ReportCard = ({
  id,
  name,
  projectId,
  number,
  startDate,
  nextDate,
  dcorprojects,
  generalInfo,
  projectName,
  projectStreet,
  projectHouseNumber,
  projectCity,
}: ReportCardProps) => {
  const [deleteReport] = useMutation(REMOVE_REPORT);
  const [
    getAllReportSectionsWithDesignerId,
    { data: designersData, error: designersError },
  ] = useLazyQuery(GET_ALL_REPORT_SECTIONS_WITH_DESIGNER_ID);
  const [getAllReportSectionsWithSubcontractorId, { error, data }] =
    useLazyQuery(GET_ALL_REPORT_SECTIONS_WITH_SUBCONTRACTOR_ID);
  const [
    getAllReportSectionsWithClientId,
    { data: clientsData, error: clientsError },
  ] = useLazyQuery(GET_ALL_REPORT_SECTIONS_WITH_CLIENT_ID);

  const handleDeleteReport = async (id: number) => {
    await deleteReport({
      variables: {
        id,
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
  };

  const getReportData = async () => {
    await getAllReportSectionsWithSubcontractorId({
      variables: {
        reportId: id,
      },
    });
    await getAllReportSectionsWithDesignerId({
      variables: {
        reportId: id,
      },
    });
    await getAllReportSectionsWithClientId({
      variables: {
        reportId: id,
      },
    });
  };

  return (
    <Container key={id}>
      <PdfIcon>
        <FaFilePdf />
      </PdfIcon>
      {(!data || !designersData || !clientsData) && (
        <FalseButton onClick={getReportData}>
          <NameReport>
            <span>{name}</span>
          </NameReport>
        </FalseButton>
      )}
      {/* {(loading || designersLoading || clientsLoading) && (
        <FalseButton onClick={getReportData}>
          <NameReport>
            <span>{name}</span>
          </NameReport>
        </FalseButton>
      )} */}
      {error ||
        designersError ||
        (clientsError && <p>Er is iets fout gelopen</p>)}
      {data && designersData && clientsData && (
        <PDFContainer>
          <PDFDownloadLink
            document={
              <PdfOpenDocument
                subcontractors={data.findAllSubcontractorsByReportId}
                designers={designersData.findAllDesignersByReportId}
                client={clientsData.findAllClientsByReportId[0]}
                number={number}
                startDate={startDate}
                nextDate={nextDate}
                dcorprojects={dcorprojects}
                generalInfo={generalInfo}
                projectName={projectName}
                projectStreet={projectStreet}
                projectHouseNumber={projectHouseNumber}
                projectCity={projectCity}
              />
            }
            fileName={`${name}.pdf`}
          >
            <span>Download</span>
          </PDFDownloadLink>
        </PDFContainer>
      )}
      {/* <PDFDownloadLink
        document={
          <PdfDocument
            data={getReportData}
            reportNumber={2}
            projectName={"test"}
            clientName={"test"}
            projectStreet={"test"}
            projectHouseNumber={3}
            projectCity={"test"}
          />
        }
        fileName={`${name}.pdf`}
      >
        <NameReport>
          <span>{name}</span>
        </NameReport>
      </PDFDownloadLink> */}
      <DeleteButton type="button" onClick={() => handleDeleteReport(id)}>
        <Delete />
      </DeleteButton>
      <EditButton>
        <FaPen />
      </EditButton>
    </Container>
  );
};

export default ReportCard;
