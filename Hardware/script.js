/**
 * Banshidar Phoolchand - Script Layer
 * Handling responsive UI interactions, form validations, WhatsApp pre-fills, and store status.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // 1. SCROLL-LINKED HEADER & ACTIVE NAV
  // ==========================================
  const header = document.getElementById('main-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    // Header shrinking effect
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Dynamic active links highlight
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.pageYOffset >= (sectionTop - 120)) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').slice(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // ==========================================
  // 2. MOBILE MENU TOGGLE
  // ==========================================
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const navMenu = document.getElementById('nav-menu');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    // Rotate/transform hamburger bar lines
    mobileToggle.classList.toggle('active');
    
    // Quick toggle animation details
    const spans = mobileToggle.querySelectorAll('span');
    if (mobileToggle.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      mobileToggle.classList.remove('active');
      mobileToggle.querySelectorAll('span').forEach(s => s.style.transform = 'none');
      mobileToggle.querySelectorAll('span')[1].style.opacity = '1';
    });
  });

  // ==========================================
  // 3. GST NUMBER COPY-TO-CLIPBOARD
  // ==========================================
  const gstBadge = document.getElementById('gst-num-copy');
  
  if (gstBadge) {
    gstBadge.addEventListener('click', () => {
      const gstNumEl = gstBadge.querySelector('.enquiry-gst-num');
      const textToCopy = gstNumEl ? gstNumEl.innerText.trim() : "08AAKPD6424F1ZW";
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = gstBadge.innerHTML;
        gstBadge.innerHTML = `<span class="enquiry-gst-text" style="color: var(--success-color)">COPIED TO CLIPBOARD!</span><span class="enquiry-gst-num" style="color: var(--success-color)">${textToCopy}</span>`;
        
        setTimeout(() => {
          gstBadge.innerHTML = originalHtml;
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });
  }

  // ==========================================
  // 4. LIVE STORE HOURS STATUS CHECKER
  // ==========================================
  function updateStoreStatus() {
    const statusBadge = document.getElementById('store-status-badge');
    const statusText = document.getElementById('store-status-text');

    if (!statusBadge || !statusText) return;

    // Jodhpur is in India Standard Time (IST): UTC+5:30
    // Get current time in UTC, convert to Jodhpur Time (IST)
    const nowUtc = new Date();
    const utcOffset = nowUtc.getTime() + (nowUtc.getTimezoneOffset() * 60000);
    const jodhpurOffset = 5.5; // IST is UTC + 5.5 hours
    const jodhpurTime = new Date(utcOffset + (3600000 * jodhpurOffset));

    const day = jodhpurTime.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const hours = jodhpurTime.getHours();
    const minutes = jodhpurTime.getMinutes();
    const timeValue = hours + (minutes / 60);

    let isOpen = false;
    let closingTime = "";
    let nextOpeningTime = "";

    if (day >= 1 && day <= 6) { // Mon - Sat (8 AM to 8 PM)
      if (timeValue >= 8 && timeValue < 20) {
        isOpen = true;
        closingTime = "8:00 PM";
      } else {
        isOpen = false;
        if (timeValue < 8) {
          nextOpeningTime = "Today at 8:00 AM";
        } else if (day === 6) {
          nextOpeningTime = "Sunday at 10:00 AM";
        } else {
          nextOpeningTime = "Tomorrow at 8:00 AM";
        }
      }
    } else { // Sunday (10 AM to 4 PM)
      if (timeValue >= 10 && timeValue < 16) {
        isOpen = true;
        closingTime = "4:00 PM";
      } else {
        isOpen = false;
        nextOpeningTime = "Monday at 8:00 AM";
      }
    }

    // Update Badge styling and status text
    if (isOpen) {
      statusBadge.className = "status-badge status-open";
      statusText.innerHTML = `OPEN NOW &bull; Closes at ${closingTime}`;
    } else {
      statusBadge.className = "status-badge status-closed";
      statusText.innerHTML = `CLOSED NOW &bull; Opens ${nextOpeningTime}`;
    }
  }

  // Initial check and set interval for dynamic update
  updateStoreStatus();
  setInterval(updateStoreStatus, 60000); // Check status every minute

  // ==========================================
  // 5. ENQUIRY FORM SUBMISSION & WHATSAPP
  // ==========================================
  const enquiryForm = document.getElementById('material-enquiry-form');
  const eqFeedback = document.getElementById('eq-form-feedback');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('eq-name').value.trim();
      const phone = document.getElementById('eq-phone').value.trim();
      const product = document.getElementById('eq-product').value;
      const qty = document.getElementById('eq-qty').value.trim();
      const message = document.getElementById('eq-message').value.trim();

      // Mobile Validation (must be 10 digits for Indian standard)
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        showFeedback(eqFeedback, 'Please enter a valid 10-digit Indian mobile number starting with 6-9.', 'error');
        return;
      }

      showFeedback(eqFeedback, 'Processing your enquiry...', 'success');

      // Build WhatsApp prefilled message
      const wpBase = "https://wa.me/919828832182";
      let wpText = `Hello Banshidar Phoolchand, I have a material inquiry:\n\n` +
                   `*Name:* ${name}\n` +
                   `*Phone:* ${phone}\n` +
                   `*Category:* ${product}\n` +
                   `*Quantity:* ${qty}`;
      
      if (message) {
        wpText += `\n*Details/Site:* ${message}`;
      }

      const wpUrl = `${wpBase}?text=${encodeURIComponent(wpText)}`;

      // Simulate successful local capture then redirect
      setTimeout(() => {
        showFeedback(eqFeedback, 'Enquiry generated successfully! Redirecting you to WhatsApp for immediate quote...', 'success');
        setTimeout(() => {
          window.open(wpUrl, '_blank');
          enquiryForm.reset();
          eqFeedback.style.display = 'none';
        }, 1500);
      }, 1000);
    });
  }

  // ==========================================
  // 6. B2B INSTANT ENQUIRY FORM (ON-PAGE)
  // ==========================================
  const b2bForm = document.getElementById('b2b-quote-form');
  const b2bFeedback = document.getElementById('b2b-form-feedback');

  if (b2bForm) {
    b2bForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const company = document.getElementById('b2b-company').value.trim();
      const phone = document.getElementById('b2b-phone').value.trim();
      const material = document.getElementById('b2b-material').value.trim();

      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        showFeedback(b2bFeedback, 'Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      showFeedback(b2bFeedback, 'Formatting wholesale request...', 'success');

      // WhatsApp text builder for commercial request
      const wpBase = "https://wa.me/919828832182";
      const wpText = `Hello, this is a Wholesale B2B Quote request:\n\n` +
                     `*Company Name:* ${company}\n` +
                     `*Contact Phone:* ${phone}\n` +
                     `*Materials & Tonnage:* ${material}`;

      const wpUrl = `${wpBase}?text=${encodeURIComponent(wpText)}`;

      setTimeout(() => {
        showFeedback(b2bFeedback, 'Wholesale Request Ready! Launching WhatsApp connection...', 'success');
        setTimeout(() => {
          window.open(wpUrl, '_blank');
          b2bForm.reset();
          b2bFeedback.style.display = 'none';
        }, 1500);
      }, 1000);
    });
  }

  // ==========================================
  // 7. B2B CONTRACTOR MODAL DIALOGS
  // ==========================================
  const modal = document.getElementById('b2b-modal');
  const openModalBtn = document.getElementById('register-trade-partner-btn');
  const closeModalBtn = document.getElementById('b2b-modal-close');
  const modalForm = document.getElementById('b2b-modal-form');
  const modalFeedback = document.getElementById('modal-form-feedback');

  if (openModalBtn && modal) {
    openModalBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop background scrolling
    });
  }

  if (closeModalBtn && modal) {
    closeModalBtn.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      modalForm.reset();
      modalFeedback.style.display = 'none';
    });
  }

  // Close modal when clicking outside form box
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      modalForm.reset();
      modalFeedback.style.display = 'none';
    }
  });

  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const company = document.getElementById('modal-company').value.trim();
      const contact = document.getElementById('modal-contact').value.trim();
      const phone = document.getElementById('modal-phone').value.trim();
      const email = document.getElementById('modal-email').value.trim();
      const gst = document.getElementById('modal-gst').value.trim();

      const phoneRegex = /^[6-9]\d{9}$/;
      if (!phoneRegex.test(phone)) {
        showFeedback(modalFeedback, 'Please enter a valid 10-digit mobile number.', 'error');
        return;
      }

      showFeedback(modalFeedback, 'Registering partner details...', 'success');

      // WhatsApp text builder for builder partnership request
      const wpBase = "https://wa.me/919828832182";
      let wpText = `Hello Banshidar Phoolchand, I want to register as a B2B Trade Partner:\n\n` +
                   `*Company:* ${company}\n` +
                   `*Contact Person:* ${contact}\n` +
                   `*Phone:* ${phone}\n` +
                   `*Email:* ${email}`;
      
      if (gst) {
        wpText += `\n*GSTIN:* ${gst}`;
      }

      const wpUrl = `${wpBase}?text=${encodeURIComponent(wpText)}`;

      setTimeout(() => {
        showFeedback(modalFeedback, 'Registration formulated! Connecting to B2B priority channel...', 'success');
        setTimeout(() => {
          window.open(wpUrl, '_blank');
          modal.classList.remove('active');
          document.body.style.overflow = '';
          modalForm.reset();
          modalFeedback.style.display = 'none';
        }, 1500);
      }, 1000);
    });
  }

  // ==========================================
  // 8. PRODUCT WHATSAPP DYNAMIC LINKS
  // ==========================================
  const productWhatsappButtons = document.querySelectorAll('.whatsapp-inquiry-btn');
  
  productWhatsappButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const productName = btn.getAttribute('data-product');
      const wpBase = "https://wa.me/919828832182";
      const wpText = `Hello Banshidar Phoolchand, I am looking for the best price for:\n` +
                     `*Product:* ${productName}\n\n` +
                     `Please share availability and wholesale quotes.`;

      const wpUrl = `${wpBase}?text=${encodeURIComponent(wpText)}`;
      window.open(wpUrl, '_blank');
    });
  });

  // Helper function to display form error/success feedbacks
  function showFeedback(element, message, type) {
    element.innerText = message;
    element.className = `form-feedback ${type}`;
    element.style.display = 'block';
  }

});
