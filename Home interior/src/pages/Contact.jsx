import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page section-padding" style={{paddingTop: '120px'}}>
      <div className="container">
        <div className="section-header text-center fade-up">
          <h2>Contact Us</h2>
          <p>We would love to hear from you. Visit our showroom or get in touch.</p>
        </div>

        <div className="contact-grid fade-up">
          <div className="contact-info-container">
            <h3>Store Information</h3>
            <div className="contact-details">
              <div className="detail-item">
                <MapPin className="detail-icon" size={24} />
                <div>
                  <h4>Visit Us</h4>
                  <p>{"{{ADDRESS}}"}</p>
                </div>
              </div>
              <div className="detail-item">
                <Phone className="detail-icon" size={24} />
                <div>
                  <h4>Call Us</h4>
                  <a href="tel:{{PHONE}}">{"{{PHONE}}"}</a>
                </div>
              </div>
              <div className="detail-item">
                <Mail className="detail-icon" size={24} />
                <div>
                  <h4>Email Us</h4>
                  <a href="mailto:{{EMAIL}}">contact@{`{{CLINIC_NAME}}`.toLowerCase().replace(/\s/g, '')}.com</a>
                </div>
              </div>
              <div className="detail-item">
                <Clock className="detail-icon" size={24} />
                <div>
                  <h4>Opening Hours</h4>
                  <p>Mon - Sat: 10:00 AM - 8:00 PM<br/>Sunday: 11:00 AM - 6:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Send an Inquiry</h3>
            <form className="contact-form">
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input type="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <label>Phone Number</label>
                <input type="tel" placeholder="Your Phone Number" />
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-100">Send Message</button>
            </form>
          </div>
        </div>

        <div className="map-container fade-up">
          <div className="image-placeholder" style={{height: '400px', width: '100%', borderRadius: 'var(--radius-md)'}}>
            Interactive Google Map Placeholder
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
