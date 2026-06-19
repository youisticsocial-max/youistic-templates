import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, Phone } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src={"{{LOGO_URL}}".includes('{') ? '/assets/logo.png' : "{{LOGO_URL}}"} alt={"{{CLINIC_NAME}}"} />
        </Link>

        <nav className={`nav ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="nav-links">
            <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
            <Link to="/about" className={location.pathname === '/about' ? 'active' : ''}>About Us</Link>
            <div className="dropdown">
              <Link to="/products" className={location.pathname === '/products' ? 'active' : ''}>Products</Link>
              <div className="mega-menu glass-panel">
                <div className="mega-menu-grid">
                  <div className="mega-menu-col">
                    <h4>Categories</h4>
                    <Link to="/products">Commercial Cooling Systems</Link>
                    <Link to="/products">Food Processing Equipment</Link>
                    <Link to="/products">Kitchen & Hotel Equipment</Link>
                    <Link to="/products">Industrial Machinery</Link>
                    <Link to="/products">Custom Engineering</Link>
                  </div>
                  <div className="mega-menu-col">
                    <h4>Featured</h4>
                    <img src="assets/machine-1.jpg" alt="Featured Machine" className="mega-menu-img" />
                    <p className="mega-menu-featured-text">High-Performance Cooling Unit</p>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/industries" className={location.pathname === '/industries' ? 'active' : ''}>Industries</Link>
            <Link to="/process" className={location.pathname === '/process' ? 'active' : ''}>Process</Link>
            <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
          </div>

          <div className="nav-actions">
            <button className="search-btn" aria-label="Search"><Search size={20} /></button>
            <a href="tel:{{PHONE}}" className="btn btn-primary btn-call">
              <Phone size={18} style={{ marginRight: '8px' }} /> {"{{PHONE}}"}
            </a>
          </div>
        </nav>

        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
