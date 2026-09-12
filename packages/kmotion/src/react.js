import { createElement } from 'react';
import { definePreview } from './core.js';

definePreview();

export { TEMPLATES, embedUrl, setOrigin, getOrigin, definePreview } from './core.js';

export function Preview({
  id,
  origin,
  height = '100vh',
  title = 'Kmotion preview',
  className,
  style,
}) {
  return createElement('kmotion-preview', {
    template: id,
    origin,
    height,
    title,
    className,
    style,
  });
}

export default Preview;
