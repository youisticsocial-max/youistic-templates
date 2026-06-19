import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import { products, categories } from '../data/products';
import './Shop.css';

const Shop = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialCategory = queryParams.get('category') || 'All';

  const [activeCategory, setActiveCategory] = useState(
    categories.find(c => c.toLowerCase() === initialCategory.toLowerCase()) || 'All'
  );
  
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  // Update filters
  useEffect(() => {
    let result = [...products];

    // Filter by category
    if (activeCategory !== 'All') {
      result = result.filter(p => p.category === activeCategory);
    }

    // Sort
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    setFilteredProducts(result);
  }, [activeCategory, sortBy]);

  // Update category when URL changes
  useEffect(() => {
    const cat = queryParams.get('category');
    if (cat) {
      const match = categories.find(c => c.toLowerCase() === cat.toLowerCase());
      if (match) setActiveCategory(match);
    }
  }, [location.search]);

  return (
    <div className="shop-page section container" style={{ paddingTop: '120px' }}>
      
      {/* Shop Header */}
      <div className="shop-header">
        <div className="shop-title-area">
          <h1>Shop All</h1>
          <p className="subtitle">Discover our latest collection of premium clothing.</p>
        </div>
      </div>

      {/* Shop Layout */}
      <div className="shop-layout">
        
        {/* Mobile Filter Toggle */}
        <div className="shop-toolbar-mobile">
          <button className="btn btn-outline" onClick={() => setIsFilterOpen(!isFilterOpen)}>
            <SlidersHorizontal size={18} /> Filters
          </button>
          <div className="sort-dropdown">
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Sidebar Filters */}
        <aside className={`shop-sidebar ${isFilterOpen ? 'open' : ''}`}>
          <div className="filter-group">
            <h3 className="filter-title">Categories <ChevronDown size={18} /></h3>
            <ul className="filter-list">
              {categories.map((category, index) => (
                <li key={index}>
                  <button 
                    className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                    <span className="filter-count">
                      ({category === 'All' ? products.length : products.filter(p => p.category === category).length})
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Price Range <ChevronDown size={18} /></h3>
            <div className="price-filter">
              <input type="range" min="0" max="500" defaultValue="500" className="price-slider" />
              <div className="price-labels">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </div>

          <div className="filter-group">
            <h3 className="filter-title">Size <ChevronDown size={18} /></h3>
            <div className="size-grid">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button key={size} className="size-btn">{size}</button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="shop-main">
          <div className="shop-toolbar-desktop">
            <div className="results-count">
              Showing {filteredProducts.length} results for "{activeCategory}"
            </div>
            <div className="sort-dropdown">
              <label>Sort by:</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="featured">Featured</option>
                <option value="newest">New Arrivals</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>

          <motion.div layout className="grid-3 shop-grid">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredProducts.length === 0 && (
            <div className="no-results text-center">
              <h3>No products found.</h3>
              <p>Try adjusting your filters or search criteria.</p>
              <button className="btn btn-primary" onClick={() => setActiveCategory('All')} style={{marginTop:'1rem'}}>
                Clear Filters
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredProducts.length > 0 && (
            <div className="pagination">
              <button className="page-btn active">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <span className="page-dots">...</span>
              <button className="page-btn">Next</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
