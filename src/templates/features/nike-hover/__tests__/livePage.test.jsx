import React from 'react';
import { render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import { HEADLINE_LINE_ONE, STAT_VALUE } from '../constants';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useNikeFonts', () => ({
  useNikeFonts: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

jest.mock('../hooks/useViewport', () => ({
  useViewport: () => ({ isMobile: false, isTablet: false, isDesktop: true }),
}));

jest.mock('../hooks/useEmbedSpotlight', () => ({
  useEmbedSpotlight: () => {},
}));

describe('Nike Hover page shell', () => {
  it('uses a 100dvh Nike section with the stat and headline', () => {
    const { container } = render(<LivePage />);
    const section = container.querySelector('section');
    expect(section).toHaveClass('h-[100dvh]');
    expect(screen.getByText(STAT_VALUE)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(HEADLINE_LINE_ONE);
  });
});
