import './dark-glass.css';
import { BUTTON_LABEL, DEFAULT_MODE } from './constants';

function classNames(...parts) {
  return parts.filter(Boolean).join(' ');
}

function SectionButton({ children = BUTTON_LABEL, className = '', type = 'button' }) {
  return (
    <button className={classNames('section-button', className)} type={type}>
      <span className="section-button__title">{children}</span>
      <span className="section-button__circle" aria-hidden="true" />
    </button>
  );
}

/**
 * Exact DarkGlassButton from SectionElements.tsx — dark-pill rectangle.
 */
export function DarkGlassButton({
  className,
  style,
  mode = DEFAULT_MODE,
}) {
  const safeMode = mode === 'light' ? 'light' : 'dark';

  return (
    <div
      className={classNames('section-element', 'section-element--glass-button', className)}
      data-mode={safeMode}
      style={style}
    >
      <SectionButton />
    </div>
  );
}

export default DarkGlassButton;
