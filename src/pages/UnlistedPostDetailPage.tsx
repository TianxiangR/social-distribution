import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { getUnlistedPostById } from '../apis';
import { PostDetail } from '../types';
import UnlistedPost from '../components/UnlistedPost';


function UnlistedPostDetailPage() {
  const { id = '-1' } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const loadPost = async () => {
    const response = await getUnlistedPostById(id);
    const post = await response.json();
    if (response.ok) {
      return setPost(post);
    }
  };

  useEffect(() => {
    loadPost();
  }, []);

  return (
    <div className='scroll-container'>
      {post && <UnlistedPost {...post}/>}
    </div>
  );
}

export default UnlistedPostDetailPage;