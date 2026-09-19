import './bloom-outline-button.css';
import {
  BUTTON_LABEL,
  DEFAULT_MODE,
  THEME_ID,
  VARIANT_ID,
} from './constants';
import { useBloomOutlinePointer } from './hooks/useBloomOutlinePointer';

/**
 * Exact SelectedPageButton bloom-outline-button treatment from RectangleButtons.tsx.
 * Pale blossom outline, paired dots, pointer ink bloom, magnetic drift, sliding label.
 */
export function SelectedPageButton({
  mode = DEFAULT_MODE,
  className = '',
  style,
}) {
  const safeMode = mode === 'light' ? 'light' : DEFAULT_MODE;
  const { onPointerMove, onPointerLeave } = useBloomOutlinePointer();

  return (
    <div
      className={`threeui-page-button-stage threeui-page-button-stage--${THEME_ID}${className ? ` ${className}` : ''}`}
      data-mode={safeMode}
      data-variant={VARIANT_ID}
      style={style}
    >
      <button
        className="threeui-page-button threeui-page-button--bloom-outline"
        type="button"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <span className="threeui-page-button__bloom-dot" aria-hidden="true" />
        <span className="threeui-page-button__bloom-label">
          <span>{BUTTON_LABEL}</span>
          <span aria-hidden="true">{BUTTON_LABEL}</span>
        </span>
        <span className="threeui-page-button__bloom-dot" aria-hidden="true" />
      </button>
    </div>
  );
}

export default SelectedPageButton;
