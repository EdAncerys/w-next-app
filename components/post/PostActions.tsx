import Image from 'next/image';
import { useRouter } from 'next/router';
// --------------------------------------------------------------------------------
import { redirectAction, appColors } from '../../helpers';

const PostActions = ({ post, isPost }) => {
  if (!post) return null;

  const router = useRouter();
  const { id, statistics } = post;
  const { applauds, coins, comments, shoutouts } = statistics;

  // HANDLERS ---------------------------------------------------------
  const handlePostAction = () => {
    // 📌 disable in isPost mode
    if (isPost) {
      redirectAction({ router, path: `/download` });
      return;
    }

    const path = `/post/${id}`;
    redirectAction({ router, path });
  };

  if (isPost)
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          maxWidth: 250,
        }}
      >
        <div className="icon-container">
          <div className="icon icon-wrapper">
            <Image
              src="/icons/Commend.svg"
              alt="Commend"
              objectFit="cover"
              width="100%"
              height="100%"
              onClick={handlePostAction}
            />
          </div>
          <div className="icon-title">{coins}</div>
        </div>
        <div className="icon-container">
          <div className="icon icon-wrapper">
            <Image
              src="/icons/Applaud.svg"
              alt="Applaud"
              objectFit="cover"
              width="100%"
              height="100%"
              onClick={handlePostAction}
            />
          </div>
          <div className="icon-title">{applauds}</div>
        </div>
        <div className="icon-container">
          <div className="icon icon-wrapper">
            <Image
              src="/icons/Share.svg"
              alt="Share"
              objectFit="cover"
              width="100%"
              height="100%"
              onClick={handlePostAction}
            />
          </div>
          <div className="icon-title">{shoutouts}</div>
        </div>
        <div className="icon-container">
          <div className="icon icon-wrapper">
            <Image
              src="/icons/Comment.svg"
              alt="Comment"
              objectFit="cover"
              width="100%"
              height="100%"
              onClick={handlePostAction}
            />
          </div>
          <div className="icon-title">{comments}</div>
        </div>
      </div>
    );

  return (
    <div
      className="flex"
      style={{ justifyContent: 'flex-end', alignItems: 'flex-end' }}
    >
      <div className="flex-col actions-wrapper">
        <div className="icon">
          <Image
            src="/icons/Commend.svg"
            alt="Commend"
            objectFit="cover"
            width="100%"
            height="100%"
            onClick={handlePostAction}
          />
        </div>
        <div className="icon-title">{coins}</div>
        <div className="icon">
          <Image
            src="/icons/Applaud.svg"
            alt="Applaud"
            objectFit="cover"
            width="100%"
            height="100%"
            onClick={handlePostAction}
          />
        </div>
        <div className="icon-title">{applauds}</div>
        <div className="icon">
          <Image
            src="/icons/Share.svg"
            alt="Share"
            objectFit="cover"
            width="100%"
            height="100%"
            onClick={handlePostAction}
          />
        </div>
        <div className="icon-title">{shoutouts}</div>
        <div className="icon">
          <Image
            src="/icons/Comment.svg"
            alt="Comment"
            objectFit="cover"
            width="100%"
            height="100%"
            onClick={handlePostAction}
          />
        </div>
        <div className="icon-title">{comments}</div>
      </div>
    </div>
  );
};

export default PostActions;
