import React, { useState } from 'react';
import { Search, Globe, FileText, Clock, AlertCircle, CheckCircle, ChevronDown } from 'lucide-react';
import './VisaLookup.css';

const visaData = {
  'Thailand': {
    type: 'Visa on Arrival (VOA)',
    duration: '30 Days',
    processing: '5-10 Minutes at Airport',
    fee: '₹1,800 approx (2000 THB)',
    status: 'easy',
    documents: [
      'Valid Indian Passport (min 6 months validity)',
      'Return flight ticket',
      'Hotel booking confirmation',
      'Passport-size photograph',
      '₹4,000 equivalent in cash (Thai Baht preferred)',
    ],
    notes: 'Visa on arrival available at major airports. Extendable by 30 more days inside Thailand.',
  },
  'Maldives': {
    type: 'Free Visa on Arrival',
    duration: '30 Days',
    processing: 'Instant on Arrival',
    fee: 'FREE',
    status: 'easy',
    documents: [
      'Valid Indian Passport',
      'Return flight ticket',
      'Confirmed hotel/resort booking',
      'Proof of sufficient funds',
    ],
    notes: 'Indian passport holders get a free 30-day tourist visa on arrival. No prior application required.',
  },
  'Dubai (UAE)': {
    type: 'Tourist Visa (Pre-Arrival)',
    duration: '30 / 60 / 90 Days',
    processing: '3-5 Working Days',
    fee: '₹7,000 – ₹14,000 depending on duration',
    status: 'moderate',
    documents: [
      'Valid Indian Passport (min 6 months validity)',
      'Colored scanned copy of passport',
      'Passport-size photo with white background',
      'Travel itinerary / hotel booking',
      'Bank statement (last 3 months)',
      'Employment/Business proof',
    ],
    notes: 'Apply through an airline (Emirates / Flydubai) or approved travel agent. Single and multiple-entry options available.',
  },
  'Singapore': {
    type: 'e-Visa (Online Application)',
    duration: '30 Days',
    processing: '3-7 Working Days',
    fee: '₹2,200 approx (S$30)',
    status: 'moderate',
    documents: [
      'Valid Indian Passport (min 6 months validity)',
      'Confirmed return ticket',
      'Hotel booking',
      'Last 3 months bank statement',
      'Cover letter or Employment certificate',
      'Passport-size photo',
    ],
    notes: 'Apply at the Singapore Immigration & Checkpoints Authority (ICA) or through a travel agent. e-Visa issued via email.',
  },
  'France (Schengen)': {
    type: 'Schengen Visa',
    duration: 'Up to 90 Days',
    processing: '15-30 Working Days',
    fee: '₹7,200 approx (€80)',
    status: 'complex',
    documents: [
      'Valid Indian Passport (min 3 months beyond travel)',
      'Schengen Visa application form',
      '2 recent biometric photos',
      'Travel insurance (min €30,000 coverage)',
      'Flight and hotel bookings',
      'Bank statements (last 6 months)',
      'Income Tax Returns (last 2 years)',
      'Employment letter or Business proof',
      'No-objection certificate (if employed)',
    ],
    notes: 'France VFS Global handles applications in India. Book an appointment early. Schengen visa allows travel across 26 European countries.',
  },
  'Switzerland': {
    type: 'Schengen Visa',
    duration: 'Up to 90 Days',
    processing: '15-30 Working Days',
    fee: '₹7,200 approx (€80)',
    status: 'complex',
    documents: [
      'Valid Indian Passport',
      'Schengen application form',
      'Biometric photographs',
      'Travel insurance (€30,000 coverage)',
      'Confirmed itinerary and hotel bookings',
      'Bank statements (6 months)',
      'Proof of employment / Income',
    ],
    notes: 'Apply at the Swiss Consulate via VFS Global. Same Schengen visa as France — covers all 26 Schengen countries.',
  },
  'Nepal': {
    type: 'Visa on Arrival (Free for Indians)',
    duration: 'Unlimited Stay',
    processing: 'Instant on Arrival',
    fee: 'FREE',
    status: 'easy',
    documents: [
      'Valid Indian Passport OR Voter ID card',
      'No visa required for Indian citizens',
    ],
    notes: 'Indian citizens do not need a passport or visa to enter Nepal. A voter ID card is sufficient for travel.',
  },
  'Sri Lanka': {
    type: 'Electronic Travel Authorization (ETA)',
    duration: '30 Days',
    processing: '24-72 Hours',
    fee: '₹2,800 approx (USD 35)',
    status: 'easy',
    documents: [
      'Valid Indian Passport',
      'Confirmed return flight ticket',
      'Hotel booking confirmation',
      'Online ETA application (eta.gov.lk)',
    ],
    notes: 'Apply for the Sri Lanka ETA online at eta.gov.lk before travel. ETA is approved within 24-72 hours to your email.',
  },
  'Malaysia': {
    type: 'eNTRI / e-Visa (Free for Indians)',
    duration: '15 Days',
    processing: '1-3 Working Days',
    fee: 'FREE (eNTRI) / RM 50 for e-Visa',
    status: 'easy',
    documents: [
      'Valid Indian Passport (min 6 months)',
      'Return flight ticket',
      'Hotel booking',
      'Online eNTRI or e-Visa application',
    ],
    notes: 'Indians can use the free eNTRI (Electronic Travel Registration & Information) for up to 15 days. Apply at windowmalaysia.my.',
  },
  'Bali (Indonesia)': {
    type: 'Visa on Arrival',
    duration: '30 Days (extendable to 60)',
    processing: '5-15 Minutes at Airport',
    fee: '₹2,500 approx (IDR 500,000)',
    status: 'easy',
    documents: [
      'Valid Indian Passport (min 6 months)',
      'Return flight ticket',
      'Hotel booking confirmation',
      'Cash in USD or IDR for visa fee',
    ],
    notes: 'Visa on Arrival available at Bali (Ngurah Rai) and other major Indonesian airports. Can be extended once for another 30 days.',
  },
};

const statusConfig = {
  easy: { label: 'Easy Process', color: '#16a34a', bg: '#dcfce7', icon: <CheckCircle size={16} /> },
  moderate: { label: 'Moderate Process', color: '#d97706', bg: '#fef3c7', icon: <AlertCircle size={16} /> },
  complex: { label: 'Complex Process', color: '#dc2626', bg: '#fee2e2', icon: <AlertCircle size={16} /> },
};

export default function VisaLookup() {
  const [selected, setSelected] = useState('');
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (selected && visaData[selected]) {
      setResult(visaData[selected]);
      setSearched(true);
    }
  };

  const handleReset = () => {
    setSelected('');
    setResult(null);
    setSearched(false);
  };

  const statusInfo = result ? statusConfig[result.status] : null;

  return (
    <div className="visa-page">
      {/* Header Banner */}
      <section className="visa-header">
        <div className="container">
          <Globe size={48} className="visa-header-icon" />
          <h1>Visa Requirements Lookup</h1>
          <p>Quick visa info for Indian passport holders — documents, fees & processing times.</p>
        </div>
      </section>

      <div className="container visa-content">
        {/* Search Form */}
        <div className="visa-search-card">
          <h2 className="visa-search-title">Select Your Destination</h2>
          <form onSubmit={handleSearch} className="visa-search-form">
            <div className="visa-select-wrapper">
              <ChevronDown size={18} className="visa-select-arrow" />
              <select
                className="visa-select"
                value={selected}
                onChange={(e) => { setSelected(e.target.value); setResult(null); setSearched(false); }}
                required
              >
                <option value="">-- Choose a destination --</option>
                {Object.keys(visaData).map((dest) => (
                  <option key={dest} value={dest}>{dest}</option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary" style={{ minWidth: '160px' }}>
              <Search size={16} /> Check Visa Info
            </button>
          </form>
        </div>

        {/* Result Panel */}
        {searched && result && (
          <div className="visa-result-panel">
            <div className="visa-result-header">
              <div>
                <h2 className="visa-destination-name">{selected}</h2>
                <span className="visa-type-badge">{result.type}</span>
              </div>
              <div
                className="visa-status-badge"
                style={{ color: statusInfo.color, backgroundColor: statusInfo.bg }}
              >
                {statusInfo.icon} {statusInfo.label}
              </div>
            </div>

            <div className="visa-stats-grid">
              <div className="visa-stat-card">
                <Clock size={20} className="stat-icon" />
                <div className="stat-label">Stay Duration</div>
                <div className="stat-value">{result.duration}</div>
              </div>
              <div className="visa-stat-card">
                <Search size={20} className="stat-icon" />
                <div className="stat-label">Processing Time</div>
                <div className="stat-value">{result.processing}</div>
              </div>
              <div className="visa-stat-card">
                <FileText size={20} className="stat-icon" />
                <div className="stat-label">Visa Fee</div>
                <div className="stat-value">{result.fee}</div>
              </div>
            </div>

            <div className="visa-docs-section">
              <h3 className="visa-docs-title">
                <FileText size={18} /> Required Documents
              </h3>
              <ul className="visa-docs-list">
                {result.documents.map((doc, i) => (
                  <li key={i}>
                    <CheckCircle size={15} className="doc-check" />
                    {doc}
                  </li>
                ))}
              </ul>
            </div>

            <div className="visa-notes-box">
              <AlertCircle size={16} className="notes-icon" />
              <span><strong>Note:</strong> {result.notes}</span>
            </div>

            <div className="visa-cta-row">
              <button className="btn btn-primary" onClick={() => {
                const msg = `Hi! I need help applying for a ${result.type} to ${selected}. Can you assist?`;
                window.open(`https://wa.me/919876543210?text=${encodeURIComponent(msg)}`, '_blank');
              }}>
                📲 WhatsApp for Visa Assistance
              </button>
              <button className="btn btn-secondary" onClick={handleReset}>
                Search Another Destination
              </button>
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="visa-disclaimer">
          <AlertCircle size={14} />
          <span>
            Visa rules change frequently. Always verify with the official embassy website or contact our team for the latest requirements before booking.
          </span>
        </div>
      </div>
    </div>
  );
}
