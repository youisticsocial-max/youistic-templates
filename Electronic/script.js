document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect & Active Link
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Navbar bg
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active Link
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if(targetElement) {
                // Close mobile menu if open
                const mobileMenu = document.getElementById('mobileMenu');
                if (mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 2. Mobile Menu
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');

    if (mobileMenuBtn && closeMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.add('active');
        });

        closeMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    }

    // 3. Cinematic Scroll Reveals (IntersectionObserver)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    // 4. Countdown Timer
    const countdownTimer = document.getElementById('countdownTimer');
    if (countdownTimer) {
        const targetDate = new Date();
        targetDate.setDate(targetDate.getDate() + 3);
        
        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = targetDate.getTime() - now;
            
            if (distance < 0) return;
            
            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const mins = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const secs = Math.floor((distance % (1000 * 60)) / 1000);
            
            const dayEl = countdownTimer.querySelector('.days');
            const hourEl = countdownTimer.querySelector('.hours');
            const minEl = countdownTimer.querySelector('.mins');
            const secEl = countdownTimer.querySelector('.secs');

            if(dayEl) dayEl.innerText = days.toString().padStart(2, '0');
            if(hourEl) hourEl.innerText = hours.toString().padStart(2, '0');
            if(minEl) minEl.innerText = mins.toString().padStart(2, '0');
            if(secEl) secEl.innerText = secs.toString().padStart(2, '0');
        };
        
        setInterval(updateCountdown, 1000);
        updateCountdown();
    }

    // 5. Budget Slider
    const budgetRange = document.getElementById('budgetRange');
    const budgetValue = document.getElementById('budgetValue');
    
    if(budgetRange && budgetValue) {
        budgetRange.addEventListener('input', (e) => {
            const val = parseInt(e.target.value);
            budgetValue.innerText = '₹' + val.toLocaleString('en-IN');
        });
    }

    // 6. Carousel Navigation
    const productCarousel = document.getElementById('productCarousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (productCarousel && prevBtn && nextBtn) {
        nextBtn.addEventListener('click', () => {
            productCarousel.scrollBy({ left: 350, behavior: 'smooth' });
        });
        prevBtn.addEventListener('click', () => {
            productCarousel.scrollBy({ left: -350, behavior: 'smooth' });
        });
    }

    // 7. Modal Logic
    const quickViewBtns = document.querySelectorAll('.quick-view-btn');
    const modalOverlay = document.getElementById('quickViewModal');
    const closeModalBtn = document.getElementById('closeModal');

    quickViewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modalOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if(closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    if(modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if(e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // 8. Set Current Year
    const yearElem = document.getElementById('currentYear');
    if (yearElem) {
        yearElem.innerText = new Date().getFullYear();
    }
});
