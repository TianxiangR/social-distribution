import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import UnlistedPost from '../UnlistedPost';
import { PostDetail } from '../../types';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
  children: React.ReactNode
}) => (
  <div data-testid="markdown">{children}</div>
));


describe('UnlistedPost', () => {

  it ('renders a plain text post', () => {
    const post: PostDetail = {
      'type': 'post',
      'title': 'hi world',
      'id': 'd6a9cd52-98ba-47c7-9d63-e708d7e534f4',
      'author': {
        'github': null,
        'type': 'author',
        'displayName': 'mark8m',
        'profileImage': null,
        'url': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/aa227f77-51a3-4d01-b522-c41e2ac9972c',
        'host': 'cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com',
        'id': 'aa227f77-51a3-4d01-b522-c41e2ac9972c',
        'is_following': false
      },
      'count': 1,
      'published': '2023-12-05T00:41:35+00:00',
      'visibility': 'PUBLIC',
      'unlisted': true,
      'content': '!',
      'contentType': 'text/plain',
      'is_liked': true,
      'like_count': 1,
      'is_my_post': false,
      'html_url': 'https://social-distribution-frontend-d762e1fa4ee6.herokuapp.com/unlisted/d6a9cd52-98ba-47c7-9d63-e708d7e534f4',
      'commentsSrc': {
        'comments': [
          {
            'type': 'comment',
            'author': {
              'github': 'https://github.com/TianxiangR',
              'type': 'author',
              'displayName': 'testaccount',
              'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/465f0c29-690e-4960-96b4-98341eb29fca/profile_image',
              'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/465f0c29-690e-4960-96b4-98341eb29fca',
              'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
              'id': '465f0c29-690e-4960-96b4-98341eb29fca',
              'is_following': false
            },
            'comment': 'hello',
            'published': '2023-12-05T00:46:35.261018+00:00',
            'id': 'c24966e9-9e8a-4537-bf63-f9248e953627',
            'is_liked': false,
            'like_count': 0
          }
        ],
        
      }
    };
    const { getByText } = render(<UnlistedPost {...post} />);
    expect(getByText('hi world')).toBeInTheDocument();
  });

  it ('renders a markdown post', () => {
    const post = {
      'type': 'post',
      'title': 'hi 👾👾',
      'id': 'fe9414f5-1257-40de-b9a2-59966c998a9e',
      'origin': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/aa227f77-51a3-4d01-b522-c41e2ac9972c/posts/fe9414f5-1257-40de-b9a2-59966c998a9e',
      'source': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/aa227f77-51a3-4d01-b522-c41e2ac9972c/posts/fe9414f5-1257-40de-b9a2-59966c998a9e',
      'description': 'This post is about hi 👾👾',
      'author': {
        'github': null,
        'type': 'author',
        'displayName': 'mark8m',
        'profileImage': null,
        'url': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/aa227f77-51a3-4d01-b522-c41e2ac9972c',
        'host': 'cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com',
        'id': 'aa227f77-51a3-4d01-b522-c41e2ac9972c',
        'is_following': false
      },
      'categories': [],
      'count': 5,
      'comments': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/aa227f77-51a3-4d01-b522-c41e2ac9972c/posts/fe9414f5-1257-40de-b9a2-59966c998a9e/comments',
      'published': '2023-12-04T15:08:59+00:00',
      'visibility': 'PUBLIC',
      'unlisted': true,
      'content': '# i love markdown\n## so much customization\n- like this\n- and `coding like this`',
      'contentType': 'text/markdown',
      'is_liked': true,
      'like_count': 2,
      'is_my_post': false,
      'html_url': 'https://social-distribution-frontend-d762e1fa4ee6.herokuapp.com/unlisted/fe9414f5-1257-40de-b9a2-59966c998a9e',
      'commentsSrc': {
        'type': 'comments',
        'page': 1,
        'post': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/aa227f77-51a3-4d01-b522-c41e2ac9972c/posts/fe9414f5-1257-40de-b9a2-59966c998a9e',
        'id': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/aa227f77-51a3-4d01-b522-c41e2ac9972c/posts/fe9414f5-1257-40de-b9a2-59966c998a9e/comments',
        'comments': [
          {
            'type': 'comment',
            'author': {
              'github': '',
              'type': 'author',
              'displayName': 'coolguy456',
              'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/1a412451-a3ec-4b65-81db-7616754c84d2/profile_image',
              'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/1a412451-a3ec-4b65-81db-7616754c84d2',
              'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
              'id': '1a412451-a3ec-4b65-81db-7616754c84d2',
              'is_following': false
            },
            'comment': 'again',
            'published': '2023-12-04T20:47:39.141651+00:00',
            'id': '06a6624b-db79-42a0-957d-aa0270573936',
            'is_liked': false,
            'like_count': 0
          },
          {
            'type': 'comment',
            'author': {
              'github': '',
              'type': 'author',
              'displayName': 'coolguy456',
              'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/1a412451-a3ec-4b65-81db-7616754c84d2/profile_image',
              'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/1a412451-a3ec-4b65-81db-7616754c84d2',
              'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
              'id': '1a412451-a3ec-4b65-81db-7616754c84d2',
              'is_following': false
            },
            'comment': 'testing123',
            'contentType': 'text/plain',
            'published': '2023-12-04T20:46:19.444518+00:00',
            'id': '76d5b989-361d-494d-84b1-37d314ba7aa2',
            'is_liked': false,
            'like_count': 0
          },
          {
            'type': 'comment',
            'author': {
              'github': '',
              'type': 'author',
              'displayName': 'coolguy456',
              'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/1a412451-a3ec-4b65-81db-7616754c84d2/profile_image',
              'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/1a412451-a3ec-4b65-81db-7616754c84d2',
              'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
              'id': '1a412451-a3ec-4b65-81db-7616754c84d2',
              'is_following': false
            },
            'comment': 'test',
            'contentType': 'text/plain',
            'published': '2023-12-04T20:43:44.842675+00:00',
            'id': '33fe1361-4b48-48d3-8ccb-9c4262b9eb1a',
            'is_liked': false,
            'like_count': 0
          },
          {
            'type': 'comment',
            'author': {
              'github': 'https://github.com/mark8m',
              'type': 'author',
              'displayName': 'newtest',
              'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/b63126d5-ce04-4db0-8cdb-a0bf7d2f9f09/profile_image',
              'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/b63126d5-ce04-4db0-8cdb-a0bf7d2f9f09',
              'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
              'id': 'b63126d5-ce04-4db0-8cdb-a0bf7d2f9f09',
              'is_following': false
            },
            'comment': 'same twin',
            'contentType': 'text/plain',
            'published': '2023-12-04T20:43:03.984137+00:00',
            'id': 'd72d287c-3936-495e-953d-1d22b77fcdad',
            'is_liked': false,
            'like_count': 0
          },
          {
            'type': 'comment',
            'author': {
              'github': '',
              'type': 'author',
              'displayName': 'coolguy456',
              'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/1a412451-a3ec-4b65-81db-7616754c84d2/profile_image',
              'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/1a412451-a3ec-4b65-81db-7616754c84d2',
              'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
              'id': '1a412451-a3ec-4b65-81db-7616754c84d2',
              'is_following': false
            },
            'comment': 'nice',
            'contentType': 'text/plain',
            'published': '2023-12-04T20:41:59.867369+00:00',
            'id': '0d2547ed-0dfb-45b6-9cb0-79790ab47932',
            'is_liked': false,
            'like_count': 0
          }
        ],
        'size': 5
      }
    } as PostDetail;
    const { getByTestId } = render(<UnlistedPost {...post} />);
    const markdownText = getByTestId('markdown')?.textContent;
    expect(markdownText).toContain('i love markdown');
    expect(markdownText).toContain('so much customization');
  });
});