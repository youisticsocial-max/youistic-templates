import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import './FloatingCTA.css';

const FloatingCTA = () => {
  return (
    <div className="floating-cta-container">
      {/* Phone CTA */}
      <a 
        href="tel:{{PHONE}}" 
        className="floating-btn floating-phone" 
        aria-label="Call Now"
      >
        <Phone size={22} />
        <span className="tooltip-text">Call Now</span>
      </a>

      {/* WhatsApp CTA */}
      <a 
        href="https://wa.me/{{PHONE}}?text=Hi, I am interested in membership plans at {{CLINIC_NAME}}!" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-btn floating-whatsapp" 
        aria-label="WhatsApp Inquiry"
      >
        <MessageCircle size={22} />
        <span className="tooltip-text">WhatsApp Us</span>
      </a>
    </div>
  );
};

export default FloatingCTA;
