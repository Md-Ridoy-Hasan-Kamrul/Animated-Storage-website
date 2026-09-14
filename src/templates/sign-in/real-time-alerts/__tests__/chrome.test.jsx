import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  BADGE_COPY,
  EMAIL_PLACEHOLDER,
  FOOTER_LINK,
  FRAMED_HTML_CLASS,
  GOOGLE_LABEL,
  H1_COPY,
  HL1_COPY,
  HL2_COPY,
  LOGIN_LABEL,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
  PASSWORD_PLACEHOLDER,
} from '../constants';

const ChromeHost = () => {
  usePageChrome();
  return null;
};

describe('Real-Time Alerts chrome', () => {
  beforeAll(() => {
    window.matchMedia = window.matchMedia || ((query) => ({
      matches: false,
      media: query,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
    }));
    Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
      configurable: true,
      writable: true,
      value: jest.fn().mockResolvedValue(undefined),
    });
    Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
      configurable: true,
      writable: true,
      value: jest.fn(),
    });
  });

  it('renders the Signal login copy and both falcon videos', () => {
    const { container } = render(<App />);
    expect(screen.getByText(BADGE_COPY)).toBeInTheDocument();
    expect(screen.getByText(HL1_COPY)).toBeInTheDocument();
    expect(screen.getByText(HL2_COPY)).toBeInTheDocument();
    expect(screen.getByText(H1_COPY)).toBeInTheDocument();
    expect(screen.getByText(LOGIN_LABEL)).toBeInTheDocument();
    expect(screen.getByText(GOOGLE_LABEL)).toBeInTheDocument();
    expect(screen.getByText(FOOTER_LINK)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(EMAIL_PLACEHOLDER)).toHaveAttribute('type', 'email');
    expect(screen.getByPlaceholderText(PASSWORD_PLACEHOLDER)).toHaveAttribute('type', 'password');
    expect(container.querySelectorAll('video')).toHaveLength(2);
    expect(container.querySelector('.photo-img--wide')).toHaveAttribute('aria-hidden', 'true');
  });

  it('paints page chrome and restores it on unmount', () => {
    document.title = 'Kmotion';
    const { unmount } = render(<ChromeHost />);
    expect(document.title).toBe(PAGE_TITLE);
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(true);
    expect(document.documentElement.classList.contains(FRAMED_HTML_CLASS)).toBe(false);
    unmount();
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(false);
    expect(document.title).toBe('Kmotion');
  });
});
