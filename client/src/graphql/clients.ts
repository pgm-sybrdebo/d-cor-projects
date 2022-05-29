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
      gender
      gsm
      email
      street
      houseNumber
      postalCode
      city
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

export const CREATE_CLIENT = gql`
  mutation ($name: String!, $firstName: String!, $lastName: String!, $gender: Int!, $email: String!, $gsm: String!, $street: String!, $houseNumber: Int!, $postalCode: String!, $city: String!, $vatNumber: String!, $accountNumber: String! ) {
    createClient(createClientInput: {
      name: $name,
      firstName: $firstName,
      lastName: $lastName,
      gender: $gender,
      email: $email,
      gsm: $gsm,
      street: $street
      houseNumber: $houseNumber,
      postalCode: $postalCode,
      city: $city,
      vatNumber: $vatNumber,
      accountNumber: $accountNumber,
    }) {
      id
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation ($id: Int!, $name: String, $firstName: String, $lastName: String, $gender: Int, $email: String, $gsm: String, $street: String, $houseNumber: Int, $postalCode: String, $city: String, $vatNumber: String, $accountNumber: String) {
    updateClient(updateClientInput: {
      id: $id,
      name: $name,
      firstName: $firstName,
      lastName: $lastName,
      gender: $gender,
      email: $email,
      gsm: $gsm,
      street: $street
      houseNumber: $houseNumber,
      postalCode: $postalCode,
      city: $city,
      vatNumber: $vatNumber,
      accountNumber: $accountNumber,
    }) {
      id
    }
  }
`;