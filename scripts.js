/**
 * scripts.js
 *
 * 1) Edge-arrow hero slider with headline grow/shrink & text slide-in
 * 2) Sticky-nav opacity change on scroll
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── Hero slider ───────────────────────────────────────── */
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots   = document.getElementById('heroDots');
  const prevBt = document.getElementById('heroPrev');
  const nextBt = document.getElementById('heroNext');

  let idx = 0, timer;

  /* create dots */
  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.onclick   = () => goTo(i, i > idx ? 'right' : 'left');
    dots.appendChild(d);
  });
  const dotEls = Array.from(dots.children);

  /* helper to read each slide's <h1> text */
  const title = i => slides[i].querySelector('h1').textContent.trim();

  function setArrowLabels(){
    prevBt.firstElementChild.textContent = '← ' + title((idx - 1 + slides.length) % slides.length);
    nextBt.firstElementChild.textContent = title((idx + 1) % slides.length) + ' →';
  }

  function goTo(target, dir = 'right'){
    if (target === idx) return;

    /* clear old state */
    slides[idx].classList.remove('active', 'from-left', 'from-right');
    dotEls[idx].classList.remove('active');

    /* prep incoming slide with directional offset */
    slides[target].classList.add('from-' + dir);

    /* trigger reflow so animation starts */
    requestAnimationFrame(() => {
      slides[target].classList.add('active');
    });

    dotEls[target].classList.add('active');
    idx = target;
    setArrowLabels();
    resetTimer();
  }

  function next() { goTo((idx + 1) % slides.length, 'right'); }
  function prev() { goTo((idx - 1 + slides.length) % slides.length, 'left'); }

  prevBt.onclick = prev;
  nextBt.onclick = next;
  setArrowLabels();

  /* auto-rotate */
  function resetTimer(){
    clearInterval(timer);
    timer = setInterval(next, 8000);   // 8 s per slide
  }
  resetTimer();

  /* ─── Sticky nav ────────────────────────────────────────── */
  const header = document.getElementById('stickyHeader');
  window.addEventListener('scroll', () =>
    header.classList.toggle('scrolled', window.scrollY > 0)
  );
});



