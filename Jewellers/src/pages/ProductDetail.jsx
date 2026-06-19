import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, Share2, ChevronRight, Star } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart, setIsCartOpen } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedSize, selectedColor);
    setIsCartOpen(true);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  useEffect(() => {
    // Find product by id from the mock data
    const foundProduct = products.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedColor(foundProduct.colors[0]); // Default to first color
      setSelectedSize(foundProduct.sizes?.[0] || 'Standard');
    }
  }, [id]);

  if (!product) {
    return (
      <div className="section container text-center" style={{ paddingTop: '160px', minHeight: '60vh' }}>
        <h2>Jewel Not Found</h2>
        <p className="mt-sm mb-lg">The heritage piece you're looking for doesn't exist or has been removed.</p>
        <Link to="/shop" className="btn btn-primary">Return to Collection</Link>
      </div>
    );
  }

  return (
    <div className="product-detail-page section container" style={{ paddingTop: '140px' }}>
      
      {/* Breadcrumbs */}
      <div className="breadcrumbs">
        <Link to="/">Home</Link> <ChevronRight size={14} />
        <Link to="/shop">Jewelry</Link> <ChevronRight size={14} />
        <Link to={`/shop?category=${product.category.toLowerCase()}`}>{product.category}</Link> <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>

      <div className="product-detail-grid mt-lg">
        {/* Images */}
        <div className="product-gallery">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="main-image-container"
          >
            <img 
              src={product.image.startsWith('http') ? product.image : `../${product.image}`} 
              alt={product.name} 
              className="img-cover" 
              onError={(e) => { e.target.src = product.image.startsWith('http') ? product.image : `../${product.image}`; }}
            />
          </motion.div>
          {product.hoverImage && (
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="secondary-image-container mt-sm"
            >
              <img 
                src={product.hoverImage.startsWith('http') ? product.hoverImage : `../${product.hoverImage}`} 
                alt={`${product.name} detail`} 
                className="img-cover" 
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </motion.div>
          )}
        </div>

        {/* Info */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          className="product-info-panel"
        >
          {product.isNew && <span className="badge badge-new mb-sm">New Design</span>}
          {product.isBestSeller && !product.isNew && <span className="badge badge-best mb-sm">Heritage Classic</span>}
          
          <h1 className="product-title">{product.name}</h1>
          <div className="product-price-row mt-sm mb-md">
            <span className="price">${product.price.toFixed(2)}</span>
            <div className="reviews-summary">
              <div className="stars">
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
                <Star size={14} fill="currentColor" />
              </div>
              <span className="review-count">(124 Reviews)</span>
            </div>
          </div>

          <p className="product-description text-secondary mb-lg">
            {product.description}
          </p>
          <p className="product-description text-secondary mb-lg">
            Elevate your legacy with our {product.name}. Crafted from premium, hallmarked materials, this piece offers an unmatched blend of majestic aesthetic and timeless purity. Designed to be cherished across generations.
          </p>

          <div className="product-options">
            <div className="option-group mb-md">
              <div className="option-header">
                <span className="option-label">Metal Tone: </span>
              </div>
              <div className="color-options">
                {product.colors.map(color => (
                  <button 
                    key={color}
                    className={`color-btn ${selectedColor === color ? 'selected' : ''}`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    title={color}
                  />
                ))}
              </div>
            </div>

            <div className="option-group mb-lg">
              <div className="option-header">
                <span className="option-label">Variation: <strong>{selectedSize}</strong></span>
                <button className="size-guide-btn">Sizing Guide</button>
              </div>
              <div className="size-options">
                {product.sizes && product.sizes.map(size => (
                  <button 
                    key={size}
                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="add-to-cart-section mb-lg">
              <div className="quantity-selector">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                <input type="number" value={quantity} readOnly />
                <button onClick={() => setQuantity(quantity + 1)}>+</button>
              </div>
              <button className={`btn btn-primary btn-add-cart ${isAdded ? 'added' : ''}`} onClick={handleAddToCart}>
                <ShoppingBag size={20} style={{marginRight: '8px'}} /> {isAdded ? 'Added to Cart!' : 'Add to Cart'}
              </button>
              <button className="btn-wishlist">
                <Heart size={24} />
              </button>
            </div>

            <div className="product-meta mt-xl border-top pt-md">
              <div className="meta-item">
                <strong>Material:</strong> Hallmarked 22k Gold & Certified Polki
              </div>
              <div className="meta-item">
                <strong>Care:</strong> Store in provided velvet box, avoid direct perfume contact
              </div>
              <div className="meta-item">
                <strong>Shipping:</strong> Free insured shipping on all orders over $1000
              </div>
              <div className="meta-item mt-xs">
                <strong>Authenticity:</strong> Accompanied by a Certificate of Authenticity
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;
