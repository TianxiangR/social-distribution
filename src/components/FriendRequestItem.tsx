import React from 'react';
import './FriendRequestItem.css';
import { Typography, Avatar, IconButton } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { FriendRequest } from '../types';
import { acceptFriendRequest, rejectFriendRequest } from '../apis';

export interface FriendRequestItemProps extends FriendRequest {
  onRequestProcessed?: () => void | Promise<void>;
}

function FriendRequestItem(props: FriendRequestItemProps) {
  const {id, requester: { displayName, host, profileImage} , onRequestProcessed } = props;

  const handleAcceptClick = async () => {
    await acceptFriendRequest(id);
    await onRequestProcessed?.();
  };

  const handleRejectClick = async () => {
    await rejectFriendRequest(id);
    await onRequestProcessed?.();
  };
    

  return (
    <div className='following-item-container'>
      <div className='left-wrapper'>
        <Avatar src={profileImage || undefined} sx={{width: '40px', height: '40px'}} />
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
          <IconButton size="small" color="success" onClick={handleAcceptClick} data-testid='friend-request-accept-button'>
            <CheckCircleIcon sx={{height: '30px', width: '30px'}}/>
          </IconButton>
          <IconButton size="small" color="error" onClick={handleRejectClick} data-testid='friend-request-reject-button'>
            <CancelIcon  sx={{height: '30px', width: '30px'}}/>
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default FriendRequestItem;