import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function Spaces() {
  const spaces = [
    { id: 'living', title: 'Living Room', desc: 'Elegant flooring and statement walls that create a lasting first impression.', img: '/assets/living-room-tile.jpg' },
    { id: 'bathroom', title: 'Bathroom', desc: 'Luxury waterproof surfaces for a spa-like retreat.', img: '/assets/luxury-bathroom.jpg' },
    { id: 'kitchen', title: 'Kitchen', desc: 'Modern, easy-maintenance designs resistant to stains and scratches.', img: '/assets/collection-glossy.jpg' },
    { id: 'commercial', title: 'Commercial Spaces', desc: 'High-traffic durability for hotels, malls, offices, and showrooms.', img: '/assets/showroom.jpg' },
    { id: 'outdoor', title: 'Outdoor Areas', desc: 'Weather-resistant architectural surfaces for parking, gardens, and terraces.', img: '/assets/hero-architecture.jpg' },
  ];

  return (
    <div className="spaces-page" style={{ paddingTop: '80px' }}>
      
      {/* Header */}
      <section className="section" style={{ padding: '6rem 0', textAlign: 'center' }}>
        <div className="container">
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem' }}>Applications</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Tiles By Space</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Discover how {"{{CLINIC_NAME}}"} surfaces can transform every environment into a masterpiece of modern architecture.
          </p>
        </div>
      </section>

      {/* Immersive Spaces Sections */}
      <div>
        {spaces.map((space, i) => (
          <section key={space.id} style={{ position: 'relative', height: '80vh', minHeight: '600px', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>
            
            {/* Background Image with Parallax Effect */}
            <motion.div 
              initial={{ scale: 1.1 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}
            >
              <img src={space.img} alt={space.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }}></div>
            </motion.div>

            <div className="container" style={{ position: 'relative', zIndex: 1, color: 'white' }}>
              <motion.div 
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                style={{ maxWidth: '600px' }}
              >
                <div style={{ fontSize: '4rem', fontWeight: 100, color: 'rgba(255,255,255,0.1)', lineHeight: 1, marginBottom: '-1.5rem', marginLeft: '-5px' }}>
                  0{i + 1}
                </div>
                <h2 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>{space.title}</h2>
                <p style={{ fontSize: '1.2rem', color: '#d0d0d0', marginBottom: '2.5rem', fontWeight: 300 }}>{space.desc}</p>
                <button className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                  Explore Gallery <ArrowRight size={18} />
                </button>
              </motion.div>
            </div>
            
          </section>
        ))}
      </div>

    </div>
  );
}