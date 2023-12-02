import React from 'react';
import { GollumEvent } from '../types';
import { Avatar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import ReactMarkdown from 'react-markdown';

function GollumEventItem(props: GollumEvent) {

  let content = '';
  content += `User ${props.actor.display_login} added/updated the following pages in wiki [${props.repo.name}](https://github.com/${props.repo.name}/wiki)\n`;
  props.payload.pages.forEach((page) => {
    content += `* [${page.page_name}](${page.html_url})\n`;
  });

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

export default GollumEventItem;
