import React from 'react';
import { PullRequestReviewEvent } from '../types';
import { Avatar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import ReactMarkdown from 'react-markdown';

function PullRequestReviewEventItem(props: PullRequestReviewEvent) {

  let content = '';
  content += `User ${props.payload.pull_request.user.login} ${props.payload.action} review for pull request [${props.payload.pull_request.title}](${props.payload.pull_request.html_url})`;

  return (
    <>
      <div className='post-container'>
        <Avatar src={props.payload.pull_request.user.avatar_url} sx={{width: '40px', height: '40px'}} />
        <div className='content-container'>
          <span style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {props.payload.pull_request.user.login}
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

export default PullRequestReviewEventItem;
