import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { useReactiveVar } from '@apollo/client';
// --------------------------------------------------------------------------------
import { tags } from '../apollo/cache';
import { redirectAction, appColors } from '../helpers';
import { TagInterface } from '../interfaces';

const HashTags = ({}) => {
  const router = useRouter();

  const [posts, setPost] = useState<TagInterface[]>([]);
  const contextTags = useReactiveVar(tags);

  // --------------------------------------------------------------------------------
  const handleDownloadApp = () => {
    redirectAction({ router, path: `/download` });
  };

  useEffect(() => {
    if (contextTags) setPost(contextTags);
  }, [contextTags]);

  return (
    <div>
      <div className="side-menu-title">Popular Hashtags</div>
      <div className="flex-wrap" style={{ paddingTop: '1em' }}>
        {posts.length > 0 &&
          posts.map((tag: TagInterface, key: number) => {
            const { tagname } = tag;
            const tagName = tagname.replace('#', '');

            return (
              <div
                key={key}
                className="tag-wrapper"
                onClick={handleDownloadApp}
              >
                <div
                  className="flex side-menu-img-wrapper"
                  style={{ backgroundColor: appColors.black }}
                >
                  <Image
                    alt="hashtag"
                    src="/icons/hashtag.svg"
                    objectFit="cover"
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
