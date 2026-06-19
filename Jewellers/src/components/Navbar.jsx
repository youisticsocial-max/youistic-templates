import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, Heart, User, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { cartCount, setIsCartOpen } = useCart();

  // Transparent header only on home page when at top
  const isHomePage = location.pathname === '/';
  
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

  const navbarClass = `navbar ${isHomePage && !isScrolled ? 'navbar-transparent' : 'navbar-solid'}`;

  return (
    <>
      <header className={navbarClass}>
        <div className="navbar-container container">
          {/* Mobile Menu Toggle */}
          <button className="mobile-toggle" onClick={() => setIsMobileMenuOpen(true)}>
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="navbar-logo">
            <div dangerouslySetInnerHTML={{ __html: '<img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" class="token-logo" onerror="this.onerror=null; this.src=\'/assets/luxe_jewels_logo.png\';" />' }} />
          </Link>

          {/* Desktop Navigation */}
          <nav className="navbar-links">
            <Link to="/shop" className="nav-link">Jewelry</Link>
            <Link to="/collections" className="nav-link">Bridal</Link>
            <Link to="/new-arrivals" className="nav-link">New Arrivals</Link>
            <Link to="/lookbook" className="nav-link">Lookbook</Link>
            <Link to="/about" className="nav-link">Heritage</Link>
          </nav>

          {/* Icons */}
          <div className="navbar-actions">
            <button className="action-btn"><Search size={20} /></button>
            <button className="action-btn"><User size={20} /></button>
            <button className="action-btn"><Heart size={20} /></button>
            <button className="action-btn cart-btn" onClick={() => setIsCartOpen(true)}>
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <div dangerouslySetInnerHTML={{ __html: '<img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" class="token-logo" onerror="this.onerror=null; this.src=\'/assets/luxe_jewels_logo.png\';" />' }} />
          <button className="close-btn" onClick={() => setIsMobileMenuOpen(false)}>
            <X size={24} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)}>Jewelry</Link>
          <Link to="/collections" onClick={() => setIsMobileMenuOpen(false)}>Bridal</Link>
          <Link to="/new-arrivals" onClick={() => setIsMobileMenuOpen(false)}>New Arrivals</Link>
          <Link to="/lookbook" onClick={() => setIsMobileMenuOpen(false)}>Lookbook</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)}>Heritage</Link>
          <Link to="/reviews" onClick={() => setIsMobileMenuOpen(false)}>Reviews</Link>
          <Link to="/faq" onClick={() => setIsMobileMenuOpen(false)}>FAQ</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
