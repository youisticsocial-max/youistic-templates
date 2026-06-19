import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { Instagram, Facebook, Twitter } from '../components/SocialIcons';
import { dataStore } from '../utils/dataStore';
import './Trainers.css';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    setTrainers(dataStore.getTrainers());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="trainers-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/personal-trainer.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Master Coaching Staff</span>
          <h1>Certified <span>Trainers</span></h1>
          <p>Learn from practitioners of strength. Our coaches hold international fitness degrees and professional athletic backgrounds.</p>
        </div>
      </section>

      {/* Team Section */}
      <section className="section trainers-grid-sec">
        <div className="glowing-bg" style={{ top: '20%', left: '5%' }}></div>
        <div className="container">
          <div className="section-header">
            <span className="badge-neon">Coaches Showcase</span>
            <h2 className="section-title">Meet The <span>Elite</span></h2>
            <p className="section-subtitle">Dedicated to optimizing your mechanics, acceleration, and bodily adaptation pathways.</p>
          </div>

          <div className="grid grid-4 team-grid">
            {trainers.map((trainer, idx) => (
              <motion.div
                key={trainer.id || idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                className="trainer-card"
              >
                <div className="trainer-img-box">
                  <img src={trainer.img} alt={trainer.name} className="trainer-img" />
                  
                  {/* Glass slide-up overlay */}
                  <div className="trainer-hover-overlay">
                    <div className="overlay-content">
                      <div className="overlay-trophy-badge">
                        <Trophy size={16} />
                        <span>Credentials</span>
                      </div>
                      <p className="trainer-certs">{trainer.certs}</p>
                      <div className="trainer-socials-box">
                        <a href={trainer.social?.instagram || '#'} className="overlay-social-btn" aria-label="Instagram">
                          <Instagram size={16} />
                        </a>
                        <a href={trainer.social?.facebook || '#'} className="overlay-social-btn" aria-label="Facebook">
                          <Facebook size={16} />
                        </a>
                        <a href={trainer.social?.twitter || '#'} className="overlay-social-btn" aria-label="Twitter">
                          <Twitter size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="trainer-info-box">
                  <h3>{trainer.name}</h3>
                  <p className="trainer-role">{trainer.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Trainers;
