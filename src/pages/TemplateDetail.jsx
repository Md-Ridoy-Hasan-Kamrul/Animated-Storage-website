import React, { memo, useCallback, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Heart, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { getTemplateById, TEMPLATES } from '../data/templates';
import { ROUTES } from '../config';
import { useSEO } from '../hooks/useSEO';
import TemplateCard from '../components/home/TemplateCard';
import SourceDocsPanel from '../components/template-detail/SourceDocsPanel';
import { copyTextToClipboard } from '../utils/copyTextToClipboard';
import { KMOTION_PACKAGE, KMOTION_STACKS, getKmotionNpmSnippet } from '../utils/kmotionNpmSnippet';

const COPY_ICON_SIZE = 20;

const TemplateDetail = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = useMemo(() => getTemplateById(id), [id]);

  const relatedTemplates = useMemo(() => {
    if (!template) return [];
    return TEMPLATES.filter(
      (item) => item.category === template.category && item.id !== template.id,
    );
  }, [template]);

  useSEO({
    title: template ? `${template.title} — Free Prompt` : 'Template',
    description: template?.description || 'Free animated template prompt',
  });

  const [npmStack, setNpmStack] = useState('react');
  const npmSnippet = useMemo(
    () => (template ? getKmotionNpmSnippet(template.id, npmStack) : ''),
    [template, npmStack],
  );

  const copyPrompt = useCallback(async () => {
    if (!template?.fullPrompt) {
      toast.error('Prompt missing');
      return;
    }
    try {
      await copyTextToClipboard(template.fullPrompt);
      toast.success('Full prompt copied');
    } catch {
      toast.error('Copy failed');
    }
  }, [template]);

  const copyNpm = useCallback(async () => {
    if (!npmSnippet) return;
    try {
      await copyTextToClipboard(npmSnippet);
      const stackLabel = KMOTION_STACKS.find((s) => s.id === npmStack)?.label || 'npm';
      toast.success(`${stackLabel} npm snippet copied`);
    } catch {
      toast.error('Copy failed');
    }
  }, [npmSnippet, npmStack]);

  const goBackToCategory = useCallback(() => {
    const slug = template?.categorySlug;
    if (slug) {
      navigate({ pathname: ROUTES.HOME, search: `?category=${encodeURIComponent(slug)}` });
      return;
    }
    navigate(ROUTES.HOME);
  }, [navigate, template?.categorySlug]);

  if (!template) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-zinc-400">Template not found</p>
        <Link to={ROUTES.HOME} className="text-sm text-white underline">
          Back home
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-24">
      <div className="mx-auto max-w-[1600px] px-4 pt-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={goBackToCategory}
          className="mb-6 inline-flex items-center gap-2 text-sm text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </button>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(280px,0.7fr)] lg:items-start">
          <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0C0C0C]">
            <div className="relative h-[min(72vh,640px)] overflow-hidden">
              <iframe
                title={`${template.title} live preview`}
                src={template.livePath}
                allow="autoplay; fullscreen"
                className="absolute inset-0 h-full w-full border-0"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-black via-black/70 to-transparent px-4 py-4 text-sm text-white">
                <span className="text-zinc-300">Live preview — scroll inside</span>
                <Link
                  to={template.livePath}
                  className="pointer-events-auto rounded-full bg-white px-3 py-1.5 text-xs font-semibold text-black"
                >
                  Open full page
                </Link>
              </div>
            </div>
          </div>

          <aside className="flex flex-col gap-5 rounded-2xl border border-white/[0.06] bg-[#111] p-5 sm:p-6">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                {template.title}
              </h1>
              <p className="mt-1 text-sm text-zinc-500">{template.category}</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <Heart size={16} className="text-rose-400" fill="currentColor" />
              <span>{template.likes.toLocaleString()} likes</span>
            </div>

            <button
              type="button"
              onClick={copyPrompt}
              className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-white px-5 py-3.5 text-[15px] font-semibold text-black transition-transform hover:scale-[1.01] active:scale-[0.99]"
            >
              <Copy size={COPY_ICON_SIZE} strokeWidth={1.75} />
              Copy full prompt
            </button>

            <SourceDocsPanel template={template} />

            <div className="flex flex-col gap-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-zinc-500">
                Kmotion Preview npm
              </p>
              <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Preview framework">
                {KMOTION_STACKS.map(({ id: stackId, label }) => {
                  const selected = npmStack === stackId;
                  return (
                    <button
                      key={stackId}
                      type="button"
                      role="tab"
                      aria-selected={selected}
                      onClick={() => setNpmStack(stackId)}
                      className={
                        selected
                          ? 'cursor-pointer rounded-full bg-white px-3 py-1 text-[12px] font-semibold text-black'
                          : 'cursor-pointer rounded-full border border-white/10 px-3 py-1 text-[12px] font-medium text-zinc-400 transition-colors hover:border-white/20 hover:text-white'
                      }
                    >
                      {label}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={copyNpm}
                className="inline-flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border border-white/15 bg-transparent px-5 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white/10"
              >
                <Package size={COPY_ICON_SIZE} strokeWidth={1.75} />
                Copy {KMOTION_STACKS.find((s) => s.id === npmStack)?.label} npm
              </button>

              <pre className="overflow-x-auto rounded-xl bg-black/50 px-3.5 py-3 text-[11px] leading-relaxed text-zinc-400">
                {npmSnippet}
              </pre>
            </div>

            <p className="text-[12px] leading-relaxed text-zinc-500">
              Three ways to use this card: copy the full prompt; copy Usage / Code / Skill.md from
              the source panel (one Code source — not per framework); or install{' '}
              <code className="text-zinc-300">{KMOTION_PACKAGE}</code> and pick React, Vue, Svelte,
              Solid, or JS for the Preview embed.
            </p>
          </aside>
        </div>

        {relatedTemplates.length > 0 ? (
          <section className="mt-10">
            <h2 className="mb-4 text-sm font-medium text-zinc-400">
              More from {template.category}
            </h2>
            <div className="grid grid-cols-1 gap-x-4 gap-y-6 min-[375px]:gap-x-5 min-[375px]:gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {relatedTemplates.map((item) => (
                <div key={item.id} className="mx-auto w-full max-w-md sm:mx-0 sm:max-w-none">
                  <TemplateCard item={item} />
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </div>
  );
});

TemplateDetail.displayName = 'TemplateDetail';

export default TemplateDetail;
