(() => {
  const $ = id => document.getElementById(id);
  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

  // Schedule from docs/03-subsystems.md: [startHour, kelvinStart, kelvinEnd, levelStart, levelEnd]
  const SEG = [
    [0, 2200, 2200, 4, 4], [5.5, 2200, 2700, 4, 30], [6.5, 2700, 4000, 30, 70], [7.5, 4000, 5000, 70, 100],
    [10, 5000, 4500, 100, 90], [17, 4500, 4000, 90, 80], [18, 4000, 3000, 80, 60], [19.5, 3000, 2500, 60, 30],
    [21, 2500, 2200, 30, 20], [23, 2200, 2200, 4, 4], [24, 2200, 2200, 4, 4]
  ];
  function light(h) {
    for (let i = 0; i < SEG.length - 1; i++) {
      const [s, k0, k1, l0, l1] = SEG[i], e = SEG[i + 1][0];
      if (h >= s && h < e) { const t = (h - s) / (e - s); return [Math.round(lerp(k0, k1, t) / 10) * 10, Math.round(lerp(l0, l1, t))]; }
    }
    return [2200, 4];
  }
  // Tanner Helland approximation of colour temperature to sRGB
  function rgb(k) {
    const t = k / 100; let r, g, b;
    r = t <= 66 ? 255 : 329.698727446 * Math.pow(t - 60, -0.1332047592);
    g = t <= 66 ? 99.4708025861 * Math.log(t) - 161.1195681661 : 288.1221695283 * Math.pow(t - 60, -0.0755148492);
    b = t >= 66 ? 255 : t <= 19 ? 0 : 138.5177312231 * Math.log(t - 10) - 305.0447927307;
    return [r, g, b].map(v => Math.round(clamp(v, 0, 255)));
  }
  const fmt = m => String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0');

  function update() {
    const m = +$('clock').value, h = m / 60;
    const [k, lvl] = light(h);
    const night = h >= 23 || h < 6;
    // plate: flat field in the light's colour, dimmed by level over the dark ground
    const [r, g, b] = rgb(k), a = 0.55 + 0.45 * (lvl / 100);
    const base = [7, 40, 39];
    const c = [r, g, b].map((v, i) => Math.round(lerp(base[i], v, a)));
    const plate = $('plate');
    plate.style.background = `rgb(${c})`;
    const lum = (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255;
    plate.style.color = lum > 0.45 ? '#072827' : '#e9f1ee';
    $('plate-time').textContent = fmt(m);
    $('plate-k').textContent = k + ' K at ' + lvl + '%';

    $('r-light').textContent = night
      ? `Night path only, ${k} K at ${lvl}%, never cool white`
      : h < 10 ? `Waking light, ${k} K at ${lvl}%`
      : h < 17 ? `Daylight-harvested, ${k} K at ${lvl}%`
      : `Warming down, ${k} K at ${lvl}%`;
    $('r-wifi').textContent = night
      ? 'Lounge and study access points off. Wired jacks stay live'
      : 'All four access points on, bedrooms covered from the lounge';
    $('r-air').textContent = night
      ? 'ERV at quiet boost, bedrooms held near 800 ppm CO2'
      : (h >= 7 && h < 9) || (h >= 19 && h < 20.5)
        ? 'Kitchen extract boost with make-up air, PM2.5 watched'
        : h >= 10 && h < 17 ? 'ERV at low, outdoor PM2.5 checked before intake'
        : 'ERV at medium, CO2 under 1,000 ppm';
    $('r-water').textContent = night
      ? 'Night flow limit armed, valve closes on continuous flow'
      : 'Main valve open, flow and TDS monitored';
    $('r-sec').textContent = night
      ? 'Night mode, doors and windows armed'
      : h >= 9 && h < 17 ? 'Home mode, perimeter cameras recording'
      : 'Home mode, doors monitored';
  }
  $('clock').addEventListener('input', update);
  update();

  // tabs
  const tabs = { t1: 'Separate routes for mains, KNX and Cat6A, at least one spare 25 mm conduit per floor riser, and sleeves through beams marked before the slab is cast. Late conduit costs many times more than early conduit.',
    t2: 'A neutral wire at every switch position, bathrooms and corridors included, and deep backboxes for the keypads. This is the single cheapest decision at first fix and the most expensive one to repair after plastering.',
    t3: 'At least 2.0 by 2.2 m, lockable, no wet pipes above it, a dedicated supply with its own sub-meter and a UPS circuit. Every home-run cable ends here and every cable carries a label.' };
  const list = [...document.querySelectorAll('.tabs [role=tab]')];
  const panel = $('tp');
  list.forEach(t => t.addEventListener('click', () => {
    list.forEach(x => { x.setAttribute('aria-selected', x === t); x.tabIndex = x === t ? 0 : -1; });
    $('tp-text').textContent = tabs[t.id];
    panel.setAttribute('aria-labelledby', t.id);
  }));
  document.querySelector('.tabs').addEventListener('keydown', e => {
    const i = list.findIndex(t => t.getAttribute('aria-selected') === 'true');
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
      const n = list[(i + (e.key === 'ArrowRight' ? 1 : list.length - 1)) % list.length]; n.click(); n.focus();
    }
  });

  // entrance: heading, text, picture, staggered, once
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const rv = [...document.querySelectorAll('.rv')];
  if (!reduce && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        const sibs = [...e.target.parentElement.children].filter(x => x.classList.contains('rv'));
        e.target.style.transitionDelay = Math.max(0, sibs.indexOf(e.target)) * 80 + 'ms';
        e.target.classList.add('in'); io.unobserve(e.target);
      }
    }), { threshold: 0.12 });
    rv.forEach(n => io.observe(n));
  } else rv.forEach(n => n.classList.add('in'));

  // fit the monument to the width
  const fit = () => { const n = $('name'); n.style.fontSize = '100px'; const s = document.createElement('span'); s.textContent = n.textContent; s.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;font:inherit;letter-spacing:inherit'; n.appendChild(s); const sw = s.getBoundingClientRect().width; s.remove(); n.style.fontSize = (100 * n.clientWidth / sw * 0.995) + 'px'; };
  fit(); addEventListener('resize', fit); if (document.fonts && document.fonts.ready) document.fonts.ready.then(fit);

  // signature: the monument settles as the first screen leaves, and returns heavy at the footer
  const name = $('name'), name2 = document.querySelector('.name2');
  if (!reduce) {
    let tick = false;
    const onScroll = () => {
      if (tick) return; tick = true;
      requestAnimationFrame(() => {
        const vh = innerHeight, y = scrollY;
        name.style.transform = `scale(${1 - 0.06 * clamp(y / vh, 0, 1)})`;
        const f = name2.getBoundingClientRect();
        const p = clamp(1 - f.top / vh, 0, 1);
        name2.style.transform = `scale(${0.94 + 0.06 * p})`;
        // slow drift on the band photograph
        const img = document.querySelector('.band img'), bb = img.getBoundingClientRect();
        const q = clamp((vh - bb.top) / (vh + bb.height), 0, 1);
        img.style.transform = `translateY(${(q - 0.5) * -40}px) scale(1.08)`;
        tick = false;
      });
    };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }
})();
