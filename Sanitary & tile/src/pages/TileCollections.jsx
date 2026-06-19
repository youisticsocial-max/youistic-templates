import React, { useState } from 'react';
import { Download, Info, Search, Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function TileCollections() {
  const [activeFilter, setActiveFilter] = useState('all');

  const filters = ['all', 'matt', 'glossy', 'carving', 'marble', 'wooden'];

  const products = [
    { id: 1, name: 'Statuario White', finish: 'Glossy', size: '1200x2400mm', img: '/assets/luxury-bathroom.jpg', collection: 'marble' },
    { id: 2, name: 'Onyx Pearl', finish: 'High Gloss', size: '800x1600mm', img: '/assets/collection-glossy.jpg', collection: 'glossy' },
    { id: 3, name: 'Cement Ash', finish: 'Matt', size: '600x1200mm', img: '/assets/collection-matt.jpg', collection: 'matt' },
    { id: 4, name: 'Oak Wood Brown', finish: 'Wood', size: '200x1200mm', img: '/assets/living-room-tile.jpg', collection: 'wooden' },
    { id: 5, name: 'Travertino Navona', finish: 'Carving', size: '800x1600mm', img: '/assets/tile-texture.jpg', collection: 'carving' },
    { id: 6, name: 'Pietra Grey', finish: 'Matt', size: '1200x1200mm', img: '/assets/hero-architecture.jpg', collection: 'matt' },
  ];

  const filteredProducts = activeFilter === 'all' ? products : products.filter(p => p.collection === activeFilter);

  return (
    <div className="collections-page" style={{ paddingTop: '80px' }}>
      {/* Header */}
      <section className="section-dark" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ marginBottom: '1rem' }}>Tile Collections</h1>
          <p style={{ color: '#a0a0a0', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>Explore our extensive range of premium vitrified surfaces designed for luxury and durability.</p>
        </div>
      </section>

      {/* Filters & Grid */}
      <section className="section" style={{ background: '#fcfcfc' }}>
        <div className="container">
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem' }}>
            {/* Filter Buttons */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {filters.map(f => (
                <button 
                  key={f} 
                  onClick={() => setActiveFilter(f)}
                  className={`btn ${activeFilter === f ? 'btn-primary' : 'btn-outline'}`}
                  style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}
                >
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
              ))}
            </div>

            {/* Additional Filters / Search */}
            <div style={{ display: 'flex', gap: '1rem' }}>
              <button className="btn btn-outline" style={{ padding: '0.6rem 1rem' }}><Filter size={18} /> Advanced Filters</button>
            </div>
          </div>

          {/* Product Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {filteredProducts.map((p, i) => (
              <motion.div 
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="product-card"
                style={{ background: 'white', border: '1px solid var(--border-color)', height: 'auto', aspectRatio: 'auto' }}
              >
                <div style={{ height: '300px', overflow: 'hidden' }}>
                  <img src={p.img} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{p.finish} | {p.size}</span>
                  <h3 style={{ fontSize: '1.2rem', marginTop: '0.5rem', marginBottom: '1.5rem' }}>{p.name}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <button className="btn btn-primary" style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>Inquire</button>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn btn-outline" style={{ padding: '0.6rem', border: 'none' }} title="Technical Details"><Info size={18} /></button>
                      <button className="btn btn-outline" style={{ padding: '0.6rem', border: 'none' }} title="Download Specification"><Download size={18} /></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}