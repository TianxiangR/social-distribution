import React from 'react';
import { CommitCommentEvent, CreateEvent } from '../types';
import { Avatar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import ReactMarkdown from 'react-markdown';

function CreateEventItem(props: CreateEvent) {

  let content = '';
  if (props.payload.ref_type === 'repository') {
    content += `User ${props.actor.display_login} created repository [${props.repo.name}](https://github.com/${props.repo.name})`;
  } else if (props.payload.ref_type === 'branch') {
    content += `User ${props.actor.display_login} created branch [${props.payload.ref}](https://github.com/${props.repo.name}/tree/${props.payload.ref}) in [${props.repo.name}](https://github.com/${props.repo.name})`;
  }


  return (
    <>
      <div className='post-container'>
        <Avatar src={props.actor.avatar_url} sx={{width: '40px', height: '40px'}} />
        <div className='content-container'>
          <span style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {props.actor.display_login}
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

export default CreateEventItem;
