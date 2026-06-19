import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Heart, Eye, Award } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import './About.css';

const About = () => {
  const [content, setContent] = useState(dataStore.getContent());

  useEffect(() => {
    setContent(dataStore.getContent());
    window.scrollTo(0, 0);
  }, []);

  const values = [
    { icon: <Target size={30} />, title: "Discipline", desc: "Consistency beats intensity. We build habit loops that support lifelong performance improvements." },
    { icon: <ShieldCheck size={30} />, title: "Scientific Rigor", desc: "No fad routines. Every workout plan, dietary guide, and recovery sequence is rooted in exercise science." },
    { icon: <Heart size={30} />, title: "Inclusion", desc: "Whether you are a competitive athlete or stepping into a gym for the first time, you are treated with equal respect." }
  ];

  const timeline = [
    { year: "2018", title: "The Genesis", desc: "Founded with a single strength room and a vision to replace standard corporate gyms with elite coaching environments." },
    { year: "2020", title: "Luxury Pivot", desc: "Overhauled the facilities to introduce premium imported biometric gear and strict hygienic air filtration." },
    { year: "2023", title: "Wellness Integration", desc: "Unveiled our luxury recovery zones containing custom infrared saunas and cold plunge therapy tubs." },
    { year: "2026", title: "Global Recognition", desc: "Named as a top-tier luxury performance studio, establishing our white-label model for premium operators." }
  ];

  return (
    <div className="about-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/gym-interior.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Our Story</span>
          <h1>About <span>{"{{CLINIC_NAME}}"}</span></h1>
          <p>We are not a neighborhood gym. We are an international standard performance collective.</p>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section philosophy-section">
        <div className="glowing-bg" style={{ top: '20%', right: '10%' }}></div>
        <div className="container grid grid-2 alignment-grid">
          <div className="phil-text">
            <span className="badge-neon">Fitness Philosophy</span>
            <h2 className="section-title text-left">Unlock Your <span>True Potential</span></h2>
            <p className="about-paragraph">{content.aboutStory}</p>
            
            <div className="mission-vision-box">
              <div className="mv-item">
                <div className="mv-icon-box"><Eye size={24} /></div>
                <div>
                  <h4>Our Vision</h4>
                  <p>{content.vision}</p>
                </div>
              </div>
              <div className="mv-item">
                <div className="mv-icon-box"><Target size={24} /></div>
                <div>
                  <h4>Our Mission</h4>
                  <p>{content.mission}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="phil-image-box">
            <img src="/assets/weight-training.jpg" alt="Philosophy Workout" className="phil-img" />
            <div className="image-accent-border"></div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section values-section">
        <div className="container">
          <div className="section-header">
            <span className="badge-neon">Our Foundation</span>
            <h2 className="section-title">Core <span>Values</span></h2>
            <p className="section-subtitle">What drives our training environment and shapes our community standards daily.</p>
          </div>
          <div className="grid grid-3 values-grid">
            {values.map((v, idx) => (
              <motion.div
                key={idx}
                className="value-card glass-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
              >
                <div className="value-icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section timeline-section">
        <div className="glowing-bg" style={{ bottom: '10%', left: '5%' }}></div>
        <div className="container">
          <div className="section-header">
            <span className="badge-neon">The Evolution</span>
            <h2 className="section-title">Our <span>Journey</span></h2>
            <p className="section-subtitle">A timeline of milestones that defined {"{{CLINIC_NAME}}"} as a premier performance hub.</p>
          </div>

          <div className="timeline-wrapper">
            <div className="timeline-line"></div>
            {timeline.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div
                  key={idx}
                  className={`timeline-item ${isEven ? 'left' : 'right'}`}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="timeline-node">
                    <Award size={16} />
                  </div>
                  <div className="timeline-card glass-card">
                    <div className="timeline-year">{item.year}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
