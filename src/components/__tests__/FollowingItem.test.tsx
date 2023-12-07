import React from 'react';
import FollowingItem, { FollowngItemProps } from '../FollowingItem';
import { render, screen } from '@testing-library/react';

describe('FollowingItem', () => {
  it('should render the correct display name', () => {
    const props: FollowngItemProps  = {
      id: 'test-id',
      url: '',
      github: '',
      displayName: 'test display name',
      profileImage: '',
      host: '',
      is_following: false,
      onChangeRelation: () => {}
    };
    render(<FollowingItem {...props} />);
    expect(screen.getByText('test display name')).toBeInTheDocument();
  });
});