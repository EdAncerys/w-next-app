import { InMemoryCache, makeVar } from '@apollo/client';

interface TakenInterface {
  jwt: string | null;
}

// 📌 Create & initialize reactive variables
export const jwt = makeVar<string | null>(null);

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        jwt() {
          return jwt();
        },
      },
    },
  },
});
