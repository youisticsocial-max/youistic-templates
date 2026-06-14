import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Wifi, Car, Utensils, Coffee, Snowflake, Droplet, Zap, Users, Waves, Shirt } from 'lucide-react';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [settings, setSettings] = useState({
    heroImage: '/hero.png'
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/settings')
      .then(res => res.json())
      .then(data => {
        if (Object.keys(data).length > 0) {
          setSettings(data);
        }
      })
      .catch(err => console.error(err));
  }, []);

  const handleBookNow = () => {
    navigate('/booking');
  };

  const rooms = [
    { name: "Deluxe AC Room", size: "280 sqft", bed: "1 King / 2 Twin", occupancy: "2 Adults + 1 Child", amenities: ["AC", "TV", "Geyser", "WiFi", "Mini Fridge"], price: 1800, mrp: 2200, img: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=800" },
    { name: "Super Deluxe Room", size: "350 sqft", bed: "1 King", occupancy: "2 Adults + 2 Children", amenities: ["AC", "TV", "Geyser", "WiFi", "Mini Fridge", "View"], price: 2500, mrp: 3000, img: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=800" },
    { name: "Luxury Suite", size: "500 sqft", bed: "1 King", occupancy: "2 Adults + 2 Children", amenities: ["AC", "TV", "Bathtub", "WiFi", "Living Area"], price: 4500, mrp: 5500, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&q=80&w=800" },
    { name: "Family Room", size: "450 sqft", bed: "2 King", occupancy: "4 Adults", amenities: ["AC", "TV", "Geyser", "WiFi", "Mini Fridge"], price: 3500, mrp: 4500, img: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80&w=800" },
    { name: "Dormitory", size: "800 sqft", bed: "8 Bunk Beds", occupancy: "8 Adults", amenities: ["AC", "Lockers", "Shared Bath", "WiFi"], price: 500, mrp: 800, img: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=800" },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero" style={{ backgroundImage: `url(${settings.heroImage})` }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-center">
          <h1 className="hero-title">Imperial Polo Ground Haveli</h1>
          <p className="hero-tagline">The standard of stay in Jodhpur</p>
          <div className="hero-buttons">
            <button className="btn btn-outline" onClick={handleBookNow}>Check Availability</button>
            <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
          </div>
        </div>
      </section>

      {/* Intro Section */}
      <section className="section intro-section">
        <div className="container">
          <div className="intro-icon">⚘</div>
          <p className="intro-text text-center">
            Welcome to the legendary Imperial Polo Ground Haveli. Surrounded by the pristine beauty of Jodhpur, our Haveli offers unique accommodations with laid-back luxury, gracious hospitality, and an unforgettable stay. Create memories for generations of travelers.
          </p>
        </div>
      </section>

      {/* Rooms Section */}
      <section id="rooms" className="section bg-cream-dark">
        <div className="container">
          <h2 className="section-title">Stay Options</h2>
          <p className="section-subtitle">Kick your boots off and stay awhile</p>
          
          <div className="rooms-grid">
            {rooms.map((room, index) => (
              <div className="room-card" key={index}>
                <div className="room-img-container">
                  <img src={room.img} alt={room.name} className="room-img" />
                </div>
                <div className="room-details">
                  <h3 className="room-name">{room.name}</h3>
                  <div className="room-specs">
                    <p><span>Size:</span> {room.size}</p>
                    <p><span>Bed:</span> {room.bed}</p>
                    <p><span>Occupancy:</span> {room.occupancy}</p>
                    <p><span>Amenities:</span> {room.amenities.join(', ')}</p>
                  </div>
                  <div className="room-footer">
                    <div className="room-price">
                      <span className="current-price">₹{room.price}</span>
                      <span className="mrp-price">₹{room.mrp}</span>
                      <span className="per-night">/night</span>
                    </div>
                    <button className="btn btn-primary" onClick={handleBookNow}>Book Now</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section id="amenities" className="section">
        <div className="container">
          <h2 className="section-title">Hotel Amenities</h2>
          <p className="section-subtitle">Everything you need for a comfortable stay</p>
          
          <div className="amenities-grid">
            <div className="amenity-item"><Wifi size={32} /><span>Free WiFi</span></div>
            <div className="amenity-item"><Car size={32} /><span>Parking</span></div>
            <div className="amenity-item"><Utensils size={32} /><span>Restaurant</span></div>
            <div className="amenity-item"><Coffee size={32} /><span>Room Service</span></div>
            <div className="amenity-item"><Snowflake size={32} /><span>AC Rooms</span></div>
            <div className="amenity-item"><Droplet size={32} /><span>Hot Water</span></div>
            <div className="amenity-item"><Zap size={32} /><span>Power Backup</span></div>
            <div className="amenity-item"><Users size={32} /><span>Conference Hall</span></div>
            <div className="amenity-item"><Waves size={32} /><span>Swimming Pool</span></div>
            <div className="amenity-item"><Shirt size={32} /><span>Laundry</span></div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="packages" className="section packages-section">
        <div className="container">
          <h2 className="section-title" style={{color: 'white'}}>Offers & Packages</h2>
          <p className="section-subtitle" style={{color: '#ddd'}}>Curated experiences for you</p>
          
          <div className="packages-grid">
            <div className="package-card glass">
              <h3>Couple Package</h3>
              <p className="pkg-desc">Room + Breakfast + Candle Dinner + Decoration</p>
              <p className="pkg-price">₹3,999</p>
              <button className="btn btn-outline" onClick={handleBookNow}>Enquire Now</button>
            </div>
            <div className="package-card glass">
              <h3>Family Package</h3>
              <p className="pkg-desc">Deluxe Room + Meals + Sightseeing</p>
              <p className="pkg-price">₹5,999</p>
              <button className="btn btn-outline" onClick={handleBookNow}>Enquire Now</button>
            </div>
            <div className="package-card glass">
              <h3>Corporate Rates</h3>
              <p className="pkg-desc">Monthly rate with GST invoice and premium services</p>
              <p className="pkg-price">Contact Us</p>
              <button className="btn btn-outline" onClick={handleBookNow}>Enquire Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Attractions & Location */}
      <section id="location" className="section">
        <div className="container">
          <div className="location-split">
            <div className="attractions">
              <h2 className="section-title" style={{textAlign: 'left'}}>Location Advantage</h2>
              <p className="section-subtitle" style={{textAlign: 'left'}}>Why Stay Here</p>
              <ul className="attraction-list">
                <li><strong>Railway Station:</strong> 5 km</li>
                <li><strong>Airport:</strong> 2 km</li>
                <li><strong>Bus Stand:</strong> 6 km</li>
              </ul>
              
              <h3 className="mt-4 mb-4" style={{fontFamily: 'var(--font-serif)'}}>Nearby Attractions</h3>
              <div className="attraction-cards">
                <div className="attraction-card">
                  <h4>Mehrangarh Fort</h4>
                  <p>2.5 km &bull; Fort</p>
                </div>
                <div className="attraction-card">
                  <h4>Clock Tower Market</h4>
                  <p>1.8 km &bull; Market</p>
                </div>
                <div className="attraction-card">
                  <h4>Umaid Bhawan</h4>
                  <p>4.0 km &bull; Palace</p>
                </div>
                <div className="attraction-card">
                  <h4>Mandore Garden</h4>
                  <p>9.0 km &bull; Garden</p>
                </div>
              </div>
            </div>
            
            <div className="map-container">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3578.100918731174!2d73.045318!3d26.25838!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39418c504a3f1245%3A0xcb13e1cf80ad7740!2sAirport%20Rd%2C%20Panch%20Batti%20Circle%2C%20Air%20Force%20Area%2C%20Jodhpur%2C%20Rajasthan%20342001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{border: 0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Hotel Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Call to Action */}
      <section className="section bg-cream-dark text-center">
        <div className="container">
          <h2 className="section-title">Book Direct & Save 10%</h2>
          <p style={{marginBottom: '32px'}}>Avoid OTA commissions. Get the best rates by booking directly with us.</p>
          <button className="btn btn-primary" onClick={handleBookNow}>Call for Best Rate</button>
        </div>
      </section>
    </div>
  );
};

export default Home;
