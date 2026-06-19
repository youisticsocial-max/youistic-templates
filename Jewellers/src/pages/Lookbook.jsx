import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import './Lookbook.css';

const Lookbook = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const looks = [
    { id: 1, image: 'https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800', span: 'col-span-2 row-span-2' },
    { id: 2, image: 'https://images.pexels.com/photos/3310692/pexels-photo-3310692.jpeg?auto=compress&cs=tinysrgb&w=800', span: 'col-span-1 row-span-1' },
    { id: 3, image: 'https://images.pexels.com/photos/1444442/pexels-photo-1444442.jpeg?auto=compress&cs=tinysrgb&w=800', span: 'col-span-1 row-span-2' },
    { id: 4, image: 'https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg?auto=compress&cs=tinysrgb&w=800', span: 'col-span-1 row-span-1' },
    { id: 5, image: 'https://images.pexels.com/photos/177332/pexels-photo-177332.jpeg?auto=compress&cs=tinysrgb&w=1200', span: 'col-span-2 row-span-1' },
    { id: 6, image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800', span: 'col-span-1 row-span-1' },
  ];

  return (
    <div className="lookbook-page">
      <div className="section text-center" style={{paddingTop: '160px', paddingBottom: '40px'}}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Heritage Lookbook
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="subtitle mt-sm mx-auto"
            style={{ maxWidth: '600px' }}
          >
            Explore our latest editorial capturing the essence of majestic elegance and divine purity.
          </motion.p>
        </div>
      </div>

      <div className="container section pt-0">
        <div className="masonry-grid">
          {looks.map((look, index) => (
            <motion.div 
              key={look.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`masonry-item ${look.span}`}
              onClick={() => setSelectedImage(look.image)}
            >
              <div className="masonry-overlay">
                <span>View Detail</span>
              </div>
              <img 
                src={look.image} 
                alt={`Lookbook ${look.id}`} 
                className="img-cover"
                onError={(e) => { e.target.src = look.image; }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full Screen Image Viewer Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="image-modal"
            onClick={() => setSelectedImage(null)}
          >
            <button className="close-modal-btn" onClick={() => setSelectedImage(null)}>
              <X size={32} />
            </button>
            <motion.img 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage} 
              alt="Full screen look" 
              className="modal-image" 
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Lookbook;
