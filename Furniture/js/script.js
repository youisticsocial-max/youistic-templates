/* script.js for premium furniture template */
document.addEventListener('DOMContentLoaded', function () {
  // Mobile menu toggle
  const toggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // Sticky header shrink on scroll
  const header = document.getElementById('site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Fade‑in animations using IntersectionObserver
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');
      appearOnScroll.unobserve(entry.target);
    });
  }, appearOptions);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });

  // Lightbox for gallery (delegated)
  const gallery = document.querySelector('.gallery');
  if (gallery) {
    gallery.addEventListener('click', e => {
      if (e.target.tagName !== 'IMG') return;
      const src = e.target.src;
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.top = 0; overlay.style.left = 0;
      overlay.style.width = '100%'; overlay.style.height = '100%';
      overlay.style.background = 'rgba(0,0,0,0.8)';
      overlay.style.display = 'flex';
      overlay.style.alignItems = 'center';
      overlay.style.justifyContent = 'center';
      overlay.style.zIndex = 1000;
      const img = document.createElement('img');
      img.src = src; img.style.maxWidth = '90%'; img.style.maxHeight = '90%';
      overlay.appendChild(img);
      overlay.addEventListener('click', () => overlay.remove());
      document.body.appendChild(overlay);
    });
  }
});
