/** scripts.js – hero, sticky, lightbox **/

document.addEventListener('DOMContentLoaded', () => {

  /* hero */
  const slides = [...document.querySelectorAll('.hero-slide')],
        dots   = document.getElementById('heroDots'),
        prevBt = document.getElementById('heroPrev'),
        nextBt = document.getElementById('heroNext');
  let idx = 0, timer;

  slides.forEach((_, i) => {
    const d = document.createElement('span');
    d.className = 'dot' + (i ? '' : ' active');
    d.onclick = () => goTo(i, i > idx ? 'right' : 'left');
    dots.appendChild(d);
  });
  const dotEls = [...dots.children];
  const title  = i => (slides[i].querySelector('h1') || {}).textContent?.trim() || '';

  const setArrows = () => {
    prevBt.firstElementChild.textContent = '← ' + title((idx - 1 + slides.length) % slides.length);
    nextBt.firstElementChild.textContent =       title((idx + 1) % slides.length) + ' →';
  };

  function goTo(t, dir='right'){
    if (t===idx) return;
    slides[idx].classList.remove('active','from-left','from-right');
    dotEls[idx].classList.remove('active');
    slides[t].classList.add('from-'+dir);
    requestAnimationFrame(()=>slides[t].classList.add('active'));
    dotEls[t].classList.add('active');
    idx=t; setArrows(); reset();
  }
  const next = () => goTo((idx+1)%slides.length,'right');
  const prev = () => goTo((idx-1+slides.length)%slides.length,'left');

  prevBt.onclick = prev;
  nextBt.onclick = next;
  setArrows();

  const reset = () => {
    clearInterval(timer);
    if(slides.length>1) timer = setInterval(next, 8000);
  };
  reset();

  /* sticky */
  const header = document.getElementById('stickyHeader');
  addEventListener('scroll', ()=>header.classList.toggle('scrolled',scrollY>0));

  /* lightbox */
  const gallery = document.getElementById('gallery');
  if (gallery){
    const lb     = document.getElementById('lightbox'),
          lbImg  = lb.querySelector('img'),
          pBtn   = lb.querySelector('.lightbox-prev'),
          nBtn   = lb.querySelector('.lightbox-next'),
          thumbs = [...gallery.querySelectorAll('img')];
    let cur = 0;

    const show = i => {
      cur = (i+thumbs.length)%thumbs.length;
      lbImg.src = thumbs[cur].src;
      lbImg.alt = thumbs[cur].alt;
    };

    gallery.onclick = e=>{
      if(e.target.tagName==='IMG'){
        cur = thumbs.indexOf(e.target);
        show(cur);
        lb.classList.add('open');
        lb.setAttribute('aria-hidden','false');
      }
    };
    pBtn.onclick = e=>{e.stopPropagation(); show(cur-1);};
    nBtn.onclick = e=>{e.stopPropagation(); show(cur+1);};
    const close = ()=>{lb.classList.remove('open');lb.setAttribute('aria-hidden','true');lbImg.src='';};
    lb.onclick = e=>{if(e.target===lb) close();};
    addEventListener('keyup',e=>{
      if(!lb.classList.contains('open')) return;
      if(e.key==='Escape') close();
      else if(e.key==='ArrowLeft') show(cur-1);
      else if(e.key==='ArrowRight') show(cur+1);
    });
  }
});




