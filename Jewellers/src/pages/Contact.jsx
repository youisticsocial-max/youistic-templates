import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      {/* Page Header */}
      <div className="page-header section text-center" style={{paddingTop: '160px', backgroundColor: 'var(--surface-color)'}}>
        <div className="container">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="subtitle"
          >
            We're here to help and answer any question you might have.
          </motion.p>
        </div>
      </div>

      <div className="container section">
        <div className="grid-2 contact-layout">
          
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="contact-info-wrapper"
          >
            <h2>Get In Touch</h2>
            <p className="contact-desc">
              Have a question about a product, your order, or just want to say hi? 
              Drop us a line and we'll get back to you as soon as possible.
            </p>

            <div className="contact-cards">
              <div className="contact-card">
                <div className="contact-icon"><MapPin size={24} /></div>
                <div>
                  <h4>Visit Us</h4>
                  <p><span>{'{{ADDRESS}}'.includes('ADDRESS') ? '123 Fashion Avenue, New York, NY 10012' : '{{ADDRESS}}'}</span></p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon"><Phone size={24} /></div>
                <div>
                  <h4>Call Us</h4>
                  <p><a href={`tel:${'{{PHONE}}'.includes('PHONE') ? '+15551234567' : '{{PHONE}}'}`}>{'{{PHONE}}'.includes('PHONE') ? '+1 (555) 123-4567' : '{{PHONE}}'}</a></p>
                  <span className="small-text">Mon-Fri from 9am to 6pm</span>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon"><Mail size={24} /></div>
                <div>
                  <h4>Email Us</h4>
                  <p><a href="mailto:{{EMAIL}}">hello@brand.com</a></p>
                </div>
              </div>

              <div className="contact-card">
                <div className="contact-icon"><MessageSquare size={24} /></div>
                <div>
                  <h4>WhatsApp</h4>
                  <p>
                    <a href={`https://wa.me/${'{{PHONE}}'.includes('PHONE') ? '+15551234567' : '{{PHONE}}'}`} className="whatsapp-link" target="_blank" rel="noreferrer">
                      Chat with us
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="contact-form-wrapper"
          >
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="John Doe" required />
              </div>
              
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="john@example.com" required />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <select>
                  <option>Order Inquiry</option>
                  <option>Product Information</option>
                  <option>Returns & Exchanges</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>

              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </motion.div>

        </div>

        {/* Map Placeholder */}
        <div className="map-placeholder mt-xl">
          <img 
            src="https://images.pexels.com/photos/1330999/pexels-photo-1330999.jpeg?auto=compress&cs=tinysrgb&w=1200" 
            alt="Map" 
            className="img-cover" 
          />
        </div>

      </div>
    </div>
  );
};

export default Contact;
