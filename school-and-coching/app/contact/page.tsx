import Link from "next/link";
import { siteConfig } from "@/data/siteConfig";
import EnquiryForm from "@/components/EnquiryForm";
import "./contact.css";

export default function ContactPage() {
  return (
    <>
      {/* ── Page Hero ── */}
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <span>Contact Us</span>
          </div>
          <h1>Contact & Location Details</h1>
          <p>Get in touch with our admissions coordinators, check bus route coordinates or locate campus.</p>
        </div>
      </section>

      {/* ── Contact Details Grid ── */}
      <section className="section contact-details-section">
        <div className="container grid-3 contact-cards-grid">
          {/* Card 1: Call */}
          <div className="contact-info-card card text-center">
            <span className="contact-icon">📞</span>
            <h3>Call Counselors</h3>
            <p>Speak to our counseling executive regarding registrations and fee structures.</p>
            <a href={`tel:${siteConfig.contact.phone}`} className="contact-link">
              {siteConfig.contact.phone}
            </a>
          </div>

          {/* Card 2: Email */}
          <div className="contact-info-card card text-center">
            <span className="contact-icon">✉️</span>
            <h3>Email Admissions</h3>
            <p>Send standard documentation or academic request certificates directly to our desk.</p>
            <a href={`mailto:${siteConfig.contact.email}`} className="contact-link">
              {siteConfig.contact.email}
            </a>
          </div>

          {/* Card 3: Location */}
          <div className="contact-info-card card text-center">
            <span className="contact-icon">📍</span>
            <h3>Campus Address</h3>
            <p>{siteConfig.contact.address}</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              Get Directions
            </a>
          </div>
        </div>
      </section>

      {/* ── Form & Maps Section ── */}
      <section className="section section-alt contact-map-form-section">
        <div className="container grid-2">
          <div className="map-area card animate-fade-left">
            <iframe
              title="EduVision Academy Campus Location Map"
              src={siteConfig.contact.mapEmbed}
              className="embed-map-frame"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="map-meta">
              <h4>Campus coordinates:</h4>
              <p>GPS tracking active. Visitor parking facility available directly outside gate 2.</p>
            </div>
          </div>
          <div className="form-area animate-fade-right">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}
