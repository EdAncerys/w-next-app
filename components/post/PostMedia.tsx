import Image from 'next/image';
// --------------------------------------------------------------------------------
// 📌  Import fixes React Hydration Error for ReactPlayer
// --------------------------------------------------------------------------------
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player'), { ssr: false });

// --------------------------------------------------------------------------------
import PostActions from './PostActions';
// --------------------------------------------------------------------------------
import { giveMediaType } from '../../helpers';
import { PostInterface } from '../../interfaces';
import { router } from '../../apollo/cache';

interface PostContentInterface {
  post: PostInterface;
  isPost?: boolean;
}

const PostMedia = ({ post, isPost }: PostContentInterface) => {
  if (!post || !post.picture) return null;

  const { id, title, picture } = post;
  const { url, formats, mime } = picture;

  // check media file type and render accordingly
  const isVideo = giveMediaType(mime);
  // get medium size img if available | default to standard
  let imageUrl = formats && formats.medium ? formats.medium.url : url;

  // HANDLERS ---------------------------------------------------------
  const handlePostAction = () => {
    if (isVideo) return;

    const path = `/post/${id}`;
    router()?.push(path);
  };

  const ServeContentType = () => {
    if (isVideo)
      return (
        <ReactPlayer
          url={picture.url}
          width="100%"
          height="100%"
          playing={false}
          controls={true}
          loop={true}
        />
      );

    return (
      <Image
        src={imageUrl}
        alt={title || 'Wunder'}
        layout="fill"
        objectFit="cover"
        placeholder="blur"
        // Must be a base64-encoded image or a data URI
        blurDataURL={
          'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsqgcAAYkBA6rFAegAAAAASUVORK5CYII='
        }
        // blurDataURL={`data:image/png;base64,${AVATAR}`}
      />
    );
  };

  return (
    <div style={{ position: 'relative' }}>
      <div
        className={isPost ? 'post-media' : 'feed-media'}
        onClick={handlePostAction}
      >
        <ServeContentType />
      </div>
      {!isPost && <PostActions post={post} />}
    </div>
  );
};

export default PostMedia;
