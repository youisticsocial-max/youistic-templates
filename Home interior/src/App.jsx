import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Collections from './pages/Collections';
import Brands from './pages/Brands';
import NewArrivals from './pages/NewArrivals';
import Gallery from './pages/Gallery';
import Testimonials from './pages/Testimonials';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Admin Layout and Pages
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import ProductManager from './admin/ProductManager';
import BrandManager from './admin/BrandManager';
import GalleryManager from './admin/GalleryManager';
import ContentManager from './admin/ContentManager';
import InquiryManager from './admin/InquiryManager';
import MediaLibrary from './admin/MediaLibrary';
import Settings from './admin/Settings';

const StoreLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 400px)' }}>
        {children}
      </main>
      <Footer />
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Storefront Routes */}
        <Route path="/" element={<StoreLayout><Home /></StoreLayout>} />
        <Route path="/about" element={<StoreLayout><About /></StoreLayout>} />
        <Route path="/categories" element={<StoreLayout><Categories /></StoreLayout>} />
        <Route path="/collections" element={<StoreLayout><Collections /></StoreLayout>} />
        <Route path="/brands" element={<StoreLayout><Brands /></StoreLayout>} />
        <Route path="/new-arrivals" element={<StoreLayout><NewArrivals /></StoreLayout>} />
        <Route path="/gallery" element={<StoreLayout><Gallery /></StoreLayout>} />
        <Route path="/testimonials" element={<StoreLayout><Testimonials /></StoreLayout>} />
        <Route path="/blog" element={<StoreLayout><Blog /></StoreLayout>} />
        <Route path="/contact" element={<StoreLayout><Contact /></StoreLayout>} />

        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductManager />} />
          <Route path="brands" element={<BrandManager />} />
          <Route path="gallery" element={<GalleryManager />} />
          <Route path="content" element={<ContentManager />} />
          <Route path="inquiries" element={<InquiryManager />} />
          <Route path="media" element={<MediaLibrary />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
