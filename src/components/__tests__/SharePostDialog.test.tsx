import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import SharePostDialog from '../SharePostDialog';
import * as apis from '../../apis';


describe('SharePostDialog', () => {
  const followerData = {
    'type': 'authors',
    'items': [
      {
        'github': null,
        'type': 'author',
        'displayName': 'testaccount2',
        'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/2d144b1f-5ce0-4917-806d-23ca38170d67/profile_image',
        'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/2d144b1f-5ce0-4917-806d-23ca38170d67',
        'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
        'id': '2d144b1f-5ce0-4917-806d-23ca38170d67',
        'is_following': true
      },
      {
        'github': 'https://github.com',
        'type': 'author',
        'displayName': 'ADMIN',
        'profileImage': 'https://github.com',
        'url': 'https://im-a-teapot-41db2c906820.herokuapp.com/api/authors/773c3a3618894933907ac4e1fa85c892/',
        'host': 'im-a-teapot-41db2c906820.herokuapp.com',
        'id': '773c3a36-1889-4933-907a-c4e1fa85c892',
        'is_following': false
      },
      {
        'github': null,
        'type': 'author',
        'displayName': 'daniel',
        'profileImage': null,
        'url': 'https://cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com/authors/af345566-dea0-42d8-ad5f-a6710f2bc60b',
        'host': 'cmput404-ctrl-alt-defeat-api-12dfa609f364.herokuapp.com',
        'id': 'af345566-dea0-42d8-ad5f-a6710f2bc60b',
        'is_following': true
      },
      {
        'github': '',
        'type': 'author',
        'displayName': 'testaccount5',
        'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/ee0f8bc3-be53-4eec-bcc6-f270c3a6a7b0/profile_image',
        'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/ee0f8bc3-be53-4eec-bcc6-f270c3a6a7b0',
        'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
        'id': 'ee0f8bc3-be53-4eec-bcc6-f270c3a6a7b0',
        'is_following': true
      },
      {
        'github': '',
        'type': 'author',
        'displayName': 'testaccount12',
        'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/09212541-7df1-4226-9a29-9fdb1b5b8ab2/profile_image',
        'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/09212541-7df1-4226-9a29-9fdb1b5b8ab2',
        'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
        'id': '09212541-7df1-4226-9a29-9fdb1b5b8ab2',
        'is_following': false
      },
      {
        'github': '',
        'type': 'author',
        'displayName': 'testaccount13',
        'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/951a4d9c-b99f-41b8-a7eb-2ea8daf10441/profile_image',
        'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/951a4d9c-b99f-41b8-a7eb-2ea8daf10441',
        'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
        'id': '951a4d9c-b99f-41b8-a7eb-2ea8daf10441',
        'is_following': false
      },
      {
        'github': '',
        'type': 'author',
        'displayName': 'testaccount15',
        'profileImage': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/api/authors/c47eead4-44b2-4473-9207-da3e004b7861/profile_image',
        'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/c47eead4-44b2-4473-9207-da3e004b7861',
        'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
        'id': 'c47eead4-44b2-4473-9207-da3e004b7861',
        'is_following': false
      },
      {
        'github': '',
        'type': 'author',
        'displayName': 'testaccount16',
        'profileImage': null,
        'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/fe15f826-15aa-4b0d-9dbd-a991ffb7f639',
        'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
        'id': 'fe15f826-15aa-4b0d-9dbd-a991ffb7f639',
        'is_following': false
      },
      {
        'github': 'https://github.com/skumar1206',
        'type': 'author',
        'displayName': 'testaccount20',
        'profileImage': null,
        'url': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/authors/43eaac32-e373-45a9-abf5-65d848ebb959',
        'host': 'https://cmput404-project-backend-tian-aaf1fa9b20e8.herokuapp.com/',
        'id': '43eaac32-e373-45a9-abf5-65d848ebb959',
        'is_following': false
      }
    ],
    'size': 9,
    'page': 1
  };




  it('should render SharePostDialog', () => {
    jest.spyOn(apis, 'getFollowers').mockResolvedValue({
      ok: true,
      status: 200,
      json: () => Promise.resolve(followerData),
    } as Response);
    render(<SharePostDialog open={true} onClose={() => {}} onSubmit={() => {}}/>);
    expect(screen.getByText('Share Post')).toBeInTheDocument();
  });
});