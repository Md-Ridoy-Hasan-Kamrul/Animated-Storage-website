import React, { memo, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Check, ChevronDown, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import { KMOTION_STACKS, getKmotionNpmSnippet } from '../../utils/kmotionNpmSnippet';

const MENU_WIDTH = 208;
const MENU_ESTIMATE_H = 292;
const VIEWPORT_PAD = 10;

const STACK_TONE = {
  react: { dot: '#61DAFB', hint: 'React' },
  vue: { dot: '#42B883', hint: 'Vue 3' },
  svelte: { dot: '#FF3E00', hint: 'Svelte' },
  solid: { dot: '#76B3E0', hint: 'Solid' },
  js: { dot: '#F7DF1E', hint: 'Vanilla JS' },
};

const NpmStackMenu = memo(({ templateId, title }) => {
  const [open, setOpen] = useState(false);
  const [copiedId, setCopiedId] = useState('');
  const [coords, setCoords] = useState({ top: 0, left: 0, openUp: false });
  const rootRef = useRef(null);
  const menuRef = useRef(null);

  const placeMenu = useCallback(() => {
    const trigger = rootRef.current;
    if (!trigger) return;
    const btn = trigger.getBoundingClientRect();
    const spaceBelow = window.innerHeight - btn.bottom;
    const openUp = spaceBelow < MENU_ESTIMATE_H + VIEWPORT_PAD;
    const top = openUp ? btn.top - 10 : btn.bottom + 10;
    let left = btn.right - MENU_WIDTH;
    const maxLeft = window.innerWidth - MENU_WIDTH - VIEWPORT_PAD;
    left = Math.min(Math.max(VIEWPORT_PAD, left), Math.max(VIEWPORT_PAD, maxLeft));
    setCoords({ top, left, openUp });
  }, []);

  useLayoutEffect(() => {
    if (!open) return undefined;
    placeMenu();
    window.addEventListener('resize', placeMenu);
    window.addEventListener('scroll', placeMenu, true);
    return () => {
      window.removeEventListener('resize', placeMenu);
      window.removeEventListener('scroll', placeMenu, true);
    };
  }, [open, placeMenu]);

  useEffect(() => {
    if (!open) return undefined;

    const onPointerDown = (event) => {
      const target = event.target;
      if (rootRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
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
        className={`inline-flex cursor-pointer items-center gap-1.5 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
          open
            ? 'border-white/25 bg-white text-black'
            : 'border-white/10 text-zinc-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white'
        }`}
      >
        {copiedId ? (
          <Check size={15} strokeWidth={1.75} />
        ) : (
          <Package size={15} strokeWidth={1.75} />
        )}
        npm
        <ChevronDown
          size={13}
          strokeWidth={2}
          className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {open
        ? createPortal(
            <div
              ref={menuRef}
              role="listbox"
              aria-label="Choose framework"
              className="fixed z-[80]"
              style={{
                top: coords.top,
                left: coords.left,
                width: MENU_WIDTH,
                transform: coords.openUp ? 'translateY(-100%)' : undefined,
              }}
            >
              <div className="overflow-hidden rounded-2xl border border-white/15 bg-[#111]/95 shadow-[0_24px_64px_rgba(0,0,0,0.72),0_0_0_1px_rgba(255,255,255,0.04)] backdrop-blur-xl">
                <div className="border-b border-white/[0.08] bg-gradient-to-r from-white/[0.07] to-transparent px-3.5 py-2.5">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                    Copy for
                  </p>
                  <p className="mt-0.5 text-[13px] font-semibold text-white">Your stack</p>
                </div>

                <div className="p-1.5">
                  {KMOTION_STACKS.map(({ id, label }) => {
                    const tone = STACK_TONE[id];
                    return (
                      <button
                        key={id}
                        type="button"
                        role="option"
                        onClick={(event) => copyStack(event, id, label)}
                        className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-white/[0.08]"
                      >
                        <span
                          className="h-2.5 w-2.5 shrink-0 rounded-full shadow-[0_0_10px_currentColor]"
                          style={{ backgroundColor: tone.dot, color: tone.dot }}
                          aria-hidden
                        />
                        <span className="min-w-0 flex-1">
                          <span className="block text-[13px] font-semibold text-zinc-100 group-hover:text-white">
                            {label}
                          </span>
                          <span className="block text-[10px] text-zinc-500 group-hover:text-zinc-400">
                            {tone.hint}
                          </span>
                        </span>
                        {copiedId === id ? (
                          <Check size={14} strokeWidth={1.75} className="text-white" />
                        ) : (
                          <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-600 opacity-0 transition-opacity group-hover:opacity-100">
                            Copy
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
});

NpmStackMenu.displayName = 'NpmStackMenu';

export default NpmStackMenu;
