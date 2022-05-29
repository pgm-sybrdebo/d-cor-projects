import { gql } from "@apollo/client";

export const TOTAL_CLIENTS = gql`
query($name: String!) {
  totalClientsByName(name: $name)
}
`;

export const GET_ALL_CLIENTS_BY_NAME = gql`
  query ($name: String!, $offset: Int!, $limit: Int!) {
    clientsByName(name: $name, offset: $offset, limit: $limit) {
      id
      name
      firstName
      lastName
      gsm
      email
      street
      houseNumber
      postalCode
      city
      country
      accountNumber
      vatNumber
    }
  }
`;

export const REMOVE_CLIENT = gql`
  mutation ($id: Int!){
    removeClient(id: $id) {
      id
    }
  }
`;