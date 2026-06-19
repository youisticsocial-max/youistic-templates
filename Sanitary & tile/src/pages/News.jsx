import React from 'react';
import { motion } from 'framer-motion';

export default function News() {
  const articles = [
    { title: 'The Rise of Large Format Tiles', cat: 'Interior Trends', date: 'October 12, 2024', img: '/assets/living-room-tile.jpg' },
    { title: 'Choosing the Right Finish for Your Bathroom', cat: 'Bathroom Inspiration', date: 'September 28, 2024', img: '/assets/luxury-bathroom.jpg' },
    { title: 'New Launch: The Carving Collection', cat: 'New Launches', date: 'September 15, 2024', img: '/assets/tile-texture.jpg' },
    { title: 'Seamless Architecture with Seamless Joints', cat: 'Architecture Ideas', date: 'August 30, 2024', img: '/assets/hero-architecture.jpg' },
  ];

  return (
    <div className="news-page" style={{ paddingTop: '80px' }}>
      
      <section className="section-dark" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem' }}>Editorial</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>News & Inspiration</h1>
        </div>
      </section>

      <section className="section" style={{ background: '#f9f9f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '3rem' }}>
            {articles.map((art, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                style={{ background: 'white', border: '1px solid var(--border-color)', overflow: 'hidden' }}
                className="article-card"
              >
                <div style={{ height: '250px', overflow: 'hidden' }}>
                  <img src={art.img} alt={art.title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="article-img" />
                </div>
                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <span style={{ color: 'var(--primary-color)' }}>{art.cat}</span>
                    <span>{art.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem', lineHeight: 1.4 }}>{art.title}</h3>
                  <button className="btn btn-outline" style={{ padding: '0.6rem 0', border: 'none', borderBottom: '1px solid var(--text-primary)' }}>Read Article</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .article-card:hover .article-img { transform: scale(1.05); }
      `}</style>
    </div>
  );
}