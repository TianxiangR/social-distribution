import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar, Button, Divider, IconButton, Menu, MenuItem, Snackbar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import { PushEvent } from '../types';

function PushEventItem(push_event_data: PushEvent) {
  let push_event_content = '';
  push_event_content += `Pushed to ${push_event_data.payload.ref}\n in [${push_event_data.repo.name}](https://github.com/${push_event_data.repo.name})\n`;
  push_event_data.payload.commits.forEach((commit: any) => {
    push_event_content += `- [${commit.sha.slice(0, 7)}](https://github.com/${push_event_data.repo.name}/commits/${commit.sha}) ${commit.message}\n`;
  });

  return (
    <>
      <div className='post-container'>
        <Avatar src={push_event_data.actor.avatar_url} sx={{width: '40px', height: '40px'}} />
        <div className='content-container'>
          <span style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {push_event_data.actor.display_login}
            </Typography>
            <Typography variant="body1">
              {' · ' + getTimeDiffString(new Date(push_event_data.published))}
            </Typography>
          </span>
          <ReactMarkdown>
            {push_event_content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default PushEventItem;