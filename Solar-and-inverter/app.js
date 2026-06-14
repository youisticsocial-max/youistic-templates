/**
 * MG Solar Solution - Core Javascript Logic (Multi-page Edition)
 * Handles interactive calculators, tab switching, form submissions, toasts, 3D tilts, and dynamic nav highlights.
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // --- Dynamic Navbar Link Highlighting ---
  const currentPath = window.location.pathname;
  const currentPage = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // --- Sticky Header Scroll Behavior ---
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('sticky-active');
      } else {
        header.classList.remove('sticky-active');
      }
    });
  }

  // --- Mobile Navigation Drawer Menu ---
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const linksInsideMenu = navMenu.querySelectorAll('.nav-link');
    linksInsideMenu.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });
  }

  // --- Sizing Calculations Helper ---
  function getSubsidy(kw) {
    if (kw === 1) return 30000;
    if (kw === 2) return 60000;
    if (kw >= 3) return 78000;
    return 0;
  }

  function formatIndianCurrency(num) {
    return '₹' + num.toLocaleString('en-IN');
  }

  // Number animation wrapper
  function animateNumberUpdate(element, targetValue, isCurrency = false) {
    if (!element) return;
    const startValue = parseInt(element.textContent.replace(/[^\d]/g, '')) || 0;
    const duration = 400; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress * (2 - progress); // Ease out quad
      const currentValue = Math.floor(startValue + (targetValue - startValue) * ease);

      element.textContent = isCurrency ? formatIndianCurrency(currentValue) : currentValue.toLocaleString('en-IN');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }
    requestAnimationFrame(update);
  }

  // --- Calculator Engine 1: Sizing by kW ---
  const sliderKw = document.getElementById('sliderKw');
  const badgeKw = document.getElementById('badgeKw');
  const valCostKw = document.getElementById('valCostKw');
  const valStrikeCostKw = document.getElementById('valStrikeCostKw');
  const valSubsidyKw = document.getElementById('valSubsidyKw');
  const valNetCostKw = document.getElementById('valNetCostKw');
  const valSavingsKw = document.getElementById('valSavingsKw');
  const valCo2Kw = document.getElementById('valCo2Kw');

  function calculateByKw() {
    if (!sliderKw) return;
    const kw = parseInt(sliderKw.value);
    if (badgeKw) badgeKw.textContent = `${kw} kW`;

    const totalCost = kw * 70000;
    const subsidy = getSubsidy(kw);
    const netCost = totalCost - subsidy;
    const annualSavings = kw * 12000;
    const co2Offset = (kw * 1.2).toFixed(1);

    animateNumberUpdate(valCostKw, totalCost, true);
    animateNumberUpdate(valStrikeCostKw, totalCost, true);
    animateNumberUpdate(valSubsidyKw, subsidy, true);
    animateNumberUpdate(valNetCostKw, netCost, true);
    animateNumberUpdate(valSavingsKw, annualSavings, true);
    if (valCo2Kw) valCo2Kw.textContent = `${co2Offset} Tons`;
  }

  if (sliderKw) {
    sliderKw.addEventListener('input', calculateByKw);
    calculateByKw(); // Init
  }

  // --- Calculator Engine 2: Sizing by Monthly Bill ---
  const sliderBill = document.getElementById('sliderBill');
  const badgeBill = document.getElementById('badgeBill');
  const valRecKw = document.getElementById('valRecKw');
  const valCostBill = document.getElementById('valCostBill');
  const valStrikeCostBill = document.getElementById('valStrikeCostBill');
  const valSubsidyBill = document.getElementById('valSubsidyBill');
  const valNetCostBill = document.getElementById('valNetCostBill');
  const valSavingsBill = document.getElementById('valSavingsBill');

  function calculateByBill() {
    if (!sliderBill) return;
    const bill = parseInt(sliderBill.value);
    if (badgeBill) badgeBill.textContent = formatIndianCurrency(bill);

    let recKw = Math.ceil(bill / 1000);
    if (recKw < 1) recKw = 1;
    if (recKw > 10) recKw = 10;

    if (valRecKw) valRecKw.textContent = `${recKw} kW`;

    const totalCost = recKw * 70000;
    const subsidy = getSubsidy(recKw);
    const netCost = totalCost - subsidy;
    const annualSavings = recKw * 12000;

    animateNumberUpdate(valCostBill, totalCost, true);
    animateNumberUpdate(valStrikeCostBill, totalCost, true);
    animateNumberUpdate(valSubsidyBill, subsidy, true);
    animateNumberUpdate(valNetCostBill, netCost, true);
    animateNumberUpdate(valSavingsBill, annualSavings, true);
  }

  if (sliderBill) {
    sliderBill.addEventListener('input', calculateByBill);
    calculateByBill(); // Init
  }

  // --- Calculator Tabs Switcher ---
  const tabBtns = document.querySelectorAll('.calc-tab-btn');
  const tabContents = document.querySelectorAll('.calc-tab-content');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabContents.forEach(c => c.classList.remove('active'));

      btn.classList.add('active');
      const activeContent = document.getElementById(targetTab);
      if (activeContent) {
        activeContent.classList.add('active');
        if (targetTab === 'kw-tab') {
          calculateByKw();
        } else if (targetTab === 'bill-tab') {
          calculateByBill();
        }
      }
    });
  });

  // --- Subsidy Tiers Progress Bars Scroll Animation ---
  const subsidyBars = document.querySelectorAll('.chart-bar-inner');
  const chartContainer = document.querySelector('.subsidy-visual-card');

  if (chartContainer && subsidyBars.length > 0) {
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          subsidyBars.forEach(bar => {
            const targetWidth = bar.getAttribute('data-width');
            bar.style.width = targetWidth;
          });
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    chartObserver.observe(chartContainer);
  }

  // --- Enquiry Lead Form & Toast Alerts ---
  const enquiryForm = document.getElementById('enquiryForm');
  const toastContainer = document.getElementById('toastContainer');

  if (enquiryForm) {
    enquiryForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('eqName').value.trim();
      const phone = document.getElementById('eqPhone').value.trim();

      if (!name || !phone) {
        showToast('Please fill out Name and Phone fields.', true);
        return;
      }

      if (phone.length < 10) {
        showToast('Please enter a valid 10-digit mobile number.', true);
        return;
      }

      showToast(`Thank you, ${name}! Your survey request has been received. Our team will contact you shortly.`);
      enquiryForm.reset();
    });
  }

  function showToast(message, isError = false) {
    if (!toastContainer) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    if (isError) {
      toast.classList.add('error');
    }
    
    const icon = isError 
      ? '<span style="font-weight:bold;color:#f43f5e;">✕ &nbsp;</span>' 
      : '<span style="font-weight:bold;color:var(--color-neon);">✓ &nbsp;</span>';

    toast.innerHTML = `
      <div style="display:flex;align-items:center;">
        ${icon}
        <span>${message}</span>
      </div>
      <span class="toast-close">✕</span>
    `;

    // Close on toast x click
    toast.querySelector('.toast-close').addEventListener('click', () => {
      toast.remove();
    });

    toastContainer.appendChild(toast);
    
    // Auto remove
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 4500);
  }

  // --- Premium 3D Hover Tilt Listeners ---
  const cards3d = document.querySelectorAll('.product-card, .why-card, .contact-card, .card-tilt-effect');
  
  cards3d.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const width = rect.width;
      const height = rect.height;
      
      const tiltX = ((y / height) - 0.5) * -6; // safe subtle tilt
      const tiltY = ((x / width) - 0.5) * 6;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
});
