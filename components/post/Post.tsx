import { useState, useEffect, useRef } from 'react';
import { useReactiveVar } from '@apollo/client';
// --------------------------------------------------------------------------------
import FeedElement from './FeedElement';
import Loading from '../Loading';
// --------------------------------------------------------------------------------
import { feed, jwt } from '../../apollo/cache';
import { PostInterface } from '../../interfaces';
import { getFeedData } from '../../helpers';

const Feed = () => {
  const contextFeed = useReactiveVar(feed);
  const [posts, setPosts] = useState<PostInterface[]>([]);





  const [isFetching, setFetching] = useState<true | false>(false);

  const startFrom = useRef(15);
  const feedLimit = useRef(5);
  const scrollProgress = useRef(0);

  interface HandlerInterface {
    top: boolean;
  }

  useEffect(() => {
    // if (contextFeed) setPosts(contextFeed);
  }, [contextFeed]);

  // HANDLERS --------------------------------------------------------
  const getPostsHandler = async ({ top }: HandlerInterface) => {
    if (!posts) return null;

    try {
      setFetching(true);
      // ⬇️  post refetch handleScroll
      if (top) {
        // reset offset & limit values if top is true
        startFrom.current = 0;
        feedLimit.current = 5; // initial feed size on top reach reset
      }
      // console.log('🐞 offset value', startFrom.current);

      const postData = await getFeedData({
        startFrom: startFrom.current,
        limit: feedLimit.current,
        jwt: jwt(),
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
      setFetching(false);
    }
  };

  if (!posts) return <Loading />;

  const handleScroll = ({ currentTarget }: {currentTarget: Element}) => {
    // ⬇️ handle refetch on bottom reached
    const scroll = currentTarget.scrollTop;
    let isHide = scroll > 350;

    // detect when scroll direction is changed
    if (scroll > scrollProgress.current) {
      // console.log('🐞 scroll down');
      if (isHide) {
        document?
          .querySelector('.nav-container')
          .classList.add('no-overflow', 'slide-up');
      }
    } else {
      // console.log('🐞 scroll up');
      document?
        .querySelector('.nav-container')
        .classList.remove('no-overflow', 'slide-up');
    }

    const scrollHeight = currentTarget.scrollHeight;
    const currentHeight = Math.ceil(scroll + window.innerHeight);

    // ⬇️  on bottom reach fetch new chunk of posts
    let bottomOffset = 100;
    if (currentHeight >= scrollHeight - bottomOffset && !isFetching) {
      getPostsHandler({ top: false });
    }
    // ⬇️  on top reach iterate the process form the begging
    if (scroll === 0) {
      // make a new call & fetch latests posts
      getPostsHandler({ top: true });
    }

    // update scroll progress
    scrollProgress.current = scroll;
  };

  // SERVERS ---------------------------------------------------------

  return (
    <div onScroll={handleScroll} className="post-wrapper">
      {posts.map((post, key) => {
        return <FeedElement post={post} key={key} item={key} />;
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
