import React from 'react';
import {render} from '@testing-library/react';
import { CommitCommentEvent } from '../../types';
import CommitCommentEventItem from '../CommitCommentEventItem';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
  }) => (
    <div data-testid="markdown">{children}</div>
  ));

describe('CommitCommentEventItem', () => {
    const CommitCommentEvent: CommitCommentEvent = {
        type: 'CommitCommentEvent',
        actor: {
            display_login: 'Test User',
            avatar_url: 'https://picsum.photos/200/300',
            url: 'https://sampleurl.com',
            login: 'Test User',
            html_url: 'https://sampleurl.com/html'
        },
        payload: {
            action: 'created',
            comment: {
                html_url: 'https://picsum.photos/200/300',
                user: {
                    login: 'Test User',
                    avatar_url: 'https://picsum.photos/200/300',
                    html_url: 'https://picsum.photos/200/300',
                },
                id: 0,
                body: 'This is a test comment'
            },
        },
        published: '2021-10-18T20:24:22.000Z',
    };
    it('renders commit comment event', () => {
        const { getByText } = render(<CommitCommentEventItem {...CommitCommentEvent} />);
        expect(getByText('[Test User](https://picsum.photos/200/300) created comment "This is a test comment" on commit [https://picsum.photos/200/300](https://picsum.photos/200/300)')).toBeInTheDocument();
    });
    }
);
