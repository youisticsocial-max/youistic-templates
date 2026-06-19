import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, Sparkles, TrendingUp, Calendar } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import ImageSlider from '../components/ImageSlider';
import './Transformations.css';

const Transformations = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    setStories(dataStore.getTransformations());
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="transformations-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/transformation.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Success Stories</span>
          <h1>Physical <span>Transformations</span></h1>
          <p>Real members. Real discipline. Experience the tangible results of biological tracking and expert training regimes.</p>
        </div>
      </section>

      {/* Main Stories Section */}
      <section className="section transformations-list-sec">
        <div className="glowing-bg" style={{ top: '25%', right: '10%' }}></div>
        <div className="container">
          <div className="section-header">
            <span className="badge-neon">Adaptation Tracker</span>
            <h2 className="section-title">Before <span>& After</span></h2>
            <p className="section-subtitle">Drag the vertical sliders horizontally to reveal the physical progression of our athletes.</p>
          </div>

          <div className="stories-list-wrapper">
            {stories.map((story, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <motion.div 
                  key={story.id || idx}
                  className={`story-row ${isEven ? 'even-row' : 'odd-row'}`}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Left: Drag Slider */}
                  <div className="story-slider-box">
                    <ImageSlider 
                      beforeImage={story.beforeImg} 
                      afterImage={story.afterImg} 
                    />
                  </div>

                  {/* Right: Narrative Details */}
                  <div className="story-info-box glass-card">
                    <Quote size={40} className="quote-icon" />
                    <span className="member-name">{story.name}</span>
                    <p className="member-narrative">"{story.story}"</p>
                    
                    <div className="story-meta-row">
                      <div className="meta-badge">
                        <Calendar size={14} className="meta-icon" />
                        <span>Timeline: {story.duration}</span>
                      </div>
                      <div className="meta-badge">
                        <TrendingUp size={14} className="meta-icon" />
                        <span>Metric Tracking Active</span>
                      </div>
                    </div>

                    <div className="transformation-stats-mini">
                      <div className="mini-stat">
                        <span className="val">Active</span>
                        <span className="lbl">Nutrition Plan</span>
                      </div>
                      <div className="mini-stat">
                        <span className="val">100%</span>
                        <span className="lbl">Consistency</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Motivational Video Block / Video Transformations */}
      <section className="section video-motivate-sec">
        <div className="glowing-bg" style={{ bottom: '15%', left: '5%' }}></div>
        <div className="container text-center">
          <span className="badge-neon">Video Journeys</span>
          <h2 className="section-title">Cinematic <span>Reviews</span></h2>
          <p className="section-subtitle mx-auto">Watch step-by-step video journals logging gym check-ins, macro prep, and physical shifts.</p>
          
          <div className="video-placeholder-frame glass-card">
            <div className="placeholder-content">
              <span className="pulse-play-btn">&#9654;</span>
              <h3>Watch Transformation Documentary</h3>
              <p>Following three members through a 90-day athletic conditioning camp at {"{{CLINIC_NAME}}"}.</p>
            </div>
            {/* Dark abstract backdrop image representing video */}
            <div className="video-bg-pic" style={{ backgroundImage: "url('/assets/gym-interior.jpg')" }}></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Transformations;
