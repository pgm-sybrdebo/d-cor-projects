import { gql } from "@apollo/client";


export const CREATE_REPORT = gql`
  mutation ($projectId: Int!, $generalInfo: String!, $dcorprojects: String!, $pdf: String!, $startDate: Timestamp!, $nextDate: Timestamp!) {
    createReport(createReportInput: {
      projectId: $projectId,
      generalInfo: $generalInfo,
      dcorprojects: $dcorprojects,
      pdf: $pdf,
      startDate: $startDate,
      nextDate: $nextDate,
    }) {
      id
      projectId
      number
      created_on
      pdf
    }
  }
`;

export const CREATE_REPORT_SECTION = gql`
  mutation ($reportId: Int!, $clientId: Int, $subcontractorId: Int, $designerId: Int, $content: String! ) {
    createReportSection(createReportSectionInput: {
      reportId: $reportId
      clientId: $clientId
      subcontractorId: $subcontractorId
      designerId: $designerId
      content: $content
    }) {
      id
      clientId
      subcontractorId
      designerId
    }
  }
`;

export const REMOVE_REPORT = gql`
mutation($id: Int!) {
  removeReport(id: $id) {
    id
  }
}`;


export const GET_ALL_REPORT_SECTIONS_WITH_SUBCONTRACTOR_ID = gql`
  query($reportId: Int!) {
    findAllSubcontractorsByReportId(reportId: $reportId) {
      id
      content
      media {
        source
      }
      subcontractor {
        companyName
      }
    }
  }
`;

export const GET_ALL_REPORT_SECTIONS_WITH_DESIGNER_ID = gql`
  query($reportId: Int!) {
    findAllDesignersByReportId(reportId: $reportId) {
      id
      content
      media {
        source
      }
      designer {
        companyName
        gsm
        email
        firstName
        lastName
        gender
      }
    }
  }
`;

export const GET_ALL_REPORT_SECTIONS_WITH_CLIENT_ID = gql`
  query($reportId: Int!) {
    findAllClientsByReportId(reportId: $reportId) {
      id
      content
      media {
        source
      }
      client {
        name
      }
    }
  }
`;


export const UPDATE_REPORT = gql`
  mutation ($id: Int!, $startDate: Timestamp, $nextDate: Timestamp, $generalInfo: String, $dcorprojects: String, $pdf: String, $projectId: Int) {
    updateReport(
      updateReportInput: {
        id: $id, 
        projectId: $projectId,
        startDate: $startDate,
        nextDate: $nextDate,
        generalInfo: $generalInfo,
        dcorprojects: $dcorprojects,
        pdf: $pdf,
      }
    ){
    pdf
    }
  }
`;