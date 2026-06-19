import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageCircle, Star, Shield, ThumbsUp, Sparkles, UserCheck } from 'lucide-react';
import './Home.css';

const Home = () => {
  // Simple intersection observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page">
      {/* 1. Luxury Hero Section */}
      <section className="hero-section">
        <div className="hero-bg">
          <div className="image-placeholder" style={{backgroundImage: "url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000&auto=format&fit=crop')", backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%'}}>
            Hero Background Image
          </div>
          <div className="hero-overlay"></div>
        </div>
        
        <div className="container hero-content fade-up">
          <h1>Bring Comfort, Style & Elegance Into Every Corner Of Your Home</h1>
          <p>Discover exclusive branded home furnishing collections crafted to transform everyday spaces into luxurious experiences.</p>
          <div className="hero-buttons">
            <Link to="/collections" className="btn btn-primary">Explore Collection</Link>
            <Link to="/contact" className="btn btn-outline-white">Visit Our Store</Link>
          </div>
        </div>

        {/* Floating Action Buttons */}
        <div className="floating-actions">
          <a href="tel:{{PHONE}}" className="fab fab-phone" aria-label="Call Now">
            <Phone size={24} />
          </a>
          <a href="https://wa.me/{{PHONE}}" className="fab fab-whatsapp" aria-label="WhatsApp Us">
            <MessageCircle size={24} />
          </a>
        </div>
      </section>

      {/* 2. Featured Categories Section */}
      <section className="categories-section section-padding">
        <div className="container">
          <div className="section-header fade-up">
            <h2>Featured Categories</h2>
            <p>Curated selections for every space in your home</p>
          </div>

          <div className="categories-grid fade-up">
            {[
              { id: 1, title: 'Curtains & Blinds', desc: 'Designer fabrics and customized window solutions.', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop' },
              { id: 2, title: 'Bedsheets & Bedding', desc: 'Luxury bedsheets, comforters, and premium fabric collections.', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=1000&auto=format&fit=crop' },
              { id: 3, title: 'Towels & Bath Linen', desc: 'Premium towels and everyday luxury.', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop' },
              { id: 4, title: 'Pillows & Cushions', desc: 'Soft comfort with stylish designs and textures.', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=1000&auto=format&fit=crop' },
              { id: 5, title: 'Carpets & Rugs', desc: 'Modern and traditional floor styling collections.', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=1000&auto=format&fit=crop' },
              { id: 6, title: 'Wallpapers', desc: 'Designer wall coverings and artistic textures.', img: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop' }
            ].map(cat => (
              <div key={cat.id} className="category-card">
                <div className="category-img">
                  <div className="image-placeholder" style={{backgroundImage: `url(${cat.img})`}}>Image</div>
                </div>
                <div className="category-content">
                  <h3>{cat.title}</h3>
                  <p>{cat.desc}</p>
                  <Link to="/categories" className="explore-link">Explore <ArrowRight size={16} /></Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Premium Collections Section */}
      <section className="collections-section section-padding">
        <div className="container">
          <div className="section-header fade-up">
            <h2>Premium Collections</h2>
            <p>Exclusive themes for an inspired lifestyle</p>
          </div>

          <div className="collections-slider fade-up">
            {/* Horizontal scroll container */}
            <div className="collections-track">
              {[
                { title: 'Luxury Bedroom', story: 'Create your perfect sanctuary.', img: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1000&auto=format&fit=crop' },
                { title: 'Royal Curtain', story: 'Elegance that drapes beautifully.', img: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop' },
                { title: 'Premium Travel', story: 'Travel in style and comfort.', img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop' }
              ].map((col, idx) => (
                <div key={idx} className="collection-card">
                  <div className="image-placeholder" style={{backgroundImage: `url(${col.img})`}}></div>
                  <div className="collection-info">
                    <h3>{col.title}</h3>
                    <p>{col.story}</p>
                    <Link to="/collections" className="btn btn-outline">Discover</Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Featured Brands Section */}
      <section className="brands-section section-padding bg-light">
        <div className="container">
          <div className="section-header text-center fade-up">
            <h2>Trusted Premium Brands</h2>
          </div>
          <div className="brands-marquee fade-up">
            <div className="marquee-track">
              {[
                'https://upload.wikimedia.org/wikipedia/commons/4/44/Ikea_logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
                'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
              ].map((logo, index) => (
                <div key={index} className="brand-logo-card">
                  <img src={logo} alt="Brand" style={{height: '40px', objectFit: 'contain'}} />
                </div>
              ))}
              {[
                'https://upload.wikimedia.org/wikipedia/commons/4/44/Ikea_logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
                'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg',
                'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg'
              ].map((logo, index) => (
                <div key={`dup-${index}`} className="brand-logo-card">
                  <img src={logo} alt="Brand" style={{height: '40px', objectFit: 'contain'}} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. New Arrivals Section */}
      <section className="arrivals-section section-padding">
        <div className="container">
          <div className="section-header flex-between fade-up">
            <h2>New Arrivals</h2>
            <Link to="/new-arrivals" className="view-all">View All <ArrowRight size={16}/></Link>
          </div>

          <div className="products-grid fade-up">
            {[
              { id: 1, name: 'Velvet Cushions', brand: 'Luxury Linens', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800&auto=format&fit=crop' },
              { id: 2, name: 'Silk Bedsheets', brand: 'SleepWell', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800&auto=format&fit=crop' },
              { id: 3, name: 'Modern Vase', brand: 'HomeDecor', img: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800&auto=format&fit=crop' },
              { id: 4, name: 'Persian Rug', brand: 'Artisan Carpets', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800&auto=format&fit=crop' }
            ].map(item => (
              <div key={item.id} className="product-card">
                <div className="product-img">
                  <span className="badge">New Arrival</span>
                  <div className="image-placeholder" style={{backgroundImage: `url(${item.img})`, backgroundSize: 'cover', backgroundPosition: 'center', height: '300px'}}></div>
                  <div className="product-actions">
                    <button className="btn btn-primary quick-view">Quick View</button>
                  </div>
                </div>
                <div className="product-details">
                  <span className="product-brand">{item.brand}</span>
                  <h3>{item.name}</h3>
                  <p className="product-desc">Short description of this luxurious item.</p>
                  <button className="btn btn-outline inquiry-btn">Inquire Now</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Why Choose Us Section */}
      <section className="features-section section-padding">
        <div className="container">
          <div className="section-header text-center fade-up">
            <h2>Why Choose {"{{CLINIC_NAME}}"}</h2>
            <p>The premium destination for your home lifestyle needs</p>
          </div>

          <div className="features-grid fade-up">
            {[
              { icon: <Shield size={32}/>, title: 'Genuine Branded Products', desc: 'Only trusted and quality brands.' },
              { icon: <Star size={32}/>, title: 'Wide Product Range', desc: 'Everything for home comfort and lifestyle.' },
              { icon: <Sparkles size={32}/>, title: 'Premium Quality', desc: 'Carefully selected fabrics and materials.' },
              { icon: <UserCheck size={32}/>, title: 'Expert Assistance', desc: 'Personalized guidance for your choices.' }
            ].map((feat, idx) => (
              <div key={idx} className="feature-card">
                <div className="feature-icon">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
