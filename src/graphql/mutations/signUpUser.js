import gql from 'graphql-tag';

export default gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      user {
        id
        firstName
        lastName
        email
        phone
        postalCode
        birthDate
      }
      errors {
        code
        message
      }
    }
  }
`;
