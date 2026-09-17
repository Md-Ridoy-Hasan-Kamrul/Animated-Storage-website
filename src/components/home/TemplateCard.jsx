import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
import toast from 'react-hot-toast';
import { copyTextToClipboard } from '../../utils/copyTextToClipboard';
import {
  acquireLivePreviewSlot,
  onLivePreviewSlotAvailable,
  releaseLivePreviewSlot,
} from '../../utils/livePreviewSlots';
import NpmStackMenu from './NpmStackMenu';

const PREVIEW_WIDTH = 1280;
const PREVIEW_IO_ROOT_MARGIN = '120px';
const PREVIEW_IO_THRESHOLD = 0.08;
const COPY_FEEDBACK_MS = 1600;

const TemplateCard = memo(({ item }) => {
  const navigate = useNavigate();
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const frameWrapRef = useRef(null);
  const rafRef = useRef(0);
  const [frameSize, setFrameSize] = useState({ scale: 0.28, height: 1700 });
  const [inView, setInView] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [liveMounted, setLiveMounted] = useState(false);
  const [liveReady, setLiveReady] = useState(false);

  const stillSrc = item.previewImage || item.previewGif || '';
  const ownerId = item.id;
  /** Poster first: only attempt live iframe when there is no still, or on hover. */
  const wantsLive = inView && (!stillSrc || hovering);

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
        setInView(Boolean(entry?.isIntersecting));
      },
      { rootMargin: PREVIEW_IO_ROOT_MARGIN, threshold: PREVIEW_IO_THRESHOLD },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!wantsLive) {
      setLiveMounted(false);
      setLiveReady(false);
      releaseLivePreviewSlot(ownerId);
      return undefined;
    }

    const tryMount = () => {
      if (acquireLivePreviewSlot(ownerId)) {
        setLiveMounted(true);
        return true;
      }
      setLiveMounted(false);
      return false;
    };

    if (tryMount()) {
      return () => {
        setLiveMounted(false);
        setLiveReady(false);
        releaseLivePreviewSlot(ownerId);
      };
    }

    const unsubscribe = onLivePreviewSlotAvailable(() => {
      tryMount();
    });

    return () => {
      unsubscribe();
      setLiveMounted(false);
      setLiveReady(false);
      releaseLivePreviewSlot(ownerId);
    };
  }, [wantsLive, ownerId]);

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
        window.setTimeout(() => setCopiedPrompt(false), COPY_FEEDBACK_MS);
      } catch {
        toast.error('Copy failed');
      }
    },
    [item.fullPrompt],
  );

  const openDetail = useCallback(() => {
    navigate(item.detailPath || `/templates/${item.id}`);
  }, [item.detailPath, item.id, navigate]);

  const showLive = liveMounted && liveReady;

  return (
    <article
      className="group flex cursor-pointer flex-col gap-3"
      onClick={openDetail}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
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
          {stillSrc ? (
            <img
              src={stillSrc}
              alt=""
              loading="eager"
              decoding="async"
              className="absolute inset-0 z-0 h-full w-full object-cover"
              draggable={false}
            />
          ) : (
            <div className="absolute inset-0 z-0 bg-[#0C0C0C]" aria-hidden />
          )}

          <div className="absolute left-3 top-3 z-[2] rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-zinc-200 backdrop-blur-md">
            {showLive ? 'Live slice' : 'Still preview'}
          </div>

          {liveMounted ? (
            <iframe
              title={`${item.title} live preview`}
              src={`${item.livePath}?embed=1`}
              allow="autoplay; fullscreen"
              tabIndex={-1}
              loading="lazy"
              onLoad={() => setLiveReady(true)}
              className="absolute left-0 top-0 z-[1] border-0"
              style={{
                width: PREVIEW_WIDTH,
                height: frameSize.height,
                transform: `scale(${frameSize.scale})`,
                transformOrigin: 'top left',
                opacity: liveReady ? 1 : 0,
                transition: 'opacity 240ms ease-out',
              }}
            />
          ) : null}
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
          <NpmStackMenu templateId={item.id} title={item.title} />
        </div>
      </div>
    </article>
  );
});

TemplateCard.displayName = 'TemplateCard';

export default TemplateCard;
