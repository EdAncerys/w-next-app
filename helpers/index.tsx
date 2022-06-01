import { client, MUTATION_LOG_IN } from '../apollo';

interface SecretsInterface {
  identifier: string | undefined;
  password: string | undefined;
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
