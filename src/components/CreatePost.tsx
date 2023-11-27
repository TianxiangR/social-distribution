import React, {useState, useRef,  Dispatch, SetStateAction} from 'react';
import { Typography, TextField, Button, SelectChangeEvent, Box, Switch, FormControlLabel } from '@mui/material';
import { ContentType, PostVisibility,  PostBase } from '../types';
import SelectSingle from './SelectSingle';
import ReactMarkdown from 'react-markdown';
import './CreatePost.css';
import { createPost, updatePost } from '../apis';

export interface CreatePostProps {
  onSubmitted: () => void;
  onCancel: () => void;
  defaultValue?: PostBase;
}

function CreatePost(props: CreatePostProps) {
  const {onSubmitted: onSubmited, onCancel, defaultValue} = props;
  const isEditing = !!defaultValue;
  const [title, setTitle] = useState(defaultValue?.title || '');
  const [content, setContent] = useState(defaultValue?.content || '');
  const [contentType, setContentType] = useState<ContentType>(defaultValue?.contentType || 'text/plain');
  const postTypeOptions: ContentType[] = ['text/plain', 'text/markdown', 'image'];
  const [visibility, setVisibility] = useState<PostVisibility>(defaultValue?.visibility || 'PUBLIC');
  const visibilityOptions = ['PUBLIC', 'FRIENDS', 'PRIVATE'];
  const [preview, setPreview] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [imageDate, setImageData] = useState<string>('');
  
  const handleOnChange = (setter: Dispatch<SetStateAction<string>> ) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setter(e.target.value);
  };

  const handlePostClick = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    let request_body = {};

    if (contentType === 'image')
    {
      request_body = {title, contentType, content: imageDate, visibility, unlisted: true};
    }
    else
    {
      request_body = {title, contentType, content, visibility};
    }

    if (isEditing) {
      await updatePost(defaultValue!.id, request_body as PostBase);
      onSubmited();
    } else {
      await createPost(request_body as PostBase);
      onSubmited();
    }
  };

  const handlePostTypeSelectionChange = (e: SelectChangeEvent) => {
    setContentType(e.target.value as ContentType);
  };

  const handleVisibilitySelectionChange = (e: SelectChangeEvent) => {
    setVisibility(e.target.value as PostVisibility);
  };

  const handlePreviewChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(e.target.checked);
  };

  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageData(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };


  let contentPart = <></>;
  if (contentType === 'text/plain' || contentType === 'text/markdown')
  {
    contentPart = <>
      {contentType === 'text/markdown' && <FormControlLabel control={<Switch checked={preview} onChange={handlePreviewChange} />} label="Preview"/>}
      <span className="label-input-container">
        <Typography variant="h6">
          Content
        </Typography>
        { contentType === 'text/markdown' && preview ?
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
      <SelectSingle label="Visibility" value={visibility.replaceAll('_', ' ')} options={visibilityOptions} disabled={isEditing} onChange={handleVisibilitySelectionChange}/>
    </>;
  }
  else if (contentType === 'image')
  {
    contentPart = <>
      <input type="file" accept="image/*" onChange={handleImageSelected} />
    </>;
  }


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
      <SelectSingle label="Post Type" value={contentType} options={postTypeOptions} onChange={handlePostTypeSelectionChange}/>
      {contentPart}
      <span className="button-group">
        <Button 
          variant="contained" 
          sx={{marginTop: '20px'}} 
          onClick={handlePostClick} 
          disabled={title.length === 0 || contentType === 'image' && imageDate.length === 0 || contentType !== 'image' && content.length === 0}
          data-testid="dialog-button-submit"
        >
          {isEditing ? 'Update' : 'Submit'}
        </Button>
        <Button 
          variant="outlined" 
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