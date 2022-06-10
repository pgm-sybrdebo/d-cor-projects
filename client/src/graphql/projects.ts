import { gql } from "@apollo/client";

export const TOTAL_PROJECTS = gql`
query($name: String!) {
  totalProjects(name: $name)
}
`;

export const TOTAL_ACTIVE_PROJECTS = gql`
query($name: String!) {
  totalActiveProjects(name: $name)
}
`;

export const GET_ALL_PROJECTS_BY_NAME_WITH_PAGINATION = gql`
  query ($name: String!, $sort: String!, $offset: Int!, $limit: Int!) {
    projectsByNameWithPagination(name: $name, sort: $sort, offset: $offset, limit: $limit) {
      id
      name
      description
      street
      houseNumber
      postalCode
      city
      active
    }
  }
`;


export const GET_ALL_ACTIVE_PROJECTS_BY_NAME_WITH_PAGINATION = gql`
  query ($name: String!, $sort: String!, $offset: Int!, $limit: Int!) {
    activeProjectsByNameWithPagination(name: $name, sort: $sort, offset: $offset, limit: $limit) {
      id
      name
      description
      street
      houseNumber
      postalCode
      city
      active
    }
  }
`;


export const UPDATE_PROJECT = gql`
  mutation ($id: Int!, $startDate: Timestamp, $name: String, $description: String, $street: String, $houseNumber: Int, $postalCode: String, $city: String, $active: Boolean) {
    updateProject(
      updateProjectInput: {
        id: $id, 
        name: $name,
        startDate: $startDate,
        description: $description,
        street: $street,
        houseNumber: $houseNumber,
        postalCode: $postalCode,
        city: $city,
        active: $active
      }
    ){
    name
    }
  }
`;

export const PROJECT_DETAIL = gql`
query ($id: Int!) {
  project(id: $id) {
    id
    name
    startDate
    description
    street
    houseNumber
    postalCode
    city
    active

    client {
      id
      name
    }

    subcontractors {
      function
      id
      companyName
      firstName
      lastName
      gsm
      email
    }

    designers {
      id
      companyName
      firstName
      lastName
      gender
    }

    reports {
      created_on 
      pdf
    }

    media {
      id
      name 
      source
      type
    }
  }
}
`;

export const CREATE_PROJECT = gql`
  mutation ($name: String!, $startDate: Timestamp!, $clientId: Int!, $description: String!, $active: Boolean!, $street: String!, $houseNumber: Int!, $postalCode: String!, $city: String! ) {
    createProject(createProjectInput: {
      name: $name,
      startDate: $startDate,
      clientId: $clientId,
      description: $description,
      active: $active,
      street: $street
      houseNumber: $houseNumber,
      postalCode: $postalCode,
      city: $city,
    }) {
      id
    }
  }
`;

export const ADD_SUBCONTRACTOR_TO_PROJECT = gql`
  mutation($projectId: Int!, $subcontractorId: Int!) {
    addSubcontractorToProject(projectId: $projectId, subcontractorId: $subcontractorId) {
      id
    }
  }
`;

export const ADD_DESIGNER_TO_PROJECT = gql`
  mutation($projectId: Int!, $designerId: Int!) {
    addDesignerToProject(projectId: $projectId, designerId: $designerId) {
      id
    }
  }
`;

export const REMOVE_SUBCONTRACTOR_FROM_PROJECT = gql`
  mutation($projectId: Int!, $subcontractorId: Int!) {
    removeSubcontractorFromProject(projectId: $projectId, subcontractorId: $subcontractorId) {
      id
    }
  }
`;


export const REMOVE_DESIGNER_FROM_PROJECT = gql`
  mutation($projectId: Int!, $designerId: Int!) {
    removeDesignerFromProject(projectId: $projectId, designerId: $designerId) {
      id
    }
  }
`;

