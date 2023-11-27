import React from 'react';
import './UserListItem.css';
import { AuthorInfo } from '../types';
import { Typography } from '@mui/material';
import { Avatar } from '@mui/material';

function UserListItem(props: AuthorInfo) {
  const { displayName, host, profileImage } = props;
  return (
    <div className="user-list-item-container">
      <Avatar src={profileImage} sx={{width: '40px', height: '40px'}} />
      <Typography variant='body1' sx={{fontWeight: 700}}>
        {displayName}
      </Typography>
      <Typography variant='body2' sx={{color: 'gray'}}>
        {`(host: ${host})`}
      </Typography>
    </div>
  );
}

export default UserListItem;