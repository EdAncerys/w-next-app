import { memo } from 'react';
import { useRouter } from 'next/router';
// --------------------------------------------------------------------------------
import UserProfile from './UserProfile';
import PostContent from './PostContent';
import PostMedia from './PostMedia';
// --------------------------------------------------------------------------------
import { PostInterface } from '../../Interfaces';
import { redirectAction } from '../../helpers';

const FeedElement = ({ post }: PostInterface) => {
  if (!post) return null;
  const router = useRouter();

  const { id } = post;
  console.log('🐞 ', post); //debug

  // --------------------------------------------------------------------------------
  const handlePostAction = () => {
    const path = `/post/${id}`;
    redirectAction({ router, path });
  };

  return (
    <div className="feed-wrapper">
      <div className="post-content" onClick={handlePostAction}>
        <UserProfile post={post} />
        <PostContent post={post} />
      </div>
      <PostMedia post={post} />
    </div>
  );
};

// --------------------------------------------------------------------------------
// 📌  use memo hook for performance optimization if component is not changing
// --------------------------------------------------------------------------------

const areEqual = ({ post: prevPost }, { post }) => {
  return post == prevPost;
};

export default memo(FeedElement, areEqual);
