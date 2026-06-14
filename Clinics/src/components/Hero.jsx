import React from 'react';
import ImplantViewer from './ImplantViewer';
import { ArrowRight, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin();

export default function Hero() {
  useGSAP(() => {
    // Simple fade-in for hero text — no opacity:0 starting state needed
    gsap.fromTo(
      '.hero-fade-in',
      { opacity: 0, y: 24 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out', delay: 0.2 }
    );
  });

  return (
    /*
     * hero-scroll-trigger is the tall container (200vh) that gives the
     * ScrollTrigger inside ImplantViewer enough scroll distance.
     * hero-sticky-wrapper is position:sticky so the content stays visible
     * while the user scrolls through the 200vh buffer.
     */
    <section id="hero-scroll-trigger" className="hero-scroll-container">
      <div className="hero-sticky-wrapper" id="home">
        <div className="container hero-grid-wrapper">

          {/* ── Left: Text Content ── */}
          <div className="hero-content">
            <div className="hero-badge hero-fade-in">
              <span className="badge-dot"></span>
              <span>Trusted Dental Clinic in Jodhpur</span>
            </div>

            <h1 className="hero-title hero-fade-in">
              Exceptional <br />
              <span className="gradient-text">Dental Care</span> <br />
              &amp; Straight Smile
            </h1>

            <p className="hero-subtitle hero-fade-in">
              State-of-the-art treatment with a gentle touch. At{' '}
              <strong>{{CLINIC_NAME}}</strong>, your comfort and
              beautiful smile are our top priorities.
            </p>

            <div className="hero-actions hero-fade-in">
              <a href="#appointment" className="btn btn-primary">
                <span>Book Free Consultation</span>
                <ArrowRight size={18} />
              </a>
              <a href="#services" className="btn btn-secondary">
                <span>Our Services</span>
              </a>
            </div>

            <div className="hero-benefits hero-fade-in">
              {['Pain-Free Dentistry', 'Affordable EMI Available', 'Modern 3D Imaging'].map(b => (
                <div className="benefit-item" key={b}>
                  <CheckCircle size={16} className="benefit-icon" />
                  <span>{b}</span>
                </div>
              ))}
            </div>

            <div className="hero-metrics hero-fade-in">
              <div className="metric-box">
                <span className="metric-num">15+</span>
                <span className="metric-lbl">Years Exp.</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-num">10k+</span>
                <span className="metric-lbl">Happy Patients</span>
              </div>
              <div className="metric-divider"></div>
              <div className="metric-box">
                <span className="metric-num">5.0 ★</span>
                <span className="metric-lbl">Google Rating</span>
              </div>
            </div>
          </div>

          {/* ── Right: 3D Canvas ── */}
          <div className="hero-canvas-column">
            <div className="canvas-wrapper">
              <ImplantViewer />
            </div>

            {/* Scroll hint */}
            <div className="scroll-indicator-wrap">
              <div className="mouse-wheel"><div className="wheel-dot"></div></div>
              <span>Scroll to assemble implant</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
