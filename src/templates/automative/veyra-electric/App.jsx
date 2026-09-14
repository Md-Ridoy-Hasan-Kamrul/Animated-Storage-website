import React, { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, Plus, X } from 'lucide-react';
import {
  APPEARANCE_CLOSE_MS,
  CONCEPT_LABEL,
  DETAIL_REVEAL_MS,
  DETAIL_SETTLE_MS,
  FOOTER_BASELINE,
  FOOTER_NOTES,
  HEADER_MIDDLE,
  HEADLINE,
  INTRO_HINT,
  INTRO_LEAD,
  LEAVE_CLOSE_MS,
  WORDMARK,
} from './constants';
import { hotspots, systems } from './content';
import HoverVideo from './HoverVideo';
import AppearanceMenu from './AppearanceMenu';
import { appearanceOptions, baseExterior, canUseHotspot } from './appearance';
import { usePreviewHover } from './hooks/usePreviewHover';
import { measureImagePlane } from './utils/imagePlane';

const ROOT_IMAGE = '/media/exterior-polished.png';

export default function App({ preview = false }) {
  const [phase, setPhase] = useState('overview');
  const [selected, setSelected] = useState('battery');
  const [hovered, setHovered] = useState(null);
  const cyclePose = usePreviewHover(preview);
  const activeHover = hovered || cyclePose;
  const [annotation, setAnnotation] = useState(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [reduced, setReduced] = useState(false);
  const [detailVisible, setDetailVisible] = useState(false);
  const [appearance, setAppearance] = useState(null);
  const [appearancePinned, setAppearancePinned] = useState(false);
  const [appearanceClosing, setAppearanceClosing] = useState(false);
  const [optionId, setOptionId] = useState('silver');
  const [appearanceImage, setAppearanceImage] = useState(baseExterior);
  const [neutral, setNeutral] = useState(true);
  const [loadedOptions, setLoadedOptions] = useState(() => new Set([baseExterior]));
  const [failedOptions, setFailedOptions] = useState(() => new Set());
  const optionLoads = useRef(new Set());
  const appearanceTimer = useRef();
  const leaveTimer = useRef();
  const appearanceButtons = useRef({});
  const suppressFocus = useRef(false);
  const lock = useRef(false);
  const request = useRef(0);
  const timer = useRef();
  const revealTimer = useRef();
  const stage = useRef(null);
  const [plane, setPlane] = useState({});
  const closeButton = useRef(null);
  const entryButtons = useRef({});
  const current = systems[selected];
  const busy = phase === 'entering' || phase === 'returning';

  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => {
      media.removeEventListener('change', update);
      clearTimeout(timer.current);
      clearTimeout(revealTimer.current);
      clearTimeout(appearanceTimer.current);
      clearTimeout(leaveTimer.current);
      request.current += 1;
    };
  }, []);

  useEffect(() => {
    if (!appearance) return undefined;
    let cancelled = false;
    const pending = appearanceOptions[appearance].filter((option) => !optionLoads.current.has(option.image));
    pending.forEach((option) => {
      optionLoads.current.add(option.image);
      const image = new Image();
      image.onload = () => {
        image.decode().then(
          () => {
            if (!cancelled) {
              setLoadedOptions((previous) => new Set(previous).add(option.image));
              setFailedOptions((previous) => {
                const next = new Set(previous);
                next.delete(option.image);
                return next;
              });
            }
          },
          () => {
            if (!cancelled) setFailedOptions((previous) => new Set(previous).add(option.image));
          },
        );
      };
      image.onerror = () => {
        if (!cancelled) setFailedOptions((previous) => new Set(previous).add(option.image));
      };
      image.src = option.image;
    });
    return () => {
      cancelled = true;
      pending.forEach((option) => optionLoads.current.delete(option.image));
    };
  }, [appearance]);

  function openAppearance(mode) {
    if (phase !== 'overview' || !canUseHotspot(appearance, mode, appearanceClosing)) return;
    clearTimeout(leaveTimer.current);
    setHovered(null);
    if (appearance === mode) return;
    setAppearance(mode);
    setAppearancePinned(false);
    setOptionId(appearanceOptions[mode][0].id);
    setAppearanceImage(baseExterior);
  }

  function closeAppearance(restoreFocus = true) {
    if (!appearance || appearanceClosing) return;
    const previousMode = appearance;
    clearTimeout(leaveTimer.current);
    setAppearanceClosing(true);
    setHovered(null);
    appearanceTimer.current = window.setTimeout(() => {
      setAppearance(null);
      setAppearancePinned(false);
      setAppearanceClosing(false);
      setAppearanceImage(baseExterior);
      if (restoreFocus) {
        suppressFocus.current = true;
        appearanceButtons.current[previousMode]?.focus({ preventScroll: true });
        suppressFocus.current = false;
      }
    }, reduced ? 0 : APPEARANCE_CLOSE_MS);
  }

  function chooseAppearance(id) {
    if (!appearance || appearanceClosing || !neutral) return;
    const option = appearanceOptions[appearance].find((item) => item.id === id);
    if (!option || !loadedOptions.has(option.image)) return;
    setAppearancePinned(true);
    setOptionId(id);
    setAppearanceImage(option.image);
  }

  useEffect(() => {
    const element = stage.current;
    if (!element) return undefined;
    const updatePlane = () => {
      const { width } = element.getBoundingClientRect();
      setPlane(measureImagePlane(width, window.innerHeight, { framed: preview }));
    };
    const observer = new ResizeObserver(updatePlane);
    observer.observe(element);
    window.addEventListener('resize', updatePlane);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updatePlane);
    };
  }, [preview]);

  useEffect(() => {
    let cancelled = false;
    Promise.all(
      [ROOT_IMAGE, systems.battery.image, systems.drive.image].map(
        (source) =>
          new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
              image.decode().then(resolve, resolve);
            };
            image.onerror = reject;
            image.src = source;
          }),
      ),
    )
      .then(() => {
        if (!cancelled) setReady(true);
      })
      .catch(() => {
        if (!cancelled) setError('An image could not load. Reload to retry.');
      });
    return () => {
      cancelled = true;
    };
  }, []);

  function finish(returning, id = selected) {
    clearTimeout(timer.current);
    setPhase(returning ? 'overview' : 'detail');
    setDetailVisible(!returning);
    lock.current = false;
    setTimeout(() => {
      if (returning) entryButtons.current[id]?.focus({ preventScroll: true });
      else closeButton.current?.focus({ preventScroll: true });
    }, 0);
  }

  function transition(id, returning = false) {
    if (id === 'optics' || appearance || lock.current || !ready || (!returning && phase !== 'overview')) return;
    lock.current = true;
    const token = (request.current += 1);
    setSelected(id);
    setHovered(null);
    setAnnotation(null);
    setError('');
    setPhase(returning ? 'returning' : 'entering');
    revealTimer.current = window.setTimeout(() => {
      if (request.current === token) setDetailVisible(!returning);
    }, reduced ? 0 : DETAIL_REVEAL_MS);
    timer.current = window.setTimeout(() => {
      if (request.current === token) finish(returning, id);
    }, reduced ? 0 : DETAIL_SETTLE_MS);
  }

  function returnToCar() {
    if (phase === 'detail') void transition(selected, true);
  }

  useEffect(() => {
    const escape = (event) => {
      if (event.key === 'Escape') {
        if (appearance) closeAppearance();
        else returnToCar();
      }
    };
    window.addEventListener('keydown', escape);
    return () => window.removeEventListener('keydown', escape);
  });

  return (
    <main
      className={`experience phase-${phase} ${reduced ? 'reduced' : ''} ${preview ? 'preview' : ''}`}
      style={{
        '--scene-width': typeof plane.width === 'number' ? `${plane.width}px` : undefined,
        '--scene-height': typeof plane.height === 'number' ? `${plane.height}px` : undefined,
      }}
      aria-busy={busy}
    >
      <header className="masthead">
        <a className="wordmark" href="#overview" aria-label="Return to overview">
          {WORDMARK}
        </a>
        <span className="header-middle">{HEADER_MIDDLE}</span>
        <span className="concept-label">{CONCEPT_LABEL}</span>
      </header>

      <section ref={stage} className="stage" aria-label="Explore vehicle systems">
        <div
          className="image-plane"
          style={{ ...plane, '--focus-x': `${current.anchor.x}%`, '--focus-y': `${current.anchor.y}%` }}
        >
          <div className="media-envelope">
            <div className="exterior-envelope">
              <div className="car-visual">
                <img className="car-image" src={ROOT_IMAGE} alt="Silver electric concept sedan in a studio" draggable={false} />
                <HoverVideo
                  desired={!appearance && (activeHover === 'drive' || activeHover === 'battery') ? activeHover : null}
                  mode={phase}
                  reduced={reduced}
                  onNeutral={setNeutral}
                />
                <div className={`appearance-visual ${appearance && neutral && !appearanceClosing ? 'shown' : ''}`} aria-hidden="true">
                  <img src={appearanceImage} alt="" draggable={false} />
                </div>
              </div>
            </div>
            <div className={`detail-visual ${detailVisible ? 'shown' : ''}`}>
              <img
                className="detail-image"
                src={current.image}
                alt={`Illustrative cutaway of the ${current.label.toLowerCase()}`}
                draggable={false}
              />
            </div>
          </div>

          {phase === 'overview' &&
            ready &&
            hotspots.map((item) => {
              const { id, target } = item;
              const enabled = canUseHotspot(appearance, id, appearanceClosing);
              if (id === 'paint' || id === 'wheels') {
                return (
                  <div
                    key={id}
                    className={`appearance-hotspot ${appearance === id ? 'expanded' : ''}`}
                    style={{ '--anchor-x': `${item.anchor.x}%`, '--anchor-y': `${item.anchor.y}%` }}
                    onPointerEnter={() => openAppearance(id)}
                    onPointerLeave={(event) => {
                      if (!appearancePinned && !event.currentTarget.contains(document.activeElement)) {
                        leaveTimer.current = window.setTimeout(() => closeAppearance(false), LEAVE_CLOSE_MS);
                      }
                    }}
                    onBlur={(event) => {
                      if (!appearancePinned && !event.currentTarget.contains(event.relatedTarget)) closeAppearance(false);
                    }}
                  >
                    <button
                      ref={(node) => {
                        appearanceButtons.current[id] = node;
                      }}
                      className={`hotspot ${appearance === id ? 'active' : ''}`}
                      disabled={!enabled}
                      onFocus={() => {
                        if (!suppressFocus.current) openAppearance(id);
                      }}
                      onClick={() => {
                        if (appearance === id && appearancePinned) closeAppearance();
                        else {
                          openAppearance(id);
                          setAppearancePinned(true);
                        }
                      }}
                      aria-expanded={appearance === id && !appearanceClosing}
                      aria-controls={`appearance-${id}`}
                      aria-label={item.label}
                    >
                      <span className="hotspot-ring">
                        {appearance === id && appearancePinned ? <X size={14} strokeWidth={1.5} /> : <Plus size={14} strokeWidth={1.5} />}
                      </span>
                      <span className="hotspot-label">{id === 'paint' ? 'Paint' : 'Wheels'}</span>
                    </button>
                    {appearance === id && !appearanceClosing ? <span className="menu-bridge" aria-hidden="true" /> : null}
                    {appearance === id && !appearanceClosing ? (
                      <AppearanceMenu
                        mode={id}
                        selected={optionId}
                        loaded={loadedOptions}
                        unavailable={failedOptions}
                        waiting={!neutral}
                        onSelect={chooseAppearance}
                        onClose={() => closeAppearance()}
                      />
                    ) : null}
                  </div>
                );
              }
              return (
                <button
                  key={id}
                  ref={(node) => {
                    if (target) entryButtons.current[target] = node;
                  }}
                  className={`hotspot ${activeHover === id ? 'active' : ''}`}
                  style={{ left: `${item.anchor.x}%`, top: `${item.anchor.y}%` }}
                  disabled={!enabled}
                  onPointerEnter={() => {
                    if (enabled) setHovered(id);
                  }}
                  onPointerLeave={() => setHovered(null)}
                  onFocus={() => {
                    if (enabled) setHovered(id);
                  }}
                  onBlur={() => setHovered(null)}
                  onClick={target ? () => void transition(target) : undefined}
                  aria-label={target ? systems[target].short : item.label}
                >
                  <span className="hotspot-ring">
                    <Plus size={14} strokeWidth={1.5} />
                  </span>
                  <span className="hotspot-label">
                    {item.label}
                    {target ? <ArrowUpRight size={15} /> : null}
                  </span>
                </button>
              );
            })}
          {phase === 'detail' &&
            current.points.map((point, i) => (
              <button
                key={point.label}
                className={`annotation ${annotation === i ? 'open' : ''}`}
                style={{ left: `${point.x}%`, top: `${point.y}%` }}
                aria-label={point.label}
                aria-expanded={annotation === i}
                onClick={() => setAnnotation(annotation === i ? null : i)}
              >
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span className="annotation-label">{point.label}</span>
              </button>
            ))}
        </div>

        <div className={`intro ${phase !== 'overview' ? 'hide' : ''}`} aria-hidden={phase !== 'overview'}>
          <h1>{HEADLINE}</h1>
          <p className="intro-description">
            <span>{INTRO_LEAD}</span>
            <span>{INTRO_HINT}</span>
          </p>
        </div>

        {phase !== 'overview' ? (
          <button ref={closeButton} className="back" onClick={returnToCar} disabled={busy} aria-label="Back to vehicle">
            <ArrowLeft size={18} />
            <span>{phase === 'returning' ? 'Returning to vehicle' : 'Back to vehicle'}</span>
            <kbd>Esc</kbd>
          </button>
        ) : null}

        <aside className={`detail-copy ${phase === 'detail' ? 'shown' : ''}`} aria-hidden={phase !== 'detail'}>
          <div className="detail-introduction">
            <p className="eyebrow">{current.category}</p>
            <h2>
              {current.title.split('\n').map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h2>
            <p className="system-description">{current.description}</p>
          </div>
          <div className="detail-components">
            <div className="part-list">
              {current.points.map((point, i) => (
                <button
                  key={point.label}
                  tabIndex={phase === 'detail' ? 0 : -1}
                  className={annotation === i ? 'selected' : ''}
                  onClick={() => setAnnotation(annotation === i ? null : i)}
                  aria-expanded={annotation === i}
                >
                  <span className="part-row">
                    <small>{String(i + 1).padStart(2, '0')}</small>
                    {point.label}
                    <Plus size={14} />
                  </span>
                  {annotation === i ? <span className="part-description">{point.text}</span> : null}
                </button>
              ))}
            </div>
            <div className="benefit">
              <span>For the driver</span>
              <p>{current.benefit}</p>
            </div>
          </div>
        </aside>
        {(busy || !ready) && (
          <div className="transition-status">
            <span className="small-dot" />
            {!ready
              ? 'Preparing the views'
              : phase === 'returning'
                ? 'Returning to the exterior'
                : `Inside the ${current.label.toLowerCase()}`}
          </div>
        )}
      </section>

      <footer className="scene-footer">
        <div className="feature-notes" aria-label="Ways to explore">
          {FOOTER_NOTES.map((note) => (
            <div className="feature-note" key={note.title}>
              <h3>{note.title}</h3>
              <p>{note.copy}</p>
            </div>
          ))}
        </div>
        <div className="footer-baseline">
          <span>{FOOTER_BASELINE}</span>
          <span>
            {phase === 'overview'
              ? 'Explore systems. Personalise the exterior.'
              : 'Illustrative engineering. Concept visualisation.'}
          </span>
        </div>
      </footer>
      <p className="sr-only" role="status" aria-live="polite">
        {busy
          ? `${phase === 'entering' ? 'Opening' : 'Closing'} ${current.label}`
          : phase === 'detail'
            ? `${current.label} view. Press Escape to return.`
            : 'Vehicle overview. Choose a system.'}
      </p>
      {error ? (
        <div className="error-message" role="alert">
          {error}
          <button onClick={() => setError('')} aria-label="Dismiss message">
            <X size={16} />
          </button>
        </div>
      ) : null}
    </main>
  );
}
