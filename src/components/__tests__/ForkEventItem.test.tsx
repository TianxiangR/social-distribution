import React from 'react';
import {render} from '@testing-library/react';
import { ForkEvent } from '../../types';
import ForkEventItem from '../ForkEventItem';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
  }) => (
    <div data-testid="markdown">{children}</div>
  ));

describe('ForkEventItem', () => {
    const forkEventItem: ForkEvent = {
        type: 'ForkEvent',
        actor: {
            display_login: 'Test User',
            avatar_url: 'https://picsum.photos/200/300',
            url: 'https://sampleurl.com',
            login: 'Test User',
            html_url: 'https://sampleurl.com/html'
        },
        payload: {
            forkee: {
                name: 'Test User',
                owner: {
                    login: 'Test User',
                    avatar_url: 'https://picsum.photos/200/300',
                    html_url: 'https://picsum.photos/200/300',
                },
                full_name: 'Test User'
            },
        },
        published: '2021-10-18T20:24:22.000Z',
        repo: {
            id: 0,
            name: 'testRepo',
            url: 'https://sampleurl.com/html'
        }
    };
    it('renders pull request event', () => {
        const { getByText } = render(<ForkEventItem {...forkEventItem} />);
        expect(getByText('[Test User](https://sampleurl.com/html) forked repository [testRepo](https://github.com/testRepo)')).toBeInTheDocument();
    });
    }
);
