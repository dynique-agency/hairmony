(function () {
  window.handleSubmit = function (e) {
    e.preventDefault();
    const lang = localStorage.getItem('hm_lang') || 'de';
    const dict = window.__i18n[lang];
    const form = e.target;
    const fd = new FormData(form);
    const parts = [];
    for (const [k,v] of fd.entries()) parts.push(`${k}: ${v}`);
    const body = encodeURIComponent(parts.join('\n'));
    const mailto = `mailto:info@hairmony.local?subject=Termin%20Anfrage&body=${body}`; // TODO: echte mail
    const notice = document.getElementById('formNotice');
    if (notice) notice.textContent = dict.form.sent;
    window.location.href = mailto;
  };
})();
