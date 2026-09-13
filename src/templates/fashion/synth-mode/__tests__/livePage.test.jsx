import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import LivePage from '../LivePage';
import {
  BRAND,
  CTA_LABEL,
  DRAWER_SHOP_TITLE,
  GARMENTS,
  HEADLINE_LINES,
  PAGE_SHELL_CLASS,
} from '../constants';
import { BG_IMAGE_1 } from '../content';

jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn(),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useSynthFonts', () => ({
  useSynthFonts: () => {},
}));

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

jest.mock('../hooks/useEmbedReveal', () => ({
  useEmbedReveal: () => {},
}));

jest.mock('../hooks/useImageReveal', () => ({
  useImageReveal: () => ({ maskUrl: '', grid: { cell: 40, x: 0, y: 0 } }),
}));

describe('Synth Mode page shell', () => {
  it('uses the white LGPSM shell with the fashion headline', () => {
    const { container } = render(<LivePage />);
    const root = container.firstChild;
    PAGE_SHELL_CLASS.split(' ').forEach((cls) => {
      expect(root).toHaveClass(cls);
    });
    expect(screen.getByText(HEADLINE_LINES[0])).toBeInTheDocument();
    expect(screen.getByText(BRAND)).toBeInTheDocument();
    expect(container.querySelector('[data-reveal-layer]')).toHaveStyle({
      backgroundImage: `url(${BG_IMAGE_1})`,
    });
  });

  it('opens the Catalog drawer from SHOP NOW', () => {
    render(<LivePage />);
    fireEvent.click(screen.getByRole('button', { name: CTA_LABEL }));
    expect(screen.getByText(DRAWER_SHOP_TITLE)).toBeInTheDocument();
    expect(screen.getByText(GARMENTS[0].title)).toBeInTheDocument();
  });
});
