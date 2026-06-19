import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, ShoppingBag } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`navbar ${isScrolled ? 'scrolled' : ''} ${!isHome && !isScrolled ? 'solid-bg' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="brand-logo">
          <img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" className="logo-img" />
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-menu-header">
            <img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" className="mobile-logo-img" />
            <button className="close-menu" onClick={() => setMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <div className="dropdown">
            <span className="dropdown-title">Products</span>
            <div className="dropdown-content">
              <Link to="/categories" onClick={() => setMobileMenuOpen(false)}>All Categories</Link>
              <Link to="/collections" onClick={() => setMobileMenuOpen(false)}>Premium Collections</Link>
            </div>
          </div>
          <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About Us</Link>
          <div className="dropdown">
            <span className="dropdown-title">Quality</span>
            <div className="dropdown-content">
              <Link to="/manufacturing" onClick={() => setMobileMenuOpen(false)}>Manufacturing</Link>
              <Link to="/process" onClick={() => setMobileMenuOpen(false)}>Our Process</Link>
              <Link to="/certifications" onClick={() => setMobileMenuOpen(false)}>Certifications</Link>
            </div>
          </div>
          <Link to="/gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
          <Link to="/blog" onClick={() => setMobileMenuOpen(false)}>Blog & Recipes</Link>
          <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
          
          <div className="mobile-contact">
            <a href="tel:{{PHONE}}" className="btn btn-primary">Call {"{{PHONE}}"}</a>
          </div>
        </nav>

        <div className="nav-actions">
          <button className="icon-btn"><Search size={20} /></button>
          <Link to="/categories" className="btn btn-primary desktop-catalog-btn">Catalog</Link>
          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
