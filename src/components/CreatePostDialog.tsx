import React from 'react';
import { Dialog, DialogTitle, DialogContent} from '@mui/material';
import { TPost } from '../types';
import './CreatePostDialog.css';
import CreatePost from './CreatePost';
import { createPost } from '../apis';

export interface CreatePostDialogProps {
  open: boolean;
  onClose: () => void;
}

function CreatePostDialog(props: CreatePostDialogProps) {
  const {open, onClose} = props;

  const onSubmit = (post: TPost) => {
    createPost(post);
    onClose();
    window.location.reload();
  };

  const onCancel = () => {
    onClose();
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle>
        Create Post
      </DialogTitle>
      <DialogContent >
        <CreatePost onSubmit={onSubmit} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostDialog;