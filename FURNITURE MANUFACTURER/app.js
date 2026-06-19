/**
 * Velluto Luxury Furniture Template Core Engine & CMS Router
 */

// ==========================================================================
// 1. DYNAMIC TOKEN REPROCESSOR
// ==========================================================================
function preprocessTokens() {
    const defaultTokens = {
        '{{CLINIC_NAME}}': 'Velluto Studio',
        '{{PHONE}}': '+1 (800) 424-9980',
        '{{ADDRESS}}': '45 luxury Avenue, Suite 12, Manhattan, NY 10001',
        '{{LOGO_URL}}': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=120&h=120&q=80',
        '{{PRIMARY_COLOR}}': '#c5a880' // Luxury warm champagne gold
    };

    // Get current values from local storage or fall back to defaults
    const clinicName = localStorage.getItem('cms_clinic_name') || defaultTokens['{{CLINIC_NAME}}'];
    const phone = localStorage.getItem('cms_phone') || defaultTokens['{{PHONE}}'];
    const address = localStorage.getItem('cms_address') || defaultTokens['{{ADDRESS}}'];
    const logoUrl = localStorage.getItem('cms_logo_url') || defaultTokens['{{LOGO_URL}}'];
    const primaryColor = localStorage.getItem('cms_primary_color') || defaultTokens['{{PRIMARY_COLOR}}'];

    // Instantly inject the color variable
    document.documentElement.style.setProperty('--primary-color', primaryColor);

    const replacements = {
        '{{CLINIC_NAME}}': clinicName,
        '{{PHONE}}': phone,
        '{{ADDRESS}}': address,
        '{{LOGO_URL}}': logoUrl,
        '{{PRIMARY_COLOR}}': primaryColor
    };

    // Helper to recursively swap tokens in DOM nodes
    function replaceInNode(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let val = node.nodeValue;
            let replaced = false;
            for (const [token, value] of Object.entries(replacements)) {
                if (val.includes(token)) {
                    val = val.replaceAll(token, value);
                    replaced = true;
                }
            }
            if (replaced) node.nodeValue = val;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            // Attributes (href, src, alt, placeholder)
            for (const attr of ['href', 'src', 'alt', 'placeholder', 'title']) {
                if (node.hasAttribute(attr)) {
                    let val = node.getAttribute(attr);
                    let replaced = false;
                    for (const [token, value] of Object.entries(replacements)) {
                        if (val.includes(token)) {
                            val = val.replaceAll(token, value);
                            replaced = true;
                        }
                    }
                    if (replaced) node.setAttribute(attr, val);
                }
            }
            // Recurse children
            for (let child = node.firstChild; child; child = child.nextSibling) {
                replaceInNode(child);
            }
        }
    }

    replaceInNode(document.head);
    replaceInNode(document.body);
}

// ==========================================================================
// 2. STATE STORAGE & SEED DATABASE
// ==========================================================================
const SEED_DATA = {
    products: [
        {
            id: 'prod-1',
            name: 'Aura Velvet Sectional Sofa',
            brand: 'Velluto Signature',
            category: 'living',
            subcategory: 'sofas',
            collection: 'premium',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
            description: 'Sumptuous deep sectional upholstered in rich emerald Italian velvet. Features handcrafted solid ash frame support structures and plush down-blend feathers.',
            specifications: {
                'Dimensions': '112" W x 65" D x 34" H',
                'Material': 'Italian Velvet & Ash Hardwood',
                'Cushion Fill': 'High-density Foam with Down Feathers',
                'Color Options': 'Emerald, Navy, Amber, Charcoal'
            },
            featured: true
        },
        {
            id: 'prod-2',
            name: 'Nordic Bouclé Lounge Chair',
            brand: 'Elysian Line',
            category: 'living',
            subcategory: 'lounge',
            collection: 'new-arrivals',
            image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
            description: 'Minimalist curved lounge chair wrapped in textured white bouclé yarn. Sculptural silhouettes crafted to provide ergonomic relaxation and premium modern vibes.',
            specifications: {
                'Dimensions': '34" W x 32" D x 30" H',
                'Fabric': 'Premium Textured Bouclé',
                'Legs': 'Matte Walnut Finished Steel',
                'Origin': 'Danish Designed'
            },
            featured: true
        },
        {
            id: 'prod-3',
            name: 'Solid Walnut Pedestal Table',
            brand: 'Velluto Artisan',
            category: 'dining',
            subcategory: 'sets',
            collection: 'best-sellers',
            image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80',
            description: 'Substantial circular dining table highlighting natural walnut grains. Supported by a fluted cylindrical column pedestal carved out of solid oak.',
            specifications: {
                'Diameter': '60" Round (Seats 6)',
                'Timber Wood': 'FSC-Certified American Walnut',
                'Finish': 'Satin Polyurethane Water-resistant Seal',
                'Pedestal Base': 'Hand-turned Ribbed Design'
            },
            featured: true
        },
        {
            id: 'prod-4',
            name: 'Chamber Tufted King Bed Frame',
            brand: 'Somnus Sleep',
            category: 'bedroom',
            subcategory: 'beds',
            collection: 'premium',
            image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
            description: 'High-end platform bed featuring an grand, wrap-around wingback headboard with vertical channels. Fully upholstered in premium linen fabric.',
            specifications: {
                'Dimensions': '86" W x 89" D x 58" Headboard H',
                'Fabric Choice': 'Belgium Linen / Natural Flax',
                'Slats': 'Flex-spring Wood Slat System',
                'Required': 'No box spring needed'
            },
            featured: true
        },
        {
            id: 'prod-5',
            name: 'Obsidian Ribbed Credenza',
            brand: 'Elysian Line',
            category: 'living',
            subcategory: 'consoles',
            collection: 'best-sellers',
            image: 'https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=800&q=80',
            description: 'Low-profile TV console showcasing an elegant curved ribbed casing coated in charcoal finish. Opens to reveal adjustable walnut shelving.',
            specifications: {
                'Dimensions': '72" W x 18" D x 24" H',
                'Frame': 'MDF with Solid Oak Ribbed Face',
                'Leg Hardware': 'Satin Brushed Brass',
                'Internal Cord Slits': 'Yes, pre-drilled back gaps'
            },
            featured: false
        },
        {
            id: 'prod-6',
            name: 'Imperial Walnut Wardrobe System',
            brand: 'Velluto Signature',
            category: 'bedroom',
            subcategory: 'wardrobes',
            collection: 'new-arrivals',
            image: 'https://images.unsplash.com/photo-1558882224-cca166733360?auto=format&fit=crop&w=800&q=80',
            description: 'Bespoke modular closet cabinet comprising soft-close drawers, full-height clothing racks, and integrated smart LED lights.',
            specifications: {
                'Width': '96" Double Unit',
                'Material': 'Walnut Wood Veneer & Glass Doors',
                'Lighting': 'Warm LED sensors (rechargeable)',
                'Handles': 'Flush leather straps'
            },
            featured: false
        },
        {
            id: 'prod-7',
            name: 'Director Leather Office Chair',
            brand: 'Monarch Office',
            category: 'office',
            subcategory: 'desk-chairs',
            collection: 'best-sellers',
            image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
            description: 'Ergonomic administrative swivel chair padded in top-grain amber Italian leather. Built-in adjustable tension control and gas lifts.',
            specifications: {
                'Material': 'Full top-grain leather & Chrome',
                'Max Load': '300 lbs',
                'Adjustments': 'Tension tilt, height lock',
                'Casters': 'Hardwood-safe nylon caps'
            },
            featured: true
        }
    ],
    projects: [
        { id: 'proj-1', title: 'Bel-Air Penthouse Residence', category: 'living', image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80', desc: 'Custom emerald sectionals, walnut console installations, and ambient mood furniture design.' },
        { id: 'proj-2', title: 'Manhattan Executive Lounge', category: 'office', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80', desc: 'Sleek dark oak desks, leather executive chairs, and custom wood panel filing boards.' },
        { id: 'proj-3', title: 'Hamptons Coastal Chamber', category: 'bedroom', image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80', desc: 'Tufted linen bed frame, white oak nightstands, and fluted vanity drawers.' },
        { id: 'proj-4', title: 'The Guild Gourmet Room', category: 'dining', image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80', desc: 'Artisan fluted pedestal tables, premium leather dining seats, and custom glass buffet sideboards.' }
    ],
    blogs: [
        {
            id: 'blog-1',
            title: 'The Art of Bouclé: Styling Curvaceous Furniture',
            author: 'Vivienne Vance',
            date: 'June 18, 2026',
            image: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=800&q=80',
            excerpt: 'How texture is overtaking color in modern interior design. Explore layout guidelines to highlight bouclé fabrics.'
        },
        {
            id: 'blog-2',
            title: 'Timeless Timber: Walnut vs Oak Hardwood Joinery',
            author: 'Artisan Alistair',
            date: 'June 05, 2026',
            image: 'https://images.unsplash.com/photo-1534080391025-a7db58334650?auto=format&fit=crop&w=800&q=80',
            excerpt: 'A woodworker guide comparing wood grains, hardness ratings, and patina shifts over time to help you choose custom timber.'
        },
        {
            id: 'blog-3',
            title: 'Designing Flow: Creating Spacing In Sectional Layouts',
            author: 'Marcello Moretti',
            date: 'May 22, 2026',
            image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
            excerpt: 'Avoid cluttering your luxury living room. Understand key clearance distance rules for couches, TV consoles, and rugs.'
        }
    ],
    testimonials: [
        {
            name: 'Helena Rosengren',
            type: 'Penthouse Villa, Malibu',
            rating: 5,
            review: 'The emerald velvet sectional is absolute perfection. It feels like an art piece, yet supports comfortable everyday living. The craftsmanship exceeds typical luxury showroom imports.',
            avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&q=80'
        },
        {
            name: 'Julian Montgomery',
            type: 'Art Collector Residence, Soho',
            rating: 5,
            review: 'Their fluted walnut pedestal table is the centerpiece of our home. We seat eight during dinners and guests always admire the custom timber grain matching done by the craft shop.',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&q=80'
        },
        {
            name: 'Deepak Rajan',
            type: 'Modern Condo Upgrade, Austin',
            rating: 5,
            review: 'Fabulous service. The modular walk-in wardrobes were customized to my specific bedroom layout. Soft-close drawers and integrated lighting sensors are incredibly satisfying.',
            avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&q=80'
        }
    ],
    inquiries: [
        {
            id: 'inq-1',
            name: 'Esther Sterling',
            email: 'esther@sterlingdesign.com',
            phone: '212-320-1928',
            details: 'Inquiring for commercial hotel lounge. Needs custom velvet color options.',
            product: 'Aura Velvet Sectional Sofa',
            status: 'new',
            date: '2026-06-18'
        },
        {
            id: 'inq-2',
            name: 'Marcus Brody',
            email: 'brody@brodybuilders.net',
            phone: '512-889-1122',
            details: 'Custom dimensions request for walnut round table: 72 inch diameter.',
            product: 'Solid Walnut Pedestal Table',
            status: 'contacted',
            date: '2026-06-17'
        }
    ],
    customRequests: [
        {
            id: 'cust-1',
            name: 'Genevieve King',
            email: 'g.king@luxehaven.com',
            phone: '310-445-8890',
            wood: 'walnut',
            fabric: 'boucle',
            room: 'living',
            width: '96',
            status: 'new',
            date: '2026-06-18'
        }
    ]
};

// Initial state load into local storage
function initLocalStorage() {
    if (!localStorage.getItem('cms_initialized')) {
        localStorage.setItem('cms_products', JSON.stringify(SEED_DATA.products));
        localStorage.setItem('cms_projects', JSON.stringify(SEED_DATA.projects));
        localStorage.setItem('cms_blogs', JSON.stringify(SEED_DATA.blogs));
        localStorage.setItem('cms_testimonials', JSON.stringify(SEED_DATA.testimonials));
        localStorage.setItem('cms_inquiries', JSON.stringify(SEED_DATA.inquiries));
        localStorage.setItem('cms_custom_requests', JSON.stringify(SEED_DATA.customRequests));
        localStorage.setItem('cms_initialized', 'true');
    }
}

// State access helpers
function getStateItem(key) {
    return JSON.parse(localStorage.getItem('cms_' + key)) || [];
}

function setStateItem(key, data) {
    localStorage.setItem('cms_' + key, JSON.stringify(data));
}

// ==========================================================================
// 3. ROUTER & DYNAMIC RENDER PIPELINE
// ==========================================================================
const app = document.getElementById('app');

function router() {
    const path = window.location.hash || '#/';
    
    // Auto-close drawers
    document.getElementById('mobile-nav').classList.remove('open');

    // Parse route and query parameters
    const [route, queryString] = path.split('?');
    const params = new URLSearchParams(queryString || '');

    // Reset page scroll position
    window.scrollTo(0, 0);

    // Update active nav highlights
    document.querySelectorAll('.nav-item, .mobile-nav-item').forEach(item => {
        const href = item.getAttribute('href');
        if (href === route) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });

    // Render corresponding view
    switch(route) {
        case '#/':
            renderHome();
            break;
        case '#/about':
            renderAbout();
            break;
        case '#/collections':
            renderCollections(params);
            break;
        case '#/custom':
            renderCustom();
            break;
        case '#/process':
            renderProcess();
            break;
        case '#/gallery':
            renderGallery(params);
            break;
        case '#/testimonials':
            renderTestimonials();
            break;
        case '#/blog':
            renderBlog();
            break;
        case '#/contact':
            renderContact(params);
            break;
        case '#/admin':
            renderAdmin(params);
            break;
        default:
            renderHome();
            break;
    }

    // Initialize Lucide Icons for dynamic HTML
    if (window.lucide) {
        lucide.createIcons();
    }

    // Run token preprocessor to render business context
    preprocessTokens();
}

// Global Event Listeners
window.addEventListener('hashchange', router);
window.addEventListener('load', () => {
    initLocalStorage();
    router();
    setupHeaderScroll();
    setupMobileNav();
    setupSearchOverlay();
    setupLightbox();
    
    // Set dynamic copyright year
    const footerYear = document.getElementById('footer-year');
    if (footerYear) footerYear.textContent = new Date().getFullYear();
});

// Scroll state management for styling
function setupHeaderScroll() {
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Navigation drawer triggers
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

// Catalog Search functions
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
            p.brand.toLowerCase().includes(query) || 
            p.category.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query)
        );

        if (matches.length === 0) {
            searchResults.innerHTML = `<p style="padding: 1.5rem; text-align:center; color:var(--text-muted);">No luxury items match "${query}"</p>`;
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

// Quick View product details
window.openQuickView = function(id) {
    const products = getStateItem('products');
    const item = products.find(p => p.id === id);
    if (!item) return;

    const bodyEl = document.getElementById('quickview-body');
    const specsHTML = Object.entries(item.specifications || {}).map(([key, val]) => `
        <li>
            <span>${key}</span>
            <span>${val}</span>
        </li>
    `).join('');

    bodyEl.innerHTML = `
        <div class="quickview-img-box">
            <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="quickview-info">
            <span class="quickview-category">${item.category} / ${item.subcategory || ''}</span>
            <h2>${item.name}</h2>
            <p class="quickview-brand">Line: <strong>${item.brand}</strong></p>
            <p class="quickview-desc">${item.description}</p>
            
            <h3 style="font-size: 0.95rem; text-transform:uppercase; letter-spacing:0.05em; margin-bottom:0.75rem; color:var(--primary-color);">Product Specs</h3>
            <ul class="quickview-specs">
                ${specsHTML}
            </ul>

            <div style="display:flex; gap: 1rem;">
                <button onclick="prefillProductInquiry('${item.name}')" class="btn btn-primary">Prefill Inquiry Form</button>
                <a href="tel:{{PHONE}}" class="btn btn-secondary"><i data-lucide="phone" style="width:16px;"></i> Call Concierge</a>
            </div>
        </div>
    `;

    document.getElementById('quickview-modal').classList.add('open');
    if (window.lucide) lucide.createIcons();
    preprocessTokens();
};

window.closeQuickViewModal = function() {
    document.getElementById('quickview-modal').classList.remove('open');
};

const qvClose = document.getElementById('quickview-close');
if (qvClose) qvClose.addEventListener('click', window.closeQuickViewModal);

// Prefill form link
window.prefillProductInquiry = function(productName) {
    window.closeQuickViewModal();
    window.location.hash = `#/contact?product=${encodeURIComponent(productName)}`;
};

// Lightbox modal setup
function setupLightbox() {
    const lightbox = document.getElementById('lightbox-modal');
    const closeBtn = document.getElementById('lightbox-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('open');
        });
    }
}

window.openLightbox = function(src, caption) {
    const lightbox = document.getElementById('lightbox-modal');
    document.getElementById('lightbox-img').src = src;
    document.getElementById('lightbox-caption').textContent = caption;
    lightbox.classList.add('open');
};

// Testimonials navigation state
let currentSlideIndex = 0;

window.moveTestimonial = function(dir) {
    const track = document.querySelector('.testimonial-track');
    if (!track) return;
    const slides = document.querySelectorAll('.testimonial-slide');
    const totalSlides = slides.length;
    
    currentSlideIndex += dir;
    if (currentSlideIndex < 0) currentSlideIndex = totalSlides - 1;
    if (currentSlideIndex >= totalSlides) currentSlideIndex = 0;

    track.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
};

// ==========================================================================
// 4. CLIENT VIEWS RENDERING
// ==========================================================================

// --- 4.1 HOME VIEW ---
function renderHome() {
    const featuredList = getStateItem('products').filter(p => p.featured);
    const testimonials = getStateItem('testimonials');
    const projects = getStateItem('projects');

    // Seed particle effect elements
    let particlesHTML = '';
    for (let i = 0; i < 15; i++) {
        const width = Math.random() * 8 + 3;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 6;
        particlesHTML += `<div class="particle" style="width: ${width}px; height: ${width}px; left: ${left}%; top: ${top}%; animation-delay: ${delay}s;"></div>`;
    }

    app.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <div class="hero-bg-media">
                <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80" alt="Luxury Architectural Living Space" id="hero-img">
            </div>
            <div class="hero-overlay"></div>
            
            <div class="particles-container">${particlesHTML}</div>

            <div class="light-switch-widget" title="Switch wood finish theme tone">
                <span class="switch-label">Teak Glow</span>
                <button class="switch-toggle-btn" id="theme-light-toggle" aria-label="Toggle light tone"></button>
            </div>

            <div class="hero-content">
                <div class="hero-badge">Luxury Craftsmanship Studio</div>
                <h1 class="hero-headline">Handcrafted Furniture<br>For Elegant Lifestyles</h1>
                <p class="hero-subheading">Indulge in structural beauty, premium organic materials, and custom furniture designs crafted individually by master carpenters.</p>
                <div class="hero-ctas">
                    <a href="#/collections" class="btn btn-primary">Browse Collections</a>
                    <a href="#/custom" class="btn btn-secondary">Design Custom Piece</a>
                </div>
            </div>
        </section>

        <!-- Categories Showcase Grid -->
        <section class="section-wrapper container">
            <div class="section-header">
                <h2>Design Categories</h2>
                <p class="section-subtitle">Exquisite design collections tailored for residential chambers, luxury lounges, executive corporate desks, and bespoke modular closets.</p>
            </div>
            <div class="categories-grid">
                <!-- Living Room -->
                <div class="category-card" onclick="window.location.hash='#/collections?category=living'">
                    <div class="category-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80" alt="Living Suite">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color:var(--primary-color); text-transform:uppercase; letter-spacing:0.05em;">Lounge & Living</span>
                        <h3>Living Room Suite</h3>
                        <p>Luxury sectionals, plush bouclé chairs, modular TV consoles, and marble coffee tables.</p>
                        <a href="#/collections?category=living" class="btn btn-outline btn-xs">Browse Pieces</a>
                    </div>
                </div>
                <!-- Dining Room -->
                <div class="category-card" onclick="window.location.hash='#/collections?category=dining'">
                    <div class="category-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80" alt="Bespoke Dining">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color:var(--primary-color); text-transform:uppercase; letter-spacing:0.05em;">Feast & Dining</span>
                        <h3>Bespoke Dining</h3>
                        <p>Fluted pedestal round tables, solid walnut rectangular seats, and credenzas.</p>
                        <a href="#/collections?category=dining" class="btn btn-outline btn-xs">Browse Pieces</a>
                    </div>
                </div>
                <!-- Bedroom Suite -->
                <div class="category-card" onclick="window.location.hash='#/collections?category=bedroom'">
                    <div class="category-img-wrapper">
                        <img src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80" alt="Sleep Chambers">
                    </div>
                    <div class="category-overlay"></div>
                    <div class="category-info">
                        <span style="font-size:0.75rem; color:var(--primary-color); text-transform:uppercase; letter-spacing:0.05em;">Rest & Chamber</span>
                        <h3>Bedroom Suite</h3>
                        <p>Wingback tufted bedframes, glasswardrobes, fluted dresser drawers, and vanity boards.</p>
                        <a href="#/collections?category=bedroom" class="btn btn-outline btn-xs">Browse Pieces</a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Interactive Craft Spotlight Panel -->
        <section class="section-wrapper container" style="border-top: 1px solid var(--border-color);">
            <div class="about-grid">
                <div class="glass-card">
                    <span style="color:var(--primary-color); font-size:0.8rem; text-transform:uppercase; font-weight:600; letter-spacing:2px;">Bespoke Experience</span>
                    <h2 style="font-family:var(--font-serif); font-size:2.3rem; margin-top:0.5rem; margin-bottom:1.5rem;">Interactive Wood Theme Switcher</h2>
                    <p style="margin-bottom:1.5rem; color:var(--text-secondary);">Explore how color tones shape a luxury space. Use the flippable toggle widget located in the hero image corner. Toggle between **Teak Warmth** (rich champagne glows) and **Ash coolness** (modern slate tints) to preview the design theme adaptation.</p>
                    <p style="margin-bottom:2rem; color:var(--text-secondary);">All our physical showrooms house interactive catalog walls. Feel raw American walnut grain and examine our leather stitchings firsthand.</p>
                    <a href="#/custom" class="btn btn-primary">Start Custom Design <i data-lucide="arrow-right"></i></a>
                </div>
                <div class="about-showroom-gallery">
                    <div class="about-showroom-img"><img src="https://images.unsplash.com/photo-1534080391025-a7db58334650?auto=format&fit=crop&w=800&q=80" alt="Wood Crafting Detail"></div>
                    <div class="about-showroom-img"><img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Lounge Space"></div>
                </div>
            </div>
        </section>

        <!-- Featured Highlights Tab Slider -->
        <section class="section-wrapper" style="background: rgba(255, 255, 255, 0.005); border-top: 1px solid var(--border-color);">
            <div class="container">
                <div class="section-header">
                    <h2>Featured Masterpieces</h2>
                    <p class="section-subtitle">Exquisite design pieces crafted in limited numbers, curated carefully to define architectural elegance.</p>
                </div>
                
                <div class="tab-navigation">
                    <button class="tab-btn active" onclick="filterFeaturedList('all', this)">All Highlights</button>
                    <button class="tab-btn" onclick="filterFeaturedList('premium', this)">Premium Tier</button>
                    <button class="tab-btn" onclick="filterFeaturedList('new-arrivals', this)">New Arrivals</button>
                    <button class="tab-btn" onclick="filterFeaturedList('best-sellers', this)">Best Sellers</button>
                </div>

                <div class="products-grid" id="home-featured-grid">
                    ${renderProductCardsHTML(featuredList)}
                </div>
            </div>
        </section>

        <!-- Interactive Testimonials Section -->
        <section class="section-wrapper" style="border-top: 1px solid var(--border-color); background: rgba(0, 0, 0, 0.15);">
            <div class="container">
                <div class="section-header">
                    <h2>Connoisseur Reviews</h2>
                    <p class="section-subtitle">Listen to architectural designers, luxury home owners, and interior consultants share their Velluto experiences.</p>
                </div>

                <div class="testimonials-container">
                    <button class="slider-nav-btn slider-prev" onclick="moveTestimonial(-1)" aria-label="Previous Testimonial"><i data-lucide="chevron-left"></i></button>
                    <button class="slider-nav-btn slider-next" onclick="moveTestimonial(1)" aria-label="Next Testimonial"><i data-lucide="chevron-right"></i></button>
                    <div class="testimonial-track">
                        ${testimonials.map(t => `
                            <div class="testimonial-slide">
                                <i data-lucide="quote" class="quote-icon"></i>
                                <p class="review-text">"${t.review}"</p>
                                <div class="client-profile">
                                    <img src="${t.avatar}" alt="${t.name}" class="client-avatar">
                                    <div class="client-info">
                                        <h4 class="client-name">${t.name}</h4>
                                        <p class="client-project">${t.type}</p>
                                        <div class="rating-stars">
                                            ${Array(t.rating).fill('<i data-lucide="star"></i>').join('')}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <!-- Brand partnerships infinite slider -->
        <section class="section-wrapper container" style="border-top: 1px solid var(--border-color);">
            <h3 style="font-size:0.8rem; text-transform:uppercase; letter-spacing:0.15em; text-align:center; margin-bottom:3rem; color:var(--text-muted);">Trusted By Interior Design Guilds</h3>
            <div class="brand-slider-container">
                <div class="brand-slider">
                    <!-- Repeated loops to build infinite animation stream -->
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&fit=crop&q=60" alt="Partner"></div>
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&fit=crop&q=60" alt="Partner"></div>
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&fit=crop&q=60" alt="Partner"></div>
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&fit=crop&q=60" alt="Partner"></div>
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&fit=crop&q=60" alt="Partner"></div>
                    <!-- Loop 2 -->
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&fit=crop&q=60" alt="Partner"></div>
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&fit=crop&q=60" alt="Partner"></div>
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=200&fit=crop&q=60" alt="Partner"></div>
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=200&fit=crop&q=60" alt="Partner"></div>
                    <div class="brand-logo-card"><img src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=200&fit=crop&q=60" alt="Partner"></div>
                </div>
            </div>
        </section>
    `;

    // Interactive wood tone theme switcher logic
    const themeBtn = document.getElementById('theme-light-toggle');
    const heroImgEl = document.getElementById('hero-img');
    const labelEl = document.querySelector('.switch-label');
    
    // Toggle function
    themeBtn.addEventListener('click', () => {
        if (document.body.classList.contains('warm-lighting')) {
            document.body.classList.remove('warm-lighting');
            document.body.classList.add('cool-lighting');
            labelEl.textContent = 'Ash Glow';
            if (heroImgEl) heroImgEl.style.filter = 'brightness(0.45) contrast(1.1) saturate(0.85) hue-rotate(10deg)';
        } else if (document.body.classList.contains('cool-lighting')) {
            document.body.classList.remove('cool-lighting');
            document.body.classList.add('warm-lighting');
            labelEl.textContent = 'Teak Glow';
            if (heroImgEl) heroImgEl.style.filter = 'brightness(0.4) contrast(1.05) saturate(1.1)';
        } else {
            // default transition
            document.body.classList.add('warm-lighting');
            labelEl.textContent = 'Teak Glow';
        }
    });

    // Initialize custom layout icons
    if (window.lucide) lucide.createIcons();
}

function renderProductCardsHTML(products) {
    if (products.length === 0) {
        return `<p style="grid-column: span 4; text-align:center; padding: 4rem; color: var(--text-secondary); font-size:0.95rem;">No design items found matching selection.</p>`;
    }
    return products.map(p => `
        <div class="product-card">
            <div class="product-img-box">
                <img src="${p.image}" alt="${p.name}" loading="lazy">
                ${p.collection ? `<div class="product-badge">${p.collection.replaceAll('-', ' ')}</div>` : ''}
                <div class="product-actions-overlay">
                    <button onclick="openQuickView('${p.id}')" class="btn btn-primary btn-sm">Inspect Design</button>
                </div>
            </div>
            <div class="product-details">
                <span class="product-brand">${p.brand}</span>
                <h3 class="product-name">${p.name}</h3>
                <p class="product-desc">${p.description.substring(0, 80)}...</p>
                <div class="product-card-footer">
                    <span class="product-spec-tag">${p.category}</span>
                    <button onclick="prefillProductInquiry('${p.name}')" class="btn btn-outline btn-xs">Request Info</button>
                </div>
            </div>
        </div>
    `).join('');
}

window.filterFeaturedList = function(colType, btn) {
    // Highlight button
    document.querySelectorAll('.tab-navigation .tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const products = getStateItem('products').filter(p => p.featured);
    const filtered = colType === 'all' ? products : products.filter(p => p.collection === colType);
    
    const gridEl = document.getElementById('home-featured-grid');
    if (gridEl) {
        gridEl.innerHTML = renderProductCardsHTML(filtered);
    }
    preprocessTokens();
};

// --- 4.2 ABOUT BRAND VIEW ---
function renderAbout() {
    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top: 150px;">
            <div class="about-grid">
                <div>
                    <span style="color:var(--primary-color); font-weight:600; font-size:0.85rem; text-transform:uppercase; letter-spacing:2px;">Artisan Heritage</span>
                    <h1 style="font-family:var(--font-serif); font-size:3.2rem; margin-top:0.5rem; margin-bottom:2rem; line-height:1.15;">A Obsession With Perfect Wood Grains</h1>
                    <p style="font-size:1.1rem; color:var(--text-secondary); font-weight:300; margin-bottom:1.5rem;">{{CLINIC_NAME}} Studio was founded on the philosophy that furniture should be structural artwork that elevates everyday human moments.</p>
                    <p style="margin-bottom:1.5rem; color:var(--text-secondary);">We combine digital design precisions with century-old mortise-and-tenon woodworking techniques. Every slab of American walnut, white oak, or maple is hand-selected, kiln-dried, and finished with organic, non-toxic oils to preserve the natural tactile breathability of wood.</p>
                    
                    <div class="craft-detail-box">
                        <div class="craft-feature">
                            <h4>Joinery Integrity</h4>
                            <p>No metallic nails or cheap screws. We employ traditional joinery slots designed to strengthen as wood expands.</p>
                        </div>
                        <div class="craft-feature">
                            <h4>Organic Finishing</h4>
                            <p>Hand-rubbed coatings made from beeswax and linseed extract. 100% VOC-free, food-safe, and soft to touch.</p>
                        </div>
                    </div>
                </div>
                <div class="about-showroom-gallery">
                    <div class="about-showroom-img" style="grid-column: span 2;">
                        <img src="https://images.unsplash.com/photo-1534080391025-a7db58334650?auto=format&fit=crop&w=800&q=80" alt="Carpenter Craft Details" style="height:350px;">
                    </div>
                    <div class="about-showroom-img">
                        <img src="https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80" alt="Raw Timber Logs">
                    </div>
                    <div class="about-showroom-img">
                        <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80" alt="Showroom Lounge">
                    </div>
                </div>
            </div>
        </section>
    `;
}

// --- 4.3 COLLECTIONS VIEW ---
function renderCollections(params) {
    const activeCategory = params.get('category') || 'all';
    const activeSubcategory = params.get('sub') || 'all';
    const searchQuery = params.get('q') || '';

    const products = getStateItem('products');

    // Filters logic
    const filteredProducts = products.filter(p => {
        if (activeCategory !== 'all' && p.category !== activeCategory) return false;
        if (activeSubcategory !== 'all' && p.subcategory !== activeSubcategory) return false;
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return p.name.toLowerCase().includes(query) || 
                   p.brand.toLowerCase().includes(query) ||
                   p.description.toLowerCase().includes(query);
        }
        return true;
    });

    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top: 150px;">
            <div class="section-header" style="margin-bottom:3rem;">
                <h1>The Design Collection</h1>
                <p class="section-subtitle">Exquisite furniture suites designed for living lounges, gourmet rooms, sleeping chambers, and professional desks.</p>
            </div>

            <!-- Search & Filters Header Bar -->
            <div class="glass-card" style="padding:1.5rem; margin-bottom:3rem; display:flex; gap:1.5rem; flex-wrap:wrap; justify-content:space-between; align-items:center;">
                <div style="display:flex; gap:1rem; flex-wrap:wrap;">
                    <a href="#/collections?category=all" class="tab-btn ${activeCategory === 'all' ? 'active' : ''}">All Items</a>
                    <a href="#/collections?category=living" class="tab-btn ${activeCategory === 'living' ? 'active' : ''}">Living Room</a>
                    <a href="#/collections?category=dining" class="tab-btn ${activeCategory === 'dining' ? 'active' : ''}">Dining Set</a>
                    <a href="#/collections?category=bedroom" class="tab-btn ${activeCategory === 'bedroom' ? 'active' : ''}">Bedroom Chamber</a>
                    <a href="#/collections?category=office" class="tab-btn ${activeCategory === 'office' ? 'active' : ''}">Executive Desk</a>
                </div>
                <div class="search-box-wrapper">
                    <input type="text" id="collection-search-input" placeholder="Search collection..." value="${searchQuery}">
                    <button onclick="triggerCollectionSearch()" class="search-box-btn" aria-label="Search Collection"><i data-lucide="search"></i></button>
                </div>
            </div>

            <!-- Subcategory Filters if applicable -->
            ${activeCategory === 'living' ? `
                <div style="display:flex; justify-content:center; gap:0.75rem; margin-bottom:3rem;">
                    <a href="#/collections?category=living&sub=all" class="btn btn-secondary btn-xs ${activeSubcategory === 'all' ? 'btn-primary' : ''}">All Living</a>
                    <a href="#/collections?category=living&sub=sofas" class="btn btn-secondary btn-xs ${activeSubcategory === 'sofas' ? 'btn-primary' : ''}">Sofas & Sectionals</a>
                    <a href="#/collections?category=living&sub=lounge" class="btn btn-secondary btn-xs ${activeSubcategory === 'lounge' ? 'btn-primary' : ''}">Lounge Chairs</a>
                    <a href="#/collections?category=living&sub=tables" class="btn btn-secondary btn-xs ${activeSubcategory === 'tables' ? 'btn-primary' : ''}">Coffee Tables</a>
                </div>
            ` : ''}

            <!-- Products catalog grid rendering -->
            <div class="products-grid">
                ${renderProductCardsHTML(filteredProducts)}
            </div>
        </section>
    `;

    // Hook search keypress
    const searchInput = document.getElementById('collection-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                triggerCollectionSearch();
            }
        });
    }

    if (window.lucide) lucide.createIcons();
}

window.triggerCollectionSearch = function() {
    const query = document.getElementById('collection-search-input').value.trim();
    const hash = window.location.hash.split('?')[0];
    const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
    
    if (query) {
        params.set('q', query);
    } else {
        params.delete('q');
    }
    
    window.location.hash = hash + '?' + params.toString();
};

// --- 4.4 CUSTOM DESIGN CONFIGURATOR VIEW ---
function renderCustom() {
    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top: 150px;">
            <div class="section-header">
                <h1>Custom Design Configurator</h1>
                <p class="section-subtitle">Specify dimensions, handpick timber planks, select luxury fabrics, and collaborate directly with our workshop engineers.</p>
            </div>

            <div class="configurator-grid">
                <!-- Configurator controls -->
                <div class="glass-card">
                    <h3 style="font-family:var(--font-serif); font-size:1.6rem; margin-bottom:2rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:1rem;">Select Specifications</h3>
                    
                    <div class="options-group">
                        <h4>1. Hardwood Timber Selection</h4>
                        <div class="materials-selection">
                            <div class="material-option active" data-type="wood" data-value="walnut" onclick="selectConfigOption(this, 'wood')">
                                <h5>Walnut</h5>
                                <p>Rich Dark Grain</p>
                            </div>
                            <div class="material-option" data-type="wood" data-value="oak" onclick="selectConfigOption(this, 'wood')">
                                <h5>White Oak</h5>
                                <p>Modern Honey Tone</p>
                            </div>
                            <div class="material-option" data-type="wood" data-value="ash" onclick="selectConfigOption(this, 'wood')">
                                <h5>Ash Wood</h5>
                                <p>Clean Pale Slate</p>
                            </div>
                        </div>
                    </div>

                    <div class="options-group">
                        <h4>2. Premium Upholstery fabric</h4>
                        <div class="materials-selection">
                            <div class="material-option active" data-type="fabric" data-value="velvet" onclick="selectConfigOption(this, 'fabric')">
                                <h5>Royal Velvet</h5>
                                <p>Soft Down Luster</p>
                            </div>
                            <div class="material-option" data-type="fabric" data-value="boucle" onclick="selectConfigOption(this, 'fabric')">
                                <h5>Textured Bouclé</h5>
                                <p>Cozy Wool Weft</p>
                            </div>
                            <div class="material-option" data-type="fabric" data-value="leather" onclick="selectConfigOption(this, 'fabric')">
                                <h5>Italian Leather</h5>
                                <p>Full Top-Grain</p>
                            </div>
                        </div>
                    </div>

                    <div class="options-group">
                        <h4>3. Room Orientation & Width</h4>
                        <div class="form-group" style="margin-bottom: 1.5rem;">
                            <label for="config-room">Target Room Space</label>
                            <select id="config-room" style="width:100%; margin-top:0.5rem;">
                                <option value="living">Living Room Lounge</option>
                                <option value="bedroom">Master Bed Suite</option>
                                <option value="dining">Gourmet Feast Room</option>
                                <option value="office">Corporate Boardroom</option>
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label for="config-width">Desired Width: <span id="width-val" style="color:var(--primary-color); font-weight:600;">96</span> inches</label>
                            <input type="range" id="config-width" min="60" max="144" value="96" step="6" style="margin-top:0.5rem; cursor:pointer;" oninput="document.getElementById('width-val').textContent = this.value">
                        </div>
                    </div>
                </div>

                <!-- Custom request inquiry form -->
                <div class="glass-card">
                    <h3 style="font-family:var(--font-serif); font-size:1.6rem; margin-bottom:2rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:1rem;">Submit Workshop Inquiry</h3>
                    <form id="custom-design-form" class="custom-form" onsubmit="submitCustomRequest(event)">
                        <div class="form-group">
                            <label for="custom-name">Full Name</label>
                            <input type="text" id="custom-name" placeholder="Enter your full name" required>
                        </div>
                        <div class="input-row">
                            <div class="form-group">
                                <label for="custom-email">Email Address</label>
                                <input type="email" id="custom-email" placeholder="you@domain.com" required>
                            </div>
                            <div class="form-group">
                                <label for="custom-phone">Phone Number</label>
                                <input type="tel" id="custom-phone" placeholder="Contact number" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="custom-notes">Design Notes & Details</label>
                            <textarea id="custom-notes" rows="4" placeholder="Mention design inspirations, color shade, room sketches, or sizing revisions..."></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">Send Custom Spec Request</button>
                    </form>
                </div>
            </div>
        </section>
    `;
}

window.selectConfigOption = function(el, type) {
    // Deactivate sibling items
    document.querySelectorAll(`.material-option[data-type="${type}"]`).forEach(opt => {
        opt.classList.remove('active');
    });
    // Activate current item
    el.classList.add('active');
};

window.submitCustomRequest = function(event) {
    event.preventDefault();
    
    // Grab specs
    const activeWood = document.querySelector('.material-option[data-type="wood"].active').getAttribute('data-value');
    const activeFabric = document.querySelector('.material-option[data-type="fabric"].active').getAttribute('data-value');
    const room = document.getElementById('config-room').value;
    const width = document.getElementById('config-width').value;

    const name = document.getElementById('custom-name').value.trim();
    const email = document.getElementById('custom-email').value.trim();
    const phone = document.getElementById('custom-phone').value.trim();
    const notes = document.getElementById('custom-notes').value.trim();

    const newRequest = {
        id: 'cust-' + Date.now(),
        name,
        email,
        phone,
        wood: activeWood,
        fabric: activeFabric,
        room,
        width,
        notes,
        status: 'new',
        date: new Date().toISOString().split('T')[0]
    };

    const currentRequests = getStateItem('custom_requests');
    currentRequests.push(newRequest);
    setStateItem('custom_requests', currentRequests);

    // Show popup feedback
    alert(`Thank you, ${name}! Your custom ${width}" ${activeWood} frame spec configuration has been registered. Our designer will call you shortly.`);
    
    // Reset form
    document.getElementById('custom-design-form').reset();
};

// --- 4.5 CRAFT PROCESS VIEW ---
function renderProcess() {
    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top: 150px;">
            <div class="section-header">
                <h1>Our Handcrafted Journey</h1>
                <p class="section-subtitle">We treat furniture making as a sacred design ritual, tracking every timber fiber from sustainable woodlands to final white-glove assembly.</p>
            </div>

            <div class="process-timeline">
                <div class="timeline-item left">
                    <div class="timeline-number">01</div>
                    <div class="timeline-content">
                        <h3>Timber Selection & Drying</h3>
                        <p>We source FSC-certified raw lumber slabs (Black Walnut, White Oak, Maple). Each plank is kiln-dried and seasoned for over 12 months to lower moisture, ensuring it resists warp or splits.</p>
                    </div>
                </div>

                <div class="timeline-item right">
                    <div class="timeline-number">02</div>
                    <div class="timeline-content">
                        <h3>Precision Shaping</h3>
                        <p>Master engineers plan cut ratios matching structural grain alignments. We prepare smooth contours while maintaining organic timber edges to exhibit raw aesthetic elements.</p>
                    </div>
                </div>

                <div class="timeline-item left">
                    <div class="timeline-number">03</div>
                    <div class="timeline-content">
                        <h3>Joinery Integrity</h3>
                        <p>Traditional wood joinery methods (dovetails, mortises, tenons) are meticulously hand-carved. These snug interlocks bypass nails, forming strong structural bonds.</p>
                    </div>
                </div>

                <div class="timeline-item right">
                    <div class="timeline-number">04</div>
                    <div class="timeline-content">
                        <h3>Hand-rubbed Polish</h3>
                        <p>Planks undergo triple-stage sanding down to ultra-fine grain finishes. We rub natural honey beeswax and plant extracts to seal fibers, rendering a gorgeous matte satin luster.</p>
                    </div>
                </div>

                <div class="timeline-item left">
                    <div class="timeline-number">05</div>
                    <div class="timeline-content">
                        <h3>White-Glove Placement</h3>
                        <p>Furniture is wrapped in felt blankets and shipped directly in our logistics vans. Technicians assemble and place the piece, making sure the room balance is mathematically perfect.</p>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// --- 4.6 MASONRY GALLERY VIEW ---
function renderGallery(params) {
    const filterCat = params.get('category') || 'all';
    const projects = getStateItem('projects');

    const filtered = filterCat === 'all' ? projects : projects.filter(p => p.category === filterCat);

    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top: 150px;">
            <div class="section-header">
                <h1>Showcase Gallery</h1>
                <p class="section-subtitle">Take an inside tour of luxury residences, penthouses, boardrooms, and designer layouts styled with Velluto master crafts.</p>
            </div>

            <!-- Category Filters -->
            <div class="gallery-filter">
                <a href="#/gallery?category=all" class="tab-btn ${filterCat === 'all' ? 'active' : ''}">All Projects</a>
                <a href="#/gallery?category=living" class="tab-btn ${filterCat === 'living' ? 'active' : ''}">Residential</a>
                <a href="#/gallery?category=office" class="tab-btn ${filterCat === 'office' ? 'active' : ''}">Workspaces</a>
                <a href="#/gallery?category=bedroom" class="tab-btn ${filterCat === 'bedroom' ? 'active' : ''}">Chambers</a>
                <a href="#/gallery?category=dining" class="tab-btn ${filterCat === 'dining' ? 'active' : ''}">Dining Space</a>
            </div>

            <!-- Masonry Grid -->
            <div class="gallery-grid">
                ${filtered.map(p => `
                    <div class="gallery-card" onclick="openLightbox('${p.image}', '${p.title} - ${p.desc}')">
                        <img src="${p.image}" alt="${p.title}" loading="lazy">
                        <div class="gallery-card-overlay">
                            <i data-lucide="maximize-2"></i>
                            <h3>${p.title}</h3>
                            <p>${p.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    if (window.lucide) lucide.createIcons();
}

// --- 4.7 REVIEWS VIEW ---
function renderTestimonials() {
    const testimonials = getStateItem('testimonials');
    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top: 150px;">
            <div class="section-header">
                <h1>Client Reviews</h1>
                <p class="section-subtitle">Real feedback from global clients who entrusted their living spaces to Velluto furniture artistry.</p>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(320px, 1fr)); gap:2rem;">
                ${testimonials.map(t => `
                    <div class="glass-card" style="display:flex; flex-direction:column; gap:1.5rem;">
                        <div class="rating-stars">
                            ${Array(t.rating).fill('<i data-lucide="star"></i>').join('')}
                        </div>
                        <p style="font-family:var(--font-serif); font-size:1.15rem; font-style:italic; line-height:1.6; color:var(--text-primary);">"${t.review}"</p>
                        <div class="client-profile" style="margin-top:auto;">
                            <img src="${t.avatar}" alt="${t.name}" class="client-avatar">
                            <div class="client-info">
                                <h4 class="client-name">${t.name}</h4>
                                <p class="client-project">${t.type}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    if (window.lucide) lucide.createIcons();
}

// --- 4.8 BLOG VIEW ---
function renderBlog() {
    const blogs = getStateItem('blogs');
    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top: 150px;">
            <div class="section-header">
                <h1>Artisan & Design Blog</h1>
                <p class="section-subtitle">Curated styling inspiration, craftsmanship logs, and interior layout guides compiled by our design team.</p>
            </div>

            <div class="blog-grid">
                ${blogs.map(b => `
                    <div class="blog-card">
                        <div class="blog-img"><img src="${b.image}" alt="${b.title}" loading="lazy"></div>
                        <div class="blog-content">
                            <span class="blog-meta">${b.date} | By ${b.author}</span>
                            <h3 class="blog-title">${b.title}</h3>
                            <p class="blog-excerpt">${b.excerpt}</p>
                            <div class="blog-footer">
                                <span>5 min read</span>
                                <a href="#/blog" style="color:var(--primary-color); font-weight:600; display:flex; align-items:center; gap:0.25rem;">Read Guide <i data-lucide="arrow-right" style="width:14px;"></i></a>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </section>
    `;

    if (window.lucide) lucide.createIcons();
}

// --- 4.9 CONTACT VIEW ---
function renderContact(params) {
    const targetProduct = params.get('product') || '';

    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top: 150px;">
            <div class="section-header">
                <h1>Contact Our Showroom</h1>
                <p class="section-subtitle">Arrange a virtual catalog walkthrough, book a designer home coordinate audit, or inquire about custom timber configurations.</p>
            </div>

            <div class="contact-layout">
                <!-- Info cards & Maps -->
                <div>
                    <h2 style="font-family:var(--font-serif); font-size:2rem; margin-bottom:2rem;">Headquarters & Experience Gallery</h2>
                    <p style="color:var(--text-secondary); margin-bottom:2rem;">Our flagship Manhattan space displays full suite bedrooms, living sections, and modular wood joinery libraries. Appointments are required for private viewings.</p>

                    <div style="display:flex; flex-direction:column; gap:1.5rem;">
                        <div style="display:flex; gap:1rem; align-items:flex-start;">
                            <i data-lucide="map-pin" style="color:var(--primary-color); margin-top:0.25rem;"></i>
                            <div>
                                <h4 style="font-weight:600;">Showroom Address</h4>
                                <p style="color:var(--text-secondary); font-size:0.95rem;">{{ADDRESS}}</p>
                            </div>
                        </div>
                        <div style="display:flex; gap:1rem; align-items:flex-start;">
                            <i data-lucide="phone" style="color:var(--primary-color); margin-top:0.25rem;"></i>
                            <div>
                                <h4 style="font-weight:600;">Telephone Concierge</h4>
                                <p style="color:var(--text-secondary); font-size:0.95rem;"><a href="tel:{{PHONE}}">{{PHONE}}</a></p>
                            </div>
                        </div>
                        <div style="display:flex; gap:1rem; align-items:flex-start;">
                            <i data-lucide="mail" style="color:var(--primary-color); margin-top:0.25rem;"></i>
                            <div>
                                <h4 style="font-weight:600;">Direct Email</h4>
                                <p style="color:var(--text-secondary); font-size:0.95rem;">concierge@{{CLINIC_NAME}}.com</p>
                            </div>
                        </div>
                    </div>

                    <!-- Map Placeholder -->
                    <div class="map-placeholder">
                        <div class="map-glow"></div>
                        <div style="z-index:2; text-align:center; padding: 2rem;">
                            <i data-lucide="map" style="width:36px; height:36px; color:var(--primary-color); margin-bottom:1rem;"></i>
                            <h4 style="font-family:var(--font-serif); margin-bottom:0.5rem;">Interactive Map Overlay</h4>
                            <p style="font-size:0.8rem; color:var(--text-secondary);">45 luxury Avenue, Manhattan, NY</p>
                        </div>
                    </div>
                </div>

                <!-- Contact Inquiry Form -->
                <div class="glass-card">
                    <h3 style="font-family:var(--font-serif); font-size:1.6rem; margin-bottom:2rem; border-bottom:1px solid rgba(255,255,255,0.05); padding-bottom:1rem;">Send Consultation Request</h3>
                    <form id="contact-inquiry-form" class="custom-form" onsubmit="submitContactForm(event)">
                        <div class="form-group">
                            <label for="contact-name">Full Name</label>
                            <input type="text" id="contact-name" placeholder="First and last name" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-email">Email Address</label>
                            <input type="email" id="contact-email" placeholder="name@domain.com" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-phone">Phone Number</label>
                            <input type="tel" id="contact-phone" placeholder="Contact number" required>
                        </div>
                        <div class="form-group">
                            <label for="contact-product">Interested Collection Item (Optional)</label>
                            <input type="text" id="contact-product" placeholder="e.g. Aura Velvet Sectional Sofa" value="${targetProduct}">
                        </div>
                        <div class="form-group">
                            <label for="contact-message">Consultation Details</label>
                            <textarea id="contact-message" rows="4" placeholder="Briefly detail your design space requirements, desired timber finish, or sizing requirements..." required></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary" style="margin-top: 1rem;">Submit Consultation Form</button>
                    </form>
                </div>
            </div>
        </section>
    `;

    if (window.lucide) lucide.createIcons();
}

window.submitContactForm = function(event) {
    event.preventDefault();

    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const phone = document.getElementById('contact-phone').value.trim();
    const product = document.getElementById('contact-product').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    const newInquiry = {
        id: 'inq-' + Date.now(),
        name,
        email,
        phone,
        product: product || 'General Showroom Consult',
        details: message,
        status: 'new',
        date: new Date().toISOString().split('T')[0]
    };

    const currentInquiries = getStateItem('inquiries');
    currentInquiries.push(newInquiry);
    setStateItem('inquiries', currentInquiries);

    alert(`Thank you, ${name}! Your consultation request regarding "${product || 'Showroom Consult'}" has been sent to our concierge.`);
    document.getElementById('contact-inquiry-form').reset();
};

// ==========================================================================
// 5. INTERACTIVE CMS ADMIN PORTAL VIEW
// ==========================================================================
let activeAdminTab = 'dashboard';

function renderAdmin(params) {
    const isLoggedIn = sessionStorage.getItem('admin_logged_in') === 'true';

    if (!isLoggedIn) {
        renderAdminLogin();
        return;
    }

    renderAdminDashboard();
}

function renderAdminLogin() {
    app.innerHTML = `
        <section class="section-wrapper container admin-login-wrapper">
            <div class="glass-card login-card">
                <div style="text-align:center; margin-bottom:2rem;">
                    <i data-lucide="lock" style="width:36px; height:36px; color:var(--primary-color); margin-bottom:1rem;"></i>
                    <h2 style="font-family:var(--font-serif);">CMS Portal</h2>
                    <p style="font-size:0.85rem; color:var(--text-secondary);">Verify administrative credentials</p>
                </div>
                <form onsubmit="handleAdminLogin(event)" class="custom-form">
                    <div class="form-group">
                        <label for="admin-passcode">Enter PIN (Default: 1234)</label>
                        <input type="password" id="admin-passcode" placeholder="••••" required style="text-align:center; letter-spacing:1em; font-size:1.5rem;">
                    </div>
                    <button type="submit" class="btn btn-primary" style="width: 100%;">Authorize Access</button>
                </form>
            </div>
        </section>
    `;
    if (window.lucide) lucide.createIcons();
}

window.handleAdminLogin = function(e) {
    e.preventDefault();
    const pin = document.getElementById('admin-passcode').value;
    if (pin === '1234') {
        sessionStorage.setItem('admin_logged_in', 'true');
        renderAdminDashboard();
    } else {
        alert('Access Denied. Incorrect PIN.');
    }
};

window.handleAdminLogout = function() {
    sessionStorage.removeItem('admin_logged_in');
    window.location.hash = '#/';
};

function renderAdminDashboard() {
    const products = getStateItem('products');
    const inquiries = getStateItem('inquiries');
    const customRequests = getStateItem('custom_requests');

    app.innerHTML = `
        <section class="section-wrapper container" style="padding-top:150px;">
            <div class="admin-layout">
                <!-- Sidebar Nav -->
                <aside class="admin-sidebar">
                    <div class="sidebar-brand">CMS Workspace</div>
                    <div class="admin-nav-btn ${activeAdminTab === 'dashboard' ? 'active' : ''}" onclick="switchAdminTab('dashboard')">
                        <i data-lucide="layout-dashboard"></i> Dashboard
                    </div>
                    <div class="admin-nav-btn ${activeAdminTab === 'products' ? 'active' : ''}" onclick="switchAdminTab('products')">
                        <i data-lucide="archive"></i> Products Catalog
                    </div>
                    <div class="admin-nav-btn ${activeAdminTab === 'requests' ? 'active' : ''}" onclick="switchAdminTab('requests')">
                        <i data-lucide="sliders"></i> Design Requests
                    </div>
                    <div class="admin-nav-btn ${activeAdminTab === 'settings' ? 'active' : ''}" onclick="switchAdminTab('settings')">
                        <i data-lucide="settings"></i> Theme Settings
                    </div>
                    <div class="admin-nav-btn" onclick="handleAdminLogout()" style="margin-top:auto; color:red;">
                        <i data-lucide="log-out"></i> Exit CMS
                    </div>
                </aside>

                <!-- Workspace Pane -->
                <main class="admin-content" id="admin-workspace-pane">
                    <!-- Tab contents injected here -->
                </main>
            </div>
        </section>
    `;

    renderAdminTabContent();
    if (window.lucide) lucide.createIcons();
}

window.switchAdminTab = function(tabName) {
    activeAdminTab = tabName;
    renderAdminDashboard();
};

function renderAdminTabContent() {
    const pane = document.getElementById('admin-workspace-pane');
    if (!pane) return;

    const products = getStateItem('products');
    const inquiries = getStateItem('inquiries');
    const customRequests = getStateItem('custom_requests');

    switch(activeAdminTab) {
        case 'dashboard':
            pane.innerHTML = `
                <div class="admin-header-row">
                    <h2 class="admin-title">Overview Metrics</h2>
                </div>
                
                <!-- KPI Widgets -->
                <div class="metrics-grid">
                    <div class="metric-card">
                        <div class="metric-header"><span>Active Catalog</span> <i data-lucide="archive"></i></div>
                        <div class="metric-val">${products.length}</div>
                        <div class="metric-label">Registered Items</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header"><span>Design Specifications</span> <i data-lucide="sliders"></i></div>
                        <div class="metric-val">${customRequests.length}</div>
                        <div class="metric-label">Custom Submissions</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header"><span>Consultation Leads</span> <i data-lucide="mail"></i></div>
                        <div class="metric-val">${inquiries.length}</div>
                        <div class="metric-label">Inquiry Cards</div>
                    </div>
                    <div class="metric-card">
                        <div class="metric-header"><span>Audited Views</span> <i data-lucide="eye"></i></div>
                        <div class="metric-val">1,248</div>
                        <div class="metric-label">Unique Site Visits</div>
                    </div>
                </div>

                <h3 style="font-size:1.2rem; margin-bottom:1.5rem; font-weight:600;">Recent Consultation inquiries</h3>
                <div class="admin-table-card">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Client Name</th>
                                <th>Phone</th>
                                <th>Requested Item</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${inquiries.length === 0 ? '<tr><td colspan="6" style="text-align:center;">No inquiries found.</td></tr>' : inquiries.slice(-5).reverse().map(inq => `
                                <tr>
                                    <td><strong>${inq.name}</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">${inq.email}</span></td>
                                    <td>${inq.phone}</td>
                                    <td>${inq.product}</td>
                                    <td>${inq.date}</td>
                                    <td><span class="status-badge status-${inq.status}">${inq.status}</span></td>
                                    <td>
                                        <div class="action-row-btns">
                                            <button onclick="toggleInquiryStatus('${inq.id}')" class="btn btn-secondary btn-xs">Toggle status</button>
                                            <button onclick="deleteInquiry('${inq.id}')" class="btn btn-outline btn-xs" style="color:red; border-color:rgba(255,0,0,0.2);">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;
            
        case 'products':
            pane.innerHTML = `
                <div class="admin-header-row">
                    <h2 class="admin-title">Manage Product Catalogue</h2>
                    <button onclick="openAddProductForm()" class="btn btn-primary btn-sm"><i data-lucide="plus" style="width:16px;"></i> Add Product</button>
                </div>

                <div id="product-form-container" style="margin-bottom: 2rem;"></div>

                <div class="admin-table-card">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Product Name</th>
                                <th>Line/Brand</th>
                                <th>Category</th>
                                <th>Featured</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${products.map(p => `
                                <tr>
                                    <td><img src="${p.image}" alt="${p.name}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;"></td>
                                    <td><strong>${p.name}</strong></td>
                                    <td>${p.brand}</td>
                                    <td>${p.category}</td>
                                    <td>${p.featured ? '<span style="color:var(--primary-color);">Yes</span>' : 'No'}</td>
                                    <td>
                                        <div class="action-row-btns">
                                            <button onclick="editProductRow('${p.id}')" class="btn btn-secondary btn-xs">Edit</button>
                                            <button onclick="deleteProductRow('${p.id}')" class="btn btn-outline btn-xs" style="color:red; border-color:rgba(255,0,0,0.2);">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;

        case 'requests':
            pane.innerHTML = `
                <div class="admin-header-row">
                    <h2 class="admin-title">Bespoke Design Requests</h2>
                </div>

                <div class="admin-table-card">
                    <table class="admin-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Timber</th>
                                <th>Fabric</th>
                                <th>Room</th>
                                <th>Sizing</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${customRequests.length === 0 ? '<tr><td colspan="7" style="text-align:center;">No custom requests found.</td></tr>' : customRequests.map(r => `
                                <tr>
                                    <td><strong>${r.name}</strong><br><span style="font-size:0.75rem; color:var(--text-muted);">${r.phone}</span></td>
                                    <td><span style="text-transform:capitalize;">${r.wood}</span></td>
                                    <td><span style="text-transform:capitalize;">${r.fabric}</span></td>
                                    <td><span style="text-transform:capitalize;">${r.room}</span></td>
                                    <td>${r.width}" Width</td>
                                    <td><span class="status-badge status-${r.status}">${r.status}</span></td>
                                    <td>
                                        <div class="action-row-btns">
                                            <button onclick="toggleCustomStatus('${r.id}')" class="btn btn-secondary btn-xs">Toggle status</button>
                                            <button onclick="deleteCustomRequest('${r.id}')" class="btn btn-outline btn-xs" style="color:red; border-color:rgba(255,0,0,0.2);">Delete</button>
                                        </div>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            `;
            break;

        case 'settings':
            const clinicName = localStorage.getItem('cms_clinic_name') || 'Velluto Studio';
            const phone = localStorage.getItem('cms_phone') || '+1 (800) 424-9980';
            const address = localStorage.getItem('cms_address') || '45 luxury Avenue, Suite 12, Manhattan, NY 10001';
            const logoUrl = localStorage.getItem('cms_logo_url') || '';
            const primaryColor = localStorage.getItem('cms_primary_color') || '#c5a880';

            pane.innerHTML = `
                <div class="admin-header-row">
                    <h2 class="admin-title">White-Label Customization</h2>
                </div>

                <div class="glass-card" style="max-width:600px;">
                    <form onsubmit="saveCmsSettings(event)" class="custom-form">
                        <div class="form-group">
                            <label for="sett-brand">Brand Studio Name</label>
                            <input type="text" id="sett-brand" value="${clinicName}" required>
                        </div>
                        <div class="form-group">
                            <label for="sett-phone">Concierge Hotline</label>
                            <input type="text" id="sett-phone" value="${phone}" required>
                        </div>
                        <div class="form-group">
                            <label for="sett-address">Showroom Address Location</label>
                            <input type="text" id="sett-address" value="${address}" required>
                        </div>
                        <div class="form-group">
                            <label for="sett-logo">Logo image URL (Optional)</label>
                            <input type="text" id="sett-logo" value="${logoUrl}" placeholder="https://domain.com/logo.png">
                        </div>
                        <div class="form-group">
                            <label for="sett-color">Primary Theme Color Accent</label>
                            <div style="display:flex; gap:1rem; align-items:center;">
                                <input type="color" id="sett-color" value="${primaryColor}" style="width:60px; height:45px; padding:0; border:none; cursor:pointer;">
                                <input type="text" id="sett-color-hex" value="${primaryColor}" style="flex:1;" oninput="document.getElementById('sett-color').value = this.value">
                            </div>
                        </div>
                        <div style="display:flex; gap:1rem; margin-top:2rem;">
                            <button type="submit" class="btn btn-primary">Save Changes</button>
                            <button type="button" onclick="resetCmsSettings()" class="btn btn-secondary">Reset to Defaults</button>
                        </div>
                    </form>
                </div>
            `;
            // Bind color picker text sync
            const cp = document.getElementById('sett-color');
            const cph = document.getElementById('sett-color-hex');
            if (cp && cph) {
                cp.addEventListener('input', () => {
                    cph.value = cp.value;
                });
            }
            break;
    }
    
    if (window.lucide) lucide.createIcons();
}

// Inquiry management
window.toggleInquiryStatus = function(id) {
    const inquiries = getStateItem('inquiries');
    const item = inquiries.find(i => i.id === id);
    if (!item) return;

    if (item.status === 'new') item.status = 'contacted';
    else if (item.status === 'contacted') item.status = 'completed';
    else item.status = 'new';

    setStateItem('inquiries', inquiries);
    renderAdminTabContent();
};

window.deleteInquiry = function(id) {
    if (!confirm('Confirm deletion of this inquiry?')) return;
    const inquiries = getStateItem('inquiries');
    const filtered = inquiries.filter(i => i.id !== id);
    setStateItem('inquiries', filtered);
    renderAdminTabContent();
};

// Custom requests status
window.toggleCustomStatus = function(id) {
    const reqs = getStateItem('custom_requests');
    const item = reqs.find(r => r.id === id);
    if (!item) return;

    if (item.status === 'new') item.status = 'contacted';
    else if (item.status === 'contacted') item.status = 'completed';
    else item.status = 'new';

    setStateItem('custom_requests', reqs);
    renderAdminTabContent();
};

window.deleteCustomRequest = function(id) {
    if (!confirm('Confirm deletion of this design request?')) return;
    const reqs = getStateItem('custom_requests');
    const filtered = reqs.filter(r => r.id !== id);
    setStateItem('custom_requests', filtered);
    renderAdminTabContent();
};

// CMS Product Catalog CRUD
window.openAddProductForm = function() {
    const container = document.getElementById('product-form-container');
    container.innerHTML = `
        <div class="glass-card" style="margin-bottom: 2rem;">
            <h3 style="margin-bottom: 1.5rem; font-family:var(--font-serif);">Register New Collection Item</h3>
            <form onsubmit="handleSaveProduct(event)" class="custom-form" id="cms-prod-form">
                <input type="hidden" id="prod-form-id" value="">
                <div class="form-group">
                    <label for="pf-name">Product Name</label>
                    <input type="text" id="pf-name" required placeholder="e.g. Amber Lounge Chair">
                </div>
                <div class="input-row">
                    <div class="form-group">
                        <label for="pf-brand">Brand Line</label>
                        <input type="text" id="pf-brand" required placeholder="e.g. Velluto Signature">
                    </div>
                    <div class="form-group">
                        <label for="pf-category">Category</label>
                        <select id="pf-category">
                            <option value="living">Living Suite</option>
                            <option value="bedroom">Bedroom Chamber</option>
                            <option value="dining">Bespoke Dining</option>
                            <option value="office">Corporate Desk</option>
                        </select>
                    </div>
                </div>
                <div class="form-group">
                    <label for="pf-image">Cover Image URL</label>
                    <input type="text" id="pf-image" required placeholder="https://images.unsplash.com/photo-...">
                </div>
                <div class="form-group">
                    <label for="pf-desc">Product Description</label>
                    <textarea id="pf-desc" rows="3" required placeholder="Write detailed specification details..."></textarea>
                </div>
                <div class="form-group" style="flex-direction:row; gap:0.5rem; align-items:center;">
                    <input type="checkbox" id="pf-featured" style="width:20px; height:20px; cursor:pointer;">
                    <label for="pf-featured" style="cursor:pointer;">Highlight in Featured Carousel</label>
                </div>
                <div style="display:flex; gap:1rem; margin-top:1.5rem;">
                    <button type="submit" class="btn btn-primary">Save Product</button>
                    <button type="button" onclick="document.getElementById('product-form-container').innerHTML = ''" class="btn btn-secondary">Cancel</button>
                </div>
            </form>
        </div>
    `;
};

window.handleSaveProduct = function(event) {
    event.preventDefault();
    const id = document.getElementById('prod-form-id').value;
    const name = document.getElementById('pf-name').value.trim();
    const brand = document.getElementById('pf-brand').value.trim();
    const category = document.getElementById('pf-category').value;
    const image = document.getElementById('pf-image').value.trim();
    const description = document.getElementById('pf-desc').value.trim();
    const featured = document.getElementById('pf-featured').checked;

    const products = getStateItem('products');

    if (id) {
        // Edit Mode
        const item = products.find(p => p.id === id);
        if (item) {
            item.name = name;
            item.brand = brand;
            item.category = category;
            item.image = image;
            item.description = description;
            item.featured = featured;
        }
    } else {
        // Add Mode
        const newProduct = {
            id: 'prod-' + Date.now(),
            name,
            brand,
            category,
            image,
            description,
            featured,
            specifications: {
                'Origin': 'Artisan Designed',
                'Status': 'Premium Line'
            }
        };
        products.push(newProduct);
    }

    setStateItem('products', products);
    document.getElementById('product-form-container').innerHTML = '';
    renderAdminTabContent();
};

window.editProductRow = function(id) {
    const products = getStateItem('products');
    const item = products.find(p => p.id === id);
    if (!item) return;

    window.openAddProductForm();
    
    // Fill values
    document.getElementById('prod-form-id').value = item.id;
    document.getElementById('pf-name').value = item.name;
    document.getElementById('pf-brand').value = item.brand;
    document.getElementById('pf-category').value = item.category;
    document.getElementById('pf-image').value = item.image;
    document.getElementById('pf-desc').value = item.description;
    document.getElementById('pf-featured').checked = item.featured || false;
};

window.deleteProductRow = function(id) {
    if (!confirm('Confirm removal of this catalog product?')) return;
    const products = getStateItem('products');
    const filtered = products.filter(p => p.id !== id);
    setStateItem('products', filtered);
    renderAdminTabContent();
};

// Settings Panel save
window.saveCmsSettings = function(event) {
    event.preventDefault();

    const brand = document.getElementById('sett-brand').value.trim();
    const phone = document.getElementById('sett-phone').value.trim();
    const address = document.getElementById('sett-address').value.trim();
    const logo = document.getElementById('sett-logo').value.trim();
    const color = document.getElementById('sett-color').value.trim();

    localStorage.setItem('cms_clinic_name', brand);
    localStorage.setItem('cms_phone', phone);
    localStorage.setItem('cms_address', address);
    localStorage.setItem('cms_logo_url', logo);
    localStorage.setItem('cms_primary_color', color);

    alert('Theme configurations successfully updated! Token replacement processing refreshed.');
    location.reload(); // Refresh to propagate tokens globally in raw template slots
};

window.resetCmsSettings = function() {
    if (!confirm('Reset all values to design team defaults?')) return;
    
    localStorage.removeItem('cms_clinic_name');
    localStorage.removeItem('cms_phone');
    localStorage.removeItem('cms_address');
    localStorage.removeItem('cms_logo_url');
    localStorage.removeItem('cms_primary_color');
    localStorage.removeItem('cms_initialized');
    localStorage.removeItem('cms_products');
    localStorage.removeItem('cms_projects');
    localStorage.removeItem('cms_blogs');
    localStorage.removeItem('cms_testimonials');
    localStorage.removeItem('cms_inquiries');
    localStorage.removeItem('cms_custom_requests');
    
    location.reload();
};
