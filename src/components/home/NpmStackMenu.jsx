import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Check, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import { KMOTION_STACKS, getKmotionNpmSnippet } from '../../utils/kmotionNpmSnippet';

const NpmStackMenu = memo(({ templateId, title, align = 'right' }) => {
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState('');
  const rootRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('mousedown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('mousedown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  const stopCardClick = useCallback((event) => {
    event.preventDefault();
    event.stopPropagation();
  }, []);

  const stopCardKey = useCallback((event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.stopPropagation();
    }
  }, []);

  const copyStack = useCallback(
    async (event, stackId, label) => {
      stopCardClick(event);
      const snippet = getKmotionNpmSnippet(templateId, stackId);
      if (!snippet) {
        toast.error('Install snippet missing');
        return;
      }
      try {
        await copyTextToClipboard(snippet);
        setCopiedId(stackId);
        setOpen(false);
        toast.success(`${label} npm snippet copied`);
        window.setTimeout(() => setCopiedId(''), 1600);
      } catch {
        toast.error('Copy failed');
      }
    },
    [stopCardClick, templateId],
  );

  return (
    <div className="relative" ref={rootRef} onClick={stopCardClick} onKeyDown={stopCardKey}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Copy npm install for ${title}`}
        onClick={(event) => {
          stopCardClick(event);
          setOpen((v) => !v);
        }}
        className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
      >
        {copiedId ? (
          <Check size={15} strokeWidth={1.75} />
        ) : (
          <Package size={15} strokeWidth={1.75} />
        )}
        npm
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="Choose framework"
          className={`absolute top-[calc(100%+8px)] z-50 min-w-[148px] overflow-hidden rounded-2xl border border-white/[0.06] bg-[#1c1c1c] py-2 shadow-[0_16px_40px_rgba(0,0,0,0.55)] ${
            align === 'left' ? 'left-0' : 'right-0'
          }`}
        >
          {KMOTION_STACKS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              role="option"
              onClick={(event) => copyStack(event, id, label)}
              className="flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-2 text-left text-[13px] font-medium text-zinc-300 transition-colors hover:bg-white/[0.06] hover:text-white"
            >
              {label}
              {copiedId === id ? <Check size={14} strokeWidth={1.75} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
});

NpmStackMenu.displayName = 'NpmStackMenu';

export default NpmStackMenu;
