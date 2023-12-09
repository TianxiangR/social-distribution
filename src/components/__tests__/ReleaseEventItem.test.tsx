import React from 'react';
import {render} from '@testing-library/react';
import { ReleaseEvent } from '../../types';
import ReleaseEventItem from '../ReleaseEventItem';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
  }) => (
    <div data-testid="markdown">{children}</div>
  ));

describe('ReleaseEventItem', () => {
    const releaseEventItem: ReleaseEvent = {
        type: 'ReleaseEvent',
        actor: {
            display_login: 'Test User',
            avatar_url: 'https://picsum.photos/200/300',
            url: 'https://sampleurl.com',
            login: 'Test User',
            html_url: 'https://sampleurl.com/html'
        },
        payload: {
            action: 'published',
            release: {
                html_url: 'https://picsum.photos/200/300',
                tag_name: 'v1.0.0',
                name: 'Test Release',
                body: 'This is a test release',
                repo: {
                    name: 'testrepo',
                    url: 'https://sampleurl.com/html'
                },
                owner: {
                    login: 'Test User',
                    avatar_url: 'https://picsum.photos/200/300',
                    html_url: 'https://picsum.photos/200/300',
                }
            },
        },
        published: '2021-10-18T20:24:22.000Z',
    };
    it('renders release event', () => {
        const { getByText } = render(<ReleaseEventItem {...releaseEventItem} />);
        expect(getByText('[Test User](https://sampleurl.com/html) published release [Test Release](https://picsum.photos/200/300) for repo [testrepo](https://github.com/testrepo)')).toBeInTheDocument();
    });
    }
);
