import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Collections = () => {
  const collections = [
    {
      title: "Bridal Trousseau",
      desc: "The crowning glory of your special day. Premium polki, kundan, and diamond bridal sets designed for ultimate royalty.",
      image: "https://images.pexels.com/photos/1458867/pexels-photo-1458867.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/shop?category=bridal"
    },
    {
      title: "Heritage Classics",
      desc: "Timeless artistry meets majestic gemstones. Pieces that will become generational family heirlooms.",
      image: "https://images.pexels.com/photos/3310692/pexels-photo-3310692.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/shop?category=necklaces"
    },
    {
      title: "Festive Collection",
      desc: "Vibrant meenakari, radiant navratnas, and elegant temple jewelry for joyous celebrations.",
      image: "https://images.pexels.com/photos/1330999/pexels-photo-1330999.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/shop?category=earrings"
    }
  ];

  return (
    <div className="collections-page section container" style={{ paddingTop: '160px' }}>
      <div className="text-center mb-xl">
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          Our Collections
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="subtitle mt-sm mx-auto"
          style={{ maxWidth: '600px' }}
        >
          Curated edits to help you build a purposeful, regal, and effortlessly divine jewelry trousseau.
        </motion.p>
      </div>

      <div className="collections-list" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xl)' }}>
        {collections.map((collection, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="collection-block"
            style={{ 
              display: 'flex', 
              flexDirection: index % 2 !== 0 ? 'row-reverse' : 'row',
              alignItems: 'center',
              gap: 'var(--space-xl)'
            }}
          >
            <div className="collection-image" style={{ flex: 1, height: '600px', borderRadius: '8px', overflow: 'hidden' }}>
              <img 
                src={collection.image} 
                alt={collection.title} 
                className="img-cover"
                onError={(e) => { e.target.src = collection.image; }}
              />
            </div>
            <div className="collection-info" style={{ flex: 1, padding: 'var(--space-lg)' }}>
              <h2 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-sm)' }}>{collection.title}</h2>
              <p className="text-secondary" style={{ fontSize: '1.1rem', marginBottom: 'var(--space-lg)' }}>{collection.desc}</p>
              <Link to={collection.link} className="btn btn-outline">Explore Collection</Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Collections;
