import React from 'react';
import { PublicEvent } from '../types';
import { Avatar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import ReactMarkdown from 'react-markdown';

function PublicEventItem(props: PublicEvent) {

  let content = '';
  content += `[${props.actor.display_login}](${props.actor.html_url}) made [${props.repo.name}](https://github.com/${props.repo.name}) public`;

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

export default PublicEventItem;
