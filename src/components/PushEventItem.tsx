import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Avatar, Button, Divider, IconButton, Menu, MenuItem, Snackbar, Typography } from '@mui/material';
import { getTimeDiffString } from '../utils';

function PushEventItem() {
  const push_event_data =   {
    'id': '33666497886',
    'type': 'PushEvent',
    'actor': {
      'id': 122241916,
      'login': 'TianxiangR',
      'display_login': 'TianxiangR',
      'gravatar_id': '',
      'url': 'https://api.github.com/users/TianxiangR',
      'avatar_url': 'https://avatars.githubusercontent.com/u/122241916?'
    },
    'repo': {
      'id': 720885271,
      'name': 'TianxiangR/social-distribution-backend',
      'url': 'https://api.github.com/repos/TianxiangR/social-distribution-backend'
    },
    'payload': {
      'repository_id': 720885271,
      'push_id': 15993454510,
      'size': 1,
      'distinct_size': 1,
      'ref': 'refs/heads/main',
      'head': '3dcf7e5ac1fdf1fbe895cd5afceaa91d2705a50b',
      'before': '72d8cbafd5b73a9a590c7c0d5dd28a6b1ab9d9a7',
      'commits': [
        {
          'sha': '3dcf7e5ac1fdf1fbe895cd5afceaa91d2705a50b',
          'author': {
            'email': 'ren644120622@gmail.com',
            'name': 'TianxiangR'
          },
          'message': 'fix: fix object URL',
          'distinct': true,
          'url': 'https://api.github.com/repos/TianxiangR/social-distribution-backend/commits/3dcf7e5ac1fdf1fbe895cd5afceaa91d2705a50b'
        }
      ]
    },
    'public': true,
    'created_at': '2023-11-28T00:28:51Z'
  };
  
  const member_event_data = {
    'id': '33663881041',
    'type': 'MemberEvent',
    'actor': {
      'id': 122241916,
      'login': 'TianxiangR',
      'display_login': 'TianxiangR',
      'gravatar_id': '',
      'url': 'https://api.github.com/users/TianxiangR',
      'avatar_url': 'https://avatars.githubusercontent.com/u/122241916?'
    },
    'repo': {
      'id': 720885271,
      'name': 'TianxiangR/social-distribution-backend',
      'url': 'https://api.github.com/repos/TianxiangR/social-distribution-backend'
    },
    'payload': {
      'member': {
        'login': 'skumar1206',
        'id': 71720922,
        'node_id': 'MDQ6VXNlcjcxNzIwOTIy',
        'avatar_url': 'https://avatars.githubusercontent.com/u/71720922?v=4',
        'gravatar_id': '',
        'url': 'https://api.github.com/users/skumar1206',
        'html_url': 'https://github.com/skumar1206',
        'followers_url': 'https://api.github.com/users/skumar1206/followers',
        'following_url': 'https://api.github.com/users/skumar1206/following{/other_user}',
        'gists_url': 'https://api.github.com/users/skumar1206/gists{/gist_id}',
        'starred_url': 'https://api.github.com/users/skumar1206/starred{/owner}{/repo}',
        'subscriptions_url': 'https://api.github.com/users/skumar1206/subscriptions',
        'organizations_url': 'https://api.github.com/users/skumar1206/orgs',
        'repos_url': 'https://api.github.com/users/skumar1206/repos',
        'events_url': 'https://api.github.com/users/skumar1206/events{/privacy}',
        'received_events_url': 'https://api.github.com/users/skumar1206/received_events',
        'type': 'User',
        'site_admin': false
      },
      'action': 'added'
    },
    'public': true,
    'created_at': '2023-11-27T22:07:42Z'
  };

  let push_event_content = '';
  push_event_content += `Pushed to ${push_event_data.payload.ref}\n in [${push_event_data.repo.name}](https://github.com/${push_event_data.repo.name})\n`;
  push_event_data.payload.commits.forEach((commit: any) => {
    push_event_content += `- [${commit.sha.slice(0, 7)}](https://github.com/${push_event_data.repo.name}/commits/${commit.sha}) ${commit.message}\n`;
  });

  let member_event_content = '';
  member_event_content += `Added [${member_event_data.payload.member.login}](${member_event_data.payload.member.html_url  }) as a collaborator to [${member_event_data.repo.name}](https://github.com/${member_event_data.repo.name})\n`;


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
              {' · ' + getTimeDiffString(new Date(push_event_data.created_at))}
            </Typography>
          </span>
          <ReactMarkdown>
            {push_event_content}
          </ReactMarkdown>
        </div>
      </div>
      <div className='post-container'>
        <Avatar src={push_event_data.actor.avatar_url} sx={{width: '40px', height: '40px'}} />
        <div className='content-container'>
          <span style={{ display: 'flex', flexDirection: 'row', gap: '2px' }}>
            <Typography variant="body1" sx={{ fontWeight: 700 }}>
              {push_event_data.actor.display_login}
            </Typography>
            <Typography variant="body1">
              {' · ' + getTimeDiffString(new Date(member_event_data.created_at))}
            </Typography>
          </span>
          <ReactMarkdown>
            {member_event_content}
          </ReactMarkdown>
        </div>
      </div>
    </>
  );
}

export default PushEventItem;