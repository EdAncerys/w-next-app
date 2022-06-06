import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useReactiveVar } from '@apollo/client';
// --------------------------------------------------------------------------------
import { accounts } from '../apollo/cache';
import { redirectAction, appColors } from '../helpers';

const TrendingAccounts = ({}) => {
  const router = useRouter();

  const [posts, setPost] = useState<null | string>(null);
  const iconWidth = 40;
  const contextAccounts = useReactiveVar(accounts);

  // HELPERS
  const handleDownloadApp = () => {
    // redirectAction({ router, path: `/download` });
    console.log('🐞  get app');
  };

  useEffect(() => {
    if (contextAccounts) setPost(contextAccounts);
  }, [contextAccounts]);

  return (
    <div
      className="border-bottom"
      style={{ padding: '1em 0', margin: '1em 0' }}
    >
      <div className="side-menu-title" style={{ paddingBottom: '1em' }}>
        Trending Accounts
      </div>
      <div
        className="flex-wrap accounts-container"
        style={{ paddingTop: '1em' }}
      >
        {posts &&
          posts.map((user, key) => {
            const { id, firstName, lastName, username, picture, validated } =
              user;
            const isValidated = validated === 'yes';

            const avatarPlaceholder = '/icons/wunderIcon.svg';
            const profileAvatar = picture[0] ? picture[0].url : null;
            const avatar = profileAvatar || avatarPlaceholder;
            const profileName = firstName || '';
            const profileLasName =
              !lastName || lastName === 'null' ? '' : lastName;

            return (
              <div className="section" key={key}>
                <div
                  className="flex"
                  style={{ cursor: 'pointer' }}
                  onClick={handleDownloadApp}
                >
                  <div className="avatar-wrapper">
                    <Image
                      src={avatar}
                      objectFit="cover"
                      width={iconWidth}
                      height={iconWidth}
                    />
                  </div>
                  <div className="flex user-details">
                    <div className="flex-col" style={{ padding: '0 10px' }}>
                      <div
                        style={{ fontSize: 11 }}
                      >{`${profileName} ${profileLasName}`}</div>
                      <div
                        style={{ opacity: 0.5, fontSize: 9 }}
                      >{`@${username}`}</div>
                    </div>

                    {isValidated && (
                      <Image
                        src="/icons/badge.svg"
                        objectFit="cover"
                        width={iconWidth / 2}
                        height={iconWidth / 2}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default TrendingAccounts;
