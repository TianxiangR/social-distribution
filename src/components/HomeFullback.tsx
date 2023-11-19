import './Post.css';
import { Skeleton } from '@mui/material';
import React from 'react';

function LoadingPlaceHolder() {
  return (
    <div className='post-container'>
      <div className='avatar'>
        <Skeleton variant="circular" animation="wave" width={40} height={40}/>
      </div>
      <div className='content-container'>
        <Skeleton variant="text" animation="wave" width="20%" height={20} />
        <Skeleton variant="text" animation="wave" width="50%" height={20} />
        <Skeleton variant="rectangular" animation="wave"  height={200}/>
      </div>
    </div>
  );
}

function HomeFullback() {
  return (
    <>
      <LoadingPlaceHolder />
      <LoadingPlaceHolder />
      <LoadingPlaceHolder />
    </>
   
  );
}

export default HomeFullback;