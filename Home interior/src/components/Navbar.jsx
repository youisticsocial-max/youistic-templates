import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingBag, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navClasses = `navbar ${isHomePage && !isScrolled ? 'transparent' : 'solid'}`;

  return (
    <header className={navClasses}>
      <div className="container navbar-container">
        <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={24} />
        </button>

        <Link to="/" className="brand-logo">
          <img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x120/1a1a1a/ffffff?text=LUXURY+BRAND&font=playfair-display' }} />
        </Link>

        <nav className={`desktop-nav ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="mobile-nav-header">
            <Link to="/" className="brand-logo">
              <img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x120/1a1a1a/ffffff?text=LUXURY+BRAND&font=playfair-display' }} />
            </Link>
            <button className="mobile-close" onClick={() => setIsMobileMenuOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li className="dropdown">
              <Link to="/categories">Categories</Link>
              {/* Mega menu placeholder */}
            </li>
            <li><Link to="/collections">Collections</Link></li>
            <li><Link to="/brands">Brands</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="action-btn"><Search size={20} /></button>
          <button className="action-btn"><Heart size={20} /></button>
          <button className="action-btn"><ShoppingBag size={20} /></button>
        </div>
      </div>
      {isMobileMenuOpen && <div className="mobile-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </header>
  );
};

export default Navbar;
