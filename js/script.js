document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero carousel ---------- */
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    let index = 0;

    function pauseOtherVideos(activeIndex) {
      slides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (video && i !== activeIndex) video.pause();
      });
    }

    function goTo(i) {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, i2) => {
        dot.classList.toggle('active', i2 === index);
        dot.setAttribute('aria-selected', String(i2 === index));
      });
      pauseOtherVideos(index);
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    });

    goTo(0);
  }

});