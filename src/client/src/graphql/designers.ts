import { gql } from "@apollo/client";

export const GET_ALL_DESIGNERS = gql`
  query {
    designers {
      id
      companyName
      firstName
      lastName
      gender
      email
      gsm
    }
  }
`;