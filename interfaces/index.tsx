export interface TagInterface {
  tagname: string;
  __typename: string;
}
export interface HomeInterface {
  taken: string;
  hasTags: TagInterface;
}

// --------------------------------------------------------------------------------
export interface AccountsInterface {
  __typename: string;
  id: string;
  validated: Validated | null;
  firstName: string;
  lastName: null | string;
  username: string;
  picture: Picture[];
}

export interface Picture {
  __typename: string;
  url: string;
}

export enum Validated {
  No = 'no',
  Yes = 'yes',
}
// --------------------------------------------------------------------------------

export interface FeedInterface {
  startFrom: number;
  limit: number;
  jwt: string;
}

export interface SecretsInterface {
  identifier: string | undefined;
  password: string | undefined;
}
export interface RedirectInterface {
  router: NextRouter;
  path: string;
}

export interface FilterInterface {
  filter: string;
}

export interface TakenInterface {
  jwt: string;
}
