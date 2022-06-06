import { useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo';
// COMPONENTS
import AppHead from '../components/AppHead';
import NavBar from '../components/NavBar';
import SideBar from '../components/SideBar';
// 📌 HELPERS
import { appLoginAction, getTrendingTags } from '../helpers';
import { HomeInterface } from '../interfaces';
import { jwt, tags } from '../apollo/cache';

const Home: NextPage = ({ taken, hasTags }: HomeInterface) => {
  // --------------------------------------------------------------------------------
  // 📌  MAIN APP EXIT COMPONENT
  // --------------------------------------------------------------------------------

  useEffect(() => {
    // 📌 set available initial data to apollo state
    if (taken) jwt(taken);
    if (hasTags) tags(hasTags);
  }, [taken]);

  // console.log('🐞 tags', hasTags);

  return (
    <ApolloProvider client={client}>
      <AppHead />

      <div className="app-wrapper sailec">
        <div className="nav-container">
          <NavBar />
        </div>
        <div className="content-wrapper pink">
          <div className="side-bar">
            <SideBar />
          </div>
          <div className="feed-wrapper">
            <Image src="/png/wunder.png" width={200} height={200} />
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div
              className="main-btn"
              onClick={() => {
                // get random number from 1 to 10
                const random = Math.floor(Math.random() * 10) + 1;
              }}
            >
              update
            </div>
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
  let hasTags = '';

  try {
    // 📌 app login action to retrieve jwt
    taken = await appLoginAction({
      identifier: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    });
    hasTags = await getTrendingTags({ jwt: taken });
  } catch (error) {
    console.log('🐞 SERVER SIDE ERROR', error);
  }

  return {
    props: {
      taken,
      hasTags,
    },
  };
};

export default Home;
