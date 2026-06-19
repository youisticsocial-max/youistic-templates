import React, { useState, useEffect } from 'react';
import { Menu, X, Lock, Phone } from 'lucide-react';

const Navbar = ({ activePage, setActivePage, brandName, phoneNumber }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'weddings', label: 'Weddings' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'partners', label: 'Partners' },
    { id: 'testimonials', label: 'Reviews' },
    { id: 'packages', label: 'Packages' },
    { id: 'contact', label: 'Contact' }
  ];

  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <nav
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: scrolled ? '75px' : '95px',
          backgroundColor: scrolled ? 'rgba(11, 11, 11, 0.85)' : 'transparent',
          borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid rgba(255, 255, 255, 0.05)',
          backdropFilter: scrolled ? 'blur(15px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(15px)' : 'none',
          transition: 'all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1)',
          display: 'flex',
          alignItems: 'center',
          zIndex: 1000,
        }}
      >
        <div
          className="container"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          {/* Logo & Brand Name */}
          <div
            onClick={() => handleNavClick('home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              cursor: 'pointer',
            }}
          >
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '1.5px solid var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-serif)',
                fontWeight: 'bold',
                color: 'var(--color-gold)',
                background: 'rgba(91, 15, 23, 0.3)',
                boxShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
              }}
            >
              RS
            </div>
            <div>
              <span
                className="text-gold-gradient"
                style={{
                  fontFamily: 'var(--font-serif)',
                  fontSize: '1.35rem',
                  letterSpacing: '0.05em',
                  fontWeight: 'bold',
                  display: 'block',
                  lineHeight: 1,
                }}
              >
                {brandName || 'RS Music Event'}
              </span>
              <span
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  color: 'var(--color-ivory)',
                  opacity: 0.7,
                  display: 'block',
                  marginTop: '2px',
                }}
              >
                Jodhpur
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '1.5rem',
            }}
            className="desktop-menu-container"
          >
            <ul
              style={{
                display: 'flex',
                listStyle: 'none',
                gap: '1.2rem',
                margin: 0,
                padding: 0,
              }}
            >
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <li key={item.id} style={{ position: 'relative' }}>
                    <button
                      onClick={() => handleNavClick(item.id)}
                      style={{
                        fontFamily: 'var(--font-sans)',
                        fontSize: '0.85rem',
                        fontWeight: isActive ? '500' : '300',
                        color: isActive ? 'var(--color-gold)' : 'var(--color-ivory)',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        padding: '0.5rem 0',
                        transition: 'var(--transition-fast)',
                      }}
                    >
                      {item.label}
                    </button>
                    {/* Animated Underline */}
                    <div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        height: '2px',
                        width: isActive ? '100%' : '0%',
                        backgroundColor: 'var(--color-gold)',
                        boxShadow: '0 0 8px var(--color-gold)',
                        transition: 'width 0.3s cubic-bezier(0.25, 0.8, 0.25, 1)',
                      }}
                    />
                  </li>
                );
              })}
            </ul>

            {/* Lock button for Admin login */}
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                color: activePage === 'admin' ? 'var(--color-gold)' : 'var(--color-ivory)',
                opacity: activePage === 'admin' ? 1 : 0.6,
                marginLeft: '0.5rem',
                padding: '0.3rem',
                borderRadius: '50%',
                border: '1px solid transparent',
                transition: 'var(--transition-fast)',
              }}
              title="Admin Portal"
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.borderColor = 'var(--color-gold-light)';
              }}
              onMouseLeave={(e) => {
                if (activePage !== 'admin') {
                  e.currentTarget.style.opacity = '0.6';
                  e.currentTarget.style.borderColor = 'transparent';
                }
              }}
            >
              <Lock size={16} />
            </button>

            {/* CTA Book Button */}
            <button
              className="btn-gold"
              onClick={() => handleNavClick('contact')}
              style={{
                padding: '0.6rem 1.4rem',
                fontSize: '0.75rem',
                borderRadius: '4px',
              }}
            >
              Book Your Event
            </button>
          </div>

          {/* Mobile Actions */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
            className="mobile-actions-container"
          >
            {/* Direct Call Button (Quick call on Mobile) */}
            <a
              href={`tel:${phoneNumber || '+917742426653'}`}
              style={{
                width: '35px',
                height: '35px',
                borderRadius: '50%',
                border: '1px solid var(--color-glass-border)',
                backgroundColor: 'rgba(91, 15, 23, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
              }}
              title="Call Now"
            >
              <Phone size={15} />
            </a>

            {/* Burger Icon */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              style={{
                color: 'var(--color-gold)',
                padding: '0.2rem',
                zIndex: 1001,
              }}
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Full-Screen Mobile Menu Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'var(--color-black)',
          backgroundImage: 'radial-gradient(circle at center, var(--color-maroon) -20%, var(--color-black) 80%)',
          zIndex: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        }}
      >
        <div className="jaali-bg" style={{ opacity: 0.1 }} />

        <ul
          style={{
            listStyle: 'none',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '1.8rem',
            padding: 0,
            margin: 0,
            zIndex: 10,
          }}
        >
          {navItems.map((item) => {
            const isActive = activePage === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.6rem',
                    color: isActive ? 'var(--color-gold)' : 'var(--color-ivory)',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    transition: 'var(--transition-fast)',
                  }}
                >
                  {item.label}
                </button>
              </li>
            );
          })}

          <li style={{ marginTop: '1rem' }}>
            <button
              onClick={() => handleNavClick('admin')}
              style={{
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: activePage === 'admin' ? 'var(--color-gold)' : 'var(--color-ivory)',
                opacity: 0.7,
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
              }}
            >
              <Lock size={14} /> Admin CMS
            </button>
          </li>

          <li style={{ marginTop: '1.5rem' }}>
            <button
              className="btn-gold"
              onClick={() => handleNavClick('contact')}
              style={{
                padding: '0.8rem 2.2rem',
                fontSize: '0.85rem',
              }}
            >
              Book Your Event
            </button>
          </li>
        </ul>
      </div>

      {/* CSS Helper for responsive Navbar */}
      <style>{`
        @media (min-width: 992px) {
          .desktop-menu-container {
            display: flex !important;
          }
          .mobile-actions-container button {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;
