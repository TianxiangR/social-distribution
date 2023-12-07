import React from 'react';
import CreatePostDialog from '../CreatePostDialog';
import { render, waitFor, fireEvent, screen, within } from '@testing-library/react';
import * as apis from '../../apis';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
}) => (
  <div>{children}</div>
));


describe('CreatePostDialog', () => {
  it ('shows dialog when open is true', () => {
    const {getByTestId} = render(<CreatePostDialog open={true} onClose={() => {}} />);
    const dialog = getByTestId('create-post-dialog');
    expect(dialog).toBeVisible();
  });

  it('hides dialog when open is false', () => {
    const {queryByTestId} = render(<CreatePostDialog open={false} onClose={() => {}} />);
    const dialog = queryByTestId('create-post-dialog');
    expect(dialog).toBeNull();
  });

  it('calls onClose when cancel button is clicked', () => {
    const onClose = jest.fn();
    const {getByTestId} = render(<CreatePostDialog open={true} onClose={onClose} />);
    const cancelButton = getByTestId('create-post-cancel');
    fireEvent.click(cancelButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('calls onClose when submit button is clicked', async () => {
    jest.spyOn(apis, 'createPost').mockResolvedValueOnce({
      ok: true,
      status: 200,
    } as Response);
    
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    delete window.location;
    Object.defineProperty(window, 'location', {
      value: { reload: jest.fn() },
      writable: true
    });

    jest.spyOn(window.location, 'reload').mockImplementation(() => {});

    const onClose = jest.fn();
    const {getByTestId} = render(<CreatePostDialog open={true} onClose={onClose}/>);

    const titleInput = getByTestId('create-post-title-input') as HTMLInputElement;
    const contentInput = getByTestId('create-post-content-input') as HTMLInputElement;
    const submitButton = getByTestId('create-post-submit');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    submitButton.click();

    await waitFor(() => {
      expect(apis.createPost).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
  });
});