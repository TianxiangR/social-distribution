//todo: create edit profile and update password page (with also defining routes to the those pages)
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthorInfo } from '../types';
import { getProfile } from '../apis';
import { Avatar, Typography, Button } from '@mui/material';
import './ProfilePage.css';

const ProfilePage = () => {
  const [profile, setProfile] = useState<AuthorInfo | null>(null);
  const navigate = useNavigate();

  const fetchProfile = async () => {
    const response = await getProfile();
    const json_data = await response.json();
    if (response.ok) {
      return setProfile(json_data);
    }
  };


  const handleEditButtonClick = () => {
    navigate('/edit-profile');
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  const {displayName, profileImage, host, github} = profile;


  return (
    <div>
      <div style={{float: 'right', padding: '20px'}}>
        <Button variant='outlined' onClick={handleEditButtonClick}>
          Edit
        </Button>
      </div>
      <div className='profile-container'>
        <Avatar src={profileImage} sx={{width: '100px', height: '100px', border: '2px solid black'}} />
        <Typography variant='h5' sx={{fontWeight: 700}}>
          {displayName}
        </Typography>
        <Typography variant='h6' sx={{color: 'gray'}}>
          {`github: ${github}`}
        </Typography>
        <Typography variant='h6' sx={{color: 'gray'}}>
          {`(host: ${host})`}
        </Typography>
      </div>
    </div>
  );
};

export default ProfilePage;