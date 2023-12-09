import React from 'react';
import {render} from '@testing-library/react';
import { CreateEvent } from '../../types';
import CreateEventItem from '../CreateEventItem';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
    children: React.ReactNode
  }) => (
    <div data-testid="markdown">{children}</div>
  ));

describe('CreateEventItem', () => {
    const createEventItem: CreateEvent = {
        type: 'CreateEvent',
        actor: {
            display_login: 'Test User',
            avatar_url: 'https://picsum.photos/200/300',
            url: 'https://sampleurl.com',
            login: 'Test User',
            html_url: 'https://sampleurl.com/html'
        },
        payload: {
            ref: 'repository',
            ref_type: 'repository',
            master_branch: 'main',
        },
        published: '2021-10-18T20:24:22.000Z',
        repo: {
            id: 0,
            name: 'testrepo',
            url: 'https://sampleurl.com/html'
        }
    };
    it('renders create event', () => {
        const { getByText } = render(<CreateEventItem {...createEventItem} />);
        expect(getByText('[Test User](https://sampleurl.com/html) created repository [testrepo](https://github.com/testrepo)')).toBeInTheDocument();
    });
    }
);
