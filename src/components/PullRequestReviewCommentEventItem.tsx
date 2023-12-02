import React from 'react';
import { PullRequestReviewCommentEvent } from '../types';
import { Avatar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';
import ReactMarkdown from 'react-markdown';

function PullRequestReviewCommentEventItem(props: PullRequestReviewCommentEvent) {

  let content = '';
  content += `[${props.payload.comment.user.login}](${props.payload.comment.user.html_url}) commented "${props.payload.comment.body}" on pull request: [${props.payload.pull_request.title}](${props.payload.pull_request.html_url})`;

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

export default PullRequestReviewCommentEventItem;
