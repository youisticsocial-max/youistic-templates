import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, X } from 'lucide-react';
import PageTransition from '../components/PageTransition';

const galleryItems = [
  { id: 1, category: 'Products', img: 'assets/machine-1.jpg', title: 'Industrial Chiller' },
  { id: 2, category: 'Factory', img: 'assets/factory.jpg', title: 'Assembly Floor' },
  { id: 3, category: 'Installation', img: 'assets/engineer.jpg', title: 'On-site Installation' },
  { id: 4, category: 'Products', img: 'assets/machine-2.jpg', title: 'Food Processor' },
  { id: 5, category: 'Production Process', img: 'assets/manufacturing.jpg', title: 'CNC Machining' },
  { id: 6, category: 'Products', img: 'assets/machine-3.jpg', title: 'Commercial Range' },
  { id: 7, category: 'Factory', img: 'assets/hero-machine.jpg', title: 'Automated Line' },
  { id: 8, category: 'Production Process', img: 'assets/quality-testing.jpg', title: 'Quality Control' }
];

const categories = ['All', 'Products', 'Factory', 'Installation', 'Production Process'];

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const filteredItems = activeCategory === 'All' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <PageTransition>
      <section className="bg-dark section-padding" style={{ backgroundImage: 'linear-gradient(rgba(10, 10, 12, 0.8), rgba(10, 10, 12, 0.9)), url("assets/machine-2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', paddingTop: '150px', paddingBottom: '80px' }}>
        <div className="container text-center">
          <motion.h1 
            className="section-title text-5xl mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Industrial <span className="text-primary">Gallery</span>
          </motion.h1>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Visual showcase of our products, factory, and installations.
          </motion.p>
        </div>
      </section>

      <section className="section-padding min-h-screen">
        <div className="container">
          
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 text-sm font-semibold uppercase tracking-wide rounded-full border transition-all ${activeCategory === cat ? 'bg-primary border-primary text-white' : 'border-subtle text-muted hover:border-primary hover:text-primary'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Masonry-style Grid */}
          <motion.div layout className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <AnimatePresence>
              {filteredItems.map((item, idx) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className={`relative overflow-hidden rounded-lg group cursor-pointer ${idx % 3 === 0 ? 'row-span-2' : 'row-span-1'} ${idx % 5 === 0 ? 'col-span-2' : 'col-span-1'}`}
                  style={{ minHeight: '250px' }}
                  onClick={() => setSelectedImage(item)}
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center">
                    <ZoomIn size={36} className="text-primary mb-3 transform scale-50 group-hover:scale-100 transition-transform duration-300 delay-100" />
                    <h4 className="text-white font-heading uppercase text-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-100">{item.title}</h4>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button 
              className="absolute top-8 right-8 text-white hover:text-primary transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X size={36} />
            </button>
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-5xl max-h-[80vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selectedImage.img} alt={selectedImage.title} className="w-full h-full object-contain" />
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-4 text-center">
                <h3 className="text-white font-heading text-xl uppercase">{selectedImage.title}</h3>
                <p className="text-primary text-sm">{selectedImage.category}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </PageTransition>
  );
};

export default Gallery;
