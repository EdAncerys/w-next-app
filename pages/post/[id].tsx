import { memo } from 'react';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
// --------------------------------------------------------------------------------
import PostMedia from '../../components/post/PostMedia';
import Loading from '../../components/Loading';
import UserProfile from '../../components/post/UserProfile';
import PostContent from '../../components/post/PostContent';
import PostActions from '../../components/post/PostActions';
import AppHead from '../../components/AppHead';
// --------------------------------------------------------------------------------
import {
  appColors,
  giveMediaType,
  getOnePostById,
  appLoginAction,
} from '../../helpers';

const HomeScreen = ({ post, id }) => {
  // --------------------------------------------------------------------------------
  // 📌  MAIN post component
  // --------------------------------------------------------------------------------

  if (!post)
    return (
      <div className="flex" style={{ height: '100vh' }}>
        <Loading />
      </div>
    );

  const router = useRouter();
  const { body, commentsOnMe, user, picture } = post;
  console.log('🐞 ', post); // debug

  // 📌 get image url from post to pass to header as a preview to link
  const { url, formats, mime } = picture;

  // check media file type and render accordingly
  const isVideo = giveMediaType(mime);
  let imageUrl = formats && formats.medium ? formats.medium.url : url;
  let pageTitle = null;
  // if isVideo default to null to pass wunder logo as link preview
  if (isVideo) imageUrl = null;
  if (user && user.username) pageTitle = `@${user.username}`;

  // HANDLERS -----------------------------------------------------------------------
  const handleClosePostAction = () => {
    const path = `/`;
    router.push(path);
  };

  // SERVERS ---------------------------------------------------------------------
  const ServeClosePost = () => {
    return (
      <div
        className="flex-col"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          padding: '2em',
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            cursor: 'pointer',
            backgroundColor: appColors.primaryDark,
            padding: 5,
            borderRadius: '50%',
          }}
        >
          <CloseIcon
            onClick={handleClosePostAction}
            style={{
              color: appColors.white,
              fontSize: 28,
            }}
          />
        </div>
      </div>
    );
  };

  const ServeFeedData = () => {
    return (
      <div
        className="flex"
        style={{
          height: '100vh',
          minWidth: 300,
          alignItems: 'flex-start',
          padding: '4em 2em 0 2em',
        }}
      >
        <div>
          <UserProfile post={post} />
          <PostContent post={post} isPost />
          <PostActions post={post} isPost />

          {commentsOnMe.length > 0 &&
            commentsOnMe.map((comment, key) => {
              return (
                <div
                  key={key}
                  style={{
                    borderTop: `1px solid ${appColors.lightSilver}`,
                    padding: '1em 0',
                    margin: '1em 0',
                  }}
                >
                  <UserProfile post={comment} />
                  <PostContent post={comment} isPost />
                </div>
              );
            })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <AppHead title={pageTitle} image={imageUrl} body={body} />

      <div
        className="flex"
        style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}
      >
        <div
          className="flex"
          style={{
            position: 'relative',
            height: '100vh',
            flex: 2,
            justifyContent: 'center',
            backgroundColor: appColors.black,
          }}
        >
          <ServeClosePost />
          <PostMedia post={post} isPost />
        </div>

        <ServeFeedData />
      </div>
    </div>
  );
};

// --------------------------------------------------------------------------------
// 📌  getStaticProps & getServerSideProps can only be exported from a page
// --------------------------------------------------------------------------------
export const getServerSideProps = async (context) => {
  // server side prop data
  let taken = '';
  let post = null;

  // get id form url params
  const { id } = context.query;

  try {
    // 📌 app login action to retrieve jwt
    taken = await appLoginAction({
      identifier: process.env.LOGIN_USERNAME,
      password: process.env.LOGIN_PASSWORD,
    });
    // 📌 handle get post data
    const response = await getOnePostById({
      id,
      jwt: taken,
    });
    if (!response) throw new Error('Failed to get post data');
    post = response;
  } catch (error) {
    console.log('🐞 SERVER SIDE ERROR', error);
  }

  return {
    props: {
      post,
    },
  };
};

// --------------------------------------------------------------------------------
// 📌  use memo hook for performance optimization if component is not changing
// --------------------------------------------------------------------------------

// const areEqual = ({ post: prevPost }, { post }) => {
//   return post == prevPost;
// };

// export default memo(HomeScreen, areEqual);

export default HomeScreen;
