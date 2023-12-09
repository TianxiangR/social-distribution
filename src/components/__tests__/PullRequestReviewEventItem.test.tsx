import React from 'react';
import {render} from '@testing-library/react';
import PullRequestReviewEventItem from '../PullRequestReviewEvent';
import { PullRequestReviewEvent } from '../../types';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
  }) => (
    <div data-testid="markdown">{children}</div>
  ));

describe('PullRequestReviewEventItem', () => {
    const pullRequestReviewEvent: PullRequestReviewEvent = {
        type: 'PullRequestReviewEvent',
        actor: {
            display_login: 'Test User',
            avatar_url: 'https://picsum.photos/200/300',
            url: 'https://sampleurl.com',
            login: 'Test User',
            html_url: 'https://sampleurl.com/html'
        },
        payload: {
            action: 'submitted',
            pull_request: {
                title: 'Test User',
                html_url: 'https://picsum.photos/200/300',
                user: {
                    login: 'Test User',
                    avatar_url: 'https://picsum.photos/200/300',
                    html_url: 'https://picsum.photos/200/300',
                }
            },
            review: {
                body: 'This is a test review',
                html_url: 'https://picsum.photos/200/300',
                user: {
                    login: 'Test User',
                    avatar_url: 'https://picsum.photos/200/300',
                    html_url: 'https://picsum.photos/200/300',
                }
            }
        },
        published: '2021-10-18T20:24:22.000Z',
    };
    it('renders pull request event', () => {
        const { getByText } = render(<PullRequestReviewEventItem {...pullRequestReviewEvent} />);
        expect(getByText('[Test User](https://picsum.photos/200/300) submitted review for pull request: [Test User](https://picsum.photos/200/300)')).toBeInTheDocument();
    });
    }
);
