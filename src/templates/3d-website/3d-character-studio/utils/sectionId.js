export function idFromHref(href) {
  return String(href || '').replace(/^#/, '');
}
