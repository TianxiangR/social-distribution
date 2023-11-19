import React, {useState, useEffect, Suspense} from 'react';
import Post from '../components/Post';
import { PostDetail } from '../types';
import { useNavigate } from 'react-router-dom';
import { getPostList, likePost } from '../apis';
import CreateCommentDialog from '../components/CreateCommentDialog';
import '../global.css';

function HomePage() {
  const [open, setOpen] = useState(false);
  const [postId, setPostId] = useState('');
  const [postItems, setPostItems] = useState<PostDetail[]>([]);
  const navigate = useNavigate();

  const loadPostList = async () => {
    const response = await getPostList();
    const posts = await response.json();
    if (response.ok) {
      // sort by creation date
      posts.sort((a: PostDetail, b: PostDetail) => {
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });
      return setPostItems(posts);
    } else {
      return navigate('/login');
    }
  };

  useEffect(() => {
    loadPostList();
  }, []);

  const handleBodyClick = (id: string) => () => {
    navigate(`/post/${id}`);
  };

  const handleLikeClick = (id: string) => () => {
    likePost(id).then((response) => {
      if (response.ok) {
        loadPostList();
      }
    });
  };

  const handleCommentClick = (id: string) => () => {
    setPostId(id);
    setOpen(true);
  };

  return (
    <div className='scroll-container'>
      {postItems.map((item, idx) => (
        <>
          <Post key={idx} {...item} onBodyClick={handleBodyClick(item.id)} onLikeIconClick={handleLikeClick(item.id)} onCommentIconClick={handleCommentClick(item.id)} onItemChanged={loadPostList} onItemDeleted={loadPostList}/>
        </>
      ))}
      <CreateCommentDialog open={open} onClose={() => setOpen(false)} postId={postId} onSuccess={loadPostList}/>
    </div>
  );
}

export default HomePage;