import { NextRouter } from 'next/router';
export interface TagInterface {
  tagname: string;
  __typename: string;
}
export interface HomeInterface {
  taken: string;
  hashTags: TagInterface;
  users: AccountsInterface;
  posts: PostInterface;
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
  startFrom?: number;
  limit?: number;
  jwt: string | null;
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

// --------------------------------------------------------------------------------
export interface PostInterface {
  typename: string;
  id: string;
  postType: string;
  title: string;
  body: null | string;
  people: boolean;
  planet: boolean;
  canVolunteer: boolean;
  additionalNotes: null;
  statistics: Statistics;
  picture: Picture;
  projectMedia: any[];
  taggedUsers: any[];
  sponsors: any[];
  commentsOnMe: any[];
  known_tags: any[];
  user: User;
}

export interface Statistics {
  typename: string;
  applauds: number;
  commends: number;
  coins: number;
  comments: number;
  shoutouts: number;
}

export interface Picture {
  typename: string;
  url: string;
  mime?: string;
  formats: Formats | null;
}

export interface Formats {
  thumbnail: ImgParams;
  medium?: ImgParams;
  small?: ImgParams;
  large?: ImgParams;
}
export interface ImgParams {
  name: string;
  hash: string;
  ext: EXT;
  mime: LargeMIME;
  width: number;
  height: number;
  size: number;
  path: null;
  url: string;
}

export interface User {
  typename: string;
  id: string;
  username: string;
  firstName: null | string;
  lastName: null;
  strapline: null | string;
  confirmed: boolean;
  profileType: null | string;
  validated: null | string;
  followsme: Followsme[];
  picture: Picture[];
  interests: any[];
}

export interface Followsme {
  typename: string;
  id: string;
}

export enum EXT {
  JPEG = '.jpeg',
  PNG = '.png',
}

export enum LargeMIME {
  ImageJPEG = 'image/jpeg',
  ImagePNG = 'image/png',
}
// --------------------------------------------------------------------------------

export interface PostByIdInterface {
  jwt: string;
  id: string;
}
