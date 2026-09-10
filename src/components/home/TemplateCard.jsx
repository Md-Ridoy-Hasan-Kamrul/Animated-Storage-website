import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';

const COPY_ICON_SIZE = 22;
const PREVIEW_WIDTH = 1280;

const TemplateCard = memo(({ item }) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
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

  const handleCopy = useCallback(
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
        setCopied(true);
        toast.success('Full prompt copied');
        window.setTimeout(() => setCopied(false), 1600);
      } catch {
        toast.error('Copy failed');
      }
    },
    [item.fullPrompt],
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

        <button
          type="button"
          aria-label={`Copy prompt for ${item.title}`}
          onClick={handleCopy}
          className="mt-0.5 shrink-0 rounded-lg p-2 text-zinc-400 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          {copied ? (
            <Check size={COPY_ICON_SIZE} strokeWidth={1.75} />
          ) : (
            <Copy size={COPY_ICON_SIZE} strokeWidth={1.75} />
          )}
        </button>
      </div>
    </article>
  );
});

TemplateCard.displayName = 'TemplateCard';

export default TemplateCard;
