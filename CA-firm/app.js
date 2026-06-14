/**
 * Rathi Biyani & Associates - Core Application Script
 * Features: Navigation, Testimonial Slider, Dynamic Compliance Calendar, Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. MOBILE MENU & NAVIGATION LOGIC
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const header = document.querySelector('.main-header');

    // Toggle menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('open');
        navMenu.classList.toggle('open');
    });

    // Close menu when clicking link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // Header scroll background change
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Intersection Observer for Active Link
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
        root: null,
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => sectionObserver.observe(section));


    // ==========================================
    // 2. PRICING SELECTOR Prefill
    // ==========================================
    const selectPlanBtns = document.querySelectorAll('.select-plan-btn');
    const serviceSelect = document.getElementById('serviceRequired');
    const businessSelect = document.getElementById('businessType');

    selectPlanBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = btn.getAttribute('data-plan');
            
            // Map plan names to option values
            if (plan.includes('Individual')) {
                serviceSelect.value = 'Income Tax Filing';
                businessSelect.value = 'Individual Salaried';
            } else if (plan.includes('Business')) {
                serviceSelect.value = 'GST Registration & Returns';
                businessSelect.value = 'Sole Proprietor';
            } else if (plan.includes('Corporate')) {
                serviceSelect.value = 'Company Registration';
                businessSelect.value = 'Private Limited';
            }
        });
    });


    // ==========================================
    // 3. COMPLIANCE CALENDAR DYNAMIC COUNTDOWN
    // ==========================================
    const tdsCountdown = document.getElementById('tds-countdown');
    const gstr1Countdown = document.getElementById('gstr1-countdown');
    const gstr3bCountdown = document.getElementById('gstr3b-countdown');
    const itrCountdown = document.getElementById('itr-countdown');

    const nextMajorDueEl = document.getElementById('next-major-due');
    const nextMajorDaysEl = document.getElementById('next-major-days');

    function calculateDaysRemaining() {
        const today = new Date();
        const currentYear = today.getFullYear();
        const currentMonth = today.getMonth(); // 0-indexed

        // Deadlines data structures
        const deadlines = [
            {
                name: 'TDS Payment',
                tag: 'TDS / TCS',
                getTargetDate: () => {
                    // Due on 7th of every month
                    let target = new Date(currentYear, currentMonth, 7);
                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    if (todayDate > target) {
                        // If 7th of this month passed, target next month's 7th
                        target = new Date(currentYear, currentMonth + 1, 7);
                    }
                    return target;
                },
                element: tdsCountdown
            },
            {
                name: 'GSTR-1 Filing',
                tag: 'GST Return',
                getTargetDate: () => {
                    // Due on 11th of every month
                    let target = new Date(currentYear, currentMonth, 11);
                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    if (todayDate > target) {
                        target = new Date(currentYear, currentMonth + 1, 11);
                    }
                    return target;
                },
                element: gstr1Countdown
            },
            {
                name: 'GSTR-3B Filing',
                tag: 'GST Return',
                getTargetDate: () => {
                    // Due on 20th of every month
                    let target = new Date(currentYear, currentMonth, 20);
                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    if (todayDate > target) {
                        target = new Date(currentYear, currentMonth + 1, 20);
                    }
                    return target;
                },
                element: gstr3bCountdown
            },
            {
                name: 'ITR Deadline',
                tag: 'Income Tax',
                getTargetDate: () => {
                    // Due on 31st July of the current year (or next year if passed)
                    let target = new Date(currentYear, 6, 31); // 6 is July
                    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                    if (todayDate > target) {
                        target = new Date(currentYear + 1, 6, 31);
                    }
                    return target;
                },
                element: itrCountdown
            }
        ];

        let minDays = Infinity;
        let nextMajorDeadline = null;

        deadlines.forEach(dl => {
            const targetDate = dl.getTargetDate();
            // Reset hours for pure date comparison
            const d1 = new Date(today.getFullYear(), today.getMonth(), today.getDate());
            const d2 = new Date(targetDate.getFullYear(), targetDate.getMonth(), targetDate.getDate());
            
            const diffTime = d2 - d1;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Format countdown string
            let countdownText = '';
            if (diffDays === 0) {
                countdownText = 'Due Today!';
            } else if (diffDays === 1) {
                countdownText = '1 day left';
            } else {
                countdownText = `${diffDays} days left`;
            }

            // Update UI element
            if (dl.element) {
                dl.element.textContent = countdownText;
                
                // Add alert styles if <= 3 days remaining
                if (diffDays <= 3) {
                    dl.element.style.color = '#dc2626';
                    dl.element.style.fontWeight = '700';
                } else {
                    dl.element.style.color = '';
                    dl.element.style.fontWeight = '';
                }
            }

            // Track next major
            if (diffDays < minDays) {
                minDays = diffDays;
                nextMajorDeadline = dl;
            }
        });

        // Update main dashboard panel
        if (nextMajorDeadline) {
            nextMajorDueEl.textContent = `${nextMajorDeadline.name} (${nextMajorDeadline.tag})`;
            
            if (minDays === 0) {
                nextMajorDaysEl.textContent = 'TODAY';
                nextMajorDaysEl.style.color = '#dc2626';
            } else {
                nextMajorDaysEl.textContent = `${minDays} Days`;
                if (minDays <= 3) {
                    nextMajorDaysEl.style.color = '#dc2626';
                } else {
                    nextMajorDaysEl.style.color = '';
                }
            }
        }
    }

    calculateDaysRemaining();


    // ==========================================
    // 4. TESTIMONIAL SLIDER CAROUSEL
    // ==========================================
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.slider-dots .dot');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    let currentSlide = 0;
    let autoSlideInterval;

    function showSlide(index) {
        // Range check
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Reset classes
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Activate current
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 6000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Handlers
    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(currentSlide + 1);
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        showSlide(currentSlide - 1);
        startAutoSlide();
    });

    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            stopAutoSlide();
            showSlide(idx);
            startAutoSlide();
        });
    });

    // Start auto slide on init
    startAutoSlide();


    // ==========================================
    // 5. ENQUIRY FORM VALIDATION & LEAD SUBMIT
    // ==========================================
    const form = document.getElementById('enquiryForm');
    const nameInput = document.getElementById('fullName');
    const phoneInput = document.getElementById('phoneNumber');
    const serviceInput = document.getElementById('serviceRequired');
    
    const nameError = document.getElementById('nameError');
    const phoneError = document.getElementById('phoneError');
    const serviceError = document.getElementById('serviceError');

    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('formSpinner');
    const formSuccessState = document.getElementById('formSuccessState');
    const resetFormBtn = document.getElementById('resetFormBtn');

    // Phone format validation (10 digits starting with 6-9)
    const phoneRegex = /^[6-9]\d{9}$/;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;

        // 1. Validate name
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('invalid');
            nameError.style.display = 'block';
            isValid = false;
        } else {
            nameInput.classList.remove('invalid');
            nameError.style.display = 'none';
        }

        // 2. Validate phone number
        if (!phoneRegex.test(phoneInput.value.trim())) {
            phoneInput.classList.add('invalid');
            phoneError.style.display = 'block';
            isValid = false;
        } else {
            phoneInput.classList.remove('invalid');
            phoneError.style.display = 'none';
        }

        // 3. Validate service required
        if (serviceInput.value === '') {
            serviceInput.classList.add('invalid');
            serviceError.style.display = 'block';
            isValid = false;
        } else {
            serviceInput.classList.remove('invalid');
            serviceError.style.display = 'none';
        }

        // If form is valid, submit
        if (isValid) {
            // Disable button and show spinner
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.8';
            spinner.style.display = 'inline-block';
            
            // Gather form data
            const leadData = {
                name: nameInput.value.trim(),
                phone: phoneInput.value.trim(),
                service: serviceInput.value,
                businessType: document.getElementById('businessType').value,
                turnover: document.getElementById('annualTurnover').value,
                message: document.getElementById('message').value.trim(),
                submittedAt: new Date().toISOString()
            };

            // Simulate server-side API request
            setTimeout(() => {
                // Store in local storage as a lead database simulation
                let currentLeads = JSON.parse(localStorage.getItem('ca_leads')) || [];
                currentLeads.push(leadData);
                localStorage.setItem('ca_leads', JSON.stringify(currentLeads));

                // Reset button states
                submitBtn.disabled = false;
                submitBtn.style.opacity = '';
                spinner.style.display = 'none';

                // Transition to success card
                form.style.display = 'none';
                formSuccessState.style.display = 'flex';
            }, 1500);
        }
    });

    // Reset Form to submit another enquiry
    resetFormBtn.addEventListener('click', () => {
        form.reset();
        formSuccessState.style.display = 'none';
        form.style.display = 'block';
        
        // Remove validation error classes
        nameInput.classList.remove('invalid');
        phoneInput.classList.remove('invalid');
        serviceInput.classList.remove('invalid');
    });

    // Real-time input corrections (only digits in phone number)
    phoneInput.addEventListener('input', () => {
        phoneInput.value = phoneInput.value.replace(/\D/g, '');
        if (phoneInput.value.length > 10) {
            phoneInput.value = phoneInput.value.slice(0, 10);
        }
    });
});
