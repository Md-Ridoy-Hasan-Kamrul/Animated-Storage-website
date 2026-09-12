import { defineComponent, h } from 'vue';
import { definePreview } from './core.js';

definePreview();

export { TEMPLATES, embedUrl, setOrigin, getOrigin, definePreview } from './core.js';

export const Preview = defineComponent({
  name: 'KmotionPreview',
  props: {
    id: { type: String, required: true },
    origin: { type: String, default: '' },
    height: { type: String, default: '640px' },
    title: { type: String, default: 'Kmotion preview' },
  },
  setup(props) {
    return () =>
      h('kmotion-preview', {
        template: props.id,
        origin: props.origin || undefined,
        height: props.height,
        title: props.title,
      });
  },
});

export default Preview;
