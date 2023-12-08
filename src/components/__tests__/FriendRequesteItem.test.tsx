import React from 'react';
import FriendRequestItem from '../FriendRequestItem';
import {render, waitFor} from '@testing-library/react';
import { FriendRequest } from '../../types';
import * as apis from '../../apis';

describe('FriendRequestItem', () => {
  const friendRequest: FriendRequest = {
    id: '1bb057c9-ad51-4aec-80bf-c727de26eb41',
    requester: {
      id: '6fe453ec-f11a-4cf3-92e2-e2813e22a2ee',
      displayName: 'Test User',
      profileImage: 'https://picsum.photos/200/300',
      url: 'https://picsum.photos/200/300',
      host: 'http://localhost:3000',
      github: null,
      is_following: false,
    },
    status: 'PENDING',
    created_at: '2021-10-18T20:24:22.000Z',
  };

  it('renders friend request', () => {
    const { queryAllByText } = render(<FriendRequestItem {...friendRequest} />);
    expect(queryAllByText('Test User')).toHaveLength(1);
  });

  it('accept button invokes onAcceptClicked', async () => {
    const onAcceptClicked = jest.fn();
    jest.spyOn(apis, 'acceptFriendRequest').mockResolvedValueOnce(
      {
        ok: true,
        status: 200,
      } as Response
    );

    const { getByTestId } = render(<FriendRequestItem {...friendRequest} onRequestProcessed={onAcceptClicked} />);
    const acceptButton = getByTestId('friend-request-accept-button');
    acceptButton.click();

    await waitFor(() => expect(onAcceptClicked).toBeCalled());
  } );

  it('reject button invokes onRejectClicked', async () => {
    const onRejectClicked = jest.fn();
    jest.spyOn(apis, 'rejectFriendRequest').mockResolvedValueOnce(
      {
        ok: true,
        status: 200,
      } as Response
    );

    const { getByTestId } = render(<FriendRequestItem {...friendRequest} onRequestProcessed={onRejectClicked} />);
    const rejectButton = getByTestId('friend-request-reject-button');
    rejectButton.click();
    
    await waitFor(() => expect(onRejectClicked).toBeCalled());
  } );
});