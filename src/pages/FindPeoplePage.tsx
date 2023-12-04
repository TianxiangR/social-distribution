import React, { useEffect, useState} from 'react';
import FollowingItem from '../components/FollowingItem';
import { getUserList, makeFriendRequest } from '../apis';
import { TextField, InputAdornment, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import './FindPeoplePage.css';
import { AuthorInfo } from '../types';

function FindPeoplePage() {
  const [users, setUsers] = useState<Array<AuthorInfo> | null>(null);
  const [query, setQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState<Array<AuthorInfo>>([]);

  const fetchUsers = async () => {
    const response = await getUserList();
    const json_data = await response.json();
    setUsers(json_data.items);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    updateFilteredUsers();
  }, [query, users]);

  const createHandleChangeRelation = (user: AuthorInfo) => {
    return async () => {await makeFriendRequest(user);};
  };

  const updateFilteredUsers = () => {
    const filteredUsers = users?.filter((user) => user.displayName.includes(query) || user.host.includes(query)) || [];
    setFilteredUsers(filteredUsers);
  };

  const handleQueryOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  return (
    <div className="find-people-container">
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
        users ? filteredUsers.map((user) => (
          <FollowingItem key={user.id} onChangeRelation={createHandleChangeRelation(user)} {...user}/>
        )) : 
          <div className='loading-container'>
            <CircularProgress />
          </div>
      }
    </div>
  );
}

export default FindPeoplePage;