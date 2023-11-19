import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PostDetail } from '../types';
import Post from './Post';
import { likePost } from '../apis';

function PostItem(props: PostDetail) {
  const { id } = props;
  const navigate = useNavigate();

  const handleBodyClick = () => {
    navigate(`/post/${id}`);
  };

  const handleLikeClick = () => {
    likePost(id).then((response) => {
      if (response.ok)
      {
        window.location.reload();
      }
    });
  };

  return (
    <Post {...props} onBodyClick={handleBodyClick} onLikeIconClick={handleLikeClick}/>
  );
}

export default PostItem;