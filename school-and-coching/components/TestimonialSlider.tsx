"use client";
import { useState, useEffect, useCallback } from "react";
import { testimonials } from "@/data/testimonials";
import "./TestimonialSlider.css";

export default function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="testimonial-section section section-alt">
      <div className="container">
        <div className="section-header">
          <span className="section-label">Testimonials</span>
          <h2 className="section-title">What Parents & Students Say</h2>
          <p className="section-subtitle">
            Read stories of transformation, support, and success from our community members.
          </p>
        </div>

        <div className="testimonial-slider-container">
          <div className="testimonial-track-wrapper">
            <div
              className="testimonial-track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((t) => (
                <div className="testimonial-slide" key={t.id}>
                  <div className="testimonial-card card card-glass">
                    <div className="testimonial-quote-icon">“</div>
                    <p className="testimonial-text">{t.text}</p>
                    <div className="testimonial-footer">
                      <div className="testimonial-avatar">
                        {t.name.charAt(0)}
                      </div>
                      <div className="testimonial-meta">
                        <h4 className="testimonial-name">{t.name}</h4>
                        <span className="testimonial-role">{t.role}</span>
                      </div>
                      <div className="stars">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <span key={i}>★</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <button className="slider-btn prev-btn" onClick={prevSlide} aria-label="Previous testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
          </button>
          <button className="slider-btn next-btn" onClick={nextSlide} aria-label="Next testimonial">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>

          {/* Indicators */}
          <div className="testimonial-indicators">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`indicator-dot ${index === activeIndex ? "active" : ""}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
