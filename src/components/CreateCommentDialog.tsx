import React, {useState} from 'react';
import { TextField, Button, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { createComment } from '../apis';

export interface CreateCommentDialogProps {
  open: boolean;
  onClose?: () => void;
  postId: string;
  onSuccess?: () => void;
}

function CreateCommentDialog(props: CreateCommentDialogProps) {
  const {open, onClose, postId, onSuccess} = props;
  const [content, setContent] = useState('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSendClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    createComment(postId, content).then((response) => {
      if (response.ok) {
        onSuccess?.();
        onClose?.();
      }
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>
        Write a comment
      </DialogTitle>
      <DialogContent >
        <TextField
          label="Content"
          variant="outlined"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={handleOnChange}
          sx={{marginTop: '10px'}}
        />
        <Button variant="contained" sx={{marginTop: '10px'}} onClick={handleSendClick} disabled={content.length === 0}>
          Send
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default CreateCommentDialog;