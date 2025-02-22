/**
 * scripts.js
 * 
 * 1) Full-width slider with dots (no arrows).
 * 2) (Optional) Sticky header scroll logic.
 */

// SLIDER CODE
let slideIndex = 0;
let autoSlideInterval;
const slides = document.querySelectorAll('.slider .slide');
const dotsContainer = document.getElementById('dots');

/**
 * Dynamically create dot elements based on # of slides
 */
slides.forEach((slide, i) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  // On click, jump to slide i
  dot.addEventListener('click', () => setSlide(i));
  dotsContainer.appendChild(dot);
});

showSlide(slideIndex);
updateDots(slideIndex);
startAutoSlide();

/**
 * showSlide(index)
 * - Hide all slides, show the targeted one
 */
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

/**
 * updateDots(index)
 * - Deactivate all .dot, activate the current one
 */
function updateDots(index) {
  const dots = document.querySelectorAll('.dot');
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

/**
 * nextSlide()
 * - increment slideIndex, wrap around, show & update dot
 */
function nextSlide() {
  slideIndex = (slideIndex + 1) % slides.length;
  showSlide(slideIndex);
  updateDots(slideIndex);
}

/**
 * setSlide(i)
 * - jump directly to slide i
 */
function setSlide(i) {
  slideIndex = i;
  showSlide(slideIndex);
  updateDots(slideIndex);
  resetAutoSlide();
}

/**
 * startAutoSlide()
 * - auto-rotate slides every 4s
 */
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 4000);
}

/**
 * resetAutoSlide()
 * - clear the interval & restart
 */
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

/**
 * (Optional) Sticky Header Logic
 *   if you want the nav bar to become opaque on scroll
 */
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

// DOMContentLoaded for any initializations
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll(); // If you want the stickyHeader scrolled effect
});

