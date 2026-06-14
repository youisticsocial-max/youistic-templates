import React from 'react';
import { MapPin, Check, X, Calendar } from 'lucide-react';
import './Pilgrimage.css';

// Reuse same packages data but filter for Pilgrimage category
import packagesData from '../data/packagesData'; // We'll create this data file for shared use

export default function Pilgrimage() {
  const pilgrimagePackages = packagesData.filter((pkg) => pkg.category === 'Pilgrimage');

  if (pilgrimagePackages.length === 0) {
    return (
      <section className="pilgrimage-section" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2 className="section-title">Pilgrimage Tours</h2>
        <p style={{ color: 'var(--text-muted)' }}>Currently we have no pilgrimage packages. Please check back later.</p>
      </section>
    );
  }

  return (
    <section className="pilgrimage-section">
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Sacred Pilgrimage Tours</h2>
        <div className="pilgrimage-grid">
          {pilgrimagePackages.map((pkg) => (
            <div key={pkg.id} className="pilgrimage-card">
              <div className="card-img-wrapper">
                <img src={pkg.image} alt={pkg.name} className="card-img" />
                <div className="duration-tag">{pkg.duration}</div>
              </div>
              <div className="card-body">
                <h3 className="card-pkg-name">{pkg.name}</h3>
                <div className="card-destinations">
                  <MapPin size={14} /> {pkg.destinations}
                </div>
                <ul className="card-highlights">
                  {pkg.highlights.map((hl, i) => (
                    <li key={i}>
                      <Check size={14} className="highlight-bullet" /> {hl}
                    </li>
                  ))}
                </ul>
                <div className="price-box">
                  <span className="price-label">Starting Price</span>
                  <span className="price-amount">₹{pkg.price.toLocaleString('en-IN')} <span>/person</span></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
