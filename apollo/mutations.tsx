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

// 📌 get 6 month from now date to pull popular hashtags
let date: Date = new Date();
date.setMonth(date.getMonth() - 6);
let year = date.getFullYear();
let month = date.getMonth() + 1;
let dateString = `${year}-${month}-01`;

export const QUERY_TAGS = gql`
  query getTrendingTags {
    TrendingHashtags(cutoff: "${dateString}") {
      tagname
    }
  }
`;

export const QUERY_TRENDING_ACCOUNTS = gql`
  query getTrendingUsers {
    UsersByScore(limit: 25, where: { lastpost_gt: 0 }) {
      id
      validated
      firstName
      lastName
      username
      picture {
        url
      }
    }
  }
`;

export const QUERY_GET_CHUNK_OF_POSTS = gql`
  query getPosts($draft: Boolean, $startFrom: Int, $limit: Int) {
    postsWithStatistics(
      limit: $limit
      sort: "updated_at:desc"
      start: $startFrom
      where: { draft: $draft }
    ) {
      id
      postType
      title
      body
      people
      planet
      canVolunteer
      AdditionalNotes
      statistics {
        applauds
        commends
        coins
        comments
        shoutouts
      }
      picture {
        url
        mime
        formats
      }
      projectMedia {
        url
        previewUrl
        formats
        mime
      }
      taggedUsers {
        id
      }
      sponsors {
        id
      }
      commentsOnMe {
        id
      }
      known_tags {
        id
        tagname
      }
      user {
        id
        username
        firstName
        lastName
        strapline
        confirmed
        profileType
        validated
        followsme {
          id
        }
        picture {
          url
          formats
        }
        interests {
          id
          picture {
            url
            formats
          }
        }
      }
    }
  }
`;
