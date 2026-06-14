/**
 * Parasvnath Interio - Interactive JavaScript Handler
 */

document.addEventListener('DOMContentLoaded', () => {

    // ==========================================
    // 1. Mobile Navigation Toggle
    // ==========================================
    const mobileNavToggle = document.getElementById('mobileNavToggle');
    const navLinks = document.getElementById('navLinks');
    const navItems = navLinks.querySelectorAll('a');

    mobileNavToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileNavToggle.classList.toggle('active');
        
        // Animated icon transitions
        const bars = mobileNavToggle.querySelectorAll('.bar');
        if (mobileNavToggle.classList.contains('active')) {
            bars[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
        } else {
            bars[0].style.transform = 'none';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'none';
        }
    });

    // Close mobile menu when link is clicked
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileNavToggle.classList.remove('active');
                const bars = mobileNavToggle.querySelectorAll('.bar');
                bars[0].style.transform = 'none';
                bars[1].style.opacity = '1';
                bars[2].style.transform = 'none';
            }
        });
    });

    // ==========================================
    // 2. Active Link on Scroll (Scroll Spy)
    // ==========================================
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 120; // offset

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href') === `#${current}`) {
                a.classList.add('active');
            }
        });
    });

    // ==========================================
    // 3. Tab Switching Logic (Product Range & Materials)
    // ==========================================
    function setupTabs(navId, contentClass, activeClass = 'active') {
        const navContainer = document.getElementById(navId);
        if (!navContainer) return;

        const tabButtons = navContainer.querySelectorAll('button');

        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active classes
                tabButtons.forEach(btn => btn.classList.remove(activeClass));
                const siblings = button.parentElement.parentElement.querySelectorAll(`.${contentClass}`);
                siblings.forEach(pane => pane.classList.remove(activeClass));

                // Add active classes
                button.classList.add(activeClass);
                const targetId = button.getAttribute('data-target');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add(activeClass);
                }
            });
        });
    }

    setupTabs('productTabs', 'tab-pane');
    setupTabs('materialTabs', 'swatch-panel');

    // ==========================================
    // 4. Interactive EMI Calculator
    // ==========================================
    const emiBudget = document.getElementById('emiBudget');
    const budgetValue = document.getElementById('budgetValue');
    const tenureSelect = document.getElementById('tenureSelect');
    const emiAmount = document.getElementById('emiAmount');

    if (emiBudget && tenureSelect && emiAmount) {
        let currentTenure = 12; // default 12 months
        const annualInterestRate = 9.5; // 9.5% premium interest rate

        // Format number to Indian Currency string format
        function formatINR(number) {
            return new Intl.NumberFormat('en-IN', {
                style: 'currency',
                currency: 'INR',
                maximumFractionDigits: 0
            }).format(number);
        }

        function calculateEMI() {
            const principal = parseFloat(emiBudget.value);
            const monthlyInterest = (annualInterestRate / 100) / 12;
            const numberOfMonths = currentTenure;

            // Compounding EMI Formula: E = [P x r x (1+r)^n]/[((1+r)^n)-1]
            const temp = Math.pow(1 + monthlyInterest, numberOfMonths);
            const emi = (principal * monthlyInterest * temp) / (temp - 1);
            
            emiAmount.textContent = `${formatINR(Math.round(emi))}/mo`;
        }

        // Budget Slider Update
        emiBudget.addEventListener('input', (e) => {
            budgetValue.textContent = formatINR(e.target.value);
            calculateEMI();
        });

        // Tenure Button Selection
        const tenureBtns = tenureSelect.querySelectorAll('.tenure-btn');
        tenureBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                tenureBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentTenure = parseInt(btn.getAttribute('data-months'));
                calculateEMI();
            });
        });

        // Initialize Calculator
        budgetValue.textContent = formatINR(emiBudget.value);
        calculateEMI();
    }

    // ==========================================
    // 5. Portfolio Gallery Lightbox with Filter
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('galleryLightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let activeItems = [...galleryItems]; // holds currently filtered items
    let currentImageIndex = 0;

    // Filter Logic
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');
            activeItems = [];

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    activeItems.push(item);
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // Lightbox Open
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            currentImageIndex = activeItems.indexOf(item);
            if (currentImageIndex === -1) currentImageIndex = 0;
            openLightbox();
        });
    });

    function openLightbox() {
        if (activeItems.length === 0) return;
        const currentItem = activeItems[currentImageIndex];
        const img = currentItem.querySelector('img');
        const spanCat = currentItem.querySelector('.overlay-info span').textContent;
        const h4Title = currentItem.querySelector('.overlay-info h4').textContent;

        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightboxCaption.querySelector('.caption-cat').textContent = spanCat;
        lightboxCaption.querySelector('.caption-title').textContent = h4Title;

        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
    }

    // Close Lightbox
    function closeLightbox() {
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }

    lightboxClose.addEventListener('click', closeLightbox);
    
    // Close on clicking backdrop overlay
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation (Esc to close, Arrow keys to navigate)
    document.addEventListener('keydown', (e) => {
        if (lightbox.getAttribute('aria-hidden') === 'false') {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowRight') showNextImage();
            if (e.key === 'ArrowLeft') showPrevImage();
        }
    });

    // Nav buttons
    function showNextImage() {
        if (activeItems.length <= 1) return;
        currentImageIndex = (currentImageIndex + 1) % activeItems.length;
        openLightbox();
    }

    function showPrevImage() {
        if (activeItems.length <= 1) return;
        currentImageIndex = (currentImageIndex - 1 + activeItems.length) % activeItems.length;
        openLightbox();
    }

    lightboxNext.addEventListener('click', showNextImage);
    lightboxPrev.addEventListener('click', showPrevImage);

    // ==========================================
    // 6. Auto Sliding Testimonials Carousel
    // ==========================================
    const testimonialsSlider = document.getElementById('testimonialsSlider');
    const dots = document.querySelectorAll('.slider-dots .dot');
    let activeTestimonialIndex = 0;
    let autoSlideInterval;

    function showTestimonial(index) {
        if (!testimonialsSlider) return;
        activeTestimonialIndex = index;
        testimonialsSlider.style.transform = `translateX(-${index * 100}%)`;
        
        // Update dots styling
        dots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            let nextIndex = (activeTestimonialIndex + 1) % dots.length;
            showTestimonial(nextIndex);
        }, 5000);
    }

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        startAutoSlide();
    }

    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-index'));
            showTestimonial(index);
            resetAutoSlide();
        });
    });

    // Start auto slide if testimonials exist
    if (testimonialsSlider && dots.length > 0) {
        startAutoSlide();
    }

    // ==========================================
    // 7. Lead Form Validation & Success Modal
    // ==========================================
    const leadForm = document.getElementById('leadForm');
    const successOverlay = document.getElementById('successOverlay');
    const successName = document.getElementById('successName');
    const successPhone = document.getElementById('successPhone');
    const successDate = document.getElementById('successDate');
    const successCloseBtn = document.getElementById('successCloseBtn');

    // Set minimum date to today for Preferred Design Date field
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
    }

    if (leadForm && successOverlay) {
        leadForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('userName').value.trim();
            const phone = document.getElementById('userPhone').value.trim();
            const dateVal = document.getElementById('preferredDate').value;
            
            // Basic validation check
            if (name.length === 0 || phone.length !== 10) {
                alert('Please enter a valid Name and a 10-digit Phone Number.');
                return;
            }

            // Save lead details locally as simulated backend database
            const leadData = {
                name,
                phone,
                layout: document.getElementById('kitchenType').value,
                budget: document.getElementById('budgetRange').value,
                date: dateVal,
                timestamp: new Date().toISOString()
            };
            
            const existingLeads = JSON.parse(localStorage.getItem('parasvnath_leads') || '[]');
            existingLeads.push(leadData);
            localStorage.setItem('parasvnath_leads', JSON.stringify(existingLeads));

            // Format date for success screen (e.g. June 12, 2026)
            const options = { year: 'numeric', month: 'long', day: 'numeric' };
            const formattedDate = new Date(dateVal).toLocaleDateString('en-US', options);

            // Populate success screen details
            successName.textContent = name;
            successPhone.textContent = phone;
            successDate.textContent = formattedDate;

            // Show success screen
            successOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            // Clear form inputs
            leadForm.reset();
        });

        // Close Success Overlay
        successCloseBtn.addEventListener('click', () => {
            successOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
        });

        // Close on clicking backdrop overlay
        successOverlay.addEventListener('click', (e) => {
            if (e.target === successOverlay) {
                successOverlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
            }
        });
    }

});
