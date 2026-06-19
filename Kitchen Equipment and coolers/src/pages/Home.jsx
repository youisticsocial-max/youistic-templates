import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Settings, Shield, Zap, Users, Truck, Wrench } from 'lucide-react';
import PageTransition from '../components/PageTransition';
import './Home.css';

const Home = () => {
  return (
    <PageTransition>
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.7), rgba(10, 10, 12, 0.8)), url("assets/hero-machine.jpg")' }}>
        <div className="container hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="hero-title">Engineering Machines That Power Progress</h1>
            <p className="hero-subtitle">
              Delivering innovative, reliable, and high-performance industrial equipment designed for modern businesses.
            </p>
            <div className="hero-actions">
              <Link to="/products" className="btn btn-primary">Explore Products <ArrowRight size={18} className="ml-2" /></Link>
              <Link to="/contact" className="btn btn-outline">Request Quotation</Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="section-padding bg-dark">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our <span className="text-primary">Machinery</span></h2>
            <p className="section-subtitle mx-auto">Discover our comprehensive range of high-performance industrial equipment built for precision and durability.</p>
          </div>

          <div className="grid grid-cols-3 category-grid">
            {[
              { title: 'Commercial Cooling Systems', desc: 'High-performance cooling solutions for industrial use.', img: 'assets/machine-1.jpg' },
              { title: 'Food Processing Equipment', desc: 'Efficient machines designed for hygiene and productivity.', img: 'assets/machine-2.jpg' },
              { title: 'Kitchen & Hotel Equipment', desc: 'Professional stainless steel equipment for commercial kitchens.', img: 'assets/machine-3.jpg' },
              { title: 'Industrial Machinery', desc: 'Advanced machines built for heavy-duty applications.', img: 'assets/factory.jpg' },
              { title: 'Custom Engineering Solutions', desc: 'Tailored machinery according to business requirements.', img: 'assets/engineer.jpg' },
            ].map((cat, idx) => (
              <motion.div 
                key={idx} 
                className="category-card metal-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="category-img-wrapper">
                  <img src={cat.img} alt={cat.title} className="category-img" />
                </div>
                <div className="category-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                  <Link to="/products" className="text-primary font-semibold flex items-center mt-4 hover:underline">
                    Learn More <ArrowRight size={16} className="ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.95), rgba(10, 10, 12, 0.95)), url("assets/manufacturing.jpg")', backgroundAttachment: 'fixed', backgroundSize: 'cover' }}>
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="section-title">Why Choose <span className="text-primary">{"{{CLINIC_NAME}}"}</span></h2>
            <p className="section-subtitle mx-auto">We combine engineering precision with industrial strength to deliver unparalleled manufacturing solutions.</p>
          </div>

          <div className="grid grid-cols-3">
            {[
              { icon: <Settings size={32} />, title: 'Advanced Manufacturing', desc: 'Modern production technology for superior precision.' },
              { icon: <Shield size={32} />, title: 'Premium Materials', desc: 'Strong, durable, and high-grade stainless steel components.' },
              { icon: <Wrench size={32} />, title: 'Custom Solutions', desc: 'Machines designed specifically according to client needs.' },
              { icon: <Zap size={32} />, title: 'Quality Assurance', desc: 'Strict testing and inspection throughout the assembly process.' },
              { icon: <Users size={32} />, title: 'Technical Support', desc: 'Professional after-sales assistance and maintenance.' },
              { icon: <Truck size={32} />, title: 'Timely Delivery', desc: 'Reliable production scheduling and fast global dispatch.' }
            ].map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="feature-card glass-panel"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon text-primary mb-4">{feature.icon}</div>
                <h4 className="text-xl mb-2 font-heading tracking-wide uppercase">{feature.title}</h4>
                <p className="text-muted">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="section-padding bg-dark border-t border-subtle">
        <div className="container">
          <div className="grid grid-cols-4 text-center">
            {[
              { num: '10,000+', label: 'Machines Delivered' },
              { num: '25+', label: 'Years Experience' },
              { num: '500+', label: 'Business Clients' },
              { num: '50+', label: 'Expert Engineers' }
            ].map((stat, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <h3 className="stat-number text-primary">{stat.num}</h3>
                <p className="stat-label text-muted uppercase tracking-widest text-sm font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </PageTransition>
  );
};

export default Home;
