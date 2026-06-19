import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className="product-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-container">
        {product.isNew && <span className="badge badge-new">New</span>}
        {product.isBestSeller && !product.isNew && <span className="badge badge-best">Best Seller</span>}
        
        <Link to={`/shop/${product.id}`}>
          <img 
            src={isHovered && product.hoverImage ? product.hoverImage : product.image} 
            alt={product.name} 
            className="product-image"
            onError={(e) => {
              // Fallback for placeholder
              e.target.src = `https://placehold.co/400x600/f4f4f4/333333?text=${product.name.replace(/ /g, '+')}`;
            }}
          />
        </Link>

        {/* Floating Actions */}
        <div className={`product-actions ${isHovered ? 'visible' : ''}`}>
          <button className="action-icon-btn" title="Add to Wishlist">
            <Heart size={18} />
          </button>
          <button className="action-icon-btn" title="Quick View">
            <Eye size={18} />
          </button>
          <button className="action-icon-btn" title="Add to Cart">
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      <div className="product-info">
        <div className="product-category">{product.category}</div>
        <Link to={`/shop/${product.id}`} className="product-name">
          {product.name}
        </Link>
        <div className="product-price">${product.price.toFixed(2)}</div>
        
        <div className="product-colors">
          {product.colors.map((color, index) => (
            <div 
              key={index} 
              className="color-swatch" 
              style={{ backgroundColor: color }}
              title={color}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
