import React, {useState, useEffect } from 'react';
import UnlistedPost from '../components/UnlistedPost';
import { PostBrief } from '../types';
import { useNavigate } from 'react-router-dom';
import { getUnlistedPostList } from '../apis';

function UnlistedPostPage() {
  const [postItems, setPostItems] = useState<PostBrief[]>([]);
  const navigate = useNavigate();

  const loadPostList = async () => {
    const response = await getUnlistedPostList();
    const json_data = await response.json();
    const posts = json_data.items as PostBrief[];
    if (response.ok) {
      return setPostItems(posts);
    } else {
      return navigate('/login');
    }
  };

  useEffect(() => {
    loadPostList();
  }, []);

  const renderPost = (item: PostBrief, idx: number) => {
    return <UnlistedPost {...item} key={idx} onItemChanged={loadPostList} onItemDeleted={loadPostList}/>;
  };

  return (
    <div className='scroll-container'>
      {postItems.map((item, idx) => (
        <>
          {renderPost(item, idx)}
        </>
      ))}
    </div>
  );
}

export default UnlistedPostPage;