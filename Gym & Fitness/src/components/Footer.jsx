import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Send } from 'lucide-react';
import { Instagram, Facebook, Youtube } from './SocialIcons';
import './Footer.css';

const Footer = () => {
  const logoUrl = '{{LOGO_URL}}';
  const displayLogo = (!logoUrl || logoUrl.startsWith('{{')) ? '/assets/logo.png' : logoUrl;

  const handleNewsletter = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our Fitness Magazine!');
    e.target.reset();
  };

  return (
    <footer className="footer">
      <div className="footer-glow-bar" />
      <div className="container footer-grid">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="footer-logo-box">
            <img src={displayLogo} alt="{{CLINIC_NAME}}" className="footer-logo" />
            <span className="footer-logo-text">{"{{CLINIC_NAME}}"}</span>
          </Link>
          <p className="footer-desc">
            An elite performance athletic and wellness center dedicated to physical transformation, strength, and premium lifestyle coaching.
          </p>
          <div className="footer-socials">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Instagram">
              <Instagram size={18} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="Facebook">
              <Facebook size={18} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="social-icon-btn" aria-label="YouTube">
              <Youtube size={18} />
            </a>
          </div>
        </div>

        {/* Training Programs */}
        <div className="footer-links-col">
          <h4 className="footer-title">Programs</h4>
          <ul className="footer-links">
            <li><Link to="/programs">Strength Training</Link></li>
            <li><Link to="/programs">CrossFit & Functional</Link></li>
            <li><Link to="/programs">Personal Training</Link></li>
            <li><Link to="/programs">MMA & Boxing</Link></li>
            <li><Link to="/programs">Yoga & Flexibility</Link></li>
          </ul>
        </div>

        {/* Membership & Info */}
        <div className="footer-links-col">
          <h4 className="footer-title">Memberships</h4>
          <ul className="footer-links">
            <li><Link to="/membership">Membership Plans</Link></li>
            <li><Link to="/schedule">Class Schedule</Link></li>
            <li><Link to="/transformations">Success Stories</Link></li>
            <li><Link to="/gallery">Club Gallery</Link></li>
            <li><Link to="/blog">Fitness Magazine</Link></li>
          </ul>
        </div>

        {/* Contact & Newsletter */}
        <div className="footer-contact-col">
          <h4 className="footer-title">Connect</h4>
          <div className="footer-info-item">
            <Phone size={16} className="info-icon" />
            <a href="tel:{{PHONE}}" className="footer-info-text">{"{{PHONE}}"}</a>
          </div>
          <div className="footer-info-item">
            <MapPin size={16} className="info-icon-pin" />
            <span className="footer-info-text">{"{{ADDRESS}}"}</span>
          </div>

          <form className="footer-newsletter" onSubmit={handleNewsletter}>
            <p className="newsletter-text">Subscribe to our newsletter for fitness tips.</p>
            <div className="newsletter-input-box">
              <input 
                type="email" 
                placeholder="YOUR EMAIL" 
                className="newsletter-input" 
                required 
              />
              <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                <Send size={16} />
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container footer-bottom-flex">
          <p className="copy-text">&copy; {new Date().getFullYear()} {"{{CLINIC_NAME}}"}. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
