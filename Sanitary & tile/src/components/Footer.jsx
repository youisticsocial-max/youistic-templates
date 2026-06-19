import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" style={{
      backgroundColor: '#050505',
      color: '#ffffff',
      padding: '6rem 0 2rem 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Subtle background texture pattern */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        pointerEvents: 'none'
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>
          
          {/* Brand Column */}
          <div>
            <img src={window.location.hostname === 'localhost' ? '/assets/logo.svg' : '{{LOGO_URL}}'} alt={"{{CLINIC_NAME}}"} style={{ height: '40px', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }} />
            <p style={{ color: '#a0a0a0', marginBottom: '2rem', fontSize: '0.95rem' }}>
              Crafting premium architectural surfaces and luxury bathware that define modern living spaces with elegance and innovation.
            </p>
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem' }}>
              <a href="#" className="footer-link">Instagram</a>
              <a href="#" className="footer-link">LinkedIn</a>
              <a href="#" className="footer-link">Facebook</a>
            </div>
          </div>

          {/* Collections */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 400 }}>Collections</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/collections/tiles?filter=matt" className="footer-link">Matt Surfaces</Link></li>
              <li><Link to="/collections/tiles?filter=glossy" className="footer-link">Glossy Finishes</Link></li>
              <li><Link to="/collections/tiles?filter=carving" className="footer-link">Carving Textures</Link></li>
              <li><Link to="/collections/tiles?filter=marble" className="footer-link">Marble Elegance</Link></li>
              <li><Link to="/collections/bathware" className="footer-link">Luxury Bathware</Link></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 400 }}>Company</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              <li><Link to="/about" className="footer-link">Our Story</Link></li>
              <li><Link to="/projects" className="footer-link">Project Gallery</Link></li>
              <li><Link to="/designers" className="footer-link">Architects Portal</Link></li>
              <li><Link to="/downloads" className="footer-link">Catalogs & Specs</Link></li>
              <li><Link to="/news" className="footer-link">News & Inspiration</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: '1.2rem', marginBottom: '1.5rem', fontWeight: 400 }}>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <li style={{ display: 'flex', gap: '1rem', color: '#a0a0a0', fontSize: '0.95rem' }}>
                <MapPin size={20} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                <span>{"{{ADDRESS}}"}</span>
              </li>
              <li style={{ display: 'flex', gap: '1rem', color: '#a0a0a0', fontSize: '0.95rem', alignItems: 'center' }}>
                <Phone size={20} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                <a href="tel:{{PHONE}}" className="footer-link">{"{{PHONE}}"}</a>
              </li>
            </ul>
            <Link to="/contact" className="btn btn-primary" style={{ marginTop: '2rem', padding: '0.8rem 1.5rem', fontSize: '0.9rem' }}>
              Request Consultation <ArrowRight size={16} />
            </Link>
          </div>

        </div>

        <div style={{ 
          borderTop: '1px solid rgba(255,255,255,0.1)', 
          paddingTop: '2rem', 
          display: 'flex', 
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          color: '#666666',
          fontSize: '0.85rem'
        }}>
          <p>&copy; {new Date().getFullYear()} {"{{CLINIC_NAME}}"}. All Rights Reserved.</p>
          <div style={{ display: 'flex', gap: '2rem' }}>
            <Link to="/privacy" className="footer-link">Privacy Policy</Link>
            <Link to="/terms" className="footer-link">Terms of Service</Link>
          </div>
        </div>
      </div>
      <style>{`
        .footer-link {
          color: #a0a0a0;
          transition: color 0.3s ease;
        }
        .footer-link:hover {
          color: var(--primary-color);
        }
        .social-icon:hover {
          color: var(--primary-color) !important;
        }
      `}</style>
    </footer>
  );
}