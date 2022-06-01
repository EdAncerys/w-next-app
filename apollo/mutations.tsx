import { gql } from '@apollo/client';

export const MUTATION_LOG_IN = gql`
  mutation login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        id
        username
        email
        role {
          name
          type
        }
      }
    }
  }
`;
