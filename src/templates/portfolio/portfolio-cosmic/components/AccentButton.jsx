import React from 'react';

const VARIANT_INNER = {
  solid:
    'bg-[hsl(var(--text))] text-[hsl(var(--bg))] group-hover:bg-[hsl(var(--bg))] group-hover:text-[hsl(var(--text))] px-7 py-3.5',
  outline:
    'border-2 border-[hsl(var(--stroke))] bg-[hsl(var(--bg))] text-[hsl(var(--text))] group-hover:border-transparent px-7 py-3.5',
  ghost: 'bg-[hsl(var(--surface))] text-[hsl(var(--text))] backdrop-blur-md px-3 py-1.5 sm:px-4 sm:py-2',
};

/**
 * Pill CTA with optional accent gradient ring on hover.
 */
const AccentButton = ({
  href,
  onClick,
  children,
  variant = 'solid',
  className = '',
  as,
  ...rest
}) => {
  const Tag = as || (href ? 'a' : 'button');
  const inner = VARIANT_INNER[variant] || VARIANT_INNER.solid;

  return (
    <Tag
      href={href}
      onClick={onClick}
      type={Tag === 'button' ? 'button' : undefined}
      className={`group relative inline-flex items-center justify-center rounded-full text-sm transition-transform hover:scale-105 ${className}`}
      {...rest}
    >
      <span
        className="accent-gradient-border pointer-events-none absolute inset-[-2px] rounded-full opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <span className={`relative z-[1] inline-flex items-center gap-1.5 rounded-full ${inner}`}>
        {children}
      </span>
    </Tag>
  );
};

export default AccentButton;
