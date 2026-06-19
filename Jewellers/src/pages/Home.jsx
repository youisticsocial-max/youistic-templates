import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Heart, Truck, Star, Gem, Award, Shield, Gift } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  // Mock categories
  const categories = [
    { name: 'Bridal', image: 'assets/category_bridal.png' },
    { name: 'Necklaces', image: 'assets/category_necklaces.png' },
    { name: 'Earrings', image: 'assets/category_earrings.png' },
    { name: 'Bangles', image: 'assets/category_bangles.png' },
  ];

  // Best Sellers
  const bestSellers = products.filter(p => p.isBestSeller);

  // Animations
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-background">
          <img 
            src="assets/hero_jewelry.png" 
            alt="Jewelry Hero" 
            className="hero-image"
            onError={(e) => { e.target.src = 'assets/hero_jewelry.png'; }}
          />
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hero-text-content"
          >
            <h1 className="hero-title">Timeless Indian Elegance.<br/>Crafted For Generations.</h1>
            <p className="hero-subtitle">
              Discover premium heritage jewelry that blends majestic design, divine purity, and timeless elegance.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">Shop Collection</Link>
              <Link to="/about" className="btn btn-outline btn-white">Explore Legacy</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section container">
        <div className="section-header text-center">
          <h2>Shop by Category</h2>
          <p className="subtitle">Curated collections for your special moments</p>
        </div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid-4 categories-grid"
        >
          {categories.map((cat, index) => (
            <motion.div variants={fadeInUp} key={index} className="category-card">
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="category-image img-cover" 
                onError={(e) => { e.target.src = cat.image; }}
              />
              <div className="category-overlay">
                <h3>{cat.name}</h3>
                <Link to={`/shop?category=${cat.name.toLowerCase()}`} className="btn-link">
                  Explore <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Brand Promise Section */}
      <section className="promise-section section">
        <div className="container">
          <div className="section-header text-center">
            <h2>The <span>{'{{CLINIC_NAME}}'.includes('CLINIC_NAME') ? 'Luxe Jewels' : '{{CLINIC_NAME}}'}</span> Promise</h2>
            <p className="subtitle">Why our patrons trust us</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid-4 promise-grid"
          >
            <motion.div variants={fadeInUp} className="promise-card">
              <div className="promise-icon"><Award size={32} /></div>
              <h4>Hallmarked Purity</h4>
              <p>Ethically sourced 22k gold and certified natural gemstones.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="promise-card">
              <div className="promise-icon"><Gem size={32} /></div>
              <h4>Master Craftsmanship</h4>
              <p>Designed by heritage artisans spanning generations of tradition.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="promise-card">
              <div className="promise-icon"><Shield size={32} /></div>
              <h4>Heirloom Quality</h4>
              <p>Built to endure as timeless treasures for your family.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="promise-card">
              <div className="promise-icon"><Gift size={32} /></div>
              <h4>Insured Delivery</h4>
              <p>Complimentary secure, insured shipping on all domestic orders.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section container">
        <div className="section-header">
          <h2>Trending Designs</h2>
          <Link to="/shop" className="view-all-link">View All Jewels <ArrowRight size={16}/></Link>
        </div>
        
        <div className="grid-4">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Customer Experience Banner */}
      <section className="experience-banner">
        <div className="experience-background">
          <img src="https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920" alt="Lifestyle" className="img-cover" onError={(e) => { e.target.src = 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=1920'; }}/>
          <div className="hero-overlay"></div>
        </div>
        <div className="container experience-content text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Cherished by generations worldwide.</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Brides</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Unique Designs</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Cities Served</span>
              </div>
              <div className="stat-item">
                <span className="stat-number flex-center">4.9 <Star size={24} fill="currentColor" /></span>
                <span className="stat-label">Customer Rating</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
