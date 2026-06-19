import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, ArrowRight } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" onError={(e) => { e.target.onerror = null; e.target.src = 'https://placehold.co/400x120/1a1a1a/ffffff?text=LUXURY+BRAND&font=playfair-display' }} />
            </Link>
            <p className="brand-story">
              Discover exclusive branded home furnishing collections crafted to transform everyday spaces into luxurious experiences. Experience the elegance of {"{{CLINIC_NAME}}"}.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook"><span>FB</span></a>
              <a href="#" aria-label="Instagram"><span>IG</span></a>
              <a href="#" aria-label="Twitter"><span>TW</span></a>
            </div>
          </div>

          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/collections">Collections</Link></li>
              <li><Link to="/gallery">Gallery</Link></li>
              <li><Link to="/blog">Lifestyle Ideas</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h3>Categories</h3>
            <ul>
              <li><Link to="/categories">Curtains & Blinds</Link></li>
              <li><Link to="/categories">Bedsheets & Bedding</Link></li>
              <li><Link to="/categories">Carpets & Rugs</Link></li>
              <li><Link to="/categories">Wallpapers</Link></li>
              <li><Link to="/categories">Home Decor</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h3>Get In Touch</h3>
            <ul className="contact-info">
              <li>
                <MapPin size={18} className="contact-icon" />
                <span>{"{{ADDRESS}}"}</span>
              </li>
              <li>
                <Phone size={18} className="contact-icon" />
                <a href="tel:{{PHONE}}">{"{{PHONE}}"}</a>
              </li>
              <li>
                <Mail size={18} className="contact-icon" />
                <a href="mailto:{{EMAIL}}">info@{"{{CLINIC_NAME}}"}.com</a>
              </li>
            </ul>
            <div className="newsletter">
              <h4>Subscribe to our newsletter</h4>
              <form className="newsletter-form">
                <input type="email" placeholder="Your email address" required />
                <button type="submit" aria-label="Subscribe">
                  <ArrowRight size={20} />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {"{{CLINIC_NAME}}"}. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="#">Privacy Policy</Link>
            <Link to="#">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
