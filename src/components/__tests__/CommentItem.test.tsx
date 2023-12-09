import React from 'react';
import { Comment } from '../../types';
import CommentItem from '../CommentItem';
import {render, waitFor} from '@testing-library/react';


    

describe('CommentItem', () => {
  const comment: Comment = {
    id: '1bb057c9-ad51-4aec-80bf-c727de26eb41',
    comment: 'This is a comment\nThis is a comment',
    author: {
      id: '6fe453ec-f11a-4cf3-92e2-e2813e22a2ee',
      displayName: 'Test User',
      profileImage: 'https://picsum.photos/200/300',
      url: 'https://picsum.photos/200/300',
      host: 'http://localhost:3000',
      github: null,
      is_following: false,
    },
    published: '2021-10-18T20:24:22.000Z',
    like_count: 0,
    is_liked: false,
  };

  it('renders comment', () => {
    const { queryAllByText } = render(<CommentItem {...comment} />);
    expect(queryAllByText('This is a comment')).toHaveLength(2);
  });

  it('like button invokes onLikeClicked', () => {
    const onLikeClicked = jest.fn();

    const { getByTestId } = render(<CommentItem {...comment} onLikeClick={onLikeClicked} />);
    const likeButton = getByTestId('comment-like-button');
    likeButton.click();

    expect(onLikeClicked).toBeCalled();
  } );
});
