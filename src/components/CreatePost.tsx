import React, {useState, useRef, useEffect, Dispatch, SetStateAction} from 'react';
import { Typography, TextField, Button, SelectChangeEvent, Box, Switch, FormControlLabel, Autocomplete } from '@mui/material';
import { TPost, PostType, User, PostVisibility } from '../types';
import { getFriends } from '../apis';
import SelectSingle from './SelectSingle';
import ReactMarkdown from 'react-markdown';
import UserListItem from './UserListItem';
import './CreatePost.css';

export interface CreatePostProps {
  onSubmit: (post: TPost) => void;
  onCancel: () => void;
  defaultValue?: TPost;
}

function CreatePost(props: CreatePostProps) {
  const {onSubmit, onCancel, defaultValue} = props;
  const isEditing = !!defaultValue;
  const [title, setTitle] = useState(defaultValue?.title || '');
  const [content, setContent] = useState(defaultValue?.content || '');
  const [postType, setPostType] = useState<PostType>(defaultValue?.type || 'text/plain');
  const postTypeOptions: PostType[] = ['text/plain', 'text/markdown', 'image'];
  const [visibility, setVisibility] = useState<PostVisibility>(defaultValue?.visibility || 'public');
  const visibilityOptions = ['public', 'friends only', 'private'];
  const [preview, setPreview] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [friends, setFriends] = useState<User[] | null>(null);
  const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

  const fetchFriends = async () => {
    const response = await getFriends();
    const data = await response.json();
    setFriends(data);
    setSelectedFriends(data.filter((item: User) => defaultValue?.visibility === 'private' && defaultValue?.allowed_users?.includes(item.id)).map((item: User) => item.id));
  };

  useEffect(() => {
    fetchFriends();
  }, []);

  const handleOnChange = (setter: Dispatch<SetStateAction<string>> ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handlePostClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (visibility === 'private')
    {
      onSubmit({
        title,
        content,
        image: null,
        type: postType,
        visibility,
        allowed_users: selectedFriends
      });
    }
    else
    {
      onSubmit({
        title,
        content,
        image: null,
        type: postType,
        visibility: visibility
      });
    }
  };

  const handlePostTypeSelectionChange = (e: SelectChangeEvent) => {
    setPostType(e.target.value as PostType);
  };

  const handleVisibilitySelectionChange = (e: SelectChangeEvent) => {
    setVisibility(e.target.value.replaceAll(' ', '_') as PostVisibility);
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(e.target.checked);
  };

  const handleSelectFriendsChange = (e: React.SyntheticEvent, value: User[]) => {
    setSelectedFriends(value.map(item => item.id));
  };

  return (
    <Box className="form-container">
      <span className="label-input-container">
        <Typography variant="h6">
          Title
        </Typography>
        <TextField
          variant="outlined"
          fullWidth
          value={title}
          onChange={handleOnChange(setTitle)}
          sx={{marginTop: '10px'}}
          data-testid="dialog-input-title"
          inputRef={inputRef}
        />
      </span>
      <SelectSingle label="Post Type" value={postType} options={postTypeOptions} onChange={handlePostTypeSelectionChange}/>
      {postType === 'text/markdown' && <FormControlLabel control={<Switch checked={preview} onChange={handlePreviewChange} />} label="Preview"/>}
      <span className="label-input-container">
        <Typography variant="h6">
          Content
        </Typography>
        { postType === 'text/markdown' && preview ?
        // TODO: fix the width of the markdown container
          <div className='markdown-container' style={{maxWidth: (inputRef.current?.offsetWidth || 0) - 20}}>
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
          :
          <TextField
            variant="outlined"
            fullWidth
            multiline
            minRows={8}
            value={content}
            onChange={handleOnChange(setContent)}
            sx={{marginTop: '10px'}}
            data-testid="dialog-input-content"
          />}
      </span>
      <SelectSingle label="Visibility" value={visibility.replaceAll('_', ' ')} options={visibilityOptions} onChange={handleVisibilitySelectionChange}/>
      {visibility === 'private' && friends !== null
          && 
          <Autocomplete
            fullWidth 
            multiple
            autoHighlight
            defaultValue={friends.filter(item => selectedFriends.includes(item.id))}
            options={friends}
            getOptionLabel={(option) => `${option.username} (${option.email})`}
            renderOption={(props, option) => 
              <Box component="li" {...props}>
                <UserListItem {...option}/>
              </Box>
            }
            renderInput={(params) => <TextField {...params} label="Choose friends to share with" />}
            sx={{minWidth: '100%'}}
            onChange={handleSelectFriendsChange}
          /> }
      <span className="button-group">
        <Button 
          variant="contained" 
          sx={{marginTop: '20px'}} 
          onClick={handlePostClick} 
          disabled={title.length === 0 || content.length === 0}
          data-testid="dialog-button-submit"
        >
          {isEditing ? 'Update' : 'Submit'}
        </Button>
        <Button 
          variant="contained" 
          sx={{marginTop: '20px'}} 
          color="info"
          onClick={onCancel}
        >
          Cancel
        </Button>
      </span>
    </Box>
  );
}

export default CreatePost;