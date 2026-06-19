import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, ShieldCheck, Sparkles, Globe2, HeadphonesIcon } from 'lucide-react';

export default function WhyChooseUs() {
  const features = [
    { icon: <Cpu size={40} />, title: 'Advanced Technology', desc: 'Modern manufacturing and precision finishing using the latest European kilns and digital printers.' },
    { icon: <ShieldCheck size={40} />, title: 'Superior Quality', desc: 'Strict quality standards ensuring high durability, scratch resistance, and low water absorption.' },
    { icon: <Sparkles size={40} />, title: 'Innovative Designs', desc: 'Latest trends inspired by nature and modern architecture, creating timeless elegance.' },
    { icon: <Globe2 size={40} />, title: 'Wide Availability', desc: 'Fast supply chains and an extensive global dealer network for uninterrupted project delivery.' },
    { icon: <HeadphonesIcon size={40} />, title: 'Expert Consultation', desc: 'Dedicated guidance for architects, interior designers, and individual home builders.' }
  ];

  return (
    <div className="why-us-page" style={{ paddingTop: '80px' }}>
      
      {/* Header */}
      <section className="section-dark" style={{ padding: '8rem 0', textAlign: 'center', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.1, backgroundImage: 'url(/assets/tile-texture.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem' }}>The {"{{CLINIC_NAME}}"} Advantage</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Why Choose Us</h1>
          <p style={{ color: '#a0a0a0', fontSize: '1.2rem', maxWidth: '700px', margin: '0 auto' }}>
            We combine art, technology, and craftsmanship to deliver surfaces that exceed expectations. Discover the pillars of our excellence.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="section" style={{ background: '#f5f5f5' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {features.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ 
                  background: 'white', 
                  padding: '3rem 2rem', 
                  borderRadius: '0', 
                  borderTop: '3px solid transparent',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.02)'
                }}
                className="feature-card"
              >
                <div style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>
                  {feat.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>{feat.title}</h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .feature-card:hover {
          border-top-color: var(--primary-color) !important;
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.05) !important;
        }
      `}</style>
    </div>
  );
}