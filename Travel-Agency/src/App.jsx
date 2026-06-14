import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import FloatingButtons from './components/FloatingButtons';
import Home from './pages/Home';
import Packages from './pages/Packages';
import CustomTrip from './pages/CustomTrip';
import Pilgrimage from './pages/Pilgrimage';
import VisaLookup from './pages/VisaLookup';

function App() {
  return (
    <>
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/custom-trip" element={<CustomTrip />} />
        <Route path="/pilgrimage" element={<Pilgrimage />} />
        <Route path="/visa-lookup" element={<VisaLookup />} />
      </Routes>
      <FloatingButtons />
      <Footer />
    </>
  );
}

export default App;
