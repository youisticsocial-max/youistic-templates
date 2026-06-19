document.addEventListener('DOMContentLoaded', () => {
    
    // --- 0. DYNAMIC CONTENT LOAD FROM DATABASE ---
    function loadDynamicWebsiteContent() {
        const db = JSON.parse(localStorage.getItem('adv_chambers_db'));
        if (!db) return; // DB doesn't exist yet, fallback to static html values

        // A. Update Top bar phone (keeps the SVG icon)
        const topPhone = document.getElementById('dyn-top-phone');
        if (topPhone && db.contacts.phone) {
            topPhone.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="top-icon"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                Contact: ${db.contacts.phone}
            `;
        }

        // B. Update Hero Slide 1 Banner text
        const heroTitle = document.getElementById('dyn-hero-title');
        const heroSubtitle = document.getElementById('dyn-hero-subtitle');
        if (heroTitle && db.content.heroTitle) heroTitle.textContent = db.content.heroTitle;
        if (heroSubtitle && db.content.heroSubtitle) heroSubtitle.textContent = db.content.heroSubtitle;

        // C. Update About Chambers profile text
        const aboutBody = document.getElementById('dyn-about-body');
        if (aboutBody && db.content.aboutText) {
            aboutBody.innerHTML = db.content.aboutText; // Support bold/italic tags
        }

        // D. Update coordinates details
        const coordAddress = document.getElementById('dyn-coord-address');
        const coordPhone = document.getElementById('dyn-coord-phone');
        const coordEmail = document.getElementById('dyn-coord-email');
        const coordMapBtn = document.getElementById('dyn-coord-map-btn');

        if (coordAddress && db.contacts.address) coordAddress.textContent = db.contacts.address;
        if (coordPhone && db.contacts.phone) coordPhone.textContent = db.contacts.phone;
        if (coordEmail && db.contacts.email) coordEmail.textContent = db.contacts.email;
        if (coordMapBtn && db.contacts.mapsLink) coordMapBtn.href = db.contacts.mapsLink;

        // E. Render Public Photo Gallery
        const galleryGrid = document.getElementById('dyn-gallery-grid');
        const gallerySection = document.getElementById('gallery-pub');
        if (galleryGrid) {
            if (!db.gallery || db.gallery.length === 0) {
                // If admin cleared the gallery, hide the section entirely
                if (gallerySection) gallerySection.style.display = 'none';
            } else {
                if (gallerySection) gallerySection.style.display = 'block';
                galleryGrid.innerHTML = db.gallery.map(item => `
                    <div class="gallery-card">
                        <div class="gallery-img-box">
                            <img src="${item.src}" alt="${item.caption}">
                        </div>
                        <div class="gallery-info">
                            <p>${item.caption}</p>
                        </div>
                    </div>
                `).join('');
            }
        }

        // F. Render Footer Dynamic Links
        const footerLinksContainer = document.getElementById('dyn-footer-links-container');
        if (footerLinksContainer) {
            if (!db.links || db.links.length === 0) {
                footerLinksContainer.style.display = 'none';
            } else {
                footerLinksContainer.style.display = 'flex';
                footerLinksContainer.innerHTML = `
                    <h4>Useful Links</h4>
                    ${db.links.map(link => `
                        <a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.title}</a>
                    `).join('')}
                `;
            }
        }
    }

    // Call dynamic load
    loadDynamicWebsiteContent();


    // 1. BCI Disclaimer Modal Logic
    const disclaimerModal = document.getElementById('bci-disclaimer-modal');
    const acceptDisclaimerBtn = document.getElementById('accept-disclaimer-btn');

    const isDisclaimerAccepted = localStorage.getItem('bci_disclaimer_accepted');

    if (!isDisclaimerAccepted) {
        if (disclaimerModal) disclaimerModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    } else {
        if (disclaimerModal) disclaimerModal.classList.add('hidden');
    }

    acceptDisclaimerBtn?.addEventListener('click', () => {
        localStorage.setItem('bci_disclaimer_accepted', 'true');
        disclaimerModal.classList.add('hidden');
        document.body.style.overflow = 'auto'; 
    });

    // 2. Mobile Menu Navigation Drawer
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link, .nav-btn-mobile');

    mobileToggle?.addEventListener('click', () => {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileToggle?.classList.remove('active');
            navMenu?.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });

    // 3. Hero Carousel Slider Logic
    const slides = document.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prev-slide');
    const nextBtn = document.getElementById('next-slide');
    const indicators = document.querySelectorAll('.indicator-dot');
    
    let currentSlide = 0;
    let slideInterval = setInterval(nextSlide, 6000); // Auto change every 6 seconds

    function showSlide(index) {
        if (slides.length === 0) return;
        // Reset slide indices
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        // Update slides classes
        slides.forEach(slide => slide.classList.remove('active'));
        slides[currentSlide].classList.add('active');

        // Update dots classes
        indicators.forEach(dot => dot.classList.remove('active'));
        indicators[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Reset interval helper so clicking control pauses automatic cycling temporarily
    function resetSlideTimer() {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 6000);
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetSlideTimer();
        });

        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetSlideTimer();
        });
    }

    // Clickable dots
    indicators.forEach(dot => {
        dot.addEventListener('click', (e) => {
            const slideIndex = parseInt(e.target.getAttribute('data-slide'));
            showSlide(slideIndex);
            resetSlideTimer();
        });
    });

    // 4. Why Choose Us Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');

            // Collapse other items
            document.querySelectorAll('.accordion-item').forEach(accItem => {
                accItem.classList.remove('active');
            });

            // Toggle active status
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Initialize first accordion item as active
    const firstAccItem = document.querySelector('.accordion-item');
    if (firstAccItem) {
        firstAccItem.classList.add('active');
    }

    // 5. Smart Jurisdiction Advisor
    const serviceSectorSelect = document.getElementById('service-sector');
    const advisorText = document.getElementById('advisor-text');
    const jurisdictionAdvisor = document.getElementById('jurisdiction-advisor');

    const jurisdictionRules = {
        central: "Primary Court Forum: <strong>Central Administrative Tribunal (CAT) Jodhpur Bench</strong> (under Sec 19 of the Administrative Tribunals Act, 1985). Writ jurisdiction lies with the Rajasthan High Court (Jodhpur) only against CAT final orders.",
        state: "Primary Court Forum: <strong>Rajasthan Civil Services Appellate Tribunal</strong> (for statutory service appeals) or <strong>Rajasthan High Court Principal Seat (Jodhpur)</strong> (via Writ Petitions under Article 226/227).",
        defense: "Primary Court Forum: <strong>Central Administrative Tribunal (CAT) Jodhpur Bench</strong> (for civilian defense employees) or the <strong>Armed Forces Tribunal (AFT) / Jodhpur High Court Writs</strong> depending on exact service rules and cadre category.",
        psu: "Primary Court Forum: <strong>High Court of Judicature for Rajasthan at Jodhpur</strong> (via Writ Petitions under Article 226, since public sector corporations are categorized as 'State' under Article 12)."
    };

    if (serviceSectorSelect) {
        serviceSectorSelect.addEventListener('change', (e) => {
            const selectedSector = e.target.value;
            if (jurisdictionRules[selectedSector]) {
                advisorText.innerHTML = jurisdictionRules[selectedSector];
                jurisdictionAdvisor.style.borderColor = 'var(--accent-gold)';
                jurisdictionAdvisor.style.backgroundColor = 'rgba(212, 175, 55, 0.08)';
            }
        });
    }

    // 6. Intake Form Submission
    const consultationForm = document.getElementById('consultation-form');

    if (consultationForm) {
        consultationForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('client-name').value;
            const phone = document.getElementById('client-phone').value;
            const sector = document.getElementById('service-sector').value;
            const category = document.getElementById('issue-type').value;
            const brief = document.getElementById('case-brief').value;

            // Create new intake record
            const newIntake = {
                id: 'i_' + Date.now(),
                name: name,
                phone: phone,
                sector: sector,
                category: category,
                brief: brief,
                date: new Date().toISOString(),
                status: 'new'
            };

            // Load, add, and save back to shared DB
            let db = JSON.parse(localStorage.getItem('adv_chambers_db'));
            if (!db) {
                // If DB is missing, create structure
                db = {
                    passphrase: "admin123",
                    contacts: {
                        phone: "+91 96362 03889",
                        email: "contact@advtanwarsingh.in",
                        address: "Advocate Tanwar Singh Chambers, Court Road, Jodhpur, Rajasthan, 342001",
                        mapsLink: "https://maps.google.com"
                    },
                    content: {
                        heroTitle: "Service Matter & Administrative Law Advocacy",
                        heroSubtitle: "Dedicated legal representation for Central Government, State Government, Defense, and PSU employees at the Jodhpur High Court and Central Administrative Tribunal.",
                        aboutText: "The chambers of Advocate Tanwar Singh offer legal counsel, filing, and arguing of service-related disputes..."
                    },
                    gallery: [],
                    links: [],
                    intakes: [],
                    logs: []
                };
            }

            db.intakes.push(newIntake);
            
            // Add a log log entry for the audit
            db.logs.unshift({
                action: `Public intake submitted by '${name}'.`,
                time: new Date().toISOString()
            });

            localStorage.setItem('adv_chambers_db', JSON.stringify(db));

            // BCI-compliant success confirmation notice
            alert(`Consultation Intake Logged:\n\nThank you, ${name}. Your inquiry has been routed under the respective sector guidelines.\n\nNote: The chambers of Adv. Tanwar Singh will contact you at Jodhpur for verified docket scheduling in compliance with Bar Council of India guidelines.`);
            
            consultationForm.reset();
            advisorText.innerHTML = "Select your service sector in the form to display primary forum routing.";
            jurisdictionAdvisor.style.borderColor = 'transparent';
            jurisdictionAdvisor.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
        });
    }
});
