import Image from 'next/image';
import { useRouter } from 'next/router';
// --------------------------------------------------------------------------------
import { redirectAction, appColors } from '../../helpers';
import { PostInterface } from '../../interfaces';

const UserProfile = ({ post }: PostInterface) => {
  const router = useRouter();
  const { user } = post;
  if (!user) return null;

  let AVATAR = '/../public/img/png/avatar.png';
  if (user.picture.length) AVATAR = user.picture[0].url;

  // HANDLERS ---------------------------------------------------------
  const handleProfileAction = () => {
    redirectAction({ router, path: `/download` });
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
      onClick={handleProfileAction}
    >
      <div
        className="icon"
        style={{
          position: 'relative',
          borderRadius: '50%',
          overflow: 'hidden',
          border: `1px solid ${appColors.silver}`,
        }}
      >
        <Image src={AVATAR} objectFit="cover" width="100%" height="100%" />
      </div>
      <div className="post-username" style={{ padding: '0px 12px' }}>
        @{user.username}
      </div>
      {user.validated === 'yes' && (
        <div className="verified-icon">
          <Image
            src="/icons/badge.svg"
            objectFit="cover"
            width="100%"
            height="100%"
          />
        </div>
      )}
    </div>
  );
};

export default UserProfile;
