import React, { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Compass, Phone, Mail, Menu, X, Globe2 } from 'lucide-react';
import './Navigation.css';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <header className="header-wrapper">
      {/* Top Contact & Registration Header */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-bar-left">
            <div className="top-bar-item">
              <Phone size={12} className="logo-accent" />
              <a href="tel:{{PHONE}}">+91 98765 43210</a>
            </div>
            <div className="top-bar-item">
              <Mail size={12} className="logo-accent" />
              <a href="mailto:info@vibequestjourneys.com">info@vibequestjourneys.com</a>
            </div>
          </div>
          <div className="top-bar-right">
            <div className="reg-badge">IATA Registered: 14-3 9999 5</div>
            <div className="reg-badge" style={{ display: 'inline-block' }}>Govt Regd: DOT-RAJ-2026-89</div>
          </div>
        </div>
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container navbar-container">
          <Link to="/" className="logo">
            <Compass className="logo-icon" size={28} />
            {{CLINIC_NAME}} <span>Journeys<span className="logo-accent">.</span></span>
          </Link>

          {/* Links List */}
          <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
            <li>
              <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/packages" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Packages
              </NavLink>
            </li>
            <li>
              <NavLink to="/pilgrimage" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Pilgrimage
              </NavLink>
            </li>
            <li>
              <NavLink to="/visa-lookup" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Visa Requirements
              </NavLink>
            </li>
            <li>
              <NavLink to="/custom-trip" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
                Custom Planner
              </NavLink>
            </li>
            
            {/* CTA inside mobile menu */}
            <div className="nav-actions-mobile" style={{ display: 'none' }}>
              <Link to="/custom-trip" className="btn btn-primary">
                <Globe2 size={16} /> Plan My Custom Trip
              </Link>
            </div>
          </ul>

          <div className="nav-actions">
            <Link to="/custom-trip" className="btn btn-primary btn-sm">
              <Globe2 size={16} /> Plan My Trip
            </Link>
          </div>

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle Menu">
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
