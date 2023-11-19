import React from 'react';
import './UserListItem.css';
import { User } from '../types';
import { Typography } from '@mui/material';

function UserListItem(props: User) {
  const { username, profile_image, email } = props;
  return (
    <div className="user-list-item-container">
      <div className='avator-container'>
        <img src={profile_image} />
      </div>
      <Typography variant='body1' sx={{fontWeight: 700}}>
        {username}
      </Typography>
      <Typography variant='body2' sx={{color: 'gray'}}>
        {`(${email})`}
      </Typography>
    </div>
  );
}

export default UserListItem;