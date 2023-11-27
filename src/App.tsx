import React, {useState} from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomeComponent from './pages/HomePage';
import PostPage from './pages/PostPage';
import CreatePostDialog from './components/CreatePostDialog';
import NavBarContentWrapper from './components/NavBarContentWrapper';
import FollowingPage from './pages/FollowingPage';
import FollowedPage from './pages/FollowedPage';
import SignUpPage from './pages/SignUpPage';
import ProfilePage from './pages/ProfilePage';
import UpdatePasswordPage from './pages/UpdatePasswordPage';
import UpdateProfilePage from './pages/UpdateProfilePage';
import FindPeoplePage from './pages/FindPeoplePage';
import NotificationPage from './pages/NotificationPage';
import HomeIcon from '@mui/icons-material/Home';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PersonIcon from '@mui/icons-material/Person';
import FaceIcon from '@mui/icons-material/Face';
import GroupIcon from '@mui/icons-material/Group';
import PersonSearch from '@mui/icons-material/PersonSearch';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { NarBarItem } from './components/NavBar';
import FriendRequestItem from './components/FriendRequestItem';
import FriendRequestPage from './pages/FriendRequestPage';

function App() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const navBarOptions: Array<NarBarItem> = [
    {
      icon: <HomeIcon />,
      label: 'Home',
      path: '/'
    },
    {
      icon: <NotificationsIcon />,
      label: 'Notification',
      path: '/notification'
    },
    {
      icon: <FaceIcon />,
      label: 'Profile',
      path: '/my-profile'
    },
    {
      icon: <PersonIcon />,
      label: 'Followed',
      path: '/followed'
    },
    {
      icon: <GroupIcon />,
      label: 'Followers',
      path: '/followers'
    },
    {
      icon: <PersonSearch />,
      label: 'Find People',
      path: '/find-people'
    },
    {
      icon: <PersonAddIcon />,
      label: 'Friend Requests',
      path: '/friend-requests'
    }
  ];

  return (
    <BrowserRouter>
      <CreatePostDialog open={open} onClose={handleClose}/>
      <Routes>
        <Route path='/' index element={<>
          <NavBarContentWrapper options={navBarOptions}>
            <HomeComponent />
          </NavBarContentWrapper>
        </>} />
        <Route path='/login' element={
          <div className='main-container'>
            <div className='content-body-container'>
              <LoginPage />
            </div>
          </div>
        } />
        <Route path="/signup" element={
          <div className='main-container'>
            <div className='content-body-container'>
              <SignUpPage />
            </div>
          </div>
        } />
        <Route path="/post/:id" element={
          <NavBarContentWrapper selection='Home' options={navBarOptions}>
            <PostPage />
          </NavBarContentWrapper>
        } />
        <Route path="/my-profile" element={
          <NavBarContentWrapper selection='Profile' options={navBarOptions}>
            <ProfilePage />
          </NavBarContentWrapper>
        } />
        <Route path="/notification" element={
          <NavBarContentWrapper selection='Notification' options={navBarOptions}>
            <NotificationPage />
          </NavBarContentWrapper>
        } />
        <Route path="/followed" element={
          <NavBarContentWrapper selection='Followed' options={navBarOptions}>
            <FollowingPage />
          </NavBarContentWrapper>
        } />
        <Route path="/followers" element={
          <NavBarContentWrapper selection='Followers' options={navBarOptions}>
            <FollowedPage />
          </NavBarContentWrapper>
        } />
        <Route path="/update/password" element={
          <NavBarContentWrapper selection='UpdatePassowrd' options={navBarOptions}>
            <UpdatePasswordPage />
          </NavBarContentWrapper>
        } />
        <Route path="/edit-profile" element={
          <NavBarContentWrapper selection='UpdateProfile' options={navBarOptions}>
            <UpdateProfilePage />
          </NavBarContentWrapper>
        } />
        <Route path="/find-people" element={
          <NavBarContentWrapper selection='FindPeople' options={navBarOptions}>
            <FindPeoplePage />
          </NavBarContentWrapper>
        } />
        <Route path="/friend-requests" element={
          <NavBarContentWrapper selection='FindPeople' options={navBarOptions}>
            <FriendRequestPage />
          </NavBarContentWrapper>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
