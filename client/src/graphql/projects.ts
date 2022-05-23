import { gql } from "@apollo/client";

export const TOTAL_PROJECTS = gql`
query {
  totalProjects
}
`;

export const TOTAL_ACTIVE_PROJECTS = gql`
query {
  totalActiveProjects
}
`;

export const GET_ALL_PROJECTS = gql`
  query {
    projects {
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

export const GET_ALL_PROJECTS_WITH_PAGINATION = gql`
  query ($offset: Int!, $limit: Int!) {
    projectsByPagination(offset: $offset, limit: $limit) {
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

export const GET_ALL_ACTIVE_PROJECTS = gql`
  query {
    activeProjects {
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

export const GET_ALL_ACTIVE_PROJECTS_WITH_PAGINATION = gql`
  query ($offset: Int!, $limit: Int!) {
    activeProjectsByPagination(offset: $offset, limit: $limit) {
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
      