import { gql } from "@apollo/client";


export const CREATE_REPORT = gql`
  mutation ($projectId: Int!, $number: Int!, $generalInfo: String!, $pdf: String!) {
    createProject(createProjectInput: {
      projectId: $projectId,
      number: $number,
      generalInfo: $generalInfo,
      pdf: $pdf,
    }) {
      id
    }
  }
`;
