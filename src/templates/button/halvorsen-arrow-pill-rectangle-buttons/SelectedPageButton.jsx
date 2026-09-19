import './halvorsen-arrow-pill.css';
import {
  BUTTON_LABEL,
  DEFAULT_MODE,
  THEME_ID,
  VARIANT_ID,
} from './constants';

/**
 * Short chevron from authored ArrowIcon (long=false) — viewBox 0 0 12 12.
 */
function ArrowIcon() {
  return (
    <svg viewBox="0 0 12 12" aria-hidden="true">
      <path d="M3 1.5 8 6 3 10.5" />
    </svg>
  );
}

/**
 * Exact SelectedPageButton halvorsen-arrow-pill treatment from RectangleButtons.tsx.
 * Bone-white capsule with black inset arrow disc; label “See the work”.
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
      <button
        className="threeui-page-button threeui-page-button--arrow-pill threeui-page-button--halvorsen"
        type="button"
      >
        <span>{BUTTON_LABEL}</span>
        <span className="threeui-page-button__disc">
          <ArrowIcon />
        </span>
      </button>
    </div>
  );
}

export default SelectedPageButton;
