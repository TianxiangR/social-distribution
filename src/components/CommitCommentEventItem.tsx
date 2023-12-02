import React from 'react';
import { CommitCommentEvent } from '../types';
import { Avatar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import ReactMarkdown from 'react-markdown';

function CommitCommentEventItem(props: CommitCommentEvent) {

  let content = '';
  content += `User ${props.payload.comment.user.login} created comment "${props.payload.comment.body}" on commit [${props.payload.comment.html_url}](${props.payload.comment.html_url})`;


  return (
    <>
      <div className='post-container'>
        <Avatar src={props.payload.comment.user.avatar_url} sx={{width: '40px', height: '40px'}} />
        <div className='content-container'>
          <span style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {props.payload.comment.user.login}
            </Typography>
            <Typography variant="body1">
              {' · ' + getTimeDiffString(new Date(props.published))}
            </Typography>
          </span>
          <ReactMarkdown>
            {content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default CommitCommentEventItem;
