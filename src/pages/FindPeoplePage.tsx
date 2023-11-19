import React, { useEffect, useState} from 'react';
import FollowingItem from '../components/FollowingItem';
import { FollowUserInfo } from '../types';
import { getUserList, follow, unfollow } from '../apis';
import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './FindPeoplePage.css';

function FindPeoplePage() {
  const [users, setUsers] = useState<Array<FollowUserInfo>>([]);
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<Array<FollowUserInfo>>([]);

  const fetchUsers = async () => {
    const response = await getUserList();
    const users = await response.json();
    setUsers(users);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    updateFilteredUsers();
  }, [query, users]);

  const createHandleUnfollow = (id: string) => async () => {
    await unfollow(id);
    fetchUsers();
  };

  const createHandleFollow = (id: string) => async () => {
    await follow(id);
    fetchUsers();
  };

  const createHandleChangeRelation = (id: string, is_following: boolean) => {
    if (is_following) {
      return createHandleUnfollow(id);
    }
    return createHandleFollow(id);
  };

  const updateFilteredUsers = () => {
    const filteredUsers = users.filter((user) => user.username.includes(query) || user.email.includes(query));
    setFilteredUsers(filteredUsers);
  };

  const handleQueryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <div className='search-bar-container'>
        <TextField
          label="Search"
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryOnChange}
        />
      </div>
      {
        filteredUsers.map((user) => (
          <FollowingItem key={user.id} onChangeRelation={createHandleChangeRelation(user.id, user.is_following)} {...user}/>
        ))
      }
    </div>
  );
}

export default FindPeoplePage;