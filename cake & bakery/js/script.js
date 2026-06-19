// --- TEMPLATE PREVIEW MODE ---
// Replaces raw tokens with premium mock data so the local preview looks stunning.
document.addEventListener('DOMContentLoaded', () => {
    if (document.body.innerHTML.includes('{{CLINIC_NAME}}')) {
        const mockData = {
            '{{CLINIC_NAME}}': 'Lumière Artisan Bakery',
            '{{PHONE}}': '+1 (555) 987-6543',
            '{{ADDRESS}}': '456 Luxury Lane, New York, NY',
            '{{CURRENCY_SYMBOL}}': '$'
        };

        // Replace text tokens
        let html = document.body.innerHTML;
        for (const [token, value] of Object.entries(mockData)) {
            const regex = new RegExp(token.replace(/[{}]/g, '\\$&'), 'g');
            html = html.replace(regex, value);
        }
        document.body.innerHTML = html;

        // Fix broken logo
        const logos = document.querySelectorAll('img[src="{{LOGO_URL}}"]');
        logos.forEach(logo => {
            logo.outerHTML = '<h2 style="font-family: var(--font-heading); color: var(--primary-color); margin: 0; font-size: 1.8rem; letter-spacing: 2px;">LUMIÈRE.</h2>';
        });

        // Set primary color fallback if not set by CSS
        document.documentElement.style.setProperty('--primary-color', '#C5A059');
        document.title = 'Lumière Artisan Bakery | Premium Template';
    }
    
    initInteractions();
});

function initInteractions() {
// --- Sticky Navigation & Mobile Menu ---
const navbar = document.querySelector('.navbar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// For a real implementation, you'd add a full mobile menu overlay here
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        // Toggle mobile menu visibility
        // Example simple toggle:
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.flexDirection = 'column';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '100%';
        navMenu.style.left = '0';
        navMenu.style.width = '100%';
        navMenu.style.background = 'var(--surface-light)';
        navMenu.style.backdropFilter = 'blur(10px)';
        navMenu.style.padding = '2rem';
        // Needs proper CSS for production mobile menu, simplified here
    });
}

// --- Scroll Reveal Animations ---
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 100;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);
reveal(); // Trigger on load

// --- Favorite Button Toggle ---
const favButtons = document.querySelectorAll('.favorite-btn');
favButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const icon = btn.querySelector('i');
        if(icon.classList.contains('far')) {
            icon.classList.remove('far');
            icon.classList.add('fas');
            icon.style.color = 'var(--primary-color)';
        } else {
            icon.classList.remove('fas');
            icon.classList.add('far');
            icon.style.color = '';
        }
    });
});
}
