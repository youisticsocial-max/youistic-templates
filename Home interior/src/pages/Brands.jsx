import React from 'react';
import './Pages.css';

const Brands = () => {
  const brandLogos = [
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Ikea_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
    'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
    'https://upload.wikimedia.org/wikipedia/commons/4/44/Ikea_logo.svg',
    'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg'
  ];

  return (
    <div className="page-container">
      <div className="page-hero" style={{height: '250px'}}>
        <div className="page-hero-bg" style={{background: 'var(--primary-color)'}}></div>
        <div className="container relative" style={{zIndex: 1}}>
          <h1>Partner Brands</h1>
          <p>We collaborate with the world's finest</p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--spacing-xl)'}}>
          {brandLogos.map((logo, idx) => (
            <div key={idx} style={{background: 'var(--surface-color)', padding: 'var(--spacing-xl)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)'}}>
              <img src={logo} alt="Brand" style={{height: '50px', objectFit: 'contain', filter: 'grayscale(100%)', opacity: 0.6, transition: 'all var(--transition-normal)'}} onMouseOver={e => {e.currentTarget.style.filter='grayscale(0%)'; e.currentTarget.style.opacity=1;}} onMouseOut={e => {e.currentTarget.style.filter='grayscale(100%)'; e.currentTarget.style.opacity=0.6;}} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Brands;
