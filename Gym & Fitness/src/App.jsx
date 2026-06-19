import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingCTA from './components/FloatingCTA';

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Programs from './pages/Programs';
import Membership from './pages/Membership';
import Trainers from './pages/Trainers';
import Transformations from './pages/Transformations';
import Gallery from './pages/Gallery';
import Schedule from './pages/Schedule';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

import './App.css';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  // Load custom accent color if it exists in local storage
  useEffect(() => {
    const storedColor = localStorage.getItem('gym_primary_color');
    if (storedColor) {
      document.documentElement.style.setProperty('--primary-color', storedColor);
    }
  }, []);

  return (
    <Router>
      <ScrollToTop />
      <div className="app-shell">
        <Navbar />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/membership" element={<Membership />} />
            <Route path="/trainers" element={<Trainers />} />
            <Route path="/transformations" element={<Transformations />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            {/* Fallback route */}
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        
        <Footer />
        <FloatingCTA />
      </div>
    </Router>
  );
}

export default App;
