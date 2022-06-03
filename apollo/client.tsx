import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
