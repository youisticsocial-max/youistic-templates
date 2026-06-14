import React from 'react';
import { 
  Heart, 
  Sparkles, 
  Stethoscope, 
  Layers, 
  ShieldCheck, 
  TrendingUp, 
  Smile 
} from 'lucide-react';

const servicesData = [
  {
    icon: <Stethoscope size={28} />,
    title: "General Check-up",
    description: "Comprehensive dental examinations, professional digital X-rays, scaling, polishing, and early cavity detection.",
    highlights: ["Detailed oral scanning", "Ultrasonic cleaning", "Fluoride treatment"]
  },
  {
    icon: <TrendingUp size={28} />,
    title: "Braces & Aligners",
    description: "Straighten misaligned teeth with premium traditional braces or advanced clear invisible aligners for all age groups.",
    highlights: ["Clear Invisalign provider", "Custom design profiles", "Comfortable fit"]
  },
  {
    icon: <Sparkles size={28} />,
    title: "Teeth Whitening",
    description: "Get a bright, dazzling smile in just one session using advanced laser teeth whitening technologies and custom take-home kits.",
    highlights: ["Up to 8 shades lighter", "Enamel-safe bleaching", "Long-lasting results"]
  },
  {
    icon: <Layers size={28} />,
    title: "Root Canal Treatment",
    description: "Relieve tooth pain and save infected natural teeth with our painless, single-sitting modern micro-endodontic treatments.",
    highlights: ["Single-visit procedures", "Highly sterilized files", "Full ceramic crowns"]
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "Dental Implants",
    description: "Restore missing teeth permanently with biocompatible medical-grade titanium screw implants and custom porcelain crowns.",
    highlights: ["Lifetime implant warranty", "Natural look & function", "Pain-free surgery"]
  },
  {
    icon: <Heart size={28} />,
    title: "Gum Treatment",
    description: "Treat bleeding gums, bad breath, and advanced periodontitis with professional deep laser curettage and scaling.",
    highlights: ["Laser gum therapy", "Root planing & scaling", "Gum health restoration"]
  },
  {
    icon: <Smile size={28} />,
    title: "Pediatric Dentistry",
    description: "Gentle, fun, and fear-free dental care tailored specifically for kids, focusing on cavity prevention and dental habits.",
    highlights: ["Kid-friendly environment", "Cavity sealant therapy", "Growth monitoring"]
  }
];

export default function Services() {
  return (
    <section id="services" className="section section-dark">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Our Services</span>
          <h2 className="section-title">
            Comprehensive Care for <span>Your Family</span>
          </h2>
          <p>
            We offer a complete suite of professional dental procedures, using cutting-edge technology to ensure safe, painless, and durable results.
          </p>
        </div>

        <div className="grid grid-3 services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon-wrap">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              
              <ul className="service-highlights">
                {service.highlights.map((highlight, idx) => (
                  <li key={idx}>
                    <span className="bullet"></span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <a href="#appointment" className="service-link">
                <span>Book Appointment</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="link-arrow">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
