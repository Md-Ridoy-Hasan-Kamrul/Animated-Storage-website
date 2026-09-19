import './trochil-signal.css';
import {
  BUTTON_LABEL,
  DEFAULT_MODE,
  THEME_ID,
  VARIANT_ID,
} from './constants';

/**
 * Exact SelectedPageButton trochil-signal treatment from RectangleButtons.tsx.
 * Restrained black technical rectangle with fine lit edge and warm signal sheen.
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
      <button className="threeui-page-button threeui-page-button--trochil" type="button">
        <span>{BUTTON_LABEL}</span>
      </button>
    </div>
  );
}

export default SelectedPageButton;
