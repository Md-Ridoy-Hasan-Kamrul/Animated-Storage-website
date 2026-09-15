import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { HEADING_LINE_ONE } from '../constants';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/useSmoothCursor', () => ({
  useSmoothCursor: () => ({
    smoothRef: { current: { x: -999, y: -999 } },
    setRaw: jest.fn(),
  }),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useLithosFonts', () => ({
  useLithosFonts: () => {},
}));

jest.mock('../hooks/useEmbedSpotlight', () => ({
  useEmbedSpotlight: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

beforeAll(() => {
  HTMLCanvasElement.prototype.getContext = jest.fn(() => ({
    canvas: { width: 100, height: 100, toDataURL: () => 'data:image/png;base64,mask' },
    clearRect: jest.fn(),
    createRadialGradient: jest.fn(() => ({ addColorStop: jest.fn() })),
    beginPath: jest.fn(),
    arc: jest.fn(),
    fill: jest.fn(),
  }));
});

describe('Interactive Discovery page shell', () => {
  it('uses a 100dvh hero section with Lithos heading', () => {
    const { container } = render(<LivePage />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('h-screen');
    expect(section).toHaveAttribute('data-lithos-height', '100dvh');
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(HEADING_LINE_ONE);
  });
});
