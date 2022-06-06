export interface TagInterface {
  tagname: string;
  __typename: string;
}
export interface HomeInterface {
  taken: string;
  hasTags: TagInterface;
}
