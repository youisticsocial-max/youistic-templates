import React from 'react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Collections = () => {
  const collections = [
    { title: 'The Royal Bedroom', desc: 'Transform your sanctuary with our premium silk and Egyptian cotton linens.', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000' },
    { title: 'Modern Living', desc: 'Minimalist decor, bold statement pieces, and elegant drapes.', img: 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=2000' },
    { title: 'Artisan Carpets', desc: 'Handwoven rugs that tell a story of tradition and luxury.', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=2000' }
  ];

  return (
    <div className="page-container">
      <div className="page-hero" style={{height: '350px'}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000')"}}></div>
        <div className="page-hero-overlay"></div>
        <div className="container relative" style={{zIndex: 1}}>
          <h1>Exclusive Collections</h1>
          <p>Curated themes for the ultimate lifestyle</p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xxl)'}}>
          {collections.map((col, idx) => (
            <div key={idx} style={{display: 'flex', flexDirection: idx % 2 === 1 ? 'row-reverse' : 'row', gap: 'var(--spacing-xl)', alignItems: 'center'}}>
              <div style={{flex: 1}}>
                <div style={{height: '500px', backgroundImage: `url(${col.img})`, backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)'}}></div>
              </div>
              <div style={{flex: 1, padding: 'var(--spacing-xl)'}}>
                <h2 style={{fontSize: '2.5rem', marginBottom: 'var(--spacing-md)'}}>{col.title}</h2>
                <p style={{fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: 'var(--spacing-lg)'}}>{col.desc}</p>
                <Link to="/new-arrivals" className="btn btn-primary">Shop The Look</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collections;
