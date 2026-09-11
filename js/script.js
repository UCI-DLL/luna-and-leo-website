document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero carousel (shows multiple slides at once) ---------- */
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');

    let index = 0;

    function itemsPerView() {
      const w = window.innerWidth;
      let n = 3;
      if (w <= 900) n = 2;
      if (w <= 600) n = 1;
      return Math.min(n, slides.length);
    }

    function maxIndex() {
      return Math.max(0, slides.length - itemsPerView());
    }

    function pauseOtherVideos(activeIndex) {
      slides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (video && i !== activeIndex) video.pause();
      });
    }

    function updateButtons() {
      const atMax = index >= maxIndex();
      if (nextBtn) nextBtn.style.visibility = (maxIndex() === 0 || atMax) ? 'hidden' : 'visible';
      if (prevBtn) prevBtn.style.visibility = (index === 0) ? 'hidden' : 'visible';
    }

    function goTo(i) {
      index = Math.max(0, Math.min(i, maxIndex()));
      const step = 100 / itemsPerView();
      track.style.transform = `translateX(-${index * step}%)`;
      dots.forEach((dot, i2) => {
        const isActive = i2 === index;
        dot.classList.toggle('active', isActive);
        dot.setAttribute('aria-selected', String(isActive));
      });
      pauseOtherVideos(index);
      updateButtons();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(index + 1));
    dots.forEach((dot, i) => dot.addEventListener('click', () => goTo(i)));

    carousel.setAttribute('tabindex', '0');
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goTo(index - 1);
      if (e.key === 'ArrowRight') goTo(index + 1);
    });

    window.addEventListener('resize', () => goTo(index), { passive: true });

    goTo(0);
  }

});