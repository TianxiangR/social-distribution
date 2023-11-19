import React from 'react';
import { Comment } from '../types';
import { Typography, Button, Avatar } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import IosShareIcon from '@mui/icons-material/IosShare';
import './CommentItem.css';
import { getTimeDiffString } from '../utils';


export interface CommentItemProps extends Comment {
  onLikeClick?: () => void;
}

function CommentItem(props: CommentItemProps) {
  const {user_profile_image,  content, like_count, created_at, username, is_liked, onLikeClick} = props;
  const timeDiffString = getTimeDiffString(new Date(created_at));
  const paragraphs = content.split('\n');

  return (
    <div className='comment-item-container' >
      <Avatar src={user_profile_image} sx={{width: '40px', height: '40px'}} />
      {/* <div className='avatar'>
        <img src={user_profile_image} />
      </div> */}
      <div className='content-container'>
        <span style={{display: 'flex', flexDirection: 'row', gap: '2px'}}>
          <Typography variant="body1" sx={{fontWeight: 700}}>
            {username}
          </Typography>
          <Typography variant="body1">
            {' · ' + timeDiffString}
          </Typography>
        </span>
        {paragraphs.map((item, idx) => {
          if (idx != paragraphs.length - 1)
          {
            return (
              <>
                <Typography key={idx} variant="body1" sx={{fontWeight: 300}}>
                  {item}
                </Typography>
                <br />
              </>
            );
          }
          return (
            <Typography key={idx} variant="body1" sx={{fontWeight: 300}}>
              {item}
            </Typography>);
        })}
        <div className='bottom-icons-container'>
          <span className='cell-container'>
            <Button variant='text' size='small' startIcon={is_liked ? <FavoriteIcon /> : <FavoriteBorderIcon />} onClick={is_liked ? undefined : onLikeClick}>
              {like_count}
            </Button>
          </span>
          <span className='cell-container'>
            <Button variant='text' size='small' startIcon={<IosShareIcon />}/>
          </span>
        </div>
      </div>
    </div>
  );
}

export default CommentItem;