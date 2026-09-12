# @kmotion/animation

Embed any Kmotion template preview in **React, Vue, Svelte, Solid, or vanilla JS**.

```bash
npm install @kmotion/animation
```

Default origin is `http://localhost:5173` (local Kmotion gallery). After you deploy the site, call `setOrigin('https://your-domain.com')` once, or pass `origin` on each preview.

## React

```jsx
import { Preview } from '@kmotion/animation/react';

export function App() {
  return <Preview id="heritage-grove" />;
}
```

## Vue 3

```vue
<script setup>
import { Preview } from '@kmotion/animation/vue';
</script>

<template>
  <Preview id="heritage-grove" />
</template>
```

## Svelte

```svelte
<script>
  import { preview } from '@kmotion/animation/svelte';
</script>

<div use:preview={{ id: 'heritage-grove' }}></div>
```

## Solid

```jsx
import { Preview } from '@kmotion/animation/solid';

export function App() {
  return Preview({ id: 'heritage-grove' });
}
```

## Vanilla JS

```js
import { Preview } from '@kmotion/animation';

Preview(document.querySelector('#app'), { id: 'heritage-grove' });
```

Or the web component after any import:

```html
<kmotion-preview template="heritage-grove" height="640px"></kmotion-preview>
```

## Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `id` | string | required | Template id, e.g. `heritage-grove` |
| `origin` | string | `http://localhost:5173` | Kmotion site origin |
| `height` | string | `640px` | Preview height |
| `title` | string | `Kmotion preview` | iframe title |

```js
import { setOrigin, TEMPLATES } from '@kmotion/animation';

setOrigin('https://your-kmotion-site.com');
console.log(TEMPLATES);
```

Ids: `3d-portfolio`, `prompt`, `neo-museum`, `portfolio-cosmic`, `adam-roberts`, `lumina`, `heritage-grove`.
