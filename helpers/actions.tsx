import { NextRouter } from 'next/router';
import { client, MUTATION_LOG_IN } from '../apollo';

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

export const appLoginAction = async ({
  identifier,
  password,
}: SecretsInterface) => {
  console.log('loginActions triggered'); //debug

  const response = await client.mutate({
    mutation: MUTATION_LOG_IN,
    variables: { identifier, password },
  });

  return response.data.login;
};

export const redirectAction = ({ router, path }: RedirectInterface) => {
  router.push({
    pathname: path,
  });
};
