import React, { useState, useEffect } from 'react';
import { MessageCircle, ArrowUp } from 'lucide-react';
import './FloatingButtons.css';

export default function FloatingButtons() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const openWhatsApp = () => {
    const phone = '919876543210';
    const message = encodeURIComponent("Hello {{CLINIC_NAME}}! I would like to plan a tour with you. Please connect me with a travel expert.");
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="floating-container">
      {/* Scroll to Top */}
      <button 
        className={`scroll-top-btn ${showScrollTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        title="Scroll to Top"
        aria-label="Scroll to Top"
      >
        <ArrowUp size={20} />
      </button>

      {/* WhatsApp Floating Button */}
      <div 
        className="wa-float" 
        onClick={openWhatsApp}
        title="Chat on WhatsApp"
        role="button"
        tabIndex={0}
      >
        <div className="wa-pulse"></div>
        <MessageCircle size={28} fill="#FFFFFF" />
        <span className="wa-tooltip">💬 Chat with travel expert</span>
      </div>
    </div>
  );
}
