import './ember-keycap.css';
import {
  BUTTON_LABEL,
  BUTTON_PRICE,
  DEFAULT_MODE,
  THEME_ID,
  VARIANT_ID,
} from './constants';

/**
 * Ember spark glyph from authored SelectedPageButton ember-keycap treatment.
 */
function SparkIcon() {
  return (
    <svg className="threeui-page-button__spark" viewBox="0 0 100 100" aria-hidden="true">
      <path d="M50 4 L61 39 L96 50 L61 61 L50 96 L39 61 L4 50 L39 39 Z" />
    </svg>
  );
}

/**
 * Exact SelectedPageButton ember-keycap treatment from RectangleButtons.tsx.
 * Machined graphite pre-order keycap with spark, price, top glow, and bloom.
 */
export function SelectedPageButton({
  mode = DEFAULT_MODE,
  className = '',
  style,
}) {
  const safeMode = mode === 'light' ? 'light' : DEFAULT_MODE;

  return (
    <div
      className={`threeui-page-button-stage threeui-page-button-stage--${THEME_ID}${className ? ` ${className}` : ''}`}
      data-mode={safeMode}
      data-variant={VARIANT_ID}
      style={style}
    >
      <span className="threeui-page-button-ember-wrap">
        <button className="threeui-page-button threeui-page-button--ember-keycap" type="button">
          <SparkIcon />
          <span>{BUTTON_LABEL}</span>
          <span className="threeui-page-button__price">{BUTTON_PRICE}</span>
        </button>
        <span className="threeui-page-button-ember-glow" aria-hidden="true" />
        <span className="threeui-page-button-ember-bloom" aria-hidden="true" />
      </span>
    </div>
  );
}

export default SelectedPageButton;
