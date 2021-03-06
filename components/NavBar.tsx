import { useRouter } from 'next/router';
import AppSearch from './AppSearch';
import Image from 'next/image';
// CONTEXT
import { redirectAction } from '../helpers';

const NavBar = ({}) => {
  const router = useRouter();

  // HANDLERS
  const handleDownloadApp = () => {
    redirectAction({ router, path: `/download` });
  };

  return (
    <div className="flex nav-wrapper">
      <div onClick={handleDownloadApp} style={{ cursor: 'pointer' }}>
        <Image alt="wunder" src={'/svg/logo.svg'} width={118.72} height={24} />
      </div>
      <AppSearch />
      <div className="main-btn" onClick={handleDownloadApp}>
        Download app
      </div>
    </div>
  );
};

export default NavBar;
