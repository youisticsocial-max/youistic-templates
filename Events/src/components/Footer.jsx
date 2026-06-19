import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const FacebookIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
  </svg>
);

const InstagramIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/>
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
  </svg>
);

const Footer = ({ activePage, setActivePage, settings }) => {
  const handleNavClick = (pageId) => {
    setActivePage(pageId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#0B0B0B',
        backgroundImage: 'linear-gradient(to bottom, #0B0B0B 0%, #1C1213 100%)',
        position: 'relative',
        borderTop: '1px solid var(--color-glass-border)',
        overflow: 'hidden',
        zIndex: 5,
      }}
    >
      {/* Subtle traditional jaali background grid */}
      <div className="jaali-bg" style={{ opacity: 0.15 }} />

      <div
        className="container"
        style={{
          paddingTop: '5rem',
          paddingBottom: '3rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '3rem',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Brand Story Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <div
              style={{
                width: '45px',
                height: '45px',
                borderRadius: '50%',
                border: '2px solid var(--color-gold)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-serif)',
                fontWeight: 'bold',
                color: 'var(--color-gold)',
                background: 'rgba(91, 15, 23, 0.5)',
              }}
            >
              RS
            </div>
            <div>
              <h3 className="text-gold-gradient" style={{ fontSize: '1.4rem' }}>
                {settings.companyName || 'RS Music Event'}
              </h3>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-gold)' }}>
                Jodhpur
              </p>
            </div>
          </div>
          <p style={{ fontSize: '0.95rem', color: 'rgba(255, 248, 231, 0.7)' }}>
            Blending royal Rajasthani heritage, modern event technology, and Bollywood glamour to orchestrate jaw-dropping luxury celebrations that live in your hearts forever.
          </p>
          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
            <a
              href={settings.instagramUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid var(--color-glass-border)',
                backgroundColor: 'rgba(28, 20, 21, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                e.currentTarget.style.color = 'var(--color-black)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(28, 20, 21, 0.5)';
                e.currentTarget.style.color = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href={settings.facebookUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid var(--color-glass-border)',
                backgroundColor: 'rgba(28, 20, 21, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                e.currentTarget.style.color = 'var(--color-black)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(28, 20, 21, 0.5)';
                e.currentTarget.style.color = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <FacebookIcon size={18} />
            </a>
            <a
              href={settings.youtubeUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                border: '1px solid var(--color-glass-border)',
                backgroundColor: 'rgba(28, 20, 21, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--color-gold)',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-gold)';
                e.currentTarget.style.color = 'var(--color-black)';
                e.currentTarget.style.transform = 'translateY(-3px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(28, 20, 21, 0.5)';
                e.currentTarget.style.color = 'var(--color-gold)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <YoutubeIcon size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h4 style={{ color: 'var(--color-gold)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Quick Links
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0, margin: 0 }}>
            {[
              { id: 'home', label: 'Home' },
              { id: 'about', label: 'About Us' },
              { id: 'gallery', label: 'Gallery' },
              { id: 'partners', label: 'Partners & Venues' },
              { id: 'testimonials', label: 'Testimonials' },
              { id: 'packages', label: 'Pricing Packages' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => handleNavClick(link.id)}
                  style={{
                    fontSize: '0.95rem',
                    color: activePage === link.id ? 'var(--color-gold)' : 'rgba(255,248,231,0.7)',
                    transition: 'var(--transition-fast)',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = activePage === link.id ? 'var(--color-gold)' : 'rgba(255,248,231,0.7)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h4 style={{ color: 'var(--color-gold)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Signature Services
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.8rem', padding: 0, margin: 0 }}>
            {[
              { label: 'Wedding Planning', page: 'weddings' },
              { label: 'Sangeet Management', page: 'services' },
              { label: 'DJ Concerts & Shows', page: 'services' },
              { label: 'Stage Sound & Lighting', page: 'services' },
              { label: 'Theme Decor & Floral Design', page: 'services' },
              { label: 'Corporate Conferences', page: 'corporate' }
            ].map((srv, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handleNavClick(srv.page)}
                  style={{
                    fontSize: '0.95rem',
                    color: 'rgba(255,248,231,0.7)',
                    transition: 'var(--transition-fast)',
                    textAlign: 'left',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-gold)'; e.currentTarget.style.transform = 'translateX(5px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,248,231,0.7)'; e.currentTarget.style.transform = 'translateX(0)'; }}
                >
                  {srv.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h4 style={{ color: 'var(--color-gold)', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Get In Touch
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'rgba(255,248,231,0.7)' }}>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
              <MapPin size={20} style={{ color: 'var(--color-gold)', flexShrink: 0, marginTop: '2px' }} />
              <span style={{ fontSize: '0.95rem', lineHeight: '1.4' }}>{settings.address}</span>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <Phone size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              <a href={`tel:${settings.contactPhone}`} style={{ fontSize: '0.95rem', color: 'rgba(255,248,231,0.7)' }} className="footer-link">
                {settings.contactPhone}
              </a>
            </div>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
              <Mail size={18} style={{ color: 'var(--color-gold)', flexShrink: 0 }} />
              <a href={`mailto:${settings.contactEmail}`} style={{ fontSize: '0.95rem', color: 'rgba(255,248,231,0.7)' }} className="footer-link">
                {settings.contactEmail}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Gold Divider line */}
      <div
        className="container"
        style={{
          padding: 0,
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div
          style={{
            height: '1px',
            width: '100%',
            background: 'linear-gradient(90deg, transparent, var(--color-gold), transparent)',
            opacity: 0.3,
          }}
        />
      </div>

      {/* Bottom Copyright */}
      <div
        className="container"
        style={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          fontSize: '0.85rem',
          color: 'rgba(255, 248, 231, 0.5)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div>
          &copy; {currentYear} <strong>{settings.companyName}</strong>. All Rights Reserved.
        </div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <button onClick={() => handleNavClick('admin')} style={{ fontSize: '0.85rem', color: 'rgba(255,248,231,0.5)' }}>
            Admin Dashboard
          </button>
          <span>Crafted for Grand Indian Celebrations</span>
        </div>
      </div>
      <style>{`
        .footer-link:hover {
          color: var(--color-gold) !important;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
