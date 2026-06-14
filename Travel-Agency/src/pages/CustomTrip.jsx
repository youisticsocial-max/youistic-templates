import React, { useState } from 'react';
import { Calendar, Users, DollarSign, MapPin, Send } from 'lucide-react';
import './CustomTrip.css';

export default function CustomTrip() {
  const [formData, setFormData] = useState({
    destination: '',
    departure: '',
    persons: 1,
    duration: '',
    budget: '',
    interests: ''
  });
  const [discount, setDiscount] = useState(0);
  const [submitted, setSubmitted] = useState(false);

  // Simple tiered discount: 5-9 pax = 5% ; 10+ pax = 15%
  const calculateDiscount = (people) => {
    if (people >= 10) return 15;
    if (people >= 5) return 5;
    return 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    if (name === 'persons') {
      const people = parseInt(value, 10) || 1;
      setDiscount(calculateDiscount(people));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Reset after few seconds
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="custom-trip-section" style={{ backgroundColor: 'var(--bg-secondary)', padding: '4rem 0' }}>
      <div className="container">
        <h2 className="section-title" style={{ textAlign: 'center', marginBottom: '2rem' }}>Plan Your Custom Trip</h2>
        <form className="custom-trip-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Destination *</label>
            <input
              type="text"
              name="destination"
              className="form-control"
              placeholder="e.g. Bali, Switzerland, Rajasthan"
              value={formData.destination}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Departure Date *</label>
              <input
                type="date"
                name="departure"
                className="form-control"
                value={formData.departure}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">No. of Persons *</label>
              <input
                type="number"
                name="persons"
                className="form-control"
                min="1"
                max="50"
                value={formData.persons}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Duration (N Nights / M Days)</label>
              <input
                type="text"
                name="duration"
                className="form-control"
                placeholder="e.g. 5 Nights / 6 Days"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <label className="form-label">Budget per Person (₹)</label>
              <input
                type="number"
                name="budget"
                className="form-control"
                placeholder="e.g. 25000"
                value={formData.budget}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Special Interests / Highlights</label>
            <textarea
              name="interests"
              className="form-control"
              rows={3}
              placeholder="e.g. adventure sports, beach relaxation, cultural tours"
              value={formData.interests}
              onChange={handleChange}
            ></textarea>
          </div>
          {/* Discount info */}
          {discount > 0 && (
            <div className="form-group" style={{ backgroundColor: 'var(--accent-gold-soft)', padding: '1rem', borderRadius: 'var(--border-radius-sm)', marginBottom: '1.5rem' }}>
              <strong>Group Discount Applied:</strong> {discount}% off the total package price (based on {formData.persons} travelers).
            </div>
          )}
          <button type="submit" className="btn btn-primary btn-sm" style={{ width: '100%' }}>
            <Send size={16} /> Submit Your Custom Trip Request
          </button>
          {submitted && (
            <div className="form-success-alert" style={{ marginTop: '1rem' }}>
              🎉 Thank you! Our travel experts will contact you on WhatsApp shortly with a personalized itinerary.
            </div>
          )}
        </form>
      </div>
    </section>
  );
}
