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

export const QUERY_ALL_POSTS = gql`
  query postbyscore($startFrom: Int, $withText: String) {
    postsWithStatistics(
      limit: 10
      start: $startFrom
      sort: "score: desc"
      where: { draft: false }
      withTextU: $withText
    ) {
      id
      updated_at
      postType
      canVolunteer
      people
      user {
        id
        username
      }
      picture {
        formats
        mime
        url
      }
      title
      score
    }
  }
`;
