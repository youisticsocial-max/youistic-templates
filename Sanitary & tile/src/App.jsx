import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import TileCollections from './pages/TileCollections';
import BathwareCollections from './pages/BathwareCollections';
import Spaces from './pages/Spaces';
import WhyChooseUs from './pages/WhyChooseUs';
import Projects from './pages/Projects';
import Designers from './pages/Designers';
import Downloads from './pages/Downloads';
import News from './pages/News';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collections/tiles" element={<TileCollections />} />
          <Route path="/collections/bathware" element={<BathwareCollections />} />
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/why-choose-us" element={<WhyChooseUs />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/designers" element={<Designers />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
