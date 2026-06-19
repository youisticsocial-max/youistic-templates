/*
 * Premium Luxury Salon & Bridal Studio
 * Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animation Library if available
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 50,
            easing: 'ease-in-out-cubic'
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            // Toggle FontAwesome icon between bars and times
            const icon = navToggle.querySelector('i');
            if(icon) {
                if(navLinks.classList.contains('active')) {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                } else {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = navToggle.querySelector('i');
                if(icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Update the year dynamically in footer if exists
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- LOCAL PREVIEW HELPERS ---
    // This script dynamically replaces template tokens for local development preview.
    // The raw HTML remains compliant with the white-label requirements.
    
    // Replace {{LOGO_URL}} with local logo
    document.querySelectorAll('img').forEach(img => {
        if (img.getAttribute('src') === '{{LOGO_URL}}' || img.src.includes('%7B%7BLOGO_URL%7D%7D')) {
            img.src = 'assets/logo.png';
        }
        if (img.getAttribute('alt') === '{{CLINIC_NAME}}') {
            img.alt = 'Aura Beauty Clinic';
        }
    });

    // Replace text tokens
    const walkDOM = function(node, func) {
        func(node);
        node = node.firstChild;
        while (node) {
            walkDOM(node, func);
            node = node.nextSibling;
        }
    };
    
    walkDOM(document.body, function(node) {
        if (node.nodeType === 3) { // Text node
            let text = node.nodeValue;
            if (text.includes('{{CLINIC_NAME}}')) {
                node.nodeValue = text.replace(/\{\{CLINIC_NAME\}\}/g, 'Aura Beauty');
            }
            if (text.includes('{{PHONE}}')) {
                node.nodeValue = text.replace(/\{\{PHONE\}\}/g, '+91 98765 43210');
            }
            if (text.includes('{{ADDRESS}}')) {
                node.nodeValue = text.replace(/\{\{ADDRESS\}\}/g, '123 Luxury Avenue, Beverly Hills');
            }
        }
    });
});
