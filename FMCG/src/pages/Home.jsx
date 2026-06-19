import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { ShieldCheck, Package, Leaf, Award, Truck, ArrowRight, ChevronRight } from 'lucide-react';
import './Home.css';

const Home = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } });
  }, [controls]);

  const categories = [
    { title: "Indian Spices", desc: "Authentic flavors, rich aroma, and carefully selected ingredients.", img: "/assets/spices.jpg" },
    { title: "Dry Fruits & Nuts", desc: "Premium quality almonds, cashews, raisins, pistachios.", img: "/assets/dry-fruits.jpg" },
    { title: "Pulses & Grains", desc: "Freshly sourced staples for everyday nutrition.", img: "/assets/pulses.jpg" },
    { title: "Rice & Flour", desc: "Traditional and premium varieties for every kitchen.", img: "/assets/flour.jpg" },
    { title: "Tea & Coffee", desc: "Refreshing blends crafted for every moment.", img: "/assets/tea-coffee.jpg" },
    { title: "Oils & Ghee", desc: "Pure and hygienic cooking essentials.", img: "/assets/oil-ghee.jpg" },
    { title: "Snacks & Ready-to-Eat", desc: "Delicious products for modern lifestyles.", img: "/assets/snacks.jpg" },
    { title: "Organic & Health Products", desc: "Natural products for healthier living.", img: "/assets/organic-products.jpg" },
  ];

  const features = [
    { icon: <ShieldCheck size={32} />, title: "100% Quality Tested", desc: "Maintaining strict quality standards." },
    { icon: <Package size={32} />, title: "Hygienic Packaging", desc: "Modern packaging for freshness and safety." },
    { icon: <Leaf size={32} />, title: "Premium Ingredients", desc: "Carefully sourced raw materials." },
    { icon: <Award size={32} />, title: "Authentic Taste", desc: "Preserving traditional Indian flavors." },
    { icon: <Truck size={32} />, title: "Nationwide Distribution", desc: "Reliable supply chain and delivery." },
  ];

  const stats = [
    { value: "500+", label: "Products" },
    { value: "10k+", label: "Happy Customers" },
    { value: "100+", label: "Distribution Partners" },
    { value: "25+", label: "Years of Excellence" },
  ];

  return (
    <div className="home-wrapper">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-bg" style={{ backgroundImage: "url('/assets/hero-fmcg.jpg')" }}>
          <div className="hero-overlay"></div>
          {/* Subtle particle effect abstraction via CSS/Images */}
        </div>
        <div className="container hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={controls}
            className="hero-text-box"
          >
            <span className="badge">Premium Quality</span>
            <h1 className="hero-title">Pure Ingredients. Authentic Taste. Trusted Quality.</h1>
            <p className="hero-subtitle">
              Delivering premium daily essentials crafted with purity, freshness, and a commitment to healthy living.
            </p>
            <div className="hero-cta">
              <Link to="/categories" className="btn btn-primary">Explore Products</Link>
              <a href="#" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Download Catalogue</a>
            </div>
            <div className="hero-floating-contact">
              <a href={`https://wa.me/{{PHONE}}`} className="whatsapp-btn">WhatsApp Us</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Explore Our Range</h2>
            <p className="section-subtitle mx-auto">Discover the finest selection of premium products crafted for your daily needs.</p>
          </div>
          <div className="grid grid-cols-4 categories-grid">
            {categories.map((cat, idx) => (
              <motion.div 
                key={idx}
                className="category-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="category-img-box">
                  <img src={cat.img} alt={cat.title} className="category-img" />
                  <div className="category-overlay"></div>
                </div>
                <div className="category-info">
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                  <Link to="/categories" className="category-link">Explore <ArrowRight size={16} /></Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section features-section">
        <div className="container">
          <div className="features-layout">
            <div className="features-text">
              <h2 className="section-title">Why Choose {"{{CLINIC_NAME}}"}?</h2>
              <p className="section-subtitle">We bring the best of nature to your kitchen, ensuring every product meets global quality standards.</p>
              
              <div className="features-list">
                {features.map((feat, idx) => (
                  <motion.div 
                    key={idx}
                    className="feature-item"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="feature-icon">{feat.icon}</div>
                    <div className="feature-content">
                      <h4>{feat.title}</h4>
                      <p>{feat.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="features-image">
              <img src="/assets/factory.jpg" alt="Manufacturing Facility" className="rounded-image shadow-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section stats-section">
        <div className="container">
          <div className="grid grid-cols-4 text-center stats-grid">
            {stats.map((stat, idx) => (
              <div key={idx} className="stat-item">
                <h3 className="stat-value">{stat.value}</h3>
                <p className="stat-label">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section text-center">
        <div className="container">
          <h2>Partner With {"{{CLINIC_NAME}}"}</h2>
          <p>Join our growing network of distributors and bring premium quality to every household.</p>
          <div className="cta-actions">
            <Link to="/contact" className="btn btn-white">Become a Distributor</Link>
            <a href="tel:{{PHONE}}" className="btn btn-outline" style={{ borderColor: 'white', color: 'white' }}>Call {"{{PHONE}}"}</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
