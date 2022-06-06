import { InMemoryCache, makeVar } from '@apollo/client';
import { TagInterface, AccountsInterface, PostInterface } from '../interfaces';

// --------------------------------------------------------------------------------
// 📌 Create & initialize reactive variables
// --------------------------------------------------------------------------------

export const jwt = makeVar<string | null>(null);
export const tags = makeVar<TagInterface | null>(null);
export const accounts = makeVar<AccountsInterface | null>(null);
export const feed = makeVar<PostInterface | null>(null);

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
        tags() {
          return tags();
        },
        accounts() {
          return accounts();
        },
        feed() {
          return feed();
        },
      },
    },
  },
});
