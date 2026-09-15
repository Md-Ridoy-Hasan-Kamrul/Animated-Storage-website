import React, { memo, useCallback, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Copy, Heart, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import { getTemplateById } from '../data/templates';
import { ROUTES } from '../config';
import { useSEO } from '../hooks/useSEO';
import * as portfolioV1 from '../templates/landing-page/3d-portfolio/content';
import * as promptArchive from '../templates/landing-page/prompt/content';
import * as portfolioCosmic from '../templates/portfolio/portfolio-cosmic/content';
import * as neoMuseum from '../templates/landing-page/neo-museum/content';
import * as adamRoberts from '../templates/portfolio/adam-roberts/content';
import * as lumina from '../templates/sections/lumina/content';
import * as heritageGrove from '../templates/footer/heritage-grove/content';
import * as velorah from '../templates/agency/velorah/content';
import * as foldcraft from '../templates/hero/foldcraft/content';
import * as ltxWorld from '../templates/ecommerce/ltx-world/content';
import * as castRender from '../templates/3d-website/cast-render/content';
import * as characterStudio from '../templates/3d-website/3d-character-studio/content';
import * as scrollTiedVideo from '../templates/creative/scroll-tied-video/content';
import * as mostarCity from '../templates/travel/mostar-city/content';
import * as stillmind from '../templates/hero/stillmind/content';
import * as intelligentOperations from '../templates/agency/intelligent-operations/content';
import * as interactiveDiscovery from '../templates/hero/interactive-discovery/content';
import * as nikeHover from '../templates/features/nike-hover/content';
import * as synthMode from '../templates/fashion/synth-mode/content';
import * as techForward from '../templates/hero/tech-forward/content';
import * as contactCybernetic from '../templates/hero/contact-cybernetic/content';
import * as wellnessHero from '../templates/hero/wellness-hero/content';
import * as mindBodyHealing from '../templates/medicine/mind-body-healing/content';
import * as veyraElectric from '../templates/automative/veyra-electric/content';
import * as realTimeAlerts from '../templates/sign-in/real-time-alerts/content';
import * as equilibrium from '../templates/hero/equilibrium/content';
import * as scalingPlatform from '../templates/saas/scaling-platform/content';
import * as kage from '../templates/landing-page/kage/content';
import { copyTextToClipboard } from '../utils/copyTextToClipboard';
import { KMOTION_PACKAGE, KMOTION_STACKS, getKmotionNpmSnippet } from '../utils/kmotionNpmSnippet';

const CONTENT_BY_TEMPLATE_ID = {
  '3d-portfolio': portfolioV1,
  prompt: {
    MARQUEE_GIFS: promptArchive.GALLERY_IMAGES,
    ABOUT_DECOR: { moon: promptArchive.GALLERY_IMAGES[0], group: promptArchive.GALLERY_IMAGES[1] },
    PORTRAIT_URL: promptArchive.GALLERY_IMAGES[0],
    SERVICES: [],
  },
  'portfolio-cosmic': portfolioCosmic,
  'neo-museum': neoMuseum,
  'adam-roberts': adamRoberts,
  lumina,
  'heritage-grove': heritageGrove,
  velorah,
  foldcraft,
  'ltx-world': ltxWorld,
  'cast-render': castRender,
  '3d-character-studio': characterStudio,
  'scroll-tied-video': scrollTiedVideo,
  'mostar-city': mostarCity,
  stillmind,
  'intelligent-operations': intelligentOperations,
  'interactive-discovery': interactiveDiscovery,
  'nike-hover': nikeHover,
  'synth-mode': synthMode,
  'tech-forward': techForward,
  'contact-cybernetic': contactCybernetic,
  'wellness-hero': wellnessHero,
  'mind-body-healing': mindBodyHealing,
  'veyra-electric': veyraElectric,
  'real-time-alerts': realTimeAlerts,
  equilibrium,
  'scaling-platform': scalingPlatform,
  kage,
};
const COPY_ICON_SIZE = 20;

const buildSectionCards = ({ MARQUEE_GIFS, ABOUT_DECOR }) => [
  {
    id: 'personal',
    title: 'Project Card',
    label: '02 PERSONAL',
    image: MARQUEE_GIFS[7],
  },
  {
    id: 'about',
    title: 'About Me',
    label: 'About',
    image: ABOUT_DECOR.moon,
    dark: true,
  },
  {
    id: 'catalog',
    title: 'Projects Catalog',
    label: 'Marquee',
    image: MARQUEE_GIFS[0],
  },
  {
    id: 'services',
    title: 'Portfolio About',
    label: 'Services',
    services: true,
  },
  {
    id: 'scroll',
    title: 'Scroll Marquee',
    label: 'Motion',
    image: MARQUEE_GIFS[3],
  },
  {
    id: 'agency',
    title: 'Agency Services',
    label: 'Stats',
    image: ABOUT_DECOR.group,
  },
];

const TemplateDetail = memo(() => {
  const { id } = useParams();
  const navigate = useNavigate();
  const template = useMemo(() => getTemplateById(id), [id]);
  const content = CONTENT_BY_TEMPLATE_ID[id] || portfolioV1;
  const sectionCards = useMemo(() => buildSectionCards(content), [content]);
  const { PORTRAIT_URL, SERVICES } = content;

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
          onClick={() => navigate(ROUTES.HOME)}
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

            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap gap-1.5">
                {KMOTION_STACKS.map(({ id: stackId, label }) => {
                  const selected = npmStack === stackId;
                  return (
                    <button
                      key={stackId}
                      type="button"
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
              Two ways to use this card: copy the prompt, or install{' '}
              <code className="text-zinc-300">{KMOTION_PACKAGE}</code> and pick React, Vue, Svelte,
              Solid, or JS.
            </p>
          </aside>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sectionCards.map((card) => (
            <Link
              key={card.id}
              to={template.livePath}
              className="group overflow-hidden rounded-2xl border border-white/[0.06] bg-[#111] transition-transform hover:-translate-y-0.5"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#0C0C0C]">
                {card.services ? (
                  <div className="flex h-full flex-col justify-center gap-2 bg-white px-5 py-4 text-[#0C0C0C]">
                    {SERVICES.slice(1, 5).map((s) => (
                      <div key={s.number} className="flex items-baseline gap-3">
                        <span className="text-lg font-black">{s.number}</span>
                        <span className="text-xs font-medium uppercase tracking-wide">{s.name}</span>
                      </div>
                    ))}
                  </div>
                ) : card.dark ? (
                  <div className="relative flex h-full items-center justify-center">
                    <img
                      src={PORTRAIT_URL}
                      alt=""
                      className="absolute inset-0 h-full w-full object-cover opacity-30"
                    />
                    <img src={card.image} alt="" className="relative z-10 w-24 object-contain" />
                    <p className="absolute bottom-4 left-4 text-lg font-black uppercase tracking-tight text-white">
                      About me
                    </p>
                  </div>
                ) : (
                  <img
                    src={card.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="px-3.5 py-3">
                <p className="text-[13px] font-semibold text-white">{card.title}</p>
                <p className="text-[11px] text-zinc-500">{card.label}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
});

TemplateDetail.displayName = 'TemplateDetail';

export default TemplateDetail;
