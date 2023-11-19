import React, { useState, useEffect } from 'react';
import './FollowingPage.css';
import { User } from '../types';
import FollowingItem from '../components/FollowingItem';
import { unfollow } from '../apis';
import { useNavigate } from 'react-router-dom';
import { getFollowing } from '../apis';

function FollowingPage() {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  
  const loadFollowing = async () => {
    const response = await getFollowing();
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
        setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
      });
  };


  return (
    <div className='following-page-container'>
      <div className='following-list-container'>
        {users.map((user) => (
          <FollowingItem key={user.id} {...user} is_following onChangeRelation={handleUnfollow(user.id)}/>
        ))}
      </div>
    </div>
  );
}

export default FollowingPage;