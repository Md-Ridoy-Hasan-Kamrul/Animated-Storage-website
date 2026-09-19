import './meridian-keycap-primary.css';
import {
  BUTTON_LABEL,
  DEFAULT_MODE,
  THEME_ID,
  VARIANT_ID,
} from './constants';

/**
 * Exact SelectedPageButton meridian-keycap-primary treatment from RectangleButtons.tsx.
 * Blue illuminated keycap with physical base, LED, and pressed hover travel.
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
        className="threeui-page-button threeui-page-button--meridian threeui-page-button--meridian-primary"
        type="button"
      >
        <span className="threeui-page-button__led" />
        <span>{BUTTON_LABEL}</span>
      </button>
    </div>
  );
}

export default SelectedPageButton;
