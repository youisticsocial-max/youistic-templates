import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MapPin, Calendar, Clock, Star, HelpCircle, Check, X, CreditCard, Send, Compass } from 'lucide-react';
import './Packages.css';

const packagesList = [
  {
    id: 1,
    name: 'Maldives Luxury Honeymoon Escape',
    category: 'Honeymoon',
    duration: '4 Nights / 5 Days',
    destinations: 'Male, Private Resort Island',
    price: 75000,
    highlights: ['5-Star Beach Villa stay', 'Speedboat Airport transfers', 'Private Candlelight Dinner', 'Snorkeling & Coral sightseeing'],
    emi: true,
    emiDetails: 'Starts at ₹6,250/mo for 12 months with No-Cost EMI options.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=600&q=80',
    itinerary: [
      { day: 'Day 1: Arrival & Speedboat Transfer', desc: 'Arrive at Male Airport. Meet our representative and take a speed boat transfer to your private beach villa. Enjoy a welcome drink and sunset beach walk.' },
      { day: 'Day 2: Water Sports & Leisure', desc: 'Indulge in breakfast. Spend the day doing water activities like paddle boarding, windsurfing, or relaxing on the white sands.' },
      { day: 'Day 3: Snorkeling & Candlelight Dinner', desc: 'A guided reef snorkeling tour in the morning to see beautiful sea turtles. In the evening, enjoy a private candlelight dinner on the beach.' },
      { day: 'Day 4: Spa Treatment & Sunset Cruise', desc: 'Get a 60-minute relaxing Balinese couple massage at the resort spa. Enjoy an evening catamaran sunset cruise with mocktails.' },
      { day: 'Day 5: Check-out & Return', desc: 'Enjoy breakfast. Take the speedboat transfer back to Male Airport for your return flight.' }
    ],
    inclusions: ['Luxury Stay', 'All Meals included', 'Speedboat transfers', 'Couples Spa session']
  },
  {
    id: 2,
    name: 'Mesmerizing Himachal Scenic Escape',
    category: 'Domestic',
    duration: '6 Nights / 7 Days',
    destinations: 'Shimla, Manali, Solang Valley',
    price: 24500,
    highlights: ['Shimla Mall Road & Kufri tour', 'Manali Solang Valley snow view', 'Hadimba Temple & Local sightseeing', 'Private Cab for entire tour'],
    emi: false,
    image: 'https://images.unsplash.com/photo-1626621340025-b26b4d360060?auto=format&fit=crop&w=600&q=80',
    itinerary: [
      { day: 'Day 1: Delhi to Shimla Drive', desc: 'Pickup from Delhi Airport/Railway station. Scenic drive to Shimla. Check-in at hotel and evening at leisure.' },
      { day: 'Day 2: Shimla & Kufri Sightseeing', desc: 'Visit Kufri valley, enjoy horse riding. In the evening, take a stroll on Shimla Mall road, Ridge, and Christ Church.' },
      { day: 'Day 3: Shimla to Manali Scenic Drive', desc: 'Drive to Manali via Kullu Valley. Stop for river rafting in Kullu. Check-in at Manali hotel.' },
      { day: 'Day 4: Manali Local Sightseeing', desc: 'Visit Hadimba Temple, Vashisht Hot Springs, and Club House. Evening shopping at Manali Mall Road.' },
      { day: 'Day 5: Solang Valley Snow Tour', desc: 'Day excursion to Solang Valley for adventure activities (paragliding, zorbing, snow skiing). Optional visit to Atal Tunnel.' },
      { day: 'Day 6: Drive back to Chandigarh', desc: 'Check-out from Manali, drive to Chandigarh. Evening visit to Rock Garden.' },
      { day: 'Day 7: Departure to Delhi', desc: 'Drive back to Delhi and drop-off at Airport/Railway station.' }
    ],
    inclusions: ['Hotel Stay (3 Star)', 'Breakfast & Dinner', 'Private AC Cab', 'Driver Allowances']
  },
  {
    id: 3,
    name: 'Char Dham Yatra Sacred Pilgrimage',
    category: 'Pilgrimage',
    duration: '11 Nights / 12 Days',
    destinations: 'Haridwar, Yamunotri, Gangotri, Kedarnath, Badrinath',
    price: 48000,
    highlights: ['Comfortable stays near temples', 'VIP Darshan booking support', 'Experienced local coordinators', 'All pure vegetarian meals'],
    emi: true,
    emiDetails: 'Starts at ₹4,000/mo for 12 months. Low interest finance options.',
    image: 'https://images.unsplash.com/photo-1545249390-6bdfa286032f?auto=format&fit=crop&w=600&q=80',
    itinerary: [
      { day: 'Day 1: Haridwar Arrival', desc: 'Arrive at Haridwar. Attend the beautiful Ganga Aarti at Har Ki Pauri. Stay at Haridwar hotel.' },
      { day: 'Day 2: Haridwar to Barkot Drive', desc: 'Drive to Barkot via Mussoorie. Check-in at Barkot camp/hotel.' },
      { day: 'Day 3: Yamunotri Holy Darshan', desc: 'Drive to Janki Chatti. Trek 6 km to Yamunotri. Take holy bath, darshan, and trek back to Barkot.' },
      { day: 'Day 4: Barkot to Uttarkashi Drive', desc: 'Drive to Uttarkashi. Visit Vishwanath Temple in the evening.' },
      { day: 'Day 5: Gangotri Holy Darshan', desc: 'Drive to Gangotri temple, take holy dip in Ganga, offer prayers, and drive back to Uttarkashi.' },
      { day: 'Day 6: Uttarkashi to Guptkashi', desc: 'Drive to Guptkashi along Mandakini river. Check-in at hotel.' },
      { day: 'Day 7: Trek to Kedarnath Temple', desc: 'Drive to Sonprayag. Take local shuttle to Gaurikund. Trek 16 km to Kedarnath. Overnight stay at Kedarnath camp.' },
      { day: 'Day 8: Kedarnath Darshan & Return', desc: 'Early morning VIP Darshan. Trek back to Gaurikund. Drive back to Guptkashi.' },
      { day: 'Day 9: Guptkashi to Badrinath', desc: 'Drive to Badrinath via Joshimath. Attend evening temple darshan.' },
      { day: 'Day 10: Badrinath Darshan to Rudraprayag', desc: 'Holy bath at Tapt Kund, darshan, visit Mana village. Drive to Rudraprayag.' },
      { day: 'Day 11: Rudraprayag to Haridwar', desc: 'Drive back to Haridwar via Rishikesh. Visit Lakshman Jhula.' },
      { day: 'Day 12: Departure', desc: 'Morning check-out and drop at Delhi/Dehradun Airport.' }
    ],
    inclusions: ['Temple Stays', 'Pure Veg Meals', 'VIP Darshan Passes', 'Medical Assistance Kits']
  },
  {
    id: 4,
    name: 'Amazing Thailand City & Island Adventure',
    category: 'International',
    duration: '5 Nights / 6 Days',
    destinations: 'Bangkok, Pattaya, Coral Island',
    price: 38999,
    highlights: ['Speedboat tour to Coral Island', 'Alcazar Cabaret Show entry', 'Bangkok Safari World tour', 'Private airport transfers'],
    emi: true,
    emiDetails: 'Starts at ₹3,250/mo. Easy EMI on credit cards.',
    image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80',
    itinerary: [
      { day: 'Day 1: Bangkok Airport to Pattaya Drive', desc: 'Arrive at Suvarnabhumi Airport. Transfer directly to Pattaya beach resort. Evening free to explore.' },
      { day: 'Day 2: Coral Island Tour & Alcazar Show', desc: 'Take a speedboat to Coral Island. Enjoy lunch and beach activities. In the evening, watch the famous Alcazar Cabaret Show.' },
      { day: 'Day 3: Pattaya to Bangkok Transfer', desc: 'Drive to Bangkok. En route, visit the Golden Buddha and Reclining Buddha temples. Check-in at Bangkok hotel.' },
      { day: 'Day 4: Safari World & Marine Park Tour', desc: 'Full-day trip to Safari World. Watch dolphin shows, elephant shows, and drive through the wild safari sanctuary.' },
      { day: 'Day 5: Leisure & Shopping Day', desc: 'Free day for shopping at MBK Center, CentralWorld, or Pratunam market.' },
      { day: 'Day 6: Check-out & Departure', desc: 'Breakfast at hotel, free time till transfer to Bangkok airport.' }
    ],
    inclusions: ['4-Star Hotel Stay', 'Daily Breakfasts', 'Speedboat Lunch', 'All Transfers & Tickets']
  },
  {
    id: 5,
    name: 'Kerala Backwaters & Munnar Hills',
    category: 'Domestic',
    duration: '5 Nights / 6 Days',
    destinations: 'Munnar, Thekkady, Alleppey Houseboat',
    price: 28000,
    highlights: ['Munnar tea estate trekking', 'Periyar wildlife lake cruise', 'Private Houseboat stay with meals', 'Spice plantation guided tour'],
    emi: false,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=600&q=80',
    itinerary: [
      { day: 'Day 1: Cochin to Munnar Drive', desc: 'Pickup from Cochin. Travel through winding roads with viewpoints and waterfalls to Munnar.' },
      { day: 'Day 2: Munnar Tea Gardens & Lakes', desc: 'Visit Eravikulam National Park, Mattupetty Dam, Echo Point, and Tea Museum.' },
      { day: 'Day 3: Munnar to Thekkady', desc: 'Scenic drive to Thekkady spice forests. Guided spice plantation tour and evening cultural show (Kalaripayattu).' },
      { day: 'Day 4: Periyar Lake to Alleppey Houseboat', desc: 'Morning boat ride in Periyar Lake. Drive to Alleppey. Board the premium private houseboat for backwater cruising.' },
      { day: 'Day 5: Alleppey to Cochin Sightseeing', desc: 'Check-out from houseboat. Drive to Cochin. Visit Fort Cochin, Chinese Fishing Nets, and Jew Town.' },
      { day: 'Day 6: Departure', desc: 'Transfer to Cochin Airport/Railway station for departure.' }
    ],
    inclusions: ['Premium Hotels', 'All Meals in Houseboat', 'A/C Sedan Transport', 'Entry fees to reserves']
  },
  {
    id: 6,
    name: 'Classic Rajasthan Heritage Tour',
    category: 'Group Tour',
    duration: '5 Nights / 6 Days',
    destinations: 'Jaipur, Jodhpur, Jaisalmer Sand Dunes',
    price: 19999,
    highlights: ['Jaipur Amber Fort elephant tour', 'Mehrangarh Fort Jodhpur walk', 'Desert camp desert dunes stay', 'Camel safari & folk dancers'],
    emi: false,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=600&q=80',
    itinerary: [
      { day: 'Day 1: Jaipur Heritage Arrival', desc: 'Pickup from Jaipur. Check-in at hotel. Visit Hawa Mahal and Jantar Mantar.' },
      { day: 'Day 2: Jaipur Forts to Jodhpur', desc: 'Visit Amber Fort. Afternoon drive to Jodhpur. Check-in at hotel.' },
      { day: 'Day 3: Jodhpur Forts to Jaisalmer', desc: 'Visit Mehrangarh Fort and Jaswant Thada in Jodhpur. Drive to Jaisalmer desert dunes.' },
      { day: 'Day 4: Jaisalmer Desert Camping', desc: 'Explore Jaisalmer Fort (Golden Fort) and Havelis. Evening check-in at Desert Dunes luxury camp. Enjoy camel ride and folk buffet.' },
      { day: 'Day 5: Return to Jaipur/Jodhpur', desc: 'Check-out from dunes camp. Travel back to Jodhpur/Jaipur.' },
      { day: 'Day 6: Departure drop', desc: 'Drop off at Airport/Railway station.' }
    ],
    inclusions: ['Heritage Stays', 'Breakfast & Dinner', 'Desert camp buffet', 'Desert camel ride']
  },
  {
    id: 7,
    name: 'Best of Swiss & Paris Premium Luxury',
    category: 'International',
    duration: '9 Nights / 10 Days',
    destinations: 'Paris, Zurich, Lucerne, Interlaken',
    price: 185000,
    highlights: ['Eiffel Tower 2nd floor entry ticket', 'Mt. Titlis revolving cable car ride', 'Seine River Cruise in Paris', 'Premium Swiss Rail Pass included'],
    emi: true,
    emiDetails: 'Starts at ₹15,400/mo. No-cost options available on top banks.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
    itinerary: [
      { day: 'Day 1: Arrival in Paris', desc: 'Arrive in Paris, meet representative. Check-in at premium hotel. Evening Seine River cruise.' },
      { day: 'Day 2: Paris City Tour & Eiffel Tower', desc: 'Guided tour of Louvre Museum, Arc de Triomphe. Visit 2nd level of Eiffel Tower.' },
      { day: 'Day 3: Paris to Zurich Train', desc: 'Travel by high-speed TGV Lyria train to Zurich. Evening free for walking around Zurich lake.' },
      { day: 'Day 4: Zurich to Lucerne & Mount Titlis', desc: 'Travel to Engelberg. Ride the Rotair cable car to Mt Titlis snow park. Return to Lucerne hotel.' },
      { day: 'Day 5: Interlaken Leisure Day', desc: 'Travel to Interlaken. Explore Swiss villages or paraglide over Alps.' },
      { day: 'Day 6: Jungfraujoch Excursion', desc: 'Optional cogwheel train trip to Jungfraujoch - Top of Europe. Incredible glacier views.' },
      { day: 'Day 7: Swiss Lakes to Paris', desc: 'Return train back to Paris or onward flight transfer.' }
    ],
    inclusions: ['4-Star Stays', 'Swiss Rail Card', 'Eiffel Tower Tickets', 'Seine Cruise tickets']
  },
  {
    id: 8,
    name: 'Romantic Weekend Escape to Udaipur',
    category: 'Weekend Getaway',
    duration: '2 Nights / 3 Days',
    destinations: 'Udaipur, Chittorgarh Fort',
    price: 9999,
    highlights: ['Lake Pichola evening boat cruise', 'City Palace & Jagdish temple visit', 'Day excursion to Chittorgarh Fort', 'Romantic Lake-side Dinner booking'],
    emi: false,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    itinerary: [
      { day: 'Day 1: Udaipur Lake Arrival', desc: 'Arrive in Udaipur. Check-in at hotel. Evening boat ride in Lake Pichola with sunset views.' },
      { day: 'Day 2: City Palace & Local sightseeing', desc: 'Visit Udaipur City Palace, Saheliyon-ki-Bari gardens. Evening view of Monsoon Palace.' },
      { day: 'Day 3: Chittorgarh tour & Departure', desc: 'Check-out, visit historic Chittorgarh Fort (Vijay Stambh). Drop-off at Udaipur station.' }
    ],
    inclusions: ['Boutique hotel Stay', 'Daily Breakfasts', 'Lake Pichola boat cruise', 'Private Cab']
  }
];

export default function Packages() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [budgetFilter, setBudgetFilter] = useState('All');

  // Modals state
  const [bookingModal, setBookingModal] = useState(false);
  const [itineraryModal, setItineraryModal] = useState(false);
  const [selectedPkg, setSelectedPkg] = useState(null);

  // Booking Form state
  const [bookingData, setBookingData] = useState({ name: '', email: '', phone: '', date: '', guests: 1 });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Sync route category param if any
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  // Filter packages based on search query, category, and budget
  const filteredPackages = packagesList.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          pkg.destinations.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    
    let matchesBudget = true;
    if (budgetFilter === 'under30k') {
      matchesBudget = pkg.price < 30000;
    } else if (budgetFilter === '30k-50k') {
      matchesBudget = pkg.price >= 30000 && pkg.price <= 50000;
    } else if (budgetFilter === 'above50k') {
      matchesBudget = pkg.price > 50000;
    }

    return matchesSearch && matchesCategory && matchesBudget;
  });

  const handleOpenBooking = (pkg) => {
    setSelectedPkg(pkg);
    setBookingModal(true);
  };

  const handleOpenItinerary = (pkg) => {
    setSelectedPkg(pkg);
    setItineraryModal(true);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (bookingData.name && bookingData.phone && bookingData.date) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setBookingModal(false);
        setBookingData({ name: '', email: '', phone: '', date: '', guests: 1 });
      }, 3000);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--bg-secondary)' }}>
      {/* Page Header banner */}
      <section className="packages-header">
        <div className="container">
          <h1>Explore Tour Packages</h1>
          <p>Carefully crafted itineraries for domestic retreats, spiritual walks, and international escapes.</p>
        </div>
      </section>

      {/* Search and Filters container */}
      <div className="container">
        <div className="search-filter-container">
          <div className="search-inputs-row">
            <div className="search-box-wrapper">
              <Compass className="search-icon-inside" size={20} />
              <input 
                type="text" 
                className="form-control" 
                placeholder="Search packages by destination (e.g. Bali, Kashmir, Udaipur)..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="select-filter-wrapper">
              <select 
                className="form-control"
                value={budgetFilter}
                onChange={(e) => setBudgetFilter(e.target.value)}
              >
                <option value="All">All Budgets / Person</option>
                <option value="under30k">Under ₹30,000</option>
                <option value="30k-50k">₹30,000 - ₹50,000</option>
                <option value="above50k">Above ₹50,000</option>
              </select>
            </div>
          </div>

          {/* Category tabs list */}
          <div className="tabs-wrapper">
            {['All', 'Domestic', 'International', 'Honeymoon', 'Pilgrimage', 'Group Tour', 'Weekend Getaway'].map((cat) => (
              <button 
                key={cat}
                className={`tab-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card Grid rendering packages */}
        {filteredPackages.length > 0 ? (
          <div className="packages-grid">
            {filteredPackages.map((pkg) => (
              <div key={pkg.id} className="package-card">
                <div className="card-img-wrapper">
                  <img src={pkg.image} alt={pkg.name} className="card-img" />
                  <div className="card-badges">
                    <span className="badge badge-teal">{pkg.category}</span>
                    {pkg.emi ? (
                      <span className="emi-badge">
                        EMI Available
                        <span className="emi-tooltip">{pkg.emiDetails}</span>
                      </span>
                    ) : null}
                  </div>
                  <div style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}>
                    <span className="duration-tag">{pkg.duration}</span>
                  </div>
                </div>

                <div className="card-body">
                  <h3 className="card-pkg-name">{pkg.name}</h3>
                  <div className="card-destinations">
                    <MapPin size={14} /> {pkg.destinations}
                  </div>

                  <ul className="card-highlights">
                    {pkg.highlights.map((hl, idx) => (
                      <li key={idx}>
                        <Check size={14} className="highlight-bullet" />
                        {hl}
                      </li>
                    ))}
                  </ul>

                  <div className="card-footer-row">
                    <div className="price-box">
                      <span className="price-label">Starting Price</span>
                      <span className="price-amount">₹{pkg.price.toLocaleString('en-IN')} <span>/person</span></span>
                    </div>
                    <div className="btn-row">
                      <button className="btn btn-secondary btn-sm" onClick={() => handleOpenItinerary(pkg)} style={{ padding: '0.6rem 1rem', fontSize: '0.8rem' }}>
                        Itinerary
                      </button>
                      <button className="btn btn-primary btn-sm" onClick={() => handleOpenBooking(pkg)} style={{ padding: '0.6rem 1.2rem', fontSize: '0.8rem' }}>
                        Book Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
            <Compass size={48} style={{ strokeWidth: 1.5, marginBottom: '1rem', color: 'var(--primary-teal)' }} />
            <h3>No Packages Found</h3>
            <p>Try resetting the search terms, budget pricing, or categories filters.</p>
          </div>
        )}
      </div>

      {/* ==========================================
          ITINERARY DETAILS MODAL DIALOG
          ========================================== */}
      {itineraryModal && selectedPkg && (
        <div className="modal-overlay" onClick={() => setItineraryModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setItineraryModal(false)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <h2 className="modal-title">Detailed Itinerary</h2>
              <span style={{ fontSize: '0.9rem', color: 'var(--primary-teal)', fontWeight: 'bold' }}>{selectedPkg.name}</span>
            </div>
            <div className="modal-body">
              <div className="itinerary-day-list">
                {selectedPkg.itinerary.map((it, idx) => (
                  <div key={idx} className="itinerary-day">
                    <div className="day-header">{it.day}</div>
                    <div className="day-desc">{it.desc}</div>
                  </div>
                ))}
              </div>

              <div className="itinerary-inclusions">
                <div className="inclusions-title">Package Inclusions:</div>
                <div className="inclusions-grid">
                  {selectedPkg.inclusions.map((inc, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <Check size={14} style={{ color: '#22c55e' }} /> {inc}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================
          BOOKING FORM MODAL DIALOG
          ========================================== */}
      {bookingModal && selectedPkg && (
        <div className="modal-overlay" onClick={() => setBookingModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <button className="modal-close-btn" onClick={() => setBookingModal(false)}>
              <X size={24} />
            </button>
            <div className="modal-header">
              <h2 className="modal-title">Book Package</h2>
              <span style={{ fontSize: '0.85rem', color: 'var(--primary-teal)', fontWeight: 'bold' }}>
                {selectedPkg.name} (₹{selectedPkg.price.toLocaleString('en-IN')}/person)
              </span>
            </div>
            <div className="modal-body">
              {bookingSuccess ? (
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <span style={{ fontSize: '3rem' }}>🎉</span>
                  <h3 style={{ color: '#166534', margin: '1rem 0' }}>Booking Request Received!</h3>
                  <p style={{ color: 'var(--text-muted)' }}>
                    Thank you. A travel associate will connect on WhatsApp (+91 98765 43210) to finalize payment and dispatch flight tickets.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      placeholder="Your name" 
                      value={bookingData.name}
                      onChange={(e) => setBookingData({ ...bookingData, name: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">WhatsApp Number *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="e.g. +91 98765 43210" 
                      value={bookingData.phone}
                      onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                      required 
                    />
                  </div>
                  <div className="form-row">
                    <div className="form-group" style={{ flexGrow: 1 }}>
                      <label className="form-label">Date of Travel *</label>
                      <input 
                        type="date" 
                        className="form-control" 
                        value={bookingData.date}
                        onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="form-group" style={{ flexGrow: 1 }}>
                      <label className="form-label">No. of Travelers *</label>
                      <input 
                        type="number" 
                        className="form-control" 
                        min="1" 
                        max="30"
                        value={bookingData.guests}
                        onChange={(e) => setBookingData({ ...bookingData, guests: parseInt(e.target.value) || 1 })}
                        required 
                      />
                    </div>
                  </div>
                  
                  {/* Total calculation indicator */}
                  <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '1rem', borderRadius: '6px', marginBottom: '1.5rem', border: '1px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.25rem' }}>
                      <span>Estimated Price ({bookingData.guests} pax):</span>
                      <strong style={{ color: 'var(--primary-teal-dark)' }}>
                        ₹{(selectedPkg.price * bookingData.guests).toLocaleString('en-IN')}
                      </strong>
                    </div>
                    {selectedPkg.emi && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.75rem', color: 'var(--accent-gold-dark)', fontWeight: 'bold' }}>
                        <CreditCard size={12} /> Easy monthly EMIs available starting from ₹{(6250 * bookingData.guests).toLocaleString('en-IN')}/mo.
                      </div>
                    )}
                  </div>

                  <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                    <Send size={16} /> Confirm Booking Request
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
