import React from 'react';
import { Star } from 'lucide-react';
import './Pages.css';

const Testimonials = () => {
  const reviews = [
    { name: 'Sarah Jenkins', role: 'Interior Designer', text: 'The quality of the fabrics from {"{{CLINIC_NAME}}"} is unmatched. My clients are always thrilled with the luxurious feel.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200' },
    { name: 'Michael Chen', role: 'Homeowner', text: 'Transformed my living room completely. The curtains and cushions I purchased are elegant and durable.', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200' },
    { name: 'Emily Roberts', role: 'Architect', text: 'I always recommend this brand for premium wall coverings. The texture and designs are simply exquisite.', img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200' }
  ];

  return (
    <div className="page-container">
      <div className="page-hero" style={{height: '300px'}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000')"}}></div>
        <div className="page-hero-overlay"></div>
        <div className="container relative" style={{zIndex: 1}}>
          <h1>Client Testimonials</h1>
          <p>Read what our valued customers say about our products</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="page-grid">
          {reviews.map((rev, idx) => (
            <div key={idx} className="card" style={{padding: 'var(--spacing-xl)'}}>
              <div style={{display: 'flex', gap: '4px', color: '#fbbf24', marginBottom: 'var(--spacing-md)'}}>
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
                <Star fill="currentColor" size={20} />
              </div>
              <p style={{fontSize: '1.1rem', fontStyle: 'italic', marginBottom: 'var(--spacing-lg)'}}>"{rev.text}"</p>
              <div style={{display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)'}}>
                <img src={rev.img} alt={rev.name} style={{width: '60px', height: '60px', borderRadius: '50%', objectFit: 'cover'}} />
                <div>
                  <h4 style={{margin: 0, fontSize: '1.1rem'}}>{rev.name}</h4>
                  <span style={{color: 'var(--text-secondary)', fontSize: '0.9rem'}}>{rev.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
