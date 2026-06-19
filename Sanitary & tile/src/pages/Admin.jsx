import React, { useState } from 'react';
import { LayoutDashboard, ShoppingBag, FolderOpen, Image as ImageIcon, FileText, Settings, Shield, Users, LogOut, Download, Eye, TrendingUp } from 'lucide-react';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} /> },
    { id: 'collections', label: 'Collections', icon: <FolderOpen size={20} /> },
    { id: 'products', label: 'Products', icon: <ShoppingBag size={20} /> },
    { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
    { id: 'catalogs', label: 'Catalogs', icon: <FileText size={20} /> },
    { id: 'content', label: 'Content (CMS)', icon: <Settings size={20} /> },
    { id: 'security', label: 'Security', icon: <Shield size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f7fa', fontFamily: 'var(--font-family)' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '250px', background: '#ffffff', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #e2e8f0' }}>
          <img src={window.location.hostname === 'localhost' ? '/assets/logo.svg' : '{{LOGO_URL}}'} alt={"{{CLINIC_NAME}}"} style={{ height: '30px', marginBottom: '0.5rem' }} />
          <div style={{ fontSize: '0.75rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Enterprise CMS</div>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {menuItems.map(item => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.75rem 1.5rem', background: activeTab === item.id ? '#f1f5f9' : 'transparent',
                    border: 'none', borderRight: activeTab === item.id ? '3px solid var(--primary-color)' : '3px solid transparent',
                    color: activeTab === item.id ? 'var(--primary-color)' : '#475569',
                    fontSize: '0.9rem', fontWeight: activeTab === item.id ? 500 : 400,
                    cursor: 'pointer', transition: 'all 0.2s', textAlign: 'left'
                  }}
                >
                  {item.icon} {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid #e2e8f0' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.9rem' }}>
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem 3rem', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 500, color: '#0f172a', textTransform: 'capitalize' }}>
            {activeTab.replace('-', ' ')}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ background: 'white', padding: '0.5rem 1rem', borderRadius: '4px', border: '1px solid #e2e8f0', fontSize: '0.85rem', color: '#64748b' }}>
              Admin User
            </div>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <StatCard icon={<Eye size={24} color="#3b82f6" />} label="Total Visitors" value="24,592" trend="+12%" />
              <StatCard icon={<Users size={24} color="#10b981" />} label="New Inquiries" value="145" trend="+5%" />
              <StatCard icon={<Download size={24} color="#8b5cf6" />} label="Catalog Downloads" value="3,210" trend="+18%" />
              <StatCard icon={<TrendingUp size={24} color="#f59e0b" />} label="Popular Collection" value="Matt Series" trend="Top" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem' }}>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>Recent Inquiries</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left', color: '#64748b' }}>
                      <th style={{ padding: '0.75rem 0' }}>Name</th>
                      <th style={{ padding: '0.75rem 0' }}>Type</th>
                      <th style={{ padding: '0.75rem 0' }}>Date</th>
                      <th style={{ padding: '0.75rem 0' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 0', color: '#0f172a' }}>John Doe</td>
                      <td style={{ padding: '1rem 0', color: '#64748b' }}>Bulk Requirement</td>
                      <td style={{ padding: '1rem 0', color: '#64748b' }}>Today, 10:23 AM</td>
                      <td style={{ padding: '1rem 0' }}><span style={{ background: '#dcfce7', color: '#166534', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem' }}>New</span></td>
                    </tr>
                    <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '1rem 0', color: '#0f172a' }}>Jane Smith</td>
                      <td style={{ padding: '1rem 0', color: '#64748b' }}>Material Library</td>
                      <td style={{ padding: '1rem 0', color: '#64748b' }}>Yesterday</td>
                      <td style={{ padding: '1rem 0' }}><span style={{ background: '#f1f5f9', color: '#475569', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem' }}>Reviewed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: '#0f172a' }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>+ Add New Product</button>
                  <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>+ Upload Catalog</button>
                  <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'flex-start' }}>+ Update Banner</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'dashboard' && (
          <div style={{ background: 'white', padding: '3rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center', color: '#64748b' }}>
            <FolderOpen size={48} style={{ margin: '0 auto 1rem auto', opacity: 0.2 }} />
            <h2 style={{ fontSize: '1.2rem', marginBottom: '0.5rem', color: '#0f172a' }}>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management Module</h2>
            <p style={{ maxWidth: '400px', margin: '0 auto' }}>This module allows administrators to manage {activeTab} data efficiently. Dynamic fields and API integration are configured here.</p>
          </div>
        )}
      </main>

    </div>
  );
}

function StatCard({ icon, label, value, trend }) {
  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '1rem' }}>
      <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '0.8rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 600, color: '#0f172a' }}>{value}</div>
          <div style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 500 }}>{trend}</div>
        </div>
      </div>
    </div>
  );
}
