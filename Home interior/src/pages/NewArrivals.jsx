import React from 'react';
import './Pages.css';

const NewArrivals = () => {
  const products = [
    { id: 1, name: 'Velvet Cushions', brand: 'Luxury Linens', img: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=800' },
    { id: 2, name: 'Silk Bedsheets', brand: 'SleepWell', img: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?q=80&w=800' },
    { id: 3, name: 'Modern Vase', brand: 'HomeDecor', img: 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?q=80&w=800' },
    { id: 4, name: 'Persian Rug', brand: 'Artisan Carpets', img: 'https://images.unsplash.com/photo-1599839619722-39751411ea63?q=80&w=800' },
    { id: 5, name: 'Gold Trim Towels', brand: 'Bath&Body', img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800' },
    { id: 6, name: 'Minimalist Lamp', brand: 'Lumina', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800' }
  ];

  return (
    <div className="page-container">
      <div className="page-hero" style={{height: '300px'}}>
        <div className="page-hero-bg" style={{backgroundImage: "url('https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=2000')"}}></div>
        <div className="page-hero-overlay"></div>
        <div className="container relative" style={{zIndex: 1}}>
          <h1>New Arrivals</h1>
          <p>The latest additions to our luxury collection</p>
        </div>
      </div>

      <div className="container section-padding">
        <div className="page-grid">
          {products.map(item => (
            <div key={item.id} className="card">
              <div style={{position: 'relative'}}>
                <span style={{position: 'absolute', top: '10px', left: '10px', background: 'var(--primary-color)', color: 'white', padding: '4px 8px', fontSize: '12px', textTransform: 'uppercase', borderRadius: '4px'}}>New</span>
                <div className="card-img" style={{backgroundImage: `url(${item.img})`}}></div>
              </div>
              <div className="card-content">
                <span style={{fontSize: '12px', color: 'var(--text-secondary)', textTransform: 'uppercase'}}>{item.brand}</span>
                <h3 className="card-title" style={{margin: '4px 0'}}>{item.name}</h3>
                <button className="btn btn-outline" style={{width: '100%', marginTop: '1rem'}}>Inquire Now</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;
