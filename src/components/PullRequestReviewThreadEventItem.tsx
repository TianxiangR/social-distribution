import React from 'react';
import { PullRequestReviewThreadEvent } from '../types';
import { Avatar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import ReactMarkdown from 'react-markdown';

function PullRequestReviewThreadEventItem(props: PullRequestReviewThreadEvent) {

  let content = '';
  content += `[${props.actor.display_login}](${props.actor.html_url}) ${props.payload.action} the thread [${props.payload.thread.html_url}](${props.payload.thread.html_url}) on pull request [${props.payload.pull_request.title}](${props.payload.pull_request.html_url})`;

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

export default PullRequestReviewThreadEventItem;
