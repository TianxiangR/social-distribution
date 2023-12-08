/* istanbul ignore file */
/** This file is not being used, we gave up this feature */
import React from 'react';
import './NotificationItem.css';
import { Typography, Avatar } from '@mui/material';
import { Notification } from '../types';
import { useNavigate } from 'react-router-dom';
import { updateNotification } from '../apis';
import { getTimeDiffString } from '../utils';

function NotificationItem(props: Notification) {
  const {id, author_profile_image, author_username, post_id, post_title, comment_content, comment_id, type, is_read, created_at} = props;
  const timeDiffString = getTimeDiffString(new Date(created_at));
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    if (!is_read) {
      updateNotification(id, {is_read: true});
    }
    if (type === 'LIKE_POST' || type === 'SHARE_POST') {
      navigate(`/post/${post_id}`);
    }
    else if (type === 'COMMENT_POST' || type === 'LIKE_COMMENT') {
      navigate(`/post/${post_id}#comment=${comment_id}`);
    }
  };

  let textContent = <></>;

  switch (type) {
  case 'LIKE_COMMENT':
    textContent = (
      <>
        <span className='bold-text'>{author_username}</span> liked your comment <br/>{comment_content}
      </>
    );
    break;
  case 'LIKE_POST':
    textContent = (
      <>
        <span className='bold-text'>{author_username}</span> liked your post <br/>{post_title}
      </>
    );
    break;
  case 'COMMENT_POST':
    textContent = (
      <>
        <span className='bold-text'>{author_username}</span> commented your post <br/>{post_title}
      </>
    );
    break;
  case 'SHARE_POST':
    textContent = (
      <>
        <span className='bold-text'>{author_username}</span> shared a post with you <br/>{post_title}
      </>
    );
    break;
  }
      
  return (
    <div className='notification-item-container' onClick={handleNotificationClick}>
      <Avatar src={author_profile_image} sx={{width: '40px', height: '40px'}} />
      <div className='notification-text-container'>
        <Typography variant='body1'>
          {textContent}
        </Typography>
        <Typography variant='body2'>
          {timeDiffString}
        </Typography>
      </div>
    </div>
  );
}

export default NotificationItem;