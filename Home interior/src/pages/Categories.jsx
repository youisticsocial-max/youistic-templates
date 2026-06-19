import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './Pages.css';

const Categories = () => {
  const cats = [
    { title: 'Curtains & Blinds', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000' },
    { title: 'Bedsheets & Bedding', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000' },
    { title: 'Towels & Bath Linen', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000' },
    { title: 'Pillows & Cushions', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000' },
    { title: 'Carpets & Rugs', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1000' },
    { title: 'Wallpapers', img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000' }
  ];

  return (
    <div className="page-container">
      <div className="page-hero" style={{height: '300px'}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000')"}}></div>
        <div className="page-hero-overlay"></div>
        <div className="container relative" style={{zIndex: 1}}>
          <h1>Product Categories</h1>
          <p>Explore our wide range of premium home furnishings</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="page-grid">
          {cats.map((cat, idx) => (
            <div key={idx} className="card">
              <div className="card-img" style={{backgroundImage: `url(${cat.img})`}}></div>
              <div className="card-content">
                <h3 className="card-title">{cat.title}</h3>
                <Link to="/collections" className="btn btn-outline" style={{width: '100%', textAlign: 'center'}}>Shop Category</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
