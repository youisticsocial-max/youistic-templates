'use client';
import { useState } from 'react';
import styles from './Contact.module.css';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceRequested: 'Security Guards',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        serviceRequested: 'Security Guards',
        message: ''
      });
    } catch (err: any) {
      setError(err.message || 'Failed to submit inquiry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBg} />
        <div className={`container ${styles.bannerContainer}`}>
          <p className={styles.bannerLabel}>Contact Command Centre</p>
          <h1 className={styles.bannerTitle}>Connect With Us<br /><span className={styles.gold}>Get Guarded</span></h1>
          <p className={styles.bannerDesc}>Reach out to our security experts for tailored elite security deployment assessments.</p>
        </div>
      </section>

      {/* Main Section */}
      <section className={styles.mainSection}>
        <div className="container">
          <div className={styles.mainGrid}>
            
            {/* Column 1: Info & Map */}
            <div className={styles.infoCol}>
              <div>
                <h2 className={styles.infoSectionTitle}>Headquarters</h2>
                <p className={styles.infoSectionDesc}>
                  Our central command control operations handle deployments across Jodhpur and regional territories 24/7.
                </p>
              </div>

              <div className={styles.infoCardsList}>
                <div className={styles.infoCard}>
                  <div className={styles.iconBox}>📍</div>
                  <div>
                    <h3 className={styles.cardTitle}>Office Address</h3>
                    <p className={styles.cardValue}>
                      Office Number 56, Shravan Deep Apartment, 4th Floor, High Court Colony Road, Near Residency Hotel, Ratanada Road, Jodhpur - 342011
                    </p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconBox}>📞</div>
                  <div>
                    <h3 className={styles.cardTitle}>Phone Number</h3>
                    <p className={styles.cardValue}>
                      <a href="tel:9845209643" className={styles.cardLink}>+91 98452 09643</a> (Emergency & Inquiries)
                    </p>
                  </div>
                </div>

                <div className={styles.infoCard}>
                  <div className={styles.iconBox}>✉️</div>
                  <div>
                    <h3 className={styles.cardTitle}>Email Address</h3>
                    <p className={styles.cardValue}>
                      <a href="mailto:info@ibpss.in" className={styles.cardLink}>info@ibpss.in</a>
                    </p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className={styles.mapBox}>
                <iframe
                  className={styles.iframe}
                  title="IBPSS Jodhpur Office"
                  src="https://maps.google.com/maps?q=Shravan%20Deep%20Apartment,%20Ratanada%20Road,%20Jodhpur&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>

            {/* Column 2: Contact Form */}
            <div className={styles.formCol}>
              <h2 className={styles.formTitle}>Send Secure Message</h2>
              <p className={styles.formDesc}>
                Fill out the secure communication request below, and a security commander will contact you shortly.
              </p>

              {success && (
                <div className={styles.successBox}>
                  <strong>✓ Secure transmission received.</strong> Our security coordinator will review your request and call/email you within 2 hours.
                </div>
              )}

              {error && (
                <div className={styles.errorBox}>
                  <strong>✗ Transmission failed.</strong> {error}
                </div>
              )}

              {!success && (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name-input" className={styles.label}>Full Name</label>
                      <input
                        id="name-input"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="e.g. Rajesh Singhania"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone-input" className={styles.label}>Phone Number</label>
                      <input
                        id="phone-input"
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="e.g. 9845209643"
                      />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="email-input" className={styles.label}>Email Address</label>
                      <input
                        id="email-input"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className={styles.input}
                        placeholder="e.g. client@example.com"
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="service-select" className={styles.label}>Service Required</label>
                      <select
                        id="service-select"
                        name="serviceRequested"
                        value={formData.serviceRequested}
                        onChange={handleChange}
                        className={styles.select}
                      >
                        <option value="Security Guards">Security Guards</option>
                        <option value="Professional Bouncers">Professional Bouncers</option>
                        <option value="Gunman Services">Gunman Services</option>
                        <option value="Personal Security Officer (PSO)">Personal Security Officer (PSO)</option>
                        <option value="Event Security">Event Security</option>
                      </select>
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message-textarea" className={styles.label}>Message Details</label>
                    <textarea
                      id="message-textarea"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className={styles.textarea}
                      placeholder="Please detail your security requirements, location, duration, and urgency..."
                    />
                  </div>

                  <button
                    id="contact-submit-btn"
                    type="submit"
                    disabled={loading}
                    className={`btn btn-gold ${styles.submitBtn}`}
                  >
                    {loading ? 'Sending Transmission...' : 'Transmit Secure Request'}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
