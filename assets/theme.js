(() => {
  const storageKey = 'theme';
  const toggle = document.querySelector('[data-theme-toggle]');

  if (!toggle) return;

  const applyTheme = (theme) => {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = theme;
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    toggle.querySelector('[data-theme-label]').textContent = isDark ? 'Light mode' : 'Dark mode';
    toggle.querySelector('[data-theme-icon]').innerHTML = isDark
      ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"></path>'
      : '<path d="M20.4 14.2A8.5 8.5 0 0 1 9.8 3.6 8.5 8.5 0 1 0 20.4 14.2Z"></path>';

    document.querySelectorAll('[data-theme-image]').forEach((image) => {
      image.src = isDark ? image.dataset.darkSrc : image.dataset.lightSrc;
    });
  };

  applyTheme(document.documentElement.dataset.theme);

  toggle.addEventListener('click', () => {
    const theme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(theme);

    try {
      sessionStorage.setItem(storageKey, theme);
    } catch {
      // The theme still changes when storage is unavailable.
    }
  });
})();
