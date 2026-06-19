import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top grid grid-cols-4">
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" />
            </Link>
            <p className="footer-desc">
              Delivering premium daily essentials crafted with purity, freshness, and a commitment to healthy living.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Facebook">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Quick Links</h4>
            <ul>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/categories">Our Products</Link></li>
              <li><Link to="/manufacturing">Manufacturing</Link></li>
              <li><Link to="/process">Our Process</Link></li>
              <li><Link to="/blog">Blog & Recipes</Link></li>
            </ul>
          </div>
          
          <div className="footer-links">
            <h4 className="footer-title">Products</h4>
            <ul>
              <li><Link to="/categories">Indian Spices</Link></li>
              <li><Link to="/categories">Dry Fruits & Nuts</Link></li>
              <li><Link to="/categories">Pulses & Grains</Link></li>
              <li><Link to="/categories">Oils & Ghee</Link></li>
              <li><Link to="/categories">Organic Products</Link></li>
            </ul>
          </div>

          <div className="footer-contact">
            <h4 className="footer-title">Contact Us</h4>
            <ul>
              <li>
                <MapPin size={20} className="contact-icon" />
                <span>{"{{ADDRESS}}"}</span>
              </li>
              <li>
                <Phone size={20} className="contact-icon" />
                <a href="tel:{{PHONE}}">{"{{PHONE}}"}</a>
              </li>
              <li>
                <Mail size={20} className="contact-icon" />
                <a href="mailto:{{EMAIL}}">info@{"{{CLINIC_NAME}}"}.com</a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {"{{CLINIC_NAME}}"}. All rights reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
