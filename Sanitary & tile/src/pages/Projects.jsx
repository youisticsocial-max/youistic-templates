import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X, Maximize2 } from 'lucide-react';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxImg, setLightboxImg] = useState(null);

  const categories = ['all', 'residential', 'commercial', 'hospitality', 'luxury villas', 'offices'];

  const projects = [
    { id: 1, title: 'The Azure Villa', category: 'luxury villas', img: '/assets/luxury-bathroom.jpg', height: '400px' },
    { id: 2, title: 'Grand Hyatt Lobby', category: 'hospitality', img: '/assets/showroom.jpg', height: '600px', video: true },
    { id: 3, title: 'Modern Minimalist', category: 'residential', img: '/assets/living-room-tile.jpg', height: '450px' },
    { id: 4, title: 'Corporate HQ', category: 'offices', img: '/assets/hero-architecture.jpg', height: '500px' },
    { id: 5, title: 'Urban Retreat', category: 'residential', img: '/assets/luxury-bathroom.jpg', height: '350px' },
    { id: 6, title: 'Premium Mall', category: 'commercial', img: '/assets/showroom.jpg', height: '550px' },
  ];

  const filtered = activeCategory === 'all' ? projects : projects.filter(p => p.category === activeCategory);

  return (
    <div className="projects-page" style={{ paddingTop: '80px' }}>
      
      {/* Header */}
      <section className="section" style={{ padding: '6rem 0 2rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1.5rem' }}>Project Gallery</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            Immerse yourself in spaces transformed by {"{{CLINIC_NAME}}"} surfaces.
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`btn ${activeCategory === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ padding: '0.5rem 1.2rem', fontSize: '0.8rem' }}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid (Mocked with columns) */}
      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="container">
          <div style={{ columnCount: 3, columnGap: '2rem' }} className="masonry-grid">
            <AnimatePresence>
              {filtered.map(p => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={p.id}
                  className="project-item"
                  style={{ marginBottom: '2rem', position: 'relative', overflow: 'hidden', breakInside: 'avoid', cursor: 'pointer', group: 'true' }}
                  onClick={() => setLightboxImg(p.img)}
                >
                  <img src={p.img} alt={p.title} style={{ width: '100%', display: 'block', height: p.height, objectFit: 'cover' }} />
                  <div className="project-overlay" style={{
                    position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                    background: 'rgba(0,0,0,0.6)', display: 'flex', flexDirection: 'column',
                    justifyContent: 'center', alignItems: 'center', opacity: 0, transition: 'all 0.3s ease'
                  }}>
                    {p.video ? <Play size={48} color="white" style={{ marginBottom: '1rem' }} /> : <Maximize2 size={32} color="white" style={{ marginBottom: '1rem' }} />}
                    <h3 style={{ color: 'white', fontSize: '1.5rem' }}>{p.title}</h3>
                    <span style={{ color: 'var(--primary-color)', textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em' }}>{p.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImg && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
              background: 'rgba(0,0,0,0.95)', zIndex: 3000,
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              padding: '2rem'
            }}
            onClick={() => setLightboxImg(null)}
          >
            <button style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={32} />
            </button>
            <img src={lightboxImg} alt="Enlarged Project" style={{ maxWidth: '100%', maxHeight: '90vh', objectFit: 'contain' }} />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .project-item:hover .project-overlay { opacity: 1 !important; }
        @media (max-width: 1024px) { .masonry-grid { column-count: 2 !important; } }
        @media (max-width: 640px) { .masonry-grid { column-count: 1 !important; } }
      `}</style>
    </div>
  );
}