(function () {
  const switcher = document.getElementById('langSwitch');

  function initLang() {
    const stored = localStorage.getItem('hm_lang') || 'de';
    switcher.value = stored;
    window.__i18n_apply(stored);
  }

  function bindSwitcher() {
    switcher.addEventListener('change', () => {
      const lang = switcher.value;
      localStorage.setItem('hm_lang', lang);
      window.__i18n_apply(lang);
    });
  }

  function setYear() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', () => {
    initLang();
    bindSwitcher();
    setYear();
    if (window.__animate) window.__animate();
  });
})();
