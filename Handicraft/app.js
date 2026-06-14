/* --------------------------------------------------
   Zainab Impex - Authentic Indian Handicrafts
   Jodhpur, Rajasthan
   Vanilla JavaScript Interactive Core
-------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. MOBILE DRAWER NAVIGATION MENU
  // ==========================================
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenuClose = document.getElementById('mobile-menu-close');
  const mobileNavDrawer = document.getElementById('mobile-navigation-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-link');

  if (mobileMenuToggle && mobileNavDrawer) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileNavDrawer.classList.add('open');
      document.body.style.overflow = 'hidden'; // Prevent body scroll
    });
  }

  const closeDrawer = () => {
    mobileNavDrawer.classList.remove('open');
    document.body.style.overflow = ''; // Restore body scroll
  };

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeDrawer);
  }

  // Close drawer when clicking nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer if clicking outside
  document.addEventListener('click', (e) => {
    if (mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
      if (!mobileNavDrawer.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        closeDrawer();
      }
    }
  });


  // ==========================================
  // 2. CURRENCY CONVERSION TOGGLE SYSTEM
  // ==========================================
  // Toggle states: 'INR' (default) or 'USD'
  let currentCurrency = 'INR';
  const desktopCurrencyBtn = document.getElementById('currency-toggle-btn');
  const mobileCurrencyBtn = document.getElementById('mobile-currency-btn');
  
  const inrBadges = document.querySelectorAll('#currency-inr, #mobile-inr');
  const usdBadges = document.querySelectorAll('#currency-usd, #mobile-usd');
  const currencyBtns = [desktopCurrencyBtn, mobileCurrencyBtn];
  
  // Elements that need conversion updates
  const priceValElements = document.querySelectorAll('[data-inr][data-usd]');

  const updateCurrencyUI = (currency) => {
    currentCurrency = currency;
    
    // Toggle active classes on badges
    if (currency === 'INR') {
      inrBadges.forEach(b => b.classList.add('active'));
      usdBadges.forEach(b => b.classList.remove('active'));
      currencyBtns.forEach(btn => {
        if (btn) btn.classList.remove('usd-active');
      });
    } else {
      inrBadges.forEach(b => b.classList.remove('active'));
      usdBadges.forEach(b => b.classList.add('active'));
      currencyBtns.forEach(btn => {
        if (btn) btn.classList.add('usd-active');
      });
    }

    // Convert values
    priceValElements.forEach(elem => {
      const inrVal = elem.getAttribute('data-inr');
      const usdVal = elem.getAttribute('data-usd');
      
      // Determine if it is a major display (e.g. MOQ) or item price
      const isMoq = elem.id === 'export-moq-display';

      if (currency === 'INR') {
        // Format with commas for Indian notation
        const formattedINR = Number(inrVal).toLocaleString('en-IN');
        if (isMoq) {
          elem.textContent = `₹${formattedINR} INR`;
        } else {
          elem.textContent = `₹${formattedINR} INR`;
        }
      } else {
        const formattedUSD = Number(usdVal).toLocaleString('en-US');
        if (isMoq) {
          elem.textContent = `$${formattedUSD} USD`;
        } else {
          elem.textContent = `$${formattedUSD} USD`;
        }
      }
    });

    // Update form instruction placeholder/hint if applicable
    const formInterest = document.getElementById('form-interest');
    if (formInterest) {
      const secureNote = document.querySelector('.form-secure-note');
      if (secureNote) {
        secureNote.innerHTML = `<i class="fa-solid fa-lock"></i> Prices in catalogue will be shown in <strong>${currency}</strong> by default.`;
      }
    }
  };

  const handleCurrencyToggle = () => {
    const nextCurrency = currentCurrency === 'INR' ? 'USD' : 'INR';
    updateCurrencyUI(nextCurrency);
  };

  currencyBtns.forEach(btn => {
    if (btn) {
      btn.addEventListener('click', handleCurrencyToggle);
    }
  });

  // Check user preference or initial setup (default INR)
  updateCurrencyUI('INR');


  // ==========================================
  // 3. INTERACTION OBSERVER FOR SCROLL ANIMATIONS
  // ==========================================
  const scrollElements = document.querySelectorAll('.animate-on-scroll');

  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('visible');
  };

  const hideScrollElement = (element) => {
    element.classList.remove('visible');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };

  // Run on load and on scroll
  window.addEventListener('scroll', () => {
    handleScrollAnimation();
  });
  
  // Initial check
  setTimeout(handleScrollAnimation, 150);


  // ==========================================
  // 4. TESTIMONIALS SLIDER CAROUSEL
  // ==========================================
  const slides = document.querySelectorAll('.testimonial-slide');
  const prevBtn = document.getElementById('prev-testi');
  const nextBtn = document.getElementById('next-testi');
  const dotsContainer = document.getElementById('slider-dots-container');
  let currentSlideIndex = 0;
  let autoSlideTimer;

  if (slides.length > 0) {
    // Generate navigation dots
    slides.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });

    const dots = document.querySelectorAll('.dot');

    const updateSliderUI = () => {
      slides.forEach((slide, idx) => {
        slide.classList.remove('active');
        if (idx === currentSlideIndex) slide.classList.add('active');
      });

      dots.forEach((dot, idx) => {
        dot.classList.remove('active');
        if (idx === currentSlideIndex) dot.classList.add('active');
      });
    };

    const goToSlide = (index) => {
      currentSlideIndex = index;
      updateSliderUI();
      resetAutoSlide();
    };

    const nextSlide = () => {
      currentSlideIndex = (currentSlideIndex + 1) % slides.length;
      updateSliderUI();
    };

    const prevSlide = () => {
      currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
      updateSliderUI();
    };

    if (nextBtn) nextBtn.addEventListener('click', () => {
      nextSlide();
      resetAutoSlide();
    });

    if (prevBtn) prevBtn.addEventListener('click', () => {
      prevSlide();
      resetAutoSlide();
    });

    // Auto rotate every 8 seconds
    const startAutoSlide = () => {
      autoSlideTimer = setInterval(nextSlide, 8000);
    };

    const resetAutoSlide = () => {
      clearInterval(autoSlideTimer);
      startAutoSlide();
    };

    startAutoSlide();
  }


  // ==========================================
  // 5. INTERACTIVE LIGHTBOX GALLERY SYSTEM
  // ==========================================
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-main-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxPrevBtn = document.getElementById('lightbox-prev-btn');
  const lightboxNextBtn = document.getElementById('lightbox-next-btn');

  let currentGalleryIndex = 0;

  if (galleryItems.length > 0 && lightbox) {
    
    const openLightbox = (index) => {
      currentGalleryIndex = index;
      const item = galleryItems[index];
      const src = item.getAttribute('data-src');
      const title = item.getAttribute('data-title');
      const desc = item.getAttribute('data-desc');

      lightboxImg.setAttribute('src', src);
      lightboxImg.setAttribute('alt', title);
      lightboxTitle.textContent = title;
      lightboxDesc.textContent = desc;

      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
      lightbox.classList.remove('open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      lightboxImg.setAttribute('src', ''); // Clear src to stop loading
    };

    const showNextImage = () => {
      currentGalleryIndex = (currentGalleryIndex + 1) % galleryItems.length;
      openLightbox(currentGalleryIndex);
    };

    const showPrevImage = () => {
      currentGalleryIndex = (currentGalleryIndex - 1 + galleryItems.length) % galleryItems.length;
      openLightbox(currentGalleryIndex);
    };

    // Bind click events to gallery items
    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        openLightbox(index);
      });
    });

    // Close button click
    if (lightboxCloseBtn) {
      lightboxCloseBtn.addEventListener('click', closeLightbox);
    }

    // Prev/Next buttons
    if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', showNextImage);
    if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', showPrevImage);

    // Close on overlay click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (lightbox.classList.contains('open')) {
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') showNextImage();
        if (e.key === 'ArrowLeft') showPrevImage();
      }
    });
  }


  // ==========================================
  // 6. FORM VALIDATION & INTERACTIVE TOAST
  // ==========================================
  const catalogForm = document.getElementById('catalogue-request-form');
  const toastMessage = document.getElementById('toast-message');
  const toastTitle = document.getElementById('toast-title');
  const toastBody = document.getElementById('toast-body');

  const showToast = (title, message, isSuccess = true) => {
    if (toastMessage) {
      toastTitle.textContent = title;
      toastBody.textContent = message;
      
      const toastIcon = toastMessage.querySelector('.toast-icon i');
      if (toastIcon) {
        if (isSuccess) {
          toastMessage.style.borderLeftColor = 'var(--color-success)';
          toastIcon.className = 'fa-solid fa-circle-check';
          toastIcon.style.color = 'var(--color-success)';
        } else {
          toastMessage.style.borderLeftColor = 'var(--color-error)';
          toastIcon.className = 'fa-solid fa-circle-exclamation';
          toastIcon.style.color = 'var(--color-error)';
        }
      }

      toastMessage.classList.add('show');

      // Auto dismiss after 5 seconds
      setTimeout(() => {
        toastMessage.classList.remove('show');
      }, 5000);
    }
  };

  if (catalogForm) {
    catalogForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('form-name').value.trim();
      const contact = document.getElementById('form-contact').value.trim();
      const country = document.getElementById('form-country').value.trim();
      const interest = document.getElementById('form-interest').value;
      const quantity = document.getElementById('form-quantity').value;
      const msg = document.getElementById('form-msg').value.trim();

      // Basic front-end validation
      if (!name || !contact || !country || !interest) {
        showToast('Submission Failed', 'Please fill in all required fields.', false);
        return;
      }

      // Simulate API submission / Catalog delivery
      const submitBtn = document.getElementById('submit-catalogue-btn');
      const originalBtnText = submitBtn.innerHTML;
      
      // Loading State
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';

      setTimeout(() => {
        // Success Actions
        showToast(
          'Catalogue Requested!',
          `Thank you ${name}. The custom price list for ${interest} in ${currentCurrency} is being sent to ${contact}.`
        );

        // Reset button and form
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
        catalogForm.reset();

      }, 1500);
    });
  }

  // Category Quick Request Event Handlers (fills in form interest and scrolls down)
  const catLinks = document.querySelectorAll('.cat-link');
  catLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const selectedInterest = link.getAttribute('data-interest');
      const formInterestSelect = document.getElementById('form-interest');
      
      if (formInterestSelect && selectedInterest) {
        formInterestSelect.value = selectedInterest;
      }
    });
  });

  // Active Link Highlighting in Navigation
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentActive = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
        currentActive = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentActive}`) {
        link.classList.add('active');
      }
    });
  });

});
