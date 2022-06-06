import { NextRouter } from 'next/router';
import {
  client,
  MUTATION_LOG_IN,
  QUERY_ALL_POSTS,
  QUERY_TAGS,
  QUERY_TRENDING_ACCOUNTS,
} from '../apollo';
import { jwt } from '../apollo/cache';

// --------------------------------------------------------------------------------
// 📌  Actions Interfaces
// --------------------------------------------------------------------------------
interface SecretsInterface {
  identifier: string | undefined;
  password: string | undefined;
}
interface RedirectInterface {
  router: NextRouter;
  path: string;
}

interface FilterInterface {
  filter: string;
}

interface TakenInterface {
  jwt: string;
}

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

export const redirectAction = ({ router, path }: RedirectInterface) => {
  router.push({
    pathname: path,
  });
};
