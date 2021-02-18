import gql from 'graphql-tag';

export default gql`
  mutation updateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      user {
        id
        firstName
        lastName
        email
        phone
      }
      errors {
        attribute
        message
      }
      confirmed
    }
  }
`;
