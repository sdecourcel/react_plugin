import gql from 'graphql-tag';

export default gql`
  mutation confirmPhoneNumber($input: ConfirmPhoneNumberInput!) {
    confirmPhoneNumber(input: $input) {
      user {
        id
        firstName
        lastName
        phone
        email
      }
      token
      errors {
        message
        code
      }
    }
  }
`;
