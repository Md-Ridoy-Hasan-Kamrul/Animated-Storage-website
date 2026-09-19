import './tideform-outline.css';
import {
  BUTTON_LABEL,
  DEFAULT_MODE,
  THEME_ID,
  VARIANT_ID,
} from './constants';

function ArrowIcon() {
  return (
    <svg viewBox="0 0 21 9" aria-hidden="true">
      <path d="M0 4.5h18M14.5 1.2 18.3 4.5l-3.8 3.3" />
    </svg>
  );
}

/**
 * Exact SelectedPageButton tideform-outline treatment from RectangleButtons.tsx.
 * Square technical outline with tracked mono type, warm hover, long arrow.
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
      <button className="threeui-page-button threeui-page-button--tideform" type="button">
        <span>{BUTTON_LABEL}</span>
        <ArrowIcon />
      </button>
    </div>
  );
}

export default SelectedPageButton;
