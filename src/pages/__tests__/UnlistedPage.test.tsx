import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import UnlistedPage from '../UnlistedPostPage';
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
  'items': [ 
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
 

describe('Unlisted Page', () => {

  it('renders posts', async () => {
    const getPostsSpy = jest.spyOn(apis, 'getUnlistedPostList').mockImplementation(() => Promise.resolve(new Response(JSON.stringify(postTestData))));
    act(() => {
      render(
        <BrowserRouter>
          <UnlistedPage />
        </BrowserRouter>
      );
    });
    await waitFor(() => expect(getPostsSpy).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(screen.getByText('hi remote nodes!')).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText('nice to meet you')).toBeInTheDocument());
  }
  );
});