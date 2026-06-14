document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const mobileOverlay = document.getElementById('mobile-overlay');
    const logoHome = document.getElementById('logo-home');
    const heroBg = document.querySelector('.hero-bg');
    let openPage = null;

    // ===== SLIDE PAGE OPEN/CLOSE =====
    function openSlidePage(name) {
        if (name === 'home') { closeSlidePage(); return; }
        const page = document.getElementById(`page-${name}`);
        if (!page) return;
        // Close any currently open page first
        if (openPage) {
            document.getElementById(`page-${openPage}`)?.classList.remove('open');
        }
        page.classList.add('open');
        document.body.classList.add('no-scroll');
        openPage = name;
        updateActiveNav(name);
    }

    function closeSlidePage() {
        if (openPage) {
            document.getElementById(`page-${openPage}`)?.classList.remove('open');
            openPage = null;
        }
        document.body.classList.remove('no-scroll');
        updateActiveNav(null);
    }

    function updateActiveNav(name) {
        document.querySelectorAll('.nav-link').forEach(l => {
            l.classList.toggle('active', l.getAttribute('data-page') === name);
        });
    }

    // All [data-page] buttons
    document.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-page');
            if (target === 'home') {
                closeSlidePage();
            } else {
                openSlidePage(target);
            }
            // Close mobile nav
            mobileOverlay.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });

    // Logo => close slide page, go home
    logoHome.addEventListener('click', (e) => {
        e.preventDefault();
        closeSlidePage();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Escape to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeSlidePage();
    });

    // ===== HAMBURGER =====
    hamburger.addEventListener('click', () => {
        const isOpen = mobileOverlay.classList.contains('active');
        mobileOverlay.classList.toggle('active', !isOpen);
        hamburger.classList.toggle('open', !isOpen);
    });

    // ===== NAVBAR SCROLL + HERO PARALLAX =====
    window.addEventListener('scroll', () => {
        const s = window.scrollY;
        navbar.classList.toggle('scrolled', s > 60);
        if (heroBg && s < window.innerHeight) {
            heroBg.style.transform = `translateY(${s * 0.25}px) scale(${1 + s * 0.0002})`;
        }
    });

    // ===== SCROLL REVEAL =====
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(el => observer.observe(el));

    // ===== VIDEO =====
    const videoThumb = document.getElementById('video-thumb');
    const videoIframe = document.getElementById('video-iframe');
    const ytFrame = document.getElementById('yt-frame');
    const playBtn = document.getElementById('play-btn');

    function playVideo() {
        if (!ytFrame || !videoThumb || !videoIframe) return;
        ytFrame.src = 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';
        videoThumb.classList.add('hidden');
        videoIframe.classList.remove('hidden');
    }
    if (playBtn) playBtn.addEventListener('click', playVideo);

    // ===== QUOTE FORM =====
    const form = document.getElementById('quote-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const n = document.getElementById('name').value;
            const p = document.getElementById('phone').value;
            const pr = document.getElementById('product').value;
            const g = document.getElementById('grade').value;
            const t = document.getElementById('thickness').value;
            const q = document.getElementById('quantity').value;
            let msg = `*New Bulk Enquiry*\n\n*Name:* ${n}\n*Phone:* ${p}\n*Product:* ${pr}\n*Grade:* ${g}\n`;
            if (t) msg += `*Thickness:* ${t}\n`;
            msg += `*Quantity:* ${q}\n\nPlease provide trade pricing.`;
            window.open(`https://wa.me/919829323339?text=${encodeURIComponent(msg)}`, '_blank');
        });
    }
});
