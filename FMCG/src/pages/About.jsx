import React from 'react';
import { motion } from 'framer-motion';
import { Target, Award, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="page-wrapper">
      <div className="section-header" style={{ backgroundColor: 'var(--bg-dark)', color: '#fff', padding: '100px 0 60px', textAlign: 'center' }}>
        <div className="container">
          <h1 className="section-title">About {"{{CLINIC_NAME}}"}</h1>
          <p className="section-subtitle mx-auto" style={{ color: '#ccc' }}>
            Our journey of bringing purity, quality, and tradition to your everyday life.
          </p>
        </div>
      </div>

      <section className="section bg-light">
        <div className="container">
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '60px' }}>
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <img src="/assets/farming.jpg" alt="Farming" style={{ borderRadius: '20px', boxShadow: 'var(--shadow-lg)' }} />
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <span className="badge">Our Heritage</span>
              <h2 className="section-title" style={{ marginTop: '16px' }}>Rooted in Tradition, Growing with Trust.</h2>
              <p style={{ marginBottom: '20px', color: 'var(--text-light)', fontSize: '1.1rem' }}>
                At {"{{CLINIC_NAME}}"}, we believe that the secret to a healthy lifestyle begins with what you consume. 
                For over two decades, we have been sourcing the finest natural ingredients to deliver products that 
                embody purity and authentic taste.
              </p>
              <p style={{ marginBottom: '30px', color: 'var(--text-light)', fontSize: '1.1rem' }}>
                From our state-of-the-art manufacturing facilities to your kitchen, every step is carefully monitored 
                to preserve the natural aroma, nutrition, and freshness of our daily essentials.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">Our Vision & Values</h2>
          <div className="grid grid-cols-3" style={{ marginTop: '50px' }}>
            <div className="feature-item" style={{ flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
              <div className="feature-icon" style={{ marginBottom: '20px' }}><Target size={32} /></div>
              <h4>Uncompromising Quality</h4>
              <p>We source only the best ingredients and adhere strictly to global food safety standards.</p>
            </div>
            <div className="feature-item" style={{ flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
              <div className="feature-icon" style={{ marginBottom: '20px' }}><Award size={32} /></div>
              <h4>Authenticity</h4>
              <p>Preserving the true essence and traditional flavors of every product we manufacture.</p>
            </div>
            <div className="feature-item" style={{ flexDirection: 'column', textAlign: 'center', alignItems: 'center' }}>
              <div className="feature-icon" style={{ marginBottom: '20px' }}><Users size={32} /></div>
              <h4>Customer First</h4>
              <p>Dedicated to delivering value, health, and happiness to millions of households.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
