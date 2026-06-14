import React from 'react';
import { MapPin, Phone, Mail, Clock, Calendar, CheckCircle } from 'lucide-react';

export default function ContactMap() {
  return (
    <section id="contact" className="section contact-map-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Find Us</span>
          <h2 className="section-title">
            Visit Our <span>Clinic in Jodhpur</span>
          </h2>
          <p>
            We are conveniently located in Paota, Jodhpur. Check out our physical address, clinic working hours, and find directions on the interactive map below.
          </p>
        </div>

        <div className="contact-grid-layout">
          {/* Left: Contact Info details */}
          <div className="contact-cards-col">
            <div className="contact-info-card">
              <div className="contact-icon-box">
                <MapPin size={24} />
              </div>
              <div className="contact-text-box">
                <h3>Our Location</h3>
                <p>
                  Baladeep Complex, Infront Of Sunday Shoppee,<br />
                  Paota C Road, Laxmi Nagar, Paota,<br />
                  {{ADDRESS}}, Rajasthan, India
                </p>
                <a 
                  href="https://maps.google.com/?q=Baladeep+Complex+Paota+C+Road+Jodhpur" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="map-directions-link"
                >
                  Get Directions &rarr;
                </a>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon-box">
                <Phone size={24} />
              </div>
              <div className="contact-text-box">
                <h3>Phone & Support</h3>
                <p>Call our office to schedule appointments directly:</p>
                <a href="tel:{{PHONE}}" className="contact-tel-link">{{PHONE}}</a>
                <p className="tel-subtext">Emergency calls supported 24/7</p>
              </div>
            </div>

            <div className="contact-info-card">
              <div className="contact-icon-box">
                <Clock size={24} />
              </div>
              <div className="contact-text-box">
                <h3>Working Hours</h3>
                <div className="hours-grid">
                  <div className="hours-row">
                    <span>Monday - Saturday:</span>
                    <strong>9:00 AM - 8:00 PM</strong>
                  </div>
                  <div className="hours-row text-red">
                    <span>Sunday:</span>
                    <strong>Closed</strong>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="contact-info-card">
              <div className="contact-icon-box">
                <Mail size={24} />
              </div>
              <div className="contact-text-box">
                <h3>Email Inquiries</h3>
                <a href="mailto:info@drrajpurohitdental.com" className="contact-email-link">info@drrajpurohitdental.com</a>
              </div>
            </div>
          </div>

          {/* Right: Map Embed */}
          <div className="contact-map-col">
            <div className="map-iframe-wrapper">
              <iframe 
                title="{{CLINIC_NAME}} Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.6253457317765!2d73.03754907609706!3d26.273867687550186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c5e00000001%3A0xe543c7b3701314ff!2sPaota%20C%20Rd%2C%20Jodhpur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1717688000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            
            <div className="map-trust-badge">
              <CheckCircle size={16} />
              <span>Free patient parking available in front of Baladeep Complex</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
