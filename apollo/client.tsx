import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
const { GRAPHQL_URI } = process.env;

const httpLink = createHttpLink({
  uri: GRAPHQL_URI,
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});
