import { definePreview, embedUrl } from './core.js';

definePreview();

export { TEMPLATES, embedUrl, setOrigin, getOrigin, definePreview } from './core.js';

function applyProps(el, { id, origin, height = '640px', title = 'Kmotion preview' }) {
  el.setAttribute('template', id);
  if (origin) el.setAttribute('origin', origin);
  else el.removeAttribute('origin');
  el.setAttribute('height', height);
  el.setAttribute('title', title);
}

/** Svelte action: <div use:preview={{ id: 'heritage-grove' }}></div> */
export function preview(node, props) {
  definePreview();
  const el = document.createElement('kmotion-preview');
  applyProps(el, props || {});
  node.appendChild(el);

  return {
    update(next) {
      applyProps(el, next || {});
    },
    destroy() {
      el.remove();
    },
  };
}

export function Preview(target, props) {
  if (!target) throw new Error('kmotion: Preview needs a DOM node');
  const action = preview(target, props);
  return {
    $set: action.update,
    $destroy: action.destroy,
    src: embedUrl(props?.id, props?.origin),
  };
}

export default Preview;
