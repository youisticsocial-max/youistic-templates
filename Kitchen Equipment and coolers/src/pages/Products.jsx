import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition';

const products = [
  { id: 1, name: 'Industrial Water Chiller XL', category: 'Commercial Cooling Systems', img: 'assets/machine-1.jpg', specs: 'Capacity: 500L | Power: 5kW | Stainless Steel 304', desc: 'Heavy-duty water chiller designed for continuous industrial operation.' },
  { id: 2, name: 'Automatic Dough Kneader', category: 'Food Processing Equipment', img: 'assets/machine-2.jpg', specs: 'Capacity: 50kg | Motor: 3HP | Variable Speed', desc: 'High-speed dough kneader for large scale bakery production.' },
  { id: 3, name: 'Commercial Gas Range', category: 'Kitchen & Hotel Equipment', img: 'assets/machine-3.jpg', specs: '4 Burners | Cast Iron Grates | BTU: 120,000', desc: 'Professional gas range built for high-volume commercial kitchens.' },
  { id: 4, name: 'Heavy Duty Packaging Machine', category: 'Industrial Machinery', img: 'assets/factory.jpg', specs: 'Speed: 60 units/min | PLC Controlled | Air: 6 Bar', desc: 'Automated packaging line component with high precision sealing.' },
  { id: 5, name: 'Custom Stainless Steel Worktable', category: 'Kitchen & Hotel Equipment', img: 'assets/machine-2.jpg', specs: 'Custom Dimensions | Grade 316 | Reinforced Bottom', desc: 'Heavy-duty preparation table for demanding environments.' },
  { id: 6, name: 'Blast Freezer Pro', category: 'Commercial Cooling Systems', img: 'assets/machine-1.jpg', specs: 'Temp: -40°C | Capacity: 10 Trays | Digital Panel', desc: 'Rapid freezing technology to preserve food quality and safety.' }
];

const categories = ['All', 'Commercial Cooling Systems', 'Food Processing Equipment', 'Kitchen & Hotel Equipment', 'Industrial Machinery'];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(p => {
    const matchesCat = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <PageTransition>
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url("assets/product-detail.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '150px', paddingBottom: '80px' }}>
        <div className="container text-center">
          <motion.h1 
            className="section-title text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Industrial <span className="text-primary">Catalog</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Explore our comprehensive range of high-performance machinery.
          </motion.p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container">
          
          {/* Filters & Search */}
          <div className="glass-panel p-6 mb-12 rounded-lg flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 text-sm font-semibold uppercase tracking-wide rounded border ${activeCategory === cat ? 'bg-primary border-primary text-white' : 'border-subtle text-muted hover:border-primary hover:text-primary transition-all'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
            
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search machinery..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border border-subtle text-main px-4 py-2 pl-10 rounded focus:border-primary focus:outline-none w-64"
              />
              <Search className="absolute left-3 top-2.5 text-muted" size={18} />
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-3 gap-8">
            {filteredProducts.map((product, idx) => (
              <motion.div 
                key={product.id}
                className="metal-card rounded-lg overflow-hidden flex flex-col h-full"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="h-64 overflow-hidden relative">
                  <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 uppercase rounded z-10">
                    {product.category}
                  </div>
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" />
                </div>
                
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="text-xl font-heading uppercase mb-2">{product.name}</h3>
                  <p className="text-sm text-primary font-mono mb-4 pb-4 border-b border-subtle">{product.specs}</p>
                  <p className="text-muted text-sm mb-6 flex-grow">{product.desc}</p>
                  
                  <div className="flex gap-3 mt-auto">
                    <button className="btn btn-outline flex-1 text-xs py-2 px-2 whitespace-nowrap">
                      <Download size={14} className="mr-2" /> Brochure
                    </button>
                    <Link to="/contact" className="btn btn-primary flex-1 text-xs py-2 px-2 whitespace-nowrap">
                      <Mail size={14} className="mr-2" /> Inquire
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <h3 className="text-2xl text-muted font-heading uppercase">No products found</h3>
              <p className="text-muted mt-2">Try adjusting your search or category filter.</p>
            </div>
          )}

        </div>
      </section>
    </PageTransition>
  );
};

export default Products;
