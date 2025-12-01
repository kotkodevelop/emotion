/*
  Date-picker vanilla JS
  - Режимы: "single" и "range"
  - Запрет выбора прошлых дат (строго раньше сегодняшнего дня)
  - Пресеты (+1/+2/+3) корректно сдвигают диапазон вперёд, если нужно
  - Эмит события "dp-change"
*/

(function(){
  // Utils
  const $ = sel => document.querySelector(sel);
  const createEl = (tag, cls, txt) => { const e = document.createElement(tag); if(cls) e.className = cls; if(txt) e.textContent = txt; return e; };
  const fmt = d => d ? d.toLocaleDateString('ru-RU', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';
  const clamp = (d) => { const r = new Date(d.getFullYear(), d.getMonth(), d.getDate()); return r; }; // midnight
  const MS_PER_DAY = 24 * 60 * 60 * 1000;

  // Root elements
  const root = document.getElementById('date-picker');
  const daysGrid = root.querySelector('.dp-days-grid');
  const weekdaysRow = root.querySelector('.dp-weekdays');
  const monthLabel = root.querySelector('.dp-month-label');
  const prevBtn = root.querySelector('.dp-prev');
  const nextBtn = root.querySelector('.dp-next');
  const tabButtons = root.querySelectorAll('.dp-tab');
  const dpToggle = root.querySelector('.dp-toggle');
  const presetButtons = root.querySelectorAll('.preset');
  const selValue = root.querySelector('.sel-value');
  const selRange = root.querySelector('.sel-range');
  const rightBoxDates = Array.from(document.querySelectorAll('.right-box-in-date'));

    const SHORT_MONTHS = [
    'янв.', 'фев.', 'мар.', 'апр.', 'май.', 'июн.',
    'июл.', 'авг.', 'сен.', 'окт.', 'ноя.', 'дек.'
    ];

    function shortMonth(d){
    return SHORT_MONTHS[d.getMonth()];
    }

    function formatSingleForRight(d){
        if(!d) return '—';
        return `${d.getDate()} ${shortMonth(d)} ${d.getFullYear()}`;
    }

    function formatRangeForRight(a, b){
        if(!a && !b) return '—';
        if(a && !b) return `${a.getDate()} ${shortMonth(a)} ${a.getFullYear()} — …`;
        if(!a && b) return `… — ${b.getDate()} ${shortMonth(b)} ${b.getFullYear()}`;

        if(a.getFullYear() === b.getFullYear()){
        const year = a.getFullYear();
        if(a.getMonth() === b.getMonth()){
            // 22 – 24 июл 2026
            return `${a.getDate()} – ${b.getDate()} ${shortMonth(a)} ${year}`;
        } else {
            // 29 янв – 4 фев 2026
            return `${a.getDate()} ${shortMonth(a)} – ${b.getDate()} ${shortMonth(b)} ${year}`;
        }
        } else {
        // 31 дек 2025 – 2 янв 2026
        return `${a.getDate()} ${shortMonth(a)} ${a.getFullYear()} – ${b.getDate()} ${shortMonth(b)} ${b.getFullYear()}`;
        }
    }


  // State
  let viewDate = clamp(new Date()); // will represent first day of displayed month
  viewDate.setDate(1);
  let mode = root.dataset.mode || 'single'; // "single" | "range"
  let selectedSingle = null;
  let rangeStart = null;
  let rangeEnd = null;
  let awaitingRangeSecond = false;

  // Global today (midnight)
  const today = clamp(new Date());

  // Helpers
  function addDays(d, n){ const r = new Date(d.getFullYear(), d.getMonth(), d.getDate() + n); return clamp(r); }
  function isSameDay(a,b){ if(!a||!b) return false; return a.getFullYear()===b.getFullYear() && a.getMonth()===b.getMonth() && a.getDate()===b.getDate(); }
  function dateBefore(a,b){ return a.getTime() < b.getTime(); }
  function inRange(d, a, b){
    if(!a || !b) return false;
    const t = d.getTime();
    return t >= a.getTime() && t <= b.getTime();
  }
  function isPast(d){ return d.getTime() < today.getTime(); }

  // Weekdays header (ПН..ВС)
  const weekdays = ['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'];
  weekdaysRow.innerHTML = '';
  weekdays.forEach(w => {
    const e = createEl('div', null, w);
    e.style.textAlign = 'center';
    weekdaysRow.appendChild(e);
  });

  // Render calendar for current viewDate
  function renderCalendar(){
    monthLabel.textContent = viewDate.toLocaleString('ru-RU', { month: 'long', year: 'numeric' });
    daysGrid.innerHTML = '';

    const firstOfMonth = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
    let startOffset = (firstOfMonth.getDay() + 6) % 7; // make Monday = 0
    const daysInMonth = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0).getDate();

    // empty cells
    for(let i=0;i<startOffset;i++){
      const cell = createEl('div','dp-day dp-empty','');
      daysGrid.appendChild(cell);
    }

    for(let d=1; d<=daysInMonth; d++){
      const cur = clamp(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
      const cell = document.createElement('button');
      cell.type = 'button';
      cell.className = 'dp-day';
      cell.textContent = String(d);
      cell.setAttribute('data-date', cur.toISOString());
      cell.setAttribute('aria-label', cur.toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }));

      if(isSameDay(cur, today)){
        cell.classList.add('dp-today');
      }

      // disabled past days
      if (isPast(cur)){
        cell.classList.add('dp-disabled');
        cell.disabled = true;
      } else {
        // attach handler only for non-disabled
        cell.addEventListener('click', () => onDayClick(cur));
      }

      // selected styles
      if(mode === 'single' && selectedSingle && isSameDay(cur, selectedSingle)){
        cell.classList.add('dp-selected-single');
      }
      if(mode === 'range'){
        if(rangeStart && isSameDay(cur, rangeStart)) cell.classList.add('dp-range-start');
        if(rangeEnd && isSameDay(cur, rangeEnd)) cell.classList.add('dp-range-end');
        if(rangeStart && rangeEnd && inRange(cur, rangeStart, rangeEnd) && !isSameDay(cur, rangeStart) && !isSameDay(cur, rangeEnd)){
          cell.classList.add('dp-in-range');
        }
      }

      daysGrid.appendChild(cell);
    }
  }

  // Mode switch
  function setMode(m){
  mode = m;
  root.dataset.mode = m;

  // Управление классом "changed"
  if (dpToggle) {
    if (mode === 'range') {
      dpToggle.classList.add('changed');
    } else {
      dpToggle.classList.remove('changed');
    }
  }

  tabButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.mode === m));

  if(mode === 'single'){
    awaitingRangeSecond = false;
  }

  renderCalendar();
  refreshInfo();
}


  // Day click behavior
  function onDayClick(date){
    // date guaranteed not past (cells disabled for past)
    if(mode === 'single'){
      selectedSingle = date;
      renderCalendar();
      refreshInfo();
      emitChange();
    } else {
      if(!rangeStart || (rangeStart && rangeEnd && !awaitingRangeSecond)){
        // start a new range
        rangeStart = date;
        rangeEnd = null;
        awaitingRangeSecond = true;
      } else if(rangeStart && awaitingRangeSecond){
        // pick end; if end < start, swap
        if(dateBefore(date, rangeStart)){
          rangeEnd = rangeStart;
          rangeStart = date;
        } else {
          rangeEnd = date;
        }
        awaitingRangeSecond = false;
      }
      renderCalendar();
      refreshInfo();
      emitChange();
    }
  }

  // Presets (+N days)
  function onPreset(n){
    if(mode === 'single'){
      if(!selectedSingle){
        // если не выбрана одиночная дата — взять сегодня
        selectedSingle = clamp(new Date());
      }
      rangeStart = selectedSingle;
      rangeEnd = addDays(rangeStart, n);

      // если начало раньше today — сдвинуть диапазон вперёд
      if(isPast(rangeStart)){
        const diff = Math.ceil((today.getTime() - rangeStart.getTime()) / MS_PER_DAY);
        rangeStart = addDays(rangeStart, diff);
        rangeEnd = addDays(rangeEnd, diff);
      }

      setMode('range'); // переключаемся в диапазон
      renderCalendar();
      refreshInfo();
      emitChange();
    } else { // mode === 'range'
      if(!rangeStart){
        rangeStart = today;
        rangeEnd = addDays(rangeStart, n);
      } else if(rangeStart && !rangeEnd){
        rangeEnd = addDays(rangeStart, n);
      } else {
        rangeEnd = addDays(rangeEnd, n);
      }

      // корректировка: если начало до today -> сдвигаем вперед
      if(isPast(rangeStart)){
        const diff = Math.ceil((today.getTime() - rangeStart.getTime()) / MS_PER_DAY);
        rangeStart = addDays(rangeStart, diff);
        rangeEnd = addDays(rangeEnd, diff);
      }

      // ensure start <= end
      if(rangeEnd && dateBefore(rangeEnd, rangeStart)){
        const tmp = rangeStart; rangeStart = rangeEnd; rangeEnd = tmp;
      }

      renderCalendar();
      refreshInfo();
      emitChange();
    }
  }

  // Update info box
    function refreshInfo(){
    // существующие элементы-индикаторы
    selValue.textContent = selectedSingle ? fmt(selectedSingle) : '—';
    if(rangeStart && rangeEnd){
        selRange.textContent = `${fmt(rangeStart)} — ${fmt(rangeEnd)}`;
    } else if(rangeStart && !rangeEnd){
        selRange.textContent = `${fmt(rangeStart)} — …`;
    } else {
        selRange.textContent = '—';
    }

    // обновляем все правые боксы на странице
    if(Array.isArray(rightBoxDates) && rightBoxDates.length){
        rightBoxDates.forEach(el => {
        if(mode === 'single'){
            el.textContent = selectedSingle ? formatSingleForRight(selectedSingle) : '—';
        } else { // range
            el.textContent = (rangeStart || rangeEnd) ? formatRangeForRight(rangeStart, rangeEnd) : '—';
        }
        });
    }
    }


  // Navigation
  prevBtn.addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() - 1);
    renderCalendar();
  });
  nextBtn.addEventListener('click', () => {
    viewDate.setMonth(viewDate.getMonth() + 1);
    renderCalendar();
  });

  // Tabs
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      setMode(btn.dataset.mode);
    });
  });

  // Preset buttons
  presetButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const n = parseInt(btn.dataset.days, 10) || 1;
      onPreset(n);
    });
  });

  // Emit custom event with current selection
  function emitChange(){
    const detail = {
      mode,
      single: selectedSingle ? new Date(selectedSingle.getTime()) : null,
      rangeStart: rangeStart ? new Date(rangeStart.getTime()) : null,
      rangeEnd: rangeEnd ? new Date(rangeEnd.getTime()) : null
    };
    root.dispatchEvent(new CustomEvent('dp-change', { detail }));
  }

  // Public API
  window.DatePicker = window.DatePicker || {};
  window.DatePicker.getValue = function(){
    return {
      mode,
      single: selectedSingle,
      rangeStart,
      rangeEnd
    };
  };
  window.DatePicker.setDate = function(d){
    if(!d) return;
    const nd = clamp(new Date(d));
    // cannot set a past date
    if(isPast(nd)) nd = clamp(new Date());
    selectedSingle = nd;
    viewDate = new Date(nd.getFullYear(), nd.getMonth(), 1);
    renderCalendar();
    refreshInfo();
    emitChange();
  };
  window.DatePicker.setRange = function(a,b){
    if(!a || !b) return;
    let aN = clamp(new Date(a));
    let bN = clamp(new Date(b));
    // prevent past: if start < today, shift forward so start == today
    if(isPast(aN)){
      const diff = Math.ceil((today.getTime() - aN.getTime()) / MS_PER_DAY);
      aN = addDays(aN, diff);
      bN = addDays(bN, diff);
    }
    if(dateBefore(bN, aN)){
      const tmp = aN; aN = bN; bN = tmp;
    }
    rangeStart = aN;
    rangeEnd = bN;
    setMode('range');
    viewDate = new Date(rangeStart.getFullYear(), rangeStart.getMonth(), 1);
    renderCalendar();
    refreshInfo();
    emitChange();
  };

  // Init
    viewDate = new Date();
    viewDate.setDate(1);
    selectedSingle = today;
    setMode(mode);
    renderCalendar();
    refreshInfo();
    emitChange();


})();
