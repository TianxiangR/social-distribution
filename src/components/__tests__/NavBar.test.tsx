import React from 'react';
import NavBar from '../NavBar';
import {render, waitFor, screen, fireEvent} from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// eslint-disable-next-line react/display-name
jest.mock('react-markdown', () => ({ children }: {
  children: React.ReactNode
}) => (
  <div>{children}</div>
));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));


describe('NavBar', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  const options = [
    {
      icon: <div>icon1</div>,
      label: 'label1',
      path: '/path1',
    },
    {
      icon: <div>icon2</div>,
      label: 'label2',
      path: '/path2',
    },
  ];

  it('renders options', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <NavBar options={options} />
      </BrowserRouter>
    );
    expect(queryByText('label1')).toBeInTheDocument();
    expect(queryByText('label2')).toBeInTheDocument();
  });

  it('selects the first option by default', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <NavBar options={options} />
      </BrowserRouter>
    );
    expect(queryByText('label1')?.parentElement?.parentElement).toHaveClass('Mui-selected');
  });

  it('selects the option based on selection prop', () => {
    const { queryByText } = render(
      <BrowserRouter>
        <NavBar options={options} selection='label2' />
      </BrowserRouter>
    );
    expect(queryByText('label2')?.parentElement?.parentElement).toHaveClass('Mui-selected');
  });

  it('navigates to the path when an option is clicked', () => {
    const { getByText } = render(
      <BrowserRouter>
        <NavBar options={options} />
      </BrowserRouter>
    );
    const label1 = getByText('label1');
    const label2 = getByText('label2');

    fireEvent.click(label1);
    expect(mockNavigate).toHaveBeenCalledWith('/path1');

    fireEvent.click(label2);
    expect(mockNavigate).toHaveBeenCalledWith('/path2');
  });
});