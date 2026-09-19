import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { GENERATIVE_TREE_DEFAULT_PROPS, SOURCE_URL, VARIANT_ID } from '../constants';

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
import { ElementsCollection } from '../ElementsCollection';
import { GenerativeTree } from '../GenerativeTree';

describe('GenerativeTree host', () => {
  it('mounts the tree iframe with the CSP-safe public scene URL', () => {
    const { container } = render(
      <GenerativeTree {...GENERATIVE_TREE_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />,
    );
    const host = container.querySelector('.threeui-background.generative-tree');
    const frame = container.querySelector('iframe');
    expect(host).toBeTruthy();
    expect(host.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(frame).toBeTruthy();
    expect(frame.getAttribute('src')).toBe(SOURCE_URL);
    expect(frame.getAttribute('sandbox')).toBe('allow-scripts');
    expect(frame.getAttribute('title')).toBe('Generative Tree background');
  });

  it('posts generative-tree-controls on load', () => {
    const postMessage = jest.fn();
    const { container } = render(
      <GenerativeTree {...GENERATIVE_TREE_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />,
    );
    const frame = container.querySelector('iframe');
    Object.defineProperty(frame, 'contentWindow', {
      value: { postMessage },
      configurable: true,
    });
    fireEvent.load(frame);
    expect(postMessage).toHaveBeenCalledWith(
      {
        type: 'generative-tree-controls',
        controls: { speed: 1, paused: false },
      },
      '*',
    );
  });
});

describe('ElementsCollection entry', () => {
  it('forwards generative-tree defaults into GenerativeTree', () => {
    const { container } = render(
      <ElementsCollection {...GENERATIVE_TREE_DEFAULT_PROPS} sourceUrl={SOURCE_URL} />,
    );
    expect(container.querySelector('[data-variant="generative-tree"]')).toBeTruthy();
    expect(container.querySelector('iframe')?.getAttribute('src')).toBe(SOURCE_URL);
  });
});

describe('Generative Tree Elements LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.generative-tree-elements-page')).toBeTruthy();
    expect(container.querySelector('iframe')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
