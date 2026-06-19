import React from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Pages.css';

const Blog = () => {
  const posts = [
    { title: '10 Bedroom Styling Ideas for the Ultimate Sanctuary', date: 'October 12, 2023', category: 'Styling Tips', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=800' },
    { title: 'Choosing the Perfect Curtains for Your Living Room', date: 'October 05, 2023', category: 'Guides', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800' },
    { title: 'The Rise of Minimalist Wallpapers in Modern Homes', date: 'September 28, 2023', category: 'Trends', img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=800' }
  ];

  return (
    <div className="page-container">
      <div className="page-hero" style={{height: '350px'}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000')"}}></div>
        <div className="page-hero-overlay"></div>
        <div className="container relative" style={{zIndex: 1}}>
          <h1>Lifestyle & Inspiration</h1>
          <p>Read our latest articles on home styling and interior trends</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="page-grid">
          {posts.map((post, idx) => (
            <div key={idx} className="card">
              <div className="card-img" style={{backgroundImage: `url(${post.img})`}}></div>
              <div className="card-content">
                <span style={{color: 'var(--primary-color)', fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase'}}>{post.category}</span>
                <h3 className="card-title" style={{margin: '8px 0'}}>{post.title}</h3>
                <div style={{display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1rem'}}>
                  <Calendar size={14} /> {post.date}
                </div>
                <Link to="#" style={{display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500}}>
                  Read Article <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
