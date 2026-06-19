import React from 'react';
import { motion } from 'framer-motion';
import { Star, CheckCircle } from 'lucide-react';
import './Reviews.css';

const Reviews = () => {
  const reviews = [
    {
      id: 1,
      name: "Sarah Jenkins",
      rating: 5,
      date: "May 12, 2026",
      title: "Absolutely in love with the quality!",
      text: "I purchased the Premium Wool Overcoat and it exceeded all my expectations. The fit is perfect and the material feels incredibly luxurious. I've received so many compliments already.",
      verified: true,
      image: "assets/lookbook-1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      rating: 5,
      date: "April 28, 2026",
      title: "Best basics I've ever owned.",
      text: "The Essential Cotton Crew tees are unmatched. They haven't lost their shape or softness after multiple washes. Truly a staple in my wardrobe now.",
      verified: true,
      image: null
    },
    {
      id: 3,
      name: "Emma Davis",
      rating: 4,
      date: "April 15, 2026",
      title: "Beautiful drape, slight sizing issue.",
      text: "The Silk Blend Slip Dress is gorgeous, but I found it ran a tiny bit small around the bust. I exchanged for a size up and it's perfect. The customer service team was very helpful.",
      verified: true,
      image: null
    },
    {
      id: 4,
      name: "David Smith",
      rating: 5,
      date: "March 30, 2026",
      title: "Worth every penny.",
      text: "You can really feel the craftsmanship in these garments. The Heavyweight Hoodie is exactly what I was looking for. Thick, warm, and structured.",
      verified: true,
      image: "assets/product-4.jpg"
    }
  ];

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, i) => (
      <Star key={i} size={16} fill={i < rating ? "currentColor" : "none"} strokeWidth={i < rating ? 0 : 2} />
    ));
  };

  return (
    <div className="reviews-page">
      <div className="reviews-header section bg-surface text-center" style={{paddingTop: '160px'}}>
        <div className="container">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            Customer Reviews
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.1 }}
            className="aggregate-rating"
          >
            <div className="stars lg">{renderStars(5)}</div>
            <p className="subtitle mt-sm">4.9 out of 5 stars based on 10,000+ reviews</p>
          </motion.div>
        </div>
      </div>

      <div className="container section">
        <div className="reviews-grid">
          {reviews.map((review, index) => (
            <motion.div 
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="review-card"
            >
              <div className="review-card-header">
                <div className="review-stars">{renderStars(review.rating)}</div>
                <span className="review-date">{review.date}</span>
              </div>
              
              <h3 className="review-title">{review.title}</h3>
              <p className="review-text">{review.text}</p>
              
              {review.image && (
                <div className="review-image-wrapper">
                  <img src={review.image} alt="Customer photo" className="img-cover" onError={(e) => e.target.style.display = 'none'} />
                </div>
              )}

              <div className="review-author">
                <span className="author-name">{review.name}</span>
                {review.verified && (
                  <span className="verified-badge">
                    <CheckCircle size={14} /> Verified Buyer
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="text-center mt-lg">
          <button className="btn btn-outline">Load More Reviews</button>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
