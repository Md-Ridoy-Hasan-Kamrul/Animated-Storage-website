import React, { memo, useMemo } from 'react';
import {
  colorForTokenType,
  detectDocsLanguage,
  tokenizeSource,
  THREEUI_SYNTAX_COLORS,
} from './syntaxHighlight';

/** Max chars painted in the panel — full multi-MB HTML freezes layout. Copy still uses full source upstream. */
export const DISPLAY_MAX_CHARS = 48_000;

/**
 * @param {number} charCount
 */
export function formatSourceSize(charCount) {
  if (charCount < 1024) return `${charCount} chars`;
  if (charCount < 1024 * 1024) return `${Math.round(charCount / 1024)} KB`;
  return `${(charCount / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Display-only colorful source view. Clipboard still copies plain text upstream.
 */
const HighlightedCode = memo(function HighlightedCode({ source, tabId }) {
  const truncated = Boolean(source && source.length > DISPLAY_MAX_CHARS);
  const displaySource = useMemo(() => {
    if (!source) return '';
    if (source.length <= DISPLAY_MAX_CHARS) return source;
    return source.slice(0, DISPLAY_MAX_CHARS);
  }, [source]);

  const language = useMemo(
    () => detectDocsLanguage(tabId, displaySource),
    [tabId, displaySource],
  );
  const tokens = useMemo(
    () => tokenizeSource(displaySource, language),
    [displaySource, language],
  );

  return (
    <div>
      <pre
        className="source-docs-code m-0 overflow-x-auto whitespace-pre font-mono text-[11px] leading-[1.65] sm:text-[12px]"
        style={{ color: THREEUI_SYNTAX_COLORS.plain }}
      >
        <code>
          {tokens.map((tok, index) => (
            <span
              // Token stream is stable for a given source string; index is fine for display spans.
              key={`${index}-${tok.type}-${tok.text.length}`}
              style={{ color: colorForTokenType(tok.type) }}
            >
              {tok.text}
            </span>
          ))}
        </code>
      </pre>
      {truncated ? (
        <p className="mt-3 border-t border-white/[0.06] pt-3 text-[11px] leading-relaxed text-zinc-500">
          Previewing first {formatSourceSize(DISPLAY_MAX_CHARS)} of{' '}
          {formatSourceSize(source.length)}. Use Copy for the full source.
        </p>
      ) : null}
    </div>
  );
});

HighlightedCode.displayName = 'HighlightedCode';

export default HighlightedCode;
