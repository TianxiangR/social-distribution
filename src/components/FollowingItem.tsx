import React from 'react';
import './FollowingItem.css';
import { AuthorInfo } from '../types';
import { Button, Typography } from '@mui/material';
import { Avatar } from '@mui/material';

export interface FollowngItemProps extends AuthorInfo {
  onChangeRelation?: () => void | Promise<void>;
}

function FollowingItem(props: FollowngItemProps) {
  const { displayName, profileImage, host, is_following, onChangeRelation } = props;
  return (
    <div className='following-item-container'>
      <div className='left-wrapper'>
        <Avatar src={profileImage} sx={{width: '40px', height: '40px'}} />
        <div className='info-container'>
          <Typography variant='body1' sx={{fontWeight: 700}}>
            {displayName}
          </Typography>
          <Typography variant='body1' sx={{color: 'gray'}}>
            {`(host: ${host})`}
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