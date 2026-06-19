import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  const logoUrl = '{{LOGO_URL}}';
  const displayLogo = (!logoUrl || logoUrl.startsWith('{{')) ? '/assets/logo.png' : logoUrl;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Memberships', path: '/membership' },
    { name: 'Trainers', path: '/trainers' },
    { name: 'Transformations', path: '/transformations' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Schedule', path: '/schedule' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page navigation
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="container nav-container">
          <Link to="/" className="nav-logo-link">
            <img src={displayLogo} alt="{{CLINIC_NAME}}" className="nav-logo" />
            <span className="nav-logo-text">{"{{CLINIC_NAME}}"}</span>
          </Link>

          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <li key={link.name} className="nav-item">
                  <Link to={link.path} className={`nav-link-btn ${isActive ? 'active' : ''}`}>
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="activeUnderline" 
                        className="active-underline" 
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="nav-cta-wrapper">
            <Link to="/contact" className="btn btn-primary nav-cta">
              Join Now <ArrowRight size={16} />
            </Link>
            <Link to="/admin" className="admin-btn-nav">
              Admin
            </Link>
            <button className="mobile-toggle" onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mobile-nav-drawer"
          >
            <div className="mobile-drawer-header">
              <img src={displayLogo} alt="{{CLINIC_NAME}}" className="nav-logo" />
              <button className="mobile-drawer-close" onClick={() => setIsOpen(false)}>
                <X size={30} />
              </button>
            </div>
            
            <div className="mobile-drawer-links">
              {navLinks.map((link, idx) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Link 
                      to={link.path} 
                      className={`mobile-drawer-link ${isActive ? 'active' : ''}`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                className="mobile-drawer-cta-box"
              >
                <Link to="/contact" className="btn btn-primary mobile-drawer-cta">
                  Join Now <ArrowRight size={16} />
                </Link>
                <Link to="/admin" className="btn btn-outline mobile-drawer-admin" style={{ marginTop: '12px' }}>
                  Admin Dashboard
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
