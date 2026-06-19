import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Award, ShieldCheck, CheckCircle } from 'lucide-react';
import { dataStore } from '../utils/dataStore';
import './Schedule.css';

const Schedule = () => {
  const [classes, setClasses] = useState([]);
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [bookingClass, setBookingClass] = useState(null);
  const [bookingForm, setBookingForm] = useState({ name: '', phone: '', email: '' });
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    setClasses(dataStore.getClasses());
    window.scrollTo(0, 0);
  }, []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const filteredClasses = classes.filter(c => c.day.toLowerCase() === selectedDay.toLowerCase());

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setBookingClass(null);
      setBookingForm({ name: '', phone: '', email: '' });
    }, 2000);
  };

  const getDifficultyColor = (level) => {
    switch (level.toLowerCase()) {
      case 'beginner': return '#25d366';
      case 'intermediate': return '#ffaa00';
      case 'advanced': return '#ff3e3e';
      default: return 'var(--accent-color)';
    }
  };

  return (
    <div className="schedule-page">
      {/* Subpage Hero */}
      <section className="page-hero" style={{ backgroundImage: "url('/assets/cardio-zone.jpg')" }}>
        <div className="dark-overlay"></div>
        <div className="container hero-content-box">
          <span className="badge-neon">Club Calendar</span>
          <h1>Class <span>Schedule</span></h1>
          <p>Book your training slots. Filter classes by day of the week and level of athletic intensity.</p>
        </div>
      </section>

      {/* Timetable Section */}
      <section className="section timetable-sec">
        <div className="glowing-bg" style={{ bottom: '20%', right: '10%' }}></div>
        <div className="container">
          {/* Day Selector */}
          <div className="timetable-tabs">
            {days.map((day) => {
              const count = classes.filter(c => c.day.toLowerCase() === day.toLowerCase()).length;
              return (
                <button
                  key={day}
                  className={`timetable-tab-btn ${selectedDay === day ? 'active' : ''}`}
                  onClick={() => setSelectedDay(day)}
                >
                  {day.substring(0, 3)}
                  <span className="class-count-dot">{count}</span>
                </button>
              );
            })}
          </div>

          {/* Classes Grid */}
          <motion.div layout className="grid grid-3 classes-list-grid">
            <AnimatePresence mode="popLayout">
              {filteredClasses.map((item, idx) => (
                <motion.div
                  key={item.id || idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.4 }}
                  className="class-slot-card glass-card"
                >
                  <div className="class-time-header">
                    <Clock size={16} className="clock-icon" />
                    <span>{item.time}</span>
                    <span 
                      className="level-badge"
                      style={{ borderColor: getDifficultyColor(item.level), color: getDifficultyColor(item.level) }}
                    >
                      {item.level}
                    </span>
                  </div>

                  <h3>{item.name}</h3>

                  <div className="class-details-row">
                    <div className="detail-item">
                      <User size={14} className="detail-icon" />
                      <span>{item.trainer}</span>
                    </div>
                    <div className="detail-item">
                      <Award size={14} className="detail-icon" />
                      <span>60 Mins</span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-primary slot-book-btn"
                    onClick={() => setBookingClass(item)}
                  >
                    Reserve Spot
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredClasses.length === 0 && (
            <div className="no-classes-box">
              <p>No classes scheduled for {selectedDay}.</p>
            </div>
          )}
        </div>
      </section>

      {/* Reservation Modal */}
      <AnimatePresence>
        {bookingClass && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="booking-overlay"
            onClick={() => setBookingClass(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="booking-modal-box glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              {bookingSuccess ? (
                <div className="booking-success-view">
                  <CheckCircle size={60} className="success-icon" />
                  <h3>Slot Reserved!</h3>
                  <p>A confirmation SMS with your check-in barcode has been sent.</p>
                </div>
              ) : (
                <>
                  <div className="modal-header">
                    <h3>Confirm Booking</h3>
                    <button className="modal-close" onClick={() => setBookingClass(null)}>&times;</button>
                  </div>
                  
                  <div className="booking-summary-box">
                    <div className="summary-item">
                      <span className="label">Class:</span>
                      <span className="val">{bookingClass.name}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Timing:</span>
                      <span className="val">{bookingClass.day}, {bookingClass.time}</span>
                    </div>
                    <div className="summary-item">
                      <span className="label">Coach:</span>
                      <span className="val">{bookingClass.trainer}</span>
                    </div>
                  </div>

                  <form className="booking-form" onSubmit={handleBookingSubmit}>
                    <div className="form-group">
                      <label className="form-label">Full Name</label>
                      <input 
                        type="text" 
                        required 
                        className="form-control"
                        placeholder="ENTER YOUR NAME"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Phone Number</label>
                      <input 
                        type="tel" 
                        required 
                        className="form-control"
                        placeholder="ENTER PHONE"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address</label>
                      <input 
                        type="email" 
                        required 
                        className="form-control"
                        placeholder="ENTER EMAIL"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                      />
                    </div>

                    <button type="submit" className="btn btn-primary modal-submit-btn">
                      Confirm Spot Reservation
                    </button>
                  </form>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Schedule;
