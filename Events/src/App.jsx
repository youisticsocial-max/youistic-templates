import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageLoader from './components/PageLoader';
import GoldenParticles from './components/GoldenParticles';
import Home from './pages/Home';
import './App.css';

// mock data based on Home.jsx expectations
const defaultData = {
  hero: {
    bgImageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070',
    headline: 'Celebrate Like Royalty',
    subheading: 'Creating unforgettable luxury experiences for your grand moments.',
    ctaPrimary: 'Book Now',
    ctaSecondary: 'Contact Us',
  },
  stats: [
    { id: '1', value: '500+', label: 'Events Completed' },
    { id: '2', value: '10+', label: 'Years Experience' },
    { id: '3', value: '100%', label: 'Client Satisfaction' },
  ],
  services: [
    { id: 'wedding', title: 'Royal Weddings', desc: 'Complete wedding planning and execution with traditional grandeur.', imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070' },
    { id: 'corporate', title: 'Corporate Galas', desc: 'Premium corporate event management and theme parties.', imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?q=80&w=2070' },
    { id: 'private', title: 'Private Celebrations', desc: 'Intimate and luxurious personal celebrations and birthdays.', imageUrl: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?q=80&w=2069' },
  ],
  settings: {
    contactPhone: '+91 98765 43210',
    whatsappNumber: '919876543210',
    email: 'hello@rsmusicevent.com',
    address: 'Jodhpur, Rajasthan, India'
  }
};

function App() {
  const [activePage, setActivePage] = useState('home');
  const [loading, setLoading] = useState(true);

  if (loading) {
    return <PageLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <>
      <GoldenParticles />
      <Navbar activePage={activePage} setActivePage={setActivePage} brandName="RS Music Event" phoneNumber={defaultData.settings.contactPhone} />
      <main style={{ minHeight: '100vh', position: 'relative', zIndex: 2 }}>
        {activePage === 'home' && <Home data={defaultData} setActivePage={setActivePage} />}
        {activePage !== 'home' && (
          <div className="inner-hero" style={{ height: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <h1 className="text-gold-gradient" style={{ fontSize: '3rem' }}>{activePage.toUpperCase()} - Coming Soon</h1>
          </div>
        )}
      </main>
      <Footer activePage={activePage} setActivePage={setActivePage} settings={defaultData.settings} />
    </>
  );
}

export default App;
