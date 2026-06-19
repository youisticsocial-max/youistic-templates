import React from 'react';
import { motion } from 'framer-motion';
import { Award, Globe, ShieldCheck, Cpu } from 'lucide-react';

export default function About() {
  const timeline = [
    { year: '2005', title: 'The Beginning', desc: 'Established our first manufacturing unit with a vision to redefine architectural surfaces.' },
    { year: '2012', title: 'Global Expansion', desc: 'Started exporting premium vitrified tiles to over 20 countries worldwide.' },
    { year: '2018', title: 'Innovation Lab', desc: 'Launched state-of-the-art R&D center for advanced carving and marble technologies.' },
    { year: '2023', title: 'Bathware Launch', desc: 'Introduced luxury sanitaryware and designer bath fittings.' }
  ];

  return (
    <div className="about-page" style={{ paddingTop: '80px' }}>
      
      {/* Hero */}
      <section className="section-dark" style={{ padding: '8rem 0', position: 'relative' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem', marginBottom: '1rem', display: 'block' }}>Our Story</span>
            <h1 style={{ marginBottom: '2rem' }}>The Legacy of {"{{CLINIC_NAME}}"}</h1>
            <p style={{ fontSize: '1.2rem', color: '#a0a0a0', lineHeight: 1.8 }}>
              We don't just manufacture tiles; we craft experiences. For over two decades, {"{{CLINIC_NAME}}"} has been at the forefront of architectural surface innovation, blending natural inspiration with cutting-edge Italian technology.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values & Philosophy */}
      <section className="section" style={{ background: '#f9f9f9' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem' }}>
            <div>
              <Award size={40} style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Design Philosophy</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Our designs are rooted in the elegance of nature and the precision of modern architecture, creating timeless surfaces for contemporary spaces.</p>
            </div>
            <div>
              <Cpu size={40} style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Technology</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Equipped with advanced European machinery, we ensure high-definition printing and flawless finishes on every single tile.</p>
            </div>
            <div>
              <ShieldCheck size={40} style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }} />
              <h3 style={{ marginBottom: '1rem' }}>Craftsmanship</h3>
              <p style={{ color: 'var(--text-secondary)' }}>Strict quality control and an eye for perfection guarantee that our products exceed international standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Visuals - Factory & Team */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="/assets/factory.jpg" alt="Manufacturing Facility" style={{ width: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem' }}>Infrastructure</span>
              <h2 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>World-Class Manufacturing</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Spread across vast acres, our production facility houses the latest kilns, digital printers, and polishing lines. We maintain a sustainable zero-waste policy, ensuring our premium surfaces are eco-friendly.
              </p>
              <div style={{ display: 'flex', gap: '2rem' }}>
                <div>
                  <h4 style={{ fontSize: '2rem', color: 'var(--primary-color)', fontWeight: 300 }}>10M+</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Sq. Meters Annually</p>
                </div>
                <div>
                  <h4 style={{ fontSize: '2rem', color: 'var(--primary-color)', fontWeight: 300 }}>0%</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Waste Output</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section section-dark">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '5rem' }}>Our Journey</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', position: 'relative' }}>
            {timeline.map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}>
                <div style={{ color: 'var(--primary-color)', fontSize: '2rem', fontWeight: 300, marginBottom: '1rem' }}>{item.year}</div>
                <h4 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>{item.title}</h4>
                <p style={{ color: '#a0a0a0', fontSize: '0.95rem' }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section" style={{ textAlign: 'center' }}>
        <div className="container">
          <Globe size={48} style={{ color: 'var(--primary-color)', marginBottom: '1rem' }} />
          <h2 style={{ marginBottom: '1.5rem' }}>Global Presence</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 4rem auto' }}>
            {"{{CLINIC_NAME}}"} surfaces grace prestigious projects across continents. With a robust export network, we bring Indian craftsmanship to the world.
          </p>
          <div style={{ width: '100%', height: '400px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ccc', borderRadius: '8px' }}>
             [ Interactive Map Placeholder ]
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .section > .container > div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}