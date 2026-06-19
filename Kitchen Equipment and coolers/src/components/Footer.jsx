import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Globe, MessageSquare } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer border-t border-subtle">
      <div className="container">
        <div className="footer-grid grid grid-cols-4">
          <div className="footer-col">
            <img src={"{{LOGO_URL}}".includes('{') ? '/assets/logo.png' : "{{LOGO_URL}}"} alt={"{{CLINIC_NAME}}"} className="footer-logo" />
            <p className="footer-about">
              Engineering machines that power progress. Delivering innovative, reliable, and high-performance industrial equipment designed for modern businesses.
            </p>
            <div className="social-links">
              <a href="#" aria-label="Website"><Globe size={20} /></a>
              <a href="#" aria-label="Social"><MessageSquare size={20} /></a>
              <a href="#" aria-label="Social">IN</a>
              <a href="#" aria-label="Social">IG</a>
            </div>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Products</h4>
            <ul className="footer-links">
              <li><Link to="/products">Commercial Cooling</Link></li>
              <li><Link to="/products">Food Processing</Link></li>
              <li><Link to="/products">Kitchen Equipment</Link></li>
              <li><Link to="/products">Industrial Machinery</Link></li>
              <li><Link to="/products">Custom Engineering</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Company</h4>
            <ul className="footer-links">
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/industries">Industries Served</Link></li>
              <li><Link to="/process">Manufacturing Process</Link></li>
              <li><Link to="/certifications">Certifications</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact">
              <li>
                <MapPin size={20} className="text-primary" />
                <span>{"{{ADDRESS}}"}</span>
              </li>
              <li>
                <Phone size={20} className="text-primary" />
                <a href="tel:{{PHONE}}">{"{{PHONE}}"}</a>
              </li>
              <li>
                <Mail size={20} className="text-primary" />
                <a href="mailto:{{EMAIL}}">info@{"{{CLINIC_NAME}}"}.com</a>
              </li>
            </ul>
            <Link to="/contact" className="btn btn-primary mt-4">Inquire Now</Link>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {"{{CLINIC_NAME}}"}. All Rights Reserved.</p>
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
