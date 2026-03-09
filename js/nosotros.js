document.addEventListener('DOMContentLoaded', () => {
  const heroImg = document.querySelector('.da1-parallax-img');
  window.addEventListener('scroll', () => {
    if(heroImg) {
      let scrollPos = window.scrollY;
      if (scrollPos < 800) {
        heroImg.style.transform = `translateY(${scrollPos * 0.3}px) scale(1.05)`;
      }
    }
  });

  const revealElements = document.querySelectorAll('.fade-up, .reveal-left, .reveal-right, .reveal-up');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.1
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  setTimeout(() => {
    document.querySelectorAll('.da1-about-hero-content .fade-up').forEach(el => {
      el.classList.add('is-visible');
    });
  }, 100);
});