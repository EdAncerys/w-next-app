import { useEffect, useState, useRef } from 'react';
import FeedElement from './post/FeedElement';
import Loading from './Loading';
// CONTEXT --------------------------------------------
import { useAppDispatch, useAppState, getFeedDataAction } from '../context';

const Feed = ({ initialFeed }) => {
  const dispatch = useAppDispatch();
  const { isLoading, initialFeedLimit, jwt } = useAppState();

  const [posts, setPosts] = useState(initialFeed);
  const [isFetching, setFetching] = useState(null);

  const startFrom = useRef(initialFeedLimit);
  const feedLimit = useRef(5);

  // HANDLERS --------------------------------------------------------
  const getPostsHandler = async ({ top }) => {
    if (!posts) return null;

    try {
      setFetching(true);
      // ⬇️  post refetch handleScroll
      if (top) {
        // reset offset & limit values if top is true
        startFrom.current = 0;
        feedLimit.current = 5; // initial feed size on top reach reset
      }
      console.log('🐞 offset value', startFrom.current);

      const postData = await getFeedDataAction({
        startFrom: startFrom.current,
        limit: feedLimit.current,
        jwt,
      });
      let newPostData = [...posts, ...postData];
      if (top) newPostData = postData;
      setPosts(newPostData);

      // increment offset for posts
      startFrom.current = startFrom.current + feedLimit.current;
      // set timeTout to avoid multiple calls on bottom reached
      // await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(error);
    } finally {
      setFetching(null);
    }
  };

  if (!posts) return <Loading />;

  const handleScroll = ({ currentTarget }) => {
    // ⬇️ handle refetch on bottom reached
    console.log('🐞 ', currentTarget);
    console.log('🐞 ', currentTarget.scrollTop);

    const scrollHeight = currentTarget.scrollHeight;
    const currentHeight = Math.ceil(
      currentTarget.scrollTop + window.innerHeight
    );

    // ⬇️  on bottom reach fetch new chunk of posts
    if (currentHeight >= scrollHeight && !isFetching) {
      getPostsHandler({ top: false });
    }
    // ⬇️  on top reach iterate the process form the begging
    if (currentTarget.scrollTop === 0) {
      // make a new call & fetch latests posts
      getPostsHandler({ top: true });
    }
  };

  // SERVERS ---------------------------------------------------------

  return (
    <div onScroll={handleScroll} style={{ overflowY: 'scroll' }}>
      {posts.map((post, index) => {
        return <FeedElement post={post} key={index} />;
      })}

      {isFetching && (
        // show loading indicator if isFetching
        <div style={{ padding: '2em 0' }}>
          <Loading />
        </div>
      )}
    </div>
  );
};

export default Feed;
