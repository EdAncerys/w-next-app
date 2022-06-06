import Image from 'next/image';

// --------------------------------------------------------------------------------
import { PostInterface } from '../../interfaces';

interface PostContentInterface {
  post: PostInterface;
  isPost: boolean;
}

const PostContent = ({ post, isPost }: PostContentInterface) => {
  if (!post) return null;

  const { id, title, body, people, known_tags } = post;
  // console.log('🐞 post', post); //debug

  // --------------------------------------------------------------------------------
  const handleDownloadApp = () => {
    // redirectAction({ router, path: `/download` });
    console.log('🐞  get app');
  };

  // --------------------------------------------------------------------------------
  const ServeTagContainer = () => {
    if (!known_tags || known_tags.length === 0) return null;

    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {known_tags.map(({ tagname }, key) => (
          <div
            key={key}
            style={{
              display: 'flex',
              paddingRight: '10px',
              fontSize: 12,
              fontWeight: 800,
            }}
            onClick={handleDownloadApp}
          >
            {tagname}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex" style={{ margin: '10px 0' }}>
      <div className="flex">
        <div className="post-title">{title}</div>
        <div
          className={isPost ? 'post-body-full' : 'post-body'}
          style={{ margin: '8px 0' }}
        >
          {body}
        </div>
        <ServeTagContainer />
      </div>

      <div style={{ paddingLeft: '1em' }} className={isPost ? '' : 'd-none'}>
        <Image
          src={`/icons/${people ? 'People' : 'Planet'}.svg`}
          alt={title}
          width="100%"
          height="100%"
        />
      </div>
    </div>
  );
};

export default PostContent;
