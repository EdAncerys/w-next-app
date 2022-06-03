import { useEffect } from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import { ApolloProvider, makeVar } from '@apollo/client';
import { client } from '../apollo';
// COMPONENTS
import AppHead from '../components/AppHead';
import NavBar from '../components/NavBar';
// 📌 HELPERS
import { appLoginAction } from '../helpers';
import { HomeInterface } from '../interfaces';

const Home: NextPage = ({ taken }: HomeInterface) => {
  // --------------------------------------------------------------------------------
  // 📌  MAIN APP EXIT COMPONENT
  // --------------------------------------------------------------------------------

  useEffect(() => {
    // 📌 set available initial data to apollo state
    if (taken) {
      const myVar = makeVar(taken);
    }
  }, [taken]);

  return (
    <ApolloProvider client={client}>
      <AppHead />

      <div className="app-wrapper sailec">
        <div className="nav-container">
          <NavBar />
        </div>
        <div className="content-wrapper pink">
          <div className="side-bar">SideBar</div>
          <div className="feed-wrapper">
            <Image src="/png/wunder.png" width={200} height={200} />
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
          </div>
        </div>
      </div>
    </ApolloProvider>
  );
};

export const getServerSideProps = async (context: any) => {
  console.log('getServerSideProps', context);
  const secret = process.env.GRAPHQL_URI;
  let taken: string = '';

  try {
    // 📌 app login action to retrieve jwt
    taken = await appLoginAction({
      identifier: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    });
  } catch (error) {
    console.log('🐞 ', error);
  }

  return {
    props: {
      taken,
      secret,
    },
  };
};

export default Home;
