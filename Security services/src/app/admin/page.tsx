'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Admin.module.css';

interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  serviceRequested: string;
  message: string;
  status: string;
  createdAt: string;
}

interface CareerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  position: string;
  experienceYears: number;
  resumeUrl: string;
  message?: string | null;
  createdAt: string;
}

interface SiteSettings {
  companyName: string;
  phoneNumber: string;
  emergencyPhone: string;
  email: string;
  address: string;
  whatsappNumber: string;
  seoTitle: string;
  seoDescription: string;
}

interface MediaItem {
  name: string;
  url: string;
  size: number;
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'inquiries' | 'careers' | 'settings' | 'media'>('overview');

  // Dashboard Data
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [careers, setCareers] = useState<CareerApplication[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    companyName: 'Indian Black Panther Security Services',
    phoneNumber: '9845209643',
    emergencyPhone: '9845209643',
    email: 'info@ibpss.in',
    address: '',
    whatsappNumber: '9845209643',
    seoTitle: '',
    seoDescription: ''
  });
  const [media, setMedia] = useState<MediaItem[]>([]);

  // UI state
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    // Authenticate and load initial data
    fetch('/api/auth/session')
      .then(res => res.json())
      .then(data => {
        if (!data.authenticated) {
          router.push('/admin/login');
        } else {
          setAuthenticated(true);
          loadDashboardData();
        }
      })
      .catch(() => {
        router.push('/admin/login');
      });
  }, [router]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      // Fetch inquiries
      const inqRes = await fetch('/api/inquiries');
      const inqData = await inqRes.json();
      setInquiries(Array.isArray(inqData) ? inqData : []);

      // Fetch career applications
      const carRes = await fetch('/api/careers');
      const carData = await carRes.json();
      setCareers(Array.isArray(carData) ? carData : []);

      // Fetch settings
      const setRes = await fetch('/api/settings');
      const setData = await setRes.json();
      if (setData) setSettings(setData);

      // Fetch media
      const medRes = await fetch('/api/media');
      const medData = await medRes.json();
      setMedia(Array.isArray(medData) ? medData : []);

    } catch (err) {
      console.error('Failed to fetch dashboard data', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/admin/login');
      router.refresh();
    } catch (err) {
      console.error(err);
    }
  };

  // Update Inquiry Status
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        setInquiries(prev => prev.map(inq => inq.id === id ? { ...inq, status: newStatus } : inq));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Inquiry
  const handleDeleteInquiry = async (id: string) => {
    if (!confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setInquiries(prev => prev.filter(inq => inq.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Site Settings
  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Media File Upload
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/media', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (res.ok) {
        setMedia(prev => [data, ...prev]);
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  // Delete Media
  const handleDeleteMedia = async (filename: string) => {
    if (!confirm('Are you sure you want to delete this media file?')) return;
    try {
      const res = await fetch(`/api/media?filename=${filename}`, { method: 'DELETE' });
      if (res.ok) {
        setMedia(prev => prev.filter(item => item.name !== filename));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Export Inquiries to CSV Helper
  const exportInquiriesCSV = () => {
    if (inquiries.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Message', 'Status', 'Date'];
    const rows = inquiries.map(i => [
      i.id,
      `"${i.name.replace(/"/g, '""')}"`,
      i.email,
      i.phone,
      i.serviceRequested,
      `"${i.message.replace(/"/g, '""')}"`,
      i.status,
      new Date(i.createdAt).toLocaleString()
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (authenticated === null || loading) {
    return (
      <div className={styles.wrapper} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-gold)', letterSpacing: '2px', textTransform: 'uppercase', fontSize: '14px' }}>
          Loading Operations Centre...
        </p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.dashboardLayout}>
        {/* Sidebar */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarTitle}>Command Navigation</div>
          <nav className={styles.navMenu}>
            <button
              id="tab-overview"
              onClick={() => setActiveTab('overview')}
              className={`${styles.navBtn} ${activeTab === 'overview' ? styles.navActive : ''}`}
            >
              📊 Overview Stats
            </button>
            <button
              id="tab-inquiries"
              onClick={() => setActiveTab('inquiries')}
              className={`${styles.navBtn} ${activeTab === 'inquiries' ? styles.navActive : ''}`}
            >
              ✉️ Inquiries ({inquiries.length})
            </button>
            <button
              id="tab-careers"
              onClick={() => setActiveTab('careers')}
              className={`${styles.navBtn} ${activeTab === 'careers' ? styles.navActive : ''}`}
            >
              💼 Job Applications ({careers.length})
            </button>
            <button
              id="tab-settings"
              onClick={() => setActiveTab('settings')}
              className={`${styles.navBtn} ${activeTab === 'settings' ? styles.navActive : ''}`}
            >
              ⚙️ Site Settings
            </button>
            <button
              id="tab-media"
              onClick={() => setActiveTab('media')}
              className={`${styles.navBtn} ${activeTab === 'media' ? styles.navActive : ''}`}
            >
              🖼️ Media Library
            </button>

            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className={`${styles.navBtn} ${styles.logoutBtn}`}
            >
              🚪 Sign Out
            </button>
          </nav>
        </aside>

        {/* Main Panel Content */}
        <main className={styles.mainContent}>
          <header className={styles.contentHeader}>
            <h1 className={styles.contentTitle}>
              {activeTab === 'overview' && 'Operations Overview'}
              {activeTab === 'inquiries' && 'Client Inquiries'}
              {activeTab === 'careers' && 'Recruitment CV Logs'}
              {activeTab === 'settings' && 'Global Configurations'}
              {activeTab === 'media' && 'Central Media Repository'}
            </h1>
          </header>

          {/* Tab Content: OVERVIEW */}
          {activeTab === 'overview' && (
            <div>
              <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Total Inquiries</span>
                  <span className={styles.statValueGold}>{inquiries.length}</span>
                  <span className={styles.statDesc}>Received via contact form</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Pending Reviews</span>
                  <span className={styles.statValue}>
                    {inquiries.filter(i => i.status === 'PENDING').length}
                  </span>
                  <span className={styles.statDesc}>Inquiries awaiting review</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>CV Submissions</span>
                  <span className={styles.statValueGold}>{careers.length}</span>
                  <span className={styles.statDesc}>Submitted to job openings</span>
                </div>
                <div className={styles.statCard}>
                  <span className={styles.statLabel}>Total Uploaded Media</span>
                  <span className={styles.statValue}>{media.length}</span>
                  <span className={styles.statDesc}>Images & PDF assets</span>
                </div>
              </div>

              {/* Recent Activity Table */}
              <div className={styles.tableCard}>
                <div className={styles.tableHeader}>
                  <span className={styles.tableTitle}>Recent Unresolved Inquiries</span>
                </div>
                <div className={styles.tableContainer}>
                  <table className={styles.table}>
                    <thead>
                      <tr>
                        <th>Client Name</th>
                        <th>Phone</th>
                        <th>Required Service</th>
                        <th>Status</th>
                        <th>Submission Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.slice(0, 5).map(inq => (
                        <tr key={inq.id}>
                          <td><strong>{inq.name}</strong></td>
                          <td>{inq.phone}</td>
                          <td>{inq.serviceRequested}</td>
                          <td>
                            <span className={`${styles.statusBadge} ${
                              inq.status === 'PENDING' ? styles.statusPending : 
                              inq.status === 'REVIEWED' ? styles.statusReviewed : styles.statusContacted
                            }`}>
                              {inq.status}
                            </span>
                          </td>
                          <td>{new Date(inq.createdAt).toLocaleDateString('en-IN')}</td>
                        </tr>
                      ))}
                      {inquiries.length === 0 && (
                        <tr>
                          <td colSpan={5} style={{ textAlign: 'center', color: 'var(--color-gray-500)' }}>
                            No inquiries recorded.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Tab Content: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className={styles.tableCard}>
              <div className={styles.tableHeader}>
                <span className={styles.tableTitle}>Inquiries Command List</span>
                <button
                  id="btn-export-csv"
                  onClick={exportInquiriesCSV}
                  className="btn btn-gold btn-sm"
                >
                  📥 Export to CSV
                </button>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Contact Info</th>
                      <th>Service Requested</th>
                      <th>Message</th>
                      <th>Status Action</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map(inq => (
                      <tr key={inq.id}>
                        <td>
                          <strong>{inq.name}</strong>
                          <div style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                            {new Date(inq.createdAt).toLocaleString('en-IN')}
                          </div>
                        </td>
                        <td>
                          <div>📞 {inq.phone}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-gray-400)' }}>✉️ {inq.email}</div>
                        </td>
                        <td>{inq.serviceRequested}</td>
                        <td style={{ maxWidth: '300px', fontSize: '12.5px', color: 'var(--color-gray-300)' }}>
                          {inq.message}
                        </td>
                        <td>
                          <select
                            value={inq.status}
                            onChange={(e) => handleStatusChange(inq.id, e.target.value)}
                            className={styles.actionSelect}
                          >
                            <option value="PENDING">PENDING</option>
                            <option value="REVIEWED">REVIEWED</option>
                            <option value="CONTACTED">CONTACTED</option>
                          </select>
                        </td>
                        <td>
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="btn btn-ghost"
                            style={{ color: '#e74c3c', fontSize: '12px' }}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                    {inquiries.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-gray-500)' }}>
                          No inquiries found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: CAREERS */}
          {activeTab === 'careers' && (
            <div className={styles.tableCard}>
              <div className={styles.tableHeader}>
                <span className={styles.tableTitle}>Applicant Profiles</span>
              </div>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Applicant</th>
                      <th>Applied Position</th>
                      <th>Experience</th>
                      <th>Message</th>
                      <th>Resume Attachment</th>
                      <th>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {careers.map(app => (
                      <tr key={app.id}>
                        <td>
                          <strong>{app.fullName}</strong>
                          <div>✉️ {app.email}</div>
                          <div style={{ fontSize: '12px', color: 'var(--color-gray-400)' }}>📞 {app.phone}</div>
                        </td>
                        <td>{app.position}</td>
                        <td><strong>{app.experienceYears} Years</strong></td>
                        <td style={{ maxWidth: '250px', fontSize: '12.5px', color: 'var(--color-gray-400)' }}>
                          {app.message || 'No message provided.'}
                        </td>
                        <td>
                          {app.resumeUrl ? (
                            <a
                              href={app.resumeUrl}
                              download
                              target="_blank"
                              rel="noreferrer"
                              className={styles.downloadLink}
                            >
                              📄 Download CV
                            </a>
                          ) : (
                            <span style={{ color: 'var(--color-gray-500)' }}>No CV Attached</span>
                          )}
                        </td>
                        <td>{new Date(app.createdAt).toLocaleDateString('en-IN')}</td>
                      </tr>
                    ))}
                    {careers.length === 0 && (
                      <tr>
                        <td colSpan={6} style={{ textAlign: 'center', color: 'var(--color-gray-500)' }}>
                          No job applications received yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab Content: SITE SETTINGS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className={styles.cmsForm}>
              <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-white)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px' }}>
                Operational & Contact Details
              </h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Company Name</label>
                  <input
                    type="text"
                    value={settings.companyName}
                    onChange={e => setSettings(prev => ({ ...prev, companyName: e.target.value }))}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Primary Phone Number</label>
                  <input
                    type="text"
                    value={settings.phoneNumber}
                    onChange={e => setSettings(prev => ({ ...prev, phoneNumber: e.target.value }))}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Emergency Line</label>
                  <input
                    type="text"
                    value={settings.emergencyPhone}
                    onChange={e => setSettings(prev => ({ ...prev, emergencyPhone: e.target.value }))}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>WhatsApp Number</label>
                  <input
                    type="text"
                    value={settings.whatsappNumber}
                    onChange={e => setSettings(prev => ({ ...prev, whatsappNumber: e.target.value }))}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>Official Office Address</label>
                  <textarea
                    value={settings.address}
                    onChange={e => setSettings(prev => ({ ...prev, address: e.target.value }))}
                    className={styles.textarea}
                    required
                  />
                </div>
              </div>

              <h2 style={{ fontSize: '16px', fontWeight: '800', textTransform: 'uppercase', color: 'var(--color-white)', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', paddingBottom: '12px', marginTop: '16px' }}>
                SEO Metadata Configurations
              </h2>
              <div className={styles.formGrid}>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>SEO Title Tag</label>
                  <input
                    type="text"
                    value={settings.seoTitle}
                    onChange={e => setSettings(prev => ({ ...prev, seoTitle: e.target.value }))}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup} style={{ gridColumn: 'span 2' }}>
                  <label className={styles.label}>SEO Meta Description</label>
                  <textarea
                    value={settings.seoDescription}
                    onChange={e => setSettings(prev => ({ ...prev, seoDescription: e.target.value }))}
                    className={styles.textarea}
                    required
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' }}>
                <button
                  id="settings-save-btn"
                  type="submit"
                  className="btn btn-gold"
                >
                  Save Configurations
                </button>
                {saveSuccess && <span className={styles.saveSuccess}>✓ Global configurations saved successfully!</span>}
              </div>
            </form>
          )}

          {/* Tab Content: MEDIA */}
          {activeTab === 'media' && (
            <div>
              <div className={styles.uploaderBox} style={{ position: 'relative' }}>
                <input
                  id="media-uploader-input"
                  type="file"
                  onChange={handleMediaUpload}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer' }}
                  disabled={uploading}
                />
                <p style={{ fontSize: '15px', color: 'var(--color-gray-300)', fontWeight: '700' }}>
                  {uploading ? 'Processing File Upload...' : 'Drag or Click to Upload Media File'}
                </p>
                <p style={{ fontSize: '12px', color: 'var(--color-gray-500)', marginTop: '8px' }}>
                  Supported formats: JPG, PNG, WEBP, PDF (Max 10MB)
                </p>
              </div>

              <div className={styles.mediaGrid}>
                {media.map((item, index) => (
                  <div key={index} className={styles.mediaItem}>
                    <button
                      onClick={() => handleDeleteMedia(item.name)}
                      className={styles.deleteMediaBtn}
                      title="Delete physical asset"
                    >
                      ✕
                    </button>
                    {item.name.endsWith('.pdf') ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80%', background: 'rgba(255,255,255,0.03)', fontSize: '24px' }}>
                        📄 PDF
                      </div>
                    ) : (
                      <img src={item.url} alt={item.name} className={styles.mediaPreview} />
                    )}
                    <div className={styles.mediaMeta} title={item.name}>
                      {item.name}
                    </div>
                  </div>
                ))}
                {media.length === 0 && (
                  <div style={{ gridColumn: 'span 4', textAlign: 'center', padding: '40px', color: 'var(--color-gray-500)' }}>
                    No physical media files uploaded yet.
                  </div>
                )}
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
