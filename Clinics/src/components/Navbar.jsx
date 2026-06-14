import React, { useState, useEffect } from 'react';
import { Phone, Menu, X, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className={`fixed-nav ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        
        {/* Sleek Logo */}
        <a href="#home" className="logo" onClick={closeMobileMenu}>
          <div className="logo-icon-sleek">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 2C8.5 2 6 4.5 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.5-2.5-8-6-8z" />
            </svg>
          </div>
          <div className="logo-text-sleek">
            <span className="brand-primary">{{CLINIC_NAME}}'s</span>
            <span className="brand-secondary">DENTAL CURE</span>
          </div>
        </a>

        {/* Centered Navigation Links */}
        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#services">Services</a>
          <a href="#why-choose-us">Why Us</a>
          <a href="#team">Our Doctors</a>
          <a href="#testimonials">Reviews</a>
        </div>

        {/* Right Actions: Badge & Call Button */}
        <div className="nav-actions">
          <div className="nav-badge-sleek">
            <ShieldCheck size={16} className="badge-icon-sleek" />
            <span>NABH Accredited</span>
          </div>

          <a href="#appointment" className="nav-btn-book">
            Book Appointment
          </a>

          <a href="tel:{{PHONE}}" className="nav-phone-sleek">
            <Phone size={16} />
            <span>{{PHONE}}</span>
          </a>

          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={toggleMobileMenu} aria-label="Toggle Menu">
            {isMobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          <a href="#home" onClick={closeMobileMenu}>Home</a>
          <a href="#services" onClick={closeMobileMenu}>Services</a>
          <a href="#why-choose-us" onClick={closeMobileMenu}>Why Choose Us</a>
          <a href="#team" onClick={closeMobileMenu}>Our Doctors</a>
          <a href="#testimonials" onClick={closeMobileMenu}>Reviews</a>
          
          <div className="mobile-divider"></div>
          
          <a href="#appointment" onClick={closeMobileMenu} className="mobile-btn-book">
            Book Appointment
          </a>
          
          <div className="mobile-extra-info">
            <div className="mobile-badge-sleek">
              <ShieldCheck size={18} className="badge-icon-sleek" />
              <span>NABH Certified Clinic</span>
            </div>
            <a href="tel:{{PHONE}}" className="mobile-phone-link">
              <Phone size={18} />
              <span>{{PHONE}}</span>
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
