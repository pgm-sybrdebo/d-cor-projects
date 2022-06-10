import { gql } from "@apollo/client";


export const CREATE_REPORT = gql`
  mutation ($projectId: Int!, $generalInfo: String!, $pdf: String!, $startDate: Timestamp!, $nextDate: Timestamp!) {
    createReport(createReportInput: {
      projectId: $projectId,
      generalInfo: $generalInfo,
      pdf: $pdf,
      startDate: $startDate,
      nextDate: $nextDate,
    }) {
      id
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
    }
  }
`;
