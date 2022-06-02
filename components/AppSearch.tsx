import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
// CONTEXT -------------------------------------------------------------------
import { appColors } from '../helpers';

const SearchBox = () => {
  const router = useRouter();
  let jwt: string = 'taken';

  const [searchFilter, setFilter] = useState('');
  const [postData, setData] = useState(null);

  const inputWidth = 330;
  const inputHeight = 40;

  // HANDLERS ---------------------------------------------------------
  const handleClearInput = () => {
    setFilter('');
    setData(null);
  };

  interface PostFilterInterface {
    jwt: string;
    filter: string;
  }
  const getPostsWithFilter = ({ jwt, filter }: PostFilterInterface) => {
    console.log('🐞 api call');

    return null;
  };

  useEffect(() => {
    // --------------------------------------------------------------------------------
    // 📌  handle app search
    // --------------------------------------------------------------------------------
    if (!searchFilter) return;

    const fetchData = async () => {
      // delay search lookup to prevent multiple requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getPostsWithFilter({ jwt, filter: searchFilter });

      if (response) {
        setData(response);
      } else {
        // set data to null to prevent dropdown from showing up if no data is available
        setData(null);
      }
    };

    fetchData();
  }, [searchFilter]);

  // SERVERS ---------------------------------------------------------
  const ServeClearSearch = () => {
    if (!searchFilter) return null;

    return (
      <div>
        <div
          className="flex"
          style={{
            borderRadius: '50%',
            margin: '0 10px',
            cursor: 'pointer',
            color: appColors.white,
            backgroundColor: appColors.darkSilver,
          }}
          onClick={handleClearInput}
        >
          <CloseIcon style={{ fontSize: 16 }} />
        </div>
      </div>
    );
  };

  const SearchIcon = () => {
    return (
      <div style={{ position: 'absolute', top: 0, left: 0 }}>
        <div
          className="flex"
          style={{
            backgroundColor: appColors.black,
            padding: 5,
            margin: 5,
            borderRadius: '50%',
          }}
        >
          <Image src="/icons/search.svg" width={16} height={16} />
        </div>
      </div>
    );
  };

  const PostItem = ({ post }: any) => {
    const { id, user, title } = post;
    const { username, validated } = user;

    // HANDLERS ---------------------------------------------------------
    const handlePostClick = () => {
      router.push({
        pathname: `/post/${id}`,
      });
    };

    let titlePreview = `${title.substring(0, 35)}...`;
    if (title.length < 35) titlePreview = title;

    return (
      <div
        style={{ display: 'flex', flexDirection: 'column', padding: '5px 0' }}
        onClick={handlePostClick}
      >
        <div className="search-body">{titlePreview}</div>
        <div
          style={{ display: 'flex', padding: '2px 0', alignItems: 'center' }}
        >
          <div
            style={{ display: 'flex', alignItems: 'center', paddingRight: 10 }}
          >
            <div style={{ fontSize: 9 }}>{username}</div>
          </div>
          {validated === 'yes' && (
            <Image src="/icons/verified.svg" width={8} height={8} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div
      className="flex-col"
      style={{
        margin: '0 10px',
        maxWidth: inputWidth,
      }}
    >
      <div
        style={{
          position: 'relative',
          display: 'flex',
          height: inputHeight,
          alignItems: 'center',
          borderTopLeftRadius: inputHeight / 2,
          borderTopRightRadius: inputHeight / 2,
          borderBottomLeftRadius: postData ? 0 : inputHeight / 2,
          borderBottomRightRadius: postData ? 0 : inputHeight / 2,
          border: `1px solid ${appColors.lightSilver}`,
          backgroundColor: appColors.lightSilver,
        }}
      >
        {!searchFilter && <SearchIcon />}
        <input
          className="flex input"
          style={{
            fontSize: 12,
            paddingLeft: 35,
          }}
          type="text"
          placeholder="Search"
          value={searchFilter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <ServeClearSearch />
      </div>
      {postData && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            position: 'absolute',
            width: inputWidth,
            borderBottomLeftRadius: inputHeight / 2,
            borderBottomRightRadius: inputHeight / 2,
            padding: '0px 20px',
            zIndex: 99,
            marginTop: inputHeight,
            backgroundColor: appColors.lightSilver,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxHeight: '25vh',
              flex: 1,
              padding: '15px 0',
              borderTop: `1px solid ${appColors.silver}`,
            }}
          >
            <div style={{ overflowY: 'auto' }}>
              {postData.map((feed, index) => (
                <PostItem post={feed} key={String(index)} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBox;
