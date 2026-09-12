export function goToSection(href, onDone) {
  const id = String(href || '').replace('#', '');
  const node = id ? document.getElementById(id) : null;
  if (node) {
    node.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  if (onDone) onDone();
}
