export function restoreFocusedControl(node) {
  window.requestAnimationFrame(() => {
    node?.focus({ preventScroll: true });
  });
}
