import { useRouter } from 'next/router';
// import SearchBox from './SearchBox';
import Image from 'next/image';
// CONTEXT -------------------------------------------------------------------
import { redirectAction } from '../helpers';

const NavBar = ({}) => {
  const router = useRouter();

  // HANDLERS ---------------------------------------------------------
  const handleDownloadApp = () => {
    redirectAction({ router, path: `/download` });
  };

  return (
    <div className="flex nav-wrapper">
      <div onClick={handleDownloadApp} style={{ cursor: 'pointer' }}>
        <Image src={'/png/logo.png'} width={118.72} height={24} />
      </div>
      {/* <SearchBox /> */}
      <div className="main-btn" onClick={handleDownloadApp}>
        Download app
      </div>
    </div>
  );
};

export default NavBar;
