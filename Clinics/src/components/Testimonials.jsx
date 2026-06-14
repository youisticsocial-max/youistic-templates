import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Rajesh Gehlot",
    treatment: "Dental Implants",
    rating: 5,
    text: "I was extremely nervous about getting dental implants, but {{CLINIC_NAME}} and his staff made it completely pain-free. The explanation using 3D models helped build trust. The implant feels and looks just like my natural teeth!",
    date: "May 2026",
    location: "Jodhpur"
  },
  {
    name: "Pooja Bhati",
    treatment: "Clear Aligners",
    rating: 5,
    text: "My invisible aligner treatment here was outstanding. The clinic is incredibly clean and modern. Dr. Amit Sharma explained each step patiently. The zero-cost EMI plans made this high-end treatment highly affordable for me.",
    date: "April 2026",
    location: "Jodhpur"
  },
  {
    name: "Vikram Singh",
    treatment: "Root Canal Treatment",
    rating: 5,
    text: "Had a severe toothache and visited for emergency root canal treatment. {{CLINIC_NAME}} performed a painless, single-visit root canal in under 45 minutes. The technology they use is state-of-the-art. Highly professional!",
    date: "June 2026",
    location: "Jodhpur"
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Auto-play testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="section testimonial-section">
      <div className="container">
        <div className="section-header text-center">
          <span className="section-badge">Patient Reviews</span>
          <h2 className="section-title">
            What Our <span>Patients Say</span>
          </h2>
          <p>
            We take pride in delivering healthy smiles. Read real stories of patients who experienced comfortable, high-quality dental care with us.
          </p>
        </div>

        {/* Testimonial Carousel Container */}
        <div className="testimonial-slider-container">
          <div className="testimonial-quote-icon">
            <Quote size={80} />
          </div>

          <div className="testimonial-slider">
            {testimonials.map((t, idx) => (
              <div 
                key={idx} 
                className={`testimonial-slide ${idx === activeIndex ? 'active' : ''}`}
                style={{
                  display: idx === activeIndex ? 'block' : 'none',
                  opacity: idx === activeIndex ? 1 : 0,
                  transition: 'opacity 0.6s ease'
                }}
              >
                {/* Star Rating */}
                <div className="star-rating">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>

                <p className="testimonial-text">"{t.text}"</p>

                <div className="testimonial-patient-info">
                  <div className="patient-avatar">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="patient-name">{t.name}</h4>
                    <span className="patient-treatment">{t.treatment} &bull; {t.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="slider-nav">
            <button className="slider-btn prev-btn" onClick={handlePrev} aria-label="Previous Testimonial">
              <ChevronLeft size={20} />
            </button>
            
            <div className="slider-dots">
              {testimonials.map((_, idx) => (
                <button 
                  key={idx} 
                  className={`slider-dot ${idx === activeIndex ? 'active' : ''}`}
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                />
              ))}
            </div>

            <button className="slider-btn next-btn" onClick={handleNext} aria-label="Next Testimonial">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Bottom Trust Row */}
        <div className="testimonial-bottom-badge">
          <span>Google Review Rating: <strong>4.9/5.0</strong> based on 500+ verified ratings.</span>
        </div>
      </div>
    </section>
  );
}
