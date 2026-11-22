// Quietwire landing page: the index descriptions, the day row, the shutter and entrances.
(() => {
  document.documentElement.classList.add('js');
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // What is in it: hovering or focusing a name shows what it means in this villa.
  const desc = document.querySelector('.desc');
  if (desc) {
    const idle = desc.textContent;
    document.querySelectorAll('.col li[data-d]').forEach(li => {
      li.tabIndex = 0;
      const show = () => {
        document.querySelectorAll('.col li.on').forEach(x => x.classList.remove('on'));
        li.classList.add('on'); desc.textContent = li.dataset.d;
      };
      li.addEventListener('mouseenter', show);
      li.addEventListener('focus', show);
    });
    document.querySelector('.cols').addEventListener('mouseleave', () => {
      document.querySelectorAll('.col li.on').forEach(x => x.classList.remove('on'));
      desc.textContent = idle;
    });
  }

  // A day in the villa: drag or use the arrows; the hour closest to now is marked and shown first.
  const row = document.getElementById('row');
  if (row) {
    const fill = document.getElementById('track-fill');
    const items = [...row.children];
    const progress = () => {
      const max = row.scrollWidth - row.clientWidth;
      const f = max > 0 ? row.scrollLeft / max : 1;
      fill.style.width = `${Math.max(8, f * 100)}%`;
    };
    row.addEventListener('scroll', progress, { passive: true });
    window.addEventListener('resize', progress);

    const now = new Date(); const h = now.getHours() + now.getMinutes() / 60;
    // hours on a circle from 04:00, so 02:00 belongs to the night
    const shift = x => (x - 4 + 24) % 24;
    let best = items[0], bestD = 99;
    items.forEach(li => { const d = shift(h) - shift(+li.dataset.h); if (d >= 0 && d < bestD) { bestD = d; best = li; } });
    best.classList.add('now');
    requestAnimationFrame(() => { const pad = parseFloat(getComputedStyle(row).paddingLeft) || 0; row.scrollLeft = Math.max(0, best.offsetLeft - row.offsetLeft - pad); progress(); });

    const step = () => items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(row).columnGap || 32);
    document.querySelectorAll('[data-dir]').forEach(b => b.addEventListener('click', () => {
      row.scrollBy({ left: +b.dataset.dir * step(), behavior: reduce ? 'auto' : 'smooth' });
    }));

    // drag with a mouse; touch scrolls natively
    let down = false, x0 = 0, s0 = 0, moved = false;
    row.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; x0 = e.clientX; s0 = row.scrollLeft; row.classList.add('dragging');
    });
    window.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - x0; if (Math.abs(dx) > 3) moved = true;
      row.scrollLeft = s0 - dx;
    });
    window.addEventListener('pointerup', () => { if (!down) return; down = false; row.classList.remove('dragging'); });
    row.addEventListener('click', e => { if (moved) e.preventDefault(); }, true);
    row.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') { e.preventDefault(); row.scrollBy({ left: (e.key === 'ArrowRight' ? 1 : -1) * step(), behavior: reduce ? 'auto' : 'smooth' }); }
    });

    // the running tap plays only while it is on screen
    const vid = row.querySelector('video');
    if (vid && !reduce) {
      new IntersectionObserver(([e]) => { e.isIntersecting ? vid.play().catch(() => {}) : vid.pause(); }, { threshold: 0.4 }).observe(vid);
    }
  }

  // The hero's tall print opens once, like a shutter.
  const sh = document.querySelector('.shutter');
  if (sh) requestAnimationFrame(() => setTimeout(() => sh.classList.add('is-open'), 120));

  // Entrances: each part of a section arrives in turn.
  const groups = new Map();
  document.querySelectorAll('[data-in]').forEach(el => {
    const sec = el.closest('section, footer') || document.body;
    const n = groups.get(sec) || 0; el.style.setProperty('--i', n); groups.set(sec, n + 1);
  });
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  document.querySelectorAll('[data-in]').forEach(el => io.observe(el));
})();
