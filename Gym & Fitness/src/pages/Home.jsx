import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { Shield, Sparkles, Flame, Users, Calendar, Award, Heart, CheckCircle, ArrowRight } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import './Home.css';

// Simple counter sub-component for statistics
const CounterItem = ({ target, duration = 2, label }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    // Extract number from target e.g. "5000" from "5000+"
    const num = parseInt(target.replace(/[^0-9]/g, ''), 10);
    const suffix = target.replace(/[0-9]/g, '');
    
    if (isNaN(num)) {
      setCount(target);
      return;
    }

    const increment = Math.ceil(num / (duration * 60)); // 60 FPS
    let timer = setInterval(() => {
      start += increment;
      if (start >= num) {
        clearInterval(timer);
        setCount(num + suffix);
      } else {
        setCount(start + suffix);
      }
    }, 1000 / 60);

    return () => clearInterval(timer);
  }, [target, duration]);

  return (
    <div className="stat-card">
      <h3 className="stat-value">{count}</h3>
      <p className="stat-label">{label}</p>
    </div>
  );
};

const Home = () => {
  const [content, setContent] = useState(dataStore.getContent());
  const [programs, setPrograms] = useState(dataStore.getPrograms().slice(0, 4)); // Show first 4
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8 } });
    
    // Refresh content on load (in case admin modified it)
    setContent(dataStore.getContent());
    setPrograms(dataStore.getPrograms().slice(0, 4));
  }, [controls]);

  const whyChooseUs = [
    { icon: <Award size={32} />, title: "Certified Master Coaches", desc: "Coaches with international credentials and pro athletic experience." },
    { icon: <Sparkles size={32} />, title: "Premium Imported Gear", desc: "Biometrically optimized strength machines and high-end free weight zones." },
    { icon: <CheckCircle size={32} />, title: "Personalized Protocols", desc: "Workouts, calories, and recovery steps mapped to your exact biological metrics." },
    { icon: <Flame size={32} />, title: "High-Energy Atmosphere", desc: "Premium lighting, acoustic designs, and a motivating community focus." },
    { icon: <Shield size={32} />, title: "Clean & Hygienic Space", desc: "Medical-grade air filtration and hourly sanitized workout zones." },
    { icon: <Users size={32} />, title: "Strong Community Values", desc: "A supportive space where amateurs and elite lifters support each other." },
    { icon: <Calendar size={32} />, title: "Flexible Class Hours", desc: "Early morning to late night slots that fit busy executive calendars." },
    { icon: <Heart size={32} />, title: "Cardio & Recovery Access", desc: "Saunas, dynamic recovery equipment, and high-performance cardio lines." }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-hero">
        <div className="glowing-bg" style={{ top: '-10%', right: '10%' }}></div>
        <div className="container hero-inner-split">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text-side"
          >
            <span className="badge-neon">Elite Athletic Standard</span>
            <h1 className="hero-heading">
              {content.heroHeadline.split('.').map((part, idx) => {
                if (!part.trim()) return null;
                return (
                  <span key={idx} className={idx === 1 ? "highlight" : ""}>
                    {part.trim()}.{idx === 0 && <br />}
                  </span>
                );
              })}
            </h1>
            <p className="hero-description">{content.heroSubheading}</p>
            
            <div className="hero-cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Start Your Journey
              </Link>
              <Link to="/membership" className="btn btn-outline">
                Membership Plans
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-image-side"
          >
            <div className="hero-collage">
              <div className="collage-item large-img">
                <img src="/assets/hero-gym.jpg" alt="Strength Training" />
                <div className="collage-overlay"><span>Strength Zone</span></div>
              </div>
              <div className="collage-item small-img-1">
                <img src="/assets/crossfit-training.jpg" alt="CrossFit" />
                <div className="collage-overlay"><span>CrossFit</span></div>
              </div>
              <div className="collage-item small-img-2">
                <img src="/assets/yoga-class.jpg" alt="Yoga & Wellness" />
                <div className="collage-overlay"><span>Wellness</span></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="stats-section">
        <div className="container grid grid-4 stats-grid">
          <CounterItem target="5000+" label="Transformations" />
          <CounterItem target="50+" label="Pro Coaches" />
          <CounterItem target="100+" label="Weekly Classes" />
          <CounterItem target="24/7" label="Support Hours" />
        </div>
      </section>

      {/* Programs Preview Section */}
      <section className="section home-programs">
        <div className="glowing-bg" style={{ top: '10%', left: '5%' }}></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">High-Performance <span>Programs</span></h2>
            <p className="section-subtitle">Select a training framework designed around your body, capability level, and personal goals.</p>
          </div>

          <div className="grid grid-4 programs-preview-grid">
            {programs.map((prog, idx) => (
              <motion.div 
                key={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                className="program-preview-card"
              >
                <div className="prog-img-box">
                  <img src={prog.img} alt={prog.title} className="prog-img" />
                  <div className="prog-overlay"></div>
                </div>
                <div className="prog-card-body">
                  <span className="prog-badge">{prog.category}</span>
                  <h3>{prog.title}</h3>
                  <p>{prog.desc}</p>
                  <Link to="/programs" className="prog-card-link">
                    Learn More <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="view-all-box">
            <Link to="/programs" className="btn btn-accent-outline">
              View All Training Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="section why-choose-section">
        <div className="glowing-bg" style={{ bottom: '10%', right: '5%' }}></div>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Built For <span>Discipline</span></h2>
            <p className="section-subtitle">We don't offer standard workouts. We build lifestyle transformations supported by elite equipment and science.</p>
          </div>

          <div className="grid grid-4 choose-grid">
            {whyChooseUs.map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05, duration: 0.5 }}
                className="choose-card glass-card"
              >
                <div className="choose-icon-box">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Testimonial Slider / Video Transformation Section */}
      <section className="section home-cta-banner">
        <div className="container banner-inner">
          <span className="badge-neon">No Excuses</span>
          <h2>Ready to write your transformation story?</h2>
          <p>Join {"{{CLINIC_NAME}}"} today and unlock premium training facilities, certified master coaches, and metric-based workout regimes.</p>
          <div className="banner-cta-group">
            <Link to="/contact" className="btn btn-primary">Claim Free Trial Pass</Link>
            <a href="tel:{{PHONE}}" className="btn btn-outline">Call {"{{PHONE}}"}</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
