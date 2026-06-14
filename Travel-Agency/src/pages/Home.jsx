import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, ShieldCheck, Users, Headphones, BadgePercent, Settings, 
  ChevronLeft, ChevronRight, Star, Plane, Hotel, Landmark, CreditCard, 
  Map, Phone, Mail, Clock, Send, Ticket, Award, Copy, Check 
} from 'lucide-react';
import './Home.css';

const destinationsList = [
  {
    id: 1,
    title: 'Scenic Kashmir',
    subtitle: 'Paradise on Earth',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1566837945700-30057527ade0?auto=format&fit=crop&w=600&q=80',
    gridClass: 'large',
  },
  {
    id: 2,
    title: 'Exotic Bali',
    subtitle: 'Tropical Island Escape',
    tag: 'Adventure',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
    gridClass: 'medium',
  },
  {
    id: 3,
    title: 'Golden Rajasthan',
    subtitle: 'Heritage & Forts Tour',
    tag: 'Cultural',
    image: 'https://images.unsplash.com/photo-1477584322904-48618db530c2?auto=format&fit=crop&w=600&q=80',
    gridClass: 'medium',
  },
  {
    id: 4,
    title: 'Sunny Goa Beaches',
    subtitle: 'Fun & Nightlife Getaway',
    tag: 'Beach',
    image: 'https://images.unsplash.com/photo-1512100356356-de1b84283e18?auto=format&fit=crop&w=600&q=80',
    gridClass: 'small',
  },
  {
    id: 5,
    title: 'Vibrant Dubai',
    subtitle: 'Skyscrapers & Desert Safaris',
    tag: 'Luxury',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
    gridClass: 'small',
  },
  {
    id: 6,
    title: 'Amazing Thailand',
    subtitle: 'Temples & Street Food',
    tag: 'Honeymoon',
    image: 'https://images.unsplash.com/photo-1528181304800-2f5402c40eBF?auto=format&fit=crop&w=600&q=80',
    gridClass: 'large',
  }
];

const testimonials = [
  {
    quote: "We booked our 10-day family trip to Kashmir with {{CLINIC_NAME}}. Everything from the houseboat stay in Srinagar to the taxi arrangements was spot-on. The local tour guides they arranged were extremely polite and professional. Highly recommended!",
    name: "Rajesh & Priya Sharma",
    dest: "Srinagar & Gulmarg Tour",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "Our honeymoon in Bali was absolutely magical. The customized package had a perfect balance of privacy, beach time, and guided sight-seeing. The candlelight dinner arrangements on Jimbaran beach was a beautiful surprise. Thank you, {{CLINIC_NAME}}!",
    name: "Arjun & Sneha Verma",
    dest: "Bali Honeymoon Escape",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
  },
  {
    quote: "Organized a corporate group trip of 15 members to Goa. {{CLINIC_NAME}} got us amazing discount rates at a 5-star hotel and handled air tickets seamlessly. The coordination was 24/7. Not a single hassle during the entire trip.",
    name: "Dr. Aditya Singh",
    dest: "Goa Corporate Retreat",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80"
  }
];

const photoGallery = [
  { img: 'https://images.unsplash.com/photo-1534008897995-27a23e859048?auto=format&fit=crop&w=400&q=80', title: 'Happy Couple, Maldives' },
  { img: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=400&q=80', title: 'Road Trip in Ladakh' },
  { img: 'https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=400&q=80', title: 'Friends Trekking, Himachal' },
  { img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=400&q=80', title: 'Sightseeing in Europe' }
];

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [copied, setCopied] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [contactData, setContactData] = useState({ name: '', email: '', phone: '', message: '' });

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const copyCoupon = () => {
    navigator.clipboard.writeText('EARLYBIRD2026');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Validate and submit
    if (contactData.name && contactData.phone && contactData.message) {
      setFormSubmitted(true);
      setContactData({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => setFormSubmitted(false), 5000);
    }
  };

  return (
    <div>
      {/* 1. HERO SECTION */}
      <section className="hero">
        <div className="container">
          <div className="hero-content animate-fade-in-up">
            <span className="hero-tagline">{{CLINIC_NAME}}</span>
            <h1 className="hero-title">
              Explore the World, <span>Your Way.</span>
            </h1>
            <p className="hero-desc">
              Discover beautiful destinations, premium hospitality, and tailor-made itineraries. Registered with IATA and Tourism Department, bringing you the safest and most exciting adventures.
            </p>
            <div className="hero-btns">
              <Link to="/custom-trip" className="btn btn-gold">
                <Compass size={18} /> Plan My Custom Trip
              </Link>
              <Link to="/packages" className="btn btn-white">
                View Tour Packages
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. POPULAR DESTINATIONS */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Wanderlust Destinations</span>
            <h2 className="section-title">Popular Escapes</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Handpicked destinations that offer the perfect blend of natural beauty, adventure, and rich cultural experiences.
            </p>
          </div>

          <div className="destinations-grid">
            {destinationsList.map((dest) => (
              <div key={dest.id} className={`dest-card ${dest.gridClass}`}>
                <img src={dest.image} alt={dest.title} className="dest-card-img" />
                <div className="dest-overlay">
                  <span className="badge badge-gold dest-tag">{dest.tag}</span>
                  <h3 className="dest-title">{dest.title}</h3>
                  <span className="dest-subtitle">{dest.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHY CHOOSE US */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">The {{CLINIC_NAME}} Guarantee</span>
            <h2 className="section-title">Why Choose {{CLINIC_NAME}}?</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              We are dedicated to offering seamless, transparent, and exciting travel solutions for families, groups, and solo explorers.
            </p>
          </div>

          <div className="why-grid">
            <div className="why-card">
              <div className="why-icon-box">
                <ShieldCheck size={28} />
              </div>
              <h3 className="why-title">IATA Registered</h3>
              <p className="why-desc">Full compliance with international airline association standards. Registered agent of DOT, Govt of Rajasthan.</p>
            </div>
            
            <div className="why-card">
              <div className="why-icon-box">
                <Users size={28} />
              </div>
              <h3 className="why-title">1,000+ Happy Travelers</h3>
              <p className="why-desc">Providing exceptional tour hosting, local assistance, and five-star client feedback since 2018.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <Headphones size={28} />
              </div>
              <h3 className="why-title">24/7 Helpline Support</h3>
              <p className="why-desc">Always connected during your transit. Get real-time help regarding flight shifts, hotel check-ins, or route edits.</p>
            </div>

            <div className="why-card">
              <div className="why-icon-box">
                <Settings size={28} />
              </div>
              <h3 className="why-title">Customizable Packages</h3>
              <p className="why-desc">Modify any hotel category, add sightseeing tours, or change duration. We build itineraries exactly as you wish.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CURRENT OFFERS */}
      <section className="section" style={{ padding: '2rem 0' }}>
        <div className="container">
          <div className="offer-banner">
            <div className="offer-pattern"></div>
            <span className="offer-badge">Limited Time Offer</span>
            <h2 className="offer-title">Early Bird discount of 10% Off!</h2>
            <p className="offer-desc">
              Book any international package or honeymoon bundle at least 45 days in advance and avail an instant 10% discount on base pricing.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div className="coupon-box">
                Use Code: <span className="coupon-code">EARLYBIRD2026</span>
                <button 
                  onClick={copyCoupon} 
                  style={{ color: 'var(--accent-gold)', display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}
                  title="Copy Coupon Code"
                  aria-label="Copy Coupon Code"
                >
                  {copied ? <Check size={18} style={{ color: '#22c55e' }} /> : <Copy size={18} />}
                </button>
              </div>
              {copied && <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 'bold' }}>Copied to clipboard!</span>}
            </div>
          </div>
        </div>
      </section>

      {/* 5. SERVICES */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Our Services</span>
            <h2 className="section-title">Complete Travel Assistance</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              From entry visas to booking flights, hotels, luxury transportation, and local tours—we take care of all your details.
            </p>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <div className="service-icon-box"><Plane size={20} /></div>
              <div>
                <h3 className="service-title">Air Ticketing</h3>
                <p className="service-desc">Domestic and International flight reservations at competitive corporate rates.</p>
              </div>
            </div>
            
            <div className="service-card">
              <div className="service-icon-box"><Hotel size={20} /></div>
              <div>
                <h3 className="service-title">Hotel Reservations</h3>
                <p className="service-desc">Partnered with 500+ top-rated hotels, boutique properties, and heritage havelis.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon-box"><Landmark size={20} /></div>
              <div>
                <h3 className="service-title">Visa Assistance</h3>
                <p className="service-desc">Expert documentation reviews, quick E-Visa submissions, and appointment bookings.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon-box"><ShieldCheck size={20} /></div>
              <div>
                <h3 className="service-title">Travel Insurance</h3>
                <p className="service-desc">Comprehensive medical coverage, trip cancellation safeguard, and luggage insurance.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon-box"><Settings size={20} /></div>
              <div>
                <h3 className="service-title">Passport Guidance</h3>
                <p className="service-desc">Help with online applications, renewals, tatkaal services, and document validation.</p>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon-box"><Map size={20} /></div>
              <div>
                <h3 className="service-title">Car Rental & Cab Services</h3>
                <p className="service-desc">Premium sedans, SUVs, and luxury tempo travellers with certified tour drivers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. PHOTO GALLERY */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Moments in Frame</span>
            <h2 className="section-title">Happy Travelers Gallery</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Real snapshots from the trips hosted by {{CLINIC_NAME}}.
            </p>
          </div>

          <div className="gallery-grid">
            {photoGallery.map((photo, i) => (
              <div key={i} className="gallery-item">
                <img src={photo.img} alt={photo.title} className="gallery-img" />
                <div className="gallery-overlay">{photo.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS */}
      <section className="section" style={{ backgroundColor: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Traveler Reviews</span>
            <h2 className="section-title">Feedback From Explorers</h2>
          </div>

          <div className="testimonials-slider">
            <div className="testimonial-card">
              <p className="test-quote">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div className="test-user">
                <img 
                  src={testimonials[currentTestimonial].avatar} 
                  alt={testimonials[currentTestimonial].name} 
                  className="test-avatar" 
                />
                <div>
                  <h4 className="test-name">{testimonials[currentTestimonial].name}</h4>
                  <span className="test-dest">{testimonials[currentTestimonial].dest}</span>
                  <div className="rating-stars">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} size={14} fill="currentColor" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="test-nav">
            <button className="test-nav-btn" onClick={prevTestimonial} aria-label="Previous Testimonial">
              <ChevronLeft size={20} />
            </button>
            <button className="test-nav-btn" onClick={nextTestimonial} aria-label="Next Testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* 8. CONTACT & OFFICE */}
      <section className="section">
        <div className="container">
          <div className="section-title-wrapper">
            <span className="section-subtitle">Get In Touch</span>
            <h2 className="section-title">Contact Our Office</h2>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Have questions regarding flight bookings or custom tours? Send us a quick query or drop by our office.
            </p>
          </div>

          <div className="contact-grid">
            {/* Info Col */}
            <div className="contact-info-col">
              <h3>{{CLINIC_NAME}} HQ</h3>
              <p>Located in the heart of Jodhpur city, easily accessible for walk-in consultations and trip planning sessions.</p>
              
              <ul className="contact-details-list">
                <li>
                  <div className="contact-details-icon"><Phone size={18} /></div>
                  <div className="contact-details-text">
                    <strong>Phone Helpline (24/7)</strong>
                    <span>+91 98765 43210</span>
                  </div>
                </li>
                <li>
                  <div className="contact-details-icon"><Mail size={18} /></div>
                  <div className="contact-details-text">
                    <strong>Email Address</strong>
                    <span>info@vibequestjourneys.com</span>
                  </div>
                </li>
                <li>
                  <div className="contact-details-icon"><Clock size={18} /></div>
                  <div className="contact-details-text">
                    <strong>Office Timings</strong>
                    <span>Mon - Sat: 10:00 AM to 07:00 PM</span>
                  </div>
                </li>
              </ul>

              {/* Dynamic CSS Mock Map */}
              <div className="mock-map">
                <div className="map-bg"></div>
                <div className="map-road road-h1"></div>
                <div className="map-road road-h2"></div>
                <div className="map-road road-v1"></div>
                <div className="map-road road-v2"></div>
                <div className="map-park"></div>
                <div className="map-pin-pulse"></div>
                <div className="map-pin">
                  <Compass size={24} style={{ color: 'var(--primary-teal)', fill: '#fff' }} />
                </div>
                <div className="map-tooltip">{{CLINIC_NAME}} HQ</div>
              </div>
            </div>

            {/* Form Col */}
            <div className="contact-form-card">
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.25rem' }}>Send Us A Message</h3>
              {formSubmitted && (
                <div className="form-success-alert">
                  🎉 Thank you for reaching out! A travel expert will connect with you on WhatsApp/Email within 15 minutes.
                </div>
              )}
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Full Name *</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Enter name"
                    value={contactData.name}
                    onChange={(e) => setContactData({ ...contactData, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="form-row">
                  <div className="form-group" style={{ flexGrow: 1 }}>
                    <label className="form-label">Email Address</label>
                    <input 
                      type="email" 
                      className="form-control" 
                      placeholder="Enter email"
                      value={contactData.email}
                      onChange={(e) => setContactData({ ...contactData, email: e.target.value })}
                    />
                  </div>
                  <div className="form-group" style={{ flexGrow: 1 }}>
                    <label className="form-label">WhatsApp/Phone *</label>
                    <input 
                      type="tel" 
                      className="form-control" 
                      placeholder="Phone number"
                      value={contactData.phone}
                      onChange={(e) => setContactData({ ...contactData, phone: e.target.value })}
                      required 
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Your Query / Special Travel Plan *</label>
                  <textarea 
                    rows="4" 
                    className="form-control" 
                    placeholder="e.g. Planning a family trip of 6 persons to Himachal Pradesh in October."
                    value={contactData.message}
                    onChange={(e) => setContactData({ ...contactData, message: e.target.value })}
                    required
                  ></textarea>
                </div>
                <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
                  <Send size={16} /> Send Enquiry Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
