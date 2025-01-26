/* 
  scripts.js
  Contains:
   1) The slider logic (nextSlide, prevSlide, etc.)
   2) The scroll logic for the navbar
*/

/* 
  Slider Code
  - Toggles 'active' class on each slide 
  - Autoscroll every 3 seconds
*/

/* Global variables for the slider */
let currentSlide = 0;
let autoSlideInterval;

/* Grab the slides from the .slider container */
const slides = document.querySelectorAll('.slider .slide');

/**
 * showSlide
 * Removes 'active' from all slides, then adds it to the current index
 */
function showSlide(index) {
  slides.forEach(slide => slide.classList.remove('active'));
  slides[index].classList.add('active');
}

/**
 * nextSlide
 * Increments currentSlide, shows it, and resets the autoSlide timer
 */
function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
  resetAutoSlide();
}

/**
 * prevSlide
 * Decrements currentSlide, wraps around, shows it, and resets autoSlide
 */
function prevSlide() {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  showSlide(currentSlide);
  resetAutoSlide();
}

/**
 * startAutoSlide
 * Sets an interval to auto-change slides every 3 seconds
 */
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    nextSlide();
  }, 3000);
}

/**
 * resetAutoSlide
 * Clears the interval and restarts it
 */
function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  startAutoSlide();
}

/**
 * Initialize the slider on page load
 */
function initSlider() {
  // Show the initial slide
  showSlide(currentSlide);
  // Start auto-scrolling
  startAutoSlide();
}

/* 
  NAVBAR SCROLL LOGIC
  - Makes the header semi-transparent when user scrolls
*/
function initNavScroll() {
  const header = document.getElementById('stickyHeader');
  window.addEventListener('scroll', () => {
    // If scrolled down at all, add "scrolled" class
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* 
  EVENT LISTENERS / ONLOAD
  Wait for DOM to be ready, then init the slider and nav scroll
*/
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the slider
  initSlider();
  // Initialize the navbar scroll effect
  initNavScroll();
});
