(function () {
  const data = window.__i18n;
  const priceBlocks = window.__priceBlocks;
  const faq = window.__faq;

  function renderPrices(lang) {
    const grid = document.getElementById('priceGrid');
    if (!grid) return;
    grid.innerHTML = '';
    priceBlocks.forEach(block => {
      const card = document.createElement('div');
      card.className = 'reveal bg-coal2 rounded-2xl border border-white/10 p-5';
      const title = document.createElement('h3');
      title.className = 'font-serif text-xl mb-3';
      title.textContent = block.titles[lang];
      const ul = document.createElement('ul');
      ul.className = 'space-y-2 text-white/80';
      block.items.forEach(it => {
        const li = document.createElement('li'); li.className = 'flex justify-between gap-4';
        li.innerHTML = `<span>${it.name[lang]}</span><span class="text-white">${it.price}</span>`;
        ul.appendChild(li);
      });
      card.appendChild(title); card.appendChild(ul); grid.appendChild(card);
    });
  }

  function renderFaq(lang) {
    const list = document.getElementById('faqList');
    if (!list) return;
    list.innerHTML = '';
    faq[lang].forEach(([q,a]) => {
      const details = document.createElement('details');
      details.className = 'reveal group bg-coal2 rounded-2xl border border-white/10 p-5';
      details.innerHTML = `<summary class="cursor-pointer font-medium text-white group-open:text-gold">${q}</summary><p class="mt-2 text-white/80">${a}</p>`;
      list.appendChild(details);
    });
  }

  function translate(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const keyPath = el.getAttribute('data-i18n').split('.');
      const value = keyPath.reduce((acc, k) => acc && acc[k], data[lang]);
      if (typeof value === 'string') el.textContent = value;
    });
    renderPrices(lang);
    renderFaq(lang);
  }

  window.__i18n_apply = translate;
})();
