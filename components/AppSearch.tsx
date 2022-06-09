import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import CloseIcon from '@mui/icons-material/Close';
// CONTEXT
import { appColors, getPostsWithFilter } from '../helpers';

const SearchBox = () => {
  const router = useRouter();
  let jwt: string = 'taken';

  const [searchFilter, setFilter] = useState('');
  const [postData, setData] = useState([]);

  // HANDLERS
  const handleClearInput = () => {
    setFilter('');
    setData([]);
  };

  interface PostFilterInterface {
    filter: string;
  }

  useEffect(() => {
    // --------------------------------------------------------------------------------
    // 📌  handle app search
    // --------------------------------------------------------------------------------
    if (!searchFilter) return;

    const fetchData = async () => {
      // delay search lookup to prevent multiple requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const response = await getPostsWithFilter({ filter: searchFilter });

      if (response) {
        setData(response);
      } else {
        // set data to null to prevent dropdown from showing up if no data is available
        setData([]);
      }
    };

    fetchData();
  }, [searchFilter]);

  // SERVERS
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

    // HANDLERS
    const handlePostClick = () => {
      router.push({
        pathname: `/post/${id}`,
      });
    };

    let titlePreview = `${title.substring(0, 35)}...`;
    if (title.length < 35) titlePreview = title;

    return (
      <div
        className="flex-col interactive-text"
        style={{ padding: '5px 0', cursor: 'pointer' }}
        onClick={handlePostClick}
      >
        <div className="search-body">{titlePreview}</div>
        <div className="flex" style={{ padding: '2px 0' }}>
          <div className="flex" style={{ paddingRight: 10 }}>
            <div className="username" style={{ fontSize: 9 }}>
              @{username}
            </div>
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
      className="flex-col search-container"
      style={{ alignItems: 'center', margin: '0 15px' }}
    >
      <div
        className="input-wrapper"
        style={{
          borderBottomLeftRadius: postData.length > 0 ? 0 : 20,
          borderBottomRightRadius: postData.length > 0 ? 0 : 20,
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
      {postData.length > 0 && (
        <div className="dropdown-container">
          <div className="dropdown-wrapper">
            <div className="dropdown">
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
