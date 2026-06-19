import React from 'react';
import { MapPin, Phone, Mail, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="page-wrapper">
      <div className="section-header" style={{ backgroundColor: 'var(--bg-dark)', color: '#fff', padding: '100px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <h1 className="section-title">Contact Us</h1>
          <p className="section-subtitle mx-auto" style={{ color: '#ccc' }}>
            We'd love to hear from you. Get in touch for product inquiries, distribution, or bulk orders.
          </p>
        </div>
      </div>

      <section className="section bg-light">
        <div className="container">
          <div className="grid grid-cols-2" style={{ gap: '60px' }}>
            <div className="contact-info-panel" style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: '30px', fontSize: '1.5rem' }}>Get In Touch</h3>
              
              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--secondary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', flexShrink: 0 }}>
                  <MapPin />
                </div>
                <div>
                  <h4 style={{ marginBottom: '5px' }}>Head Office / Factory</h4>
                  <p style={{ color: 'var(--text-light)' }}>{"{{ADDRESS}}"}</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--secondary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', flexShrink: 0 }}>
                  <Phone />
                </div>
                <div>
                  <h4 style={{ marginBottom: '5px' }}>Call Us</h4>
                  <a href="tel:{{PHONE}}" style={{ color: 'var(--text-light)', display: 'block' }}>{"{{PHONE}}"}</a>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '30px' }}>
                <div style={{ width: '50px', height: '50px', backgroundColor: 'var(--secondary-color)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-color)', flexShrink: 0 }}>
                  <Mail />
                </div>
                <div>
                  <h4 style={{ marginBottom: '5px' }}>Email Us</h4>
                  <a href="mailto:{{EMAIL}}" style={{ color: 'var(--text-light)', display: 'block' }}>info@{"{{CLINIC_NAME}}"}.com</a>
                </div>
              </div>

              <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--border-color)' }}>
                <h4 style={{ marginBottom: '15px' }}>Quick Support</h4>
                <a href={`https://wa.me/{{PHONE}}`} className="btn btn-outline" style={{ width: '100%' }}>Chat on WhatsApp</a>
              </div>
            </div>

            <div className="contact-form-panel" style={{ padding: '40px', backgroundColor: '#fff', borderRadius: '16px', boxShadow: 'var(--shadow-sm)' }}>
              <h3 style={{ marginBottom: '30px', fontSize: '1.5rem' }}>Send an Inquiry</h3>
              <form>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Inquiry Type</label>
                  <select style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }}>
                    <option>General Inquiry</option>
                    <option>Distributor Application</option>
                    <option>Bulk Order / B2B</option>
                    <option>Feedback</option>
                  </select>
                </div>
                <div className="grid grid-cols-2" style={{ gap: '20px', marginBottom: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>First Name</label>
                    <input type="text" placeholder="John" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Last Name</label>
                    <input type="text" placeholder="Doe" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Phone Number</label>
                  <input type="tel" placeholder="+91 9876543210" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message</label>
                  <textarea placeholder="How can we help you?" rows="4" style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', resize: 'vertical' }}></textarea>
                </div>
                <button type="button" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                  Send Message <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section style={{ height: '400px', backgroundColor: '#e5e3df', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', color: 'var(--text-light)' }}>
          <MapPin size={48} style={{ margin: '0 auto 10px', color: '#999' }} />
          <h3>Google Maps Integration Placeholder</h3>
          <p>Coordinates mapped to: {"{{ADDRESS}}"}</p>
        </div>
      </section>
    </div>
  );
};

export default Contact;
