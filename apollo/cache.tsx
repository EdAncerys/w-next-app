import { InMemoryCache, makeVar } from '@apollo/client';

// --------------------------------------------------------------------------------
// 📌 Create & initialize reactive variables
// --------------------------------------------------------------------------------
export const jwt = makeVar<string | null>(null);
export const secret = makeVar<string | null>(null);

// --------------------------------------------------------------------------------
// 📌  Add to apollo cash reactive variables
// --------------------------------------------------------------------------------
export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        jwt() {
          return jwt();
        },
        secret() {
          return secret();
        },
      },
    },
  },
});
