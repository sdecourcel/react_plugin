import gql from 'graphql-tag';

export default gql`
  mutation resendPhoneConfirmation($input: ResendPhoneConfirmationInput!) {
    resendPhoneConfirmation(input: $input) {
      errors {
        message
        code
      }
    }
  }
`;
