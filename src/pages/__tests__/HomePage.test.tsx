import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import HomePage from '../HomePage';
import * as apis from '../../apis';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
  children: React.ReactNode
}) => (
  <div data-testid="markdown">{children}</div>
));



const postTestData = {
  'type': 'posts',
  'items': [ {
    'id': '33958801707',
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
      'id': 720884423,
      'name': 'TianxiangR/social-distribution-frontend',
      'url': 'https://api.github.com/repos/TianxiangR/social-distribution-frontend'
    },
    'payload': {
      'repository_id': 720884423,
      'push_id': 16162289955,
      'size': 1,
      'distinct_size': 1,
      'ref': 'refs/heads/test',
      'head': '31fd34ce4c31708ce1ad5bcbee4214f4801e3d9d',
      'before': '42a7d844ef0c9731f601224a21bfbd1bbb481ac8',
      'commits': [
        {
          'sha': '31fd34ce4c31708ce1ad5bcbee4214f4801e3d9d',
          'author': {
            'email': 'tianxia3@ualberta.ca',
            'name': 'Tianxiang Ren'
          },
          'message': 'test: added test cacses',
          'distinct': true,
          'url': 'https://api.github.com/repos/TianxiangR/social-distribution-frontend/commits/31fd34ce4c31708ce1ad5bcbee4214f4801e3d9d'
        }
      ]
    },
    'public': true,
    'published': '2023-12-07T00:37:04Z'
  },
  {
    'type': 'post',
    'title': 'hi remote nodes!',
    'id': '47dde358-73d6-42d3-8b3c-277d7bdbff4a',
    'origin': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/aa32342a-6861-4eaa-87be-1ff3b38dde00/posts/47dde358-73d6-42d3-8b3c-277d7bdbff4a',
    'source': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/aa32342a-6861-4eaa-87be-1ff3b38dde00/posts/47dde358-73d6-42d3-8b3c-277d7bdbff4a',
    'description': 'This post is about hi remote nodes!',
    'author': {
      'github': null,
      'type': 'author',
      'displayName': 'newnew',
      'profileImage': null,
      'url': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/aa32342a-6861-4eaa-87be-1ff3b38dde00',
      'host': 'cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com',
      'id': 'aa32342a-6861-4eaa-87be-1ff3b38dde00',
      'is_following': false
    },
    'categories': [],
    'count': 0,
    'comments': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/aa32342a-6861-4eaa-87be-1ff3b38dde00/posts/47dde358-73d6-42d3-8b3c-277d7bdbff4a/comments',
    'published': '2023-12-05T01:42:47+00:00',
    'visibility': 'PUBLIC',
    'unlisted': false,
    'content': 'nice to meet you',
    'contentType': 'text/plain',
    'is_liked': false,
    'like_count': 0,
    'is_my_post': false,
    'html_url': 'https://social-distribution-frontend-d762e1fa4ee6.herokuapp.com/unlisted/47dde358-73d6-42d3-8b3c-277d7bdbff4a'
  }
  ]
};
 

describe('HomePage', () => {

  it('renders posts', async () => {
    const getPostsSpy = jest.spyOn(apis, 'getPostList').mockImplementation(() => Promise.resolve(new Response(JSON.stringify(postTestData))));
    act(() => {
      render(
        <BrowserRouter>
          <HomePage />
        </BrowserRouter>
      );
    });
    await waitFor(() => expect(getPostsSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('hi remote nodes!')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('nice to meet you')).toBeInTheDocument());
  }
  );
});