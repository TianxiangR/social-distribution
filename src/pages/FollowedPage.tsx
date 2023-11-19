import React, { useState, useEffect } from 'react';
import './FollowingPage.css';
import { User, FollowUserInfo } from '../types';
import FollowingItem from '../components/FollowingItem';
import { unfollow, follow, getFollowers } from '../apis';
import { useNavigate } from 'react-router-dom';

function FollowedPage() {
  const [users, setUsers] = useState<FollowUserInfo[]>([]);
  const navigate = useNavigate();
  
  const loadFollowing = async () => {
    const response = await getFollowers();
    const users = await response.json();
    if (response.ok) {
      return setUsers(users);
    }

    if (response.status === 401) {
      return navigate('/login');
    }
  };

  useEffect(() => {
    loadFollowing();
  }, []);

  const handleUnfollow = (id: string) => () => {
    unfollow(id)
      .then((response) => {
        if (response.ok)
        {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then(() => {
        const newUsers = users.map((user) => {
          if (user.id === id)
          {
            return { ...user, is_following: false };
          }
          return user;
        });
        setUsers(newUsers);
      });
  };

  const handleFollow = (id: string) => () => {
    follow(id)
      .then((response) => {
        if (response.ok)
        {
          return response.json();
        }
        return Promise.reject(response.status);
      })
      .then(() => {
        const newUsers = users.map((user) => {
          if (user.id === id)
          {
            return { ...user, is_following: true };
          }
          return user;
        });
        setUsers(newUsers);
      });
  };


  return (
    <div className='following-page-container'>
      <div className='following-list-container'>
        {users.map((user) => (
          <FollowingItem key={user.id} {...user} is_following={user.is_following} onChangeRelation={user.is_following ? handleUnfollow(user.id) : handleFollow(user.id)}/>
        ))}
      </div>
    </div>
  );
}

export default FollowedPage;