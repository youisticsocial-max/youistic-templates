import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Collections', path: '/collections/tiles' },
    { name: 'Spaces', path: '/spaces' },
    { name: 'Projects', path: '/projects' },
    { name: 'Designers', path: '/designers' },
    { name: 'About', path: '/about' },
  ];

  return (
    <>
      <header className={`navbar ${scrolled ? 'glass-panel scrolled' : ''}`} style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'all 0.4s ease',
        padding: scrolled ? '1rem 0' : '2rem 0'
      }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <img src={window.location.hostname === 'localhost' ? '/assets/logo.svg' : '{{LOGO_URL}}'} alt={"{{CLINIC_NAME}}"} style={{ height: '40px', objectFit: 'contain' }} />
          </Link>
          
          <nav className="desktop-nav" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} className="nav-link" style={{ 
                fontSize: '0.9rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.05em',
                fontWeight: 500
              }}>
                {link.name}
              </Link>
            ))}
            <Link to="/contact" className="btn btn-primary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.8rem' }}>
              Contact Us
            </Link>
            <button className="search-btn" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <Search size={20} />
            </button>
          </nav>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(true)} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'none' }}>
            <Menu size={28} />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ type: 'tween', duration: 0.5 }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'var(--bg-color)',
              zIndex: 2000,
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
              <img src={window.location.hostname === 'localhost' ? '/assets/logo.svg' : '{{LOGO_URL}}'} alt={"{{CLINIC_NAME}}"} style={{ height: '40px' }} />
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={32} />
              </button>
            </div>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} onClick={() => setMobileMenuOpen(false)} style={{
                  fontSize: '2rem',
                  fontWeight: 300,
                  borderBottom: '1px solid var(--border-color)',
                  paddingBottom: '1rem'
                }}>
                  {link.name}
                </Link>
              ))}
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="btn btn-primary" style={{ marginTop: '2rem' }}>
                Contact Us
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      <style>{`
        .nav-link { position: relative; }
        .nav-link::after {
          content: ''; position: absolute; width: 0; height: 2px;
          bottom: -4px; left: 0; background-color: var(--primary-color);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after { width: 100%; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </>
  );
}