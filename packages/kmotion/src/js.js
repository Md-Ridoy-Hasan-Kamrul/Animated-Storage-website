import { definePreview, embedUrl } from './core.js';

definePreview();

export { TEMPLATES, embedUrl, setOrigin, getOrigin, definePreview } from './core.js';

function applyProps(el, { id, origin, height = '100vh', title = 'Kmotion preview' }) {
  el.setAttribute('template', id);
  if (origin) el.setAttribute('origin', origin);
  else el.removeAttribute('origin');
  el.setAttribute('height', height);
  el.setAttribute('title', title);
}

export function Preview(target, props) {
  if (!target) throw new Error('kmotion: Preview needs a DOM node');
  definePreview();
  const el = document.createElement('kmotion-preview');
  applyProps(el, props || {});
  target.appendChild(el);
  return {
    el,
    src: embedUrl(props?.id, props?.origin),
    update(next) {
      applyProps(el, next || {});
    },
    destroy() {
      el.remove();
    },
  };
}

export default Preview;
