import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import Image from 'next/image';
import { isAndroid, isIOS } from 'react-device-detect';
// --------------------------------------------------------------------------------
import { appColors } from '../helpers';

const HomeScreen = ({}) => {
  const router = useRouter();

  // HANDLERS -----------------------------------------------------------------------
  const handleClosePostAction = () => {
    const path = `/`;
    router.push(path);
  };

  const handleGetApp = () => {
    let path = 'https://skylarkcreative.co.uk/';
    // 📌 redirect to path in new window
    window.open(path, '_blank');
  };

  // SERVERS ---------------------------------------------------------------------
  const ServeClosePost = () => {
    return (
      <div className="download-close-icon">
        <div
          className="btn-icon flex"
          style={{
            backgroundColor: appColors.black,
            color: appColors.white,
            borderRadius: '50%',
            padding: 5,
          }}
          onClick={handleClosePostAction}
        >
          <CloseIcon
            style={{
              fontSize: 28,
            }}
          />
        </div>
      </div>
    );
  };

  const ServeContent = () => {
    return (
      <div className="flex-col download-content">
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            paddingBottom: '1em',
          }}
        >
          Install App
        </div>
        <div
          style={{
            fontSize: 24,
            fontWeight: 400,
            padding: '2em 0',
          }}
        >
          This action is not supported on the current platform. Please install
          the app using your mobile device.
        </div>
        <div className="app-devices">
          <ServeDevice />
          <ServeDevice isAndroid />
        </div>

        <div className="app-devices download-app-logo">
          <Image src={'/svg/logo.svg'} width={200} height={44} />
        </div>
      </div>
    );
  };

  const ServeDevice = ({ isAndroid }) => {
    let deviceIcon = '/icons/Apple.svg';
    if (isAndroid) deviceIcon = '/icons/Android.svg';

    return (
      <div style={{ cursor: 'pointer' }}>
        <Image
          src={deviceIcon}
          width="250"
          height="100%"
          onClick={handleGetApp}
        />
      </div>
    );
  };

  return (
    <div className="app-wrapper">
      <ServeClosePost />
      <ServeContent />

      <Image
        src="/png/downloadScreen.png"
        alt="Download Wunder App"
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        // Must be a base64-encoded image or a data URI
        blurDataURL={
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsqgcAAYkBA6rFAegAAAAASUVORK5CYII='
        }
      />
    </div>
  );
};

export default HomeScreen;
