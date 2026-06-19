import React from 'react';
import './Pages.css';

const Gallery = () => {
  const images = [
    'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800',
    'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800',
    'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=800',
    'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800',
    'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800',
    'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800'
  ];

  return (
    <div className="page-container">
      <div className="page-hero" style={{height: '300px'}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000')"}}></div>
        <div className="page-hero-overlay"></div>
        <div className="container relative" style={{zIndex: 1}}>
          <h1>Inspiration Gallery</h1>
          <p>Discover beautiful spaces styled with our collections</p>
        </div>
      </div>

      <div className="container section-padding">
        <div style={{columnCount: 3, columnGap: 'var(--spacing-md)'}}>
          {images.map((img, idx) => (
            <div key={idx} style={{marginBottom: 'var(--spacing-md)', breakInside: 'avoid', borderRadius: 'var(--radius-md)', overflow: 'hidden'}}>
              <img src={img} alt="Gallery item" style={{width: '100%', display: 'block', transition: 'transform var(--transition-normal)'}} onMouseOver={e => e.currentTarget.style.transform='scale(1.05)'} onMouseOut={e => e.currentTarget.style.transform='scale(1)'} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
