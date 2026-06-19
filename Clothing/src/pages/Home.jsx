import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, ShieldCheck, Heart, Truck, Star } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import './Home.css';

const Home = () => {
  // Mock categories
  const categories = [
    { name: 'Men', image: 'assets/category-men.jpg' },
    { name: 'Women', image: 'assets/category-women.jpg' },
    { name: 'New Arrivals', image: 'assets/category-new.jpg' },
    { name: 'Essentials', image: 'assets/category-essentials.jpg' },
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
            src="assets/hero-fashion.jpg" 
            alt="Fashion Hero" 
            className="hero-image"
            onError={(e) => { e.target.src = 'https://placehold.co/1920x1080/1a1a1a/ffffff?text=Hero+Fashion+Image'; }}
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
            <h1 className="hero-title">Designed For Comfort.<br/>Crafted For Everyday Style.</h1>
            <p className="hero-subtitle">
              Discover premium quality clothing that blends modern design, comfort, and timeless elegance.
            </p>
            <div className="hero-actions">
              <Link to="/shop" className="btn btn-primary">Shop Collection</Link>
              <Link to="/about" className="btn btn-outline btn-white">Explore Story</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="section container">
        <div className="section-header text-center">
          <h2>Shop by Category</h2>
          <p className="subtitle">Curated collections for your lifestyle</p>
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
                onError={(e) => { e.target.src = `https://placehold.co/600x800/eeeeee/666666?text=${cat.name}`; }}
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
            <h2>The <span>{'{{CLINIC_NAME}}'.includes('CLINIC_NAME') ? 'Luxe Fashion' : '{{CLINIC_NAME}}'}</span> Promise</h2>
            <p className="subtitle">Why our community loves us</p>
          </div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid-4 promise-grid"
          >
            <motion.div variants={fadeInUp} className="promise-card">
              <div className="promise-icon"><Leaf size={32} /></div>
              <h4>Premium Fabric</h4>
              <p>Ethically sourced materials that feel incredible against your skin.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="promise-card">
              <div className="promise-icon"><Heart size={32} /></div>
              <h4>Comfortable Fit</h4>
              <p>Designed to move with you throughout your busy day seamlessly.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="promise-card">
              <div className="promise-icon"><ShieldCheck size={32} /></div>
              <h4>Long Lasting</h4>
              <p>Built to endure with reinforced stitching and timeless designs.</p>
            </motion.div>
            <motion.div variants={fadeInUp} className="promise-card">
              <div className="promise-icon"><Truck size={32} /></div>
              <h4>Free Shipping</h4>
              <p>Complimentary carbon-neutral shipping on all orders above $100.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Best Sellers */}
      <section className="section container">
        <div className="section-header">
          <h2>Trending Now</h2>
          <Link to="/shop" className="view-all-link">View All Products <ArrowRight size={16}/></Link>
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
          <img src="assets/lookbook-1.jpg" alt="Lifestyle" className="img-cover" onError={(e) => { e.target.src = 'https://placehold.co/1920x600/333333/ffffff?text=Lifestyle'; }}/>
          <div className="hero-overlay"></div>
        </div>
        <div className="container experience-content text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Loved by thousands worldwide.</h2>
            <div className="stats-grid">
              <div className="stat-item">
                <span className="stat-number">10K+</span>
                <span className="stat-label">Happy Customers</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Premium Products</span>
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
