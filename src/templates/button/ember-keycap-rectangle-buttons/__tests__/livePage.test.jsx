import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  BUTTON_LABEL,
  BUTTON_PRICE,
  EMBER_KEYCAP_DEFAULT_PROPS,
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

describe('RectangleButtons ember-keycap host', () => {
  it('mounts the Ember keycap with spark, Pre-order, price, glow, and bloom', () => {
    const { container } = render(<RectangleButtons {...EMBER_KEYCAP_DEFAULT_PROPS} />);
    const stage = container.querySelector(
      `.threeui-page-button-stage.threeui-page-button-stage--${THEME_ID}`,
    );
    const wrap = container.querySelector('.threeui-page-button-ember-wrap');
    const button = container.querySelector(
      '.threeui-page-button.threeui-page-button--ember-keycap',
    );
    const spark = container.querySelector('.threeui-page-button__spark');
    const price = container.querySelector('.threeui-page-button__price');
    const glow = container.querySelector('.threeui-page-button-ember-glow');
    const bloom = container.querySelector('.threeui-page-button-ember-bloom');

    expect(stage).toBeTruthy();
    expect(stage.getAttribute('data-variant')).toBe(VARIANT_ID);
    expect(stage.getAttribute('data-mode')).toBe('dark');
    expect(wrap).toBeTruthy();
    expect(button).toBeTruthy();
    expect(button.textContent).toContain(BUTTON_LABEL);
    expect(price.textContent).toBe(BUTTON_PRICE);
    expect(spark).toBeTruthy();
    expect(spark.getAttribute('viewBox')).toBe('0 0 100 100');
    expect(glow).toBeTruthy();
    expect(bloom).toBeTruthy();
    expect(VARIANT_ID).toBe('ember-keycap');
  });
});

describe('Ember Keycap Rectangle Buttons LivePage', () => {
  it('mounts the shader frame host without a back control in embed chrome', () => {
    const { container } = render(
      <MemoryRouter>
        <LivePage />
      </MemoryRouter>,
    );
    expect(container.querySelector('.shader-frame')).toBeTruthy();
    expect(container.querySelector('.ember-keycap-rectangle-buttons-page')).toBeTruthy();
    expect(container.querySelector('.threeui-page-button--ember-keycap')).toBeTruthy();
    expect(screen.queryByLabelText('Go back')).toBeNull();
  });
});
