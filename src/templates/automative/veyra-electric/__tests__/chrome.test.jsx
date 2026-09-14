import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { usePageChrome } from '../hooks/usePageChrome';
import {
  FOOTER_NOTES,
  HEADLINE,
  INTRO_HINT,
  INTRO_LEAD,
  PAGE_HTML_CLASS,
  PAGE_TITLE,
  WORDMARK,
} from '../constants';

const ChromeHost = () => {
  usePageChrome();
  return null;
};

describe('Veyra Electric chrome', () => {
  beforeAll(() => {
    class FakeImage {
      decode() {
        return Promise.resolve();
      }

      set src(_) {
        if (this.onload) this.onload();
      }
    }
    global.Image = FakeImage;
    global.ResizeObserver = class {
      observe() {}
      disconnect() {}
    };
    HTMLCanvasElement.prototype.getContext = () => ({ drawImage: () => {} });
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

  it('renders the VEYRA wordmark, title, and footer notes', async () => {
    render(<App />);
    expect(screen.getByText(WORDMARK)).toBeInTheDocument();
    expect(screen.getByText(HEADLINE)).toBeInTheDocument();
    expect(screen.getByText(INTRO_LEAD)).toBeInTheDocument();
    expect(screen.getByText(INTRO_HINT)).toBeInTheDocument();
    FOOTER_NOTES.forEach((note) => {
      expect(screen.getByText(note.title)).toBeInTheDocument();
      expect(screen.getByText(note.copy)).toBeInTheDocument();
    });
    expect(await screen.findByRole('button', { name: 'Explore the drive unit' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Explore the battery pack' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Body colour' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Wheel design' })).toBeInTheDocument();
  });

  it('paints page chrome and restores it on unmount', () => {
    document.title = 'Kmotion';
    const { unmount } = render(<ChromeHost />);
    expect(document.title).toBe(PAGE_TITLE);
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(true);
    unmount();
    expect(document.documentElement.classList.contains(PAGE_HTML_CLASS)).toBe(false);
    expect(document.title).toBe('Kmotion');
  });
});
