const TAG = 'kmotion-preview';

/** Known live template ids on the Kmotion site */
export const TEMPLATES = [
  '3d-portfolio',
  'prompt',
  'neo-museum',
  'portfolio-cosmic',
  'adam-roberts',
  'lumina',
  'heritage-grove',
  'velorah',
  'foldcraft',
  'ltx-world',
  'cast-render',
  '3d-character-studio',
  'scroll-tied-video',
  'mostar-city',
  'stillmind',
  'intelligent-operations',
  'interactive-discovery',
  'nike-hover',
  'synth-mode',
  'tech-forward',
  'contact-cybernetic',
  'wellness-hero',
  'mind-body-healing',
  'veyra-electric',
  'real-time-alerts',
  'equilibrium',
  'scaling-platform',
  'kage',
  'sketchbook',
  'sublevel-studio',
];

const LOCAL_ORIGIN = 'http://localhost:5173';

function trimSlash(url) {
  return String(url || '').replace(/\/+$/, '');
}

export function getOrigin(override) {
  if (override) return trimSlash(override);
  if (typeof globalThis !== 'undefined' && globalThis.KMOTION_ORIGIN) {
    return trimSlash(globalThis.KMOTION_ORIGIN);
  }
  return LOCAL_ORIGIN;
}

/** Set the Kmotion site once (after you deploy, pass the public HTTPS origin). */
export function setOrigin(url) {
  if (typeof globalThis === 'undefined') return;
  globalThis.KMOTION_ORIGIN = trimSlash(url);
}

export function embedUrl(id, origin) {
  const templateId = String(id || '').trim();
  if (!templateId) {
    throw new Error('kmotion: Preview needs an id, e.g. "heritage-grove"');
  }
  // Full live page — same as “Open full page”, not the gallery card (?embed=1).
  return `${getOrigin(origin)}/p/${encodeURIComponent(templateId)}`;
}

function escapeAttr(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;');
}

class KmotionPreview extends HTMLElement {
  static get observedAttributes() {
    return ['template', 'id', 'origin', 'height', 'title'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  getTemplateId() {
    return this.getAttribute('template') || this.getAttribute('id') || '';
  }

  render() {
    if (!this.shadowRoot) this.attachShadow({ mode: 'open' });

    const templateId = this.getTemplateId();
    const origin = this.getAttribute('origin') || '';
    const height = this.getAttribute('height') || '100vh';
    const title = this.getAttribute('title') || 'Kmotion preview';

    let src = '';
    let error = '';
    try {
      src = embedUrl(templateId, origin);
    } catch (err) {
      error = err instanceof Error ? err.message : 'kmotion: invalid preview';
    }

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          height: ${escapeAttr(height)};
        }
        iframe, .kmotion-msg {
          width: 100%;
          height: 100%;
          border: 0;
          display: block;
          background: #0c0c0c;
        }
        .kmotion-msg {
          box-sizing: border-box;
          padding: 24px;
          color: #a1a1aa;
          font: 14px/1.5 ui-sans-serif, system-ui, sans-serif;
        }
      </style>
      ${
        error
          ? `<div class="kmotion-msg">${escapeAttr(error)}</div>`
          : `<iframe
              src="${escapeAttr(src)}"
              title="${escapeAttr(title)}"
              loading="lazy"
              allow="autoplay; fullscreen"
            ></iframe>`
      }
    `;
  }
}

export function definePreview() {
  if (typeof customElements === 'undefined') return TAG;
  if (!customElements.get(TAG)) customElements.define(TAG, KmotionPreview);
  return TAG;
}

definePreview();
