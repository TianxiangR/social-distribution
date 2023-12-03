import React, {useState, useEffect} from 'react';
import { Autocomplete, TextField, CircularProgress, Chip, Avatar } from '@mui/material';
import { AuthorInfo } from '../types';
import './CreatePost.css';
import { getFollowers } from '../apis';
import { Dialog, DialogTitle, DialogContent, Button} from '@mui/material';
import UserListItem from './UserListItem';

export interface SelectUserDialogProps {
  open: boolean;
  onSubmit: (users: AuthorInfo[]) => void | Promise<void>;
  onClose: () => void;
}

function SharePostDialog(props: SelectUserDialogProps) {
  const {open, onClose} = props;
  const [followers, setFollowers] = useState<AuthorInfo[] | null>(null);
  const [selectedUsers, setSelectedUsers] = useState<AuthorInfo[]>([]);
  const loading = followers === null;

  const fetchFollowers = async () => {
    const response = await getFollowers();
    
    if (response.status === 200) {
      const data = await response.json();
      setFollowers(data.items);
    }
  };

  const renderOption = (props: any, option: AuthorInfo, { selected }: any) => (
    <li {...props}>
      <UserListItem {...option} />
    </li>
  );



  useEffect(() => {
    if (open) {
      fetchFollowers();
    }
  }, [open]);

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        Share Post
      </DialogTitle>
      <DialogContent sx={{marginTop: '16px', overflow: 'visible'}}>
        <Autocomplete
          multiple
          id="tags-outlined"
          options={followers || []}
          getOptionLabel={(option) => option.displayName}
          filterSelectedOptions
          disableCloseOnSelect
          loading={loading}
          onChange={(event, value) => setSelectedUsers(value)}
          renderOption={renderOption}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              // eslint-disable-next-line react/jsx-key
              <Chip
                variant="outlined"
                avatar={<Avatar src={option.profileImage} alt={option.displayName}/>}
                label={option.displayName}
                {...getTagProps({ index })}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Users"
              placeholder="Select Users"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? <CircularProgress color="inherit" size={20} /> : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />
        <div>
          <Button variant='outlined' sx={{marginTop: '16px'}} onClick={() => props.onSubmit(selectedUsers)} disabled={loading || selectedUsers.length === 0}>
            Submit
          </Button>
          <Button variant='outlined' sx={{marginTop: '16px'}} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default SharePostDialog;