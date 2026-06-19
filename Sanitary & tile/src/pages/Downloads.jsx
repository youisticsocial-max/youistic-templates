import React from 'react';
import { Download as DownloadIcon, FileText, FileBadge } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Downloads() {
  const documents = [
    { title: 'General Catalog 2024', desc: 'Complete overview of all collections.', icon: <FileText size={32} />, size: '24 MB' },
    { title: 'Bathware Collection', desc: 'Sanitaryware and fittings catalog.', icon: <FileText size={32} />, size: '18 MB' },
    { title: 'Technical Specifications', desc: 'Detailed specs for architects.', icon: <FileBadge size={32} />, size: '5 MB' },
    { title: 'Installation Guide', desc: 'Step-by-step surface installation.', icon: <FileText size={32} />, size: '12 MB' },
    { title: 'Warranty Terms', desc: 'Official warranty documentation.', icon: <FileBadge size={32} />, size: '2 MB' },
    { title: 'Outdoor Collection', desc: '20mm thick outdoor tiles.', icon: <FileText size={32} />, size: '15 MB' },
  ];

  return (
    <div className="downloads-page" style={{ paddingTop: '80px', minHeight: '100vh', background: '#f5f5f5' }}>
      
      <section className="section" style={{ textAlign: 'center', paddingBottom: '3rem' }}>
        <div className="container">
          <span style={{ textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--primary-color)', fontSize: '0.9rem' }}>Document Center</span>
          <h1 style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>Catalogs & Downloads</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
            Access our latest brochures, technical sheets, and guides.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {documents.map((doc, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                style={{ background: 'white', padding: '2rem', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ color: 'var(--primary-color)', marginBottom: '1.5rem' }}>{doc.icon}</div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{doc.title}</h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', flexGrow: 1 }}>{doc.desc}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
                  <span style={{ fontSize: '0.85rem', color: '#a0a0a0', textTransform: 'uppercase', letterSpacing: '0.05em' }}>PDF | {doc.size}</span>
                  <button className="btn btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem', display: 'flex', gap: '0.5rem' }}>
                    <DownloadIcon size={16} /> Download
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}