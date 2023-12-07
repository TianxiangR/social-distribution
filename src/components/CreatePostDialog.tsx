import React from 'react';
import { Dialog, DialogTitle, DialogContent} from '@mui/material';
import './CreatePostDialog.css';
import CreatePost from './CreatePost';

export interface CreatePostDialogProps {
  open: boolean;
  onClose: () => void;
}

function CreatePostDialog(props: CreatePostDialogProps) {
  const {open, onClose} = props;

  const onSubmitted = () => {
    console.log('submitted');
    onClose();
    window.location.reload();
  };

  const onCancel = () => {
    onClose();
  };
  

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg" data-testid="create-post-dialog">
      <DialogTitle>
        Create Post
      </DialogTitle>
      <DialogContent >
        <CreatePost onSubmitted={onSubmitted} onCancel={onCancel} />
      </DialogContent>
    </Dialog>
  );
}

export default CreatePostDialog;