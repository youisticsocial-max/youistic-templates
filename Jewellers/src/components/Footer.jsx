import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer section">
      <div className="container grid-4 footer-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <Link to="/" className="footer-logo">
            <div dangerouslySetInnerHTML={{ __html: '<img src="{{LOGO_URL}}" alt="{{CLINIC_NAME}}" class="token-logo" onerror="this.onerror=null; this.src=\'/assets/luxe_jewels_logo.png\';" />' }} />
          </Link>
          <p className="footer-desc">
            Discover premium heritage jewelry that blends majestic design, divine purity, and timeless elegance.
          </p>
          <div className="social-links">
            <a href="#" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
            </a>
            <a href="#" className="social-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>
            </a>
          </div>
        </div>

        {/* Shop Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Shop</h4>
          <ul className="footer-links">
            <li><Link to="/shop?category=bridal">Bridal Collection</Link></li>
            <li><Link to="/shop?category=necklaces">Necklaces</Link></li>
            <li><Link to="/shop?category=earrings">Earrings</Link></li>
            <li><Link to="/shop?category=bangles">Bangles</Link></li>
            <li><Link to="/lookbook">Lookbook</Link></li>
          </ul>
        </div>

        {/* About Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Heritage</h4>
          <ul className="footer-links">
            <li><Link to="/about">Our Legacy</Link></li>
            <li><Link to="/reviews">Patron Reviews</Link></li>
            <li><Link to="/faq">Jewelry Care</Link></li>
            <li><Link to="/contact">Book Appointment</Link></li>
          </ul>
        </div>

        {/* Contact Column */}
        <div className="footer-col contact-col">
          <h4 className="footer-heading">Visit Us</h4>
          <div className="contact-details">
            <p><strong>Showroom:</strong> <span>{'{{ADDRESS}}'.includes('ADDRESS') ? 'Heritage Square, Jaipur, RJ 302001' : '{{ADDRESS}}'}</span></p>
            <p><strong>Concierge:</strong> <a href={`tel:${'{{PHONE}}'.includes('PHONE') ? '+919876543210' : '{{PHONE}}'}`}>{'{{PHONE}}'.includes('PHONE') ? '+91 98765 43210' : '{{PHONE}}'}</a></p>
          </div>
          
          <div className="newsletter">
            <h4 className="footer-heading">Exclusive Insider</h4>
            <p>Subscribe to receive updates on bespoke collections and private viewing events.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Enter your email address" required />
              <button type="submit" className="btn btn-primary">Join</button>
            </form>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; {new Date().getFullYear()} <span>{'{{CLINIC_NAME}}'.includes('CLINIC_NAME') ? 'Luxe Jewels' : '{{CLINIC_NAME}}'}</span>. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="#">Privacy Policy</Link>
          <Link to="#">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
