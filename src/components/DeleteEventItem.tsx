import React from 'react';
import { DeleteEvent } from '../types';
import { Avatar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import ReactMarkdown from 'react-markdown';

function DeleteEventItem(props: DeleteEvent) {

  let content = '';
  content += `[${props.actor.display_login}](${props.actor.html_url}) deleted resource [${props.repo.name}](https://github.com/${props.repo.name})`;

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

export default DeleteEventItem;
