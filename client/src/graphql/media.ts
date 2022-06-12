import { gql } from "@apollo/client";


export const CREATE_MEDIA = gql`
  mutation ($projectId: Int!, $reportSectionId: Int, $name: String!, $type: String!, $source: String! ) {
    createMedia(createMediaInput: {
      projectId: $projectId
      reportSectionId: $reportSectionId
      name: $name
      type: $type
      source: $source
    }) {
      id
    }
  }
`;

export const REMOVE_MEDIA = gql`
  mutation ($id: Int!){
    removeMedia(id: $id) {
      id
    }
  }
`;