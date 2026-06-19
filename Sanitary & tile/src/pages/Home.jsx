import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Phone, MessageCircle, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

export default function Home() {
  const stats = [
    { number: '1000+', label: 'Designs' },
    { number: '50+', label: 'Surface Styles' },
    { number: '100+', label: 'Dealer Network' },
    { number: '20+', label: 'Years Experience' }
  ];

  const collections = [
    { name: 'Matt Collection', desc: 'Natural soft textures for modern spaces.', img: '/assets/collection-matt.jpg' },
    { name: 'Glossy Collection', desc: 'High-reflection luxury surfaces.', img: '/assets/collection-glossy.jpg' },
    { name: 'Carving Collection', desc: 'Deep textured premium finishes.', img: '/assets/tile-texture.jpg' },
    { name: 'Marble Collection', desc: 'Natural stone-inspired elegance.', img: '/assets/luxury-bathroom.jpg' },
    { name: 'Wooden Collection', desc: 'Warm and timeless wood aesthetics.', img: '/assets/living-room-tile.jpg' },
    { name: 'Outdoor Collection', desc: 'Weather-resistant architectural surfaces.', img: '/assets/hero-architecture.jpg' }
  ];

  const spaces = [
    { title: 'Living Room', desc: 'Elegant flooring and statement walls.', img: '/assets/living-room-tile.jpg' },
    { title: 'Bathroom', desc: 'Luxury waterproof surfaces.', img: '/assets/luxury-bathroom.jpg' },
    { title: 'Commercial', desc: 'Hotels, malls, offices, showrooms.', img: '/assets/showroom.jpg' }
  ];

  return (
    <div className="home">
      {/* Floating Action Buttons */}
      <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <a href="tel:{{PHONE}}" className="fab" style={{ background: 'var(--primary-color)', color: 'white', padding: '1rem', borderRadius: '50%', display: 'flex', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
          <Phone size={24} />
        </a>
        <a href="https://wa.me/{{PHONE}}" className="fab" style={{ background: '#25D366', color: 'white', padding: '1rem', borderRadius: '50%', display: 'flex', boxShadow: '0 10px 20px rgba(0,0,0,0.2)' }}>
          <MessageCircle size={24} />
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero" style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: -1 }}>
          <img src="/assets/hero-architecture.jpg" alt="Luxury Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 100%)' }}></div>
        </div>
        
        <div className="container" style={{ color: 'white', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} style={{ maxWidth: '800px' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '0.9rem', marginBottom: '1rem', display: 'block', color: 'var(--primary-color)' }}>
              Premium Surfaces
            </span>
            <h1 style={{ color: 'white', marginBottom: '1.5rem', fontWeight: 300, lineHeight: 1.1 }}>
              Crafting Surfaces That Define Spaces
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#e0e0e0', marginBottom: '3rem', maxWidth: '600px', fontWeight: 300 }}>
              Discover exceptional tile collections, elegant bath solutions, and premium surfaces designed for modern architecture.
            </p>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ padding: '1.2rem 2.5rem' }}>
                Explore Collections <ArrowRight size={20} />
              </button>
              <button className="btn" style={{ padding: '1.2rem 2.5rem', border: '1px solid white', color: 'white', background: 'transparent' }}>
                Download Catalog
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', textAlign: 'center' }}>
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <div style={{ fontSize: '3.5rem', fontWeight: 200, color: 'var(--primary-color)', marginBottom: '0.5rem' }}>{stat.number}</div>
                <div style={{ textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem', color: '#a0a0a0' }}>{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Collections Slider */}
      <section className="section" style={{ background: '#fcfcfc', overflow: 'hidden' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem' }}>
            <div>
              <span style={{ color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Our Products</span>
              <h2 style={{ marginTop: '0.5rem' }}>Surface Collections</h2>
            </div>
            <a href="/collections/tiles" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textTransform: 'uppercase', fontSize: '0.9rem', letterSpacing: '0.05em', fontWeight: 500 }}>
              View All <ArrowRight size={16} />
            </a>
          </div>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 }
            }}
            navigation
            autoplay={{ delay: 5000 }}
            style={{ paddingBottom: '3rem' }}
          >
            {collections.map((col, index) => (
              <SwiperSlide key={index}>
                <div className="product-card" style={{ height: '450px' }}>
                  <img src={col.img} alt={col.name} />
                  <div className="product-overlay">
                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{col.name}</h3>
                    <p style={{ color: '#e0e0e0', fontSize: '0.9rem', marginBottom: '1.5rem' }}>{col.desc}</p>
                    <button className="btn" style={{ padding: '0.5rem 0', borderBottom: '1px solid white', background: 'none', color: 'white' }}>
                      Explore <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Tiles By Space */}
      <section className="section section-dark">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '5rem', maxWidth: '600px', margin: '0 auto 5rem auto' }}>
            <span style={{ color: 'var(--primary-color)', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.9rem' }}>Applications</span>
            <h2 style={{ marginTop: '0.5rem' }}>Tiles By Space</h2>
            <p style={{ color: '#a0a0a0', marginTop: '1rem' }}>Immersive application experiences tailored for every architectural need.</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {spaces.map((space, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                style={{ 
                  position: 'relative', 
                  height: '500px', 
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <img src={space.img} alt={space.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 10s ease' }} className="space-img" />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.8) 0%, transparent 100%)' }}></div>
                <div style={{ position: 'relative', zIndex: 1, padding: '4rem', maxWidth: '600px' }}>
                  <h3 style={{ fontSize: '3rem', marginBottom: '1rem' }}>{space.title}</h3>
                  <p style={{ fontSize: '1.2rem', color: '#e0e0e0', marginBottom: '2rem' }}>{space.desc}</p>
                  <button className="btn btn-outline" style={{ color: 'white', borderColor: 'white' }}>
                    View Gallery <ChevronRight size={16} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <style>{`
        .space-img:hover { transform: scale(1.05) !important; }
        .swiper-button-next, .swiper-button-prev { color: var(--text-primary) !important; }
        .swiper-pagination-bullet-active { background: var(--primary-color) !important; }
      `}</style>
    </div>
  );
}