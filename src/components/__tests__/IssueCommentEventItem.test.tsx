import React from 'react';
import { render } from '@testing-library/react';
import IssueCommentEventItem from '../IssueCommentEventItem';
import { IssueCommentEvent } from '../../types';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
  }) => (
    <div data-testid="markdown">{children}</div>
  ));

describe('IssueCommentEventItem', () => {
    const mockEvent: IssueCommentEvent = {
        type: 'IssueCommentEvent',
        actor: {
            display_login: 'Test User',
            avatar_url: 'https://picsum.photos/200/300',
            url: 'https://sampleurl.com',
            login: 'Test User',
            html_url: 'https://sampleurl.com/html'
        },
        payload: {
            action: 'created',
            issue: {
                title: 'Test User',
                html_url: 'https://picsum.photos/200/300',
                number: 5,
                user: {
                    login: 'Test User',
                    avatar_url: 'https://picsum.photos/200/300',
                    html_url: 'https://picsum.photos/200/300',
                }
            },
            comment: {
                body: 'This is a test comment',
                user: {
                    login: 'Test User',
                    avatar_url: 'https://picsum.photos/200/300',
                    html_url: 'https://picsum.photos/200/300',
                }
            }
        },
        published: '2021-10-18T20:24:22.000Z',
    };

    it('renders the user name', () => {
        const { getByText } = render(<IssueCommentEventItem {...mockEvent} />);
        const nameElement = getByText(mockEvent.actor.display_login);
        expect(nameElement).toBeInTheDocument();
    });

    it('renders the comment', () => {
        const { getByText } = render(<IssueCommentEventItem {...mockEvent} />);
        const commentElement = getByText('[Test User](https://sampleurl.com/html) created comment "This is a test comment" on issue [Test User](https://picsum.photos/200/300)');
        expect(commentElement).toBeInTheDocument();
    });
});
