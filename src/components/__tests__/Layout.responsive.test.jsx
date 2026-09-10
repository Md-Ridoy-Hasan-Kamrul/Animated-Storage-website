import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Layout from '../Layout';
import { LAYOUT_BREAKPOINTS } from '../../constants/layoutBreakpoints';

const setViewportWidth = (width) => {
  Object.defineProperty(window, 'innerWidth', {
    configurable: true,
    writable: true,
    value: width,
  });
};

const renderLayout = () =>
  render(
    <MemoryRouter>
      <Layout />
    </MemoryRouter>,
  );

describe('Layout responsive shell', () => {
  const originalWidth = window.innerWidth;

  afterEach(() => {
    setViewportWidth(originalWidth);
  });

  it('renders the KMOTION logo link on mobile S', () => {
    setViewportWidth(LAYOUT_BREAKPOINTS.MOBILE_S);
    renderLayout();
    expect(screen.getByRole('link', { name: /kmotion home/i })).toBeInTheDocument();
    expect(screen.getByAltText('KMOTION')).toHaveAttribute('height', '32');
  });

  it('hides primary desktop nav below laptop and shows menu toggle', () => {
    setViewportWidth(LAYOUT_BREAKPOINTS.TABLET);
    renderLayout();
    expect(screen.queryByRole('navigation', { name: 'Primary' })).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /open menu/i })).toBeInTheDocument();
  });

  it('shows primary desktop nav from laptop width', () => {
    setViewportWidth(LAYOUT_BREAKPOINTS.LAPTOP);
    renderLayout();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /open menu/i })).not.toBeInTheDocument();
  });

  it('opens and closes the mobile menu', () => {
    setViewportWidth(LAYOUT_BREAKPOINTS.MOBILE_L);
    renderLayout();

    fireEvent.click(screen.getByRole('button', { name: /open menu/i }));
    expect(screen.getByRole('navigation', { name: 'Mobile' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close menu/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /close menu/i }));
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();
  });

  it('exposes header height as a CSS variable for sticky children', () => {
    setViewportWidth(1440);
    const { container } = renderLayout();
    const shell = container.querySelector('[data-layout-shell]');
    // Falls back to layout metrics; ResizeObserver may refine after paint
    expect(shell.style.getPropertyValue('--kmotion-header-height')).toMatch(/^\d+px$/);
  });

  it('updates logo size when resizing from mobile S to desktop', () => {
    setViewportWidth(LAYOUT_BREAKPOINTS.MOBILE_S);
    renderLayout();
    expect(screen.getByAltText('KMOTION')).toHaveAttribute('height', '32');

    act(() => {
      setViewportWidth(1440);
      window.dispatchEvent(new Event('resize'));
    });

    expect(screen.getByAltText('KMOTION')).toHaveAttribute('height', '64');
  });

  it.each([
    [LAYOUT_BREAKPOINTS.MOBILE_S, '32'],
    [LAYOUT_BREAKPOINTS.MOBILE_M, '36'],
    [LAYOUT_BREAKPOINTS.MOBILE_L, '40'],
    [LAYOUT_BREAKPOINTS.TABLET, '48'],
    [LAYOUT_BREAKPOINTS.LAPTOP, '56'],
    [1440, '64'],
  ])('at width %i uses logo height %s', (width, logoHeight) => {
    setViewportWidth(width);
    renderLayout();
    expect(screen.getByAltText('KMOTION')).toHaveAttribute('height', String(logoHeight));
  });
});
