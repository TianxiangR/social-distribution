import React from 'react';
import './FollowingItem.css';
import { FollowUserInfo } from '../types';
import { Button, Typography } from '@mui/material';

export interface FollowngItemProps extends FollowUserInfo {
  onChangeRelation?: () => void;
}

function FollowingItem(props: FollowngItemProps) {
  const { username, profile_image, email, is_following, onChangeRelation } = props;
  return (
    <div className='following-item-container'>
      <div className='left-wrapper'>
        <div className='avatar'>
          <img src={profile_image} alt={username} />
        </div>
        <div className='info-container'>
          <Typography variant='body1' sx={{fontWeight: 700}}>
            {username}
          </Typography>
          <Typography variant='body1' sx={{color: 'gray'}}>
            {email}
          </Typography>
        </div>
      </div>
      <div className='right-wrapper'>
        <div className='button-container'>
          <Button variant='outlined' onClick={onChangeRelation} size="small">
            {is_following ? 'Unfollow' : 'Follow'}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FollowingItem;