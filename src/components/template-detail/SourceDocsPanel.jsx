import React, { memo, useCallback, useMemo, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import {
  SOURCE_DOC_EMPTY_MESSAGE,
  SOURCE_DOC_TABS,
} from '../../utils/resolveTemplateSourceDocs';
import { useTemplateSourceDocs } from '../../hooks/useTemplateSourceDocs';

const COPY_ICON_SIZE = 16;
const PANEL_MAX_HEIGHT = 'min(42vh, 360px)';

function bodyForTab(docs, tabId) {
  if (tabId === 'usage') return docs.usage;
  if (tabId === 'code') return docs.code;
  if (tabId === 'skill') return docs.skill;
  return '';
}

function copyLabelForTab(tabId) {
  if (tabId === 'usage') return 'Usage';
  if (tabId === 'code') return 'Code';
  if (tabId === 'skill') return 'Skill.md';
  return 'Source';
}

/**
 * Usage | Code | Skill.md panel — one Code source (not per-framework).
 * Framework-specific snippets stay in the Kmotion npm section below.
 */
const SourceDocsPanel = memo(function SourceDocsPanel({ template }) {
  const docs = useTemplateSourceDocs(template);
  const [activeTab, setActiveTab] = useState('usage');
  const [copiedTab, setCopiedTab] = useState('');

  const activeBody = useMemo(() => bodyForTab(docs, activeTab), [docs, activeTab]);
  const isCodeLoading = activeTab === 'code' && docs.codeStatus === 'loading';
  const canCopy = Boolean(activeBody) && !isCodeLoading;

  const onCopy = useCallback(async () => {
    if (!canCopy) return;
    try {
      await copyTextToClipboard(activeBody);
      const label = copyLabelForTab(activeTab);
      toast.success(`${label} copied`);
      setCopiedTab(activeTab);
      window.setTimeout(() => setCopiedTab(''), 1600);
    } catch {
      toast.error('Copy failed');
    }
  }, [activeBody, activeTab, canCopy]);

  return (
    <section
      className="overflow-hidden rounded-xl border border-white/[0.08] bg-black/40"
      aria-label="Source documentation"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.08] px-3 sm:px-4">
        <div className="flex min-w-0 items-center gap-4 overflow-x-auto" role="tablist">
          {SOURCE_DOC_TABS.map(({ id, label }) => {
            const selected = activeTab === id;
            return (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`source-doc-tab-${id}`}
                onClick={() => setActiveTab(id)}
                className={
                  selected
                    ? 'shrink-0 cursor-pointer border-b-2 border-white py-3 text-[13px] font-medium text-white'
                    : 'shrink-0 cursor-pointer border-b-2 border-transparent py-3 text-[13px] font-medium text-zinc-500 transition-colors hover:text-zinc-300'
                }
              >
                {label}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onCopy}
          disabled={!canCopy}
          aria-label={canCopy ? `Copy ${copyLabelForTab(activeTab)}` : 'Nothing to copy'}
          title={canCopy ? `Copy ${copyLabelForTab(activeTab)}` : SOURCE_DOC_EMPTY_MESSAGE}
          className={
            canCopy
              ? 'inline-flex shrink-0 cursor-pointer items-center gap-1.5 rounded-md px-2 py-1.5 text-zinc-300 transition-colors hover:bg-white/10 hover:text-white'
              : 'inline-flex shrink-0 cursor-not-allowed items-center gap-1.5 rounded-md px-2 py-1.5 text-zinc-600'
          }
        >
          {copiedTab === activeTab ? (
            <Check size={COPY_ICON_SIZE} strokeWidth={2} className="text-emerald-400" />
          ) : (
            <Copy size={COPY_ICON_SIZE} strokeWidth={1.75} />
          )}
          <span className="hidden text-[11px] font-medium sm:inline">
            {copiedTab === activeTab ? 'Copied' : 'Copy'}
          </span>
        </button>
      </div>

      <div
        role="tabpanel"
        aria-labelledby={`source-doc-tab-${activeTab}`}
        className="overflow-auto px-3.5 py-3 sm:px-4"
        style={{ maxHeight: PANEL_MAX_HEIGHT }}
      >
        {isCodeLoading ? (
          <p className="text-[12px] text-zinc-500">Loading source…</p>
        ) : activeBody ? (
          <pre className="whitespace-pre-wrap break-words font-mono text-[11px] leading-relaxed text-zinc-300 sm:text-[12px]">
            {activeBody}
          </pre>
        ) : (
          <p className="text-[12px] text-zinc-500">{SOURCE_DOC_EMPTY_MESSAGE}</p>
        )}
      </div>
    </section>
  );
});

SourceDocsPanel.displayName = 'SourceDocsPanel';

export default SourceDocsPanel;
