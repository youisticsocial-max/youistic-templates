import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MapPin, Mail, Clock, MessageSquare, CheckCircle } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import './Contact.css';

const Contact = () => {
  const [content, setContent] = useState(dataStore.getContent());
  const [formState, setFormState] = useState({ name: '', phone: '', email: '', program: 'General Inquiry', msg: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    setContent(dataStore.getContent());
    window.scrollTo(0, 0);
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormState({ name: '', phone: '', email: '', program: 'General Inquiry', msg: '' });
      
      // Auto close success banner
      setTimeout(() => {
        setIsSuccess(false);
      }, 4000);
    }, 1500);
  };

  return (
    <div className="contact-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/hero-gym.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Get in Touch</span>
          <h1>Contact <span>Us</span></h1>
          <p>Have questions about classes, private training, or memberships? Our team is standing by to assist.</p>
        </div>
      </section>

      {/* Contact Form and Details Grid */}
      <section className="section contact-grid-sec">
        <div className="glowing-bg" style={{ bottom: '10%', right: '10%' }}></div>
        <div className="container grid grid-2 contact-grid">
          {/* Left: Contact Form */}
          <div className="contact-form-box glass-card">
            <h3>Send A Message</h3>
            <p className="form-intro">Fill out your details below and a fitness advisor will reach out to you within 24 hours.</p>

            <AnimatePresence>
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="form-success-banner"
                >
                  <CheckCircle size={18} />
                  <span>Your message has been successfully received. We will contact you shortly!</span>
                </motion.div>
              )}
            </AnimatePresence>

            <form onSubmit={handleFormSubmit} className="contact-form-el">
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  required
                  className="form-control"
                  placeholder="ENTER YOUR FULL NAME"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    required
                    className="form-control"
                    placeholder="ENTER YOUR PHONE NUMBER"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <input
                    type="email"
                    required
                    className="form-control"
                    placeholder="ENTER YOUR EMAIL"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Program of Interest</label>
                <select
                  className="form-control select-control"
                  value={formState.program}
                  onChange={(e) => setFormState({ ...formState, program: e.target.value })}
                >
                  <option>General Inquiry</option>
                  <option>Strength Training</option>
                  <option>CrossFit & Conditioning</option>
                  <option>Personal Training</option>
                  <option>Yoga & Wellness</option>
                  <option>Membership Plans</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">How can we help you?</label>
                <textarea
                  className="form-control text-control"
                  rows="4"
                  required
                  placeholder="WRITE YOUR MESSAGE HERE..."
                  value={formState.msg}
                  onChange={(e) => setFormState({ ...formState, msg: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" disabled={isSubmitting} className="btn btn-primary submit-contact-btn">
                {isSubmitting ? 'Transmitting...' : 'Send Message Now'}
              </button>
            </form>
          </div>

          {/* Right: Quick Contacts & Map */}
          <div className="contact-details-box">
            <div className="details-card glass-card">
              <h3>Connect <span>Directly</span></h3>
              <div className="contact-links-list">
                
                {/* Phone */}
                <a href="tel:{{PHONE}}" className="contact-link-item">
                  <div className="icon-circle"><Phone size={20} /></div>
                  <div>
                    <h4>Phone Support</h4>
                    <p>{content.phone}</p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a 
                  href="https://wa.me/{{PHONE}}?text=Hi, I want to inquire about gym membership details."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-link-item"
                >
                  <div className="icon-circle whatsapp-circle"><MessageSquare size={20} /></div>
                  <div>
                    <h4>WhatsApp Inquiry</h4>
                    <p>Chat Live With Support</p>
                  </div>
                </a>

                {/* Email */}
                <a href={`mailto:${content.email}`} className="contact-link-item">
                  <div className="icon-circle"><Mail size={20} /></div>
                  <div>
                    <h4>Email Address</h4>
                    <p>{content.email}</p>
                  </div>
                </a>

                {/* Address */}
                <div className="contact-link-item no-link">
                  <div className="icon-circle"><MapPin size={20} /></div>
                  <div>
                    <h4>Club Address</h4>
                    <p>{content.address}</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="contact-link-item no-link">
                  <div className="icon-circle"><Clock size={20} /></div>
                  <div>
                    <h4>Operating Hours</h4>
                    <p>Mon - Fri: 05:00 AM - 11:00 PM <br /> Sat - Sun: 07:00 AM - 09:00 PM</p>
                  </div>
                </div>

              </div>
            </div>

            {/* Embedded Google Map with Dark Theme filter */}
            <div className="google-map-container glass-card">
              <iframe
                title="Gym Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537353153167!3d-37.81627977975172!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d4c2b349649%3A0xb6899234e561db11!2sEnvato!5e0!3m2!1sen!2sus!4v1600320498115!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
