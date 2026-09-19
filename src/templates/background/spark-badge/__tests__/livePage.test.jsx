import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { SOURCE_URL, SPARK_BADGE_DEFAULT_PROPS, VARIANT_ID } from '../constants';

beforeAll(() => {
  class IntersectionObserverStub {
    constructor(callback) {
      this.callback = callback;
    }

    observe() {
      this.callback([{ isIntersecting: true }]);
    }

    unobserve() {}

    disconnect() {}
  }

  global.IntersectionObserver = IntersectionObserverStub;
});

jest.mock('../hooks/useEmbedMode', () => ({
  useEmbedMode: () => ({ isEmbed: false, isStandalone: false }),
}));

jest.mock('../hooks/usePageChrome', () => ({
  usePageChrome: () => {},
}));

jest.mock('../hooks/useStandaloneBack', () => ({
  useStandaloneBack: () => jest.fn(),
}));

import LivePage from '../LivePage';
import { SparkBadge } from '../SparkBadge';

describe('SparkBadge host', () => {
  it('mounts the badge iframe with the CSP-safe public scene URL', () => {
    const { container } = render(
      <SparkBadge {...SPARK_BADGE_DEFAULT_PROPS} sourceUrl={SOURCE_URL} variant={VARIANT_ID} />,
    );
    const host = container.querySelector('.spark-badge');
    const frame = container.querySelector('iframe.spark-badge__frame');
    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe('badge');
    expect(frame).toBeTruthy();
    expect(frame.getAttribute('src')).toBe(SOURCE_URL);
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    expect(frame.getAttribute('title')).toBe('Animated credential badge in rain');
  });

  it('marks the frame ready after load', () => {
    const { container } = render(
      <SparkBadge {...SPARK_BADGE_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />,
    );
    const frame = container.querySelector('iframe');
    fireEvent.load(frame);
    expect(frame.className).toContain('is-ready');
    expect(container.querySelector('.spark-badge').getAttribute('data-state')).toBe('ready');
  });
});

describe('Spark Badge LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.spark-badge-page')).toBeTruthy();
    expect(container.querySelector('iframe.spark-badge__frame')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
