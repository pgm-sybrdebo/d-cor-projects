import { gql } from "@apollo/client";

export const TOTAL_SUBCONTRACTORS = gql`
query($companyName: String!, $func: String!) {
  totalSubcontractorsByCompanyName(companyName: $companyName, func: $func)
}
`;

export const GET_ALL_SUBCONTRACTORS = gql`
  query {
    subcontractors {
      id
      companyName
    }
  }
`;


export const GET_ALL_SUBCONTRACTORS_BY_COMPANY_NAME = gql`
  query ($companyName: String!, $func: String!, $offset: Int!, $limit: Int!) {
    subcontractorsByCompanyName(companyName: $companyName, func: $func, offset: $offset, limit: $limit) {
      id
      companyName
      firstName
      lastName
      gender
      function
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

export const REMOVE_SUBCONTRACTOR = gql`
  mutation ($id: Int!){
    removeSubcontractor(id: $id) {
      id
    }
  }
`;

export const CREATE_SUBCONTRACTOR = gql`
  mutation ($companyName: String!, $firstName: String!, $lastName: String!, $gender: Int!, $function: String!, $email: String!, $gsm: String!, $street: String!, $houseNumber: Int!, $postalCode: String!, $city: String!, $vatNumber: String!, $accountNumber: String! ) {
    createSubcontractor(createSubcontractorInput: {
      companyName: $companyName,
      firstName: $firstName,
      lastName: $lastName,
      gender: $gender,
      function: $function,
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

export const UPDATE_SUBCONTRACTOR = gql`
  mutation ($id: Int!, $companyName: String, $firstName: String, $lastName: String, $gender: Int, $function: String, $email: String, $gsm: String, $street: String, $houseNumber: Int, $postalCode: String, $city: String, $vatNumber: String, $accountNumber: String) {
    updateSubcontractor(updateSubcontractorInput: {
      id: $id,
      companyName: $companyName,
      firstName: $firstName,
      lastName: $lastName,
      gender: $gender,
      function: $function,
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