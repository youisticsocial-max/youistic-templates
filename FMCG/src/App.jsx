import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Categories from './pages/Categories';
import Collections from './pages/Collections';
import Manufacturing from './pages/Manufacturing';
import Process from './pages/Process';
import Gallery from './pages/Gallery';
import Certifications from './pages/Certifications';
import Blog from './pages/Blog';
import Contact from './pages/Contact';

// Admin Pages
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import ProductsAdmin from './admin/pages/ProductsAdmin';
import Distributors from './admin/pages/Distributors';

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<ProductsAdmin />} />
          <Route path="distributors" element={<Distributors />} />
        </Route>

        {/* Public Routes */}
        <Route path="/*" element={
          <div className="app-container">
            <Navbar />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/collections" element={<Collections />} />
                <Route path="/manufacturing" element={<Manufacturing />} />
                <Route path="/process" element={<Process />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/certifications" element={<Certifications />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;
