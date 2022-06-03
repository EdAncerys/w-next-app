import { NextRouter } from 'next/router';
import { client, MUTATION_LOG_IN, QUERY_ALL_POSTS } from '../apollo';
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

export const redirectAction = ({ router, path }: RedirectInterface) => {
  router.push({
    pathname: path,
  });
};
