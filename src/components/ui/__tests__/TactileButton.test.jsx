import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import TactileButton from '../TactileButton';

describe('TactileButton', () => {
  it('renders a labeled button with the tactile class', () => {
    render(<TactileButton>Get for free</TactileButton>);
    const btn = screen.getByRole('button', { name: 'Get for free' });
    expect(btn).toHaveClass('tactile-btn');
  });

  it('renders as a router link when to is set', () => {
    render(
      <MemoryRouter>
        <TactileButton to="/p/kage">Open full page</TactileButton>
      </MemoryRouter>,
    );
    expect(screen.getByRole('link', { name: 'Open full page' })).toHaveAttribute(
      'href',
      '/p/kage',
    );
  });
});
