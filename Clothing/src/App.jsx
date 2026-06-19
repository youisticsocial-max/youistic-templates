import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Home from './pages/Home';
import Shop from './pages/Shop';
import Contact from './pages/Contact';
import About from './pages/About';
import Collections from './pages/Collections';
import Lookbook from './pages/Lookbook';
import Reviews from './pages/Reviews';
import FAQ from './pages/FAQ';
import ProductDetail from './pages/ProductDetail';

import AdminLayout from './admin/AdminLayout';
import DashboardOverview from './admin/DashboardOverview';
import AdminProducts from './admin/AdminProducts';
import AdminOrders from './admin/AdminOrders';
import AdminCustomers from './admin/AdminCustomers';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/shop/:id" element={<ProductDetail />} />
          <Route path="/collections" element={<Collections />} />
          <Route path="/new-arrivals" element={<Shop />} /> {/* Redirect to shop with newest filter */}
          <Route path="/lookbook" element={<Lookbook />} />
          <Route path="/about" element={<About />} />
          <Route path="/sustainability" element={<About />} /> {/* Reuse About layout */}
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<DashboardOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="customers" element={<AdminCustomers />} />
            {/* Placeholders for remaining admin pages */}
            <Route path="*" element={<div className="admin-card"><h2>Under Construction</h2><p>This module is currently being built.</p></div>} />
          </Route>
        </Routes>
      </main>

      {!isAdmin && <Footer />}
    </>
  );
}

export default App;
