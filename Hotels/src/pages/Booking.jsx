import React, { useState, useEffect } from 'react';
import './Booking.css';

const Booking = () => {
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    rooms: '1',
    adults: '2',
    children: '0',
    roomType: 'Deluxe AC Room',
    name: '',
    phone: '',
    email: ''
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        alert('Failed to submit booking enquiry.');
      }
    } catch (err) {
      console.error(err);
      alert('Error connecting to server. Please try again later.');
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-header">
        <div className="booking-overlay"></div>
        <div className="booking-header-content">
          <h1>Make a Reservation</h1>
          <p>Book direct to get the best rates and exclusive offers.</p>
        </div>
      </div>

      <div className="container booking-container">
        <div className="booking-badge text-center">
          <h3>🌟 Book Direct & Save 10%</h3>
          <p>Enjoy exclusive discounts when you book directly through our website.</p>
        </div>

        <div className="booking-content">
          {submitted ? (
            <div className="success-message text-center">
              <h2>Thank You, {formData.name}!</h2>
              <p>Your booking enquiry has been received.</p>
              <p>Our team will contact you shortly at <strong>{formData.phone}</strong> to confirm your reservation and share payment details.</p>
              <button className="btn btn-primary mt-4" onClick={() => setSubmitted(false)}>Make Another Enquiry</button>
            </div>
          ) : (
            <form className="booking-form" onSubmit={handleSubmit}>
              <h2 className="form-title">Booking Enquiry</h2>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Check-in Date</label>
                  <input type="date" name="checkIn" required onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Check-out Date</label>
                  <input type="date" name="checkOut" required onChange={handleChange} />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Rooms</label>
                  <select name="rooms" value={formData.rooms} onChange={handleChange}>
                    {[1, 2, 3, 4, 5, "6+"].map(num => <option key={num} value={num}>{num}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Adults</label>
                  <select name="adults" value={formData.adults} onChange={handleChange}>
                    {[1, 2, 3, 4, 5, 6, "7+"].map(num => <option key={num} value={num}>{num}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label>Children</label>
                  <select name="children" value={formData.children} onChange={handleChange}>
                    {[0, 1, 2, 3, 4].map(num => <option key={num} value={num}>{num}</option>)}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Room Type Preference</label>
                <select name="roomType" value={formData.roomType} onChange={handleChange}>
                  <option value="Deluxe AC Room">Deluxe AC Room</option>
                  <option value="Super Deluxe Room">Super Deluxe Room</option>
                  <option value="Luxury Suite">Luxury Suite</option>
                  <option value="Family Room">Family Room</option>
                  <option value="Dormitory">Dormitory</option>
                </select>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input type="text" name="name" placeholder="John Doe" required onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="tel" name="phone" placeholder="{{PHONE}}" required onChange={handleChange} />
                </div>
              </div>

              <div className="form-group">
                <label>Email Address (Optional)</label>
                <input type="email" name="email" placeholder="john@example.com" onChange={handleChange} />
              </div>

              <button type="submit" className="btn btn-primary submit-btn">Submit Enquiry</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Booking;
