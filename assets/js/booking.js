// Booking calendar + WhatsApp request
(function () {
  const monthLabel = document.getElementById('calMonthLabel');
  const daysEl = document.getElementById('calDays');
  const prevBtn = document.getElementById('calPrev');
  const nextBtn = document.getElementById('calNext');

  const chosenDateText = document.getElementById('chosenDate');
  const dateISO = document.getElementById('dateISO');
  const fName = document.getElementById('fName');
  const fService = document.getElementById('fService');
  const fTime = document.getElementById('fTime');
  const waBtn = document.getElementById('waSend');

  if (!monthLabel || !daysEl) return;

  let view = new Date();
  view.setDate(1);
  let selected = null;

  function fmtMonthYear(d) {
    return d.toLocaleDateString('de-DE', { month: 'long', year: 'numeric' });
  }
  function fmtHuman(d) {
    return d.toLocaleDateString('de-DE', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' });
  }
  function pad(n){ return n.toString().padStart(2,'0'); }
  function isoDate(d){
    return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
  }

  function render() {
    monthLabel.textContent = fmtMonthYear(view);
    daysEl.innerHTML = '';

    const startDay = new Date(view.getFullYear(), view.getMonth(), 1);
    const endDay = new Date(view.getFullYear(), view.getMonth()+1, 0);
    const firstWeekday = (startDay.getDay() + 6) % 7; // Mo=0
    const totalDays = endDay.getDate();

    // vorige maand placeholders
    for (let i=0; i<firstWeekday; i++){
      const div = document.createElement('div');
      div.className = 'cal-day is-muted';
      div.textContent = '';
      daysEl.appendChild(div);
    }

    const todayIso = isoDate(new Date());
    for (let d=1; d<=totalDays; d++){
      const date = new Date(view.getFullYear(), view.getMonth(), d);
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'cal-day';
      btn.textContent = d;

      const thisIso = isoDate(date);
      if (thisIso === todayIso) btn.classList.add('is-today');
      if (selected && isoDate(selected) === thisIso) btn.classList.add('is-selected');

      btn.addEventListener('click', () => selectDate(date));
      daysEl.appendChild(btn);
    }

    // volgende maand placeholders om grid netjes te sluiten
    const cells = daysEl.children.length;
    const remainder = cells % 7;
    if (remainder !== 0){
      for (let i=0; i<7 - remainder; i++){
        const div = document.createElement('div');
        div.className = 'cal-day is-muted';
        div.textContent = '';
        daysEl.appendChild(div);
      }
    }
  }

  function selectDate(d){
    selected = new Date(d.getTime());
    chosenDateText.textContent = fmtHuman(selected);
    dateISO.value = isoDate(selected);
    // markering bijwerken
    Array.from(daysEl.querySelectorAll('.cal-day')).forEach(el => el.classList.remove('is-selected'));
    // zoek exact de dagknop
    const idx = ((selected.getDay() + 6) % 7) + selected.getDate(); // niet perfect, maar we hebben al loop — simpeler:
    render(); // herteken zodat selected class gezet wordt
  }

  prevBtn.addEventListener('click', () => {
    view.setMonth(view.getMonth()-1); render();
  });
  nextBtn.addEventListener('click', () => {
    view.setMonth(view.getMonth()+1); render();
  });

  // WhatsApp deeplink
  waBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (!selected){
      alert('Bitte Datum wählen.');
      return;
    }
    if (!fName.value.trim() || !fService.value.trim() || !fTime.value.trim()){
      alert('Bitte Name, Leistung und Wunschzeit ausfüllen.');
      return;
    }
    const msg = [
      'Hallo Stacy, ich möchte gerne einen Termin anfragen.',
      `Name: ${fName.value.trim()}`,
      `Leistung: ${fService.value.trim()}`,
      `Wunschtermin: ${fmtHuman(selected)} um ${fTime.value.trim()}`,
      '(Dies ist eine Anfrage – bitte um Rückmeldung zur Bestätigung.)'
    ].join('\n');

    const wa = `https://wa.me/32479530471?text=${encodeURIComponent(msg)}`;
    window.open(wa, '_blank');
  });

  // Init
  render();

  // Icons (Lucide)
  if (window.lucide) window.lucide.createIcons();
})();
