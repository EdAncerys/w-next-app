import {
  client,
  MUTATION_LOG_IN,
  QUERY_ALL_POSTS,
  QUERY_TAGS,
  QUERY_TRENDING_ACCOUNTS,
  QUERY_GET_CHUNK_OF_POSTS,
  QUERY_GET_POST_BY_ID,
} from '../apollo';
import { jwt } from '../apollo/cache';
import {
  FeedInterface,
  SecretsInterface,
  RedirectInterface,
  FilterInterface,
  TakenInterface,
  PostByIdInterface,
} from '../interfaces';

// --------------------------------------------------------------------------------
// 📌  Actions Interfaces
// --------------------------------------------------------------------------------

export const appLoginAction = async ({
  identifier,
  password,
}: SecretsInterface) => {
  console.log('loginActions triggered'); //debug

  const response = await client.mutate({
    mutation: MUTATION_LOG_IN,
    variables: { identifier, password },
  });

  if (response) {
    return response.data.login.jwt;
  } else {
    return null;
  }
};

export const getPostsWithFilter = async ({ filter }: FilterInterface) => {
  console.log('getPostsWithFilter triggered'); //debug

  try {
    if (!jwt) throw new Error('No jwt provided');
    // 📌 get all posts where words match and add to context
    const response = await client.query({
      query: QUERY_ALL_POSTS,
      variables: { withText: filter, startFrom: 0 },
      context: {
        headers: {
          authorization: 'Bearer ' + jwt(),
        },
      },
    });

    if (response) {
      return response.data.postsWithStatistics;
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
  }
};

export const getTrendingTags = async ({ jwt }: TakenInterface) => {
  try {
    console.log('getTrendingTags triggered'); //debug
    if (!jwt) throw new Error('No taken provided');

    //1. get all posts and add to context
    const response = await client.query({
      query: QUERY_TAGS,
      context: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
      },
    });

    if (!response) throw new Error('Failed to get trending tags');

    return response.data.TrendingHashtags;
  } catch (err) {
    console.log('err', JSON.stringify(err)); //debug
  }
};

export const getTrendingAccounts = async ({ jwt }: TakenInterface) => {
  try {
    console.log('getTrendingAccounts triggered'); //debug
    if (!jwt) throw new Error('No taken provided');

    //1. get all posts and add to context
    const response = await client.query({
      query: QUERY_TRENDING_ACCOUNTS,
      context: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
      },
    });

    if (!response) throw new Error('Failed to get trending accounts');

    return response.data.UsersByScore;
  } catch (err) {
    console.log('err', JSON.stringify(err)); //debug
  }
};

export const getFeedData = async ({ startFrom, limit, jwt }: FeedInterface) => {
  console.log('getFeedData triggered'); //debug

  try {
    // --------------------------------------------------------------------------------
    // 📌  feed data fetch action
    // params past via props to amend fetch query parameters
    // --------------------------------------------------------------------------------
    if (!jwt) throw new Error('No app taken not provided.');

    const response = await client.query({
      query: QUERY_GET_CHUNK_OF_POSTS,
      variables: { startFrom, draft: false, limit: limit || 5 }, // draft as default value
      fetchPolicy: 'network-only',
      context: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
      },
    });
    if (!response) throw new Error('Failed to get response');
    // ⬇️  get post data
    const data = response.data.postsWithStatistics;

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const redirectAction = ({ router, path }: RedirectInterface) => {
  router.push(path);
};

export const giveMediaType = (mime: string | undefined) => {
  if (mime === undefined) return;

  const myArr = mime.split('/');
  return myArr[0] === 'image' ? false : true;
};

export const getOnePostById = async ({ id, jwt }: PostByIdInterface) => {
  console.log('getOnePostByIdAction triggered'); //debug

  try {
    if (!jwt) throw new Error('No app taken not provided.');

    const getPostByIdResponse = await client.query({
      query: QUERY_GET_POST_BY_ID,
      variables: { id },
      context: {
        headers: {
          authorization: 'Bearer ' + jwt,
        },
      },
    });

    const post = getPostByIdResponse.data.postsWithStatistics[0];

    return post;
  } catch (error) {
    console.log(error);
  }
};
