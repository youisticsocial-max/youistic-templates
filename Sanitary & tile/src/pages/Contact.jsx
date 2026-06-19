import React from 'react';
import { motion } from 'framer-motion';
import { Phone, MapPin, Mail, Calendar, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="contact-page" style={{ paddingTop: '80px' }}>
      
      {/* Header */}
      <section className="section-dark" style={{ padding: '6rem 0 3rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem' }}>Get in Touch</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Contact Us</h1>
          <p style={{ color: '#a0a0a0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            We'd love to hear from you. Whether you have a question about our collections or need design consultation.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="section" style={{ background: '#f5f5f5' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem' }}>
            
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <h2 style={{ marginBottom: '2rem' }}>{"{{CLINIC_NAME}}"} Headquarters</h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <MapPin size={24} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Our Location</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>{"{{ADDRESS}}"}</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Phone size={24} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Direct Line</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>{"{{PHONE}}"}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Mail size={24} style={{ color: 'var(--primary-color)', flexShrink: 0 }} />
                  <div>
                    <h4 style={{ marginBottom: '0.5rem' }}>Email Support</h4>
                    <p style={{ color: 'var(--text-secondary)' }}>info@company.com</p>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="tel:{{PHONE}}" className="btn btn-primary" style={{ padding: '0.8rem 1.5rem' }}>
                  <Phone size={18} /> Call Now
                </a>
                <a href="https://wa.me/{{PHONE}}" className="btn" style={{ padding: '0.8rem 1.5rem', background: '#25D366', color: 'white' }}>
                  <MessageCircle size={18} /> WhatsApp
                </a>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <div style={{ background: 'white', padding: '3rem', border: '1px solid var(--border-color)', boxShadow: '0 20px 40px rgba(0,0,0,0.02)' }}>
                <h3 style={{ marginBottom: '1.5rem' }}>Send an Inquiry</h3>
                <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <input type="text" placeholder="Your Name" style={inputStyle} />
                  <input type="email" placeholder="Email Address" style={inputStyle} />
                  <input type="tel" placeholder="Phone Number" style={inputStyle} />
                  
                  <div style={{ position: 'relative' }}>
                    <select style={{ ...inputStyle, appearance: 'none', width: '100%' }}>
                      <option value="">Subject</option>
                      <option value="product">Product Inquiry</option>
                      <option value="dealer">Become a Dealer</option>
                      <option value="architect">Architect Support</option>
                    </select>
                  </div>

                  <textarea placeholder="Your Message" rows="4" style={{ ...inputStyle, resize: 'vertical' }}></textarea>
                  
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Submit Message</button>
                </form>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Map & Appointment */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Book a Showroom Visit</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Experience our premium collections in person. Schedule a personalized consultation with our design experts.
              </p>
              <button className="btn btn-outline" style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <Calendar size={18} /> Book Appointment
              </button>
            </div>
            
            <div style={{ width: '100%', height: '400px', background: '#e0e0e0', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ color: '#888', fontWeight: 500, letterSpacing: '0.1em' }}>[ GOOGLE MAP PLACEHOLDER ]</span>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '1rem',
  border: '1px solid var(--border-color)',
  background: '#fcfcfc',
  fontSize: '0.95rem',
  outline: 'none',
  fontFamily: 'var(--font-family)',
  transition: 'border-color 0.3s'
};