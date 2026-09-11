document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Hero carousel (shows multiple slides at once) ---------- */
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    const track = carousel.querySelector('.carousel-track');
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    const dots = Array.from(carousel.querySelectorAll('.carousel-dot'));
    const prevBtn = carousel.querySelector('.carousel-btn.prev');
    const nextBtn = carousel.querySelector('.carousel-btn.next');
    const GAP = 18; // must match the gap value in .carousel-track CSS

    let index = 0;

    // Always show exactly one slide at a time -- people click/arrow
    // through to see the next one, rather than seeing several at once.
    function itemsPerView() {
      return 1;
    }

    function maxIndex() {
      return Math.max(0, slides.length - itemsPerView());
    }

    function applySlideWidths() {
      const n = itemsPerView();
      // each slide's width so that `n` of them + (n-1) gaps fill 100%
      const basis = `calc((100% - ${(n - 1) * GAP}px) / ${n})`;
      slides.forEach(slide => { slide.style.flexBasis = basis; });
    }

    function pauseOtherVideos(activeIndex) {
      slides.forEach((slide, i) => {
        const video = slide.querySelector('video');
        if (video && i !== activeIndex) video.pause();
      });
    }

    function updateButtons() {
      const noScrollNeeded = maxIndex() === 0;
      if (nextBtn) nextBtn.style.visibility = (noScrollNeeded || index >= maxIndex()) ? 'hidden' : 'visible';
      if (prevBtn) prevBtn.style.visibility = (noScrollNeeded || index === 0) ? 'hidden' : 'visible';
    }

    function goTo(i) {
      applySlideWidths();
      index = Math.max(0, Math.min(i, maxIndex()));
      const n = itemsPerView();
      const slideWidthPercent = 100 / n;
      // account for the gap when translating, same logic as the width calc
      track.style.transform = `translateX(calc(-${index} * (${slideWidthPercent}% + ${GAP / n}px)))`;
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

    applySlideWidths();
    goTo(0);
  }

});