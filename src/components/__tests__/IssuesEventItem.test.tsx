import React from 'react';
import {render} from '@testing-library/react';
import { IssuesEvent } from '../../types';
import IssuesEventItem from '../IssuesEventItem';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
  }) => (
    <div data-testid="markdown">{children}</div>
  ));

describe('IssuesEventItem', () => {
    const issuesEventItem: IssuesEvent = {
        type: 'IssuesEvent',
        actor: {
            display_login: 'Test User',
            avatar_url: 'https://picsum.photos/200/300',
            url: 'https://sampleurl.com',
            login: 'Test User',
            html_url: 'https://sampleurl.com/html'
        },
        payload: {
            action: 'opened',
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
        },
        published: '2021-10-18T20:24:22.000Z',
    };
    it('renders pull request event', () => {
        const { getByText } = render(<IssuesEventItem {...issuesEventItem} />);
        expect(getByText('[Test User](https://sampleurl.com/html) opened issue [Test User](https://picsum.photos/200/300)')).toBeInTheDocument();
    });
    }
);
