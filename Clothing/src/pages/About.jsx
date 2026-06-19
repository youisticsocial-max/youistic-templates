import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="about-page">
      {/* Editorial Hero */}
      <section className="about-hero">
        <div className="about-hero-image-container">
          <img 
            src="assets/lookbook-1.jpg" 
            alt="About Us" 
            className="img-cover"
            onError={(e) => { e.target.src = 'https://placehold.co/1920x800/eeeeee/333333?text=Editorial+Brand+Image'; }}
          />
        </div>
        <div className="container about-hero-content text-center">
          <motion.div initial="hidden" animate="show" variants={fadeInUp}>
            <h1>The Journey of <span>{'{{CLINIC_NAME}}'.includes('CLINIC_NAME') ? 'Luxe Fashion' : '{{CLINIC_NAME}}'}</span></h1>
            <p className="subtitle mx-auto" style={{maxWidth: '700px', marginTop: '1rem'}}>
              Born out of a desire for premium, sustainable, and timeless fashion. We believe in creating pieces that you'll cherish for a lifetime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section container">
        <div className="grid-2 align-center gap-xl">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="mb-sm">Our Design Philosophy</h2>
            <p className="text-secondary mb-md">
              At <span>{'{{CLINIC_NAME}}'.includes('CLINIC_NAME') ? 'Luxe Fashion' : '{{CLINIC_NAME}}'}</span>, we believe that true elegance lies in simplicity and comfort. Every stitch, every seam, and every fabric choice is a deliberate decision aimed at enhancing your everyday life.
            </p>
            <p className="text-secondary">
              We strip away the unnecessary, focusing purely on what makes a garment feel like a second skin. Our silhouettes are modern yet deeply rooted in classic tailoring traditions, ensuring you never feel out of style.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="image-card"
          >
            <img 
              src="assets/product-3.jpg" 
              alt="Design Philosophy" 
              className="img-cover"
              onError={(e) => { e.target.src = 'https://placehold.co/600x800/f4f4f4/333333?text=Design'; }}
            />
          </motion.div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="quality-section section bg-surface">
        <div className="container">
          <div className="grid-2 align-center gap-xl">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="image-card order-2"
            >
              <img 
                src="assets/hero-fashion.jpg" 
                alt="Quality Craftsmanship" 
                className="img-cover"
                onError={(e) => { e.target.src = 'https://placehold.co/600x800/eeeeee/666666?text=Craftsmanship'; }}
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1"
            >
              <h2 className="mb-sm">Uncompromising Quality</h2>
              <p className="text-secondary mb-md">
                We partner with generations-old artisanal factories and ethical manufacturers across the globe. By bypassing traditional retail markups, we deliver luxury-grade clothing directly to you.
              </p>
              <ul className="custom-list">
                <li>Responsibly sourced organic materials</li>
                <li>Rigorous durability testing</li>
                <li>Fair wages and safe working conditions</li>
                <li>Transparent supply chain</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Team / Craftsmanship */}
      <section className="section container text-center">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="mb-sm">Meet The Makers</h2>
          <p className="subtitle mx-auto mb-lg" style={{maxWidth: '700px'}}>
            A dedicated team of designers, tailors, and visionaries working together to redefine modern comfort.
          </p>
          
          <div className="grid-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="team-member">
                <div className="team-image-container mb-sm">
                  <img src={`https://placehold.co/400x500/eeeeee/666666?text=Artisan+${item}`} alt={`Artisan ${item}`} className="img-cover grayscale-hover" />
                </div>
                <h4>Master Craftsman</h4>
                <p className="text-secondary text-sm">Over 20 years of experience</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
