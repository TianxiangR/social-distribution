//todo: create edit profile and update password page (with also defining routes to the those pages)
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import dp from './dp.jpeg';
import menuIcon from './menuicon.png';
import { useNavigate } from 'react-router-dom';

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
`;

const ProfileHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-right: auto;
  padding: 10px;
`;

const ProfileImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const UserName = styled.h1`
  font-size: 24px;
  margin: 10px 0;
`;

const FollowCounts = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const SettingsButtonContainer = styled.div`
  position: relative; /* Make SettingsButtonContainer a positioning context */
  cursor: pointer;
  right: 0;
  margin-left: auto;
`;

const SettingsButton = styled.img`
  background: none;
  border: none;
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const SettingsPanel = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: none;
  flex-direction: column;
  z-index: 1;
  &.open {
    display: flex;
  }
`;

const SettingsItem = styled.div`
  padding: 10px;
  width: 160px;
  cursor: pointer;
  &:hover {
    background: #f5f5f5;
  }
`;

const ProfilePage = () => {
  const [isSettingsPanelOpen, setIsSettingsPanelOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState(''); 
  const [profileImage, setProfileImage] = useState(''); 

  const navigate = useNavigate();

  const openSettingsPanel = () => {
    setIsSettingsPanelOpen(!isSettingsPanelOpen);
  };

  const goToEditProfile = () => {
    navigate('/update/profile');
  };

  const goToUpdatePassword = () => {
    navigate('/update/password');
  };

  const getProfile = async () => {
    const userId = window.sessionStorage.getItem('userid');

    const response = await fetch('http://localhost:8000/api/get_user/'+userId, {
      method: 'GET',
      headers: {
        'Content-Type':  'application/json',
      },
      mode:'cors'
    });
    
    const res = await response.json();
    setFirstName(res.first_name);
    setLastName(res.last_name);
    setUsername(res.username);
    setProfileImage(res.profile_image);
  };

  useEffect(() => {
    getProfile();
  },[]);

  return (
    <UserProfileContainer>  
      <ProfileHeader>
        <SettingsButtonContainer onClick={openSettingsPanel}>
          <SettingsButton src={menuIcon} alt="Settings" />
          <SettingsPanel className={isSettingsPanelOpen ? 'open' : ''}>
            <SettingsItem onClick={goToEditProfile}>Edit Profile</SettingsItem>
            <SettingsItem onClick={goToUpdatePassword}>Update Password</SettingsItem>
          </SettingsPanel>
        </SettingsButtonContainer>
        <ProfileImage src={dp} alt="User" />
        <UserName>{firstName} {lastName}</UserName>
        <p>@{username}</p>
        <FollowCounts>
          <div>Followers: 100</div>
          <div>Following: 50</div>
        </FollowCounts>
      </ProfileHeader>
    </UserProfileContainer>
  );
};

export default ProfilePage;