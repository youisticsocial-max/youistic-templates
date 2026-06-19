import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import './Programs.css';

const Programs = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  
  useEffect(() => {
    setPrograms(dataStore.getPrograms());
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'Strength', 'Conditioning', 'Coaching', 'Cardio', 'Wellness', 'Group', 'Combat'];

  const filteredPrograms = selectedFilter === 'All' 
    ? programs 
    : programs.filter(p => p.category === selectedFilter || p.category?.toLowerCase() === selectedFilter.toLowerCase());

  return (
    <div className="programs-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/crossfit-training.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Training Packages</span>
          <h1>Our <span>Programs</span></h1>
          <p>Whether you want to build raw physical power, shed body fat, or master combat skills, we have a scientifically-backed plan for you.</p>
        </div>
      </section>

      {/* Filter Tabs & Catalog */}
      <section className="section programs-catalog">
        <div className="glowing-bg" style={{ top: '30%', left: '10%' }}></div>
        <div className="container">
          {/* Category Tabs */}
          <div className="filter-tabs-box">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-tab-btn ${selectedFilter === cat ? 'active' : ''}`}
                onClick={() => setSelectedFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Programs Grid */}
          <motion.div layout className="grid grid-3 catalog-grid">
            <AnimatePresence mode="popLayout">
              {filteredPrograms.map((prog, idx) => (
                <motion.div
                  key={prog.id || idx}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="program-catalog-card glass-card"
                >
                  <div className="catalog-card-image">
                    <img src={prog.img} alt={prog.title} className="catalog-img" />
                    <div className="catalog-img-overlay"></div>
                    <span className="category-tag">{prog.category}</span>
                  </div>
                  
                  <div className="catalog-card-content">
                    <h3>{prog.title}</h3>
                    <p>{prog.desc}</p>
                    
                    <div className="catalog-perks">
                      <div className="perk-bullet">
                        <Sparkles size={14} className="perk-icon" />
                        <span>Certified Coaching Included</span>
                      </div>
                      <div className="perk-bullet">
                        <Sparkles size={14} className="perk-icon" />
                        <span>Biometric Assessment Log</span>
                      </div>
                    </div>

                    <a href={`https://wa.me/{{PHONE}}?text=Hi, I want to inquire about the ${prog.title} program.`} target="_blank" rel="noopener noreferrer" className="btn btn-accent-outline card-cta-btn">
                      Inquire Program <ArrowRight size={14} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {filteredPrograms.length === 0 && (
            <div className="no-programs-box">
              <p>No programs found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Programs;
