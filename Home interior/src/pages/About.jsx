import React from 'react';
import './Pages.css';

const About = () => {
  return (
    <div className="page-container">
      <div className="page-hero">
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop')"}}></div>
        <div className="page-hero-overlay"></div>
        <div className="container relative" style={{zIndex: 1}}>
          <h1>About {"{{CLINIC_NAME}}"}</h1>
          <p>Crafting luxurious living spaces since 1998.</p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center'}}>
          <div>
            <h2 style={{fontSize: '2.5rem', marginBottom: '1.5rem'}}>Our Story</h2>
            <p style={{fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '1rem'}}>
              What started as a small boutique for premium fabrics has blossomed into an international destination for luxury home lifestyle products. At {"{{CLINIC_NAME}}"}, we believe your home is your ultimate sanctuary.
            </p>
            <p style={{fontSize: '1.1rem', color: 'var(--text-secondary)'}}>
              We travel the world to source the finest materials, collaborate with master artisans, and curate collections that transform everyday living spaces into extraordinary experiences of comfort and elegance.
            </p>
          </div>
          <div>
            <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1000&auto=format&fit=crop" alt="Store Interior" style={{borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)'}} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
