import React from 'react';
import { motion } from 'framer-motion';

export default function BathwareCollections() {
  const categories = [
    { title: 'Wash Basins', desc: 'Sleek and elegant ceramic designs.', img: '/assets/luxury-bathroom.jpg' },
    { title: 'Faucets', desc: 'Precision engineering with premium finishes.', img: '/assets/hero-architecture.jpg' },
    { title: 'Showers', desc: 'Immersive rain and cascade experiences.', img: '/assets/tile-texture.jpg' },
    { title: 'Toilets', desc: 'Modern, water-saving sanitaryware.', img: '/assets/collection-matt.jpg' },
    { title: 'Bathtubs', desc: 'Freestanding luxury for relaxation.', img: '/assets/luxury-bathroom.jpg' },
  ];

  return (
    <div className="bathware-page" style={{ paddingTop: '80px' }}>
      
      {/* Hero */}
      <section className="section" style={{ padding: '6rem 0 0 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center', marginBottom: '6rem' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem' }}>Luxury Sanitaryware</span>
              <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Designer Bathware Collections</h1>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Transform your bathroom into a personal spa. {"{{CLINIC_NAME}}"} offers a curated selection of premium bathware that combines European aesthetics with unmatched functionality.
              </p>
              <button className="btn btn-primary">Download Catalog</button>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
              <img src="/assets/luxury-bathroom.jpg" alt="Luxury Bathware" style={{ width: '100%', height: '500px', objectFit: 'cover' }} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="section-dark" style={{ padding: '6rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '4rem' }}>Explore Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '2rem' }}>
            {categories.map((cat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ position: 'relative', height: '400px', overflow: 'hidden', group: 'true' }}
                className="product-card"
              >
                <img src={cat.img} alt={cat.title} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))' }}>
                  <h3 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.5rem' }}>{cat.title}</h3>
                  <p style={{ color: '#a0a0a0', marginBottom: '1rem' }}>{cat.desc}</p>
                  <button className="btn btn-outline" style={{ color: 'white', borderColor: 'white', padding: '0.6rem 1.5rem', fontSize: '0.8rem' }}>View Collection</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}