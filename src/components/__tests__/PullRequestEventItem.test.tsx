import React from 'react';
import {render} from '@testing-library/react';
import { PullRequestEvent } from '../../types';
import PullRequestEventItem from '../PullRequestEventItem';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
  }) => (
    <div data-testid="markdown">{children}</div>
  ));

describe('PullRequestEventItem', () => {
    const pullRequestEvent: PullRequestEvent = {
        type: 'PullRequestEvent',
        actor: {
            display_login: 'Test User',
            avatar_url: 'https://picsum.photos/200/300',
            url: 'https://sampleurl.com',
            login: 'Test User',
            html_url: 'https://sampleurl.com/html'
        },
        payload: {
            action: 'opened',
            number: 1,
            pull_request: {
                title: 'Test User',
                html_url: 'https://picsum.photos/200/300',
                user: {
                    login: 'Test User',
                    avatar_url: 'https://picsum.photos/200/300',
                    html_url: 'https://picsum.photos/200/300',
                }
            },
        },
        published: '2021-10-18T20:24:22.000Z',
    };
    it('renders pull request event', () => {
        const { getByText } = render(<PullRequestEventItem {...pullRequestEvent} />);
        expect(getByText('[Test User](https://sampleurl.com/html) opened pull request: [Test User](https://picsum.photos/200/300)')).toBeInTheDocument();
    });
    }
);
