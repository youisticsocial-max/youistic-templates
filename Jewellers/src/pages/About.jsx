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
            src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920" 
            alt="Our Heritage" 
            className="img-cover"
            onError={(e) => { e.target.src = 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920'; }}
          />
        </div>
        <div className="container about-hero-content text-center">
          <motion.div initial="hidden" animate="show" variants={fadeInUp}>
            <h1>The Legacy of <span>{'{{CLINIC_NAME}}'.includes('CLINIC_NAME') ? 'Luxe Jewels' : '{{CLINIC_NAME}}'}</span></h1>
            <p className="subtitle mx-auto" style={{maxWidth: '700px', marginTop: '1rem'}}>
              Born out of a profound reverence for Indian royal heritage and master craftsmanship. We believe in creating generational jewels that you will cherish for a lifetime.
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
              At <span>{'{{CLINIC_NAME}}'.includes('CLINIC_NAME') ? 'Luxe Jewels' : '{{CLINIC_NAME}}'}</span>, we believe that true elegance lies in honoring ancient traditions while embracing timeless beauty. Every gemstone, every polki setting, and every meenakari motif is a deliberate homage to India's regal past.
            </p>
            <p className="text-secondary">
              We focus on unparalleled purity and majestic silhouettes, ensuring that your jewelry is not merely an accessory, but a timeless heirloom that holds your family's story.
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
              src="https://images.pexels.com/photos/177332/pexels-photo-177332.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Design Philosophy" 
              className="img-cover"
              onError={(e) => { e.target.src = 'https://images.pexels.com/photos/177332/pexels-photo-177332.jpeg?auto=compress&cs=tinysrgb&w=800'; }}
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
                src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Quality Craftsmanship" 
                className="img-cover"
                onError={(e) => { e.target.src = 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800'; }}
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-1"
            >
              <h2 className="mb-sm">Uncompromising Purity</h2>
              <p className="text-secondary mb-md">
                We partner with generations-old artisanal karigars in Jaipur and Bikaner. Every piece is meticulously handcrafted to deliver luxury-grade, authentic Indian jewelry directly to you.
              </p>
              <ul className="custom-list">
                <li>100% Hallmarked 22k and 24k Gold</li>
                <li>Conflict-free certified diamonds and gemstones</li>
                <li>Preserving ancient Meenakari and Kundan techniques</li>
                <li>Transparent pricing and valuation</li>
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
          <h2 className="mb-sm">Meet The Karigars</h2>
          <p className="subtitle mx-auto mb-lg" style={{maxWidth: '700px'}}>
            A dedicated team of master artisans bringing centuries-old traditions to life with unparalleled skill.
          </p>
          
          <div className="grid-3">
            {[1, 2, 3].map((item) => (
              <div key={item} className="team-member">
                <div className="team-image-container mb-sm">
                  <img src={`https://images.pexels.com/photos/3310692/pexels-photo-3310692.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop`} alt={`Karigar ${item}`} className="img-cover grayscale-hover" />
                </div>
                <h4>Master Karigar</h4>
                <p className="text-secondary text-sm">Over 30 years of generational expertise</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
