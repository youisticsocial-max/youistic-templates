/*
 * ==========================================
 * MARRIAGE GARDENS & WEDDING RESORT TEMPLATE
 * Client Side Core Application Logic
 * ==========================================
 */

// Fallback Image Mapping (Unsplash High-Res Photos for Premium Display)
const IMAGE_FALLBACKS = {
    'assets/hero-wedding-resort.jpg': 'https://images.unsplash.com/photo-1546193430-c2d20e5c848a?auto=format&fit=crop&w=1920&q=80',
    'assets/luxury-garden.jpg': 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    'assets/royal-stage.jpg': 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    'assets/banquet-hall.jpg': 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1200&q=80',
    'assets/destination-wedding.jpg': 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    'assets/night-lighting.jpg': 'https://images.unsplash.com/photo-1519225495810-7517c2965a7d?auto=format&fit=crop&w=1200&q=80',
    'assets/couple-entry.jpg': 'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80',
    'assets/resort-room.jpg': 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    'assets/food-catering.jpg': 'https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=1200&q=80',
    'assets/event-decoration.jpg': 'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=1200&q=80',
    'assets/poolside-event.jpg': 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=1200&q=80',
    'assets/bridal-setup.jpg': 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=1200&q=80',
    'assets/fireworks-celebration.jpg': 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1200&q=80'
};

// Listen globally for image load errors to automatically swap with Unsplash equivalents
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        const src = e.target.getAttribute('src');
        if (src && src.startsWith('assets/')) {
            const fallback = IMAGE_FALLBACKS[src];
            if (fallback) {
                e.target.src = fallback;
            }
        }
    }
}, true);

// Initialize Default Site Data if none exists
const MOCK_DEFAULT_DATA = {
    tokens: {
        clinic_name: "The Royal Crest Palace & Resort",
        phone: "+1 (888) 769-2575",
        address: "100 Grand Boulevard, Heritage Springs, CA 90210",
        logo_url: "https://ui-avatars.com/api/?name=Royal+Palace&background=c5a880&color=fff&rounded=true&font-size=0.33",
        primary_color: "#c5a880"
    },
    venues: [
        {
            id: 1,
            name: "Royal Wedding Garden",
            tag: "Outdoor Garden",
            image: "assets/luxury-garden.jpg",
            capacity: "1,200 Guests",
            price: "$6,500 / Day",
            description: "A breathtaking outdoor garden featuring manicured green lawns, stunning golden-lit fountains, a grand marble colonnade pavilion, and majestic floral arches.",
            features: ["Marble Pavilion Mandap", "Integrated Sound System", "Private Bridal Waiting Lounge"]
        },
        {
            id: 2,
            name: "Grand Ballroom Hall",
            tag: "Indoor Banquet",
            image: "assets/banquet-hall.jpg",
            capacity: "800 Guests",
            price: "$5,000 / Day",
            description: "An opulent indoor banquet hall detailed with sparkling crystal chandeliers, intricate gold-leaf moldings, velvet wall panels, and state-of-the-art climate control.",
            features: ["18ft High Ceiling", "Pre-function Cocktail Foyer", "Professional Acoustic Panel Design"]
        },
        {
            id: 3,
            name: "Imperial Poolside Lawn",
            tag: "Outdoor Lounge",
            image: "assets/poolside-event.jpg",
            capacity: "400 Guests",
            price: "$4,000 / Day",
            description: "A vibrant, elegant poolside setting perfect for cocktail hours, sangeet parties, and sunset wedding ceremonies, featuring luxury cabanas and modern lighting rigs.",
            features: ["Floating Acrylic Stage Area", "Outdoor Cocktail Bar Setup", "Lush Palm Tree Lighting"]
        },
        {
            id: 4,
            name: "Heritage Court & Pavilion",
            tag: "Destination Space",
            image: "assets/destination-wedding.jpg",
            capacity: "350 Guests",
            price: "$4,500 / Day",
            description: "Steeped in traditional architectural grandeur, this stone pavilion features beautiful carvings, water ponds, and a royal heritage palace backdrop.",
            features: ["Historic Stone Carvings", "Traditional Shehnai Troupe Stage", "Evening Diya Display Services"]
        },
        {
            id: 5,
            name: "The Regency Event Suite",
            tag: "Corporate & Meetings",
            image: "assets/royal-stage.jpg",
            capacity: "500 Guests",
            price: "$3,000 / Day",
            description: "A versatile space designed for conferences, corporate launch events, high-end galas, and VIP receptions with fully integrated digital projections.",
            features: ["Ultra HD Laser Projectors", "Video Conference Rigging", "Custom Stage & Lounge Configurations"]
        }
    ],
    rooms: [
        {
            id: 1,
            name: "The Palace Emperor Suite",
            image: "assets/resort-room.jpg",
            capacity: "2 Adults, 1 Child",
            amenities: ["Private Jacuzzi", "King Size Bed", "24/7 Personal Butler Service", "Panoramic Garden Balcony"]
        },
        {
            id: 2,
            name: "Heritage Villa Suite",
            image: "assets/hero-wedding-resort.jpg",
            capacity: "3 Adults",
            amenities: ["Private Plunge Pool", "Heritage Furnishings", "En-suite Luxury Bath", "Complimentary Gourmet Basket"]
        },
        {
            id: 3,
            name: "Deluxe Garden View Room",
            image: "assets/bridal-setup.jpg",
            capacity: "2 Adults",
            amenities: ["Spacious Lounge Sofa", "Mini Bar", "Walk-in Wardrobe", "Direct Garden Access Path"]
        }
    ],
    packages: [
        {
            id: 1,
            name: "Silver Celebration Package",
            price: "$3,500",
            subtitle: "Elegant Essentials",
            features: [
                "Full venue rental for 8 Hours",
                "Classic floral stage setup",
                "Premium banquet chairs and covers",
                "Basic ambient uplighting package",
                "Private bride and groom vanity rooms",
                "Dedicated venue coordinator"
            ]
        },
        {
            id: 2,
            name: "Gold Royal Package",
            price: "$7,500",
            subtitle: "The Signature Experience",
            featured: true,
            features: [
                "Lawn or Ballroom venue rental for 12 Hours",
                "Royal thematic entrance decor & carpets",
                "Exquisite centerpieces & table styling",
                "Full catering service for up to 150 guests",
                "Complimentary 1-Night stay in Heritage Suite",
                "Professional sound, lighting & LED backdrop",
                "Valet parking service for all guests"
            ]
        },
        {
            id: 3,
            name: "Platinum Grand Package",
            price: "$15,500",
            subtitle: "Uncompromising Opulence",
            features: [
                "Exclusive 24-Hour buyout of the entire estate",
                "Premium custom floral installations throughout",
                "5-Star international multi-cuisine catering",
                "3-Night stay in 3 Luxury Suites",
                "Grand fireworks show and cold-pyro entrance",
                "Pre-wedding photo shoot venue permit",
                "Full event coordination & planning team"
            ]
        }
    ],
    testimonials: [
        {
            id: 1,
            name: "Sophia & Arjun",
            role: "Bride & Groom",
            quote: "Our wedding was an absolute fairy tale. The staff transformed the Royal Garden into a royal sanctuary, and the catering was praised by every single guest. It was pure magic.",
            avatar: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?auto=format&fit=crop&w=150&h=150&q=80",
            event: "Royal Wedding Garden Ceremony"
        },
        {
            id: 2,
            name: "Elena & Marcus",
            role: "Anniversary Celebrants",
            quote: "We hosted our 25th Anniversary Gala in the Grand Ballroom. The crystal chandeliers, the butler service, and the acoustics were top-tier. Exceptional elegance from start to finish.",
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
            event: "25th Anniversary Banquet"
        },
        {
            id: 3,
            name: "Priya & Raj",
            role: "Bride & Groom",
            quote: "From the Haldi setup by the pool to the grand reception, the entire event went flawlessly. Having luxury rooms on-site made it so comfortable for our traveling family.",
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&h=150&q=80",
            event: "Destination Poolside Sangeet"
        }
    ],
    blogs: [
        {
            id: 1,
            title: "5 Royal Theme Ideas for Your Wedding Garden",
            date: "June 12, 2026",
            summary: "Explore how to bring palatial heritage themes, velvet curtains, custom floral arches, and cold fireworks into your outdoor garden celebration.",
            image: "assets/event-decoration.jpg"
        },
        {
            id: 2,
            title: "Crafting the Ultimate Luxury Fusion Catering Menu",
            date: "June 05, 2026",
            summary: "Gourmet dishes, artisanal drink pairings, and live molecular gastronomy counters are redefining the luxury wedding feast. Here is how to plan yours.",
            image: "assets/food-catering.jpg"
        },
        {
            id: 3,
            title: "Complete Timeline Checklist for Resort Weddings",
            date: "May 28, 2026",
            summary: "A stress-free resort wedding requires precise scheduling. From guest room allocations to night lighting coordination, we break it down.",
            image: "assets/night-lighting.jpg"
        }
    ],
    gallery: [
        { id: 1, category: "gardens", title: "Royal Garden Canopy", image: "assets/luxury-garden.jpg", size: "wide" },
        { id: 2, category: "banquet", title: "Chandelier Ballroom", image: "assets/banquet-hall.jpg", size: "tall" },
        { id: 3, category: "decorations", title: "Imperial Floral Arch", image: "assets/event-decoration.jpg", size: "normal" },
        { id: 4, category: "weddings", title: "Grand Couple Entry", image: "assets/couple-entry.jpg", size: "normal" },
        { id: 5, category: "rooms", title: "Emperor Suite Bedroom", image: "assets/resort-room.jpg", size: "normal" },
        { id: 6, category: "events", title: "Poolside Cocktail Evening", image: "assets/poolside-event.jpg", size: "wide" },
        { id: 7, category: "food", title: "Luxury Catering Spread", image: "assets/food-catering.jpg", size: "normal" },
        { id: 8, category: "weddings", title: "Sparkling Fireworks Exit", image: "assets/fireworks-celebration.jpg", size: "tall" }
    ],
    inquiries: [
        {
            id: "INQ-2846",
            name: "Sarah Jenkins",
            email: "sarah.j@example.com",
            phone: "+1 (555) 124-7890",
            date: "2026-09-20",
            guests: 200,
            event_type: "Wedding",
            package_id: 2, // Gold
            notes: "Needs gluten-free catering options.",
            status: "New",
            created_at: "2026-06-18T10:15:00Z"
        },
        {
            id: "INQ-9372",
            name: "Robert Henderson",
            email: "robert.h@example.com",
            phone: "+1 (555) 987-1234",
            date: "2026-11-05",
            guests: 150,
            event_type: "Anniversary",
            package_id: 1, // Silver
            notes: "Wants poolside lighting setup.",
            status: "Contacted",
            created_at: "2026-06-17T14:30:00Z"
        }
    ]
};

// Database helper
function getSiteData() {
    let data = localStorage.getItem('wedding_venue_cms_data');
    if (!data) {
        localStorage.setItem('wedding_venue_cms_data', JSON.stringify(MOCK_DEFAULT_DATA));
        return MOCK_DEFAULT_DATA;
    }
    return JSON.parse(data);
}

// Router Implementation
const routes = {
    'home': 'home-page',
    'about': 'about-page',
    'venues': 'venues-page',
    'events': 'events-page',
    'rooms': 'rooms-page',
    'gallery': 'gallery-page',
    'pricing': 'pricing-page',
    'testimonials': 'testimonials-page',
    'blog': 'blog-page',
    'contact': 'contact-page'
};

function initRouter() {
    function navigate() {
        const hash = window.location.hash.substring(1) || 'home';
        const targetPage = routes[hash] || 'home-page';
        
        // Hide all pages
        document.querySelectorAll('.app-section').forEach(section => {
            section.classList.remove('active-page');
        });
        
        // Show target page
        const targetElement = document.getElementById(targetPage);
        if (targetElement) {
            targetElement.classList.add('active-page');
        }
        
        // Update menu links
        document.querySelectorAll('.nav-links a, .mobile-nav ul a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${hash}`) {
                link.classList.add('active');
            }
        });
        
        // Close mobile nav on transition
        const mobileNav = document.querySelector('.mobile-nav');
        const menuToggle = document.querySelector('.menu-toggle');
        if (mobileNav && mobileNav.classList.contains('active')) {
            mobileNav.classList.remove('active');
            menuToggle.classList.remove('open');
            document.body.style.overflow = '';
        }
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    
    window.addEventListener('hashchange', navigate);
    navigate();
}

// Token DOM Replacement
function replaceTokensInDOM() {
    const data = getSiteData();
    
    // Fallbacks if token strings are still in DOM
    const tokens = {
        '{{CLINIC_NAME}}': data.tokens.clinic_name,
        '{{PHONE}}': data.tokens.phone,
        '{{ADDRESS}}': data.tokens.address,
        '{{LOGO_URL}}': data.tokens.logo_url,
        '{{PRIMARY_COLOR}}': data.tokens.primary_color
    };
    
    // Dynamic styles
    const primaryColor = data.tokens.primary_color;
    if (primaryColor && !primaryColor.startsWith('{{')) {
        document.documentElement.style.setProperty('--primary-color', primaryColor);
    } else {
        document.documentElement.style.setProperty('--primary-color', 'var(--primary-fallback)');
    }
    
    function traverse(node) {
        if (node.nodeType === Node.TEXT_NODE) {
            let text = node.nodeValue;
            let updated = false;
            for (const [key, val] of Object.entries(tokens)) {
                if (text.includes(key)) {
                    text = text.replaceAll(key, val);
                    updated = true;
                }
            }
            if (updated) node.nodeValue = text;
        } else if (node.nodeType === Node.ELEMENT_NODE) {
            for (let i = 0; i < node.attributes.length; i++) {
                const attr = node.attributes[i];
                let val = attr.value;
                let updated = false;
                for (const [key, valToken] of Object.entries(tokens)) {
                    if (val.includes(key)) {
                        val = val.replaceAll(key, valToken);
                        updated = true;
                    }
                }
                if (updated) attr.value = val;
            }
            node.childNodes.forEach(traverse);
        }
    }
    traverse(document.documentElement);
}

// Render Venues
function renderVenues() {
    const data = getSiteData();
    const grid = document.getElementById('venues-grid-render');
    const showcaseGrid = document.getElementById('showcase-venues-grid');
    if (!grid && !showcaseGrid) return;
    
    let html = '';
    data.venues.forEach(venue => {
        html += `
        <div class="luxury-card scroll-reveal">
            <div class="card-img-wrapper">
                <img src="${venue.image}" alt="${venue.name}" loading="lazy">
                <span class="card-tag">${venue.tag}</span>
            </div>
            <div class="card-content">
                <h3>${venue.name}</h3>
                <div class="card-meta">
                    <span>👥 Capacity: ${venue.capacity}</span>
                    <span>📍 Venue Lounge</span>
                </div>
                <p class="card-desc">${venue.description}</p>
                <div class="card-cta-row">
                    <span class="card-price">${venue.price}</span>
                    <a href="#contact" class="btn btn-gold btn-outline">Inquire Space</a>
                </div>
            </div>
        </div>`;
    });
    
    if (grid) grid.innerHTML = html;
    
    // For homepage showcase (limit to first 3)
    if (showcaseGrid) {
        let showcaseHtml = '';
        data.venues.slice(0, 3).forEach(venue => {
            showcaseHtml += `
            <div class="luxury-card scroll-reveal">
                <div class="card-img-wrapper">
                    <img src="${venue.image}" alt="${venue.name}" loading="lazy">
                    <span class="card-tag">${venue.tag}</span>
                </div>
                <div class="card-content">
                    <h3>${venue.name}</h3>
                    <div class="card-meta">
                        <span>👥 Capacity: ${venue.capacity}</span>
                        <span>✨ Features Included</span>
                    </div>
                    <p class="card-desc">${venue.description}</p>
                    <div class="card-cta-row">
                        <span class="card-price">${venue.price}</span>
                        <a href="#contact" class="btn btn-gold btn-outline">Explore Space</a>
                    </div>
                </div>
            </div>`;
        });
        showcaseGrid.innerHTML = showcaseHtml;
    }
}

// Render Rooms
function renderRooms() {
    const data = getSiteData();
    const grid = document.getElementById('rooms-grid-render');
    const showcaseGrid = document.getElementById('showcase-rooms-grid');
    if (!grid && !showcaseGrid) return;
    
    let html = '';
    data.rooms.forEach(room => {
        let amenitiesHtml = room.amenities.map(a => `<li>✓ ${a}</li>`).join('');
        html += `
        <div class="luxury-card scroll-reveal">
            <div class="card-img-wrapper">
                <img src="${room.image}" alt="${room.name}" loading="lazy">
                <span class="card-tag">5-Star Luxury Suite</span>
            </div>
            <div class="card-content">
                <h3>${room.name}</h3>
                <div class="card-meta">
                    <span>👥 Sleeps: ${room.capacity}</span>
                    <span>🌟 All Inclusive</span>
                </div>
                <ul class="pricing-features" style="margin-bottom: 1.5rem; text-align: left;">
                    ${amenitiesHtml}
                </ul>
                <div class="card-cta-row">
                    <span class="card-price">Resort Accommodations</span>
                    <a href="#contact" class="btn btn-gold btn-outline">Book Room</a>
                </div>
            </div>
        </div>`;
    });
    
    if (grid) grid.innerHTML = html;
    
    if (showcaseGrid) {
        let scHtml = '';
        data.rooms.slice(0, 2).forEach(room => {
            scHtml += `
            <div class="luxury-card scroll-reveal">
                <div class="card-img-wrapper">
                    <img src="${room.image}" alt="${room.name}" loading="lazy">
                    <span class="card-tag">Luxury Suite</span>
                </div>
                <div class="card-content">
                    <h3>${room.name}</h3>
                    <div class="card-meta">
                        <span>👥 Sleeps: ${room.capacity}</span>
                    </div>
                    <p class="card-desc">Designed with royal elegance and state of the art amenities for key wedding guests.</p>
                    <div class="card-cta-row">
                        <a href="#contact" class="btn btn-gold btn-outline">Request Booking</a>
                    </div>
                </div>
            </div>`;
        });
        showcaseGrid.innerHTML = scHtml;
    }
}

// Render Packages
function renderPackages() {
    const data = getSiteData();
    const grid = document.getElementById('packages-grid-render');
    if (!grid) return;
    
    let html = '';
    data.packages.forEach(pkg => {
        let featuresHtml = pkg.features.map(f => `<li>${f}</li>`).join('');
        html += `
        <div class="pricing-card ${pkg.featured ? 'featured' : ''} scroll-reveal">
            ${pkg.featured ? '<span class="featured-label">Most Popular</span>' : ''}
            <div class="pricing-header">
                <h3>${pkg.name}</h3>
                <div class="pricing-price">${pkg.price}</div>
                <div class="pricing-subtitle">${pkg.subtitle}</div>
            </div>
            <ul class="pricing-features">
                ${featuresHtml}
            </ul>
            <a href="#contact" class="btn ${pkg.featured ? 'btn-primary' : 'btn-gold btn-outline'}" style="width: 100%;">Select Package</a>
        </div>`;
    });
    
    grid.innerHTML = html;
}

// Render Testimonials Carousel
function renderTestimonials() {
    const data = getSiteData();
    const slider = document.getElementById('testimonials-slider-render');
    const dotsContainer = document.getElementById('testimonials-dots-render');
    if (!slider) return;
    
    let html = '';
    let dotsHtml = '';
    
    data.testimonials.forEach((test, idx) => {
        html += `
        <div class="testimonial-slide ${idx === 0 ? 'active' : ''}" data-index="${idx}">
            <img src="${test.avatar}" alt="${test.name}" class="testimonial-avatar" loading="lazy">
            <p class="testimonial-quote">"${test.quote}"</p>
            <div class="testimonial-author">${test.name}</div>
            <div class="testimonial-event">${test.event}</div>
        </div>`;
        
        dotsHtml += `
        <button class="slider-dot ${idx === 0 ? 'active' : ''}" data-index="${idx}"></button>`;
    });
    
    slider.innerHTML = html;
    if (dotsContainer) dotsContainer.innerHTML = dotsHtml;
    
    // Activate Testimonial Carousel slider interval
    let currentIndex = 0;
    const slides = slider.querySelectorAll('.testimonial-slide');
    const dots = dotsContainer ? dotsContainer.querySelectorAll('.slider-dot') : [];
    
    function showSlide(index) {
        slides.forEach(s => s.classList.remove('active'));
        if (dots.length) dots.forEach(d => d.classList.remove('active'));
        
        slides[index].classList.add('active');
        if (dots[index]) dots[index].classList.add('active');
        currentIndex = index;
    }
    
    // Dot click triggers
    if (dotsContainer) {
        dotsContainer.addEventListener('click', e => {
            if (e.target.classList.contains('slider-dot')) {
                const idx = parseInt(e.target.getAttribute('data-index'));
                showSlide(idx);
            }
        });
    }
    
    // Auto rotation
    setInterval(() => {
        let next = (currentIndex + 1) % slides.length;
        showSlide(next);
    }, 6000);
}

// Render Blog
function renderBlog() {
    const data = getSiteData();
    const grid = document.getElementById('blog-grid-render');
    if (!grid) return;
    
    let html = '';
    data.blogs.forEach(post => {
        html += `
        <div class="blog-card scroll-reveal">
            <div class="blog-img">
                <img src="${post.image}" alt="${post.title}" loading="lazy">
            </div>
            <div class="blog-content">
                <div class="blog-date">${post.date}</div>
                <h3>${post.title}</h3>
                <p>${post.summary}</p>
                <a href="#contact" class="blog-link">Read More ➔</a>
            </div>
        </div>`;
    });
    
    grid.innerHTML = html;
}

// Render Gallery Masonry
function renderGallery() {
    const data = getSiteData();
    const grid = document.getElementById('gallery-grid-render');
    if (!grid) return;
    
    let html = '';
    data.gallery.forEach(item => {
        html += `
        <div class="gallery-item ${item.size || 'normal'} scroll-reveal" data-category="${item.category}" data-img="${item.image}" data-title="${item.title}">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
            <div class="gallery-item-overlay">
                <h4>${item.title}</h4>
                <p>${item.category}</p>
            </div>
        </div>`;
    });
    
    grid.innerHTML = html;
    
    // Filter controls handler
    const filters = document.getElementById('gallery-filters-render');
    if (filters) {
        filters.addEventListener('click', e => {
            if (e.target.classList.contains('filter-btn')) {
                filters.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
                e.target.classList.add('active');
                
                const filterValue = e.target.getAttribute('data-filter');
                const items = grid.querySelectorAll('.gallery-item');
                
                items.forEach(item => {
                    const cat = item.getAttribute('data-category');
                    if (filterValue === 'all' || cat === filterValue) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            }
        });
    }
    
    // Lightbox modal trigger
    const lightbox = document.getElementById('lightbox-modal');
    const lightboxImg = lightbox ? lightbox.querySelector('img') : null;
    const lightboxTitle = lightbox ? lightbox.querySelector('.lightbox-title') : null;
    
    if (lightbox && lightboxImg) {
        grid.addEventListener('click', e => {
            const item = e.target.closest('.gallery-item');
            if (item) {
                const imgPath = item.getAttribute('data-img');
                const title = item.getAttribute('data-title');
                
                // Set path with error checking mapping fallback
                const fallback = IMAGE_FALLBACKS[imgPath] || imgPath;
                lightboxImg.src = fallback;
                if (lightboxTitle) lightboxTitle.innerText = title;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        
        lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

// Particle Floating Sparks Effect on Canvas
function initParticlesCanvas() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    const particleCount = 40;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    class Sparkle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = canvas.height + Math.random() * 50;
            this.size = Math.random() * 2.5 + 0.5;
            this.speed = Math.random() * 0.8 + 0.2;
            this.opacity = Math.random() * 0.5 + 0.1;
            this.fadeSpeed = Math.random() * 0.005 + 0.002;
            this.wobble = Math.random() * 1.5 - 0.75;
            this.wobbleSpeed = Math.random() * 0.02 + 0.01;
            this.wobbleVal = Math.random() * Math.PI;
        }
        update() {
            this.y -= this.speed;
            this.wobbleVal += this.wobbleSpeed;
            this.x += Math.sin(this.wobbleVal) * this.wobble;
            
            if (this.y < -10) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            // Draw luxury gold sparkle color
            ctx.fillStyle = `rgba(197, 168, 128, ${this.opacity})`;
            ctx.shadowBlur = 10;
            ctx.shadowColor = 'rgba(197, 168, 128, 0.4)';
            ctx.fill();
        }
    }
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Sparkle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// Rose Petals Canvas Effect
function initPetalsCanvas() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let petals = [];
    const petalCount = 25;
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();
    
    class Petal {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = -20 - Math.random() * 100;
            this.size = Math.random() * 8 + 6;
            this.speedY = Math.random() * 1.2 + 0.6;
            this.speedX = Math.random() * 0.8 - 0.4;
            this.opacity = Math.random() * 0.6 + 0.3;
            this.angle = Math.random() * Math.PI * 2;
            this.spinSpeed = Math.random() * 0.02 - 0.01;
            // Slightly varied rose/pink colors
            const colors = [
                'rgba(244, 63, 94, opacity)',  // rose red
                'rgba(251, 113, 133, opacity)', // light rose
                'rgba(225, 29, 72, opacity)'   // dark rose
            ];
            this.colorTemplate = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.y += this.speedY;
            this.x += this.speedX + Math.sin(this.y / 30) * 0.4;
            this.angle += this.spinSpeed;
            
            if (this.y > canvas.height + 20 || this.x < -20 || this.x > canvas.width + 20) {
                this.reset();
            }
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.angle);
            ctx.beginPath();
            
            // Draw a beautiful organic petal shape
            ctx.moveTo(0, 0);
            ctx.bezierCurveTo(-this.size, -this.size / 2, -this.size, this.size, 0, this.size * 1.5);
            ctx.bezierCurveTo(this.size, this.size, this.size, -this.size / 2, 0, 0);
            
            ctx.fillStyle = this.colorTemplate.replace('opacity', this.opacity);
            ctx.fill();
            ctx.restore();
        }
    }
    
    for (let i = 0; i < petalCount; i++) {
        petals.push(new Petal());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        petals.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
}

// Hero Image Cinematic Zooming Slider
function initHeroSlider() {
    const slider = document.getElementById('hero-slider-container');
    if (!slider) return;
    
    const images = [
        'assets/hero-wedding-resort.jpg',
        'assets/luxury-garden.jpg',
        'assets/banquet-hall.jpg',
        'assets/night-lighting.jpg'
    ];
    
    let html = '';
    images.forEach((img, idx) => {
        // Resolve fallback image
        const realImg = IMAGE_FALLBACKS[img] || img;
        html += `<div class="hero-slide ${idx === 0 ? 'active' : ''}" style="background-image: url('${realImg}');"></div>`;
    });
    slider.innerHTML = html;
    
    let slides = slider.querySelectorAll('.hero-slide');
    let current = 0;
    
    setInterval(() => {
        slides[current].classList.remove('active');
        current = (current + 1) % slides.length;
        slides[current].classList.add('active');
    }, 6000);
}

// Intersection Observer for Scroll Reveals
function initScrollReveals() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Query scroll-reveal elements
    document.querySelectorAll('.scroll-reveal, .luxury-card, .feature-card, .pricing-card').forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });
}

// Navigation Controls
function initNavigation() {
    const header = document.querySelector('header');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    // Sticky header scroll trigger
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Mobile menu toggle
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('open');
            mobileNav.classList.toggle('active');
            
            // Toggle body scroll lock
            if (mobileNav.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
    }
}

// Booking Form Inquiry Submissions
function initBookingForm() {
    const form = document.getElementById('booking-inquiry-form');
    if (!form) return;
    
    // Load Packages select option values dynamically
    const data = getSiteData();
    const pkgSelect = form.querySelector('select[name="package_id"]');
    if (pkgSelect && data.packages) {
        let pkgOptions = '<option value="">Select Package Option...</option>';
        data.packages.forEach(pkg => {
            pkgOptions += `<option value="${pkg.id}">${pkg.name} (${pkg.price})</option>`;
        });
        pkgSelect.innerHTML = pkgOptions;
    }
    
    form.addEventListener('submit', e => {
        e.preventDefault();
        
        // Form field data gathering
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const eventDate = formData.get('event_date');
        const guests = parseInt(formData.get('guests'));
        const eventType = formData.get('event_type');
        const pkgId = parseInt(formData.get('package_id')) || null;
        const notes = formData.get('notes') || '';
        
        if (!name || !email || !phone || !eventDate || !guests || !eventType) {
            alert("Please fill in all required fields to submit your inquiry.");
            return;
        }
        
        // Create new inquiry structure
        const newInquiry = {
            id: 'INQ-' + Math.floor(1000 + Math.random() * 9000),
            name: name,
            email: email,
            phone: phone,
            date: eventDate,
            guests: guests,
            event_type: eventType,
            package_id: pkgId,
            notes: notes,
            status: "New",
            created_at: new Date().toISOString()
        };
        
        // Save to LocalStorage
        const currentData = getSiteData();
        currentData.inquiries.unshift(newInquiry);
        localStorage.setItem('wedding_venue_cms_data', JSON.stringify(currentData));
        
        // Show success alert
        showSuccessPopup();
        form.reset();
    });
}

function showSuccessPopup() {
    // Create glass success popup
    const popup = document.createElement('div');
    popup.className = 'glass-dark';
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.padding = '3rem';
    popup.style.color = '#fff';
    popup.style.textAlign = 'center';
    popup.style.zIndex = '3000';
    popup.style.boxShadow = '0 25px 50px rgba(0,0,0,0.5)';
    popup.style.border = '1px solid var(--primary-color, var(--primary-fallback))';
    popup.style.width = '90%';
    popup.style.maxWidth = '500px';
    
    const resolvedName = getSiteData().tokens.clinic_name;
    
    popup.innerHTML = `
        <h3 class="serif-text" style="font-size: 2.2rem; color: var(--primary-color, var(--primary-fallback)); margin-bottom: 1rem;">Royal Invitation Received</h3>
        <p style="font-size: 0.95rem; margin-bottom: 2rem;">Thank you for choosing ${resolvedName}. A luxury wedding curator will contact you shortly to personalize your tour experience.</p>
        <button class="btn btn-primary" id="success-close-btn" style="min-width: 150px;">Close</button>
    `;
    
    document.body.appendChild(popup);
    
    document.getElementById('success-close-btn').addEventListener('click', () => {
        popup.remove();
    });
}

// Global image error fallback
document.addEventListener('error', function(e) {
    if (e.target.tagName === 'IMG') {
        const src = e.target.getAttribute('src');
        if (src && src.startsWith('assets/')) {
            const fallback = IMAGE_FALLBACKS[src];
            if (fallback && e.target.src !== fallback) {
                e.target.src = fallback;
            } else if (e.target.src && !e.target.src.includes('picsum.photos')) {
                e.target.src = 'https://picsum.photos/1200/800?random=' + Math.floor(Math.random() * 1000);
            }
        } else if (e.target.src && e.target.src.includes('unsplash.com') && !e.target.src.includes('picsum.photos')) {
            e.target.src = 'https://picsum.photos/1200/800?random=' + Math.floor(Math.random() * 1000);
        }
    }
}, true);

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
    // 1. Resolve tokens and content bindings
    replaceTokensInDOM();
    
    // 2. Render dynamic content
    renderVenues();
    renderRooms();
    renderPackages();
    renderTestimonials();
    renderBlog();
    renderGallery();
    
    // 3. Initialize interactive features
    initRouter();
    initNavigation();
    initHeroSlider();
    initParticlesCanvas();
    initPetalsCanvas();
    initScrollReveals();
    initBookingForm();
});
