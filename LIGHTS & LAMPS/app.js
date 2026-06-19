/**
 * Premium Luxury Lighting, Electrical & Smart Home Solutions Template
 * Core Logic Engine & CMS Controller
 */

// ==========================================================================
// 1. DYNAMIC TOKEN REPLACEMENT SYSTEM FOR LOCAL PREVIEW
// ==========================================================================
function preprocessTokens() {
    const defaultTokens = {
        '{{CLINIC_NAME}}': 'Aura Lighting & Electrical',
        '{{PHONE}}': '+1 (800) 829-0199',
        '{{ADDRESS}}': '78 Luxury Design Arcade, Suite 10, New York, NY 10013',
        '{{LOGO_URL}}': 'https://images.unsplash.com/photo-1565814636199-ae8133055c1c?auto=format&fit=crop&w=120&h=120&q=80',
        '{{PRIMARY_COLOR}}': '#D4AF37' // Luxury gold
    };

    // Fix CSS variable if it has token value
    const root = document.documentElement;
    const currentPrimary = getComputedStyle(root).getPropertyValue('--primary-color').trim();
    if (currentPrimary.includes('{{PRIMARY_COLOR}}')) {
        // Look in localStorage or use default
        const savedColor = localStorage.getItem('cms_primary_color') || defaultTokens['{{PRIMARY_COLOR}}'];
        root.style.setProperty('--primary-color', savedColor);
    }

    // Walk the entire document and swap tokens for display
    function walkNodes(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let val = node.nodeValue;
            let replaced = false;
            for (const [token, value] of Object.entries(defaultTokens)) {
                if (val.includes(token)) {
                    val = val.replaceAll(token, token === '{{CLINIC_NAME}}' ? (localStorage.getItem('cms_clinic_name') || value) : value);
                    replaced = true;
                }
            }
            if (replaced) node.nodeValue = val;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Attributes
            for (const attr of ['href', 'src', 'alt']) {
                if (node.hasAttribute(attr)) {
                    let val = node.getAttribute(attr);
                    let replaced = false;
                    for (const [token, value] of Object.entries(defaultTokens)) {
                        if (val.includes(token)) {
                            if (token === '{{LOGO_URL}}' && localStorage.getItem('cms_logo_url')) {
                                val = val.replaceAll(token, localStorage.getItem('cms_logo_url'));
                            } else {
                                val = val.replaceAll(token, value);
                            }
                            replaced = true;
                        }
                    }
                    if (replaced) node.setAttribute(attr, val);
                }
            }
            // Recurse children
            for (let child = node.firstChild; child; child = child.nextSibling) {
                walkNodes(child);
            }
        }
    }
    walkNodes(document.head);
    walkNodes(document.body);
}

// ==========================================================================
// 2. STATE STORAGE & SEED DATA (LOCAL STORAGE)
// ==========================================================================
const SEED_DATA = {
    products: [
        {
            id: 'prod-1',
            name: 'Imperial Ring Chandelier',
            brand: 'Aura Premium',
            category: 'decorative',
            subcategory: 'chandeliers',
            collection: 'premium',
            image: 'assets/chandelier.jpg',
            description: 'Handcrafted luxury brass chassis with multi-tier crystal glass elements. Emits a warm glowing architectural ambient light.',
            specifications: {
                'Diameter': '120cm',
                'Material': 'Solid Brass & K9 Crystals',
                'Voltage': '220-240V',
                'Dimmable': 'Yes, Smart Control Enabled'
            },
            featured: true
        },
        {
            id: 'prod-2',
            name: 'Aero Slim Modular Switch',
            brand: 'VibeTec',
            category: 'switches',
            subcategory: 'modular',
            collection: 'new-arrivals',
            image: 'assets/modular-switch.jpg',
            description: 'Tempered glass touch plate switch with a glowing LED locator ring and smart automation integrations.',
            specifications: {
                'Gang Count': '4-Gang Touch',
                'Connectivity': 'ZigBee / WiFi',
                'Finish': 'Obsidian Black / Satin Gold Frame',
                'Rating': '10A, 250V AC'
            },
            featured: true
        },
        {
            id: 'prod-3',
            name: 'Crescent Moon Wall Sconce',
            brand: 'Lumina Lux',
            category: 'decorative',
            subcategory: 'walls',
            collection: 'designer',
            image: 'assets/decorative-lamp.jpg',
            description: 'Stately indirect lighting wall fixtures, rendering clean architectural crescent glow. Perfect for luxury bedrooms.',
            specifications: {
                'Dimensions': '40cm Height',
                'Light Source': 'Inbuilt Warm LED 15W',
                'CCT': '2700K Warm White',
                'Material': 'Brushed Champagne Gold Alum'
            },
            featured: true
        },
        {
            id: 'prod-4',
            name: 'High-Lumen Architectural Spotlight',
            brand: 'Hyperion LED',
            category: 'commercial',
            subcategory: 'spots',
            collection: 'best-sellers',
            image: 'assets/led-light.jpg',
            description: 'Anti-glare high CRI track/cove lighting spotlight, built for fine luxury galleries and boutique storefronts.',
            specifications: {
                'Wattage': '12W',
                'Beam Angle': '24 Degrees',
                'CRI': '>95 Ra',
                'Luminous Flux': '1100 Lumens'
            },
            featured: true
        },
        {
            id: 'prod-5',
            name: 'Ultra-Shield House Wire',
            brand: 'SafeShield Cables',
            category: 'cables',
            subcategory: 'wiring',
            collection: 'premium',
            image: 'assets/electrical-cable.jpg',
            description: 'Flame retardant, zero halogen copper core electric wires. Tested for extreme temperatures and electrical loads.',
            specifications: {
                'Core size': '2.5 sq. mm',
                'Insulation': 'FR-LSH (Low Smoke Halogen)',
                'Conductor': '99.9% Pure Electrolytic Copper',
                'Certification': 'CE / IS 694 Certified'
            },
            featured: false
        },
        {
            id: 'prod-6',
            name: 'SafeGuard MCB Distribution Board',
            brand: 'BreakerMax',
            category: 'protection',
            subcategory: 'mcbs',
            collection: 'best-sellers',
            image: 'assets/electrical-panel.jpg',
            description: 'Premium circuit protection center featuring smart automated trip detection and a sleek safety display board.',
            specifications: {
                'Capacity': '12 Way Double Door',
                'IP Protection': 'IP43 Waterproof Index',
                'Material': 'Powder Coated Sheet Steel',
                'Mounting': 'Flush / Wall mounted'
            },
            featured: false
        },
        {
            id: 'prod-7',
            name: 'Hex Smart Light Panel',
            brand: 'VibeTec',
            category: 'smart',
            subcategory: 'smart-controls',
            collection: 'new-arrivals',
            image: 'assets/smart-light.jpg',
            description: 'Dynamic modular wall light panels supporting millions of colors, responsive ambient visualizer, and voice command compatibility.',
            specifications: {
                'Control Type': 'App / Alexa / Google Home',
                'Colors': '16 Million RGB',
                'Panel Count': '9 Modular Units',
                'Power Input': '24V DC Adaptor'
            },
            featured: true
        },
        {
            id: 'prod-8',
            name: 'Vanguard Industrial Track Light',
            brand: 'Hyperion LED',
            category: 'commercial',
            subcategory: 'tracks',
            collection: 'designer',
            image: 'assets/modern-living-light.jpg',
            description: 'Heavy duty track mounted system designed for flexible spotlighting in commercial showrooms and studios.',
            specifications: {
                'Mount': '3-Phase Track Mount',
                'Wattage': '30W High Power',
                'CCT Range': '3000K - 5000K Tunable',
                'Housing': 'Die Cast Aviation Grade Aluminum'
            },
            featured: false
        }
    ],
    brands: [
        { id: 'b-1', name: 'Aura Premium', logo: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&fit=crop&q=60' },
        { id: 'b-2', name: 'VibeTec Smart', logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&fit=crop&q=60' },
        { id: 'b-3', name: 'Lumina Lux', logo: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&fit=crop&q=60' },
        { id: 'b-4', name: 'Hyperion LED', logo: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&fit=crop&q=60' },
        { id: 'b-5', name: 'SafeShield Cables', logo: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&fit=crop&q=60' },
        { id: 'b-6', name: 'BreakerMax', logo: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=200&fit=crop&q=60' }
    ],
    projects: [
        { id: 'proj-1', title: 'Modern Penthouse Illumination', category: 'residential', image: 'assets/modern-living-light.jpg', desc: 'Integrated chandelier installation and home automated smart circuits.' },
        { id: 'proj-2', title: 'Deco Lighting Experience Center', category: 'showroom', image: 'assets/showroom.jpg', desc: 'Our flagship studio displaying luxury lights and designer modular boards.' },
        { id: 'proj-3', title: 'Office Space Commercial LEDs', category: 'commercial', image: 'assets/installation.jpg', desc: 'Complete anti-glare flat pane LED installation for premium visual comfort.' },
        { id: 'proj-4', title: 'Smart Home Automation Integration', category: 'smart', image: 'assets/smart-light.jpg', desc: 'Wireless central switches controlling lighting, safety DBs, and climate.' },
        { id: 'proj-5', title: 'Patio & Outdoor Ambient Lights', category: 'outdoor', image: 'assets/outdoor-lighting.jpg', desc: 'Waterproof landscape lighting systems with automatic dusk-to-dawn sensors.' }
    ],
    blogs: [
        {
            id: 'blog-1',
            title: 'Selecting the Ideal Chandelier for High Ceilings',
            author: 'Victoria Sterling',
            date: 'June 10, 2026',
            image: 'assets/chandelier.jpg',
            excerpt: 'Understand how ratios, chain length, and styling weight determine the visual placement of lighting in large halls.'
        },
        {
            id: 'blog-2',
            title: 'Smart Lighting: Transforming House Automation Systems',
            author: 'Marcus Vance',
            date: 'June 02, 2026',
            image: 'assets/smart-light.jpg',
            excerpt: 'An in-depth guide on linking switches, ambient mood boards, and sensor fixtures to optimize electricity consumption.'
        },
        {
            id: 'blog-3',
            title: 'Modular Switch Safety Guidelines for Luxury Bathrooms',
            author: 'Alan Cole',
            date: 'May 28, 2026',
            image: 'assets/modular-switch.jpg',
            excerpt: 'How waterproof panels, premium shockproof ratings, and isolated MCB wiring safeguard your wet utility sections.'
        }
    ],
    testimonials: [
        {
            name: 'Alexander Mercer',
            type: 'Residential Project, Soho Villa',
            rating: 5,
            review: 'Their designer lighting and smart home systems completely transformed my villa. The modular switches feel incredibly high-end and response rates are instantaneous.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80'
        },
        {
            name: 'Sophia Lindqvist',
            type: 'Commercial Gallery, Chelsea Studio',
            rating: 5,
            review: 'The architectural track spotlights exhibit impeccable color rendering. Fine canvases require precise CRI and Aura delivered the exact gallery grade lights we needed.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80'
        },
        {
            name: 'Devan Patel',
            type: 'Home Automation Upgrade',
            rating: 5,
            review: 'SafeShield wires and their breaker panels give me complete peace of mind. Absolute safety backed by luxury switch designs that match our wood aesthetics.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80'
        }
    ],
    inquiries: [
        {
            id: 'inq-1',
            name: 'Clarissa Fontaine',
            email: 'clarissa@fontainedesign.com',
            phone: '+1 (555) 321-9988',
            product: 'Imperial Ring Chandelier',
            message: 'Inquiring for a commercial ballroom project. Need custom diameter configuration options.',
            status: 'new',
            date: '2026-06-18'
        },
        {
            id: 'inq-2',
            name: 'Gregory Scott',
            email: 'g.scott@scottbuilders.com',
            phone: '+1 (555) 789-0012',
            product: 'Aero Slim Modular Switch',
            message: 'Need dynamic sample switch panels to showcase to a developer. Requesting catalog pricing.',
            status: 'contacted',
            date: '2026-06-17'
        }
    ]
};

// Initial state load
function loadState() {
    if (!localStorage.getItem('cms_initialized')) {
        localStorage.setItem('cms_products', JSON.stringify(SEED_DATA.products));
        localStorage.setItem('cms_brands', JSON.stringify(SEED_DATA.brands));
        localStorage.setItem('cms_projects', JSON.stringify(SEED_DATA.projects));
        localStorage.setItem('cms_blogs', JSON.stringify(SEED_DATA.blogs));
        localStorage.setItem('cms_testimonials', JSON.stringify(SEED_DATA.testimonials));
        localStorage.setItem('cms_inquiries', JSON.stringify(SEED_DATA.inquiries));
        localStorage.setItem('cms_initialized', 'true');
    }
}

// Get state items helper
function getStateItem(key) {
    return JSON.parse(localStorage.getItem('cms_' + key)) || [];
}

// Set state items helper
function setStateItem(key, data) {
    localStorage.setItem('cms_' + key, JSON.stringify(data));
}

// ==========================================================================
// 3. ROUTER & DYNAMIC RENDER PIPELINE
// ==========================================================================
const app = document.getElementById('app');

function router() {
    // Clean hash path
    const path = window.location.hash || '#/';
    
    // Close mobile nav on switch
    document.getElementById('mobile-nav').classList.remove('open');

    // Parse params if present e.g. #/lighting?category=decorative
    const [route, queryString] = path.split('?');
    const params = new URLSearchParams(queryString || '');

    // Reset window scroll
    window.scrollTo(0, 0);

    // Update active nav items
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === route) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Match route
    switch(route) {
        case '#/':
            renderHome();
            break;
        case '#/about':
            renderAbout();
            break;
        case '#/lighting':
            renderCatalog('lighting', params);
            break;
        case '#/electrical':
            renderCatalog('electrical', params);
            break;
        case '#/smart-solutions':
            renderSmartSolutions();
            break;
        case '#/gallery':
            renderGallery();
            break;
        case '#/blog':
            renderBlog();
            break;
        case '#/testimonials':
            renderTestimonials();
            break;
        case '#/contact':
            renderContact();
            break;
        case '#/admin':
            renderAdmin();
            break;
        default:
            renderHome();
            break;
    }
    
    // Render Icons
    if (window.lucide) {
        lucide.createIcons();
    }
    
    // Rerun token preprocessing on new DOM chunks
    preprocessTokens();
}

window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    loadState();
    router();
    setupHeaderScroll();
    setupMobileNav();
    setupSearchOverlay();
});

// Header Scrolled styling
function setupHeaderScroll() {
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Mobile navigation triggers
function setupMobileNav() {
    const menuToggle = document.getElementById('menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const closeBtn = document.getElementById('mobile-nav-close');

    menuToggle.addEventListener('click', () => {
        mobileNav.classList.add('open');
    });

    closeBtn.addEventListener('click', () => {
        mobileNav.classList.remove('open');
    });
}

// Search utility actions
function setupSearchOverlay() {
    const searchBtn = document.getElementById('search-btn');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    searchBtn.addEventListener('click', () => {
        searchOverlay.classList.add('open');
        searchInput.focus();
    });

    searchClose.addEventListener('click', () => {
        searchOverlay.classList.remove('open');
        searchInput.value = '';
        searchResults.innerHTML = '';
    });

    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase().trim();
        if (!query) {
            searchResults.innerHTML = '';
            return;
        }

        const products = getStateItem('products');
        const matches = products.filter(p => 
            p.name.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) || 
            p.brand.toLowerCase().includes(query) || 
            p.description.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            searchResults.innerHTML = `<p class="no-results">No matches found for "${query}"</p>`;
            return;
        }

        searchResults.innerHTML = matches.map(p => `
            <div class="search-item" onclick="openQuickView('${p.id}'); document.getElementById('search-overlay').classList.remove('open');">
                <img src="${p.image}" alt="${p.name}">
                <div class="search-item-info">
                    <h4>${p.name}</h4>
                    <span>${p.brand} | ${p.category}</span>
                </div>
            </div>
        `).join('');
    });
}

// Quick view controller
function openQuickView(id) {
    const products = getStateItem('products');
    const item = products.find(p => p.id === id);
    if (!item) return;

    const quickviewBody = document.getElementById('quickview-body');
    const specsHTML = Object.entries(item.specifications || {}).map(([key, val]) => `
        <li>
            <span>${key}</span>
            <span>${val}</span>
        </li>
    `).join('');

    quickviewBody.innerHTML = `
        <div class="quickview-img-box">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="quickview-info">
            <span class="quickview-category">${item.category} / ${item.subcategory}</span>
            <h2>${item.name}</h2>
            <p class="quickview-brand">Brand: <strong>${item.brand}</strong></p>
            <p class="quickview-desc">${item.description}</p>
            
            <h3 style="font-size: 1.1rem; margin-bottom:0.8rem;">Specifications</h3>
            <ul class="quickview-specs">
                ${specsHTML}
            </ul>

            <div style="display:flex; gap: 1rem;">
                <button onclick="triggerInquiryPopup('${item.name}')" class="btn btn-primary">Send Product Inquiry</button>
                <a href="tel:{{PHONE}}" class="btn btn-outline"><i data-lucide="phone"></i> Call Now</a>
            </div>
        </div>
    `;

    document.getElementById('quickview-modal').classList.add('open');
    if (window.lucide) lucide.createIcons();
    preprocessTokens();
}

document.getElementById('quickview-close').addEventListener('click', () => {
    document.getElementById('quickview-modal').classList.remove('open');
});

// Lightbox controller
function openLightbox(src, caption) {
    const lightbox = document.getElementById('lightbox-modal');
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-caption').innerText = caption;
    lightbox.classList.add('open');
}

document.getElementById('lightbox-close').addEventListener('click', () => {
    document.getElementById('lightbox-modal').classList.remove('open');
});

// Trigger product inquiry directly into form
function triggerInquiryPopup(productName) {
    document.getElementById('quickview-modal').classList.remove('open');
    window.location.hash = `#/contact?inquiry=${encodeURIComponent(productName)}`;
}

// ==========================================================================
// 4. PAGES RENDERING LOGIC
// ==========================================================================

// --- 4.1 HOME PAGE ---
function renderHome() {
    // Filter out featured items
    const products = getStateItem('products').filter(p => p.featured);
    const brands = getStateItem('brands');

    // Create 10 Floating Particle divs
    let particles = '';
    for (let i = 0; i < 12; i++) {
        const size = Math.random() * 10 + 4;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 8;
        particles += `<div class="particle" style="width: ${size}px; height: ${size}px; left: ${left}%; top: ${top}%; animation-delay: ${delay}s;"></div>`;
    }

    app.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-bg-media">
                <img src="assets/hero-lighting.jpg" alt="Luxury Interior Showroom" id="hero-img">
            </div>
            <div class="hero-overlay"></div>
            
            <div class="light-switch-widget">
                <span class="switch-label">Warm Glow</span>
                <button class="switch-toggle-btn" id="light-toggle-btn" aria-label="Toggle Lighting Tone"></button>
            </div>

            <div class="particles-container">
                ${particles}
            </div>

            <div class="hero-content">
                <div class="hero-badge">Luxury Experience Center</div>
                <h1 class="hero-headline">Illuminate Spaces With<br>Innovation & Elegance</h1>
                <p class="hero-subheading">Discover premium lighting designs, smart electrical solutions, and trusted products crafted for modern homes and commercial spaces.</p>
                <div class="hero-ctas">
                    <a href="#/lighting" class="btn btn-primary">Explore Collections</a>
                    <a href="#/contact" class="btn btn-outline">Visit Showroom</a>
                </div>
            </div>
        </section>

        <!-- Product Categories Grid -->
        <section class="section-wrapper">
            <div class="section-header">
                <h2>Showroom Categories</h2>
                <p class="section-subtitle">A curated portfolio spanning luxury galleries, modular switchboards, high-grade security systems, and robust cables.</p>
            </div>
            <div class="categories-grid">
                <!-- Decorative Lighting -->
                <div class="category-card" onclick="window.location.hash='#/lighting?category=decorative'">
                    <div class="category-img-wrapper">
                        <img src="assets/chandelier.jpg" alt="Decorative Lighting">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color: var(--primary-color); text-transform:uppercase;">Luxury Gallery</span>
                        <h3>Decorative Lighting</h3>
                        <p>Chandeliers, pendants, wall lights, and bespoke table installations.</p>
                        <a href="#/lighting?category=decorative" class="btn btn-outline btn-xs">Explore Designs</a>
                    </div>
                </div>
                <!-- LED & Commercial -->
                <div class="category-card" onclick="window.location.hash='#/lighting?category=commercial'">
                    <div class="category-img-wrapper">
                        <img src="assets/led-light.jpg" alt="LED Commercial Lighting">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color: var(--primary-color); text-transform:uppercase;">Architectural</span>
                        <h3>LED & Commercial</h3>
                        <p>Spot lights, modular tracks, and low glare recessed LED panels.</p>
                        <a href="#/lighting?category=commercial" class="btn btn-outline btn-xs">View Products</a>
                    </div>
                </div>
                <!-- Smart Automation -->
                <div class="category-card" onclick="window.location.hash='#/smart-solutions'">
                    <div class="category-img-wrapper">
                        <img src="assets/smart-light.jpg" alt="Smart Home Automation">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color: var(--primary-color); text-transform:uppercase;">Innovative Systems</span>
                        <h3>Smart Lighting Solutions</h3>
                        <p>IoT automation boxes, wireless dimmers, and motion sensor links.</p>
                        <a href="#/smart-solutions" class="btn btn-outline btn-xs">View Technology</a>
                    </div>
                </div>
                <!-- Switches & Sockets -->
                <div class="category-card" onclick="window.location.hash='#/electrical?category=switches'">
                    <div class="category-img-wrapper">
                        <img src="assets/modular-switch.jpg" alt="Modular Switchboards">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color: var(--primary-color); text-transform:uppercase;">Premium Controls</span>
                        <h3>Switches & Accessories</h3>
                        <p>Tempered glass switchplates, modular boards, and heavy-duty sockets.</p>
                        <a href="#/electrical?category=switches" class="btn btn-outline btn-xs">Explore Switches</a>
                    </div>
                </div>
                <!-- Wires & Cables -->
                <div class="category-card" onclick="window.location.hash='#/electrical?category=cables'">
                    <div class="category-img-wrapper">
                        <img src="assets/electrical-cable.jpg" alt="Electric Cables">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color: var(--primary-color); text-transform:uppercase;">Essential Core</span>
                        <h3>Wires & Cables</h3>
                        <p>House wiring copper filaments, security cables, and armored heavy lines.</p>
                        <a href="#/electrical?category=cables" class="btn btn-outline btn-xs">View Cables</a>
                    </div>
                </div>
                <!-- Electrical Safety -->
                <div class="category-card" onclick="window.location.hash='#/electrical?category=protection'">
                    <div class="category-img-wrapper">
                        <img src="assets/electrical-panel.jpg" alt="Distribution Panels">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color: var(--primary-color); text-transform:uppercase;">Circuit Safety</span>
                        <h3>Electrical Safety Protection</h3>
                        <p>Distribution DBs, MCBs, RCCBs, and isolated circuit breakers.</p>
                        <a href="#/electrical?category=protection" class="btn btn-outline btn-xs">View Breakers</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Featured Collections Section -->
        <section class="section-wrapper" style="background: rgba(255, 255, 255, 0.01);">
            <div class="section-header">
                <h2>Featured Masterpieces</h2>
                <p class="section-subtitle">Exquisite designs and robust technology handpicked by our architects for premium styling.</p>
            </div>
            
            <div class="tab-navigation">
                <button class="tab-btn active" onclick="filterHomeCollection('all', this)">All Highlights</button>
                <button class="tab-btn" onclick="filterHomeCollection('premium', this)">Premium</button>
                <button class="tab-btn" onclick="filterHomeCollection('new-arrivals', this)">New Arrivals</button>
                <button class="tab-btn" onclick="filterHomeCollection('best-sellers', this)">Best Sellers</button>
            </div>

            <div class="products-grid" id="home-featured-grid">
                ${renderProductCardsHTML(products)}
            </div>
        </section>

        <!-- Dynamic Light Switch Experience Center Teaser -->
        <section class="section-wrapper">
            <div class="about-grid">
                <div class="glass-card">
                    <span style="color: var(--primary-color); font-size: 0.85rem; letter-spacing:2px; font-weight:600; text-transform:uppercase;">Interactive Showroom</span>
                    <h2 style="font-size:2.2rem; margin-top:0.5rem; margin-bottom:1.5rem;">Experience The Magic of Light</h2>
                    <p style="margin-bottom:1.5rem;">At {{CLINIC_NAME}}, we believe lighting is a language. Use our interactive light switcher in the top hero banner to preview how cozy warmth can shift into a bright contemporary workspace.</p>
                    <p style="margin-bottom:2rem;">Visit our luxurious physical gallery to touch glassmorphic touch panels, operate automatic dimming systems, and examine interior fixture details first hand.</p>
                    <a href="#/contact" class="btn btn-primary">Schedule Showroom Tour <i data-lucide="arrow-right"></i></a>
                </div>
                <div class="about-showroom-gallery">
                    <div class="about-showroom-img"><img src="assets/showroom.jpg" alt="Showroom gallery interior"></div>
                    <div class="about-showroom-img"><img src="assets/installation.jpg" alt="Professional lighting installation"></div>
                </div>
            </div>
        </section>

        <!-- Trusted Brands Slider -->
        <section class="section-wrapper" style="border-top: 1px solid var(--border-color); border-bottom: 1px solid var(--border-color);">
            <div class="section-header" style="margin-bottom: 2rem;">
                <h3 style="font-family: var(--font-body); font-size: 0.9rem; text-transform: uppercase; color: var(--text-secondary); letter-spacing: 2px;">Premium Industry Partnerships</h3>
            </div>
            <div class="brand-slider-container">
                <div class="brand-slider">
                    <!-- Triple loop for seamless infinite slide visual -->
                    ${brands.concat(brands).concat(brands).map(b => `
                        <div class="brand-logo-card">
                            <img src="${b.logo}" alt="${b.name}">
                        </div>
                    `).join('')}
                </div>
            </div>
        </section>
    `;

    // Interactive Light toggle handler
    const lightToggleBtn = document.getElementById('light-toggle-btn');
    lightToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('warm-lighting')) {
            document.body.classList.remove('warm-lighting');
            document.body.classList.add('cool-lighting');
            document.documentElement.style.setProperty('--glow-active', 'var(--glow-cool)');
        } else if (document.body.classList.contains('cool-lighting')) {
            document.body.classList.remove('cool-lighting');
            document.documentElement.style.setProperty('--glow-active', 'var(--glow-warm)');
        } else {
            document.body.classList.add('warm-lighting');
            document.documentElement.style.setProperty('--glow-active', 'var(--glow-warm)');
        }
    });
}

function renderProductCardsHTML(products) {
    if (products.length === 0) {
        return `<p style="grid-column: span 4; text-align:center; padding: 3rem; color: var(--text-secondary);">No products match your criteria.</p>`;
    }
    return products.map(p => `
        <div class="product-card">
            <div class="product-img-box">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                ${p.collection ? `<div class="product-badge">${p.collection.replaceAll('-', ' ')}</div>` : ''}
                <div class="product-actions-overlay">
                    <button onclick="openQuickView('${p.id}')" class="btn btn-primary btn-sm">Quick View</button>
                </div>
            </div>
            <div class="product-details">
                <span class="product-brand">${p.brand}</span>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-desc">${p.description.substring(0, 75)}...</p>
                <div class="product-card-footer">
                    <span class="product-spec-tag">${p.category}</span>
                    <button onclick="triggerInquiryPopup('${p.name}')" class="btn btn-outline btn-xs" style="padding:0.3rem 0.6rem;">Inquire</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterHomeCollection(colType, btn) {
    // Active class button toggle
    document.querySelectorAll('.tab-navigation .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const products = getStateItem('products').filter(p => p.featured);
    const filtered = colType === 'all' ? products : products.filter(p => p.collection === colType);
    
    document.getElementById('home-featured-grid').innerHTML = renderProductCardsHTML(filtered);
    preprocessTokens();
}

// --- 4.2 ABOUT US PAGE ---
function renderAbout() {
    app.innerHTML = `
        <section class="section-wrapper" style="padding-top: 150px;">
            <div class="about-grid">
                <div>
                    <span style="color: var(--primary-color); font-weight:600; font-size: 0.85rem; text-transform:uppercase; letter-spacing:2px;">Our Legacy</span>
                    <h1 style="font-size:3.2rem; margin-top: 0.5rem; margin-bottom: 2rem;">A Passion for Illuminating Luxury</h1>
                    <p style="font-size: 1.1rem; color: var(--text-light); margin-bottom: 1.5rem;">{{CLINIC_NAME}} was established to revolutionize residential and commercial architecture through luxury lighting aesthetics and modern electric infrastructure.</p>
                    <p style="margin-bottom:1.5rem;">We serve as the bridge between international lighting design houses, high-end switch manufacturers, and electrical safety builders. Every lighting board, switch plate, and smart sensor we exhibit is selected to optimize style, longevity, and security.</p>
                    <p style="margin-bottom: 2rem;">From the core copper filaments inside building walls to majestic crystal chandeliers illuminating grand hallways, we provide a complete engineering and aesthetic design consultation.</p>
                    
                    <div style="display:flex; gap: 2.5rem; margin-top: 3rem;">
                        <div>
                            <h3 style="font-size:2.2rem; color: var(--primary-color);">15+</h3>
                            <p style="font-size: 0.8rem; text-transform:uppercase;">Years in Architecture</p>
                        </div>
                        <div>
                            <h3 style="font-size:2.2rem; color: var(--primary-color);">2,400+</h3>
                            <p style="font-size: 0.8rem; text-transform:uppercase;">Luxury Projects</p>
                        </div>
                        <div>
                            <h3 style="font-size:2.2rem; color: var(--primary-color);">50+</h3>
                            <p style="font-size: 0.8rem; text-transform:uppercase;">Elite Brands</p>
                        </div>
                    </div>
                </div>
                <div class="about-showroom-gallery">
                    <div class="about-showroom-img"><img src="assets/showroom.jpg" alt="Showroom glass designs"></div>
                    <div class="about-showroom-img"><img src="assets/installation.jpg" alt="Light fittings inside luxury living room"></div>
                    <div class="about-showroom-img" style="grid-column: span 2; height: 260px;"><img src="assets/hero-lighting.jpg" alt="Luxury chandelier showroom display"></div>
                </div>
            </div>

            <!-- Interactive Timeline -->
            <div class="timeline-container">
                <div class="section-header" style="text-align:left; align-items:flex-start; margin-bottom: 3rem;">
                    <h2>Our Journey & Milestones</h2>
                    <p class="section-subtitle">Chronological progression of our presence as luxury lighting innovators.</p>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">2012</div>
                    <h3 style="font-size:1.15rem; font-family:var(--font-body); margin-bottom:0.5rem; color: var(--text-light);">The Foundation</h3>
                    <p>Opened a bespoke lighting store catering to architectural residential developments in New York.</p>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">2016</div>
                    <h3 style="font-size:1.15rem; font-family:var(--font-body); margin-bottom:0.5rem; color: var(--text-light);">Electrical Solutions Integration</h3>
                    <p>Partnered with tier-1 modular switch providers and fireproof cable brands to offer complete interior system blueprints.</p>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">2020</div>
                    <h3 style="font-size:1.15rem; font-family:var(--font-body); margin-bottom:0.5rem; color: var(--text-light);">Smart Home Launch</h3>
                    <p>Introduced IoT automation displays, enabling app-configured color panels and voice-activated ambient zones.</p>
                </div>
                <div class="timeline-item">
                    <div class="timeline-year">2025</div>
                    <h3 style="font-size:1.15rem; font-family:var(--font-body); margin-bottom:0.5rem; color: var(--text-light);">The Luxury Experience Center</h3>
                    <p>Designed a premium multi-category showroom for builders, interior consultants, and luxury homeowners.</p>
                </div>
            </div>
        </section>
    `;
}

// --- 4.3 CATALOG PAGE (LIGHTING / ELECTRICAL) ---
function renderCatalog(type, params) {
    const products = getStateItem('products');
    
    // Filter products by type (lighting categories are decorative, commercial, smart; electrical categories are switches, cables, protection)
    const typeCategories = type === 'lighting' ? ['decorative', 'commercial', 'smart'] : ['switches', 'cables', 'protection'];
    let filtered = products.filter(p => typeCategories.includes(p.category));

    // Filter by query parameters if present
    const categoryFilter = params.get('category');
    const subFilter = params.get('sub');
    
    if (categoryFilter) {
        filtered = filtered.filter(p => p.category === categoryFilter);
    }
    if (subFilter) {
        filtered = filtered.filter(p => p.subcategory === subFilter);
    }

    const title = type === 'lighting' ? 'Lighting Collections' : 'Electrical Products';
    const subtitle = type === 'lighting' 
        ? 'Exquisite fixtures that combine artistic visual aesthetics with contemporary energy-efficient illumination.'
        : 'Engineered switches, fire-safe armored lines, and circuit controllers compliant with standard safety regulations.';

    // Left filter sidebar (for layout aesthetics) and right grid
    app.innerHTML = `
        <section class="section-wrapper" style="padding-top: 150px;">
            <div class="section-header" style="text-align:left; align-items:flex-start; margin-bottom: 3rem;">
                <span style="color: var(--primary-color); font-weight:600; font-size:0.85rem; text-transform:uppercase; letter-spacing:2px;">Our Catalog</span>
                <h1 style="font-size:3rem; margin-top: 0.5rem;">${title}</h1>
                <p class="section-subtitle">${subtitle}</p>
            </div>

            <div class="admin-layout" style="margin-top:0; min-height:auto;">
                <!-- Catalog Filters Sidebar -->
                <aside class="admin-sidebar" style="background:transparent; padding: 0 1.5rem 0 0;">
                    <div class="admin-title-box">
                        <h2>Filter Products</h2>
                        <span>Interactive search</span>
                    </div>
                    <ul class="admin-menu" style="flex-direction:column; width:100%; gap: 0.3rem;">
                        <li><a href="#/${type}" class="admin-menu-item ${!categoryFilter ? 'active' : ''}">All Items</a></li>
                        ${type === 'lighting' ? `
                            <li><a href="#/lighting?category=decorative" class="admin-menu-item ${categoryFilter === 'decorative' ? 'active' : ''}">Decorative Lighting</a></li>
                            <li><a href="#/lighting?category=commercial" class="admin-menu-item ${categoryFilter === 'commercial' ? 'active' : ''}">LED & Commercial</a></li>
                            <li><a href="#/lighting?category=smart" class="admin-menu-item ${categoryFilter === 'smart' ? 'active' : ''}">Smart Panels</a></li>
                        ` : `
                            <li><a href="#/electrical?category=switches" class="admin-menu-item ${categoryFilter === 'switches' ? 'active' : ''}">Switches & Accessories</a></li>
                            <li><a href="#/electrical?category=cables" class="admin-menu-item ${categoryFilter === 'cables' ? 'active' : ''}">Wires & Cables</a></li>
                            <li><a href="#/electrical?category=protection" class="admin-menu-item ${categoryFilter === 'protection' ? 'active' : ''}">Electrical Safety</a></li>
                        `}
                    </ul>
                </aside>

                <!-- Products Display Area -->
                <div class="admin-content-area" style="padding: 0 0 0 2rem;">
                    <div class="products-grid" id="catalog-products-grid">
                        ${renderProductCardsHTML(filtered)}
                    </div>
                </div>
            </div>
        </section>
    `;
}

// --- 4.4 SMART SOLUTIONS PAGE ---
function renderSmartSolutions() {
    app.innerHTML = `
        <section class="section-wrapper smart-solutions-hero" style="padding-top:150px; padding-bottom:5rem;">
            <div class="about-grid">
                <div>
                    <span class="hero-badge" style="box-shadow:none;">IoT Technology</span>
                    <h1 style="font-size:3.2rem; margin-top:0.5rem; margin-bottom:1.5rem;">The Architecture of Smart Living</h1>
                    <p style="font-size: 1.15rem; color: var(--text-secondary); margin-bottom: 2rem;">Seamlessly synchronize lighting tones, luxury touch switches, motion safety sensors, and energy-management panels under a unified automated network.</p>
                    <a href="#/contact?inquiry=Smart%20Home%20Consultation" class="btn btn-primary">Book Consultation</a>
                </div>
                <div>
                    <img src="assets/smart-light.jpg" alt="Smart lighting automation" style="border-radius: var(--border-radius); border: 1px solid var(--border-color); box-shadow: var(--glow-active);">
                </div>
            </div>
        </section>

        <!-- Interactive IoT features -->
        <section class="section-wrapper">
            <div class="section-header">
                <h2>Smart Home Integrations</h2>
                <p class="section-subtitle">Operate your entire household via voice controllers, automatic triggers, and preset ambient profiles.</p>
            </div>
            
            <div class="features-list-grid">
                <div class="smart-features-group">
                    <div class="smart-feature-item">
                        <div class="smart-feature-icon"><i data-lucide="sun"></i></div>
                        <div class="smart-feature-text">
                            <h3>Circadian Rhythm Tuning</h3>
                            <p>Automatically adjust light color temperatures from cool daylight at noon to a warm cozy glow at sunset to regulate bio-rhythms.</p>
                        </div>
                    </div>
                    <div class="smart-feature-item">
                        <div class="smart-feature-icon"><i data-lucide="smartphone"></i></div>
                        <div class="smart-feature-text">
                            <h3>Mobile App Control</h3>
                            <p>Manage modular circuit channels, adjust brightness levels, and check safety load limits anywhere in the world.</p>
                        </div>
                    </div>
                    <div class="smart-feature-item">
                        <div class="smart-feature-icon"><i data-lucide="mic"></i></div>
                        <div class="smart-feature-text">
                            <h3>Smart Voice Synchronization</h3>
                            <p>Full hands-free controls integrated directly with Amazon Alexa, Apple HomeKit, and Google Assistant.</p>
                        </div>
                    </div>
                </div>
                
                <div class="smart-features-group">
                    <div class="smart-feature-item">
                        <div class="smart-feature-icon"><i data-lucide="eye"></i></div>
                        <div class="smart-feature-text">
                            <h3>Motion-Activated Paths</h3>
                            <p>Soft low-glow stair lighting activates automatically upon sensing movement during late nights, preserving visual comfort.</p>
                        </div>
                    </div>
                    <div class="smart-feature-item">
                        <div class="smart-feature-icon"><i data-lucide="shield-check"></i></div>
                        <div class="smart-feature-text">
                            <h3>Automated Safety Defenses</h3>
                            <p>Smart DB panels isolate overloaded circuits instantly and send alert notifications directly to your phone if voltage drifts.</p>
                        </div>
                    </div>
                    <div class="smart-feature-item">
                        <div class="smart-feature-icon"><i data-lucide="zap"></i></div>
                        <div class="smart-feature-text">
                            <h3>Eco Energy Monitors</h3>
                            <p>Track real-time energy usage graphs per appliance to identify energy leaks and conserve monthly utility expenditures.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// --- 4.5 PROJECTS & GALLERY PAGE ---
function renderGallery() {
    const projects = getStateItem('projects');

    app.innerHTML = `
        <section class="section-wrapper" style="padding-top:150px;">
            <div class="section-header">
                <span style="color:var(--primary-color); font-weight:600; font-size:0.85rem; text-transform:uppercase; letter-spacing:2px;">Gallery Portfolio</span>
                <h2>Completed Projects</h2>
                <p class="section-subtitle">Step into luxury. A visual archive of residential villas, showroom centers, and smart home installations completed by our team.</p>
            </div>

            <!-- Filter Buttons -->
            <div class="gallery-filters">
                <button class="tab-btn active" onclick="filterGallery('all', this)">All Projects</button>
                <button class="tab-btn" onclick="filterGallery('residential', this)">Residential</button>
                <button class="tab-btn" onclick="filterGallery('commercial', this)">Commercial</button>
                <button class="tab-btn" onclick="filterGallery('showroom', this)">Showroom</button>
                <button class="tab-btn" onclick="filterGallery('smart', this)">Smart Home</button>
                <button class="tab-btn" onclick="filterGallery('outdoor', this)">Outdoor</button>
            </div>

            <!-- Gallery Masonry Grid -->
            <div class="gallery-grid" id="gallery-masonry">
                ${renderGalleryCardsHTML(projects)}
            </div>

            <!-- Before/After Interactivity Show -->
            <div class="section-header" style="margin-top: 6rem; margin-bottom: 2rem;">
                <h2>Aesthetic Transformation</h2>
                <p class="section-subtitle">Slide the selector to preview the visual contrast between unlit, flat workspace panels and our bespoke warm-layered lighting solutions.</p>
            </div>
            
            <div class="ba-slider-wrapper" id="ba-slider">
                <div class="ba-slider-img ba-slider-before">
                    <img src="assets/modern-living-light.jpg" alt="After Lumina Lux Installation">
                </div>
                <div class="ba-slider-img ba-slider-after" id="ba-after-layer">
                    <img src="assets/hero-lighting.jpg" alt="Before Lumina Lux (Flat office light)">
                </div>
                <div class="ba-slider-handle" id="ba-slider-handle">
                    <div class="ba-slider-button"><i data-lucide="arrow-left-right" style="width:18px; height:18px;"></i></div>
                </div>
            </div>
        </section>
    `;

    setupBeforeAfterSlider();
}

function renderGalleryCardsHTML(projects) {
    if (projects.length === 0) {
        return `<p style="grid-column: span 3; text-align:center; padding: 3rem; color: var(--text-secondary);">No project media found.</p>`;
    }
    return projects.map(p => `
        <div class="gallery-card" onclick="openLightbox('${p.image}', '${p.title} - ${p.desc}')">
            <img src="${p.image}" alt="${p.title}" loading="lazy">
            <div class="gallery-card-overlay">
                <h4>${p.title}</h4>
                <p>${p.category.toUpperCase()} PROJECT</p>
            </div>
        </div>
    `).join('');
}

function filterGallery(category, btn) {
    document.querySelectorAll('.gallery-filters .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const projects = getStateItem('projects');
    const filtered = category === 'all' ? projects : projects.filter(p => p.category === category);
    document.getElementById('gallery-masonry').innerHTML = renderGalleryCardsHTML(filtered);
    preprocessTokens();
}

function setupBeforeAfterSlider() {
    const slider = document.getElementById('ba-slider');
    const afterLayer = document.getElementById('ba-after-layer');
    const handle = document.getElementById('ba-slider-handle');

    if (!slider) return;

    function moveSlider(clientX) {
        const rect = slider.getBoundingClientRect();
        const position = ((clientX - rect.left) / rect.width) * 100;
        
        if (position >= 0 && position <= 100) {
            afterLayer.style.clipPath = `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`;
            handle.style.left = `${position}%`;
        }
    }

    slider.addEventListener('mousemove', (e) => {
        moveSlider(e.clientX);
    });

    slider.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            moveSlider(e.touches[0].clientX);
        }
    });
}

// --- 4.6 TESTIMONIALS PAGE ---
function renderTestimonials() {
    const reviews = getStateItem('testimonials');
    app.innerHTML = `
        <section class="section-wrapper" style="padding-top:150px;">
            <div class="section-header">
                <span style="color:var(--primary-color); font-weight:600; font-size:0.85rem; text-transform:uppercase; letter-spacing:2px;">Reviews</span>
                <h2>Client Testimonials</h2>
                <p class="section-subtitle">Read feedback from renowned architects, contractors, and luxury house owners regarding our product efficiency.</p>
            </div>

            <!-- Sliding Testimonial Showcase -->
            <div class="testimonial-carousel-container">
                <button class="testimonial-nav-btn testimonial-prev-btn" id="test-prev"><i data-lucide="chevron-left"></i></button>
                
                <div class="testimonial-track-wrapper">
                    <div class="testimonial-track" id="testimonial-track">
                        ${reviews.map(r => `
                            <div class="testimonial-slide">
                                <div class="testimonial-card-content">
                                    <div style="color: var(--primary-color); margin-bottom:1.5rem;">
                                        ${Array(r.rating).fill('<i data-lucide="star" style="fill:var(--primary-color); width:20px; height:20px;"></i>').join('')}
                                    </div>
                                    <p>"${r.review}"</p>
                                    <div class="testimonial-user">
                                        <img src="${r.avatar}" alt="${r.name}" class="testimonial-avatar">
                                        <div class="testimonial-user-info">
                                            <h4>${r.name}</h4>
                                            <span>${r.type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <button class="testimonial-nav-btn testimonial-next-btn" id="test-next"><i data-lucide="chevron-right"></i></button>
            </div>
        </section>
    `;

    setupTestimonialCarousel();
}

function setupTestimonialCarousel() {
    const track = document.getElementById('testimonial-track');
    const prev = document.getElementById('test-prev');
    const next = document.getElementById('test-next');
    const slides = document.querySelectorAll('.testimonial-slide');
    
    if (!track || slides.length === 0) return;

    let index = 0;

    function updateSlide() {
        track.style.transform = `translateX(-${index * 100}%)`;
    }

    prev.addEventListener('click', () => {
        index = index === 0 ? slides.length - 1 : index - 1;
        updateSlide();
    });

    next.addEventListener('click', () => {
        index = index === slides.length - 1 ? 0 : index + 1;
        updateSlide();
    });
}

// --- 4.7 BLOG PAGE ---
function renderBlog() {
    const blogs = getStateItem('blogs');
    app.innerHTML = `
        <section class="section-wrapper" style="padding-top:150px;">
            <div class="section-header">
                <span style="color:var(--primary-color); font-weight:600; font-size:0.85rem; text-transform:uppercase; letter-spacing:2px;">Design Magazine</span>
                <h2>Inspiration & Safety Guides</h2>
                <p class="section-subtitle">Insights from top lighting specialists on selecting luxury fittings, smart load balancing, and design standards.</p>
            </div>

            <div class="blog-grid">
                ${blogs.map(b => `
                    <article class="blog-card">
                        <div class="blog-img-box">
                            <img src="${b.image}" alt="${b.title}" loading="lazy">
                        </div>
                        <div class="blog-content">
                            <div class="blog-meta">
                                <span><i data-lucide="user" style="width:12px; height:12px;"></i> ${b.author}</span>
                                <span><i data-lucide="calendar" style="width:12px; height:12px;"></i> ${b.date}</span>
                            </div>
                            <h3 class="blog-title">${b.title}</h3>
                            <p class="blog-excerpt">${b.excerpt}</p>
                            <a href="#" class="blog-readmore" onclick="alert('Blog details integration is mock-rendered in this template version.'); return false;">Read Full Article <i data-lucide="arrow-right" style="width:14px; height:14px;"></i></a>
                        </div>
                    </article>
                `).join('')}
            </div>
        </section>
    `;
}

// --- 4.8 CONTACT PAGE ---
function renderContact() {
    // Check if inquiry was passed in url search parameter
    const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
    const prefilledProduct = urlParams.get('inquiry') || '';

    app.innerHTML = `
        <section class="section-wrapper" style="padding-top:150px;">
            <div class="section-header">
                <span style="color:var(--primary-color); font-weight:600; font-size:0.85rem; text-transform:uppercase; letter-spacing:2px;">Connect With Us</span>
                <h2>Visit Our Experience Center</h2>
                <p class="section-subtitle">Schedule a physical showroom visit, book an electrical layout design consultation, or request technical product details.</p>
            </div>

            <div class="contact-grid">
                <!-- Contact card column -->
                <div class="contact-card-box">
                    <div class="contact-info-card">
                        <i data-lucide="map-pin" style="width:28px; height:28px;"></i>
                        <div>
                            <h4>Showroom Location</h4>
                            <p>{{ADDRESS}}</p>
                        </div>
                    </div>
                    <div class="contact-info-card">
                        <i data-lucide="phone" style="width:28px; height:28px;"></i>
                        <div>
                            <h4>Phone Inquiry</h4>
                            <p><a href="tel:{{PHONE}}" style="color: var(--primary-color); font-weight:600;">{{PHONE}}</a></p>
                            <p style="font-size:0.8rem; color: var(--text-muted);">Mon - Sat: 9:00 AM - 7:00 PM</p>
                        </div>
                    </div>
                    <div class="contact-info-card">
                        <i data-lucide="mail" style="width:28px; height:28px;"></i>
                        <div>
                            <h4>Official Mailbox</h4>
                            <p>info@{{CLINIC_NAME}}.com</p>
                            <p>sales@{{CLINIC_NAME}}.com</p>
                        </div>
                    </div>

                    <!-- Map Mock box -->
                    <div class="map-placeholder">
                        <i data-lucide="map" style="width:40px; height:40px; color: var(--primary-color);"></i>
                        <span style="font-weight:600; color: var(--text-light);">Showroom Location Map</span>
                        <p style="font-size:0.8rem; text-align:center; padding:0 2rem;">Google Maps display placeholder loaded inside architectural grid.</p>
                    </div>
                </div>

                <!-- Contact Form column -->
                <div class="glass-card">
                    <h3 style="font-size: 1.5rem; margin-bottom: 2rem; font-family: var(--font-body); font-weight: 600;">Showroom Inquiry Form</h3>
                    <form id="showroom-inquiry-form" class="contact-form">
                        <div class="form-group">
                            <label for="c-name">Full Name *</label>
                            <input type="text" id="c-name" class="form-input" required placeholder="Alexander Sterling">
                        </div>
                        <div class="form-group">
                            <label for="c-email">Email Address *</label>
                            <input type="email" id="c-email" class="form-input" required placeholder="alex@gmail.com">
                        </div>
                        <div class="form-group">
                            <label for="c-phone">Phone Number *</label>
                            <input type="tel" id="c-phone" class="form-input" required placeholder="{{PHONE}}">
                        </div>
                        <div class="form-group">
                            <label for="c-product">Product Interest / Subject</label>
                            <input type="text" id="c-product" class="form-input" value="${prefilledProduct}" placeholder="Imperial Ring Chandelier / Smart Automation">
                        </div>
                        <div class="form-group full-width">
                            <label for="c-msg">Inquiry Details *</label>
                            <textarea id="c-msg" class="form-input" rows="5" required placeholder="State your sizing requirements or project specifications..."></textarea>
                        </div>
                        <div class="form-group full-width" style="margin-top: 1rem;">
                            <button type="submit" class="btn btn-primary" style="width:100%;">Submit Inquiry & Notify Admin</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    `;

    setupInquiryFormHandler();
}

function setupInquiryFormHandler() {
    const form = document.getElementById('showroom-inquiry-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('c-name').value;
        const email = document.getElementById('c-email').value;
        const phone = document.getElementById('c-phone').value;
        const product = document.getElementById('c-product').value || 'General Showroom Visit';
        const msg = document.getElementById('c-msg').value;

        const inquiries = getStateItem('inquiries');
        const newInq = {
            id: 'inq-' + (Date.now()),
            name: name,
            email: email,
            phone: phone,
            product: product,
            message: msg,
            status: 'new',
            date: new Date().toISOString().split('T')[0]
        };

        inquiries.unshift(newInq);
        setStateItem('inquiries', inquiries);

        alert(`Thank you, ${name}! Your inquiry regarding "${product}" has been registered in the CMS backend. Our architects will contact you shortly.`);
        form.reset();
    });
}

// ==========================================================================
// 5. ADMIN PORTAL / CMS CONTROLLER
// ==========================================================================

// Current sub-view in the admin dashboard: 'dashboard', 'products', 'inquiries', 'settings'
let adminActiveView = 'dashboard';

function renderAdmin() {
    // Check if logged in
    const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

    if (!isLoggedIn) {
        renderAdminLogin();
        return;
    }

    renderAdminDashboardLayout();
}

function renderAdminLogin() {
    app.innerHTML = `
        <section class="admin-login-wrapper">
            <div class="glass-card login-card">
                <div class="login-header">
                    <i data-lucide="lock" style="width:40px; height:40px; color: var(--primary-color); margin-bottom:1rem;"></i>
                    <h2>Admin CMS Portal</h2>
                    <p>Enter administrative credentials to manage product inventory and view customer showroom requests.</p>
                </div>
                <form id="admin-login-form" class="login-form">
                    <div class="form-group">
                        <label for="a-user">Username</label>
                        <input type="text" id="a-user" class="form-input" required placeholder="admin" value="admin">
                    </div>
                    <div class="form-group">
                        <label for="a-pass">Password</label>
                        <input type="password" id="a-pass" class="form-input" required placeholder="••••••••" value="admin123">
                    </div>
                    <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">Authenticate</button>
                    <p style="font-size:0.75rem; text-align:center; color: var(--text-muted);">Demo defaults: admin / admin123</p>
                </form>
            </div>
        </section>
    `;

    const form = document.getElementById('admin-login-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('a-user').value;
        const pass = document.getElementById('a-pass').value;

        if (user === 'admin' && pass === 'admin123') {
            sessionStorage.setItem('admin_logged_in', 'true');
            renderAdminDashboardLayout();
        } else {
            alert('Invalid credentials. Use admin / admin123');
        }
    });
}

function renderAdminDashboardLayout() {
    app.innerHTML = `
        <div class="admin-layout">
            <!-- Admin Dashboard Sidebar -->
            <aside class="admin-sidebar">
                <div class="admin-title-box">
                    <h2>Aura Control</h2>
                    <span>CMS Panel</span>
                </div>
                <ul class="admin-menu">
                    <li><a href="#" class="admin-menu-item ${adminActiveView === 'dashboard' ? 'active' : ''}" onclick="switchAdminView('dashboard'); return false;"><i data-lucide="layout-dashboard"></i> Dashboard</a></li>
                    <li><a href="#" class="admin-menu-item ${adminActiveView === 'products' ? 'active' : ''}" onclick="switchAdminView('products'); return false;"><i data-lucide="shopping-bag"></i> Products</a></li>
                    <li><a href="#" class="admin-menu-item ${adminActiveView === 'inquiries' ? 'active' : ''}" onclick="switchAdminView('inquiries'); return false;"><i data-lucide="inbox"></i> Inquiries</a></li>
                    <li><a href="#" class="admin-menu-item ${adminActiveView === 'settings' ? 'active' : ''}" onclick="switchAdminView('settings'); return false;"><i data-lucide="settings"></i> Theme Settings</a></li>
                    <li style="margin-top: 4rem;"><a href="#" class="admin-menu-item" onclick="logoutAdmin(); return false;" style="color:#f87171;"><i data-lucide="log-out"></i> Logout</a></li>
                </ul>
            </aside>

            <!-- Admin Display panel -->
            <div class="admin-content-area" id="admin-subview-panel">
                <!-- Populated dynamically by sub-view routers -->
            </div>
        </div>
    `;

    renderAdminSubview();
    if (window.lucide) lucide.createIcons();
}

function switchAdminView(view) {
    adminActiveView = view;
    renderAdminDashboardLayout();
}

function logoutAdmin() {
    sessionStorage.removeItem('admin_logged_in');
    window.location.hash = '#/';
}

// Sub view router for dashboard content
function renderAdminSubview() {
    const container = document.getElementById('admin-subview-panel');
    if (!container) return;

    switch(adminActiveView) {
        case 'dashboard':
            renderCMSDashboard(container);
            break;
        case 'products':
            renderCMSProducts(container);
            break;
        case 'inquiries':
            renderCMSInquiries(container);
            break;
        case 'settings':
            renderCMSSettings(container);
            break;
    }
}

// --- 5.1 ADMIN: CORE DASHBOARD SUMMARY ---
function renderCMSDashboard(container) {
    const products = getStateItem('products');
    const inquiries = getStateItem('inquiries');
    const brands = getStateItem('brands');
    const projects = getStateItem('projects');

    container.innerHTML = `
        <div class="admin-header-row">
            <div>
                <h1 style="font-size:2.2rem; margin-bottom:0.5rem;">Showroom Overview</h1>
                <p>Welcome back, Administrator. Realtime database diagnostics are loaded below.</p>
            </div>
        </div>

        <div class="admin-stats-grid">
            <div class="admin-stat-card">
                <div class="stat-icon"><i data-lucide="shopping-bag"></i></div>
                <div class="stat-info">
                    <h4>Total Products</h4>
                    <span>${products.length}</span>
                </div>
            </div>
            <div class="admin-stat-card">
                <div class="stat-icon"><i data-lucide="inbox"></i></div>
                <div class="stat-info">
                    <h4>Active Requests</h4>
                    <span>${inquiries.filter(i => i.status === 'new').length}</span>
                </div>
            </div>
            <div class="admin-stat-card">
                <div class="stat-icon"><i data-lucide="palette"></i></div>
                <div class="stat-info">
                    <h4>Brands Active</h4>
                    <span>${brands.length}</span>
                </div>
            </div>
            <div class="admin-stat-card">
                <div class="stat-icon"><i data-lucide="image"></i></div>
                <div class="stat-info">
                    <h4>Gallery Media</h4>
                    <span>${projects.length}</span>
                </div>
            </div>
        </div>

        <h2 style="font-size:1.5rem; margin-bottom:1.5rem; margin-top:2rem;">Recent Showroom Requests</h2>
        <div class="admin-table-wrapper">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Client Name</th>
                        <th>Interest Subject</th>
                        <th>Date Received</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${inquiries.slice(0, 5).map(i => `
                        <tr>
                            <td><strong>${i.name}</strong><br><small>${i.phone}</small></td>
                            <td>${i.product}</td>
                            <td>${i.date}</td>
                            <td><span class="badge-status status-${i.status}">${i.status}</span></td>
                            <td><button onclick="switchAdminView('inquiries')" class="btn btn-outline btn-xs">Manage</button></td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

// --- 5.2 ADMIN: PRODUCTS CRUD ---
function renderCMSProducts(container) {
    const products = getStateItem('products');

    container.innerHTML = `
        <div class="admin-header-row">
            <div>
                <h1 style="font-size:2.2rem; margin-bottom:0.5rem;">Catalog Inventory</h1>
                <p>Manage decorative chandelier details, tracklight specifications, and cable security certifications.</p>
            </div>
            <button onclick="openAddProductModal()" class="btn btn-primary"><i data-lucide="plus"></i> Add New Product</button>
        </div>

        <div class="admin-table-wrapper">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Visual</th>
                        <th>Name</th>
                        <th>Brand</th>
                        <th>Category</th>
                        <th>Featured</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${products.map(p => `
                        <tr>
                            <td><img src="${p.image}" class="admin-table-img" alt="${p.name}"></td>
                            <td><strong>${p.name}</strong><br><small>${p.subcategory}</small></td>
                            <td>${p.brand}</td>
                            <td><span class="badge-status" style="background:rgba(255,255,255,0.05); color:#fff;">${p.category}</span></td>
                            <td>${p.featured ? '<span style="color:#34d399;"><i data-lucide="check-circle" style="width:16px; height:16px;"></i> Yes</span>' : '<span style="color:var(--text-muted);">No</span>'}</td>
                            <td>
                                <div class="table-actions">
                                    <button onclick="deleteProduct('${p.id}')" class="btn btn-outline btn-xs" style="color:#f87171; border-color:rgba(248,113,113,0.2);"><i data-lucide="trash-2" style="width:14px; height:14px;"></i> Delete</button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>

        <!-- Add Product Inline Form Overlay (Dynamic Modal container) -->
        <div class="modal" id="add-product-modal">
            <div class="modal-content glass-card" style="max-width:600px;">
                <button class="modal-close" onclick="document.getElementById('add-product-modal').classList.remove('open')"><i data-lucide="x"></i></button>
                <h2 style="font-size:1.5rem; margin-bottom:1.5rem; border:none;">Register Product in Showroom</h2>
                <form id="add-product-form" class="contact-form">
                    <div class="form-group">
                        <label for="p-name">Product Name *</label>
                        <input type="text" id="p-name" class="form-input" required placeholder="e.g. Venus Pendant Light">
                    </div>
                    <div class="form-group">
                        <label for="p-brand">Brand Maker *</label>
                        <input type="text" id="p-brand" class="form-input" required placeholder="e.g. Lumina Lux">
                    </div>
                    <div class="form-group">
                        <label for="p-category">Main Category *</label>
                        <select id="p-category" class="form-input" style="background:#0F1115;" required>
                            <option value="decorative">Decorative Lighting</option>
                            <option value="commercial">LED & Commercial</option>
                            <option value="smart">Smart Lighting</option>
                            <option value="switches">Switches & Accessories</option>
                            <option value="cables">Wires & Cables</option>
                            <option value="protection">Electrical Safety</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="p-subcat">Subcategory *</label>
                        <input type="text" id="p-subcat" class="form-input" required placeholder="e.g. chandeliers / wiring / mcbs">
                    </div>
                    <div class="form-group">
                        <label for="p-image">Local Asset Image File Path *</label>
                        <select id="p-image" class="form-input" style="background:#0F1115;" required>
                            <option value="assets/chandelier.jpg">assets/chandelier.jpg</option>
                            <option value="assets/decorative-lamp.jpg">assets/decorative-lamp.jpg</option>
                            <option value="assets/led-light.jpg">assets/led-light.jpg</option>
                            <option value="assets/modular-switch.jpg">assets/modular-switch.jpg</option>
                            <option value="assets/electrical-cable.jpg">assets/electrical-cable.jpg</option>
                            <option value="assets/electrical-panel.jpg">assets/electrical-panel.jpg</option>
                            <option value="assets/smart-light.jpg">assets/smart-light.jpg</option>
                            <option value="assets/modern-living-light.jpg">assets/modern-living-light.jpg</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="p-featured">Featured Showcase</label>
                        <select id="p-featured" class="form-input" style="background:#0F1115;">
                            <option value="false">No</option>
                            <option value="true">Yes, Display on Home Page</option>
                        </select>
                    </div>
                    <div class="form-group full-width">
                        <label for="p-desc">Brief Description *</label>
                        <textarea id="p-desc" class="form-input" rows="3" required placeholder="Describe styling features, luxury feeling, or load protection limits..."></textarea>
                    </div>
                    
                    <h4 style="grid-column: span 2; margin-top:1rem; font-size:1rem;">Technical Specifications</h4>
                    <div class="form-group">
                        <label for="spec-k1">Spec Name 1</label>
                        <input type="text" id="spec-k1" class="form-input" placeholder="e.g. Voltage">
                    </div>
                    <div class="form-group">
                        <label for="spec-v1">Spec Value 1</label>
                        <input type="text" id="spec-v1" class="form-input" placeholder="e.g. 240V">
                    </div>
                    <div class="form-group">
                        <label for="spec-k2">Spec Name 2</label>
                        <input type="text" id="spec-k2" class="form-input" placeholder="e.g. Material">
                    </div>
                    <div class="form-group">
                        <label for="spec-v2">Spec Value 2</label>
                        <input type="text" id="spec-v2" class="form-input" placeholder="e.g. Copper core">
                    </div>

                    <div class="form-group full-width" style="margin-top: 1rem;">
                        <button type="submit" class="btn btn-primary" style="width:100%;">Save Product to Database</button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function openAddProductModal() {
    const modal = document.getElementById('add-product-modal');
    modal.classList.add('open');

    const form = document.getElementById('add-product-form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('p-name').value;
        const brand = document.getElementById('p-brand').value;
        const cat = document.getElementById('p-category').value;
        const subcat = document.getElementById('p-subcat').value;
        const img = document.getElementById('p-image').value;
        const feat = document.getElementById('p-featured').value === 'true';
        const desc = document.getElementById('p-desc').value;
        
        const specK1 = document.getElementById('spec-k1').value;
        const specV1 = document.getElementById('spec-v1').value;
        const specK2 = document.getElementById('spec-k2').value;
        const specV2 = document.getElementById('spec-v2').value;

        const specs = {};
        if (specK1 && specV1) specs[specK1] = specV1;
        if (specK2 && specV2) specs[specK2] = specV2;

        const products = getStateItem('products');
        const newProduct = {
            id: 'prod-' + Date.now(),
            name: name,
            brand: brand,
            category: cat,
            subcategory: subcat,
            collection: feat ? 'new-arrivals' : '',
            image: img,
            description: desc,
            specifications: specs,
            featured: feat
        };

        products.unshift(newProduct);
        setStateItem('products', products);

        modal.classList.remove('open');
        renderCMSProducts(document.getElementById('admin-subview-panel'));
        if (window.lucide) lucide.createIcons();
    });
}

function deleteProduct(id) {
    if (!confirm('Are you sure you want to remove this product from the catalog?')) return;
    
    let products = getStateItem('products');
    products = products.filter(p => p.id !== id);
    setStateItem('products', products);
    
    renderCMSProducts(document.getElementById('admin-subview-panel'));
    if (window.lucide) lucide.createIcons();
}

// --- 5.3 ADMIN: INQUIRIES MANAGEMENT ---
function renderCMSInquiries(container) {
    const inquiries = getStateItem('inquiries');

    container.innerHTML = `
        <div class="admin-header-row">
            <div>
                <h1 style="font-size:2.2rem; margin-bottom:0.5rem;">Customer Inquiries</h1>
                <p>Track showroom visit dates, layout estimation requests, and product purchase orders.</p>
            </div>
            <button onclick="exportInquiries()" class="btn btn-outline"><i data-lucide="download"></i> Export Data (JSON)</button>
        </div>

        <div class="admin-table-wrapper">
            <table class="admin-table">
                <thead>
                    <tr>
                        <th>Client Details</th>
                        <th>Interest Item</th>
                        <th>Message Notes</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    ${inquiries.map(i => `
                        <tr>
                            <td>
                                <strong>${i.name}</strong><br>
                                <small>${i.email}</small><br>
                                <small>${i.phone}</small>
                            </td>
                            <td>${i.product}</td>
                            <td style="max-width: 250px; font-size:0.8rem;">${i.message}</td>
                            <td>${i.date}</td>
                            <td>
                                <select onchange="updateInquiryStatus('${i.id}', this.value)" class="form-input" style="padding:0.25rem 0.5rem; font-size:0.8rem; background:#0F1115; border-radius:15px; border-color: rgba(255,255,255,0.1);">
                                    <option value="new" ${i.status === 'new' ? 'selected' : ''}>New</option>
                                    <option value="contacted" ${i.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                                    <option value="suggested" ${i.status === 'suggested' ? 'selected' : ''}>Suggested</option>
                                    <option value="converted" ${i.status === 'converted' ? 'selected' : ''}>Converted</option>
                                </select>
                            </td>
                            <td>
                                <button onclick="deleteInquiry('${i.id}')" class="btn btn-outline btn-xs" style="color:#f87171; border-color:rgba(248,113,113,0.1);"><i data-lucide="trash-2" style="width:12px; height:12px;"></i></button>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

function updateInquiryStatus(id, newStatus) {
    const inquiries = getStateItem('inquiries');
    const item = inquiries.find(i => i.id === id);
    if (item) {
        item.status = newStatus;
        setStateItem('inquiries', inquiries);
        alert(`Inquiry status updated to "${newStatus.toUpperCase()}"`);
    }
}

function deleteInquiry(id) {
    if (!confirm('Permanently delete this customer record?')) return;
    
    let inquiries = getStateItem('inquiries');
    inquiries = inquiries.filter(i => i.id !== id);
    setStateItem('inquiries', inquiries);

    renderCMSInquiries(document.getElementById('admin-subview-panel'));
    if (window.lucide) lucide.createIcons();
}

function exportInquiries() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(getStateItem('inquiries'), null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href",     dataStr     );
    dlAnchorElem.setAttribute("download", "inquiries_export.json");
    dlAnchorElem.click();
}

// --- 5.4 ADMIN: SITE SETTINGS & THEMES ---
function renderCMSSettings(container) {
    const currentPrimary = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim();
    const currentName = localStorage.getItem('cms_clinic_name') || 'Aura Lighting & Electrical';

    container.innerHTML = `
        <div class="admin-header-row">
            <div>
                <h1 style="font-size:2.2rem; margin-bottom:0.5rem;">CMS Theme Settings</h1>
                <p>Fine-tune primary showroom branding details and accent colors directly using live token configurations.</p>
            </div>
        </div>

        <div class="glass-card" style="max-width:600px;">
            <form id="theme-settings-form" class="login-form">
                <div class="form-group">
                    <label for="set-name">Dynamic Brand Name ({{CLINIC_NAME}})</label>
                    <input type="text" id="set-name" class="form-input" value="${currentName}" required>
                </div>
                <div class="form-group">
                    <label for="set-color">Primary Theme Color ({{PRIMARY_COLOR}})</label>
                    <div style="display:flex; gap:1rem; align-items:center;">
                        <input type="color" id="set-color-picker" class="form-input" style="width: 60px; height: 44px; padding:2px; cursor:pointer;" value="${currentPrimary}">
                        <input type="text" id="set-color-hex" class="form-input" style="flex-grow:1;" value="${currentPrimary}" required>
                    </div>
                </div>
                <div class="form-group" style="margin-top: 1rem;">
                    <button type="submit" class="btn btn-primary">Save System Config</button>
                    <button type="button" onclick="resetCMSSystem()" class="btn btn-outline" style="border-color: #f87171; color: #f87171;">Factory Reset Database</button>
                </div>
            </form>
        </div>
    `;

    const form = document.getElementById('theme-settings-form');
    const colorPicker = document.getElementById('set-color-picker');
    const colorHex = document.getElementById('set-color-hex');

    colorPicker.addEventListener('input', () => {
        colorHex.value = colorPicker.value;
    });

    colorHex.addEventListener('input', () => {
        if (/^#[0-9A-F]{6}$/i.test(colorHex.value)) {
            colorPicker.value = colorHex.value;
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newColor = colorHex.value;
        const newName = document.getElementById('set-name').value;

        localStorage.setItem('cms_primary_color', newColor);
        localStorage.setItem('cms_clinic_name', newName);

        // Update css variable in realtime
        document.documentElement.style.setProperty('--primary-color', newColor);
        
        // Refresh token replacements in UI
        alert('Site config successfully saved! Refreshing layouts...');
        window.location.reload();
    });
}

function resetCMSSystem() {
    if (!confirm('This action will clear all modifications and inquiries. Re-seed default showroom database?')) return;
    localStorage.clear();
    sessionStorage.clear();
    alert('Local Storage successfully flushed. Refreshing page...');
    window.location.hash = '#/';
    window.location.reload();
}
