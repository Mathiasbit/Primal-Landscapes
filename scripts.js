/**
 * scripts.js
 * 
 * 1) Full-width slider with "background-size: contain," 
 *    fixed height (400px).
 * 2) Dot navigation, auto-rotation every 4s.
 * 3) Optional sticky nav logic (semi-opaque on scroll).
 */

// Slider variables
let slideIndex = 0;
let autoSlideInterval;
const slides = document.querySelectorAll('.slider .slide');
const dotsContainer = document.getElementById('dots');

/* Create dot elements for each slide */
slides.forEach((slide, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  // On click, jump to slide i
  dot.addEventListener('click', () => setSlide(i));
  dotsContainer.appendChild(dot);
});

/* Initialize: show first slide, highlight first dot, start auto-rotation */
showSlide(slideIndex);
updateDots(slideIndex);
startAutoSlide();

/**
 * showSlide(index):
 * - remove 'active' from all slides, add to target
 */
function showSlide(index) {
  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.add('active');
}

/**
 * updateDots(index):
 * - remove 'active' from all .dot, add to target
 */
function updateDots(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(d => d.classList.remove('active'));
  dots[index].classList.add('active');
}

/**
 * nextSlide():
 * - increment index, wrap around
 */
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
  updateDots(slideIndex);
}

/**
 * setSlide(i):
 * - jump to slide i, reset auto timer
 */
function setSlide(i) {
  slideIndex = i;
  showSlide(slideIndex);
  updateDots(slideIndex);
  resetAutoSlide();
}

/**
 * startAutoSlide():
 * - rotate slides every 4 seconds
 */
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 4000);
}

/**
 * resetAutoSlide():
 * - clear & restart interval after manual click
 */
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

/* OPTIONAL: sticky nav scroll logic */
function initNavScroll() {
  const header = document.getElementById('stickyHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* On DOMContentLoaded, run initNavScroll if desired */
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
});


