import React, { useEffect, useState, useRef } from 'react';
import '../components/PostItem.css';
import { useParams } from 'react-router-dom';
import { PostDetail } from '../types';
import CommentItem from '../components/CommentItem';
import Post from '../components/Post';
import { Button, IconButton, TextField, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './PostPage.css';
import { useNavigate } from 'react-router-dom';
import { createComment, likeComment, likePost } from '../apis';
import { getPostById } from '../apis';
import { Comment } from '../types';
import '../global.css';


function PostPage() {
  const { id = '-1' } = useParams();
  const [post, setPost] = useState<PostDetail | null>(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate();
  const commentViewRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const outerContainerRef = useRef<HTMLDivElement>(null);
  const inputBarRef = useRef<HTMLInputElement>(null);
  

  const loadPost = async () => {
    const response = await getPostById(id);
    const post = await response.json();

    if (response.ok) {
      return setPost(post);
    }

    if (response.status === 401) {
      return navigate('/login');
    }
  };

  useEffect(() => {
    loadPost();
  }, []); 


  const handleBackClick = () => {
    navigate(-1);
  };

  const handleSendClick = () => {
    createComment(id, comment)
      .then((response) => {
        if (response.ok)
        {
          setComment('');
          return loadPost();
        }
        return Promise.reject(response.status);
      });
  };

  const handleOnCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  const handleCommentLikeClick = (postId: string, commentId: string) => () => {
    likeComment(postId, commentId)
      .then((response) => {
        if (response.ok)
        {
          return loadPost();
        }
      });
  };

  const handlePostLikeClick = () => {
    likePost(id).then((response) => {
      if (post === null)
      {
        return;
      }

      if (response.ok) {
        const newPost = {...post};
        newPost.like_count++;
        newPost.is_liked = true;
        setPost(newPost);
      }
      
    });
  };

  const handleCommentIconClick = () => {
    if (outerContainerRef.current !== null && commentViewRef.current !== null && topBarRef.current !== null &&  inputBarRef.current !== null)
    {
      outerContainerRef.current.scrollTo({top: outerContainerRef.current.offsetTop + commentViewRef.current.offsetTop - topBarRef.current.offsetHeight, behavior: 'smooth'});
      inputBarRef.current.focus();
    }
  };

  if (post === null)
  {
    return null;
  }

  const { commentsSrc: {comments}, ...postProps } = post;
  return (
    <div className='scroll-container' ref={outerContainerRef}>
      <div className='top-bar' ref={topBarRef}>
        <IconButton onClick={handleBackClick}>
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h6" sx={{fontWeight: 700}}>
          Back
        </Typography>
      </div>
      <Post {...postProps} onCommentIconClick={handleCommentIconClick} onLikeIconClick={handlePostLikeClick} onItemChanged={() => loadPost()} onItemDeleted={() => navigate('/')}/>
      <div className='input-comment' ref={commentViewRef}>
        <Typography variant="h5" sx={{fontWeight: 700}}>
          Leave your comment here
        </Typography>
        <TextField 
          label="Comment"
          inputRef={inputBarRef}
          fullWidth
          onChange={handleOnCommentChange}
          value={comment}
          sx={{marginTop: '10px'}}
          data-testid="input-comment"
        >
        </TextField>
        <div className='send-button-container'>
          <Button 
            variant="contained" 
            sx={{marginTop: '10px'}} 
            onClick={handleSendClick} 
            disabled={comment.length === 0}
            data-testid="button-send-comment"
          >
            Send
          </Button>
        </div>
      </div>
      {
        comments.map((item, idx) => (
          <CommentItem key={idx} {...item} onLikeClick={handleCommentLikeClick(post.id, item.id)}/>
        ))
      }
    </div>
  );
}

export default PostPage;