// Global Application State Hydrated from LocalStorage or Defaults
const APP_STATE = {
    services: [
        {
            id: 'household-shifting',
            title: 'Household Shifting',
            desc: 'Safe packing and relocation of household items. Specialized handling of fragile goods, electronics, and heavy furniture with premium packing material.',
            image: 'assets/house-shifting.jpg',
            icon: 'fa-home',
            category: 'relocation'
        },
        {
            id: 'office-relocation',
            title: 'Office Relocation',
            desc: 'Professional business and commercial moving. Minimize downtime with planned corporate moves, IT infrastructure transit, and file records packing.',
            image: 'assets/office-moving.jpg',
            icon: 'fa-building',
            category: 'relocation'
        },
        {
            id: 'vehicle-transport',
            title: 'Vehicle Transportation',
            desc: 'Secure bike and car transportation. Custom-built container carriers, scratch-free loading systems, and door-to-door safe delivery.',
            image: 'assets/transport-fleet.jpg',
            icon: 'fa-car',
            category: 'transport'
        },
        {
            id: 'goods-transport',
            title: 'Goods Transportation',
            desc: 'Reliable transport solutions for businesses. Part loads (LTL), full truckloads (FTL), and custom business logistics mapping.',
            image: 'assets/cargo-delivery.jpg',
            icon: 'fa-truck-moving',
            category: 'transport'
        },
        {
            id: 'packing-services',
            title: 'Packing Services',
            desc: 'Premium quality packing materials and trained staff. Multi-layer bubble wrap, moisture-resistant boxes, corrugated sheets, and wood crating.',
            image: 'assets/packing-material.jpg',
            icon: 'fa-box-open',
            category: 'logistics'
        },
        {
            id: 'warehouse-storage',
            title: 'Warehouse & Storage',
            desc: 'Secure storage solutions for short and long duration. 24/7 CCTV surveillance, fire protection, dust-free chambers, and inventory logs.',
            image: 'assets/warehouse.jpg',
            icon: 'fa-warehouse',
            category: 'logistics'
        },
        {
            id: 'industrial-logistics',
            title: 'Industrial Logistics',
            desc: 'Heavy equipment and machinery transportation. Hydraulic axles, low-bed trailers, safety inspectors, and custom site-to-site engineering.',
            image: 'assets/logistics-center.jpg',
            icon: 'fa-dolly',
            category: 'logistics'
        }
    ],
    fleet: [
        { id: 1, name: 'Light Cargo Van', type: 'Mini Truck', capacity: '1.5 Tons', use: 'Local household shifting, express box delivery', image: 'assets/loading-team.jpg' },
        { id: 2, name: 'Standard Container Truck', type: 'Container Vehicle', capacity: '7.5 Tons', use: 'Interstate household relocation, corporate shifting', image: 'assets/hero-truck.jpg' },
        { id: 3, name: 'Heavy Duty Trailer', type: 'Specialized Carrier', capacity: '20+ Tons', use: 'Industrial logistics, raw material transit, machinery', image: 'assets/transport-fleet.jpg' },
        { id: 4, name: 'Open Goods Carrier', type: 'Truck Fleet', capacity: '10 Tons', use: 'Commercial cargo, bulk packaging transit, metal loads', image: 'assets/cargo-delivery.jpg' }
    ],
    testimonials: [
        { id: 1, name: 'Arjun Sharma', location: 'Mumbai', service: 'Household Shifting', rating: 5, text: 'Absolutely flawless shifting experience. The packing team wrapped our glass dining table and electronics with triple-layer protection. Reached the destination without a single scratch!', avatar: 'assets/truck-driver.jpg' },
        { id: 2, name: 'Priya Patel', location: 'Bengaluru', service: 'Office Relocation', rating: 5, text: 'Relocating our 30-person office seemed like a nightmare, but {{CLINIC_NAME}} completed it over the weekend. Our servers and workstations were set up and operational by Monday morning.', avatar: 'assets/truck-driver.jpg' },
        { id: 3, name: 'Vikram Singh', location: 'Delhi NCR', service: 'Vehicle Transportation', rating: 4, text: 'Transported my SUV from Delhi to Chennai. Excellent GPS updates throughout the trip, and the delivery driver was very professional. Highly recommended for vehicle transit.', avatar: 'assets/truck-driver.jpg' }
    ],
    faqs: [
        { id: 1, question: 'How do you calculate moving charges?', answer: 'Moving charges are calculated based on the volume/weight of goods, distance between origin and destination, quality of packing materials required, labor involved (including floors and lift availability), and seasonal demand.' },
        { id: 2, question: 'Is insurance available for the transit?', answer: 'Yes, we provide comprehensive transit insurance assistance. It covers any unforeseen accidental damage during loading, transit, or unloading. We highly recommend opting for it to secure your valuables.' },
        { id: 3, question: 'How long does transportation take?', answer: 'Local moves are completed within the same day. For interstate shipping, transit times vary from 2 to 7 days depending on the distance, route clearance, and chosen carrier type.' },
        { id: 4, question: 'What items cannot be transported?', answer: 'For safety reasons, we do not transport hazardous materials, inflammable liquids (petrol, diesel, gas cylinders), explosives, perishable food items, jewelry, currency, high-value assets, and contraband.' },
        { id: 5, question: 'Do you provide packing materials?', answer: 'Yes, we provide all required packing materials including bubble wrap, heavy-duty cartons, stretch films, corrugated boxes, thermocol sheets, and adhesive tapes. Our packing team handles the complete sealing process.' }
    ],
    inquiries: [],
    settings: {
        homepage_headline: 'Moving Your World With Safety & Trust',
        homepage_subheading: 'Professional relocation, transportation, and logistics solutions with secure handling and timely delivery.'
    }
};

// State Manager
class StateManager {
    static init() {
        if (!localStorage.getItem('packers_movers_state')) {
            localStorage.setItem('packers_movers_state', JSON.stringify(APP_STATE));
        }
    }

    static get() {
        this.init();
        return JSON.parse(localStorage.getItem('packers_movers_state'));
    }

    static save(state) {
        localStorage.setItem('packers_movers_state', JSON.stringify(state));
    }

    static addInquiry(inquiry) {
        const state = this.get();
        state.inquiries.unshift(inquiry);
        this.save(state);
    }
}

// Router Manager
class Router {
    constructor() {
        this.routes = {
            '': 'home',
            'about': 'about',
            'services': 'services',
            'fleet': 'fleet',
            'how-we-work': 'how-we-work',
            'gallery': 'gallery',
            'tracking': 'tracking',
            'testimonials': 'testimonials',
            'faqs': 'faqs',
            'contact': 'contact'
        };
        
        window.addEventListener('hashchange', () => this.handleRoute());
        window.addEventListener('load', () => {
            StateManager.init();
            // Fallback for {{PRIMARY_COLOR}} token if not yet replaced in development
            const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
            if (!primaryColor || primaryColor.includes('{')) {
                document.documentElement.style.setProperty('--primary-color', '#0f52ba');
            }
            
            // Replace any uncompiled template tokens in the document with high-quality fallback content
            const replaceDevelopmentTokens = () => {
                if (document.title.includes('{{CLINIC_NAME}}')) {
                    document.title = document.title.replace(/{{CLINIC_NAME}}/g, 'APEX LOGISTICS');
                }
                const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
                let node;
                while (node = walk.nextNode()) {
                    if (node.nodeValue.includes('{{CLINIC_NAME}}')) {
                        node.nodeValue = node.nodeValue.replace(/{{CLINIC_NAME}}/g, 'APEX LOGISTICS');
                    }
                    if (node.nodeValue.includes('{{PHONE}}')) {
                        node.nodeValue = node.nodeValue.replace(/{{PHONE}}/g, '+1 (800) 555-0199');
                    }
                    if (node.nodeValue.includes('{{ADDRESS}}')) {
                        node.nodeValue = node.nodeValue.replace(/{{ADDRESS}}/g, 'Suite 500, Logistics Plaza, Chicago, IL');
                    }
                }
            };
            replaceDevelopmentTokens();
            
            this.handleRoute();
            this.initGlobalUI();
        });
    }

    handleRoute() {
        const hash = window.location.hash.replace('#/', '').replace('#', '');
        const viewName = this.routes[hash] || 'home';
        
        // Hide all views
        document.querySelectorAll('.page-view').forEach(view => {
            view.classList.remove('active');
        });
        
        // Show active view
        const activeView = document.getElementById(`page-${viewName}`);
        if (activeView) {
            activeView.classList.add('active');
            window.scrollTo(0, 0);
            this.updateActiveNav(hash);
            this.initializeViewController(viewName);
        } else {
            // Fallback to home
            window.location.hash = '#/';
        }
    }

    updateActiveNav(hash) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href').replace('#/', '').replace('#', '');
            if (href === hash || (hash === '' && href === '')) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu if open
        const navMenu = document.getElementById('nav-menu');
        const menuToggle = document.getElementById('menu-toggle');
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    }

    initializeViewController(viewName) {
        const state = StateManager.get();
        
        // Dynamic elements replacement helper
        const replaceTokens = (text) => {
            return text
                .replace(/{{CLINIC_NAME}}/g, document.title) // Fallback to title if template engine hasn't processed
                .replace(/{{PHONE}}/g, '{{PHONE}}')
                .replace(/{{ADDRESS}}/g, '{{ADDRESS}}');
        };

        // Render sections dynamically based on state
        if (viewName === 'home') {
            // Update hero texts from settings
            const headline = document.getElementById('hero-headline');
            const subheading = document.getElementById('hero-subheading');
            if (headline && state.settings.homepage_headline) headline.textContent = state.settings.homepage_headline;
            if (subheading && state.settings.homepage_subheading) subheading.textContent = state.settings.homepage_subheading;
            
            this.renderHomeServices(state.services);
            this.initTimelineAnimation();
            this.initTestimonialCarousel(state.testimonials);
        } else if (viewName === 'services') {
            this.renderServicesPage(state.services);
        } else if (viewName === 'fleet') {
            this.renderFleetPage(state.fleet);
        } else if (viewName === 'testimonials') {
            this.renderTestimonialsPage(state.testimonials);
        } else if (viewName === 'faqs') {
            this.renderFaqsPage(state.faqs);
        } else if (viewName === 'gallery') {
            this.initGalleryFilters();
        }
        
        // Apply scroll reveals
        this.initScrollReveal();
    }

    initGlobalUI() {
        // Sticky Navbar
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('sticky');
            } else {
                navbar.classList.remove('sticky');
            }
        });

        // Mobile Menu Toggle
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');
        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Global Form Handlers
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        });

        // Tracker Handler
        const trackBtn = document.getElementById('btn-track-shipment');
        if (trackBtn) {
            trackBtn.addEventListener('click', () => this.handleTrackingSearch());
        }

        // Lightbox Close
        const lightbox = document.getElementById('lightbox');
        if (lightbox) {
            lightbox.addEventListener('click', (e) => {
                if (e.target.id === 'lightbox' || e.target.classList.contains('lightbox-close')) {
                    lightbox.classList.remove('active');
                }
            });
        }
    }

    // Dynamic Render Methods
    renderHomeServices(services) {
        const grid = document.getElementById('home-services-grid');
        if (!grid) return;
        
        // Show first 3 featured services on home page
        grid.innerHTML = services.slice(0, 3).map(service => `
            <div class="service-card scroll-reveal">
                <div class="service-img-wrapper">
                    <img src="${service.image}" alt="${service.title}" loading="lazy">
                    <div class="service-icon-badge">
                        <i class="fas ${service.icon}"></i>
                    </div>
                </div>
                <div class="service-body">
                    <h3 class="service-card-title">${service.title}</h3>
                    <p class="service-card-text">${service.desc.substring(0, 120)}...</p>
                    <a href="#/services" class="service-card-link">Explore Details <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `).join('');
    }

    renderServicesPage(services) {
        const grid = document.getElementById('services-page-grid');
        if (!grid) return;

        grid.innerHTML = services.map(service => `
            <div class="service-card scroll-reveal">
                <div class="service-img-wrapper">
                    <img src="${service.image}" alt="${service.title}" loading="lazy">
                    <div class="service-icon-badge">
                        <i class="fas ${service.icon}"></i>
                    </div>
                </div>
                <div class="service-body">
                    <h3 class="service-card-title">${service.title}</h3>
                    <p class="service-card-text">${service.desc}</p>
                    <div class="service-details-meta" style="margin-top:auto; padding-top:1.5rem; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.85rem; font-weight:600; color:var(--primary-color); text-transform:uppercase;"><i class="fas fa-shield-alt"></i> Fully Insured</span>
                        <a href="#/contact" class="btn btn-primary" style="padding:0.5rem 1rem; font-size:0.85rem;">Book Service</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderFleetPage(fleet) {
        const grid = document.getElementById('fleet-page-grid');
        if (!grid) return;

        grid.innerHTML = fleet.map(vehicle => `
            <div class="fleet-card scroll-reveal">
                <div class="fleet-img-box">
                    <img src="${vehicle.image}" alt="${vehicle.name}" loading="lazy">
                </div>
                <div class="fleet-details">
                    <span class="fleet-badge">${vehicle.type}</span>
                    <h3 class="fleet-vehicle-name">${vehicle.name}</h3>
                    <div class="fleet-specs">
                        <div class="fleet-spec-item">
                            <span class="fleet-spec-label">Payload Capacity</span>
                            <span class="fleet-spec-value">${vehicle.capacity}</span>
                        </div>
                        <div class="fleet-spec-item">
                            <span class="fleet-spec-label">Availability</span>
                            <span class="fleet-spec-value" style="color:var(--accent-success);"><i class="fas fa-check-circle"></i> Ready Fleet</span>
                        </div>
                    </div>
                    <p style="font-size:0.9rem; color:var(--text-muted); margin-bottom:1.5rem;">${vehicle.use}</p>
                    <a href="#/contact" class="btn btn-secondary" style="width:100%; justify-content:center; padding:0.75rem;">Request Fleet Carrier</a>
                </div>
            </div>
        `).join('');
    }

    renderTestimonialsPage(testimonials) {
        const grid = document.getElementById('testimonials-page-grid');
        if (!grid) return;

        grid.innerHTML = testimonials.map(test => `
            <div class="testimonial-card scroll-reveal">
                <i class="fas fa-quote-right testimonial-quote-icon"></i>
                <div class="testimonial-rating">
                    ${Array(test.rating).fill('<i class="fas fa-star"></i>').join('')}
                    ${Array(5 - test.rating).fill('<i class="far fa-star"></i>').join('')}
                </div>
                <p class="testimonial-text">"${test.text}"</p>
                <div class="testimonial-user">
                    <img src="${test.avatar}" alt="${test.name}" class="testimonial-avatar" loading="lazy">
                    <div>
                        <h4 class="testimonial-username">${test.name}</h4>
                        <div class="testimonial-meta">${test.location} • Verified ${test.service} Client</div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderFaqsPage(faqs) {
        const container = document.getElementById('faqs-page-accordion');
        if (!container) return;

        container.innerHTML = faqs.map(faq => `
            <div class="faq-item scroll-reveal">
                <button class="faq-question-btn">
                    <span>${faq.question}</span>
                    <i class="fas fa-chevron-down"></i>
                </button>
                <div class="faq-answer">
                    <div class="faq-answer-inner">
                        <p>${faq.answer}</p>
                    </div>
                </div>
            </div>
        `).join('');

        // Re-attach accordion trigger events
        container.querySelectorAll('.faq-question-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const item = btn.parentElement;
                const answer = item.querySelector('.faq-answer');
                const isOpen = item.classList.contains('active');
                
                // Close all other FAQs
                container.querySelectorAll('.faq-item').forEach(otherItem => {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                });
                
                if (!isOpen) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        });
    }

    // Scroll Reveal implementation
    initScrollReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        reveals.forEach(el => observer.observe(el));
    }

    // Journey Timeline Animation
    initTimelineAnimation() {
        const section = document.getElementById('journey-section');
        if (!section) return;

        const lineActive = document.querySelector('.process-line-active');
        const truck = document.querySelector('.timeline-truck');
        const steps = document.querySelectorAll('.process-step');

        const animateTimeline = () => {
            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            // Check if section is visible
            if (rect.top < windowHeight * 0.7 && rect.bottom > 0) {
                // Determine completion ratio based on scroll position of timeline section
                const totalDist = windowHeight * 0.5;
                const scrolled = Math.max(0, Math.min(totalDist, (windowHeight * 0.7 - rect.top)));
                const ratio = scrolled / totalDist;
                
                const percent = Math.min(100, Math.round(ratio * 100));
                
                if (lineActive) lineActive.style.width = `${percent}%`;
                if (truck) truck.style.left = `${percent}%`;

                steps.forEach((step, index) => {
                    const stepPercent = (index / (steps.length - 1)) * 100;
                    if (percent >= stepPercent) {
                        step.classList.add('active');
                    } else {
                        step.classList.remove('active');
                    }
                });
            }
        };

        window.addEventListener('scroll', animateTimeline);
        animateTimeline(); // Initial run
    }

    // Slider for Home testimonials
    initTestimonialCarousel(testimonials) {
        const track = document.getElementById('testimonial-track');
        const indicatorsContainer = document.getElementById('carousel-indicators');
        if (!track || !indicatorsContainer) return;

        // Render first 3 slide cards
        track.innerHTML = testimonials.slice(0, 3).map(test => `
            <div class="testimonial-slide">
                <div class="testimonial-card">
                    <i class="fas fa-quote-right testimonial-quote-icon"></i>
                    <div class="testimonial-rating">
                        ${Array(test.rating).fill('<i class="fas fa-star"></i>').join('')}
                        ${Array(5 - test.rating).fill('<i class="far fa-star"></i>').join('')}
                    </div>
                    <p class="testimonial-text">"${test.text}"</p>
                    <div class="testimonial-user">
                        <img src="${test.avatar}" alt="${test.name}" class="testimonial-avatar" loading="lazy">
                        <div>
                            <h4 class="testimonial-username">${test.name}</h4>
                            <div class="testimonial-meta">${test.location} • Verified ${test.service}</div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        indicatorsContainer.innerHTML = testimonials.slice(0, 3).map((_, i) => `
            <div class="indicator-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>
        `).join('');

        let currentIndex = 0;
        const dots = indicatorsContainer.querySelectorAll('.indicator-dot');
        
        const goToSlide = (index) => {
            currentIndex = index;
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[index].classList.add('active');
        };

        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                goToSlide(parseInt(dot.getAttribute('data-index')));
            });
        });

        // Auto play
        let autoPlay = setInterval(() => {
            let nextIdx = (currentIndex + 1) % 3;
            goToSlide(nextIdx);
        }, 5000);

        track.addEventListener('mouseenter', () => clearInterval(autoPlay));
        track.addEventListener('mouseleave', () => {
            autoPlay = setInterval(() => {
                let nextIdx = (currentIndex + 1) % 3;
                goToSlide(nextIdx);
            }, 5000);
        });
    }

    // Gallery Category Filters and Lightbox
    initGalleryFilters() {
        const grid = document.getElementById('gallery-grid');
        const filterContainer = document.getElementById('gallery-filter-buttons');
        if (!grid || !filterContainer) return;

        const galleryItems = [
            { id: 1, title: 'Secure Cushion Wrap', category: 'packing', image: 'assets/packing-material.jpg', size: 'tall' },
            { id: 2, title: 'Multi-axle Cargo Fleet', category: 'vehicles', image: 'assets/transport-fleet.jpg', size: 'wide' },
            { id: 3, title: 'Industrial Rigging Team', category: 'loading', image: 'assets/loading-team.jpg', size: '' },
            { id: 4, title: 'Corporate Records Vault', category: 'warehouses', image: 'assets/warehouse.jpg', size: '' },
            { id: 5, title: 'High-speed Highway Fleet', category: 'vehicles', image: 'assets/hero-truck.jpg', size: 'wide' },
            { id: 6, title: 'Delicate Electronics Case', category: 'packing', image: 'assets/house-shifting.jpg', size: '' },
            { id: 7, title: 'Heavy Machinery Assembly', category: 'loading', image: 'assets/office-moving.jpg', size: 'tall' },
            { id: 8, title: 'State-of-art Hub Terminal', category: 'warehouses', image: 'assets/logistics-center.jpg', size: '' },
            { id: 9, title: 'Express Dispatch Driver', category: 'deliveries', image: 'assets/truck-driver.jpg', size: '' },
            { id: 10, title: 'Intermodal Freight Handlers', category: 'deliveries', image: 'assets/cargo-delivery.jpg', size: 'wide' }
        ];

        const renderGallery = (items) => {
            grid.innerHTML = items.map(item => `
                <div class="gallery-item ${item.size} scroll-reveal revealed" data-category="${item.category}" onclick="app.openLightbox('${item.image}', '${item.title}')">
                    <img src="${item.image}" alt="${item.title}" loading="lazy">
                    <div class="gallery-overlay">
                        <h4>${item.title}</h4>
                        <span>${item.category.toUpperCase()}</span>
                    </div>
                </div>
            `).join('');
        };

        renderGallery(galleryItems);

        filterContainer.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                if (filter === 'all') {
                    renderGallery(galleryItems);
                } else {
                    const filtered = galleryItems.filter(item => item.category === filter);
                    renderGallery(filtered);
                }
            });
        });
    }

    openLightbox(imgSrc, titleText) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        if (lightbox && lightboxImg) {
            lightboxImg.src = imgSrc;
            lightboxImg.alt = titleText;
            lightbox.classList.add('active');
        }
    }

    // Form Submission Logic
    handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formId = form.id;
        
        const formData = new FormData(form);
        const data = {};
        formData.forEach((value, key) => {
            data[key] = value;
        });

        // Generate tracking ID
        const trackingId = 'TRK-' + Math.floor(100000 + Math.random() * 900000);
        data.trackingId = trackingId;
        data.id = 'REQ-' + Date.now();
        data.date = new Date().toLocaleDateString();
        data.status = 'New';

        // Add to localStorage inquiries database
        StateManager.addInquiry(data);

        // Highlight submission feedback
        const responseBox = form.querySelector('.alert-msg');
        if (responseBox) {
            responseBox.className = 'alert-msg success';
            responseBox.innerHTML = `
                <div style="font-size:1.1rem; font-weight:700; margin-bottom:0.5rem;"><i class="fas fa-check-circle"></i> Request Submitted Successfully!</div>
                <p>Your tracking number is <strong style="font-size:1.2rem; color:var(--text-main); background:#fff; padding:0.25rem 0.5rem; border-radius:4px; margin:0 0.25rem;">${trackingId}</strong>.</p>
                <p style="font-size:0.85rem; margin-top:0.5rem; color:var(--text-muted);">Please save this tracking ID. You can check your shipment status on our <a href="#/tracking" style="text-decoration:underline; font-weight:700; color:var(--primary-color);">Tracking Page</a>.</p>
            `;
            form.reset();
        }
    }

    // Interactive Shipment Tracker Logic
    handleTrackingSearch() {
        const input = document.getElementById('shipment-id-input');
        const resultBox = document.getElementById('tracking-result-box');
        const searchVal = input ? input.value.trim().toUpperCase() : '';

        if (!searchVal) {
            alert('Please enter a valid Shipment / Tracking Order ID.');
            return;
        }

        // Search in local state first
        const state = StateManager.get();
        const found = state.inquiries.find(inq => inq.trackingId === searchVal || inq.id === searchVal);
        
        let trackingStatus = 'New';
        let movingFrom = 'Logistics Hub';
        let movingTo = 'Destination Hub';
        let orderDate = new Date().toLocaleDateString();
        let serviceType = 'General Freight';
        
        if (found) {
            trackingStatus = found.status;
            movingFrom = found.movingFrom || found.address || 'Sender Location';
            movingTo = found.movingTo || 'Receiver Location';
            orderDate = found.date;
            serviceType = found.serviceType || 'Standard Relocation';
        } else {
            // Check for valid syntax or just default mock it
            if (!searchVal.startsWith('TRK-') && searchVal.length < 5) {
                alert('Shipment ID not found in database. Try searching for TRK-123456 or place a new quote request.');
                return;
            }
            // Generate mock order based on ID hash for demo purposes
            const mockStatuses = ['New', 'Contacted', 'Quote Sent', 'Confirmed', 'Completed'];
            const charSum = searchVal.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
            trackingStatus = mockStatuses[charSum % mockStatuses.length];
            movingFrom = 'Los Angeles logistics yard';
            movingTo = 'Chicago distribution terminal';
            serviceType = 'Containerized Express Freight';
        }

        // Render result metadata
        document.getElementById('trk-val-id').textContent = searchVal;
        document.getElementById('trk-val-status').textContent = trackingStatus;
        document.getElementById('trk-val-route').textContent = `${movingFrom} → ${movingTo}`;
        document.getElementById('trk-val-type').textContent = serviceType;
        document.getElementById('trk-val-date').textContent = orderDate;

        // Render tracking flow status
        const nodes = document.querySelectorAll('.tracking-node');
        const flowLine = document.querySelector('.tracking-flow-active');
        
        const statusMap = {
            'New': { step: 0, percent: 10 },
            'Contacted': { step: 1, percent: 32 },
            'Quote Sent': { step: 2, percent: 55 },
            'Confirmed': { step: 3, percent: 78 },
            'Completed': { step: 4, percent: 100 }
        };

        const currentMap = statusMap[trackingStatus] || { step: 0, percent: 10 };
        
        if (flowLine) {
            flowLine.style.width = `${currentMap.percent}%`;
        }

        nodes.forEach((node, idx) => {
            node.className = 'tracking-node';
            if (idx < currentMap.step) {
                node.classList.add('completed');
            } else if (idx === currentMap.step) {
                node.classList.add('current');
            }
        });

        // Show the tracking box
        if (resultBox) {
            resultBox.style.display = 'block';
            resultBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}

// Instantiate router globally
const app = new Router();
