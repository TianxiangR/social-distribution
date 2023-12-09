import React from 'react';
import CreatePost from '../CreatePost';
import { render, waitFor, fireEvent, screen, within } from '@testing-library/react';
import * as apis from '../../apis';
import { PostBase } from '../../types';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
}) => (
  <div>{children}</div>
));

describe('CreatePost', () => {
  it ('creates a plain text post', async () => {
    jest.spyOn(apis, 'createPost').mockResolvedValueOnce({
      ok: true,
      status: 200,
    } as Response);

    const {getByTestId} = render(<CreatePost onSubmitted={() => {}} onCancel={() => {}} />);
    const titleInput = getByTestId('create-post-title-input') as HTMLInputElement;
    const contentInput = getByTestId('create-post-content-input') as HTMLInputElement;
    const submitButton = getByTestId('create-post-submit');
    
    fireEvent.change(titleInput, {target: {value: 'Test Title'}});
    fireEvent.change(contentInput, {target: {value: 'Test Content'}});

    submitButton.click();

    await waitFor(() => {
      expect(apis.createPost).toBeCalledWith({
        title: 'Test Title',
        content: 'Test Content',
        contentType: 'text/plain',
        visibility: 'PUBLIC',
        unlisted: false,
      });
    });
  });

  it('can update post', async () => {
    jest.spyOn(apis, 'updatePost').mockResolvedValueOnce({
      ok: true,
      status: 200,
    } as Response);

    const defaultPost: PostBase = {
      id: 'test-id',
      title: 'Test Title',
      content: 'Test Content',
      contentType: 'text/plain',
      visibility: 'PUBLIC',
    };

    const {getByTestId} = render(<CreatePost onSubmitted={() => {}} onCancel={() => {}} defaultValue={defaultPost}/>);
    const titleInput = getByTestId('create-post-title-input') as HTMLInputElement;
    const contentInput = getByTestId('create-post-content-input') as HTMLInputElement;
    const submitButton = getByTestId('create-post-submit');
    
    fireEvent.change(titleInput, {target: {value: 'Test Title Edited'}});
    fireEvent.change(contentInput, {target: {value: 'Test Content Edited'}});

    submitButton.click();

    await waitFor(() => {
      expect(apis.updatePost).toBeCalledWith('test-id', {
        title: 'Test Title Edited',
        content: 'Test Content Edited',
        contentType: 'text/plain',
        visibility: 'PUBLIC',
        unlisted: false,
      });
    });
  });
});
