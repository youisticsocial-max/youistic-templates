import React from 'react';
import { Phone, Mail, MapPin, Clock, Award, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-col brand-col">
            <div className="footer-logo">
              <div className="logo-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2C8.5 2 6 4.5 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.5-2.5-8-6-8z" />
                </svg>
              </div>
              <div>
                <h4 className="brand-name">{{CLINIC_NAME}}'s</h4>
                <p className="brand-sub">{{CLINIC_NAME}}</p>
              </div>
            </div>
            <p className="footer-desc">
              Your Smile is Our Priority. Dedicated to providing world-class dental care in Jodhpur using advanced technology and gentle treatments.
            </p>
            <div className="trust-badges-footer">
              <div className="badge-item">
                <Award size={16} />
                <span>NABH Certified</span>
              </div>
              <div className="badge-item">
                <ShieldCheck size={16} />
                <span>100% Safe Clinic</span>
              </div>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-title">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#why-choose-us">Why Choose Us</a></li>
              <li><a href="#team">Meet Our Doctors</a></li>
              <li><a href="#testimonials">Patient Reviews</a></li>
              <li><a href="#appointment">Book Consultation</a></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col">
            <h4 className="footer-title">Contact Us</h4>
            <ul className="footer-contact-list">
              <li>
                <MapPin size={22} className="contact-icon-map" />
                <span>
                  Baladeep Complex, Infront Of Sunday Shoppee,<br />
                  Paota C Road, Laxmi Nagar,<br />
                  Paota, {{ADDRESS}}
                </span>
              </li>
              <li>
                <Phone size={18} />
                <a href="tel:{{PHONE}}">{{PHONE}}</a>
              </li>
              <li>
                <Mail size={18} />
                <a href="mailto:info@drrajpurohitdental.com">info@drrajpurohitdental.com</a>
              </li>
            </ul>
          </div>

          {/* Column 4: Timings */}
          <div className="footer-col">
            <h4 className="footer-title">Clinic Timings</h4>
            <div className="timing-box">
              <div className="timing-row">
                <Clock size={16} />
                <span>Mon - Sat: 9:00 AM - 8:00 PM</span>
              </div>
              <div className="timing-row closed">
                <Clock size={16} className="text-red" />
                <span>Sunday: Closed</span>
              </div>
            </div>
            <div className="footer-socials">
              <a href="#" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
              <a href="#" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
              <a href="#" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
              <a href="#" aria-label="LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} {{CLINIC_NAME}}. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
