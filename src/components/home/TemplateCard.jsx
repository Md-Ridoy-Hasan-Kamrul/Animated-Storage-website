import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import { getKmotionNpmSnippet } from '../../utils/kmotionNpmSnippet';

const PREVIEW_WIDTH = 1280;

const TemplateCard = memo(({ item }) => {
  const navigate = useNavigate();
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const [copiedNpm, setCopiedNpm] = useState(false);
  const frameWrapRef = useRef(null);
  const rafRef = useRef(0);
  const [frameSize, setFrameSize] = useState({ scale: 0.28, height: 1700 });
  const [previewReady, setPreviewReady] = useState(false);

  useEffect(() => {
    const el = frameWrapRef.current;
    if (!el) return undefined;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width < 1 || height < 1) return;
      const scale = width / PREVIEW_WIDTH;
      setFrameSize({
        scale,
        height: Math.ceil(height / scale),
      });
    };

    const schedule = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    schedule();
    const ro = new ResizeObserver(schedule);
    ro.observe(el);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const el = frameWrapRef.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setPreviewReady(true);
      },
      { rootMargin: '160px', threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleCopyPrompt = useCallback(
    async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const prompt = item.fullPrompt;
      if (!prompt) {
        toast.error('Prompt missing');
        return;
      }
      try {
        await copyTextToClipboard(prompt);
        setCopiedPrompt(true);
        toast.success('Full prompt copied');
        window.setTimeout(() => setCopiedPrompt(false), 1600);
      } catch {
        toast.error('Copy failed');
      }
    },
    [item.fullPrompt],
  );

  const handleCopyNpm = useCallback(
    async (event) => {
      event.preventDefault();
      event.stopPropagation();
      const snippet = getKmotionNpmSnippet(item.id);
      if (!snippet) {
        toast.error('Install snippet missing');
        return;
      }
      try {
        await copyTextToClipboard(snippet);
        setCopiedNpm(true);
        toast.success('npm install copied');
        window.setTimeout(() => setCopiedNpm(false), 1600);
      } catch {
        toast.error('Copy failed');
      }
    },
    [item.id],
  );

  const openDetail = useCallback(() => {
    navigate(item.detailPath || `/templates/${item.id}`);
  }, [item.detailPath, item.id, navigate]);

  return (
    <article
      className="group flex cursor-pointer flex-col gap-3"
      onClick={openDetail}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openDetail();
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        ref={frameWrapRef}
        className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0C0C0C] transition-transform duration-500 ease-out group-hover:-translate-y-1 ${item.height}`}
      >
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {previewReady ? (
            <iframe
              title={`${item.title} live preview`}
              src={`${item.livePath}?embed=1`}
              tabIndex={-1}
              loading="lazy"
              className="absolute left-0 top-0 border-0"
              style={{
                width: PREVIEW_WIDTH,
                height: frameSize.height,
                transform: `scale(${frameSize.scale})`,
                transformOrigin: 'top left',
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-[#0C0C0C]" aria-hidden />
          )}
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 px-0.5">
        <div className="min-w-0">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">{item.title}</h2>
          <p className="mt-0.5 text-[12px] text-zinc-500">{item.category}</p>
        </div>

        <div className="mt-0.5 flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label={`Copy prompt for ${item.title}`}
            onClick={handleCopyPrompt}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            {copiedPrompt ? (
              <Check size={15} strokeWidth={1.75} />
            ) : (
              <Copy size={15} strokeWidth={1.75} />
            )}
            Prompt
          </button>
          <button
            type="button"
            aria-label={`Copy npm install for ${item.title}`}
            onClick={handleCopyNpm}
            className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-[13px] font-medium text-zinc-300 transition-colors hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
          >
            {copiedNpm ? (
              <Check size={15} strokeWidth={1.75} />
            ) : (
              <Package size={15} strokeWidth={1.75} />
            )}
            npm
          </button>
        </div>
      </div>
    </article>
  );
});

TemplateCard.displayName = 'TemplateCard';

export default TemplateCard;
