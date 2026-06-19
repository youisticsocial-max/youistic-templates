import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, ChevronLeft, ChevronRight } from 'lucide-react';
import './Gallery.css';

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const galleryItems = [
    { src: '/assets/gym-interior.jpg', category: 'Interior', title: 'Luxury Dumbbell Line' },
    { src: '/assets/fitness-equipment.jpg', category: 'Equipment', title: 'Biometric Leg Press' },
    { src: '/assets/weight-training.jpg', category: 'Training', title: 'Heavy Barbell Deadlift' },
    { src: '/assets/crossfit-training.jpg', category: 'Training', title: 'Olympic Snatch Focus' },
    { src: '/assets/personal-trainer.jpg', category: 'Sessions', title: '1-on-1 Posture Adjustment' },
    { src: '/assets/group-fitness.jpg', category: 'Events', title: 'Zumba Masterclass 2026' },
    { src: '/assets/mma-training.jpg', category: 'Training', title: 'Bag Strike Drills' },
    { src: '/assets/cardio-zone.jpg', category: 'Equipment', title: 'High-Performance Treadmills' },
    { src: '/assets/yoga-class.jpg', category: 'Sessions', title: 'Mobility Recovery Flow' }
  ];

  const categories = ['All', 'Interior', 'Equipment', 'Training', 'Sessions', 'Events'];

  const filteredItems = activeCategory === 'All'
    ? galleryItems
    : galleryItems.filter(item => item.category === activeCategory);

  const openLightbox = (imgSrc) => {
    const idx = galleryItems.findIndex(item => item.src === imgSrc);
    setLightboxIndex(idx);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === 0 ? galleryItems.length - 1 : prev - 1));
  };

  const showNext = (e) => {
    e.stopPropagation();
    setLightboxIndex((prev) => (prev === galleryItems.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/gym-interior.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Media Portfolio</span>
          <h1>Club <span>Gallery</span></h1>
          <p>Explore our premium performance rooms, imported strength gear, and high-energy group spaces.</p>
        </div>
      </section>

      {/* Gallery Catalog */}
      <section className="section gallery-catalog-sec">
        <div className="glowing-bg" style={{ top: '35%', left: '5%' }}></div>
        <div className="container">
          {/* Category Filters */}
          <div className="gallery-filters-box">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`gallery-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry Grid */}
          <motion.div layout className="gallery-grid">
            <AnimatePresence mode="popLayout">
              {filteredItems.map((item, idx) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="gallery-grid-item"
                  onClick={() => openLightbox(item.src)}
                >
                  <img src={item.src} alt={item.title} className="gallery-item-img" />
                  <div className="gallery-item-hover">
                    <Maximize2 size={24} className="zoom-icon" />
                    <h4>{item.title}</h4>
                    <span>{item.category}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="lightbox-overlay"
            onClick={closeLightbox}
          >
            <button className="lightbox-close-btn" onClick={closeLightbox}>
              <X size={32} />
            </button>

            <button className="lightbox-nav-btn prev-btn" onClick={showPrev}>
              <ChevronLeft size={40} />
            </button>

            <div className="lightbox-content-box" onClick={(e) => e.stopPropagation()}>
              <motion.img 
                key={lightboxIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                src={galleryItems[lightboxIndex].src} 
                alt="Enlarged gallery view" 
                className="lightbox-main-img" 
              />
              <div className="lightbox-caption">
                <h3>{galleryItems[lightboxIndex].title}</h3>
                <span>{galleryItems[lightboxIndex].category}</span>
              </div>
            </div>

            <button className="lightbox-nav-btn next-btn" onClick={showNext}>
              <ChevronRight size={40} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Gallery;
