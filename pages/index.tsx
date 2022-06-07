import { useEffect } from 'react';
import type { NextPage } from 'next';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo';
// --------------------------------------------------------------------------------
import AppHead from '../components/AppHead';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
import Post from '../components/post/Post';
// --------------------------------------------------------------------------------
import {
  appLoginAction,
  getTrendingTags,
  getTrendingAccounts,
  getFeedData,
} from '../helpers';
import { HomeInterface } from '../interfaces';
import { jwt, tags, accounts, feed } from '../apollo/cache';

const Home: NextPage = ({ taken, hashTags, users, posts }: HomeInterface) => {
  // --------------------------------------------------------------------------------
  // 📌  MAIN APP EXIT COMPONENT
  // --------------------------------------------------------------------------------

  useEffect(() => {
    // 📌 set available initial data to apollo state

    if (taken) jwt(taken);
    if (hashTags) tags(hashTags);
    if (users) accounts(users);
    if (posts) feed(posts);
  }, [taken, hashTags, users, posts]);

  // console.log('🐞 JSON for interfaces', JSON.stringify(posts)); //debug
  // console.log('🐞 props', posts); //debug

  return (
    <ApolloProvider client={client}>
      <AppHead />

      <div className="app-wrapper sailec">
        <div className="nav-container">
          <NavBar />
        </div>
        <div className="content-wrapper">
          <div className="side-bar">
            <SideBar />
          </div>
          <div className="feed-wrapper">
            <Post />
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export const getServerSideProps = async (context: any) => {
  // --------------------------------------------------------------------------------
  // 📌  Server side calls & return via props
  // --------------------------------------------------------------------------------
  let taken: string = '';
  let hashTags = '';
  let users = '';
  let posts = '';

  try {
    // 📌 app login action to retrieve jwt
    taken = await appLoginAction({
      identifier: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    });
    hashTags = await getTrendingTags({ jwt: taken });
    users = await getTrendingAccounts({ jwt: taken });
    posts = await getFeedData({
      jwt: taken,
      startFrom: 0,
      limit: 15, // initial feed size. Config in context
    });
  } catch (error) {
    console.log('🐞 SERVER SIDE ERROR', error);
  }

  return {
    props: {
      taken,
      hashTags,
      users,
      posts,
    },
  };
};

export default Home;
