import type { NextPage } from 'next';
import Image from 'next/image';
// COMPONENTS
import AppHead from '../components/AppHead';
import NavBar from '../components/NavBar';
// 📌 HELPERS
import { appLoginAction } from '../helpers/actions';

const Home: NextPage = ({ jwt, secret }: { jwt: number; secret: string }) => {
  // --------------------------------------------------------------------------------
  // 📌  MAIN APP EXIT COMPONENT
  // --------------------------------------------------------------------------------
  console.log('🐞 jwt ', jwt);

  return (
    <div>
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
    </div>
  );
};

export const getServerSideProps = async (context: any) => {
  console.log('getServerSideProps', context);
  const secret = process.env.GRAPHQL_URI;
  let jwt: string = '';

  try {
    // 📌 app login action to retrieve jwt
    jwt = await appLoginAction({
      identifier: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    });
  } catch (error) {
    console.log('🐞 ', error);
  }

  return {
    props: {
      jwt,
      secret,
    },
  };
};

export default Home;
