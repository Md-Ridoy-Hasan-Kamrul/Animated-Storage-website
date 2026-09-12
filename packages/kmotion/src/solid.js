import { createEffect, onCleanup } from 'solid-js';
import { definePreview } from './core.js';

definePreview();

export { TEMPLATES, embedUrl, setOrigin, getOrigin, definePreview } from './core.js';

function applyProps(el, props) {
  el.setAttribute('template', props.id || '');
  if (props.origin) el.setAttribute('origin', props.origin);
  else el.removeAttribute('origin');
  el.setAttribute('height', props.height || '640px');
  el.setAttribute('title', props.title || 'Kmotion preview');
}

/** Solid: const el = Preview({ id: 'heritage-grove' }); */
export function Preview(props) {
  definePreview();
  const el = document.createElement('kmotion-preview');
  applyProps(el, props || {});

  createEffect(() => {
    applyProps(el, props || {});
  });

  onCleanup(() => {
    el.remove();
  });

  return el;
}

export default Preview;
