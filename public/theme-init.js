// Runs synchronously before React mounts to prevent a dark-mode.
// Kept as a separate file so the CSP can use script-src 'self' without
// requiring 'unsafe-inline'.
(function () {
  try {
    var t = localStorage.getItem('theme');
    if (t === 'dark') document.documentElement.classList.add('dark');
  } catch {
    /* ignore */
  }
})();
