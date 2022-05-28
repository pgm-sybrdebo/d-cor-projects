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
      country
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
      country
      active
    }
  }
`;


export const UPDATE_PROJECT = gql`
  mutation ($id: Int!, $name: String, $description: String, $street: String, $houseNumber: Int, $postalCode: String, $city: String, $country: String, $active: Boolean) {
    updateProject(
      updateProjectInput: {
        id: $id, 
        name: $name,
        description: $description,
        street: $street,
        houseNumber: $houseNumber,
        postalCode: $postalCode,
        city: $city,
        country: $country,
        active: $active
      }
    ){
    name
    }
  }
`;