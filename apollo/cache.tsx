import { InMemoryCache, makeVar } from '@apollo/client';

// 📌 Create & initialize reactive variables
export const todosVar = makeVar('hello');

export const cache: InMemoryCache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        todosVar: {
          read() {
            return todosVar();
          },
        },
      },
    },
  },
});
