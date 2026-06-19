import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './CartDrawer.css';

const CartDrawer = () => {
  const { isCartOpen, setIsCartOpen, cartItems, cartTotal, removeFromCart, updateQuantity } = useCart();

  const handleClose = () => setIsCartOpen(false);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className="cart-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />
          <motion.div 
            className="cart-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="cart-header">
              <h2>Your Selection</h2>
              <button className="close-btn" onClick={handleClose}>
                <X size={24} />
              </button>
            </div>

            <div className="cart-body">
              {cartItems.length === 0 ? (
                <div className="empty-cart">
                  <ShoppingBag size={48} className="empty-icon" />
                  <h3>Your cart is empty</h3>
                  <p className="text-secondary">Discover our premium collections to start your journey.</p>
                  <button className="btn btn-primary mt-md" onClick={handleClose}>
                    Explore Jewelry
                  </button>
                </div>
              ) : (
                <div className="cart-items">
                  {cartItems.map((item) => (
                    <div className="cart-item" key={item.cartItemId}>
                      <div className="cart-item-image">
                        <img 
                          src={item.image.startsWith('http') ? item.image : `../${item.image}`} 
                          alt={item.name} 
                          className="img-cover"
                          onError={(e) => { e.target.src = item.image.startsWith('http') ? item.image : `../${item.image}`; }}
                        />
                      </div>
                      <div className="cart-item-details">
                        <div className="cart-item-title-row">
                          <Link to={`/shop/${item.id}`} onClick={handleClose}><h4>{item.name}</h4></Link>
                          <button className="remove-btn" onClick={() => removeFromCart(item.cartItemId)}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                        <p className="cart-item-variant text-secondary">
                          {item.size} • <span style={{display:'inline-block', width:'10px', height:'10px', borderRadius:'50%', backgroundColor: item.color, marginLeft:'4px'}}></span>
                        </p>
                        <div className="cart-item-price-row">
                          <span className="price">${item.price.toFixed(2)}</span>
                          <div className="quantity-controls">
                            <button onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}>+</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer border-top">
                <div className="subtotal-row">
                  <span>Subtotal</span>
                  <span className="price">${cartTotal.toFixed(2)}</span>
                </div>
                <p className="taxes-note text-sm text-secondary mb-sm">Taxes and shipping calculated at checkout.</p>
                <button className="btn btn-primary w-100" onClick={handleClose}>
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
