import React, { memo, useMemo } from 'react';
import {
  colorForTokenType,
  detectDocsLanguage,
  tokenizeSource,
  THREEUI_SYNTAX_COLORS,
} from './syntaxHighlight';

/**
 * Display-only colorful source view. Clipboard still copies plain text upstream.
 */
const HighlightedCode = memo(function HighlightedCode({ source, tabId }) {
  const language = useMemo(() => detectDocsLanguage(tabId, source), [tabId, source]);
  const tokens = useMemo(() => tokenizeSource(source, language), [source, language]);

  return (
    <pre
      className="source-docs-code m-0 whitespace-pre-wrap break-words font-mono text-[11px] leading-[1.65] sm:text-[12px]"
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
  );
});

HighlightedCode.displayName = 'HighlightedCode';

export default HighlightedCode;
