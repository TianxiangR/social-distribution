import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import FriendRequestPage from '../FriendRequestPage';
import * as apis from '../../apis';


describe('FriendRequestPage', () => {
  const mockFriendRequestData = {
    'type': 'friendrequests',
    'items': [
      {
        'id': 'd5919709-adf7-41f3-b027-43d14bc71c9a',
        'requester': {
          'github': 'https://github.com/skumar1206',
          'type': 'author',
          'displayName': 'testaccount20',
          'profileImage': null,
          'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/43eaac32-e373-45a9-abf5-65d848ebb959',
          'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
          'id': '43eaac32-e373-45a9-abf5-65d848ebb959',
          'is_following': false
        },
        'status': 'ACCEPTED',
        'created_at': '2023-12-05T01:04:18.254105Z'
      },
      {
        'id': '7b7dbb2a-8f4c-4bdd-8b3c-2cc1e702082b',
        'requester': {
          'github': '',
          'type': 'author',
          'displayName': 'testaccount16',
          'profileImage': null,
          'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/fe15f826-15aa-4b0d-9dbd-a991ffb7f639',
          'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
          'id': 'fe15f826-15aa-4b0d-9dbd-a991ffb7f639',
          'is_following': false
        },
        'status': 'ACCEPTED',
        'created_at': '2023-12-04T22:31:55.280230Z'
      },
      {
        'id': 'a311239c-ec0b-452e-a0f8-f78345db5207',
        'requester': {
          'github': '',
          'type': 'author',
          'displayName': 'testaccount15',
          'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/c47eead4-44b2-4473-9207-da3e004b7861/profile_image',
          'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/c47eead4-44b2-4473-9207-da3e004b7861',
          'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
          'id': 'c47eead4-44b2-4473-9207-da3e004b7861',
          'is_following': false
        },
        'status': 'ACCEPTED',
        'created_at': '2023-12-04T22:15:02.156935Z'
      },
      {
        'id': 'd0a221df-bee3-4395-8bf8-58e41754380d',
        'requester': {
          'github': '',
          'type': 'author',
          'displayName': 'testaccount13',
          'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/951a4d9c-b99f-41b8-a7eb-2ea8daf10441/profile_image',
          'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/951a4d9c-b99f-41b8-a7eb-2ea8daf10441',
          'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
          'id': '951a4d9c-b99f-41b8-a7eb-2ea8daf10441',
          'is_following': false
        },
        'status': 'ACCEPTED',
        'created_at': '2023-12-04T04:23:46.765053Z'
      },
      {
        'id': '3b6424aa-81b6-41fc-9c7f-8990fe2c947e',
        'requester': {
          'github': '',
          'type': 'author',
          'displayName': 'testaccount12',
          'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/09212541-7df1-4226-9a29-9fdb1b5b8ab2/profile_image',
          'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/09212541-7df1-4226-9a29-9fdb1b5b8ab2',
          'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
          'id': '09212541-7df1-4226-9a29-9fdb1b5b8ab2',
          'is_following': false
        },
        'status': 'ACCEPTED',
        'created_at': '2023-12-04T04:16:00.337006Z'
      },
      {
        'id': '597d3e42-5457-4816-95f7-9187dae5c6d4',
        'requester': {
          'github': '',
          'type': 'author',
          'displayName': 'testaccount5',
          'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/ee0f8bc3-be53-4eec-bcc6-f270c3a6a7b0/profile_image',
          'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/ee0f8bc3-be53-4eec-bcc6-f270c3a6a7b0',
          'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
          'id': 'ee0f8bc3-be53-4eec-bcc6-f270c3a6a7b0',
          'is_following': true
        },
        'status': 'ACCEPTED',
        'created_at': '2023-12-03T23:22:49.440594Z'
      },
      {
        'id': '5d4af291-5054-4a00-8e2c-260ebce92159',
        'requester': {
          'github': null,
          'type': 'author',
          'displayName': 'daniel',
          'profileImage': null,
          'url': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/af345566-dea0-42d8-ad5f-a6710f2bc60b',
          'host': 'cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com',
          'id': 'af345566-dea0-42d8-ad5f-a6710f2bc60b',
          'is_following': true
        },
        'status': 'ACCEPTED',
        'created_at': '2023-12-03T06:15:54.247462Z'
      },
      {
        'id': 'd88f613f-8978-4621-916b-d6e84cda2601',
        'requester': {
          'github': null,
          'type': 'author',
          'displayName': 'daniel',
          'profileImage': null,
          'url': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/3a705d6b-94e1-410e-8729-0f639a092770',
          'host': 'cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com',
          'id': '3a705d6b-94e1-410e-8729-0f639a092770',
          'is_following': false
        },
        'status': 'PENDING',
        'created_at': '2023-12-02T09:30:16.320967Z'
      },
      {
        'id': 'd6c19d18-5050-40af-9f9a-2f0bf1d064b5',
        'requester': {
          'github': 'https://github.com/philiponions',
          'type': 'author',
          'displayName': 'philiponions',
          'profileImage': null,
          'url': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/api/authors/680006d6-8d01-11ee-b9d1-0242ac120002',
          'host': 'cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com',
          'id': '680006d6-8d01-11ee-b9d1-0242ac120002',
          'is_following': true
        },
        'status': 'PENDING',
        'created_at': '2023-12-02T08:32:51.238008Z'
      },
      {
        'id': '911b63c2-e6db-47c4-a7de-0da7dab679e7',
        'requester': {
          'github': 'https://github.com',
          'type': 'author',
          'displayName': 'ADMIN',
          'profileImage': 'https://github.com',
          'url': 'https://im-a-teapot-41db2c906820.herokuapp.com/api/authors/773c3a3618894933907ac4e1fa85c892/',
          'host': 'im-a-teapot-41db2c906820.herokuapp.com',
          'id': '773c3a36-1889-4933-907a-c4e1fa85c892',
          'is_following': false
        },
        'status': 'ACCEPTED',
        'created_at': '2023-12-01T20:33:11.706982Z'
      },
      {
        'id': '3fbfae85-6bde-4d08-837e-e385ed93ef97',
        'requester': {
          'github': null,
          'type': 'author',
          'displayName': 'testaccount2',
          'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/2d144b1f-5ce0-4917-806d-23ca38170d67/profile_image',
          'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/2d144b1f-5ce0-4917-806d-23ca38170d67',
          'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
          'id': '2d144b1f-5ce0-4917-806d-23ca38170d67',
          'is_following': true
        },
        'status': 'ACCEPTED',
        'created_at': '2023-11-27T05:06:31.104483Z'
      },
      {
        'id': 'e9afcf4c-e9be-463a-9a59-021623d80da7',
        'requester': {
          'github': 'http://github.com/gjohnson',
          'type': 'author',
          'displayName': 'Greg Johnson',
          'profileImage': 'https://i.imgur.com/k7XVwpB.jpeg',
          'url': 'http://127.0.0.1:5454/authors/057aa887-40a9-4c09-be96-10bb36343d0a',
          'host': '127.0.0.1',
          'id': '057aa887-40a9-4c09-be96-10bb36343d0a',
          'is_following': false
        },
        'status': 'REJECTED',
        'created_at': '2023-11-26T23:01:14.805698Z'
      }
    ],
    'size': 12,
    'page': 1
  };

  it('should render friend requests that are pending', async () => {
    jest.spyOn(apis, 'getFriendRequestList').mockImplementation(() => Promise.resolve(new Response(JSON.stringify(mockFriendRequestData))));

    act(() => {
      render(<FriendRequestPage />);
    });
    await waitFor(() => expect(apis.getFriendRequestList).toHaveBeenCalledTimes(1));
    for (const item of mockFriendRequestData.items) {
      if (item.status === 'PENDING') {
        await waitFor(() => expect(screen.getByText(item.requester.displayName)).toBeInTheDocument());
      }
      else {
        await waitFor(() => expect(screen.queryByText(item.requester.displayName)).not.toBeInTheDocument());
      }
    }
  });
});