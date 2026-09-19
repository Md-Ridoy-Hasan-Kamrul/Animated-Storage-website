import React from 'react';
import { createEvent, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  BUTTON_LABEL,
  BLOOM_OUTLINE_BUTTON_DEFAULT_PROPS,
  THEME_ID,
  VARIANT_ID,
} from '../constants';

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
import { RectangleButtons } from '../RectangleButtons';

describe('RectangleButtons bloom-outline-button host', () => {
  it('mounts the Bloom outline CTA with paired dots and sliding duplicate label', () => {
    const { container } = render(
      <RectangleButtons {...BLOOM_OUTLINE_BUTTON_DEFAULT_PROPS} />,
    );
    const stage = container.querySelector(
      `.threeui-page-button-stage.threeui-page-button-stage--${THEME_ID}`,
    );
    const button = container.querySelector(
      '.threeui-page-button.threeui-page-button--bloom-outline',
    );
    const dots = container.querySelectorAll('.threeui-page-button__bloom-dot');
    const labelSpans = container.querySelectorAll(
      '.threeui-page-button__bloom-label > span',
    );

    expect(stage).toBeTruthy();
    expect(stage.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(stage.getAttribute('data-mode')).toBe('dark');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(BUTTON_LABEL);
    expect(dots).toHaveLength(2);
    expect(labelSpans).toHaveLength(2);
    expect(labelSpans[0].textContent).toBe(BUTTON_LABEL);
    expect(labelSpans[1].textContent).toBe(BUTTON_LABEL);
    expect(VARIANT_ID).toBe('bloom-outline-button');
  });

  it('updates bloom CSS variables on pointer move', () => {
    const { container } = render(
      <RectangleButtons {...BLOOM_OUTLINE_BUTTON_DEFAULT_PROPS} />,
    );
    const button = container.querySelector('.threeui-page-button--bloom-outline');
    button.getBoundingClientRect = () => ({
      left: 0,
      top: 0,
      width: 200,
      height: 40,
      right: 200,
      bottom: 40,
    });

    const move = createEvent.pointerMove(button, { clientX: 50, clientY: 10 });
    Object.defineProperties(move, {
      clientX: { get: () => 50 },
      clientY: { get: () => 10 },
    });
    fireEvent(button, move);

    expect(button.style.getPropertyValue('--bloom-outline-x')).toBe('50.0px');
    expect(button.style.getPropertyValue('--bloom-outline-y')).toBe('10.0px');
    expect(button.style.getPropertyValue('--bloom-outline-diameter')).toMatch(/px$/);
  });
});

describe('Bloom Outline Button Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.bloom-outline-button-rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('.threeui-page-button--bloom-outline')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
