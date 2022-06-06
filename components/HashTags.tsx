import { useRouter } from 'next/router';
import AppSearch from './AppSearch';
import Image from 'next/image';
import { useReactiveVar } from '@apollo/client';
import { jwt } from '../apollo/cache';
// CONTEXT
import { redirectAction } from '../helpers';

const HashTags = ({}) => {
  const router = useRouter();
  const tags = [];

  // HELPERS
  const handleDownloadApp = () => {
    redirectAction({ router, path: `/download` });
  };

  return (
    <div>
      <div className="side-menu-title">Popular Hashtags</div>
      <div className="flex-wrap" style={{ paddingTop: '2em' }}>
        {tags &&
          tags.map((tag, key) => {
            const { tagname } = tag;
            const tagName = tagname.replace('#', '');

            return (
              <div
                key={key}
                style={{
                  display: 'flex',
                  padding: '5px 0',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleDownloadApp}
              >
                <div
                  style={{
                    // height: '25px',
                    // width: '25px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    backgroundColor: appColors.black,
                    padding: 4,
                  }}
                >
                  <Image
                    src="/icons/hashtag.svg"
                    width={24}
                    height={24}
                    style={{ color: appColors.white }}
                  />
                </div>
                <div className="flex" style={{ margin: '0 5px' }}>
                  <div style={{ fontSize: 11 }}>{tagName}</div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default HashTags;
