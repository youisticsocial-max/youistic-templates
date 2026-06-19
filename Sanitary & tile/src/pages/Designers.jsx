import React from 'react';
import { motion } from 'framer-motion';
import { Download, Users, Package, HeadphonesIcon } from 'lucide-react';

export default function Designers() {
  const portalFeatures = [
    { icon: <Package size={32} />, title: 'Material Library', desc: 'Browse complete design collections and request high-res textures.' },
    { icon: <HeadphonesIcon size={32} />, title: 'Technical Support', desc: 'Get product specifications, CAD files, and technical consultation.' },
    { icon: <Users size={32} />, title: 'Bulk Requirements', desc: 'Specialized support and pricing for large architectural projects.' },
    { icon: <Download size={32} />, title: 'Dealer Partnership', desc: 'Become an authorized partner and join our global network.' }
  ];

  return (
    <div className="designers-page" style={{ paddingTop: '80px' }}>
      
      {/* Hero */}
      <section className="section-dark" style={{ padding: '8rem 0', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.2, backgroundImage: 'url(/assets/architect.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} style={{ maxWidth: '800px' }}>
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem', display: 'block', marginBottom: '1rem' }}>B2B Portal</span>
            <h1 style={{ marginBottom: '1.5rem', fontSize: 'clamp(2.5rem, 4vw, 4rem)' }}>For Designers & Architects</h1>
            <p style={{ fontSize: '1.2rem', color: '#a0a0a0', marginBottom: '3rem', maxWidth: '600px' }}>
              Partner with {"{{CLINIC_NAME}}"} to bring your visionary projects to life. We provide dedicated support, exclusive resources, and tailored solutions for industry professionals.
            </p>
            <button className="btn btn-primary" style={{ padding: '1rem 2rem' }}>Join the Network</button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
            {portalFeatures.map((feat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ padding: '2rem', border: '1px solid var(--border-color)', background: '#fcfcfc' }}
              >
                <div style={{ width: '60px', height: '60px', background: 'var(--primary-color)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem' }}>
                  {feat.icon}
                </div>
                <h3 style={{ marginBottom: '1rem' }}>{feat.title}</h3>
                <p style={{ color: 'var(--text-secondary)' }}>{feat.desc}</p>
                <button className="btn btn-outline" style={{ marginTop: '2rem', padding: '0.5rem 1rem', fontSize: '0.8rem', border: 'none', borderBottom: '1px solid var(--text-primary)' }}>Learn More</button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Form */}
      <section className="section" style={{ background: '#f5f5f5' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <h2 style={{ marginBottom: '1.5rem' }}>Start a Project with Us</h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                Fill out the form to request a material library box, technical assistance, or to discuss a bulk requirement.
              </p>
              <ul style={{ color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li>✓ Priority support channel</li>
                <li>✓ Dedicated account manager</li>
                <li>✓ Custom sizes and finishes</li>
              </ul>
            </div>
            <div className="glass-panel" style={{ padding: '3rem', background: 'white' }}>
              <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <input type="text" placeholder="First Name" style={inputStyle} />
                  <input type="text" placeholder="Last Name" style={inputStyle} />
                </div>
                <input type="text" placeholder="Company / Firm Name" style={inputStyle} />
                <input type="email" placeholder="Email Address" style={inputStyle} />
                <select style={inputStyle}>
                  <option value="">Select Inquiry Type</option>
                  <option value="material">Material Library</option>
                  <option value="bulk">Bulk Requirement</option>
                  <option value="technical">Technical Support</option>
                </select>
                <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Submit Request</button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

const inputStyle = {
  width: '100%',
  padding: '1rem',
  border: '1px solid var(--border-color)',
  background: '#fcfcfc',
  fontSize: '0.95rem',
  outline: 'none',
  fontFamily: 'var(--font-family)'
};