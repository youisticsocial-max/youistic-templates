import React from 'react';
import { motion } from 'framer-motion';
import { Utensils, Factory, Warehouse, ShoppingCart, Store, Building2, HeartPulse, HardHat } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const industries = [
  { name: 'Restaurants & Hotels', icon: <Utensils size={40} />, img: 'assets/machine-3.jpg', desc: 'Commercial kitchen equipment for high-volume hospitality operations.' },
  { name: 'Factories', icon: <Factory size={40} />, img: 'assets/factory.jpg', desc: 'Heavy-duty machinery for large-scale manufacturing processes.' },
  { name: 'Warehouses', icon: <Warehouse size={40} />, img: 'assets/machine-1.jpg', desc: 'Cooling systems and storage solutions for industrial warehousing.' },
  { name: 'Food Industry', icon: <ShoppingCart size={40} />, img: 'assets/machine-2.jpg', desc: 'Processing equipment ensuring hygiene and mass production efficiency.' },
  { name: 'Retail Businesses', icon: <Store size={40} />, img: 'assets/machine-1.jpg', desc: 'Display coolers and equipment for modern retail environments.' },
  { name: 'Commercial Buildings', icon: <Building2 size={40} />, img: 'assets/hero-machine.jpg', desc: 'HVAC and custom engineering solutions for large facilities.' },
  { name: 'Healthcare', icon: <HeartPulse size={40} />, img: 'assets/product-detail.jpg', desc: 'Precision temperature control systems for medical storage.' },
  { name: 'Manufacturing Units', icon: <HardHat size={40} />, img: 'assets/engineer.jpg', desc: 'Custom assembly line components and industrial automation.' }
];

const Industries = () => {
  return (
    <PageTransition>
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url("assets/factory.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '150px' }}>
        <div className="container text-center">
          <motion.h1 
            className="section-title text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Industries <span className="text-primary">Served</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Delivering tailored engineering solutions across diverse sectors globally.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          <div className="grid grid-cols-4 gap-6">
            {industries.map((ind, idx) => (
              <motion.div 
                key={idx}
                className="metal-card rounded-lg overflow-hidden group"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-all z-10"></div>
                  <img src={ind.img} alt={ind.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                    <div className="text-primary mb-3 transform transition-transform group-hover:-translate-y-2">{ind.icon}</div>
                    <h3 className="text-xl font-heading uppercase text-center px-4 tracking-wide">{ind.name}</h3>
                  </div>
                </div>
                <div className="p-5 text-center bg-card">
                  <p className="text-muted text-sm">{ind.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default Industries;
