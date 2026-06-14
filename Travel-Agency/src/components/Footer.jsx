import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, Phone, Mail, MapPin, Facebook, Instagram, Twitter, ShieldCheck } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Col 1: Brand About */}
          <div className="footer-col-about">
            <Link to="/" className="footer-logo">
              <Compass className="logo-icon logo-accent" size={32} />
              {{CLINIC_NAME}}<span>Journeys.</span>
            </Link>
            <p>
              Your trusted travel partner in Jodhpur. Crafting unforgettable domestic tours, international escapes, luxury honeymoons, and sacred pilgrimage packages for over a decade.
            </p>
            <div className="footer-socials">
              <a href="#" className="social-icon" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" className="social-icon" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" className="social-icon" aria-label="Twitter"><Twitter size={18} /></a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h3 className="footer-title">Explore</h3>
            <ul className="footer-links">
              <li><Link to="/" className="footer-link">Home</Link></li>
              <li><Link to="/packages" className="footer-link">Tour Packages</Link></li>
              <li><Link to="/pilgrimage" className="footer-link">Pilgrimage Tours</Link></li>
              <li><Link to="/visa-lookup" className="footer-link">Visa Lookup</Link></li>
              <li><Link to="/custom-trip" className="footer-link">Plan Custom Trip</Link></li>
            </ul>
          </div>

          {/* Col 3: Legal & Registration */}
          <div>
            <h3 className="footer-title">Trust & Safety</h3>
            <ul className="footer-contact">
              <li>
                <ShieldCheck size={20} className="footer-contact-icon" />
                <span>
                  <strong>IATA Certified</strong><br />
                  Reg No: 14-3 9999 5
                </span>
              </li>
              <li>
                <ShieldCheck size={20} className="footer-contact-icon" />
                <span>
                  <strong>Tourism Dept.</strong><br />
                  DOT Reg: DOT-RAJ-2026-89
                </span>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div className="footer-newsletter">
            <h3 className="footer-title">Office & Newsletter</h3>
            <ul className="footer-contact" style={{ marginBottom: '1.5rem' }}>
              <li>
                <MapPin size={20} className="footer-contact-icon" />
                <span>102, Ocean Plaza, Sardarpura, {{ADDRESS}}</span>
              </li>
              <li>
                <Phone size={16} className="footer-contact-icon" />
                <span>Helpline: +91 98765 43210 (24/7)</span>
              </li>
            </ul>
            
            <p>Subscribe to receive seasonal travel deals and discounts.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter Email Address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="newsletter-input"
                required
              />
              <button type="submit" className="newsletter-btn">
                Subscribe
              </button>
            </form>
            {subscribed && (
              <p style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', marginTop: '0.5rem', fontWeight: 'bold' }}>
                🎉 Successfully subscribed! Check your inbox soon.
              </p>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© {new Date().getFullYear()} <span>{{CLINIC_NAME}}</span>. All Rights Reserved. Created by Antigravity AI.</p>
          </div>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cancellation Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
