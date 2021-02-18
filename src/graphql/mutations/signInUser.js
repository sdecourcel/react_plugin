import gql from 'graphql-tag';

export default gql`
  mutation signInUser($input: SignInUserInput!) {
    signInUser(input: $input) {
      user {
        id
        firstName
        lastName
        phone
        email
      }
      token
      errors {
        code
        message
      }
    }
  }
`;
