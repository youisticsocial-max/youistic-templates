import React, { useState } from 'react';
import { Calendar, Phone, CheckCircle, Clock, ShieldCheck } from 'lucide-react';

const treatmentOptions = [
  "General Check-up",
  "Braces & Aligners",
  "Teeth Whitening",
  "Root Canal Treatment",
  "Dental Implants",
  "Gum Treatment",
  "Pediatric Dentistry"
];

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    treatment: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Set today's date as the minimum selectable date
  const todayStr = new Date().toISOString().split('T')[0];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!formData.name.trim()) tempErrors.name = "Full name is required.";
    
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!formData.phone.trim()) {
      tempErrors.phone = "Phone number is required.";
    } else if (!phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Please enter a valid 10-digit Indian phone number.";
    }

    if (!formData.date) {
      tempErrors.date = "Please select an appointment date.";
    } else if (new Date(formData.date) < new Date(todayStr)) {
      tempErrors.date = "Date cannot be in the past.";
    }

    if (!formData.treatment) {
      tempErrors.treatment = "Please select a treatment type.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        setIsSubmitted(true);
      }, 1200);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      phone: '',
      date: '',
      treatment: '',
    });
    setIsSubmitted(false);
  };

  return (
    <section id="appointment" className="section appointment-section">
      <div className="container">
        <div className="appointment-grid-layout">
          {/* Left: Info Card */}
          <div className="appointment-info-col">
            <span className="section-badge">Book Slot</span>
            <h2 className="section-title">
              Request Your <span>Free Consultation</span>
            </h2>
            <p className="app-main-desc">
              Fill out the form to book an appointment. Our patient coordinator will call you back within 15 minutes to confirm your preferred time slot.
            </p>

            <div className="appointment-assurance-list">
              <div className="assurance-item">
                <Clock className="assur-icon" size={20} />
                <div>
                  <h5>Flexible Timing</h5>
                  <p>Open Mon-Sat 9am to 8pm. Choose any convenient slot.</p>
                </div>
              </div>
              <div className="assurance-item">
                <ShieldCheck className="assur-icon" size={20} />
                <div>
                  <h5>Instant Confirmation</h5>
                  <p>Confirmation and doctor details will be sent directly to your phone.</p>
                </div>
              </div>
            </div>

            <div className="direct-call-assurance">
              <p>Prefer booking over phone?</p>
              <a href="tel:{{PHONE}}" className="direct-call-btn">
                <Phone size={18} />
                <span>Call {{PHONE}}</span>
              </a>
            </div>
          </div>

          {/* Right: Booking Form */}
          <div className="appointment-form-col">
            <div className="appointment-form-card">
              {isSubmitted ? (
                /* Success State Card */
                <div className="booking-success-card">
                  <div className="success-icon-badge">
                    <CheckCircle size={48} />
                  </div>
                  <h3>Appointment Requested!</h3>
                  <p className="success-thankyou">
                    Thank you, <strong>{formData.name}</strong>. We have received your booking request for <strong>{formData.treatment}</strong>.
                  </p>
                  
                  <div className="success-details-box">
                    <div className="detail-line">
                      <span>Patient Name:</span>
                      <strong>{formData.name}</strong>
                    </div>
                    <div className="detail-line">
                      <span>Selected Date:</span>
                      <strong>{new Date(formData.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                    </div>
                    <div className="detail-line">
                      <span>Treatment:</span>
                      <strong>{formData.treatment}</strong>
                    </div>
                  </div>

                  <p className="success-next-step">
                    Our coordinator will call you shortly on <strong>+91 {formData.phone}</strong> to lock in the exact hour.
                  </p>

                  <button className="btn btn-primary btn-full" onClick={resetForm}>
                    Book Another Slot
                  </button>
                </div>
              ) : (
                /* Active Form State */
                <form onSubmit={handleSubmit} noValidate>
                  <h3 className="form-heading">Online Registration</h3>
                  <p className="form-subheading">Enter details below to claim your free check-up voucher.</p>
                  
                  {/* Name Input */}
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name"
                      name="name" 
                      placeholder="e.g. Ramesh Kumar"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={errors.name ? 'input-error' : ''}
                    />
                    {errors.name && <span className="error-text">{errors.name}</span>}
                  </div>

                  {/* Phone Input */}
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-wrap">
                      <span className="phone-prefix">+91</span>
                      <input 
                        type="tel" 
                        id="phone"
                        name="phone" 
                        maxLength={10}
                        placeholder="10-digit mobile number"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={errors.phone ? 'input-error' : ''}
                      />
                    </div>
                    {errors.phone && <span className="error-text">{errors.phone}</span>}
                  </div>

                  {/* Date Input */}
                  <div className="form-group">
                    <label htmlFor="date">Preferred Date</label>
                    <input 
                      type="date" 
                      id="date"
                      name="date" 
                      min={todayStr}
                      value={formData.date}
                      onChange={handleInputChange}
                      className={errors.date ? 'input-error' : ''}
                    />
                    {errors.date && <span className="error-text">{errors.date}</span>}
                  </div>

                  {/* Treatment Dropdown */}
                  <div className="form-group">
                    <label htmlFor="treatment">Treatment Required</label>
                    <select 
                      id="treatment"
                      name="treatment"
                      value={formData.treatment}
                      onChange={handleInputChange}
                      className={errors.treatment ? 'input-error' : ''}
                    >
                      <option value="">-- Choose Treatment --</option>
                      {treatmentOptions.map((opt, i) => (
                        <option key={i} value={opt}>{opt}</option>
                      ))}
                    </select>
                    {errors.treatment && <span className="error-text">{errors.treatment}</span>}
                  </div>

                  {/* Submit Button */}
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-full btn-submit"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="spinner">Processing...</span>
                    ) : (
                      <>
                        <Calendar size={18} />
                        <span>Book Appointment Now</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
