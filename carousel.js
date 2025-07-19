// Carousel functionality for hero section
let currentSlideIndex = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');
const container = document.querySelector('.carousel-container');

function showSlide(index) {
  if (index >= slides.length) {
    currentSlideIndex = 0;
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1;
  } else {
    currentSlideIndex = index;
  }
  
  const offset = -currentSlideIndex * 33.333;
  container.style.transform = `translateX(${offset}%)`;
  
  // Update dots
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === currentSlideIndex);
  });
}

function changeSlide(direction) {
  showSlide(currentSlideIndex + direction);
}

function currentSlide(index) {
  showSlide(index - 1);
}

// Auto slide every 5 seconds
setInterval(() => {
  changeSlide(1);
}, 5000);

// Initialize first slide when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  showSlide(0);
}); 